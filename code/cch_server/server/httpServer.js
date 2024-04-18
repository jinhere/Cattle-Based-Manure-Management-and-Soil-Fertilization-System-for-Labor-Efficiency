//httpServer.js
//Functions for communicating to Application with HTTP protocol
const express = require('express');
const cors = require('cors');
const app = express();
const { createServer } = require("http");
const dbModule = require('./db');
const bodyParser = require('body-parser');
const tcpServer = require('./tcpServer');
const schedule = require('node-schedule');
const db = dbModule.db;

//Server for API request
//which handles - 1)GET/ 2)GET/ fertilityLevel 3)POST/ feederSignal 4)POST/ putDailyNPK 5)POST/ updateLastOpen
function startHttpServer(httpPort) {
  //clarify the ip address of our application
  app.use(cors({
    origin: 'http://192.168.2.156:3000',
    credentials: true,
    optionSuccessStatus: 200
  }));

  app.use(bodyParser.urlencoded({extended: true}));

  //1)Get/
  //show "Hello World" page to check communcation(API) is working well
  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });

  //2)GET/ fertilityLevel
  //send npk levels of all subunits with one of high/good/low notationindvidually with json format
  /*respond format example: 
  {units: 
    { {loc: 1, N:[3(type: int), "low"], P:[3, "low"], K:[3, "high"]},
      {loc: 2, N:[3(type: int), "low"], P:[3, "low"], K:[3, "high"]},
      {loc: 3, N:[3(type: int), "low"], P:[3, "low"], K:[3, "high"]},
      {loc: 4, N:[3(type: int), "low"], P:[3, "low"], K:[3, "high"]}
    }
  }*/
  app.get("/fertilityLevel", async (req, res) => {
    let fertilityLevelJson = {};

    //critria of range of recommended(ideal) NPK amount 
    const ideal = {
      N: [11, 30],
      P: [21, 30],
      K: [121, 155]
    };

    //make query which is select latest npk level data from end node by calling find_lastest_date()
    const query = await dbModule.find_latest_date();

    //run query and write fertilityLevelJson which will send to application
    db.all(query, function(err, rows) {
      if (err) {
        return console.error(err.message);
      }
    
      fertilityLevelJson = {
        units: rows.map(row => ({
          loc: row.loc,
          //Application needs 2 types of data for showing NPK level - 1) real measured value 2) high/good/low comment
          //comment is determined by the range of reccommended NPK amount which is saved in variable 'ideal'
          N: [row.N, ideal.N[1] < row.N ? ' (high)' : ideal.N[0] < row.N? ' (good)': ' (low)'],
          P: [row.P, ideal.P[1] < row.P ? ' (high)' : ideal.P[0] < row.P? ' (good)': ' (low)'],
          K: [row.K, ideal.K[1] < row.K ? ' (high)' : ideal.K[0] < row.K? ' (good)': ' (low)'],
          feeder_status: row.feeder_status,
          //Default value of last_open in table is NULL which means 'never opened', if not converting the last_open date to proper format to show up in application
          last_open: row.last_open ? new Date(row.last_open).toLocaleDateString('default', { month: 'numeric', day: 'numeric', year: '2-digit', hour: 'numeric', minute: 'numeric', hour12: false }) : "Never opened"
        }))
      };
      //sort by 'location' so that the json file has the data like this order - {loc:1}, {loc:2}, {loc:3} ...
      fertilityLevelJson.units.sort(((a, b) => a.loc - b.loc));
      
      res.send(fertilityLevelJson);
      console.log(`send fertilieyLevel data to client`);
    });
  });
  
  //3)POST/ feederSignal
  //Sever send TCP socket to Senet for letting it send signal to turn on/off the LED which represents the feeder in the experiment
  //when API is requested through clicking the feeder button in the app
  //After sending socket to Senet, server update feeder_status and last_open in table 'location' 
  //request format: {location: int, signal: 0 or 1}
  app.post("/feederSignal", async function(req, res) {
    const { devEUI, signal } = await parseFeederSignalRequestJson(req);

    //send TCP socket to Senet with devEUI which is unique ID for ESP32(end node) and '0'+signal
    //when signal is 1 which means open the feeder, then the former of argument will be '01', and ESP32 understands it as a opening singal
    //ohterwise, ESP32 understands '00' as a closing feeder signal
    tcpServer.downStream(devEUI, '0' + signal);

    // update feeder_status, last_open in location table
    const result = await dbModule.update_feeder_signal(req.body.location, signal);
    res.send(result);

    //After 3 hours, server will automatically run the job which is sending TCP socket to senet to close the feeder (LED in experiment)
    if (signal === '1') {
      //save server time and set flagTime which is 3 hours later then servers
      const currentTime = new Date();
      const flagTime = currentTime.setHours(currentTime.getHours() + 3);

      //Schedule the job which is sending the socket to Senet
      //Also update database to change value of 'feeder_status' as 0 (which means closed now)
      schedule.scheduleJob(flagTime, async () => {
        tcpServer.downStream(devEUI, '00');
        const result = await dbModule.update_feeder_signal(req.body.location, 0);
        console.log(`feeder is autonomically closed: ${result}`);
      });
    }
  });

  //4)POST/ putDailyNPK
  //request format: {devEUI, date, N, P, K} json
  //This is back-up function to save NPK data in table 'daily_npk' with values in request 
  app.post("/putDailyNpk", async (req, res) => {
    const result = await dbModule.insert_npk(req);
    res.send(result);
  })

  //5)POST/ updateLastOpen
  //request format: {loc, date, feeder_status} json
  //This is back-up function to save/change feeder_status in table 'location' with values in request
  app.post("/updateLastOpen", async(req, res) => {
    const result = await dbModule.update_last_open(req);
    res.send(result);
  })

  //Parse the request JSON file from POST/ feederSinal API and 
  //send corresponding both devEUI by querying location table and signal (which is in request)
  function parseFeederSignalRequestJson(respond) {
    return new Promise((resolve, reject) => {
      const location = respond.body.location;
      const query = 
      `SELECT location.devEUI as devEUI FROM location WHERE location.loc = ${location}`;
      
      db.get(query, function(err, row) {{
        if (err) {
          return console.log(err.message);
        }
        resolve({devEUI: row.devEUI, signal: respond.body.signal});
      }})
    });
  };

  const httpServer = createServer(app);
  httpServer.listen(httpPort, () => {
    console.log(`HTTP server running on port ${httpPort}`);
  });
}

module.exports = { startHttpServer };

