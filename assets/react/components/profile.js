import React, { Component, PropTypes } from 'react';
import {publishPost, unPublishPost, removePost, updatePost, fetchPosts, receivePosts, approvePost, unApprovePost} from '../actions/posts'
import Button from './common/button';
import EditableInput from './common/editable_input';
import Router from 'react-router';
import { Navigation, Link } from 'react-router';
import {updateUser} from '../actions/user';
import formatDBDateTime from '../helpers/date';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment'
import Base64 from '../helpers/base64'

export default class Profile extends Component {
	constructor(props, context){
		super(props, context);
		context.router
	}
	supress(event){
		event.preventDefault()
		event.stopPropagation()
	}
	openPost(post, event){
		this.supress(event)
		this.context.router.transitionTo('/posts/' + Base64.encode(post.id.toString()) + '/edit');
	}
	show_post(post, event){
		this.supress(event)
		if(this.props.user && (post.user_id == this.props.user.id || this.props.user.admin)){
			return this.context.router.transitionTo('/posts/' + Base64.encode(post.id.toString()) + '/preview');
		}else{
			var link = event.currentTarget.getAttribute('href')
			if(link){
				return this.context.router.transitionTo(link);
			}
		}
	}
	update_name(name, event){
		this.supress(event)
		this.props.dispatch(updateUser(this.props.profile_user, {name: name}))
	}
	update_email(email, event){
		this.supress(event)
		this.props.dispatch(updateUser(this.props.profile_user, {email: email}))
	}
	getProfileSection(){
		if(!this.props.profile_user){
			return ""
		}
		var elems = []
		elems.push(<img className="p-image" src={this.props.profile_user.photo_large} />)
		if(this.props.profile_user.admin){
			elems.push(<div className="p-admin" > Admin </div>)
		}
		if( this.props.user && (this.props.user.id == this.props.profile_user.id)){
			elems.push(<EditableInput text={this.props.profile_user.name} update_cb={this.update_name.bind(this)} placeholder="Add Name"/>)
			elems.push(<EditableInput text={this.props.profile_user.email} update_cb={this.update_email.bind(this)} placeholder="Add Email" />)
		}else{
			elems.push(<div className="p-name" >{this.props.profile_user.name}</div>)
		}
		return (
			<div className="profile-section gen-bs">
				{elems}
			</div>
		);
	}
	getPostElement(){
		let elems = [];
		const posts = this.props.posts;
		var admin_user = this.props.user && this.props.user.admin
		var isCurrentUser = this.props.user && this.props.user.id == this.props.profile_user.id
		var content;
		function showPublishButton(post){
			if(isCurrentUser && !admin_user && (!post.published || post.approval_pending)){
				return <Button classes="publish small" onclicking={
					post.published ? this.unPublish.bind(this, post) : this.publish.bind(this, post)
				} content={post.published ? 'Un-Publish' : (post.approved? 'Re-Publish' : 'Publish')}/>
			}
		}
		function showRemoveButton(post){
			if(isCurrentUser && post.approved !== true && !admin_user){
				return <Button classes="remove-btn small" onclicking={this.remove.bind(this, post)} content={(<i className="icon icon-trash-empty"></i>)}/>
			}
		}
		function showEditButton(post){
			if(isCurrentUser && !admin_user){
				return <Button classes="edit-btn small" onclicking={this.openPost.bind(this, post)} content={(<i className="icon icon-pencil"></i>)}/>
			}
		}
		function showApproveButton(post){
			if(isCurrentUser && admin_user && ((post.approval_pending === true && post.published) || post.approved)){
				return <Button classes="small" onclicking={
					(post.approval_pending && post.published) ? this.approve.bind(this, post) : this.unApprove.bind(this, post)
				} content={(post.approval_pending && post.published) ? (post.approved ? 'Re-Approve' : 'Approve') : 'Un-Approve'}/>
			}
		}
		if(posts) {
			posts.forEach((post) => {
				var href = "/posts/" + ( this.props.user && (post.user_id == this.props.user.id || this.props.user.admin) ? (Base64.encode(post.id.toString()) + "/preview") : post.url)
				if(this.props.user && this.props.user.id == this.props.profile_user.id){
					var title = post.title,
						preview = post.preview;
				}
				else{
					var title = post.published_title,
						preview = post.published_preview;
				}
				return elems.push(
					<a className="item gen-bs" href={href} data-id={post.id} key={post.id} onClick={this.show_post.bind(this, post)}>
						<h2 className="item-title">{title}</h2>
						<div className="item-preview">{preview.replace(/[\s]{2,}/g, ' ')}</div>
						<div className="last-updated">{formatDBDateTime(post.updated_at)}</div>
						<div className="user-name">{admin_user ? post.user_name : null}</div>
						<div className="post-controls">
							{showPublishButton.call(this,post)}
							{showEditButton.call(this,post)}
							{showRemoveButton.call(this,post)}
							{showApproveButton.call(this,post)}
						</div>
					</a>
				)
			});
		}
		return elems;
	}
	remove(elem, event){
		this.supress(event)
		if(confirm('Do you really want to delete this post?')){
			let dispatch = this.props.dispatch;
			updatePost(elem.id, {active: false}).then(() =>{
				return dispatch(removePost(elem.id));
			});
		}
	}
	publish(post, event){
		this.supress(event)
		let dispatch = this.props.dispatch;
		dispatch(publishPost(post.id));
	}
	unPublish(post, event){
		this.supress(event)
		let dispatch = this.props.dispatch;
		dispatch(unPublishPost(post.id));
	}
	approve(post, event){
		this.supress(event)
		this.props.dispatch(approvePost(post.id));
	}
	unApprove(post, event){
		this.supress(event)
		this.props.dispatch(unApprovePost(post.id));
	}
	render() {
		if(ExecutionEnvironment.canUseDOM){
			document.title = this.props.profile_user.name ? (this.props.profile_user.name + " | Inkwall") : "Inkwall"
		}
		return (
			<div className="container profile">
				<div className="wrapper">
					<div className="profile-container">
						{this.getProfileSection()}
						<div className="posts-section">
							{this.getPostElement()}
						</div>
					</div>
				</div>
			</div>
		)
	}
};

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};
