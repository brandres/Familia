$(document).ready(function() {
    var sockIO = io();
    $(".pubSubButton").click(function(event){
        var data = {id: sockIO.id,action: arguments[0].target.id,message:'holamundo'};
        $.ajax({
            type: "POST",
            url: '/api/mqtt/' + document.getElementById('topic').value,
            data: JSON.stringify(data),
            contentType: "application/json"
        }).done(function () {
            console.log(sockIO.id);
            console.log("done");
        });
        sockIO.on(sockIO.id +'/'+document.getElementById('topic').value, function(msg){
            console.log(msg);
            document.getElementById('respuestaMQTT').innerHTML = msg;
        });
        return true;
    });
});
