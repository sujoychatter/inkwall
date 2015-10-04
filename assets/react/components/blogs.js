import React, { Component, PropTypes } from 'react';

export default class Blogs extends Component {
	constructor(props){
		super(props);
	}
	getListElement(){
		let elems = [];
		if(this.props.posts) {
			this.props.posts.forEach((val) => {
				return elems.push(<div>{val}</div>)
			});
		}
		return elems;
	}
	publishPost(){
		var text = "Posted Post";
		this.props.actions.publishPost(text);
	}
	render() {
		return (
			<div className="container home">
				<div onClick={this.publishPost.bind(this)}>Please Add Post</div>
				{this.getListElement()}
			</div>
		)
	}
};