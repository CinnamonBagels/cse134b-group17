/*
*   Javascipt file for the meme master chrome extension
*
*
*/

var categories = ["cat", "gaben", "Reaction Gifs"];
var tags = ["turn,down,for,what", "thomas,powell,is,awesome", "this,is,a,random,seeded,category", "max,wang"];
var ratings = [1, 2, 3, 4, 5];
var descriptions = ["Hehe", "TURN DOWN FOR WHAT!?", "Shakira is huehue", "pls give us points", "be easy on us when grading", "this is a random description",
 "we are seeding our descriptions"];

var titles = ["this", "is", "a", "title", "that", "we", "dont", "care", "about"];
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

var f = new Firebase("https://flickering-fire-2908.firebaseio.com/");

//binds chrome onclicked
chrome.contextMenus.onClicked.addListener(function(info) {
    var imgRef = f.child("images");
    var date=new Date();
    var timeStamp = Math.round(date.getTime() / 1000);

    imgRef.push({ 
            img: info.srcUrl,
            time: timeStamp,
            title: titles[Math.floor(Math.random() * titles.length)],
            tags: tags[Math.floor(Math.random() * tags.length)],
            rating: ratings[Math.floor(Math.random() * ratings.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            description: descriptions[Math.floor(Math.random() * descriptions.length)]
            
    });
    window.alert('Meme successfully added to your mememaster!');
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