// declaration
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
    // fet the MOTC Transport API to get json data of bus
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

// get bus stop by fetch API and store into array
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

// get bus location and save as html content
get(bus_url)
.then(response => {
    bus_location_json = response;
    document.getElementById("option1").innerHTML=bus_location_json[0].PlateNumb;
    document.getElementById("option2").innerHTML=bus_location_json[1].PlateNumb;
    document.getElementById("option3").innerHTML=bus_location_json[2].PlateNumb;
    document.getElementById("option4").innerHTML=bus_location_json[3].PlateNumb;
    document.getElementById("option5").innerHTML=bus_location_json[4].PlateNumb;
    // return bus_location_json;
    // document.write(JSON.stringify(bus_location_json));
}).catch(error => {console.log(error)})

/*Dropdown Menu*/
$('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});
/*End Dropdown Menu*/
$('.dropdown-menu li').click(function () {
    if($(this).attr('id') == 'route_option@'){
        document.write($(this).val());
    }else if(){

    }else{
        
    }

    var input = bus_location_json[$(this).val()].StopName.En,
    output = stop_array.indexOf(input) - stop_array.indexOf("Po Jen Hospital"),
    msg = '<span class="msg">The bus current location is: ',
    msg_beforStop = '<span class="msg">The bus will arrive in: ',
    msg_afterStop = '<span class="msg">The bus have passed: ';
    // $('.msg').html(msg + '<strong>' + input + '</strong>' + '(' +bus_location_json[$(this).val()].StopName.Zh_tw + ')' + '</span>');
    if(output){ // bus surpass the destination
      $('.msg').html(msg + '<strong>' + input + '</strong>' + '(' +bus_location_json[$(this).val()].StopName.Zh_tw + ')' + '</span>'
        + '<br>' + msg_afterStop + '<strong>' + Math.abs(output) + '</strong>' + 'stops from Po Jen Hospital(博仁醫院)</span>');
      }else{ // bus not passed the destination yet
        $('.msg').html(msg + '<strong>' + input + '</strong>' + '(' +bus_location_json[$(this).val()].StopName.Zh_tw + ')' + '</span>'
        + '<br>' + msg_beforStop + '<strong>' + Math.abs(output) + '</strong>' + 'stops from Po Jen Hospital(博仁醫院)</span>');
        if(0 < output <= 5){
          alert('<strong> Po Jen Hospital(博仁醫院) is coming soon.</strong>')
        }
    }
}); // $(this).parents('.dropdown').find('input').val()

