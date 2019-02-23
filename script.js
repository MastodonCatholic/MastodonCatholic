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

    for (let i = 2; i < JSONstuff.length; i++)
    {
      console.log(JSONstuff[i]);
      console.log(JSONstuff[i][Object.keys(JSONstuff[i])[1]]);
      console.log(getJsDateFromExcel(JSONstuff[i][Object.keys(JSONstuff[i])[0]]));

      let mass_date = getJsDateFromExcel(JSONstuff[i][Object.keys(JSONstuff[i])[0]]);
      let today = new Date();

      if (mass_date > today)
      {
        let el = document.getElementById('room');

        let room = "Next Mass: " + months[mass_date.getMonth()] + " " + DateString(mass_date.getDate()) + " in room " + JSONstuff[i][Object.keys(JSONstuff[i])[1]];

        el.innerHTML = room;
        break;
      }
    }
});
// Or post, etc
oReq.open("GET", proxy + myUrl);
oReq.send();


