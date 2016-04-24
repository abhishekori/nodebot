


var app = require('express')();
var speak = require("speakeasy-nlp");
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){

var r=speak.sentiment.analyze(msg)
console.log(r);
if(r.score>0){
  var pos=r.positive;

io.emit('chat message', "aww thank you! you are "+pos.words[0]+" too");
}else if(r.score<0){
  var neg=r.negative;
    console.log("u are bad");
    io.emit('chat message', "your mom "+neg.words[0]+"s");
}else{
  console.log("Sorry i did not understand");
  io.emit('chat message',"Sorry i did not understand: "+msg);
}

    console.log(msg);

  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
