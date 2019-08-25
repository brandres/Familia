$(document).ready(function(){
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
                successCallback(res.eventos);
            });
        },
        eventClick: function(info) {
        },
        displayEventTime: true,
        displayEventEnd: true,
    });
    $('#calendar').contextMenu({
        selector: '.fc-view-container',
        callback: function(key, options) {
            var m = "clicked: " + key;
            window.console && console.log(m) || alert(m);
        },
        items: {
            "edit": {name: "Edit", icon: "edit"},
            "cut": {name: "Cut", icon: "cut"},
            copy: {name: "Copy", icon: "copy"},
            "paste": {name: "Paste", icon: "paste"},
            "delete": {name: "Delete", icon: "delete"},
            "sep1": "---------",
            "quit": {name: "Quit", icon: function(){
                    return 'context-menu-icon context-menu-icon-quit';
                }}
        }
    });
    calendar.render();

});