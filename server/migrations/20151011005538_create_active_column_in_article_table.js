
exports.up = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.boolean('active').defaultTo(true);
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.dropColumn('active');
	})
};
