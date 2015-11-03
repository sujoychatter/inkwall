var connection_config = require(_dir.CONFIG + '/knexfile');
var knex = require('knex')(connection_config[Configs.NODE_ENV]);

module.exports = {
	find: function(id){
		return knex('users').where('id', id);
	}
}