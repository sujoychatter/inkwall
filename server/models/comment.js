var connection_config = require(_dir.CONFIG + '/knexfile');
var knex = require('knex')(connection_config[Configs.NODE_ENV]);
var modelHelper = require(_dir.DIR_HELPERS + '/model_helper');

module.exports = {
	all: function(query){
		if(!query){query = {}};
		return knex
		.select('comments.*')
		.from('comments')
		.orderBy('comments.created_at', 'desc')
		.leftJoin('users', 'comments.user_id', 'users.id')
		.where(query)
	},
	create: function(data){
		var time = time = new Date();
		query = data;
		query.created_at = time;
		query.updated_at = time;
		return knex.insert(query).into('comments').returning('*');
	}
}