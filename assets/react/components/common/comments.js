import React, { Component, PropTypes } from 'react';
import {postComment} from '../../actions/comments';

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
			elements =  comments.map(function(comment){
				return <div className="comment">
					{comment.content}
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
		})
		return <div className="comments-container">
			<div className="comments-header">
				COMMENTS
			</div>
			<div className="your-thoughts">
				<div className="thoughs-header">
					Your Thoughs
				</div>
				<textarea className="thoughs-text" rows="4" onChange={this.commentChanged.bind(this)} value={this.state.comment}></textarea>
				<a className="post-comment" onClick={this.saveComment.bind(this)}>Post Comment</a>
			</div>
			<div className="comments">
				{this.getComments(comments)}
			</div>
		</div>
	}
}