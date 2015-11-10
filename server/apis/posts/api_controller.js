var Article = require(_dir.DIR_MODELS + '/article'); 
var User = require(_dir.DIR_MODELS + '/user'); 
module.exports = {
	updatePost: function(req, res, next){
		var post = req.body;
		var admin = req.user.admin;
		return Article.update(req.params.id, post, req.user.id, admin).then(
			function(articles){
				return res.status(200).send({posts: articles});
			}
		);
	},
	createPost: function(req, res, next){
		return Article.create({user: req.user, active: true}).then(function(id){
			return res.status(201).send({id: id[0]});
		});
	},

	getPosts: function(req, res, next){
		var query = req.query || {}
		return Article.all(query).then(function(posts){
			res.status(200).send({posts: posts});
		})
	},
	
	getPostsByName: function(req, res, next){
		Article.all({url: req.query.name}).then(function(articles){
			return res.status(200).send({posts: articles});
		})
	},
	getPost: function(req, res, next){
		return Article.all({id: req.params.id}).then(function(posts){
			res.status(200).send({posts: posts});
		})
	},
	getMyPosts: function(req, res,next){
		var filter = {user_id: req.user.id}
		if(req.user.admin === true){
			filter = {}
		}
		return Article.all(filter).then(function(posts){
			res.status(200).send({posts: posts});
		})
	}
}