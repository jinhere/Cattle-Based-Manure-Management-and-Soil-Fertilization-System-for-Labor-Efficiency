# IoT-driven cattle farm where cattle can deal with their own manure!
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

Cattle-Based Manure Management and Soil Fertilization System for Labor Efficiency

# Research Problem Statements

Improving and maintaining soil fertility is a crucial responsibility among essential farming tasks. On cattle farms, the task of collecting and distributing cow manure for soil fertility management has been one of the most substantial shares of the excessive workload for farmers. This paper introduces a novel method for labor-reduced manure management and soil fertilization process, aimed at improving labor efficiency. 

# Overview

The proposed approach utilizes an Internet of Things solution that leverages the natural behavior and excretory activities of cattle. Dividing farmlands into smaller units, installed end nodes collect soil nutrient data from each area. Through a centralized web application, farmers can remotely oversee and manage the soil fertility of their entire farmland. Upon a farmer identifying areas with nutrient deficiencies, the proposed system utilizes feeders and bells to attract cattle to these low-fertility areas, encouraging them to deposit manure and enhance soil fertility. The LoRaWAN protocol facilitates bi-directional interaction between farmers located remotely and sensors deployed across vast agricultural landscapes, enabling efficient communication in expansive farming settings. 


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
