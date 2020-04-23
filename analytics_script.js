//JS and CSS stuff

let subcribe_btn = document.getElementById("mc-embedded-subscribe");
let subscribe_email = document.getElementById("mce-EMAIL");

function specific_ID()
{
  console.log(subscribe_email.value);
  if (subscribe_email.value.includes("@"))
  {
    document.cookie = "userID=" + ID()+"_"+subscribe_email.value + "; expires=Fri, 3 Aug 2022 20:47:11 UTC";
    JSONcookie=getJSONcookie();
    send_cookie();
  }
}

subcribe_btn.addEventListener("click", specific_ID);

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

function send_cookie()
{
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
}

send_cookie();