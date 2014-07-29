/*
*   Javascipt file for the meme master chrome extension
*
*
*/

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.


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


