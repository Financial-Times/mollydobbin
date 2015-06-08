var beaconhref = 'https://ft-next-beacon-dashboard.herokuapp.com/';
var sets = [{
	title:"For the last 30 days:",
	timeframe:'this_30_days',
	interval:'daily'
}]

var statisticPages = {
	"... by country": { // FIXME - top 20?
		pathname: "graph",
		query: {
			"event_collection": "dwell",
			"metric": "count_unique",
			"target_property": "user.erights",
			"title": "Unique users by country",
			"group_by": "user.geo.country_name"
		}
	},
	"... by continent": {
		pathname: "graph",
		query: {
			"event_collection": "dwell",
			"metric": "count_unique",
			"target_property": "user.erights",
			"title": "Unique users by continent",
			"group_by": "user.geo.continent"
		}
	},
	"... by web browser": {
		pathname: "graph",
		query: {
			"event_collection": "dwell",
			"metric": "count_unique",
			"target_property": "user.erights",
			"title": "Unique users by web browser",
			"group_by": "user.browser.family"
		}
	},
	"... by operating system": {
		pathname: "graph",
		query: {
			"event_collection": "dwell",
			"metric": "count_unique",
			"target_property": "user.erights",
			"group_by": "user.os.family",
			"title": "Unique users by operating system family"
		}
	},
	"... by device size": {
		pathname: "graph",
		query: {
			"event_collection": "dwell",
			"metric": "count_unique",
			"target_property": "user.erights",
			"group_by": "user.deviceType",
			"title": "Unique users by device size"
		}
	},
	"... by referring site": {
		pathname: "graph",
		query: {
			"event_collection": "dwell",
			"metric": "count_unique",
			"target_property": "user.erights",
			"group_by": "page.referrer.hostname",
			"title": "Unique users by referrer"
		}
	}
};

chrome.windows.getCurrent({populate: true}, function(currentWindow) {
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
		var current = currentWindow.tabs.filter(function(tab) {
			return tab.active;
		})[0];

		var html='';
		for (var i in sets) {
			var set = sets[i];
			html=html + '<h5>'+set.title+'</h5>';
			for (var i in statisticPages) {
				var page = statisticPages[i];
				//page.query.filters = '[{"property_name":"page.location.href","operator":"contains","property_value":"'+current.url+'""}]';
				page.query.href=current.url.split('?')[0];
				page.query.timeframe=set.timeframe;
				page.query.interval=set.interval;
				parameters = jQuery.param(page.query);
				html=html+'<li><a target="_blank" href="'+beaconhref + page.pathname + '?' + parameters +'">'+page.query.title+'</a></li>';
			}
			$('#links').html(html+'</ul>');
		}

		$('#go-to-options').on( "click", function() {
			if (chrome.runtime.openOptionsPage) {
				// New way to open options pages, if supported (Chrome 42+).
				chrome.runtime.openOptionsPage();
			} else {
				// Reasonable fallback.
				window.open(chrome.runtime.getURL('options/options.html'));
			}
		});

	});
});

