//tcpServer.js
//Implementing functions which are for communicating with Senet Server (Senet Server communicates with Senet gateway)
const net = require('net');
const axios = require('axios');
const dbModule = require('./db');
const Device = require('./Device');
const db = dbModule.db;

function parseJson(strData) {
  let parsedString = JSON.parse(strData);
  let pdu = parsedString.pdu;
  let devEui = parsedString.devEui;
  let txttime = parsedString.txtime;

  return device = new Device(pdu, devEui, txttime);
}

function stack_senet_data(device) {
  //daily_npk: id, devEUI, date, N, P, K
  //replace data if (devEUI, location) is same
  
  const query = `
    INSERT INTO daily_npk (devEUI, date, N, P, K)
    VALUES ('${device.getDevEui()}', '${device.parseTime()}', ${device.getNitrogen()}, ${device.getPhosphorous()}, ${device.getPotassium()});
  `

  db.run(query, (err) => {
    if (err) {
      console.log(err.message);
    }
  })
  
  console.log('Successfully stacked');
}

function downStream(devEui, downstrData) {
  const options = {
    method: "POST",
    url: "https://portal.senetco.io/rest/current/device/sendmsg",
    params: {
      eui: devEui,
      pdu: downstrData,
      confirmed: "true",
      port: "88",
      timeoutMinutes: "2",
    },
    headers: {
      authorization: "AK3:UCIILB2QWFqosMJwRwy1jHPdtx7uYckzFBnxjrsJn",
    },
  };

  axios(options)
    .then((response) => {
      console.log("Response:", response.status, response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function startTcpServer(port) {

  //when server gets socket from Senet
  /*2 type of socket can be recieved 
  - 1) Notification type that shows ESP32 is connected to Senet server
  - 2) Fowarded Data from ESP32 : This type has <PDU> which is npk level data (16 length) */
  const server = net.createServer((socket) => {
    console.log(
      `Client connected from ${socket.remoteAddress}:${socket.remotePort}, Family: ${socket.remoteFamily}`
    );

    //When server catch sockets from Senet
    socket.on("data", (data) => {
      const strData = data.toString();
      console.log(`Received: ${strData}`);
      //extract values from socket data and save with device class
      const device = parseJson(strData);
      //if the socket type is not 1) and PDU in socket is not error data which is equal to "F"x16 due to NPK sensors' Error
      //then server accept and stack the data into table
      if ( device.getPDU() !== undefined && device.getPDU() !== "FFFFFFFFFFFF") {
        stack_senet_data(device);
      }
    });

    socket.on("end", () => {
      console.log("Client disconnected");
    });

    socket.on("error", (error) => {
      console.log(`Socket Error: ${error.message}`);
    });
  });

  server.on("error", (error) => {
    console.log(`Server Error: ${error.message}`);
  });

  server.listen(port, () => {
    console.log(`TCP socket server is running on port: ${port}`);
  });
}

module.exports = { startTcpServer, downStream};

