var connection_config = require(_dir.CONFIG + '/knexfile');
var knex = require('knex')(connection_config[process.env.NODE_ENV]);

module.exports = {

	// save: function(req, res, next){
	// 	var title = req.body.title,
	// 	content = req.body.content,
	// 	user = req.user,
	// 	time = new Date;
	// 	if(user){
	// 		var id = user.id;
	// 	}
	// 	knex.insert({title: title,
	// 				content: content,
	// 				published: false,
	// 				approved: false,
	// 				user_id: id,
	// 				created_at: time,
	// 				updated_at: time
	// 			}).returning('*').into('articles').then(function(article){
	// 				req.saved = true;
	// 				req.article = article;
	// 				next();
	// 			});
	// },
	create: function(data){
		var user = data.user,
		time = new Date;
		if(user){
			var id = user.id;
		}
		return knex.insert({title: "",
					content: "",
					published: false,
					approved: false,
					user_id: id,
					created_at: time,
					updated_at: time
				}).returning('id').into('articles');
	},
	find: function(id){
		return knex('articles').where('id', id);
	}

}