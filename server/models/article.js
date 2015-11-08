var connection_config = require(_dir.CONFIG + '/knexfile');
var knex = require('knex')(connection_config[Configs.NODE_ENV]);
var modelHelper = require(_dir.DIR_HELPERS + '/model_helper');

//var Model = {
//	id: "Integer",
//	published: "Bool",
//	approved: "Bool",
//	user_id : "Integer",
//	limit: "Integer"
//};

var keys = ['id', 'published', 'approved', 'user_id', 'limit', 'preview', 'content', 'active', 'title', 'url']
var final_keys = ['articles.*', 'users.admin as user_admin', 'users.photo as user_photo', 'users.id as user_id', 'users.name as user_name']
module.exports = {
	all: function(query){
		if(!query){query = {}};
		query = modelHelper.getValidQueryParams(keys, query);
		return knex
		.select(final_keys)
		.from('articles')
		.leftJoin('users', 'articles.user_id', 'users.id')
		.where(query)
	},
	update: function(id, params, user_id){
		var time = new Date;
		var query = modelHelper.getValidQueryParams(keys, params);
		query.updated_at = time;
		return knex('articles').returning('*').where({id: id, user_id: user_id}).update(query);
	},
	create: function(data){
		var user = data.user,
			time = new Date;
		if(user){
			var id = user.id;
		}
		var query = modelHelper.getValidQueryParams(keys, data);
		query.created_at = time;
		query.updated_at = time;
		query.user_id = id;
		return knex.insert(query).returning('id').into('articles');
	},
	find: function(id){
		return knex('articles').where('id', id);
	},
	setViews: function(id, count){
		return knex('articles').returning('*').where({id: id}).update({view_count: count});
	}
}