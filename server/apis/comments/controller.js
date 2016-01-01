var Comment = require(_dir.DIR_MODELS + '/comment'); 
module.exports = {
	saveComment: function(req, res, next){
		return Comment.create({user_id: req.user.id, content: req.body.comment.content, article_id: req.body.comment.article_id}).then(function(comments){
			return Comment.all({'comments.id': comments[0].id}).then(function(comments){
				return res.status(201).send({comments: comments});
			});
		});
	},
	getComments: function(req, res, next){
		return Comment.all({article_id: req.params.id}).then(function(comments){
			return res.status(200).send({comments: comments});
		});
	}
}