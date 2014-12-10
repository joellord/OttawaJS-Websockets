function longProcess(io, socketId) {
    var min = 100000;
    var max = 2000000;
    var chunks = 1000;
    var count = (Math.random() * min) + (max-min);
    var array = [];
    //Create a fake array
    for (var i=0; i < count; i++) {
        array.push(1);
    }

    var processor = {};

    processor.process = function() {
        var index = 0;
        function processData() {
            var privateChunks = chunks;
            while (privateChunks-- && index < array.length) {
                //Do something to the array and increment the index
                index++;
            }
            if (index < array.length) {
                io.to(socketId).emit("longProcess:status", {percentageProcessed: (index/array.length)});
                setTimeout(processData, 1);
            } else {
                io.to(socketId).emit("longProcess:done", {});
            }
        }
        processData();

    };

    return processor;
}

module.exports = longProcess;