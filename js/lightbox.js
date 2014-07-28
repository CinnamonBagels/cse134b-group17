$(document).ready (function()
{
  $(".imgFrame").each(function()
  {
    var url = $(this).attr("id");
    // console.log(url);
    $(this).css("background", "url(\"" + url + "\")");
    $(this).css("background-repeat", "no-repeat");
    $(this).css("background-size", "100% auto");
    $(this).css("background-position", "center");
  });

  $(".lightboxLink").click(function(e)
  {
    $("#lightbox_background").css("opacity", 1);
    $("#lightbox_background").css("z-index", 10);

    var url = $(this).attr("id");

    $("#lightbox_picture").attr("src", url);
  });

  $("#lightbox_background").click(function(data, handler)
  {
    if(data.target == this)
    {
      $("#lightbox_background").css("opacity", 0);
      setTimeout(function()
      {
        $("#lightbox_background").css("z-index", -5);
      }, 300);
      $("#meme_gallery").css("position", "");
    }
  });
});