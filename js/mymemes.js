$('.thumbnail > .hover').hide();

$('.thumbnail').hover(function() {
    $('.hover', this).show();
  },
  function() {
    $('.hover', this).hide();
  });


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


/*

Place Firebase-specific javascript

*/
function ReloadScripts() {

  var scriptTag = document.getElementsByTagName('script');
  var src;
    
    src = scriptTag[1].src;
    scriptTag[1].parentNode.removeChild(scriptTag[1]);

    var x = document.createElement('script');
    x.type = 'text/javascript';
    x.src = src;
    console.log(x);
    document.getElementsByTagName('head')[0].appendChild(x);


}

$(document).ready(function() {
  var f = new Firebase("https://flickering-fire-2908.firebaseio.com/");

  f.on('value', function(img) {
    var src = img.val().src;
    $('.row').prepend("<div class='col-sm-6 col-md-3'><div class='thumbnail'><img id='" + src + "' class='lightboxLink' src='" + src + "' alt='huehue'><div class='hover'><p>Add your own Comment!</p><div class='post-info'>Album : My Memes</div><a class='magnify' href='" + src + "' data-lightbox='" + src + "'><img class='expandIcon' src=./img/expand.png /></a></div></div></div>");
    console.log(img.val().src);

    $('.thumbnail > .hover').hide();

    $('.thumbnail').hover(function() {
        $('.hover', this).show();
      },
      function() {
        $('.hover', this).hide();
      });

      ReloadScripts();
    //$('.row').append('<div style="opacity: 0; z-index: -5;" id="lightbox_background"><div class="lightbox_a"><img id="lightbox_picture" src="' + src + '" alt="#"><div id="user_functions_container"><p style="color: white; float: left; margin: 0; font-size: large; color: #FFE181; font-style:italic;">Rating</p><span class="starRating">       <input name="rating" value="1" type="radio"><i></i><input name="rating" value="2" type="radio"><i></i><input name="rating" value="3" type="radio"><i></i><input name="rating" value="4" type="radio"><i></i><input name="rating" value="5" type="radio"><i></i></span><form><p><input id="tags_1" type="text" class="tags" value="foo,bar,baz,roffle" style="display: none;"></p></form><form id="comment_form"><textarea name="commentBox" placeholder="write down your comment" id="comment_box"></textarea><input class="btn btn-danger btn-save" value="Save" type="button"></form></div> </div></div>');
  });

});