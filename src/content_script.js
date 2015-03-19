var highlightUntrackedElements=function(){
	var traps=['a','button','select','input','textarea'];

	// Ugly hack:Don't highlight everything on a page that
	// has zero instances of data-trackable
	if(!$('[data-trackable]').length) return;

	// Expose all of the deepest trackable elements(traps)
	// Popover code from http://plnkr.co/edit/x2VMhh
	var trackedElements=[].slice.call(document.querySelectorAll('[data-trackable]'));
	trackedElements.forEach(function(node){
		if(node.querySelectorAll(traps).length===0){
			$(node).data("toggle","popover");
			$(node).popover({
				trigger:"manual",
				html:true,
				animation:false,
				title:'Trackable element',
				container:'body',
				placement:'auto top',
				content:function(){
					var href='https://ft-next-beacon-dashboard.herokuapp.com/graph?event_collection=cta&metric=count&group_by=meta.domPath&stacked_area=true&timeframe=this_7_days&interval=daily&title=Trackable%20element:%20'+$(node).data('trackable');
					href=href+'&domPathContains='+$(node).data('trackable');
					return '<img style="float:right;" width="24" height="24" title="Mollydobbin" src="data:image/png;base64,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" /><h4>'+$(node).data('trackable')+'</h4><p>View <a href="'+href+'" target="_blank">statistics for this element</a> on next.ft.com performance dashboard</p>';
				}
			}).on("mouseenter",function(){
				var _this=this;
				$(this).popover("show");
				$(".popover").on("mouseleave",function(){
					$(_this).popover('hide');
				});
			}).on("mouseleave",function(){
				var _this=this;
				setTimeout(function(){
					if(!$(".popover:hover").length){
						$(_this).popover("hide");
					}
				},300);
			});
		}
	});

	// Expose all elements that ought to be tracked but are not
	traps.forEach(function(tag){
		$(tag+':not([data-trackable])').each(function(el){
			if(!$(el).data('toggle')) $(el).css('background','red');
		});
	});
};

highlightUntrackedElements();

// https://remysharp.com/2010/07/21/throttling-function-calls
function debounce(fn,delay){
  var timer=null;
  return function(){
    var context=this,args=arguments;
    clearTimeout(timer);
    timer=setTimeout(function(){
      fn.apply(context,args);
    },delay);
  };
}

// fire the highlight when the DOM mutates. This helps capture dynamically added elements missing the tracking code.
document.addEventListener('DOMSubtreeModified',debounce(highlightUntrackedElements,200),false);
