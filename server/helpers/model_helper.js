module.exports = {
	getArticleValidQueryParams: function(keys, query){
		var obj = this.getValidQueryParams(keys, query);
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