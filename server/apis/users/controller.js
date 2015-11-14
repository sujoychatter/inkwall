var User = require(_dir.DIR_MODELS + '/user'); 
module.exports = {
	find: function(req, res, next){
		var profile_user_id = parseInt(req.params.profile_user_id)
		if(!profile_user_id){
			return res.status(404).send({message: "Not Found"});
		}
		return User.find(profile_user_id, req.user).then(function(user){
			return res.status(200).send(user);
		})
	},
	update: function(req, res, next){
		var profile_user_id = parseInt(req.params.profile_user_id)
		if(!profile_user_id){
			return res.status(404).send({message: "Not Found"});
		}
		if (!(req.user && profile_user_id == req.user.id)){
			return res.status(403).send({message: "Access Denied"});
		}
		var query = req.body;
		return User.update(profile_user_id, query, req.user).then(
			function(user){
				if(user.length){
					return res.status(200).send(user[0]);
				}else{
					return res.status(402).send({message: "Error in updating data"});
				}
			}
		);
	},
}