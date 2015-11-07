
exports.up = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.text('url').defaultTo("");
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.dropColumn('url')
	})
};
