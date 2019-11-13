var currentTab = null;

var checkExist = setInterval(function() {
    if (document.getElementById('admin-active')) {
       console.log("Exists!");
       currentTab = document.getElementById('admin-active');
       clearInterval(checkExist);
    }
 }, 100);

$(document).on("click","div.admin-link", function () {
    var click = $(this).attr('id');
    if(click != "admin-active")
    {
        $(currentTab).attr('id', "none");
        currentTab = $(this);
        $(this).attr('id', "admin-active");
    }
 });