window.AudioContext = window.AudioContext || window.webkitAudioContext;
        
var context = new AudioContext();
var gainNode = context.createGain();
var microphone;
var initialized = false;

document.getElementById("init").onclick = function() {
    if (initialized != true) {
        var errorCallback = function(e) {
            console.log("whoops", e);
        }
        
        navigator.getUserMedia({video: false, audio: true}, function(stream) {
            microphone = context.createMediaStreamSource(stream);
            gainNode.gain.value = 1;
            
            microphone.connect(gainNode);
            gainNode.connect(context.destination);
            initialized = true;
            document.getElementById("init").innerText = "stop";
        }, errorCallback);
    }
    
    if (document.getElementById("init").innerText == "start") {
        gainNode.connect(context.destination);
        document.getElementById("init").innerText = "stop";
    } else if (document.getElementById("init").innerText == "stop") {
        gainNode.disconnect(context.destination);
        document.getElementById("init").innerText = "start";
    }
}