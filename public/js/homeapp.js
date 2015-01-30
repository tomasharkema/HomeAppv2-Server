//var socket = io.connect();
var devices = io("/devices");

devices.on('connect', function () {
    console.log("connection");
});

devices.on('all', function(docs){
    console.table(docs);
    var html = "";
    docs.forEach(function(doc){
        html += doc.name + " "+doc.state+"<br>";
    });
    $("#devices").html(html);
});