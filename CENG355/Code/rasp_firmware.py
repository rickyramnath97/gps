import pyrebase
#import pythonwifi.iwlibs import Wireless
from mfrc522 import SimpleMFRC522

#!/usr/bin/env python

#from gps import *
import os
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
API_KEY = os.getenv('API_KEY')


# Get Environment variables
o
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


config = {
    "apiKey": "AIzaSyCJi0KjiDPBf60-X5oPkoeaWICHnl_Thp0",
    "authDomain": "partscrib-2fe52.firebaseapp.com",
    "databaseURL": "https://partscrib-2fe52.firebaseio.com",
    "projectId": "partscrib-2fe52",
    "storageBucket": "partscrib-2fe52.appspot.com",
    "messagingSenderId": "154343080345",
    "appId": "1:154343080345:web:3c3060fc9d028b51e7d308"
}

firebase = pyrebase.initialize_app(config)
email = "partscribmanagement@gmail.com"  
password = "dummy123" 
auth = firebase.auth()

user_admin = auth.sign_in_with_email_and_password(email, password)
db = firebase.database()

current_student_sign_in = ""
current_student_onboarding =""

def gps():
    #GPS
    # num = int(subprocess.check_output(['wc', '-l', "gps_data.txt"])[:-13])
    count = 0  
    try:
    # print lines
        gps_data = {"longitude": "43.724330436", "latitude": "-79.605497578"}
        db.child("newsBulletin/location/coordinates").update(gps_data)

    except (Exception):
        print("Done.\nExiting.")
        
    finally:
        GPIO.cleanup()
        print("Finished GPS")

entered_passcode = ""


def digit_entered(key):
    global entered_passcode

    db.child(f"userdata/{current_student_sign_in}/").update({"currentPinEntry": entered_passcode})
    if  (len(entered_passcode) < 6):
        entered_passcode += str(key)
        #send to firebase
        print("Key Pressed: " + entered_passcode)
    else:
        db.child("newsBulletin/signIn/").update({"currentUID": "", "studentSigningIn": "false"})

def key_pressed(key):
    try:
        int_key = int(key)
        if int_key >= 0 and int_key <= 9:
            digit_entered(key)

    except (Exception):
        pass
    
def keypad():
    
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
    print("Keypad Intialized... Enter keys")
    keypad.registerKeyPressHandler(key_pressed)



def onboardRFID(uid):
    print("Tap tag to write UID to rfid chip...\n")
    # First read rfid id, text
    id, text = reader.read()
    # Overtite text to be student number and then update tag table
    reader.write(uid)
    db.child(f"tags/{id}/").set(uid)
    print(f'uid: {uid} written to tag\n')

def onboarding_stream_handler(message):
    if message["data"]["studentOnBoarding"] == "true":
        global current_student_onboarding
        current_student_onboarding = message["data"]["currentUID"]
        onboardRFID(current_student_onboarding)
        # set onboarding to false
        # set to false after onboarding complete
        db.child("newsBulletin/onBoarding/").update({"currentUID": "", "studentOnBoarding": "false"})
def signIn_stream_handler(message):
    if message["data"]["studentSigningIn"] == "true":
        print("Sign-In initiated....")
        global current_student_sign_in
        current_student_sign_in = message["data"]["currentUID"]
        keypad()

        
def location_stream_handler(message):
    if message["data"]["updateLocation"] == "true":
        gps()
        db.child("newsBulletin/location/").update({"updateLocation": "false"})

def main():

    while True:
        # Listen for signIn or onboarding event
        onboard_stream = db.child("newsBulletin/onBoarding/").stream(onboarding_stream_handler)
        signIn_stream = db.child("newsBulletin/signIn/").stream(signIn_stream_handler)
        location_stream = db.child("newsBulletin/location/").stream(location_stream_handler)
        # Wait for user tap and set signIn to true to begin process for keypad entry
        try:
            id, text = reader.read()
            # Get the userID from tags table based on RFID id from database
            user_id = db.child(f'tags/{id}').get().val()
            print(f"Tag belongs to user {text}.")
            # update the current user id and singIn status at the location
            db.child("newsBulletin/signIn/").update({"currentUID": user_id['firebaseStudentID'], "studentSigningIn": "true" })

        except (Exception):
            print("Error: There was an error")
            continue
        finally:
            onboard_stream.close()
            signIn_stream.close()
            location_stream.close()

if __name__ == '__main__':
    main()
