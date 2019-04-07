window.onscroll = function() {myFunction()};

var navbar = document.getElementById("barra-navegacion");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("barraPegada")
    } else {
        navbar.classList.remove("barraPegada");
    }
}