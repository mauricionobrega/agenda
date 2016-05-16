var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    error = require('./middlewares/error'),
    dust = require('dustjs-linkedin'),
    consolidate = require('consolidate'),
    app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'dust');
app.engine('dust', consolidate.dust);
app.use(express.static(__dirname + '/public'));
app.use(cookieParser('ntalk'));
app.use(session({
  // genid: function(req) {
  //   return genuuid() // use UUIDs for session IDs
  // },
  'secret': 'keyboard cat',
  'resave': false,
  'saveUninitialized': false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));

app.use(function(request, response, next) {
  next();
  // if (request.query.version) {
  //   next();
  // } else {
  //   response.status(500).json({
  //     status: 'Acesso negado!'
  //   });
  // }
});

load('models').then('middlewares').then('controllers').then('routes').into(app);

app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, function(){
  console.log('Ntalk no ar.');
});