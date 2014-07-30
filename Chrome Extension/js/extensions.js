/*
*   Javascipt file for the meme master chrome extension
*
*
*/

var fbRef = new Firebase("https://torid-fire-9403.firebaseio.com/");


document.getElementsByTagName("img").onclick = function(){
    console.log(this.src);
};
// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["image"];
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    chrome.tabs.getSelected(null, function(tab) {
       tabId = tab.id;
       imgUrl = tab.src; 
       
    });
        var id = chrome.contextMenus.create({"title": "Save your meme", "contexts":[context], "id": "context_save" + context});
        
        
  }

});

//binds chrome onclicked
chrome.contextMenus.onClicked.addListener(function(info) {
    alert(info.srcUrl);
    
    
});


