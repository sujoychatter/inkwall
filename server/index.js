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
var router = require('./routes');
var facebookAppId = Configs.FACEBOOK_APP_ID;
var facebookSecretKey = Configs.FACEBOOK_APP_SECRET;
var googleAppId = Configs.GOOGLE_APP_ID;
var googleSecretKey = Configs.GOOGLE_APP_SECRET;

var app = express();

var callbackURLGoogle = Configs.GOOGLE_AUTH_CALLBACK_URL_DEV
var callbackURLFacebook = Configs.FACEBOOK_AUTH_CALLBACK_URL_DEV
if(Configs.NODE_ENV == "production"){
	callbackURLGoogle = Configs.GOOGLE_AUTH_CALLBACK_URL_PROD
	callbackURLFacebook = Configs.FACEBOOK_AUTH_CALLBACK_URL_PROD
}

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
		callbackURL: callbackURLFacebook,
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
					email: profile.emails[0].value,
					profile_id: profile.id,
					photo_large: "http://graph.facebook.com/" + profile.id + "/picture?width=250&height=250"
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
	clientID: googleAppId,
    clientSecret: googleSecretKey,
    callbackURL: callbackURLGoogle
  },
	function(token, tokenSecret, profile, done) {
		knex.select().from('users').where('profile_id', profile.id).then(function(rows){
			var photo = profile.photos[0].value,
				photo_large = photo.slice(0, photo.length - 5) + "sz=250";
			if(rows.length == 1){
				return done(null, rows[0]);
			}
			else{
				knex('users').insert({name: profile.displayName,
					admin: false,
					photo: photo,
					email: profile.emails[0].value,
					profile_id: profile.id,
					photo_large: photo_large
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
app.use(favicon(path.join(_dir.DIR_PUBLIC + '/images/favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(_dir.DIR_PUBLIC), { maxAge: 31536000 }));
app.use(function(req,res,next){
	if (process.env.NODE_ENV == "production"){
		req.tracking_element = "<script src='/tracking.js' type='text/javascript'></script>"
	}
	return next();
})

router.init(app);

//Facebook login paths
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
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
