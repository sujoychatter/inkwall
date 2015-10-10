
exports.up = function(knex, Promise) {
	return knex.schema.createTable('articles', function (table) {
		table.increments();
		table.string('title');
		table.integer('user_id');
		table.text('content');
		table.boolean('published');
		table.boolean('approved');
		table.integer('view_count');
		table.timestamps();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('articles');
};
