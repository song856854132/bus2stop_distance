// $(function () {
//     $.ajax({
//         type: 'GET',
//         url: 'https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/Taipei/672?%24top=30&%24format=JSON',
//         dataType: 'json',
//         headers: GetAuthorizationHeader(),
//         success: function (Data) {
//             $('body').text(JSON.stringify(Data));
//         }
//     });
// });
let station_url='https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/Taipei/672?%24top=30&%24format=JSON'
let bus_url='https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeNearStop/City/Taipei/672?%24top=30&%24format=JSON'
let stop_array = ["Sanmin Rd. Entrance",
    "Sanmin and Jiankang Intersection(Xisong High School)",
    "Jiankang New Village",
    "Changshou Park",
    "Tri-Servics General Hospital Songshan Branch",
    "Nanjing New Village",
    "Po Jen Hospital",
    "Taipei City Motor Vehicles Office(Guangfu)",
    "MRT Sun Yat-sen Memorial Hall Sta.(Guangfu)",
    "Dr. Sun Yat-sen Memorial Hall",
    "Citizens Housing",
    "Sanzhangli",
    "Guangfu S. Rd. Entrance",
    "Sanxing Elementary School(Linjiang St. Night Market)",
    "George Vocational High School of Taipei",
    "MRT Liuzhangli(Keelung Rd.)",
    "Heping High School",
    "Keelung and Changxing Intersection",
    "NTU Cancer Center(Keelung Rd.)",
    "NTUST",
    "Gongguan",
    "Fuhe Bridge(Linsen Rd.)",
    "Yongyuan Rd.",
    "Xiulang Elementary School",
    "Dehe Rd.",
    "Zhongxing New Village",
    "Zhongxing Village 2",
    "Chih-Kuang Senior Commercial & Industrial Vocational High School",
    "Nanshijiao(Jingping Rd.)",
    "MRT Jingping Sta.",
    "Jingping & Jingde Intersection",
    "MRT Xiulang Bridge Sta.",
    "Zhongzheng&Huanhe Rd.Intersection",
    "672Shuttle"];


async function get(url) {
    
    const res = await fetch(url, {
        method: 'GET',
        // dataType: 'json',
        headers: GetAuthorizationHeader(),
    });
    const result_2 = await res.json();
    return result_2;
    // document.write(JSON.stringify(result_2));
    // var jsonData = JSON.parse(result_2);
    // for (let i = 0; i < jsonData..length; i++)
}


function GetAuthorizationHeader() {
    var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}
// get bus stop by fetch API
// get(station_url)
// .then(response => {
//     // response[1] represent routine from 民生社區 to 大鵬新城
//     let bus_stop = response[1];
//     for (let i = 0; i < bus_stop.Stops.length; i++) {
//         stop_array = bus_stop.Stops[i];
//         // document.write(JSON.stringify(stop_array.StopName.En));
//     }
// })
// .catch(error => {console.log(error)})

// get bus location and calculate the distance between them
// get(bus_url)
// .then(response => {
//     let bus = response[0];
//     return bus.StopName;
//     // document.write(JSON.stringify(bus.StopName));
// }).then(stop => {
//     let index_bgn = stop_array.indexOf(stop.StopName);
//     let index_dst = stop_array.indexOf("Po Jen Hospital")     
//     // document.write(index_dst - index_bgn)
// }).catch(error => {console.log(error)})

// calculate the distance of bus to stop
// document.write(JSON.stringify(stop_array.StopName));

// export { get };