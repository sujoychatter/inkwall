console.log('connecting to database...');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/fodoo';
console.log('connected!');

console.log('creating articles table...');
var articles_client = new pg.Client(connectionString);
articles_client.connect();
var articles_query = articles_client.query('CREATE TABLE articles(id SERIAL PRIMARY KEY, content TEXT not null, user_id INTEGER not null)');
articles_query.on('end', function() {console.log('articles table created!'); articles_client.end(); });

console.log('creating users table...');
var users_client = new pg.Client(connectionString);
users_client.connect();
var users_query = users_client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, name TEXT not null)');
users_query.on('end', function() {console.log('users table created!'); users_client.end(); });

console.log('creating tags table...');
var tags_client = new pg.Client(connectionString);
tags_client.connect();
var tags_query = tags_client.query('CREATE TABLE tags(id SERIAL PRIMARY KEY, name TEXT not null)');
tags_query.on('end', function() {console.log('tags table created!'); tags_client.end(); });

console.log('creating article_tags table...');
var article_tags_client = new pg.Client(connectionString);
article_tags_client.connect();
var article_tags_query = article_tags_client.query('CREATE TABLE article_tags(id SERIAL PRIMARY KEY, article_id INTEGER not null, tag_id INTEGER not null)');
article_tags_query.on('end', function() {console.log('article_tags table created!'); article_tags_client.end(); });