import RPi.GPIO as GPIO

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


            
def keypad():
    
    GPIO.setmode(GPIO.BCM)
    DEBUG = 1
    LOGGER = 1
"""
    GPIO.setup(2, GPIO.IN)
    GPIO.setup(3, GPIO.IN)
    GPIO.setup(4, GPIO.IN)
    GPIO.setup(17, GPIO.IN)
    GPIO.setup(27, GPIO.IN)
"""
    '''
    count = 0
    num_string = ''
    prev_num = 'a'
    while count < 5:
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
     '''
from pad4pi import rpi_gpio

KEYPAD = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["*", 0, "#"]
]

ROW_PINS = [2, 3, 4, 17] # BCM numbering
COL_PINS = [27, 22, 10] # BCM numbering

factory = rpi_gpio.KeypadFactory()

# Try factory.create_4_by_3_keypad
# and factory.create_4_by_4_keypad for reasonable defaults
keypad = factory.create_keypad(keypad=KEYPAD, row_pins=ROW_PINS, col_pins=COL_PINS)

def printKey(key):
    print(key)

# printKey will be called each time a keypad button is pressed
keypad.registerKeyPressHandler(printKey)
if __name__ == '__main__':
    keypad()