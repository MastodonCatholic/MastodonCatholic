//JS and CSS stuff

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

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
  
    let arraybuffer="";

    let file = "masstimes.csv";

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                arraybuffer = allText;
            }
        }
    }
    rawFile.send(null);

    // convert data to binary string
    console.log(arraybuffer);

    let cells = [];
    
    for (let i = 0; i < arraybuffer.length; i++)
    {
      if ((arraybuffer[i] == '\n') || (arraybuffer[i] == '\0') || i == arraybuffer.length-1)
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
      else if ((arraybuffer[i] == '\n') || (arraybuffer[i] == '\0') || i == arraybuffer.length-1)
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
      let mass_date = new Date(cells[i][0]);
      let today = new Date();

      console.log(today);
      console.log(mass_date);

      if (mass_date > today)
      {
        masses_logged++;
        let el = document.getElementById('MASSTIME');
        let li = document.getElementById('UPCOMINGMASSTIMES');
        let li2 = document.getElementById('EXTRA_UPCOMINGMASSTIMES');
        
        let scr1 = document.getElementById('MASSTIME_SCREENSHOT1');
        let scr2 = document.getElementById('MASSTIME_SCREENSHOT2');
        let room_name = cells[i][1];

        console.log(room_name);

        if (room_name.startsWith("nomass"))
        {
          room_name = room_name.replace("nomass", "");
          if (firstmasslogged == false)
          {
            try{
              el.innerHTML = "No Mass " + days[mass_date.getDay()] + ": " + room_name + "!";
            }
            catch(err){
    
            }
            
            try
            {
              scr1.innerHTML = "NO MASS";
              scr2.innerHTML = "NO MASS";
            }
            catch(err){
    
            }
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
            console.log("WHAT?");
            try{
            el.innerHTML = mass_text;
            }
            catch(err){
    
            }
            try {
              scr1.innerHTML = days[mass_date.getDay()] + " " + months[mass_date.getMonth()] + " " + DateString(mass_date.getDate()) + "@ 11AM";
              scr2.innerHTML = " in " + room_name;
            }
            catch(err){
              console.log(err);
              console.log("this failed");
            }
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
