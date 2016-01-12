var Article = require(_dir.DIR_MODELS + '/article');
var LikeArticleUser = require(_dir.DIR_MODELS + '/like_article_user');
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
		return Article.create({user: req.user, active: true, view_count: 0}).then(function(id){
			return res.status(201).send({id: id[0]});
		});
	},

	getPosts: function(req, res, next){
		var query = req.query || {}
		query.approved = true;
		return Article.all(query, req.user).then(function(posts){
			res.status(200).send({posts: posts});
		})
	},
	
	getPostsByName: function(req, res, next){
		var filter = {active: true, url : req.query.name, published : true, approved  : true}
		Article.all(filter, req.user).then(function(articles){
			return res.status(200).send({posts: articles});
		})
	},
	getPost: function(req, res, next){
		return Article.all({}, req.user).where({"articles.id": req.params.id}).then(function(posts){
			return res.status(200).send({posts: posts});
		})
	},
	getMyPosts: function(req, res,next){
		var filter = {user_id: req.user.id}
		if(req.user.admin === true){
			filter = {}
		}
		return Article.all(filter, req.user).then(function(posts){
			return res.status(200).send({posts: posts});
		})
	},
	likePost: function(req, res, next){
		var article_id = req.params.id,
		user_id = req.user.id;
		if(article_id){
			return LikeArticleUser.all({article_id: article_id, user_id: user_id})
			.then(function (results){
				if(results.length == 0){
					return LikeArticleUser.create(article_id, user_id)
					.then(function(){
						return Article.all({'articles.id' : article_id}, req.user)
						.then(function(posts){
							return res.status(200).send({posts: posts});
						})
					})
				}
				else{
					res.status(403).send();
				}
			})
		}
	}
}