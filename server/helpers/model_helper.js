module.exports = {
	getValidQueryParams: function(keys, query){
		var obj = {};
		keys.forEach(function(key){
			if(query[key]){
				obj[key] = query[key];
			}
		});
		return obj;
	}
}