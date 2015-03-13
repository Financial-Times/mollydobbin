//if(!(window.jQuery && window.jQuery.fn.jquery == '1.3.2')) {var s = document.createElement('script');s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js');s.setAttribute('type', 'text/javascript');document.getElementsByTagName('head')[0].appendChild(s);}

var highlightUntrackedElements = function () {

	// Ugly hack: Don't highlight everything on a page that
	// has zero instances of data-trackable
	if(!$('[data-trackable]').length) return;

	var traps = ['a','button','select','input','textarea'];
	//var containers = ['ft-paragraph','p','div','span','table','ul','ol','li'];

	// Expose all elements that ought to be tracked but are not
	traps.forEach(function(tag) {
		$(tag+':not([data-trackable])').css('background','red');
	});

	// Outline all of the deepest trackable elements (traps) in one style, and
	// all of the parent trackable elements (containers) in another.
	var exposeTrackedElements = false;
	if(exposeTrackedElements === true){
		var trackedElements = [].slice.call(document.querySelectorAll('[data-trackable]'));
		trackedElements.forEach(function(node){
			if(node.querySelectorAll(traps).length === 0){
				node.style.border="1px dotted white";
			} else {
				node.style.border="1px dotted blue";
			}
		});
	}
};

highlightUntrackedElements();

// https://remysharp.com/2010/07/21/throttling-function-calls
function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

// fire the highlight when the DOM mutates. This helps capture dynamically added elements missing the tracking code.
document.addEventListener('DOMSubtreeModified', debounce(highlightUntrackedElements, 200), false);

//$(node).parents().length
