var React = require('react');
var HelloWorld = require('../components/HelloWorld.jsx');

React.render(
  React.createElement(HelloWorld, null),
  document.getElementById('main-content')
);