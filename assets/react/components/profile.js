import React, { Component, PropTypes } from 'react';
import {publishPost, unPublishPost, removePost, updatePost, fetchPosts, receivePosts, approvePost, unApprovePost} from '../actions/posts'
import Button from './common/button';
import EditableInput from './common/editable_input';
import Router from 'react-router';
import { Navigation, Link } from 'react-router';
import {updateUser} from '../actions/user'

export default class Profile extends Component {
	constructor(props, context){
		super(props, context);
		context.router
	}
	supress(event){
		event.preventDefault()
		event.stopPropagation()
	}
	componentDidMount(){
		document.title = "Fodoo : My Posts";
	}
	openPost(post, event){
		this.supress(event)
		this.context.router.transitionTo('/posts/' + post.id + '/edit');
	}
	show_post(post, event){
		this.supress(event)
		if(post.approved && post.published){
			var link = event.currentTarget.getAttribute('href')
			if(link){
				return this.context.router.transitionTo(link);
			}
		}else{
			return this.context.router.transitionTo('/posts/' + post.id + '/preview');
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
			elems.push(<EditableInput text={this.props.profile_user.name} update_cb={this.update_name.bind(this)}/>)
			elems.push(<EditableInput text={this.props.profile_user.email} update_cb={this.update_email.bind(this)} />)
		}else{
			elems.push(<div className="p-name" >{this.props.profile_user.name}</div>)
		}
		return (
			<div className="profile-section">
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
			if(isCurrentUser && post.approved !== true && !admin_user){
				return <Button onclicking={
					post.published ? this.unPublish.bind(this, post) : this.publish.bind(this, post)
				} content={post.published ? 'Un-Publish' : 'Publish'}/>
			}
		}
		function showRemoveButton(post){
			if(isCurrentUser && post.approved !== true && !admin_user){
				return <Button onclicking={this.remove.bind(this, post)} content={(<i className="icon icon-trash-empty"></i>)}/>
			}
		}
		function convertTimeToLocalTime(time){
			if(time){
				return (new Date(time)).toLocaleString()
			}else{
				return ""
			}
		}
		function showEditButton(post){
			if(isCurrentUser && post.approved !== true && !admin_user){
				return <Button onclicking={this.openPost.bind(this, post)} content={(<i className="icon icon-pencil"></i>)}/>
			}
		}
		function showApproveButton(post){
			if(isCurrentUser && admin_user && post.published === true){
				return <Button onclicking={
					post.approved ? this.unApprove.bind(this, post) : this.approve.bind(this, post)
				} content={post.approved ? 'Un-Approve' : 'Approve'}/>
			}
		}
		if(posts) {
			posts.forEach((post) => {
				var href = "/posts/" + post.url
				return elems.push(
					<a className="item" href={href} data-id={post.id} key={post.id} onClick={this.show_post.bind(this, post)}>
						<h2 className="item-title">{post.title}</h2>
						<div className="item-preview">{post.preview.replace(/[\s]{2,}/g, ' ')}</div>
						<div className="last-updated">{convertTimeToLocalTime(post.updated_at)}</div>
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
