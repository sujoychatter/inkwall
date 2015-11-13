var google = require('googleapis'),
	connection_config = require(_dir.CONFIG + '/knexfile'),
	knex = require('knex')(connection_config[Configs.NODE_ENV]);

var CronJob = require('cron').CronJob;
new CronJob('0 * * * * *', function() {
  new Promise(function(resolve, reject){
		var gAnalytics = google.analytics('v3');
		var authClient = new google.auth.JWT(
			Configs.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			Configs.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
			null, ['https://www.googleapis.com/auth/analytics.readonly']);

		authClient.authorize(function (err, tokens) {
			if (err) {
				console.log("err is: " + err);
				return;
			}

			var params = {
				'auth': authClient,
				'ids': Configs.ANALYTICS_VIEW_ID,
				'metrics': 'ga:uniquePageviews',
				'start-date': '2015-11-12',
				'end-date': 'today',
				'dimensions': 'ga:pagePath'
			}

			gAnalytics.data.ga.get(params, function (err, data) {
				if(err){
					return reject(err)
				}
			    resolve(data.rows);
			});

		});
	}).then(function(data){
		
		var query = "UPDATE articles SET view_count = CASE";
		var urls = "";
		data.forEach(function(row){
			if(row[0].match(/\/posts\/[(a-z)|(A-Z)|-]*/g)){
				var post_url = row[0].slice(7);
				query = query + " WHEN url = '" + post_url + "' THEN " + row[1];
				urls = urls + "'" + post_url + "'" + ',';
			}
		})
		if(urls.length > 0){
			query = query + " END WHERE url IN " + "(" + urls.slice(0, urls.length - 1) + ")";
			knex.raw(query).then(function(success){
				console.log(success);
			});
		}
	},
	function(e){
		console.log(e)
	})
}, null, true, 'Asia/Kolkata');