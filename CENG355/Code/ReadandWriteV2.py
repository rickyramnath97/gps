#!/usr/bin/env python

#from gps import *
import time
import subprocess
import sys
import board
import busio
import time
import adafruit_gps
import serial
import RPi.GPIO as GPIO
from pad4pi import rpi_gpio


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

#GPIO.setmode(GPIO.BCM)
    
entered_passcode = ""
correct_passcode = "1234"

def cleanup():
    global keypad
    keypad.cleanup()

def correct_passcode_entered():
    print("Passcode accepted. Access granted.")
    cleanup()
    sys.exit()

def incorrect_passcode_entered():
    print("Incorrect passcode. Access denied.")
    cleanup()
    sys.exit()

def digit_entered(key):
    global entered_passcode, correct_passcode

    entered_passcode += str(key)
    print(entered_passcode)

    if len(entered_passcode) == len(correct_passcode):
        if entered_passcode == correct_passcode:
            correct_passcode_entered()
        else:
            incorrect_passcode_entered()

def non_digit_entered(key):
    global entered_passcode

    if key == "*" and len(entered_passcode) > 0:
        entered_passcode = entered_passcode[:-1]
        print(entered_passcode)

def key_pressed(key):
    try:
        int_key = int(key)
        if int_key >= 0 and int_key <= 9:
            digit_entered(key)
    except ValueError:
        non_digit_entered(key)

try:
    KEYPAD = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ["*", 0, "#"]
    ]

    ROW_PINS = [17, 27, 22, 24] # BCM numbering
    COL_PINS = [4, 18, 23] # BCM numbering

    factory = rpi_gpio.KeypadFactory()

    # Try factory.create_4_by_3_keypad
    # and factory.create_4_by_4_keypad for reasonable defaults

    keypad = factory.create_keypad(keypad=KEYPAD, row_pins=ROW_PINS, col_pins=COL_PINS)

    keypad.registerKeyPressHandler(key_pressed)

    print("Enter your passcode (hint: {0}).".format(correct_passcode))
    print("Press * to clear previous digit.")

    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Goodbye")
finally:
    cleanup()
