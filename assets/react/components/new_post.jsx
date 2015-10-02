var React = require('react');
var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');

module.exports = React.createClass({
	componentDidMount: function(){
		function initiateTinyMCE(){
			tinyMCE.init({
							selector: ".tinymce div",
							menubar: false,
							theme: "modern",
						    plugins: [
									"advlist autolink lists link image charmap print preview hr anchor pagebreak",
									"searchreplace wordcount visualblocks visualchars code fullscreen",
									"insertdatetime media nonbreaking save table contextmenu directionality",
									"emoticons template paste textcolor colorpicker textpattern imagetools"
								],
								toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media | forecolor backcolor emoticons",
								image_advtab: true
						});
		}
		if (ExecutionEnvironment.canUseDOM){
			if(typeof tinyMCE == "undefined"){
				window.onload = initiateTinyMCE;
			}
			else{
				initiateTinyMCE();
			}
			
		}
	},
	render: function() {
		return (
			<div className="new-post container">
				<div className="title">
					<input type="text" placeholder="Blog Title"></input>
				</div>
				<div className="tinymce">
					<div></div>
				</div>
			</div>
		)
	}
});