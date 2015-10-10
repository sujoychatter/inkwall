import React, { Component, PropTypes } from 'react';
import {publishPost} from '../actions/posts'

export default class MyPosts extends Component {
	constructor(props){
		super(props);
	}
	getPostElement(){
		let elems = [];
		const posts = this.props.posts;
		if(posts) {
			posts.forEach((post) => {
				return elems.push(
					<div data-id={post.id} key={post.id}>
						<div class=""></div>
						<div onClick={this.publishPost.bind(this)}>Please Add Post</div>
					</div>
				)
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
				{this.getPostElement()}
			</div>
		)
	}
};