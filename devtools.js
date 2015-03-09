// The function below is executed in the context of the inspected page.
var page_getProperties = function() {
  var selectednode = $0 ? $0 : {};

  // Make a shallow copy with a null prototype, so that sidebar does not expose prototype.
  var props = Object.getOwnPropertyNames(selectednode);
  var copy = { __proto__: null };
  for (var i = 0; i < props.length; ++i) {
    copy[props[i]] = selectednode[props[i]];
  }
  return copy;
}

chrome.devtools.panels.elements.createSidebarPane(
  "Mollydobbin",
  function(sidebar) {
    function updateElementProperties() {
      sidebar.setExpression("(" + page_getProperties.toString() + ")()");
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties
    );
});
