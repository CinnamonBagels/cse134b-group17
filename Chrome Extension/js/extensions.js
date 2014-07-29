/*
*   Javascipt file for the meme master chrome extension
*
*
*/


// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["page","selection","link","editable","image","video",
                  "audio"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    chrome.tabs.getSelected(null, function(tab) {
       tabId = tab.id;
       tabUrl = tab.url; 
    });
    if (context == "image")
        var id = chrome.contextMenus.create({"title": "Save your meme", "contexts":[context],
                                         "id": "context_save" + context});
        
  }

});

// function bound to contextMenu options with onclicked event.
function chromeContextClicked() {
 
};
//binds chrome
chrome.contextMenus.onClicked.addListener(chromeContextClicked);


