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

var keys = ['limit', 'preview', 'content', 'active', 'title']
var admin_keys = ['id', 'published', 'approved', 'user_id', 'limit', 'preview', 'content', 'active', 'title', 'url']
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
	update: function(id, params, user_id, admin){
		var time = new Date,
		check_keys = admin_keys,
		filters = {id: id};
		if(admin !== true){
			filters.published = false;
			filters.user_id = user_id;
			check_keys = keys;
		}
		var query = modelHelper.getValidQueryParams(check_keys, params);
		if(params.title){
			query.url = params.title.replace(/[^((a-z)|(A-Z)|(\s))]*/g, "").replace(/\s+/g, "-")
		}
		query.updated_at = time;
		return knex('articles').returning('*').where(filters).update(query);
	},
	create: function(data){
		var id = data.user.id,
			time = new Date;
		var query = modelHelper.getValidQueryParams(admin_keys, data);
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