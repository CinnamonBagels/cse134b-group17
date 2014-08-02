//////////////////////////
// GLOBAL VARIABLES :(  //
//////////////////////////

var images = [];
var srcAssociation = [];

var i = 0;
var customRating = 0;
//firebase
var f;

var categories = ["cat", "gaben", "Reaction Gifs"];
var tags = ["turn,down,for,what", "thomas,powell,is,awesome", "this,is,a,random,seeded,category", "max,wang"];
var ratings = [1, 2, 3, 4, 5];
var descriptions = ["Hehe", "TURN DOWN FOR WHAT!?", "Shakira is huehue", "pls give us points", "be easy on us when grading", "this is a random description",
 "we are seeding our descriptions"];

var titles = ["this", "is", "a", "title", "that", "we", "dont", "care", "about"];

function hide() {
  $('.thumbnail > .hover').hide();

  $('.thumbnail').hover(function() {
    $('.hover', this).show();
  },
  function() {
    $('.hover', this).hide();
  });
}

//////////////////
// SAVING INFO  //
//////////////////
///

function saveInfo(element) {
    var image;
    for (var i = 0; i < images.length; i++) {
        if (images[i].img == element.src) {
            image = images[i];
            break;
        }
    }
    var tags = image.tags.split(',');
    console.log(tags);

    $('#tags_1').replaceWith('<input id="tags_1" type="text" class="tags" value="' + image.tags + '" style="display: none;">');
    $('.tag').remove();
    for (var i = tags.length - 1; i >=0; i--) {
        $('#tags_1_tagsinput').prepend('<span class="tag"><span>' + tags[i] + '&nbsp;&nbsp;</span><a href="#" title="Removing tag">x</a></span>')
    }

    document.getElementsByTagName('textarea')[0].placeholder = image.description;

}

function ReloadTags() {
    var scriptTag = document.getElementById("pleasework");
    var src;

    src = scriptTag.src;
    scriptTag.parentNode.removeChild(scriptTag);

    var x = document.createElement('script');
    x.type = 'text/javascript';
    x.src = "./js/jquery.tagsinput.min.js";
    x.id = "pleasework";
    document.getElementsByTagName('head')[0].appendChild(x);
}

///////////////////////////
// DRAG AND DROP UPLOAD  //
///////////////////////////
function showDropZone() {
  $('#drop-zone').show();
}

function hideDropZone() {
  $('#drop-zone').hide();
}


////////////////////
// LOGIN/ LOGOUT  //
////////////////////
function login() {
  $('.navbar-right').empty();

  $('.navbar-right').append('<li class="dropdown"><a class="navbar-brand" href="#">Welcome User!</a><a onclick="logout()" class="navbar-brand" href="#">Logout</a></li>');
}

function logout() {
    $('.navbar-right').empty();

    $('.navbar-right').append('<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Login <b class="caret"></b></a><ul class="dropdown-menu"><li><form onsubmit="login()"><div class="col-lg-10 col-lg-offset-1"><input type="text" class="form-control" id="inputEmail" placeholder="Username"></div></li><li><div class="col-lg-10 col-lg-offset-1"><input type="password" class="form-control" id="inputPassword" placeholder="Password"><div class="checkbox"><label><input type="checkbox"> Remember me</label></div></div></form></li><li><div class="form-group"><div class="col-lg-10 col-lg-offset-1"><button onclick="login()" type="submit" class="btn btn-info btn-signin btn-login">Login in</button></div></div></li><li style="text-align: center;"><button type="button" class="btn btn-link"><font color = #939393>Sign Up</font></button><button type="button" class="btn btn-link"><font color = #939393>Reset Password</font></button></li></ul></li>');
}

/////////////////////////
// CATEGORY FUNCTIONS  //
/////////////////////////
/* Function to add new categories to the side-bar*/
function addCat(id) {
  if (check_min(id) == true) {
    return;
  }
  if (check_exist(id) == true) {
    return;
  } else {
    var newCat = $(".add-cat-field").val();
    $(".sidebar-nav").append("<li id=" + newCat + "><a href='#'>" + newCat +
      "<input type='submit' class='cat-delete' value= 'x' /></a></li>");
  }
}

/* Function to control side-bar delete buttons */
$(document).on('click', '.cat-delete', function() {
  $(this).closest('li').remove();
});

/* Function that allows for enter button on the add-category text field */
$('.add-cat-field').keyup(function(event) {
  if (event.keyCode == 13) {
    $(".add-cat-btn").click();
  }
});

/* Functions to check validity of side-bar text field entries */
function check_length(val) {
  maxLength = 19;

  if (val.length > maxLength) {
    if ($("#cat-min-alert"))
      $("#cat-min-alert").closest('li').remove();

    if ($("#cat-exist-alert"))
      $("#cat-exist-alert").closest('li').remove();

    if (!$("#cat-max-alert").length) {
      $(".sidebar-nav").prepend("<li><p id=cat-max-alert style='font-size:10; color:rgb(155,6,6);'>" + "Limit of characters is 20 </p></li>");
    }
  }
}

function check_min(id) {
  var checkText = id.value;
  if (id.value <= 0) {

    if ($("#cat-max-alert"))
      $("#cat-max-alert").closest('li').remove();

    if ($("#cat-exist-alert"))
      $("#cat-exist-alert").closest('li').remove();

    if (!$("#cat-min-alert").length) {
      $(".sidebar-nav").prepend("<li><p id=cat-min-alert style='font-size:10; color:rgb(155,6,6);'>" + "Minimum length is 1 </p></li>");
    }

    return true;
  } else {
    return false;
  }
}
/* Function checks if list element of ID already exists. Returns true if it does */
function check_exist(id) {
  var idVal = id.value;
  if ($('#' + idVal).length) {
    if ($("#cat-min-alert"))
      $("#cat-min-alert").closest('li').remove();

    if ($("#cat-max-alert"))
      $("#cat-max-alert").closest('li').remove();

    if (!$("#cat-exist-alert").length) {
      $(".sidebar-nav").prepend("<li><p id=cat-exist-alert style='font-size:10;" +
        "color:rgb(155,6,6);'>Category already exists. </p></li>");
    }

    return true;
  } else {
    return false;
  }
}
/* Handles events when alerts are still present even after fixing the alert */
$("#Text1").on("keydown", function() {

  if ($("#cat-max-alert"))
    $("#cat-max-alert").closest('li').remove();

  if ($("#cat-exist-alert"))
    $("#cat-exist-alert").closest('li').remove();

  if ($("cat-min-alert"))
    $("#cat-min-alert").closest('li').remove();

});

//////////////
// SORTING  //
//////////////

function sortByTitle() {
    $('.col-sm-6').remove();

    images.sort(function(a, b) {
      return a.title > b.title;
    });
    for(var k = 0; k < images.length; k++) {
        $('.row').prepend("<div class='col-sm-6 col-md-3'><div class='thumbnail'><img  id='" + images[k].img + "' class='lightboxLink' src='" + images[k].img + "' alt='huehue'><div class='hover'><p>" + images[k].description + "</p><div class='post-info'>Category : " + images[k].category + "</div><a class='magnify' href='" + images[k].img + "' data-lightbox='" + images[k].img + "'><img class='expandIcon' src=./img/expand.png /></a></div></div></div>");
    }
    hide();
    ReloadScripts();
}

function sortByRating() {
    $('.col-sm-6').remove();

    images.sort(function(a, b) {
      return a.rating > b.rating;
    });

    for(var k = 0; k < images.length; k++) {
        $('.row').prepend("<div class='col-sm-6 col-md-3'><div class='thumbnail'><img onclick='saveInfo(this)' id='" + images[k].img + "' class='lightboxLink' src='" + images[k].img + "' alt='huehue'><div class='hover'><p>" + images[k].description + "</p><div class='post-info'>Category: " + images[k].category + "</div><a class='magnify' href='" + images[k].img + "' data-lightbox='" + images[k].img + "'><img class='expandIcon' src=./img/expand.png /></a></div></div></div>");
    }
    hide();
    ReloadScripts();
}

function sortByDate() {
    $('.col-sm-6').remove();

    images.sort(function(a, b) {
      return a.time > b.time;
    });
    for(var k = 0; k < images.length; k++) {
        $('.row').prepend("<div class='col-sm-6 col-md-3'><div class='thumbnail'><img onclick='saveInfo(this)' id='" + images[k].img + "' class='lightboxLink' src='" + images[k].img + "' alt='huehue'><div class='hover'><p>" + images[k].description + "</p><div class='post-info'>Category: " + images[k].category + "</div><a class='magnify' href='" + images[k].img + "' data-lightbox='" + images[k].img + "'><img class='expandIcon' src=./img/expand.png /></a></div></div></div>");
   }
   hide();
   ReloadScripts();
}

/////////////////////////
// FIREBASE FUNCTIONS  //
/////////////////////////
function ReloadScripts() {

    var scriptTag = document.getElementById("superImportant");
    var src;

    src = scriptTag.src;
    scriptTag.parentNode.removeChild(scriptTag);

    var x = document.createElement('script');
    x.type = 'text/javascript';
    x.src = "./js/lightbox_a.js";
    x.id = "superImportant";
    document.getElementsByTagName('head')[0].appendChild(x);

}

$(document).ready(function () {

    $('.lightboxLink').on('click', function () {
        console.log('here');
    });

    f = new Firebase("https://flickering-fire-2908.firebaseio.com/");

  var db = f.child("images");

  db.on('child_added', function(snap){
    var src = JSON.stringify(snap.val()).split('"img":"')[1].split('"}')[0].split('"')[0];
    var tags;
    var image = snap.val();
    
    var category = image.category;
    var description = image.description;
    var img = image.img;
    var rating = image.rating;
    var time = image.time;
    var title = image.title;

    images.push(image);
    console.log(images);

    $('.row').prepend("<div class='col-sm-6 col-md-3'><div  class='thumbnail'><img onclick='saveInfo(this)' id='" + img + "' class='lightboxLink' src='" + img + "' alt='huehue'><div class='hover'><p>" + description + "</p><div class='post-info'>Category : " + category + "</div><a class='magnify' href='" + img + "' data-lightbox='" + img + "'><img class='expandIcon' src=./img/expand.png /></a></div></div></div>");

    hide();

    ReloadScripts();
  });

  /////////////////////
  // UPLOAD FUNCTION //
  /////////////////////
  $('#drop-zone').on('dragenter', doNothing);
  $('#drop-zone').on('dragover', doNothing);
  $('#drop-zone').on('dragleave', doNothing);
  $('#drop-zone').on('drop', function(e) {
    e.originalEvent.stopPropagation();
    e.originalEvent.preventDefault();
    var fileQueue = [];
    for (var i = 0; i < e.originalEvent.dataTransfer.files.length; i++) {
        fileQueue.push(e.originalEvent.dataTransfer.files[i]);
    }
    var reader = new FileReader();
    var src;
    var timeStamp = Math.round(new Date().getTime()/1000);
    reader.onloadend = function() {
      src = reader.result;
      f.child('images').push({ 
          img: src,
          time: timeStamp,
          title: titles[Math.floor(Math.random() * titles.length)],
          tags: tags[Math.floor(Math.random() * tags.length)],
          rating: ratings[Math.floor(Math.random() * ratings.length)],
          category: categories[Math.floor(Math.random() * categories.length)],
          description: descriptions[Math.floor(Math.random() * descriptions.length)]
      });

      images.push({
          img: src,
          time: timeStamp,
          title: titles[Math.floor(Math.random() * titles.length)],
          tags: tags[Math.floor(Math.random() * tags.length)],
          rating: ratings[Math.floor(Math.random() * ratings.length)],
          category: categories[Math.floor(Math.random() * categories.length)],
          description: descriptions[Math.floor(Math.random() * descriptions.length)]

      });
      ReloadScripts();
      if (fileQueue[0]) {
          reader.readAsDataURL(fileQueue.shift());
      }
    }
    reader.readAsDataURL(fileQueue.shift());
    hideDropZone();
 });

  function doNothing(e) {
    e.originalEvent.stopPropagation();
    e.originalEvent.preventDefault();
  }

});