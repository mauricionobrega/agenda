var express = require('express'),
    cfg = require('./config.json'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    compression = require('compression'),
    csurf = require('csurf'),
    error = require('./middlewares/error'),
    dust = require('dustjs-linkedin'),
    consolidate = require('consolidate'),
    redisAdapter = require('socket.io-redis'),
    RedisStore = require('connect-redis')(expressSession),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cookie = cookieParser(cfg.SECRET),
    store = new RedisStore({
      'prefix': cfg.KEY
    });

app.set('views', __dirname + '/views');
app.set('view engine', 'dust');
app.engine('dust', consolidate.dust);
app.disable('x-powered-by');

app.use(compression());
app.use(cookie);
app.use(expressSession({
  'secret': cfg.SECRET,
  'name': cfg.KEY,
  'resave': true,
  'saveUninitialized': true,
  'store': store
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public', {
  'maxAge': cfg.CACHE
}));
app.use(csurf());
app.use(function(request, response, next) {
  response.locals._csrf = request.csrfToken();
  next();
});

io.use(function(socket, next) {
  var data = socket.request;
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[cfg.KEY];
    store.get(sessionID, function(err, session) {
      if (err || !session) {
        return next(new Error('acesso negado'));
      } else {
        socket.handshake.session = session;
        return next();
      }
    });
  });
});

load('models').then('middlewares').then('controllers').then('routes').into(app);
load('sockets').into(io);

app.use(error.notFound);
app.use(error.serverError);

io.adapter(redisAdapter(cfg.REDIS));

server.listen(3000, function(){
  console.log('Ntalk no ar.');
});

module.exports = app;
