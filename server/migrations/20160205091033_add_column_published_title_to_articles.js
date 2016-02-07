exports.up = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.text('published_title');
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.table('articles', function (table) {
		table.dropColumn('published_title');
	});
};
