//Web server
var express = require("express");
var app = express();
var server = require("http").createServer(app);

var ip = require("./helpers/ip");

//Web socket
var io = require("socket.io")(server);
var port = 8888;

//Start server
server.listen(port, function () {
    console.log("Server started on port " + port);
});

//Serve from parent directory
app.use(express.static(__dirname + "/../client"));
//Serves the IP address for the getIp helper
app.get("/ip", function(req, res) {
    res.send(ip);
});

//Socket listeners
io.on("connection", function (socket) {

    socket.on("newChatLineFromClient", function (data) {

        console.log(data);

        //Add a timestamp and send the data to the clients
        data.timestamp = (new Date()).getTime();

        io.emit("newChatLineFromServer", data);

    });



});

