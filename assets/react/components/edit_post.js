var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Button = require('./common/button.js');
import {savePost} from '../actions/posts'

module.exports = React.createClass({
	componentDidMount: function () {
		document.title = "Fodoo : Edit Post"
		this.setupEditor()
	},
	componentDidUpdate: function(){
		this.setupEditor()
	},
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.posts[0])
			this.setState({title:  nextProps.posts[0].title});
	},
	componentWillUnmount: function(){
		tinyMCE.activeEditor = null
	},
	setupEditor: function(){
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
							this.setContent(self.props.posts[0].content || "");
						});
						ed.on('keyDown', function(e){
							if(e.keyCode == 83 && e.metaKey){
								e.stopPropagation()
								e.preventDefault()
								self.saveContent()
							}
						});
					}
				});
			}
			else{
				tinyMCE.activeEditor.setContent(self.props.posts[0].content || "");
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
			title: ""
		}
	},
	saveContent: function (event) {
		var post = {
			id: this.props.posts[0].id,
			title: document.getElementsByClassName('blog-title')[0].value,
			content: tinyMCE.activeEditor.getContent({format : 'raw'})
		}
		this.props.dispatch(savePost(post))
	},
	onTitleChange: function(event){
		this.setState({title:  event.target.value});
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
					<Button classes="btn btn-primary save round" content={<i className="icon-floppy"></i>} onclicking={this.saveContent}/>
				</div>
			</div>
		)
	}
});