// import lib
import { get } from './fetch_data';
let station_url='https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/Taipei/672?%24top=30&%24format=JSON'
let bus_url='https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/Taipei/672?%24top=30&%24format=JSON'

// get all bus station name, and store into an array
// let array = get(station_url);
// console.log(array);
get(station_url);
// fetch the bus dynamical location on current bus station
// then base on bus plate of that user, calculating the distance
// let location = get(bus_url);
get(bus_url);