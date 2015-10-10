var Article = require(_dir.DIR_MODELS + '/article');
module.exports = {
	updatePost: function(req, res, next){
		return Article.update(req.params.id, req.body, req.user.id).then(
			function(){
				return res.status(200).json({success: true});
			}
		);
	},
	createPost: function(req, res, next){
		return Article.create({user: req.user}).then(function(id){
			return res.status(201).json({id: id[0]});
		});
	},
	getPost: function(req, res, next){
		return Article.find(req.params.id).then(function(post){
			return res.status(200).json({post: post[0]});
		})
	},
	fetchPosts: function(req, res, next){
		return Article.all(req.query).then(function(posts){
			return res.status(200).json({post: posts});
		})
	}
}