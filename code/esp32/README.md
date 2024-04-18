# Code Description
ESP32 has two main functions. First, it sends a valid LoRaWAN packet with payload NPK sensor data. Second, it receives a valid LoRaWAN packet with payload signal("00" or "01") which is an user's command whether to open or lose feeder. The sound sensor activates simultaneously with the feeder. LED represents the feeder. 

# ESP32
ESP32 Version: Heltec WiFi LoRa 32(V2)
Manual from Heltec: [link](https://resource.heltec.cn/download/Manual%20Old/WiFi%20Lora32Manual.pdf)

# ESP32 Setting
```
Arduino IDE Version: arduino IDE 2.2.1
Board Manager Version: [Heltec ESP32 Series Dev-boards 0.0.6] (https://github.com/Heltec-Aaron-Lee/WiFi_Kit_series)
```

# Installation
```
1. Download arduino IDE 2.2.1 version.
2. Connet ESP32 to computer.
3. Download 'Heltec ESP32 Series Dev-boards 0.0.6' board manager.
4. Select Tools -> Board -> Heltec ESP32 Series Dev-boards -> WIFI LoRa 32(V2).
5. Compile and upload the endnode.ino code.
```
