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
- DATABASE_URL=postgresql://[user[:password]@][netloc][:port]/fodoo node models/database.js
- NODE_ENV=<production/development> npm start
