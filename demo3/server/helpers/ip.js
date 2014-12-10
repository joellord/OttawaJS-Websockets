var os=require('os');
var ifaces=os.networkInterfaces();
var myIp = "";
for (var dev in ifaces) {
    var alias=0;
    ifaces[dev].forEach(function(details){
        if (details.family=='IPv4') {
            if (dev === "en1") {
                console.log(details.address);
                myIp = details.address;
            }
            ++alias;
        }
    });
}

module.exports = myIp;