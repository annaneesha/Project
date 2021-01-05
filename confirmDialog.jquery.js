/*!
 * jquery.confirmDialog
 *
 * @version 1.0
 *
 * @author Javier Sanahuja Liebana <bannss1@gmail.com>
 *
 * https://github.com/BanNsS1/jquery.confirmDialog/
 *
 */
 (function( $ ){
	$.createDialog = function(options){
		$(options.attachAfter).after(
			"<div id='confirm_backdrop'></div>"+
			"<div id='confirm_dialog'>"+
				"<div id='confirm_title'></div>"+
				"<div id='confirm_actions'>"+
					"<button id='confirm_doit'></button>"+
					"<button id='confirm_dont'></button>"+
				"</div>"+
			"</div>"
		);
		$('#confirm_title').html(options.title);
		$('#confirm_doit').html(options.accept);
		$('#confirm_dont').html(options.refuse);
		
		$('#confirm_doit').addClass(options.acceptStyle);
		$('#confirm_dont').addClass(options.refuseStyle);
		
		$('#confirm_doit').bind("click", options.acceptAction);
		$('#confirm_doit').click($.hideDialog);
		$('#confirm_dont').click($.hideDialog);
		$('#confirm_backdrop').click($.hideDialog);
	}
	
	$.showDialog = function() {
		$('#confirm_backdrop').slideDown();
		$('#confirm_dialog').delay(100).fadeIn();
	};					   
	$.hideDialog = function() {
		$('#confirm_dialog').remove();
		$('#confirm_backdrop').remove();
	};
	
})( jQuery );
