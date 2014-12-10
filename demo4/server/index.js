//Web server
var express = require("express");
var app = express();
var server = require("http").createServer(app);

var ip = require("./helpers/ip");
var twit = require("twit");
var longProcess = require("./helpers/longProcess");

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

//Twitter Stream listener
var t = new twit({
    consumer_key: "",
    consumer_secret: "",
    access_token: "-",
    access_token_secret: ""
});

var stream = t.stream("statuses/filter", {track: "#RomaCity"});

io.sockets.on("connection", function (socket) {
    socket.on("longProcess:start", function (data) {
        var proc = new longProcess(io, socket.id);
        proc.process();
    });
});

stream.on("tweet", function (tweet) {
    io.emit("tweet", tweet);
});