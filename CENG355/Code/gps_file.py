from gps import *
import time
import subprocess

num = int(subprocess.check_output(['wc', '-l', "gps_data.txt"])[:-13])

count = 0

try:
    file = open("gps_data.txt","r")
    
    lines = file.readlines()    
   # print lines
    
    while True:
        
        if (count == num):
            count = 0
            
        gps_data = lines[count].split()
        
        lat = gps_data[0]
        lon = gps_data[1]
        alt = gps_data[2]
        
        print(str(lat) + " " + str(lon) + " " + str(alt) + "\n")
    
        time.sleep(1)
        
        count  += 1
 
except (KeyboardInterrupt, SystemExit): #when you press ctrl+c
    print("Done.\nExiting.")