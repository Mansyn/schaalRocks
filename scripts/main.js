'use strict';


// Shortcuts to DOM Elements.
var rocks = document.querySelectorAll('.rocks image');

function handleDragStart(e) {
    this.style.opacity = '0.4';  // this / e.target is the source node.
}

// Bindings on load.
window.addEventListener('load', function () {

    [].forEach.call(rocks, function (rock) {
        rock.addEventListener('dragstart', handleDragStart, false);
    });

}, false);
