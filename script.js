//JS and CSS stuff

//Add the list of images

var images = ["Antoni_Estruch-_Sant_Sopar-_Museu_dArt_de_Sabadell.jpg",
              "00.159.220_PS2.jpg",
              "00.159.223_PS1.jpg",
              "1ea2068d15476c63af1a4ef602d03f88 (1).jpg",
              "IMG_20190219_123937978_BURST000_COVER.jpg",
              "14ChrismMassFW20.jpg"];


var newelement='';
var delay = 5;

//add image divs
for (var i = 0; i < images.length; i++)
{
  newelement = newelement + '<div class="bg" id="bgimage' + i + '" style="background-image: url(' + images[i] + ');"></div>';
  console.log(newelement)
}

document.getElementById("body").innerHTML = newelement + document.getElementById("body").innerHTML;

//loop through on timer and animate
var bg = images.length-1;

function animateBG()
{

  if (bg == 0)
  {
    for (var i = 1/*NOT zero cuz that's the one on the bottom*/; i < images.length; i++)
    {
      document.getElementById("bgimage" + i).style["animation-name"] = "bgfadein";
      document.getElementById("bgimage" + i).style["animation-duration"] = "2s";
    }

    bg = images.length-1;
  }
  else
  {
    document.getElementById("bgimage" + bg).style["animation-name"] = "bgfadeout";
    document.getElementById("bgimage" + bg).style["animation-duration"] = "2s";
    
    bg--;
  }

  
}

setInterval(animateBG, delay*1000);

//fetch xlsx file
//https://1drv.ms/x/s!AptZCRjBU4chgp0Y7p3h28ISD39YJQ

//app id = 3bce3124-41e9-445d-9aff-a3b90b7de430

let myUrl = "https://onedrive.live.com/download?cid=218753C11809599B&resid=218753C11809599B%2136507&authkey=ACQvjQKYIUgwkgI&em=2";

//let myUrl = "https://www.google.com"

// However to make it work, we are going to use the cors-anywhere free service to bypass this
let proxy = 'https://mastodoncatholic-cors-server.herokuapp.com/';

// Execute request
let oReq = new XMLHttpRequest();
oReq.responseType = "arraybuffer";

function getJsDateFromExcel(excelDate) {

  // JavaScript dates can be constructed by passing milliseconds
  // since the Unix epoch (January 1, 1970) example: new Date(12312512312);

  // 1. Subtract number of days between Jan 1, 1900 and Jan 1, 1970, plus 1 (Google "excel leap year bug")             
  // 2. Convert to milliseconds.

	return new Date((excelDate - (25567 + 1))*86400*1000);

}

let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

function DateString(month_date)
{
  if (month_date > 3 && month_date < 21) return (month_date + "th");
  else if (month_date % 10 == 1) return (month_date + "st");
  else if (month_date % 10 == 2) return (month_date + "nd");
  else if (month_date % 10 == 3) return (month_date + "rd");
  else if (month_date % 10 == 4) return (month_date + "th");
  else if (month_date % 10 == 5) return (month_date + "th");
  else if (month_date % 10 == 6) return (month_date + "th");
  else if (month_date % 10 == 7) return (month_date + "th");
  else if (month_date % 10 == 8) return (month_date + "th");
  else if (month_date % 10 == 9) return (month_date + "th");
  else if (month_date % 10 == 0) return (month_date + "th");
  else
    return month_date + "";
}

oReq.addEventListener("load", function () {
    let arraybuffer = this.response;

    // convert data to binary string
    let data = new Uint8Array(arraybuffer);
    let arr = new Array();
    for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    let bstr = arr.join("");

    // Call XLSX
    let workbook = XLSX.read(bstr, {
        type: "binary"
    });

    // DO SOMETHING WITH workbook HERE 
    let first_sheet_name = workbook.SheetNames[0];
    // Get worksheet 
    let worksheet = workbook.Sheets[first_sheet_name];

    let JSONstuff = XLSX.utils.sheet_to_json(worksheet, {
        raw: true
    });

    //console.log(JSONstuff);

    let firstmasslogged = false;

    for (let i = 2; i < JSONstuff.length; i++)
    {
      console.log(JSONstuff[i]);
      console.log(JSONstuff[i][Object.keys(JSONstuff[i])[1]]);
      console.log(getJsDateFromExcel(JSONstuff[i][Object.keys(JSONstuff[i])[0]]));

      let mass_date = getJsDateFromExcel(JSONstuff[i][Object.keys(JSONstuff[i])[0]]);
      let today = new Date();

      if (mass_date > today)
      {
        let el = document.getElementById('MASSTIME');
        let li = document.getElementById('UpcomingMassTimes');

        let room_name = JSONstuff[i][Object.keys(JSONstuff[i])[1]];

        console.log(room_name);

        if (room_name.startsWith("nomass"))
        {
          room_name = room_name.replace("nomass", "");
          if (firstmasslogged == false)
          {
            el.innerHTML = "No Mass Tuesday: " + room_name + "!";
            firstmasslogged = true;
          }
          else
          {
            li.innerHTML += "<a>" + "No Mass: " + room_name + "!" + "</a>";
          }
        }
        else 
        {
          if (firstmasslogged == false)
          {
            let mass_text = "Next Mass: " + months[mass_date.getMonth()] + " " + DateString(mass_date.getDate()) + " in " + room_name;
            el.innerHTML = mass_text;
            firstmasslogged = true;
          }
          else
          {
            let mass_text = "" + months[mass_date.getMonth()] + " " + DateString(mass_date.getDate()) + " in " + room_name;
            li.innerHTML += "<a>" + mass_text + "</a>";
          }
        }
      }
    }
});

oReq.open("GET", proxy + myUrl);
oReq.send();

//generates random user ID if necessary
function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

//grabs json cookie
function getJSONcookie() {
    return document.cookie.split(';').map(function(c) {
      return c.trim().split('=').map(decodeURIComponent);
    }).reduce(function(a, b) {
      try {
        a[b[0]] = JSON.parse(b[1]);
      } catch (e) {
        a[b[0]] = b[1];
      }
      return a;
  }, {});
}

//grab cookie in JSON form
JSONcookie=getJSONcookie();

//check is userID exists
if (typeof JSONcookie.userID == "undefined")
{
  //if not, create it
  document.cookie = "userID=" + ID() + "; expires=Fri, 3 Aug 2022 20:47:11 UTC";
}

//refresh JSONcookie
JSONcookie=getJSONcookie();

//create object to send
dbData = {
  url: document.URL,
  cookiedata:JSONcookie.userID,
  misc:""
};

//log timestamp, url,  and user id to database
let dbReq = new XMLHttpRequest();
dbReq.addEventListener("load", function () {
  //console.log(this.responseText);
});

dbReq.open("GET", "https://mastodoncatholic-database.herokuapp.com/?r=" + JSON.stringify(dbData));
dbReq.send();
