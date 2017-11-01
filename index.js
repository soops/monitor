var errorCallback = function(e) {
    console.log("whoops", e)
}

window.AudioContext = window.AudioContext ||
                      window.webkitAudioContext;
var context = new AudioContext();

navigator.getUserMedia({video: false, audio: true}, function(stream) {
    var microphone = context.createMediaStreamSource(stream);
    
    microphone.connect(context.destination);
}, errorCallback)