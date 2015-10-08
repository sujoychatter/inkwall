var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var Button = require('./common/button.js');

module.exports = React.createClass({
	componentDidMount: function () {

		function setupTinyMCE(){
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
		function initiateTinyMCE() {
			if (typeof tinyMCE == "undefined") {
				window.onload = setupTinyMCE;
			}
			else {
				setupTinyMCE();
			}
		}
		function getPostData(postId){
			return new Promise(function(resolve, reject){
				var xhr = new XMLHttpRequest();
				xhr.open('GET', '/posts/'+postId, true);
				xhr.onload = function(){
					if(xhr.status == 200){
						resolve(xhr.response);
					}
					else{
						reject(Error('Data didn\'t load successfully; error code:' + xhr.statusText))
					}
				};
				xhr.onerror = function() {
					reject(Error('There was a network error.'));
				};
				xhr.send();
			});
		};

		if (ExecutionEnvironment.canUseDOM) {
			if (this.props.data.post_id) {
				getPostData(this.props.data.post_id).then(
					function(post_string){
						var post = JSON.parse(post_string).post;
						document.getElementsByClassName('blog-title')[0].value = post.title;
						document.getElementsByClassName('dummy-container')[0].innerHTML = post.content;
						initiateTinyMCE()
					}
				)
			}
		}
	},
	saveContent: function (event) {
		var params = "title=" + document.getElementsByClassName('new-blog-title')[0].value + "&content=" + tinyMCE.activeEditor.getContent();
		
		// alert("Title is " + document.getElementsByClassName('new-blog-title')[0].value);
		// alert("Content is " + tinyMCE.activeEditor.getContent());
		function handler()
		{
		    if (oReq.readyState == 4 /* complete */) {
		        if (oReq.status == 201) {
		            console.log(oReq.responseText);
		        }
		    }
		}
		var oReq = new XMLHttpRequest();
		if (oReq != null) {
			oReq.open("post", "/new_post/save", true);
		    //Send the proper header information along with the request
			oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		    oReq.onreadystatechange = handler;
		    oReq.send(params);
		}
		else {
		    console.log("AJAX (XMLHTTP) not supported.");
		}
	},
	render: function () {
		return (
			<div className="edit-post container">
				<div className="title">
					<input type="text" className="blog-title" placeholder="Blog Title"></input>
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