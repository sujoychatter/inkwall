exports.up = function(knex, Promise) {
	return knex.schema.table('users', function (table) {
		table.text('photo_large').defaultTo("");
	})
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
		table.dropColumn('photo_large')
	})
};
