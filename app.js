//
// app.js
// http://andantesoftware.com/milkshake/
// Distributed under the MIT License
//

// User settings
var slide = 'sample.slide.js', // './public/slide/samle.slide.js' -> 'sample.slide.js' 
    user = 'username', // username
    pass = 'password'; // password

// require modules
var express = require('express')
  , sio = require('socket.io');

// generate random secret key
var seckey = function(n){
  var c = (
    'abcdefghijklmnopqrstuvwxyz'+
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+
    '0123456789'+
    ',.?;!@#$%^*()_-+'
    ).split('')
    , q = '';
  
  for (var i=0; i < n; i++){
    q += c[Math.floor(Math.random() * c.length)];
  }
  return q;
}(64);

// create Server
var app = express.createServer();

// configure
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/view');
  app.set('view engine', 'jade');
});

// BASIC Authentication
app.all('/admin', express.basicAuth(function(username, password){
  return username === username && password === pass;
}));

// routing
app.get('/', function(req, res){
  res.render('index', { slideURL: '/slide/' + slide,
                        layout: false });
});

app.get('/slide', function(req, res){
  res.render('slide', { slideURL: '/slide/' + slide,
                        layout: false });
});

app.get('/admin', function(req, res){
  res.render('admin', { slideURL: '/slide/' + slide,
                        passkey: seckey,
                        layout: false });
});

app.get('/log', function(req, res){
  res.render('log', { layout: false });
});


// listen
app.listen(3000, function(){
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});

// socket.io
var io = sio.listen(app)
  , page = block = 0
  , usernames = {}
  , comments = [];

// log comments
function logComment(comment){
  comments.push(comment);
  while(comments.length > 50){
    comments.shift();
  }
}

// main
io.sockets.on('connection', function(socket){
  // init slide
  socket.emit('init slide', {page: page, block: block});
  socket.emit('init comments', comments);
  
  // login
  socket.on('login', function(name, cb){
    if(usernames[name]){
      cb(false);
    }else{
      cb(true);
      usernames[name] = socket.username = name;
      
      socket.broadcast.emit('userinfo', {type: 'connected', user: socket.username, date: (new Date).getTime()});
      io.sockets.emit('usernames', usernames);
    }
  });
  
  // logout
  socket.on('disconnect', function(){
    if (!socket.username) return false;
    delete usernames[socket.username];
    socket.broadcast.emit('userinfo', {type: 'disconnected', user: socket.username, date: (new Date).getTime()});
    socket.broadcast.emit('usernames', usernames);
  });
  
  // next,prev
  socket.on('order', function(order){
    if(order.secKey === seckey){
      io.sockets.emit('order', {
        type: order.type,
        page: order.page,
        block: order.block,
        date: (new Date).getTime()
      });
      page = order.page;
      block = order.block;
    }
  });
  
  // comments
  socket.on('comment', function(comment){
    io.sockets.emit('show comment', {
      user: socket.username,
      message: comment,
      date: (new Date).getTime()
    });
    logComment({
        user: socket.username,
        message: comment
    });
  });
});
