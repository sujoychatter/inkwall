import React, { Component, PropTypes } from 'react';
import Router from 'react-router';
import { Navigation, Link } from 'react-router';
import {publishPost, unPublishPost, removePost, updatePost, approvePost, unApprovePost} from '../actions/posts'
import formatDBDate from '../helpers/date';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment'
import Base64 from '../helpers/base64'

export default class ShowPost extends Component {
	constructor(props, context){
		super(props, context);
		this.context = context
	}
	createContent(html_string){
		return {__html: html_string}
	}
	show_user(id){
		this.context.router.transitionTo('/profile/' + id);
	}
	checkPreview(){
		return window.location.href.match('/preview')
	}
	editPost(event){
		console.log(this.props.posts[0])
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
	render(){
		if(ExecutionEnvironment.canUseDOM && this.props.posts[0]){
			var title = "Inkwall : " + this.props.posts[0].title
			if(document.title != title){
				document.title = title;
			}
		}
		if(this.props.posts[0]){
			var title = this.props.posts[0].title,
				created_at = this.props.posts[0].created_at,
				user_photo = this.props.posts[0].user_photo,
				user_name = this.props.posts[0].user_name,
				user_id = this.props.posts[0].user_id,
				content = this.props.posts[0].content

		}
		if(this.checkPreview()){
			var post_actions = <div className="post-actions">
					<i className='icon icon-ok ok' title="Publish" onClick={this.publish.bind(this)}></i>
					<i className='icon icon-pencil edit' title="Edit" onClick={this.editPost.bind(this)}></i>
					<i className='icon icon-trash-empty delete' title="Delete" onClick={this.remove.bind(this)}></i>
				</div>
		}
		return (
			<div className="show-post container" itemScope itemType="http://schema.org/BlogPosting">
				<div className="wrapper">
					<div className="title" itemProp="name headline">
						{title}
					</div>
					<div className="post-date">
						{formatDBDate(created_at)}
					</div>
					<div className="user-details" itemScope itemType="http://schema.org/Person" onClick={this.show_user.bind(this, user_id)}>
						<img itemProp="image" className="user-image" src={user_photo}/>
						<span className="user-name" itemProp="name">
							{user_name}
						</span>
					</div>
					{post_actions}
					<div itemProp="articleBody" className="content" dangerouslySetInnerHTML={this.createContent(content)}>
					</div>
				</div>
			</div>
		)
	}
}

ShowPost.contextTypes = {
  router: React.PropTypes.func.isRequired
};