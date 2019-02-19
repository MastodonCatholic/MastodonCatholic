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
