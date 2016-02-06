exports.up = function(knex, Promise) {
	return knex.schema.table('articles', function (table) {
		table.boolean('approval_pending');
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.table('articles', function (table) {
		table.dropColumn('approval_pending');
	});
};
