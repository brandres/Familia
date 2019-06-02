var sockIO = new io();

function confirmInput(){
    document.forms[0].fname.value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", '/api/mqtt/'+ document.forms[0].fname.value, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}