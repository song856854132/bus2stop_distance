from hashlib import sha1
import hmac
from wsgiref.handlers import format_date_time
from datetime import datetime
from time import mktime
import base64
from requests import request
from pprint import pprint
# import numpy as np
app_id = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'
app_key = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'

class Auth():

    def __init__(self, app_id, app_key):
        self.app_id = app_id
        self.app_key = app_key

    def get_auth_header(self):
        xdate = format_date_time(mktime(datetime.now().timetuple()))
        hashed = hmac.new(self.app_key.encode('utf8'), ('x-date: ' + xdate).encode('utf8'), sha1)
        signature = base64.b64encode(hashed.digest()).decode()

        authorization = 'hmac username="' + self.app_id + '", ' + \
                        'algorithm="hmac-sha1", ' + \
                        'headers="x-date", ' + \
                        'signature="' + signature + '"'
        return {
            'Authorization': authorization,
            'x-date': format_date_time(mktime(datetime.now().timetuple())),
            'Accept - Encoding': 'gzip'
        }


if __name__ == '__main__':
    # declare
    Bus = ['307', '672', '63']
    Stop, Plate = [], []

    # choose the route option
    print("Given Bus Routes")
    for i in Bus:
        print(i)
    route = input("Pick a Route: ")
    # send request
    a = Auth(app_id, app_key)
    stop_response = request('get', 'https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/Taipei/' + route + '?%24top=30&%24format=JSON', headers= a.get_auth_header())
    temp = stop_response.json()
    # data handle
    go_disance = temp[0]
    back_disance = temp[1]
    dir = input("\n1. Go distance\n2. Back Distance \nPick a Direction: ")
    if dir == '1':
        for i in go_disance['Stops']:
            Stop.append(i['StopName']['En'])
    elif dir == '2':
        for i in back_disance['Stops']:
            Stop.append(i['StopName']['En'])
    else:
        raise ValueError("wrong input")
        
    # pprint(Stop)
    # a = Auth(app_id, app_key)
    bus_response = request('get', 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/Taipei/' + route + '?%24top=30&%24format=JSON', headers= a.get_auth_header())
    # pprint(response.content)
    bus_info = bus_response.json()
    for i in bus_info:
        Plate.append([i['PlateNumb'], i['StopName']['En']])
    
    # choose plate option
    print("\nGiven Bus Plates")
    for i in range(len(Plate)):
        print(str(i) + '. ' + Plate[i][0])
    plate = input('Pick a plate: ')
    if int(plate) > len(Plate):
        raise ValueError("wrong input")

    # choose the stop option
    print("\nGiven Stop Names")
    for i in range(len(Stop)):
        print(str(i) + '. ' + Stop[i])
    stop = input('Pick a stop: ')
    if int(stop) > len(Stop):
        raise ValueError("wrong input")

    # do the arithmetic
    cur_stop = Stop.index(Plate[int(plate)][1])
    dst_stop = int(stop)
    if cur_stop <= dst_stop: # bus before sop
        print('Bus will arrive in ' + str(dst_stop - cur_stop) + ' stop.')
    else:   # bus surpass stop
        print('Bus will arrive in ' + str(cur_stop - dst_stop) + ' stop.')
