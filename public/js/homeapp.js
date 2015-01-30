var client = io.connect(location.href + "clients");

client.on('connect', function () {
    var user = localStorage.getItem("user");
    if (user == undefined) {
        user = 1;
        localStorage.setItem("user", "1");
    }

    client.emit("authentication", user);

});

client.on('all', function(docs){
    console.table(docs);
    var html = "";
    docs.forEach(function(doc){
        html += doc.name + " "+doc.state+"<br>";
    });
    $("#client").html(html);
});

$(document).ready(function(){
    $("#add_device").click(function(){
        var id = prompt("Device identifier");
        client.emit("add_device", id, function(success){
            console.log("SUCCESS?", success);
        });
    });
});