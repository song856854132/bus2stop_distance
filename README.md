# 672 Bus v1 Documentation

## Simple discription

It's a simple project that can dynamically search the distance to target from where your are. Base on the Bus plate you choose, the script will fetch the [PTX Bus API](https://ptx.transportdata.tw/MOTC/) to get json data, which contain your bus info including current location.
Here is the example of code:
```javascript=
let bus_url='https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/Taipei/672?%24top=30&%24format=JSON'

async function get(url) {
    // fet the MOTC Transport API to get json data of bus
    const res = await fetch(url, {
        method: 'GET',
        // dataType: 'json',
        headers: {
            var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
            var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

            var GMTString = new Date().toGMTString();
            var ShaObj = new jsSHA('SHA-1', 'TEXT');
            ShaObj.setHMACKey(AppKey, 'TEXT');
            ShaObj.update('x-date: ' + GMTString);
            var HMAC = ShaObj.getHMAC('B64');
            var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
        },
    });
    const result_2 = await res.json();
    return result_2;
    // document.write(JSON.stringify(result_2));
}
```
And the material below is what we get from PTX API acutally look like:
```json=
  { // Bus A
    "PlateNumb": "398-U8",
    "OperatorID": "700",
    "RouteUID": "TPE10785",
    "RouteID": "10785",
    "RouteName": {
      "Zh_tw": "672",
      "En": "672"
    },
    "SubRouteUID": "TPE107850",
    "SubRouteID": "107850",
    "SubRouteName": {
      "Zh_tw": "672",
      "En": "672"
    },
    "Direction": 0,
    "StopUID": "TPE38874",
    "StopID": "38874",
    "StopName": {
      "Zh_tw": "永元路",
      "En": "Yongyuan Rd."
    },
    "StopSequence": 12,
    "DutyStatus": 1,
    "BusStatus": 0,
    "A2EventType": 1,
    "GPSTime": "2022-02-12T17:40:05+08:00",
    "SrcUpdateTime": "2022-02-12T17:40:30+08:00",
    "UpdateTime": "2022-02-12T17:40:35+08:00"
  },
  { // Bus B .etc.
    "PlateNumb": "728-U3",
    "OperatorID": "700",
    "RouteUID": "TPE10785",
    ... <snip> ...
```

## How to use it
```shell=
$ git clone https://github.com/song856854132/bus2stop_distance.git
```
And then you're free to go. Just pick the bus plate that you're riding, the result will show below.
![](https://i.imgur.com/PbIsUgY.png)

## Why use front-end
There is many way to write this program, from web application to software application, from python to shell script. And acutally I'm able to write all of it. But base on my purpose, I want to write it as every one can simply open up and run it. Since every have the browser, the best way to write it is front-end style. Thus user don't need to install Node.js, PHP or Python anyway. However, the version 2 might come out with complete web app with React.js and Node.js that offer a full funtion of bus info searching system.