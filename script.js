var today = new Date();

var el = document.getElementById('room');

var room = "";

var Jan = 0;
var Feb = 1;
var Mar = 2;
var Apr = 3;
var May = 4;
var Jun = 5;
var Jul = 6;
var Aug = 7;
var Sep = 8;
var Oct = 9;
var Nov = 10;
var Dec = 11;

//fetch xlsx file
//https://1drv.ms/x/s!AptZCRjBU4chgp0Y7p3h28ISD39YJQ

//app id = 3bce3124-41e9-445d-9aff-a3b90b7de430

var myUrl = "https://onedrive.live.com/download?cid=218753C11809599B&resid=218753C11809599B%2136504&authkey=AE6Bl7Dyr-x_Q4s&em=2";

//var myUrl = "https://www.google.com"

// However to make it work, we are going to use the cors-anywhere free service to bypass this
var proxy = 'https://cors-anywhere.herokuapp.com/';

// Execute request
var oReq = new XMLHttpRequest();
oReq.responseType = "arraybuffer";

oReq.addEventListener("load", function () {
    var arraybuffer = this.response;

    // convert data to binary string
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    // Call XLSX
    var workbook = XLSX.read(bstr, {
        type: "binary"
    });

    // DO SOMETHING WITH workbook HERE 
    var first_sheet_name = workbook.SheetNames[0];
    // Get worksheet 
    var worksheet = workbook.Sheets[first_sheet_name];
    
    var JSONstuff = XLSX.utils.sheet_to_json(worksheet, {
        raw: true
    });

    console.log(JSONstuff);

    for (let i = 0; i < JSONstuff.length; i++)
    {
      console.log(JSONstuff[i]);
    }
});
// Or post, etc
oReq.open("GET", proxy + myUrl);
oReq.send();

/* set up XMLHttpRequest */
/*
var url = "https://cors-anywhere.herokuapp.com/https://jy4pja.dm.files.1drv.com/y4mRryyUBbyj6zi2MkfR2TQ_Xk8kBcBNGfxC7N626TdxSx5r3i_wrOHDqEYDShTroys7--SM0koCKvhdU77FzDXolA_uotPD20akvB34PI963fUwxnPOj9erJSUALSNkcNLRup_ZMbguoFsxkxsztUwIKijGtkJ1t4RbMZr2IX22kcaehVNvyZNPpdWkuV52hZD/spring%20mass%20events.xlsx?download&psid=1";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
    var arraybuffer = oReq.response;

    // convert data to binary string
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    // Call XLSX
    var workbook = XLSX.read(bstr, {
        type: "binary"
    });

    // DO SOMETHING WITH workbook HERE 
    var first_sheet_name = workbook.SheetNames[0];
    // Get worksheet 
    var worksheet = workbook.Sheets[first_sheet_name];
    
    var JSONstuff = XLSX.utils.sheet_to_json(worksheet, {
        raw: true
    });

    console.log(JSONstuff);

    for (let i = 0; i < JSONstuff.length; i++)
    {
      console.log(JSONstuff[i]);
    }
}

oReq.send();

*/
if (today.getMonth() == Feb)
{
  if (today.getDate() <= 19) room = "Feb 19 in Room LB. 440A";
  else if (today.getDate() <= 26) room = "next mass date";
}
else if (today.getMonth() == Mar)
{
  if (today.getDate() <= 5) room = "Mar 5 in ...";
  else if (today.getDate() <= 12) room = "next mass date";
}

el.innerHTML = room;



