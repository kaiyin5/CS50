/* Reference: https://www.w3schools.com/howto/howto_js_topnav_responsive.asp*/
    https://www.w3schools.com/howto/howto_js_tab_img_gallery.asp*/

/* set light mode as default */
var dark_mode = 0;

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function responsive_navBar() {
    var x = document.getElementById("myTopnav");
    if (x.className == "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function darkmode() {
    var element = document.body;
    var table = document.getElementById("table-ack");
    element.classList.toggle("dark-mode");
    table.classList.toggle("dark-mode");
    if (dark_mode == 0)
    {
        dark_mode = 1;
    }
    else
    {
        dark_mode = 0;
    }
}

function gallery(imgs) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    expandImg.parentElement.style.display = "block";
    if (dark_mode == 0){
        darkmode();
    }
}
