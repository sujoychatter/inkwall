import React, { Component, PropTypes } from 'react';
import {postComment} from '../../actions/comments';
import LoginHelper from './login_helper';

export default class Comments extends Component {

	constructor(props, context){
		super(props, context);
		this.context = context
		this.state = {
			comment: ""
		}
	}

	saveComment(){
		var comment = {article_id: this.props.posts[0].id};
		comment.content = this.state.comment;
		if(comment.content.length){
			this.props.dispatch(postComment(comment))
			this.setState(Object.assign({}, this.state, {comment: ""}))
		}

	}

	getComments(comments){
		var elements = []
		if(comments){
			elements =  comments.map(function(comment, index){
				return <div className="comment" key={index}>
					<img src={comment.photo}></img>
					<div className="comment-details">
						<div className="user-details">
							<span className="user-name">{comment.name}</span>
							<span className="created-at">{(new Date(comment.created_at)).toString().slice(4, 15)}</span>
						</div>
						<div className="comment-content">
							{comment.content}
						</div>
					</div>
				</div>
			})
		}
		return elements;
	}

	commentChanged(e){
		this.setState(Object.assign({}, this.state, {comment: e.target.value}))
	}

	render(){
		var self = this,
		comments= this.props.comments.filter(function(comment){
			return self.props.posts[0] && comment.article_id == self.props.posts[0].id
		}), element;
		if(this.props.user && this.props.user.name){
			element = <div className="comments-container">
				<div className="comments-header">
					COMMENTS
				</div>
				<div className="your-thoughts">
					<div className="thoughts-header">
						Your Thoughts
					</div>
					<textarea className="thoughts-text" rows="4" onChange={this.commentChanged.bind(this)} value={this.state.comment}></textarea>
					<a className="post-comment" onClick={this.saveComment.bind(this)}>Post Comment</a>
				</div>
				<div className="comments">
					{this.getComments(comments)}
				</div>
			</div>
		}
		else{
			element= <div className="comments-container">
				<div className="comments-header">
					COMMENTS
				</div>
				<div className="thoughts-header no-sign">
					Sign in to post comments    
					<LoginHelper/>
				</div>
				<div className="comments">
					{this.getComments(comments)}
				</div>
			</div>
		}
		return element;
	}
}