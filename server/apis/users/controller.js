var User = require(_dir.DIR_MODELS + '/user'); 
module.exports = {
	find: function(req, res, next){
		var profile_id = parseInt(req.params.profile_id)
		if(!profile_id){
			res.status(404).send({message: "Not Found"});
		}
		return User.find(profile_id, req.user).then(function(user){
			res.status(200).send(user);
		})
	},
	update: function(req, res, next){
		var profile_id = parseInt(req.params.profile_id)
		if(!profile_id){
			res.status(404).send({message: "Not Found"});
		}
		var query = req.body;
		return User.update(profile_id, query, req.user).then(
			function(user){
				return res.status(200).send(user);
			}
		);
	},
}