
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function (table) {
		table.increments();
		table.string('username');
		table.boolean('admin');
		table.timestamps();
	});
};

exports.down = function(knex, Promise) {
  
};
