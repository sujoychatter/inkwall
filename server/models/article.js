var connection_config = require(_dir.CONFIG + '/knexfile');
var knex = require('knex')(connection_config[Configs.NODE_ENV]);

module.exports = {
	
	fetch: function(query) {
		if(!query){query = {}};
		return knex('articles').where(query);
	},
	update: function(id, params, user_id){
		var title = params.title,
		content = params.content,
		time = new Date;
		return knex('articles').where({id: id, user_id: user_id}).update({title: title, content: content, updated_at: time});
	},
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
	},
	setViews: function(id, count){
		return knex('articles').returning('*').where({id: id}).update({view_count: count});
	}
}