var path = require('path');
var glob = require('glob');
fs = require('fs')
function getFiles(path, extension) {
	var pattern = new RegExp(".*\."+ extension +"$");
	var entries = fs.readdirSync(path).filter(function(file) {
		return file.match(pattern);
	});
	entries = entries.map(function(file){
		return path + file;
	});
	console.log(entries);
	return entries;
}

module.exports = {
	resolveLoader: {
		root: path.join(__dirname, '/node_modules')
	},
	//entry: glob.sync(path.join(__dirname +"/assets/react/*.jsx")),
	//entry: path.join(__dirname +"/assets/react/wrapper.jsx"),
	entry: getFiles(path.join(__dirname +"/assets/react/"), "jsx"),
	output: {
		path: './build',
		filename: "[name].js"
	},
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader" },
		]
	}
}