
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function (table) {
		table.increments();
		table.string('name');
		table.boolean('admin').defaultTo(false);
		table.string('photo');
		table.string('email');
		table.string('profile_id');
		table.timestamps();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
