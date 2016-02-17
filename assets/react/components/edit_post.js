import React, { Component, PropTypes } from 'react';
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Button = require('./common/button.js');
import {savePost} from '../actions/posts'
import Base64 from '../helpers/base64'
import ajax from '../helpers/ajax';

export default class EditPost extends Component {
	tinyMCELoaded: false
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
	componentWillMount(){
		if (ExecutionEnvironment.canUseDOM &&  !document.getElementById("tinymce-js")) {
			ajax('/tinymce.min.js','text/javascript',this.setTinymceJs.bind(this))
		}
		else{
			this.tinyMCELoaded = true
		}
	}
	setTinymceJs(responseText, data){
		var scriptElement = document.createElement('script');
		scriptElement.setAttribute('id', "tinymce-js");
		scriptElement.innerHTML = data.response;
		document.body.appendChild(scriptElement);
		this.tinyMCELoaded = true;
		this.setProcessedState(this.props)
	}
	componentDidMount() {
		document.title = "Inkwall : Edit Post"
	}
	componentWillReceiveProps(nextProps) {
		this.setProcessedState(nextProps)
	}
	setProcessedState(props){
		var state;
		if(props.posts[0] && this.tinyMCELoaded){
			if (!this.state.title || !props.posts[0].title){
				state  = {title:  props.posts[0].title};
			}
			else{
				state = {}
			}
			if(this.saving === true && props.isLoading === false){
				this.saving = false;
				setTimeout(this.removeSavingHint.bind(this), 500);
			}
			else if(this.saving === false && props.isLoading === true){
				this.saving = true;
				state.savingHintClass = "saving-hint";
			}
			if(this.contentSet !== true || !props.posts[0].content){
				this.contentSet = true;
				this.setupEditor(props.posts[0].content);
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
		this.noRerender = true;
		function setupTinyMCE(){
			if(!tinyMCE.activeEditor){
				tinyMCE.init({
					selector: ".tinymce div",
					menubar: false,
					content_css : "/stylesheets/tiny-mce.css",
					theme: "modern",
					resize: false,
					plugins: [
						"autolink lists link image media table contextmenu",
						"paste textcolor colorpicker textpattern imagetools"
					],
					toolbar1: "undo redo | styleselect fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | media | forecolor backcolor",
					image_advtab: true,
					setup : function(ed)
					{
						ed.on('init', function()
						{
							this.getDoc().body.style.fontSize = '14pt';
							if(!content){
								content = ""
							}
							this.setContent(content);
						});
						ed.on('change', function(e){
							self.scheduleSave()
						})
					}
				});
			}
			else if(tinyMCE.activeEditor && !content){
				tinyMCE.activeEditor.setContent('');
			}
		}
		function initiateTinyMCE() {
			tinyMCE.suffix = '.min';
			tinyMCE.baseURL = "/tinymce_assets";
			setupTinyMCE();
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
				content: content,
				published: false
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
