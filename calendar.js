let key="AIzaSyDvrGX1P0vJ9Y4tU8tGwm-1Jg-fJmzdSwo"
let cal_id="2tkh0cr63dceu7co01jdiv9n58@group.calendar.google.com"

var calendar = new FullCalendar.Calendar(mc_calendar, {
    plugins: ['dayGrid', 'googleCalendar' ],
    height: 500,
    googleCalendarApiKey: key,
    displayTime:false,
    eventSources: [
        {
          googleCalendarId: cal_id,
        }],
    defaultView: 'dayGridMonth',
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listYear'
    },
});

calendar.render();