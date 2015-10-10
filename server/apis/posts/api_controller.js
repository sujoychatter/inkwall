var Article = require(_dir.DIR_MODELS + '/article');
module.exports = {
	updatePost: function(req, res, next){
		Article.update(req.params.id, req.body, req.user.id).then(
			function(){
				return res.status(200).send({success: true});
			}
		);
	},
	createPost: function(req, res, next){
		return Article.create({user: req.user}).then(function(id){
			return res.status(201).send({id: id[0]});
		});
	},
	getPost: function(req, res, next){
		if(req.query.for_edit || req.query.for_preview){
			Article.find(req.params.id).then(function(articles){
				return res.status(200).send({post: articles[0]});
			});
		}
		else{
			Article.find(req.params.id).then(function(articles){
				var viewCount = articles[0].view_count,
				id = articles[0].id;
				Article.setViews(id, (viewCount+ 1)).then(function(articles){
					return res.status(200).send({post: articles[0]});
				});
			});
		}
	}
}