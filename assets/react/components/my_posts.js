import React, { Component, PropTypes } from 'react';
import {publishPost, unPublishPost, removePost, updatePost, fetchPosts, receivePosts, approvePost, unApprovePost} from '../actions/posts'
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
	previewPost(post){
		this.context.router.transitionTo('/posts/' + post.id + '/preview');
	}
	getPostElement(){
		let elems = [];
		const posts = this.props.posts;
		var admin_user = this.props.user.admin
		function showPublishButton(post){
			if(post.approved !== true && !admin_user){
				return <Button onclicking={
					post.published ? this.unPublish.bind(this, post) : this.publish.bind(this, post)
				} content={post.published ? 'Un-Publish' : 'Publish'}/>
			}
		}
		function showRemoveButton(post){
			if(post.approved !== true && !admin_user){
				return <Button onclicking={this.remove.bind(this, post)} content={"Remove"}/>
			}
		}
		function showEditButton(post){
			if(post.approved !== true && !admin_user){
				return <Button onclicking={this.openPost.bind(this, post)} content={"Edit"}/>
			}
		}
		function showApproveButton(post){
			if(admin_user && post.published === true){
				return <Button onclicking={
					post.approved ? this.unApprove.bind(this, post) : this.approve.bind(this, post)
				} content={post.approved ? 'Un-Approve' : 'Approve'}/>
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
							<Button onclicking={this.previewPost.bind(this, post)} content={"Preview"}/>
							{showEditButton.call(this,post)}
							{showRemoveButton.call(this,post)}
							{showPublishButton.call(this,post)}
							{showApproveButton.call(this,post)}
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
	approve(post){
		this.props.dispatch(approvePost(post.id));
	}
	unApprove(post){
		this.props.dispatch(unApprovePost(post.id));
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