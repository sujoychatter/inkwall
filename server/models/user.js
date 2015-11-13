var connection_config = require(_dir.CONFIG + '/knexfile');
var knex = require('knex')(connection_config[Configs.NODE_ENV]);
var modelHelper = require(_dir.DIR_HELPERS + '/model_helper');

var show_keys = ['name', 'photo', 'admin', 'id', 'profile_id']
var user_show_keys = ['name', 'photo', 'admin', 'id', 'email', "profile_id"]
var admin_show_keys = ['name', 'photo', 'admin', 'id', 'email', "profile_id"]

var user_editable_keys = ['email', 'name']
var admin_editable_keys = ['email', 'name', 'admin', 'photo']
module.exports = {
	find: function(id, user){
		var keys = user && user.admin ? admin_show_keys : (user && user.id == id ? user_show_keys : [] )
		return knex('users').select(keys).where('id', id);
	},
	update: function(id, params, user){
		var check_keys = user && user.admin ? admin_editable_keys : user_editable_keys
		var query = modelHelper.getArticleValidQueryParams(check_keys, params);
		return knex('users').returning(user_show_keys).where({id: id}).update(params);
	},
}