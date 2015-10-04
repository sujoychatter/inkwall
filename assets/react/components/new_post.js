var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Button = require('./common/button.js');

module.exports = React.createClass({
	componentDidMount: function () {
		function initiateTinyMCE() {
			tinyMCE.init({
				selector: ".tinymce div",
				menubar: false,
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
					});
				}
			});
		}

		if (ExecutionEnvironment.canUseDOM) {
			if (typeof tinyMCE == "undefined") {
				window.onload = initiateTinyMCE;
			}
			else {
				initiateTinyMCE();
			}

		}
	},
	saveContent: function (event) {
		alert("Title is " + document.getElementsByClassName('new-blog-title')[0].value);
		alert("Content is " + tinyMCE.activeEditor.getContent());
	},
	render: function () {
		return (
			<div className="new-post container">
				<div className="title">
					<input type="text" className="new-blog-title" placeholder="Blog Title"></input>
				</div>
				<div className="tinymce">
					<div className="dummy-container"></div>
				</div>
				<Button classes="btn btn-primary save" content="Save" onclicking={this.saveContent}/>
				<Button classes="btn btn-primary publish" content="Publish"/>
			</div>
		)
	}
});