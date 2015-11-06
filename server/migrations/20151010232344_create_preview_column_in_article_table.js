
exports.up = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.text('preview').defaultTo("");
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.dropColumn('preview')
	})
};
