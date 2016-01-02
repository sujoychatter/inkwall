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

var keys = ['limit', 'published', 'preview', 'content', 'active', 'title', 'url']
var admin_keys = ['articles.id', 'published', 'approved', 'user_id', 'limit', 'preview', 'content', 'active', 'title', 'url']
var final_keys = ['articles.*', 'users.admin as user_admin', 'users.photo as user_photo', 'users.id as user_id', 'users.name as user_name', 'users.profile_id as user_profile_id']
module.exports = {
	all: function(query){
		if(!query){query = {active: true}};
		query = modelHelper.getValidQueryParams(admin_keys, query);
		query.active = true
		var query_keys = final_keys.join(','),
		select_string = '(select count(*) from like_article_user where articles.id = like_article_user.article_id) as likes_count , ' + query_keys;
		return knex
		.select(knex.raw(select_string))
		.from('articles')
		.orderBy('articles.id', 'desc')
		.leftJoin('users', 'articles.user_id', 'users.id')
		.where(query)
	},
	incrementComments: function(id){
		return knex('articles').where({id: id}).increment('comments_count', 1);
	},
	update: function(id, params, user_id, admin){
		var check_keys = admin_keys,
		filters = {id: id};
		if(admin !== true){
			filters.approved = false;
			filters.user_id = user_id;
			check_keys = keys;
		}
		var query = modelHelper.getArticleValidQueryParams(check_keys, params);
		return knex('articles').returning('*').where(filters).update(query);
	},
	create: function(data){
		var id = data.user.id,
			time = new Date;
		var query = modelHelper.getValidQueryParams(admin_keys, data);
		query.created_at = time;
		query.updated_at = time;
		query.user_id = id;
		query.approved = false;
		query.published = false;
		return knex.insert(query).returning('id').into('articles');
	},
	find: function(id){
		var query_keys = final_keys.join(','),
		select_string = '(select count(*) from like_article_user where articles.id = like_article_user.article_id) as likes_count , ' + query_keys;
		return knex
		.select(knex.raw(select_string))
		.from('articles')
		.where({'articles.id':id, "active": true});
	}
}