
exports.up = function(knex, Promise) {
	return knex.schema.createTable('article_tags', function (table) {
		table.increments();
		table.integer('article_id');
		table.integer('tag_id');
		table.timestamps();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('article_tags');
};
