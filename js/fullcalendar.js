document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        height: 520,
        plugins: ['dayGrid'],
        events: function (info, successCallback) {
            console.log(info);
            superagent.get('api/fullcalendar/eventos')
                .type('json')
                .query({
                    start: info.startStr,
                    end: info.endStr
                })
                .end(function (err, res) {

                    if (err) {
                        console.log(err);
                    } else {
                        console.log(JSON.parse(res.text).eventos);
                        successCallback(JSON.parse(res.text).eventos);
                    }
                })
        },
        eventClick: function(info) {
            alert('Event: ' + info.event.title);
            alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            alert('View: ' + info.view.type);

            // change the border color just for fun
            info.el.style.borderColor = 'red';
        },
        displayEventTime: true,
        displayEventEnd: true,
    });

    calendar.render();
});