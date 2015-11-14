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
	componentDidMount: function(){
		document.title = "Fodoo : Blogs for everyone";
	},
	getImageTag: function(content_text){
		if(!content_text){
				return ""
		}
		var img_tag = content_text.match('img[^>]*src[^>]*');
		if(img_tag && img_tag[0]){
			var image_url = img_tag[0].match('src="[^"]*"');
			var url = image_url[0].slice(5, (image_url.length - 2));
			return <img src={url} className="post-image"></img>
		}else{
			return ""
		}
	},
	render: function () {
		var self=this;
		var items = [];
		function createCards(posts){
			var elements = posts.map(function(post,index){
				return <div key={index} className="card-wrapper" itemProp="itemListElement" itemScope itemType="http://schema.org/Blog">
					<a href={"/posts/" + post.url} itemProp="url" className="card" onClick={self.cardClicked.bind(null, post.url)}>
						{self.getImageTag(post.content)}
						<div className="title" itemProp="about">{post.title}</div>
						<div className="preview">{post.preview}</div>
						<div className="details">
							<span className="author" itemProp="author">{post.user_name}</span>
							<span className="view-count"><i className="icon icon-eye"></i>{post.view_count}</span>
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
						{createCards(items)}
					</div>
				</div>
			</div>
		)
	}
});