import React, { Component, PropTypes } from 'react';

export default class Comments extends Component {

	constructor(props, context){
		super(props, context);
		this.context = context
	}

	postComment(){
		console.log("here")
	}

	getComments(){
		if(this.props.comments){
			var element =  this.props.comments.map(function(comment){
				return <div className="comment">
					{comment.content}
				</div>
			})
		}
		return element;
	}

	render(){
		return <div className="comments-container">
			<div className="comments-header">
				COMMENTS
			</div>
			<div className="your-thoughts">
				<div className="thoughs-header">
					Your Thoughs
				</div>
				<textarea className="thoughs-text" rows="4"></textarea>
				<a className="post-comment" onClick={this.postComment}>Post Comment</a>
			</div>
			<div className="comments">
				{this.getComments()}
			</div>
		</div>
	}
}