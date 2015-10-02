# fodoo
Blog for engineers

This is a blogging site where users can view blog posts, comment on them.
Users can submit their own posts.

## How to deploy
###Dependencies
- node
- npm
- running postgresql server with database fodoo

###Start application
- npm install
- knex migrate:latest
- DEBUG=fodoo NODE_ENV=[development/production] FACEBOOK_APP_ID=[...] FACEBOOK_APP_SECRET=[...]  npm start
