
exports.up = function(knex, Promise) {
	return knex.schema.createTable('comments', function (table) {
		table.increments();
		table.integer('user_id');
		table.integer('article_id');
		table.text('content');
		table.timestamps();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('comments');
};
