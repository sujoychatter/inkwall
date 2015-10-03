var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var connection_config = require('./knexfile');
var knex = require('knex')(connection_config[process.env.NODE_ENV]);
var facebookAppId = process.env.FACEBOOK_APP_ID;
var facebookSecretKey = process.env.FACEBOOK_APP_SECRET;

router.use(session({ secret: 'keyboard cat', key: 'sid', resave: false, saveUninitialized: false}));
//facebook login initialize via passport facebook
router.use(passport.initialize());
router.use(passport.session());
passport.use(new FacebookStrategy({
		clientID: facebookAppId,
		clientSecret: facebookSecretKey,
		callbackURL: "http://localhost:3000/auth/facebook/callback",
		enableProof: false,
		profileFields: ['id', 'displayName', 'link', 'photos', 'emails']
	},
	function(accessToken, refreshToken, profile, done) {
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
