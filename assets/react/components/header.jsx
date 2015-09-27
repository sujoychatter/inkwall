var React = require('react');

module.exports = React.createClass({
	render: function() {
	    return (
	    	<div className="header">
	    		<img src="/images/logo.png" type="image/png"></img>
	    		<span className="site-details">
	    			<span className="site-name" itemProp="name">Fodoo</span>
	    			<span className="site-about" itemProp="description">Blog for engineers</span>
	    		</span>
	    	</div>
	    )    
	}
});