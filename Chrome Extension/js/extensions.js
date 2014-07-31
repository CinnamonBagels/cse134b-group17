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
    var date=new Date();
    var timeStamp = Math.round(date.getTime()/1000);
    imgRef.push({ 
            img: info.srcUrl,
            time: timeStamp,
            title: "",
            tags: "foo,bar,baz,roffle",
            rating: 0,
            category: "none",
            description: "Make your Description!"
            
        });
});
    

var imgChild = f.child("images");
imgChild.on("child_added", function(snap){
    var snapVal = snap.val();
    var stringVal = JSON.stringify(snapVal);
    var stringSplit = stringVal.split('"img":"');
    var finalString = stringSplit[1].split('"}'); 
    console.log(snap.name());
    $('#content').append('<img src="' + finalString[0] + '" />');
});