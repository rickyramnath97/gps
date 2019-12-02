# Build Instructions for Raspberry Pi GPS Sensor

## Table of Contents
1. [Introduction](#introduction)
2. [Material Requirements](#material-requirements)
3. [Raspberry Pi Configuration](#raspberry-pi-configuration)
4. [Mechanical Assembly and Soldering](#mechanical-assembly-and-soldering)
5. [SPI/UART Connection](#spi/uart-connection)
6. [Power Up](#power-up)
7. [Explore with your Sensor](#explore-with-your-sensor)


### Introduction
GPS sensors are receivers with antennas that use a satellite-based navigation system with a network of 24 satellites in orbit around the earth to provide position, velocity, and timing information. The breakout is built around the MTK3339 chipset, a high-quality GPS module that can track up to 22 satellites on 66 channels, has an excellent high-sensitivity receiver (-165 dBm tracking!), and a built in antenna. It can do up to 10 location updates a second for high speed, high sensitivity logging or tracking. Power usage is incredibly low, only 20 mA during navigation. The following instructions are provided to assist you in developing a GPS sensor that can measure longitude, latitude and many other readings.
<br/><img src="https://github.com/rickyramnath97/gps/blob/master/images/enclosure.jpg" width="350"></p>

> I recommend that before attempting this build that you have accomplished watching videos on [soldering](https://youtu.be/3230nCz3XQA). 

### Material Requirements
The project's total budget will cost you approx. CAD$218.41 including tax and shipping. The prices can be converted depending on where you are from. If you would like to see my personal budget click [here](https://github.com/rickyramnath97/gps/blob/master/documentation/Rickys%20Budget.xlsx). Keep in mind that my budget costs lower because I own some of the parts (or had access to in Prototype Lab) from the list.
The following links below are sources of where you can purchase the items:
* [Raspberry Pi 3 Kit](https://www.canakit.com/raspberry-pi-3-ultimate-kit.html) - CAD$89.95
* [Adafruit Ultimate GPS Breakout](https://www.adafruit.com/product/746) - CAD$39.95
* [40 Pin GPIO Connector Header](https://www.buyapi.ca/product/40-pin-gpio-connector-header/) - CAD$1.95
* [Break Away Headers - Straight](https://www.sparkfun.com/products/116) - CAD$2.01
* [Custom PCB](https://www.pcbway.com/?adwgc=667&campaignid=172480651&adgroupid=8787904531&feeditemid=&targetid=kwd-34746800&loc_physical_ms=9000922&matchtype=p&network=g&device=c&devicemodel=&creative=189085816950&keyword=pcb%20manufacturing&placement=&target=&adposition=1t1&gclid=Cj0KCQiAi57gBRDqARIsABhDSMpsNka-o0C5SQcvMYkiUXbYsOpfyNvY4I17pEzjXb1DlC4_ia_7dHkaAqKGEALw_wcB) - CAD$88.88 
<br/>Depending on the design of your PCB prices may vary. 
<br/>You can design your own PCB using [Fritzing](http://fritzing.org/download/) for free. 
<br/>Check out my design of the [PCB](https://github.com/rickyramnath97/gps/tree/master/electronics).
* [Safety Glasses](https://www.amazon.ca/3M-Virtua-Glasses-Polycarbonate-Anti-Scratch/dp/B00AEFBLW2/ref=sr_1_6?ie=UTF8&qid=1544063725&sr=8-6&keywords=safety+glasses) - CAD$9.27

### Raspberry Pi Configuration
1. Create your Raspberry Pi's [image](https://github.com/six0four/StudentSenseHat/blob/master/cribpisdcard.md) for your project.

### Mechanical Assembly and Soldering
1. Make sure to break the 9 pins from the Break Away Header. Then start by soldering the sensor to the pins of the header. 
<br/><img src="https://github.com/rickyramnath97/gps/blob/master/images/after.jpg" width="350">

2. You can design your own PCB using [Fritzing software](http://fritzing.org/download/) for free or my version of the [fritzing file](https://github.com/rickyramnath97/gps/tree/master/electronics). You can refer to the image of the schematic and PCB designs below.
<br/><img src="https://github.com/rickyramnath97/gps/blob/master/images/PCB2.PNG" width="350"> <img src="https://github.com/rickyramnath97/gps/blob/master/images/Schematic.PNG" width="350">
<br/>Here are the following pins that you should know for this project:
##### Power Pins
* VIN - Power Pin
  *GPS Vin  to 3.3V (red wire)
* GND - common ground for power and logic

##### Logic Pins
* RX pin
	* GPS RX to TX on Pi
* TX pin
	* GPS TX to RX on Pi
  

