// Expose all elements that ought to be tracked but are not
var highlightUntrackedElements=function(){
	traps.forEach(function(tag){
		$(tag+':not([data-trackable]):not([data-toggle])').filter(":visible").css({
			'box-sizing':'border-box',
			'border':'2px solid lime'
		});
	});
};
