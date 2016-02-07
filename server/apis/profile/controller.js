var Article = require(_dir.DIR_MODELS + '/article'); 
var User = require(_dir.DIR_MODELS + '/user'); 
module.exports = {
	fetchProfile: function(req, res, next){
		var profile_user_id = parseInt(req.params.profile_user_id)
		if(!profile_user_id){
			return res.status(404).send({message: "Not Found"});
		}
		var items, query;
		if(req.user && req.user.admin && req.user.id == profile_user_id){
			query = {}
		}else if(req.user && req.user.id == profile_user_id){
			query = {user_id: profile_user_id}
		}else{
			query = {user_id: profile_user_id, approved: true}
		}
		return Article.all(query, req.user).then(function(posts){
			items = posts;
			return User.find(profile_user_id, req.user)
		}).then(function(data){
			return res.status(200).send({posts: items, user: data});
		})
	},
}