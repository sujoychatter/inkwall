var React = require('react');
import Router, { Navigation, Link } from 'react-router';

module.exports = React.createClass({

	mixins: [Navigation],

	cardClicked: function(url,e){
		if(typeof ga != "undefined"){
			ga('send', 'event', 'Dashboard Card', 'click', url)
		}
		this.transitionTo('/posts/' + url);
		e.preventDefault();
	},
	setPosts: function(){
		this.setState(Object.assign({}, state, {posts: this.props.items}))
	},
	initiateMasonry: function(){
		var cardContainer = document.getElementsByClassName('cards-container')[0];
		// if(!this.masonry){
		this.masonry = new Masonry(cardContainer, {
			itemSelector: '.card',
			columnWidth: '.grid-sizer',
			gutter: 10,
			isInitLayout: false
		});
		this.masonry.on('layoutComplete', function(){
			var element = document.getElementsByClassName('cards-container')[0]
			if(element){
				document.getElementsByClassName('cards-container')[0].style.visibility = "visible";
				element.className = "cards-container show-cards";
			}
		});
		this.masonry.layout();
		// }
	},
	componentDidMount: function(){
		document.getElementsByClassName('cards-container')[0].style.visibility = "hidden";
		this.initiateMasonry();
		document.title = "Fodoo : Blogs for everyone";
	},
	componentDidUpdate: function(){
		this.initiateMasonry();
	},
	getImageTag: function(content_text){
		try{
			if(!content_text){
				return ""
			}
			var img_tag = content_text.match('img[^>]*src[^>]*');
			if(img_tag && img_tag[0]){
				var width = parseInt(img_tag[0].match(/width="\d*/)[0].slice(7)),
				height = parseInt(img_tag[0].match(/height="\d*/)[0].slice(8)),
				cardImageWidth = (230 - 6),
				cardImageHeight = (cardImageWidth/width)*height;
				var image_url = img_tag[0].match('src="[^"]*"');
				var url = image_url[0].slice(5, (image_url.length - 2));
				return <img src={url} height={cardImageHeight + 'px'} width={cardImageWidth + 'px'} className="post-image"></img>
			}else{
				return ""
			}
		}catch(e){
			console.log(e)
			return ""
		}
	},
	render: function () {
		var self=this;
		var items = [];
		function createCards(posts){
			var elements = posts.map(function(post,index){
				return <div key={index} itemProp="itemListElement" itemScope itemType="http://schema.org/Blog">
					<a href={"/posts/" + post.url} itemProp="url" className="card" onClick={self.cardClicked.bind(null, post.url)}>
						{self.getImageTag(post.content)}
						<div className="title" itemProp="about">{post.title}</div>
						<div className="details">
							<span className="author" itemProp="author">{post.user_name}</span>
							<span className="view-count">{post.view_count}</span>
						</div>
					</a>
				</div>
			});
			return elements;
		}
		if(this.props.posts){
			items = this.props.posts.slice(0,10)
		}
		return (
			<div className="container home" itemScope="" itemType="http://schema.org/ItemList">
				<div className="wrapper">
				<div className="cards-container">
					<div className="grid-sizer"></div>
					{createCards(items)}
				</div>
				</div>
			</div>
		)
	}
});