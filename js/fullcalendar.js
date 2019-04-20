document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        events: {
            url: 'http://localhost:3000/eventos',
            method: 'GET',
            extraParams: {
                custom_param1: 'something',
                custom_param2: 'somethingelse'
            },
            failure: function () {
                alert('there was an error while fetching events!');
            },
            color: 'yellow',   // a non-ajax option
            textColor: 'black' // a non-ajax option
        }
    });

    calendar.render();
});