import React, { Component, PropTypes } from 'react';
import {publishPost, unPublishPost, removePost, updatePost, fetchPosts, receivePosts} from '../actions/posts'
import Button from './common/button';
import Router from 'react-router';
import { Navigation, Link } from 'react-router';

export default class MyPosts extends Component {
	constructor(props, context){
		super(props, context);
		context.router
	}
	openPost(post){
		this.context.router.transitionTo('/posts/' + post.id + '/edit');
	}
	getPostElement(){
		let elems = [];
		const posts = this.props.posts;
		var admin_user = this.props.user.admin
		function showPublishButton(post){
			if(admin_user){
				return <Button onclicking={
					post.published ? this.unPublish.bind(this, post) : this.publish.bind(this, post)
				} content={post.published ? 'Un-Publish' : 'Publish'}/>
			}
		}
		function showRemoveButton(post){
			if(post.published !== true){
				return <Button onclicking={this.remove.bind(this, post)} content={"Remove"}/>
			}
		}
		function showEditButton(post){
			if(post.published !== true){
				return <Button onclicking={this.openPost.bind(this, post)} content={"Edit"}/>
			}
		}
		if(posts) {
			posts.forEach((post) => {
				return elems.push(
					<div className="item" data-id={post.id} key={post.id}>
						<div className="item-title">{post.title}</div>
						<div className="item-preview">{post.preview}</div>
						<div className="last-updated">{post.updated_at}</div>
						<div className="last-updated">{post.user_name}</div>
						<div className="post-controls">
							{showPublishButton.call(this,post)}
							{showEditButton.call(this,post)}
							{showRemoveButton.call(this,post)}
						</div>
					</div>
				)
			});
		}
		return elems;
	}
	remove(elem){
		let dispatch = this.props.dispatch;
		updatePost(elem.id, {active: false}).then(() =>{
			return dispatch(removePost(elem.id));
		});
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
MyPosts.contextTypes = {
    router: React.PropTypes.func.isRequired
};