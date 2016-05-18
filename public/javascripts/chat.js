var socket = io("http://localhost:3000");

socket.emit('join', dataLayer.sala); console.log('js: ', dataLayer.sala);

socket.on("send-client", function(msg) {
  document.getElementById("chat").innerHTML += msg;
});

var enviar = function() {
  var msg = document.getElementById('msg').value;
  socket.emit('send-server', msg);
};
