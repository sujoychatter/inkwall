var connection_config = require(_dir.CONFIG + '/knexfile');
var knex = require('knex')(connection_config[Configs.NODE_ENV]);

module.exports = {
	fetch: function(query) {
		if(!query){query = {}};
		return knex('articles').where(query);
	},
	save: function(req, res, next){
		var title = req.body.title,
		content = req.body.content,
		user = req.user,
		time = new Date;
		if(user){
			var id = user.id;
		}
		return knex.insert({title: title,
					content: content,
					published: false,
					approved: false,
					user_id: id,
					created_at: time,
					updated_at: time
				}).returning('*').into('articles').then(function(article){
					req.saved = true;
					req.article = article;
					next();
				});
	}
}