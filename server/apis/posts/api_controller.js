var Article = require(_dir.DIR_MODELS + '/article'); 
var User = require(_dir.DIR_MODELS + '/user'); 
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
	getPosts: function(req, res, next){
		Article.all().then(function(posts){
			var result = [];

			function updateAndCheck(index, user){
				var post = posts[index];
				post.user = user[0];
				result.push(post);
				if(result.length == posts.length){
					return res.status(200).send({posts: result});
				}
			}

			posts.forEach(function(post, index){
				User.find(post.user_id).then(function(index, user){
					updateAndCheck(index, user);
				}.bind(this, index))
			});
		})
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