//utility/instabone.js

(function($) {
	//caching
	var $pageScroll = $('html, body'),
	//scrollToTop function
		scrollToTop = function() {
			$pageScroll.stop(true).animate({'scrollTop':0},300);
		};
	//handle back to top
	$('#main').on('click','.link-to-top', function(e){scrollToTop(); e.preventDefault();});
})(jQuery);