var express = require('express');
var session = require('express-session');
var path = require('path');
global._dir = require('./config/directory');
global.Configs = require('./config/app_config');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var connection_config = require('./config/knexfile');
var knex = require('knex')(connection_config[Configs.NODE_ENV]);
var facebookAppId = Configs.FACEBOOK_APP_ID;
var router = require('./routes');
var facebookSecretKey = Configs.FACEBOOK_APP_SECRET;

var app = express();

// view engine setup
app.set('views', path.join(_dir.DIR_VIEWS));
app.set('view engine', 'jade');

app.use(session({ secret: 'keyboard cat', key: 'sid', resave: false, saveUninitialized: false}));
//facebook login initialize via passport facebook
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy({
		clientID: facebookAppId,
		clientSecret: facebookSecretKey,
		callbackURL: "http://localhost:3000/auth/facebook/callback",
		enableProof: false,
		profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
	},
	function(accessToken, refreshToken, profile, done){
		knex.select().from('users').where('profile_id', profile.id).then(function(rows){
			if(rows.length == 1){
				return done(null, rows[0]);
			}
			else{
				knex('users').insert({name: profile.displayName,
					admin: false,
					photo: profile.photos[0].value,
					email: profile.email,
					profile_id: profile.id
				}).then(function(user){
					knex.select().from('users').where('profile_id', profile.id).then(function(rows){
						if(rows.length == 1){
							return done(null, rows[0]);
						}
					});
				})
			}
		});
	}
));
passport.use(new GoogleStrategy({
	clientID: "351252051601-ta8s8cr8st2l3ubien8ldbu948g09l6j.apps.googleusercontent.com",
    clientSecret: 'al9QIgecCfgQbGmPQAi9_G_u',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
	function(token, tokenSecret, profile, done) {
		knex.select().from('users').where('profile_id', profile.id).then(function(rows){
			if(rows.length == 1){
				return done(null, rows[0]);
			}
			else{
				knex('users').insert({name: profile.displayName,
					admin: false,
					photo: profile.photos[0].value,
					email: profile.email,
					profile_id: profile.id
				}).then(function(user){
					knex.select().from('users').where('profile_id', profile.id).then(function(rows){
						if(rows.length == 1){
							return done(null, rows[0]);
						}
					});
				})
			}
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(_dir.DIR_PUBLIC + '/images/logo.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(_dir.DIR_PUBLIC)));
app.use(function(req,res,next){
	if (process.env.NODE_ENV == "production"){
		req.tracking_element = "<script src='/tracking.js' type='text/javascript'></script>"
	}
	return next();
})

router.init(app);

//Facebook login paths
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/',
		failureRedirect: '/'
	})
);

app.get('/auth/google', passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']}));

app.get('/auth/google/callback', 
	passport.authenticate('google', {
		successRedirect : '/',
		failureRedirect: '/' 
	})
);

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
