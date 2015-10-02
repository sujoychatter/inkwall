
exports.up = function(knex, Promise) {
 	return knex.schema.createTable('tags', function (table) {
		table.increments();
		table.string('name');
		table.timestamps();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('tags');
};
