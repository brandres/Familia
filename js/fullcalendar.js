document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        height: 520,
        plugins: ['dayGrid'],
        events: function (info, successCallback) {
            $.ajax({
                type: "GET",
                url: 'api/fullcalendar/eventos',
                data: {
                    start: info.startStr,
                    end: info.endStr
                },
                contentType: "application/json"
            }).done(function (res) {
                console.log(res);
                successCallback(res.eventos);
            });
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