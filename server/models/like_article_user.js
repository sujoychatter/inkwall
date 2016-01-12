var connection_config = require(_dir.CONFIG + '/knexfile');
var knex = require('knex')(connection_config[Configs.NODE_ENV]);

module.exports = {
	create: function(article_id, user_id){
		var time = new Date(),query = {};
		query.created_at = time;
		query.updated_at = time;
		query.article_id = article_id;
		query.user_id = user_id;
		return knex.insert(query).into('like_article_user');
	},
	all: function(query){
		if(!query)
			query = {};
		return knex('like_article_user').where(query).returning('*');
	}
}