import React, { Component, PropTypes } from 'react';
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Button = require('./common/button.js');
import {savePost} from '../actions/posts'
import Base64 from '../helpers/base64'

export default class EditPost extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			title: "",
			savingHintClass: "saving-hint hidden"
		}
		this.saving= false
		this.contentSet= false
		context.router
	}
	componentDidMount() {
		document.title = "Inkwall : Edit Post"
	}
	componentWillReceiveProps(nextProps) {
		var state;
		if(nextProps.posts[0]){
			if (!this.state.title){
				state  = {title:  nextProps.posts[0].title};
			}
			else{
				state = {}
			}
			if(this.saving === true && nextProps.isLoading === false){
				this.saving = false;
				setTimeout(this.removeSavingHint.bind(this), 500);
			}
			else if(this.saving === false && nextProps.isLoading === true){
				this.saving = true;
				state.savingHintClass = "saving-hint";
			}
			if(this.content !== true){
				this.contentSet = true;
				this.setupEditor(nextProps.posts[0].content);
			}
			this.setState(Object.assign({}, this.state, state));
		}
	}
	removeSavingHint(){
		this.setState(Object.assign({}, this.state, {savingHintClass: "saving-hint hidden"}));
	}
	componentWillUnmount(){
		tinyMCE.activeEditor = null
	}
	setupEditor(content){
		var self = this;
		this.noRerender = true
		function setupTinyMCE(){
			if(!tinyMCE.activeEditor){
				tinyMCE.init({
					selector: ".tinymce div",
					menubar: false,
					content_css : "/stylesheets/tiny-mce.css",
					theme: "modern",
					resize: false,
					plugins: [
						"autolink lists link image preview fullscreen media table contextmenu",
						"emoticons paste textcolor colorpicker textpattern imagetools"
					],
					toolbar1: "undo redo | styleselect fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media | forecolor backcolor emoticons | fullscreen",
					image_advtab: true,
					setup : function(ed)
					{
						ed.on('init', function()
						{
							this.getDoc().body.style.fontSize = '14pt';
							this.setContent(content || "");
						});
						ed.on('change', function(e){
							self.scheduleSave()
						})
					}
				});
			}
		}
		function initiateTinyMCE() {
			if (typeof tinyMCE == "undefined") {
				window.onload = setupTinyMCE;
			}
			else {
				setupTinyMCE();
			}
		}
		if (ExecutionEnvironment.canUseDOM) {
			initiateTinyMCE()
		}
	}
	scheduleSave(){
		if(this.saveTimeout){
			clearTimeout(this.saveTimeout)
		}
		this.saveTimeout = setTimeout(this.saveContent.bind(this), 1000);
	}
	saveContent(event) {
		if(tinyMCE && tinyMCE.activeEditor){
			var content = tinyMCE.activeEditor.getContent({format : 'raw'}),
			post = {
				id: this.props.posts[0].id,
				title: document.getElementsByClassName('blog-title')[0].value,
				content: content
			}
			this.props.dispatch(savePost(post))
		}
	}
	onTitleChange(event){
		this.setState({title:  event.target.value});
		this.scheduleSave()
	}
	showPreview(post, event){
		return this.context.router.transitionTo('/posts/' + Base64.encode(this.props.posts[0].id.toString()) + '/preview');
	}
	render() {
		return (
			<div className="edit-post container">
				<div className="wrapper">
					<div className="title">
						<input type="text" className="blog-title" placeholder="Blog Title" onChange={this.onTitleChange.bind(this)} value={this.state.title}/>
					</div>
					<div className="tinymce">
						<div className="dummy-container"></div>
					</div>
				</div>
				<div className={this.state.savingHintClass}>Saving...</div>
				<div className='preview-btn' onClick={this.showPreview.bind(this)}>Preview</div>
			</div>
		)
	}
}

EditPost.contextTypes = {
  router: React.PropTypes.func.isRequired
};
