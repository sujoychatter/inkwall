var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Button = require('./common/button.js');
import {savePost} from '../actions/posts'

module.exports = React.createClass({
	componentDidMount: function () {
		document.title = "Inkwall : Edit Post"
	},
	saving: false,
	contentSet: false,
	componentWillReceiveProps: function(nextProps) {
		var state;
		if(nextProps.posts[0]){
			state  = {title:  nextProps.posts[0].title};
			if(this.saving === true && nextProps.isLoading === false){
				this.saving = false;
				setTimeout(this.removeSavingHint, 1000);
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
	},
	removeSavingHint: function(){
		this.setState(Object.assign({}, this.state, {savingHintClass: "saving-hint hidden"}));
	},
	componentWillUnmount: function(){
		tinyMCE.activeEditor = null
	},
	setupEditor: function(content){
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
	},
	getInitialState: function(){
		return {
			title: "",
			savingHintClass: "saving-hint hidden"
		}
	},
	scheduleSave: function(){
		if(this.saveTimeout){
			clearTimeout(this.saveTimeout)
		}
		this.saveTimeout = setTimeout(this.saveContent, 1000);
	},
	saveContent: function (event) {
		var content = tinyMCE.activeEditor.getContent({format : 'raw'}),
		post = {
			id: this.props.posts[0].id,
			title: document.getElementsByClassName('blog-title')[0].value,
			content: content
		}
		// this.setState(Object.assign({}, this.state, {content: content}));
		this.props.dispatch(savePost(post))
	},
	onTitleChange: function(event){
		this.setState({title:  event.target.value});
		this.scheduleSave()
	},
	render: function () {
		return (
			<div className="edit-post container">
				<div className="wrapper">
					<div className="title">
						<input type="text" className="blog-title" placeholder="Blog Title" onChange={this.onTitleChange} value={this.state.title}/>
					</div>
					<div className="tinymce">
						<div className="dummy-container"></div>
					</div>
				</div>
				<div className={this.state.savingHintClass}>Saving...</div>
			</div>
		)
	}
});