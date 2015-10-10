var React = require('react');

module.exports = React.createClass({
	cardClicked: function(){
		console.log("clicked");
	},
	getInitialState: function(){
		var data = {}
		if(this.props.posts){
			data.posts = this.props.posts;
		}
		else if(typeof fodoo_data != 'undefined'){
			data.posts = fodoo_data.posts;
		}
		return data;
	},
	initiateMasonry: function(){
		var cardContainer = document.getElementsByClassName('cards-container')[0];
		this.masonry = new Masonry(cardContainer, {
			itemSelector: '.card',
			columnWidth: '.grid-sizer',
			gutter: 10
		})
	},
	componentDidMount: function(){
		this.initiateMasonry();
		window.onload = this.initiateMasonry;
	},
	getImageTag: function(content_text){
		var image_url = content_text ? content_text.match('src="[^"]*"') : undefined;
		if(image_url){
			var url = image_url[0].slice(5, (image_url.length - 2));
			return <img src={url} className="post-image"></img>
		}
	},
	render: function () {
		var self=this;
		function createCards(posts){
			var elements = posts.map(function(post,index){
				return <div key={index} className="card" onClick={self.cardClicked}>
					{self.getImageTag(post.post.content)}
					<div className="title">{post.post.title}</div>
					<div className="details">
						<span className="author">{post.user.name}</span>
						<span className="view-count">{post.post.view_count}</span>
					</div>
				</div>
			});
			return elements;
		}
		return (
			<div className="container home">
				<div className="wrapper">
				<div className="cards-container">
					<div className="grid-sizer"></div>
					{createCards(this.state.posts.slice(0,10))}
				</div>
				</div>
			</div>
		)
	}
});