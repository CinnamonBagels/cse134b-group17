/*
*   Javascipt file for the meme master chrome extension
*
*
*/

<<<<<<< HEAD


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

Firebase.enableLogging(true);
var f = new Firebase("https://torid-fire-9403.firebaseio.com/");
console.log(f + "by matt");

var array = [];

//binds chrome onclicked
chrome.contextMenus.onClicked.addListener(function(info) {
    var imgRef = f.child("images");
    imgRef.push({ 
            img: info.srcUrl
        });
        
    onsole.log("successfully set");
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
$(document).ready(function(){
    $("#homeBtn").click(function() {
        var newURL = "http://google.com";
        chrome.tabs.create({url:newURL});
       
    });
    
});
=======
    Firebase.enableLogging(true);
    var f = new Firebase("https://flickering-fire-2908.firebaseio.com/");
      var bg = chrome.extension.getBackgroundPage();

      bg.console.log("huehuehue0");
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
      f.set({
        src: info.srcUrl;       
      });
      chrome.extension.getBackgroundPage().console.log("successfully set");
      
  });  
>>>>>>> FETCH_HEAD
