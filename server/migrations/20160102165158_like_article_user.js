
exports.up = function(knex, Promise) {
 	return knex.schema.createTable('like_article_user', function (table) {
		table.increments();
		table.integer('article_id');
		table.integer('user_id');
		table.timestamps();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('like_article_user');
};
