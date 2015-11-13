module.exports = {
	getArticleValidQueryParams: function(keys, query){
		var obj = this.getValidQueryParams(keys, query);
		if(query.title){
			obj.url = query.title.replace(/[^((a-z)|(A-Z)|(\s)|(0-9))]*/g, "").replace(/\s+/g, "-")
		}
		obj.updated_at = new Date;
		return obj;
	},
	getValidQueryParams: function(keys, query){
		var obj = {};
		keys.forEach(function(key){
			if(query[key] != null && query[key] != undefined){
				obj[key] = query[key];
			}
		});
		return obj;
	}
}