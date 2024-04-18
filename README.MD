# Welcome to Our cattle can help program
This program aims to help farmers across the country! In this documents, you will get a scoop of our [team members](#Group-Information), [project title](#project-title), [research problem statements](#research-problem-statements), [research novelty](#research-novelty), [overview](#overview), [environment settings](#environment-settings), and [Installation](#installation).


# Group Information
**Team Cattle Can Help**

| Name | Affiliation |
|---|---|
|Youjin Kim|Kyung Hee University|
|Chaerim Lim|Yonsei University|
| Seunghyeon Cho|Daegu Catholic University |
| Hayoung Kim | Soonchunhyang University | 
| Olivia Anderson|Purdue University |
| Duong Dinh|Purdue Unviersity|

# Project Title

Cattle-based Manure Management System for Soil Fertilization

# Research Problem Statements

This research tackles the problem of alleviating heavy workload during manure management in cattle farms. Cow manure is known for its rich nutrients, which is commonly used to nourish the soil before farmers plant their
crops in the upcoming spring. However, if not taken care of on a daily basis, manure will accumulate, causing severe pollution and health problems to every living entity on the farm. So far, farmers had to collect manure every day and manually distribute it on the farmland for soil fertilization process. The aim of this paper is to present a novel manure management method that utilizes cattle to reduce the physical burden in the soil fertilization process.

# Research Novelty

This approach presents a pragmatic solution to a common agricultural challenge. By integrating automation with the Internet of Things, we can significantly reduce the time farmers spend on manure management. Our method involves the use of an NPK sensor to monitor nitrogen levels across different land areas. This sensor transmits data to our central server for processing. The analyzed information is then relayed back to an ESP32 controller, which determines whether to open or close a protein basket. This strategy effectively entices cattle to specific areas where their manure can be most beneficial, thereby optimizing land fertility management.

This system proposed an IoT-based soil fertility management system integrating the natural habits of cattle and their defecation. By combining utilization of LoRaWAN and multiple NPK sensors, this system aimed to facilitate long-distance and comprehensive fertility monitoring on the farm. Furthermore, drawing inspiration from the previously investigated ideal NPK levels based on inherent tendencies and behavioral patterns, the proposed approach involved inducing waste deposition in specific areas.

# Overview

This project presents a way to maintain and manage soil fertility evenly through a web application using IoT systems and cattle habits. In this system, feeders and buzzers can be used to attract cattle to low fertility areas and increase fertility through cattle. Soil nutrient data is gathered using NPK sensors and transmitted via LoRaWAN, enabling users at a distance to access precise information about soil fertility from the farm. It is practical as it achieves its purpose and is expected that the physical burden on the farmer can be reduced by offloading menial labor to the cattle by using what cows do naturally. 

**Proposed system architecture**

![Alt text](System%20Architecture.png)

Our system consists of 4 main parts; End Node, Senet, AWS server, Web appliation.

End Node is implemented by using ESP32 and codes are in code/esp32. AWS server is implemented by using NodeJS and Express and codes are located in code/cch_server. Web application is implemented by using ReactJS and codes are in code/cch_app. Senet is public services handling LoRaWAN technology part.

# Environment Settings
Details of each part (such as Installation) describe in README.md in each folder individually.
For server and application, all of version for using implementation is described on package.json file.

## Server 
[Click Details](code/cch_server/README.MD)
```  
"devDependencies": {
    "express": "^4.17.1"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "cors": "^2.8.5",
    "sqlite3": "^5.1.6"
  }
  ```

## Application 
[Click Details](code/cch_app/README.md)
```
"dependencies": {
  "axios": "^1.6.2",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.18.0",
  "styled-components": "^6.1.1"
}
```
## ESP32 
[Click Details](code/esp32/README.md)
```
ESP32 version: Heltec WiFi LoRa 32(V2)
Arduino IDE version: 2.2.1
```

## Installation 

### Web-Application
```
$ npx create-react-app project_name --template cra-template-pwa
$ npm install axios
$ npm install react-router-dom --save
$ npm install styled-components
```
### Server
```
$ cd server
$ npm install package.json
$ npm start app.js
```
### ESP32
```
1. Download arduino IDE 2.2.1 version.
2. Connect ESP32 to computer.
3. Download 'Heltec ESP32 Series Dev-boards 0.0.6' board manager.
4. Select Tools -> Board -> Heltec ESP32 Series Dev-boards -> WIFI LoRa 32(V2).
5. Compile and upload the endnode.ino code.
```
