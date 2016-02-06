import React, { Component, PropTypes } from 'react';
import Router from 'react-router';
import { Navigation, Link } from 'react-router';
import {publishPost, unPublishPost, removePost, updatePost, approvePost, unApprovePost, likePost} from '../actions/posts'
import formatDBDate from '../helpers/date';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import Base64 from '../helpers/base64';
import Comments from './common/comments';
import LoginHelper from './common/login_helper';

export default class ShowPost extends Component {
	constructor(props, context){
		super(props, context);
		this.context = context;
		this.state = {show_signin: false};
	}
	createContent(html_string){
		return {__html: html_string}
	}
	show_user(id){
		this.context.router.transitionTo('/profile/' + id);
	}
	editPost(event){
		this.context.router.transitionTo('/posts/' + Base64.encode(this.props.posts[0].id.toString()) + '/edit');
	}
	publish(event){
		let dispatch = this.props.dispatch;
		dispatch(publishPost(this.props.posts[0].id));
	}
	remove(event){
		if(confirm('Do you really want to delete this post?')){
			let dispatch = this.props.dispatch;
			updatePost(this.props.posts[0].id, {active: false}).then(() =>{
				return dispatch(removePost(this.props.posts[0].id));
			}).then(() =>{
				this.context.router.transitionTo('/')
			});
		}
	}
	unPublish(event){
		let dispatch = this.props.dispatch;
		dispatch(unPublishPost(this.props.posts[0].id));
	}

	likePostHandle(e){
		if(this.props.user && this.props.user.name && !e.target.className.match('liked')){
			this.props.dispatch(likePost(this.props.posts[0].id))
		}
		else if(!this.props.user || !this.props.user.name){
			this.setState({show_signin: true})
		}
	}

	comments(){
		if(this.props.showComments){
			return <Comments {...this.props}/>
		}
	}
	likeIconClasses(){
		var classes = 'like-icon icon icon-heart';
		if(this.props.user && this.props.user.name && this.props.posts[0] && this.props.posts[0].liked > 0){
			classes = classes + " liked";
		}
		return classes;
	}
	likesContainerClasses(){
		var classes = "like-container";
		if(this.state.show_signin){
			classes = classes + " sign-in";
		}
		return classes;
	}
	render(){
		var admin_user = this.props.user && this.props.user.admin
		var isCurrentUser = this.props.user && this.props.posts[0] && this.props.user.id == this.props.posts[0].user_id
		function showPublishButton(post){
			if(isCurrentUser && !admin_user && (!post.published || post.approval_pending)){
				if(post.published){
					return <i className='icon icon-cancel post-icon' title="UnPublish" onClick={this.unPublish.bind(this)}></i>
				}
				else{
					return <i className='icon icon-ok ok post-icon' title={post.approved? 'Re-Publish' : 'Publish'} onClick={this.publish.bind(this)}></i>
				}
			}
		}
		function showRemoveButton(post){
			if(isCurrentUser && post.approved !== true && !admin_user){
				return <i className='icon icon-trash-empty delete post-icon' title="Delete" onClick={this.remove.bind(this)}></i>
			}
		}
		function showEditButton(post){
			if(isCurrentUser && !admin_user){
				return <i className='icon icon-pencil edit post-icon' title="Edit" onClick={this.editPost.bind(this)}></i>
			}
		}
		if(ExecutionEnvironment.canUseDOM && this.props.posts[0]){
			var title = "Inkwall : " + this.props.posts[0].title
			if(document.title != title){
				document.title = title;
			}
		}
		var post;
		if(post = this.props.posts[0]){
			if(this.props.preview){
				var title = post.title,
				content = post.content;
			}
			else{
				var title = post.published_title,
				content = post.published_content;
			}
			var created_at = post.created_at,
				user_photo = post.user_photo,
				user_name = post.user_name,
				user_id = post.user_id

		}
		if(this.props.preview && this.props.posts[0] && this.props.user && this.props.user.id == this.props.posts[0].user_id ){
			var post_actions = <div className="post-actions">
				{showPublishButton.call(this,post)}
				{showEditButton.call(this,post)}
				{showRemoveButton.call(this,post)}
			</div>
		}
		return (
			<div className="show-post container" itemScope itemType="http://schema.org/BlogPosting">
				<div className="wrapper">
					<div className="post-header">
						<div className="title" itemProp="name headline">
							{title}
						</div>
						<div className="user-details" itemScope itemType="http://schema.org/Person" onClick={this.show_user.bind(this, user_id)}>
							<img itemProp="image" className="user-image" src={user_photo}/>
							<span className="user-name" itemProp="name">
								{user_name}
							</span>
							<div className="small-dot"></div>
							<span className="post-date">{formatDBDate(created_at)}</span>
						</div>
						{post_actions}
					</div>
					<div itemProp="articleBody" className="content" dangerouslySetInnerHTML={this.createContent(content)}>
					</div>
					{this.comments()}
					<div className={this.likesContainerClasses()}>
						<i className={this.likeIconClasses()} onClick={this.likePostHandle.bind(this)}/>
						<LoginHelper/>
					</div>
				</div>
			</div>
		)
	}
}

ShowPost.contextTypes = {
  router: React.PropTypes.func.isRequired
};