#!/usr/bin/env python

#from gps import *
import time
import subprocess

import board
import busio
import time
import adafruit_gps
import serial
import RPi.GPIO as GPIO

from mfrc522 import SimpleMFRC522

GPIO.setmode(GPIO.BCM)
DEBUG = 1
LOGGER = 1

GPIO.setup(2, GPIO.IN)
GPIO.setup(3, GPIO.IN)
GPIO.setup(4, GPIO.IN)
GPIO.setup(17, GPIO.IN)
GPIO.setup(27, GPIO.IN)
#Read Tag
reader = SimpleMFRC522()

try:
    id, text = reader.read()
    print(id)
    print(text)

finally:
    GPIO.cleanup()
    
    
#Write Tag
try:
    text = input('New data:')
    print("Now place your tag to write")
    reader.write(text)
    print("written, also this is your location:")


finally:
    GPIO.cleanup()
    
#GPS
    
num = int(subprocess.check_output(['wc', '-l', "gps_data.txt"])[:-13])

count = 0

try:
    file = open("gps_data.txt","r")
    
    lines = file.readlines()    
   # print lines
    
    while count < 5:
        
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
    
finally:
    GPIO.cleanup()
    print("Finished GPS")
#Keypad

GPIO.setmode(GPIO.BCM)
DEBUG = 1
LOGGER = 1

GPIO.setup(2, GPIO.IN)
GPIO.setup(3, GPIO.IN)
GPIO.setup(4, GPIO.IN)
GPIO.setup(17, GPIO.IN)
GPIO.setup(27, GPIO.IN)
    
def encode(k0, k1, k2, k3):
    if not k0 and not k1 and not k2 and not k3:
        return '0'
    elif not k0 and not k1 and not k2 and k3:
        return '1'
    elif not k0 and not k1 and k2 and not k3:
        return '2'
    elif not k0 and not k1 and k2 and k3:
        return '3'
    elif not k0 and k1 and not k2 and not k3:
        return '4'
    elif not k0 and k1 and not k2 and k3:
        return '5'
    elif not k0 and k1 and k2 and not k3:
        return '6'
    elif not k0 and k1 and k2 and k3:
        return '7'
    elif k0 and not k1 and not k2 and not k3:
        return '8'
    elif k0 and not k1 and not k2 and k3:
        return '9'

    elif k0 and not k1 and k2 and not k3:
        return '*'

    elif k0 and not k1 and k2 and k3:
        return '#'
count_keypad = 0
num_string = ''
prev_num = 'a'

while count_keypad < 5:
    k0 = GPIO.input(2)
    k1 = GPIO.input(3)
    k2 = GPIO.input(4)
    k3 = GPIO.input(17)
    enable = GPIO.input(27)
    num = encode(k0, k1, k2, k3)
    if num is not None:
        prev_num = num
        print('Key Pressed: ' + num)
        #num_string += num
        #count += 1
    
