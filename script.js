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
