exports.up = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.text('published_preview');
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.table('articles', function (table) {
		table.dropColumn('published_preview');
	});
};
