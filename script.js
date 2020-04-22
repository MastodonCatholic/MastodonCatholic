//JS and CSS stuff

//Add the list of images

var images = ["1280_e6c5440d25aa40c598c2a3c5c7cd15af.jpg",
              "1280_Antoni_Estruch-_Sant_Sopar-_Museu_dArt_de_Sabadell.jpg",
              "1280_00.159.220_PS2.jpg",
              "1280_00.159.223_PS1.jpg",
              "1280_1ea2068d15476c63af1a4ef602d03f88.jpg",
              "1280_IMG_20190219_123937978_BURST000_COVER.jpg",
              "1280_14ChrismMassFW20.jpg",
              "1280_FWchrismMass.jpg",
              "1280_holythursday.jpg",
              "1280_imgdavincilastsupper.jpg",
              ];

var sorted_images = ["1280_1ea2068d15476c63af1a4ef602d03f88.jpg",
                    "1280_e6c5440d25aa40c598c2a3c5c7cd15af.jpg",
                    "1280_Antoni_Estruch-_Sant_Sopar-_Museu_dArt_de_Sabadell.jpg",
                    "1280_00.159.220_PS2.jpg",
                    "1280_00.159.223_PS1.jpg",
                    "1280_IMG_20190219_123937978_BURST000_COVER.jpg",
                    "1280_14ChrismMassFW20.jpg",
                    "1280_FWchrismMass.jpg",
                    "1280_holythursday.jpg",
                    "1280_imgdavincilastsupper.jpg",
                    ];

var random_bg = Math.trunc(Math.random()*sorted_images.length);

for (var i = 0; i < sorted_images.length; i++)
{
  if (i+random_bg < sorted_images.length)
  {
    sorted_images[i] = images[i + random_bg];
  }
  else
  {
    sorted_images[i] = images[i + random_bg - sorted_images.length];
  }
}

images = sorted_images;

var newelement='';
var delay = 5;

//add image divs
for (var i = 0; i < images.length-1; i++)
{
  var style_element = "";
  var bg_element = '<div class="bg" id="bgimage' + (images.length-i-1) + '" style="opacity: 0; background-image: url(' + images[i] + ');"></div>';
  newelement = bg_element + style_element + newelement;
  console.log(newelement)
}

for (var i = images.length-1; i < images.length; i++)
{
  var style_element = "";
  var bg_element = '<div class="bg" id="bgimage' + (images.length-i-1) + '" style="background-image: url(' + images[i] + ');"></div>';
  newelement = bg_element + style_element + newelement;
  console.log(newelement)
}

document.getElementById("body").innerHTML = newelement + document.getElementById("body").innerHTML;

//loop through on timer and animate
var bg = 1;

function animateBG()
{
  if (bg == images.length)
    bg = 0;

  console.log(bg);
  if (bg == 0)
  {
    for (var i = 1/*NOT zero cuz that's the one on the bottom*/; i < images.length; i++)
    {
      document.getElementById("bgimage" + i).style["animation-name"] = "bgfadeout";
      document.getElementById("bgimage" + i).style["animation-duration"] = "2s";
    }

    bg++;
  }
  else
  {
    $("#" + "bgimage" + bg).css("opacity", "");
    document.getElementById("bgimage" + bg).style["animation-name"] = "bgfadein";
    document.getElementById("bgimage" + bg).style["animation-duration"] = "2s";
    
    bg++;
  }

  
}

setInterval(animateBG, delay*1000);

//fetch xlsx file
//https://1drv.ms/x/s!AptZCRjBU4chgp0Y7p3h28ISD39YJQ

//app id = 3bce3124-41e9-445d-9aff-a3b90b7de430

//let myUrl = "https://onedrive.live.com/download?cid=218753C11809599B&resid=218753C11809599B%2136507&authkey=ACQvjQKYIUgwkgI&em=2";

let myUrl = "https://www.dropbox.com/s/dl/mkc2mhajai798lk/Spring2019Mass.csv?dl=1";
//let myUrl = "https://www.dropbox.com/s/i5e6fbse73sl108/spring%20mass%20events2.xlsx?dl=1";

//let myUrl = "https://www.google.com"

// However to make it work, we are going to use the cors-anywhere free service to bypass this
let proxy = 'https://mastodoncatholic-cors-server.herokuapp.com/';

// Execute request
//let oReq = new XMLHttpRequest();
//oReq.responseType = "text";

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

//oReq.addEventListener("load", load_mass_times);

load_mass_times();

function load_mass_times() {
    //let arraybuffer = this.response;

    let arraybuffer =     
    "Wednesday Mass,,\n" +
    "Numerical Date,Date,Room\n" +
    "43964,13-May,nomass Online School, stay healthy! :( ";

    // convert data to binary string
    console.log(arraybuffer);

    let cells = [];
    
    for (let i = 0; i < arraybuffer.length; i++)
    {
      if ((arraybuffer[i] == '\n') || (arraybuffer[i] == '\0'))
      {
        cells.push([]);
      }
    }

    let row = 0;
    let column = 0;
    let newcelldata = "";

    for (let i = 0; i < arraybuffer.length; i++)
    {
      if (arraybuffer[i] == ',')
      {
        cells[row][column] = newcelldata;
        column++;
        newcelldata = "";
      }
      else if ((arraybuffer[i] == '\n') || (arraybuffer[i] == '\0'))
      {
        if (newcelldata.length != 0)
        {
          cells[row][column] = newcelldata;
          row++;
          column = 0;
          newcelldata = "";
        }
      }
      else
        newcelldata += "" + arraybuffer[i];
    }

    console.log(cells);

    let firstmasslogged = false;

    let masses_logged = 0;
    
    for (let i = 1; i < cells.length; i++)
    {
      console.log(cells[i]);
      console.log(getJsDateFromExcel(cells[i][0]));

      let mass_date = getJsDateFromExcel(cells[i][0]);
      let today = new Date();

      if (mass_date > today)
      {
        masses_logged++;
        let el = document.getElementById('MASSTIME');
        let li = document.getElementById('UPCOMINGMASSTIMES');
        let li2 = document.getElementById('EXTRA_UPCOMINGMASSTIMES');


        let room_name = cells[i][2];

        console.log(room_name);

        if (room_name.startsWith("nomass"))
        {
          room_name = room_name.replace("nomass", "");
          if (firstmasslogged == false)
          {
            el.innerHTML = "No Mass Wednesday: " + room_name + "!";
            firstmasslogged = true;
          }
          else
          {
            let newhtml = "<p>" + months[mass_date.getMonth()] + " " + DateString(mass_date.getDate()) + " No Mass: " + room_name + "!" + "</p>";        
            if (masses_logged > 5)
              li2.innerHTML += newhtml;
            else
              li.innerHTML += newhtml;
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
            let newhtml = "<p>" + mass_text + "</p>";
            if (masses_logged > 5)
              li2.innerHTML += newhtml;
            else
              li.innerHTML += newhtml;
          }
        }
      }
    }
};

//oReq.open("GET", proxy + myUrl);
//oReq.send();

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
