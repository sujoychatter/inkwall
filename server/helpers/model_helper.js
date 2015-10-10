//validateObjectType: function(key, type){
//	switch(type){
//		case 'Integer':
//
//			return true
//		case 'Bool':
//			return true
//		case 'String':
//			return true
//		default
//			return false
//	}
//
//}

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