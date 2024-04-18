# Server Description
This server was running on AWS EC2 micro freetier version, and only accept one IP address which is web-app IP address.
It can be divided into mainly two parts
1) Sending socket to Senet and vice-versa by using TCP server
2) Executing proper functions-related to db, application corresponding to requested API format

## File Structure
```
📂server
┣ 📂public           \\ made by Express server
┃ ┣ 📜javascript.js
┃ ┗ 📜style.css
┣ 📂views             \\ made by Express server 
┃ ┗ 📜index.html
┣ 📜app.js            \\ Main file
┣ 📜db.js             \\ Database management
┣ 📜Device.js         \\ Device class
┣ 📜httpServer.js     \\ http Server
┣ 📜package.json
┗ 📜tcpServer.js      \\ TCP Server
```

## HTTP server
```httpServer.js```
This is for part 1 - communication with app, using HTTP API request.

## TCP server
```tcpServer.js```
This is for part 2 - communication with Senet, using TCP socket.

## Installation
This is for the server installation, assuming that you are in cch_server folder.
```
$ cd server
$ npm install package.json
$ npm start app.js
```
By using 'pm2' library, it can be running on the background also for catching soket from senet periodically.
If you want to run this server even though you close the code interpreter, follow this steps:
```
$ cd server
$ npm install package.json
$ pm2 start app.js

//usefull commands
$ pm2 monit // shows monitoring page which has log screen, resource usage, and so on
$ pm2 stop  // stop running server
```

## development environment
``` 
Server Development Runtime Flatform : Node.js
Server Development Framework : Express
Server Developemnt Flatform : AWS EC2 t2.micro
Server Development Operation System: Linux
```

## Possible Errors
1. Dependency Errors
  - It might be has some posibilities if you don't have accurate version of packages.
  - Make sure that using same version mentioned on README and check the error.
  - If the error says that some packages are missing, you can download manually like '$ npm install [package name]'

2. Senet Errors
  - Seldomly senet send unexpected packet, for example, ransom string. It might cause server restart.

3. API Errors
  - Cors Error: HTTP server only allowed to access our application IP address, so it should be modified into your IP.
  - ETC: It might happens because if api format is not properate.
