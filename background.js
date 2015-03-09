var trackableElementTypes = ['a','button','select','input','textarea'];
var trackableElements = $(trackableElementTypes);
var trackedElements = $('[data-trackable]');

var untrackedElements;
trackableElementTypes.forEach(function(el) {
	$(el+':not([data-trackable])').css('background','red');
});

