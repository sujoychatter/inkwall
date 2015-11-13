var path = require("path");
var dir = {};

dir.DIR_APP = path.resolve("./");

//SERVER
dir.DIR_SERVER = dir.DIR_APP + '/server';
dir.DIR_JOBS = dir.DIR_SERVER + '/jobs';
dir.CONFIG = dir.DIR_SERVER + '/config';
dir.DIR_CONTROLLERS = dir.DIR_SERVER + "/controllers";
dir.DIR_MODELS = dir.DIR_SERVER + "/models";
dir.DIR_APIS = dir.DIR_SERVER + "/apis";
dir.DIR_HELPERS = dir.DIR_SERVER + "/helpers";

//React
dir.DIR_PUBLIC = dir.DIR_APP + '/public';
dir.DIR_ASSETS = dir.DIR_APP + '/public';
dir.DIR_REACT = dir.DIR_ASSETS + '/react';
dir.DIR_VIEWS = dir.DIR_APP + '/views';
dir.DIR_COMPONENTS = dir.DIR_REACT + '/components';

module.exports = dir;