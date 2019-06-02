$(document).ready(function(){
    var scroll_start = 0;
    var startchange = $('#fondo');
    var Heightofit = startchange.outerHeight() - 300;
    $(window).scroll(function() {
        scroll_start = $(this).scrollTop();
        if(scroll_start > Heightofit) {
            $('.navbar').css('background-color','rgba(34,34,34,0.9)');
        } else {
            $('.navbar').css('background-color','transparent');
        }
    });
});