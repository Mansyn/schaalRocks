'use strict';


// Shortcuts to DOM Elements.
var content = document.getElementsByClassName('main-container')[0];
var sideNav = document.getElementsByClassName('sidenav')[0];

function openNav() {
    if (sideNav.style.width == '250px') {
        sideNav.style.width = '0';
        content.style.marginLeft = '0';
    } else {
        sideNav.style.width = '250px';
        content.style.marginLeft = '250px';
    }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    sideNav.style.width = '0';
    content.style.marginLeft = '0';
}

// Bindings on load.
window.addEventListener('load', function () {

}, false);
