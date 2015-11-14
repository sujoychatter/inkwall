import React, { Component, PropTypes } from 'react';
import Router from 'react-router';
import { Navigation, Link } from 'react-router';
import formatDBDate from '../helpers/date';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment'

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
	render(){
		if(ExecutionEnvironment.canUseDOM){
			var title = "Fodoo : " + this.props.posts[0].title
			if(document.title != title){
				document.title = title;
			}
		}
		return (
			<div className="show-post container" itemScope itemType="http://schema.org/BlogPosting">
				<div className="wrapper">
					<div className="title" itemProp="name headline">
						{this.props.posts[0].title}
					</div>
					<div className="post-date">
						{formatDBDate(this.props.posts[0].created_at)}
					</div>
					<div className="user-details" itemScope itemType="http://schema.org/Person" onClick={this.show_user.bind(this, this.props.posts[0].user_id)}>
						<img itemProp="image" className="user-image" src={this.props.posts[0].user_photo}/>
						<span className="user-name" itemProp="name">
							{this.props.posts[0].user_name}
						</span>
					</div>
					<div itemProp="articleBody" className="content" dangerouslySetInnerHTML={this.createContent(this.props.posts[0].content)}>
					</div>
				</div>
			</div>
		)
	}
}

ShowPost.contextTypes = {
  router: React.PropTypes.func.isRequired
};