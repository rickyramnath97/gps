from gps import *
import time
    
gpsd = gps(mode=WATCH_ENABLE) 
   
try:
 
 
    while True:
        report = gpsd.next() #
        if report['class'] == 'TPV':
            
            file = open("gps_data.txt","a") 
             
            lat = getattr(report,'lat',0.0)
            lon = getattr(report,'lon',0.0)
            alt = getattr(report,'alt','nan')
            
            line = str(lat) + " " + str(lon) + " " + str(alt) + "\n"
            file.write(line)
            print line
            file.close() #to change file access modes
 
        time.sleep(1) 
 
except (KeyboardInterrupt, SystemExit): #when you press ctrl+c
    print "Done.\nExiting."
