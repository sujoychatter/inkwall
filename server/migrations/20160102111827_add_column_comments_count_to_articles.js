exports.up = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.integer('comments_count').defaultTo(0);
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.table('articles', function (table) {
		table.dropColumn('comments_count')
	})
};
