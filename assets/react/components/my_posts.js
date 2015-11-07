import React, { Component, PropTypes } from 'react';
import {publishPost, unPublishPost, removePost, fetchPosts, receivePosts} from '../actions/posts'
import Button from './common/button';

export default class MyPosts extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		let dispatch = this.props.dispatch;
		fetchPosts({user_id: this.props.user.id}).then(function(posts){
			dispatch(receivePosts(posts))
		})
	}
	getPostElement(){
		let elems = [];
		const posts = this.props.posts;
		if(posts) {
			posts.forEach((post) => {
				return elems.push(
					<div className="item" data-id={post.id} key={post.id}>
						<div className="item-title">{post.title}</div>
						<div className="item-preview">{post.preview}</div>
						<div className="last-updated">{post.updated_at}</div>
						<Button onclicking={
							post.published ? this.unPublish.bind(this, post) : this.publish.bind(this, post)
						} content={post.published ? 'Un-Publish' : 'Publish'}/>
					</div>
				)
			});
		}
		return elems;
	}
	remove(elem){
		let dispatch = this.props.dispatch;
		dispatch(removePost(elem.id));
	}
	publish(post){
		let dispatch = this.props.dispatch;
		dispatch(publishPost(post.id));
	}
	unPublish(post){
		let dispatch = this.props.dispatch;
		dispatch(unPublishPost(post.id));
	}
	render() {
		return (
			<div className="container my-posts">
				<div className="wrapper">
				{this.getPostElement()}
				</div>
			</div>
		)
	}
};