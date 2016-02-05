var React = require('react');
import Router, { Navigation, Link } from 'react-router';

module.exports = React.createClass({

	mixins: [Navigation],

	getInitialState: function(){
		return {showShare: []}
	},
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
		document.title = "Inkwall : Blogs for everyone";
	},
	getImageTag: function(content_text){
		if(!content_text){
				return ""
		}
		var img_tag = content_text.match('img[^>]*src[^>]*');
		if(img_tag && img_tag[0]){
			var image_url = img_tag[0].match('src="[^"]*"'),
			url = image_url[0].slice(5, (image_url.length - 2)),
			cssValue = {backgroundImage: 'url(' + url + ')'};
			return <div style={cssValue} className="post-image"></div>
		}else{
			return ""
		}
	},
	openShare: function(post, e){
		this.state.showShare.push(this.props.posts.indexOf(post));
		this.setState(Object.assign({}, this.state, {showShare: this.state.showShare}))
		e.preventDefault();
		e.stopPropagation();
	},
	closeShare: function(post, e){
		var index = this.state.showShare.indexOf(this.props.posts.indexOf(post))
		this.state.showShare.splice(index, 1)
		this.setState(Object.assign({}, this.state, {showShare: this.state.showShare}))
		e.stopPropagation();
	},
	getShareClasses: function(index){
		var classes = "share";
		if(this.state.showShare.indexOf(index) != -1){
			classes = classes + " show";
		}
		return classes;
	},
	render: function () {
		var self=this;
		var items = [];
		function createCards(posts){
			var elements = posts.map(function(post,index){
				var url = "http%3A%2F%2Finkwall.in%2Fposts%2F" + post.url,
				redirect_uri = "http%3A%2F%2Finkwall.in",
				fb_share = "https://www.facebook.com/dialog/share?app_id=1475162739457013&display=popup&href=" + url + "&redirect_uri=" + redirect_uri,
				linkedin_share = "https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&redirect_uri=" + redirect_uri,
				google_share = "https://plus.google.com/share?url=http://stackoverflow.com/questions/10713542/how-to-make-custom-linkedin-share-button/10737122";

				return <div key={index} className="card-wrapper" itemProp="itemListElement" itemScope itemType="http://schema.org/Blog">
					<a href={"/posts/" + post.url} itemProp="url" className="card" onClick={self.cardClicked.bind(null, post.url)}>
						{self.getImageTag(post.published_content)}
						<div className="title" itemProp="about">{post.published_title} <i className="icon-share" onClick={self.openShare.bind(self, post)}></i></div>
						<div className="preview">{post.published_preview}</div>
						<div className="details">
							<span className="author" itemProp="author">{post.user_name}</span>
							<span className="view-count"><i className="icon icon-eye"></i>{post.view_count}</span>
							<span className="comments-count"><i className="icon icon-comment"></i>{post.comments_count}</span>
							<span className="likes-count"><i className="icon icon-heart"></i>{post.likes_count}</span>
						</div>
					</a>
					<div className={self.getShareClasses(index)}>
						<i className="icon-cancel" onClick={self.closeShare.bind(self, post)}></i>
						<div className="share-text">Share this with your friends</div>
						<div className="share-links">
							<a className="share-icon" href={fb_share} onClick={function(e){e.stopPropagation()}}><i className="icon-facebook-rect"></i></a>
							<a className="share-icon" href={linkedin_share} onClick={function(e){e.stopPropagation()}}><i className="icon-linkedin"></i></a>
						</div>
					</div>
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