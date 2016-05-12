var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

app.use(loopback.token({model: app.models.accessToken}));

passport.use(new Strategy({
      clientID: '1672424163009212',
      clientSecret: 'ded402cf08aa3e899ea573311a0e6c69',
      callbackURL: '/login/facebook/return',
      profileFields: ['id', 'emails', 'name']
    },
    function(accessToken, refreshToken, profile, cb) {
      // console.log(profile);
        var User = app.models.user;
        User.find({"email": profile.emails[0].value}, function (err, res) {
        if (err) {
            return cb(null, err);
        } else if (res.length == 0) {
          User.create({
            nickname: profile.name.givenName,
            password: profile.emails[0].value,
            email: profile.emails[0].value
          }, function (err, res) {
            if (err) return cb(null, err);
            return cb(null, res[0]);
          })
        } else {
            return cb(null, res[0]);
        }

      })
      // console.log(accessToken);
      // console.log(profile);
      // return cb(null, profile);
    }));


passport.serializeUser(function(user, cb) {
  // console.log(user);
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  var User = app.models.user;
  User.findById(id, function(err, user) {
    cb(null, user);
  })
});



// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// // Define routes.
// app.get('/',
//     function(req, res) {
//       res.render('home', { user: req.user });
//     });
//
// app.get('/login',
//     function(req, res){
//       res.render('login');
//     });
//
app.get('/login/facebook',
    passport.authenticate('facebook'));

app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        app.models.User.login({
            email: req.user.email,
            password: req.user.email
        }, function(err, token) {
            if (err) console.log(err);
            console.log(req.accessToken);
            res.redirect("/")
        })
        // req.accessToken = req.user;
        // req.user
    });
//
// app.get('/profile',
//     require('connect-ensure-login').ensureLoggedIn(),
//     function(req, res){
//       res.render('profile', { user: req.user });
//     });
//


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
