var Article = require(_dir.DIR_MODELS + '/article'); 
var User = require(_dir.DIR_MODELS + '/user'); 
module.exports = {
	fetchProfile: function(req, res, next){
		var profile_id = parseInt(req.params.profile_id)
		if(!profile_id){
			return res.status(404).send({message: "Not Found"});
		}
		var items, query;
		if(req.user && req.user.admin && req.user.id == profile_id){
			query = {}
		}else{
			query = {user_id: profile_id}
		}
		return Article.all(query).then(function(posts){
			items = posts;
			return User.find(profile_id, req.user)
		}).then(function(data){
			return res.status(200).send({posts: items, user: data});
		})
	},
}