chrome.windows.getCurrent({populate: true}, function(currentWindow) {
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
		var current = currentWindow.tabs.filter(function(tab) {
			return tab.active;
		})[0];

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

