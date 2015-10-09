import React, { Component, PropTypes } from 'react';
import {publishPost} from '../actions/posts'

export default class MyPosts extends Component {
	constructor(props){
		super(props);
	}
	getListElement(){
		let elems = [];
		if(this.props.posts) {
			this.props.posts.forEach((val) => {
				return elems.push(<div data-id={val.id} key={val.id}>{val.content}</div>)
			});
		}
		return elems;
	}
	publishPost(){
		const { dispatch } = this.props;
		let text = "Posted Post";
		dispatch(publishPost({ type: "PUBLISH_POST", text }));
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