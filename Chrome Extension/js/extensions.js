/*
*   Javascipt file for the meme master chrome extension
*
*
*/


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

var f = new Firebase("https://torid-fire-9403.firebaseio.com/");

//binds chrome onclicked
chrome.contextMenus.onClicked.addListener(function(info) {
    var imgRef = f.child("images");
    imgRef.push({ 
            img: info.srcUrl
        });
});
    

var imgChild = f.child("images");
imgChild.on("child_added", function(snap){
    var snapVal = snap.val();
    var stringVal = JSON.stringify(snapVal);
    //alert(JSON.stringify(snapVal));
    var stringSplit = stringVal.split('{"img":"');
    var finalString = stringSplit[1].split('"}'); 
    
    $('#content').append('<img src="' + finalString[0] + '" />');
});