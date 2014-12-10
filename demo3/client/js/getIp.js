$(document).on("ready", function() {
    $.ajax({
        type: "GET",
        url: "/ip",
        success: function(resp) {
            document.getElementById("myIp").innerText = resp;
        }
    });
});
