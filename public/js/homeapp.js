//var socket = io.connect();
var devices = io("/devices");

devices.on('connect', function () {
    console.log("connection");
});

devices.on('all', function(docs){
    console.log(docs);
    docs = docs.map(function(doc){
        return doc.name;
    });
    var html = docs.reduce(function(previousValue, currentValue, index, array){
        return previousValue + currentValue + "<br>";
    });
    $("#devices").html(html);
});