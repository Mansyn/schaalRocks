'use strict';


// Shortcuts to DOM Elements.
var rocks = document.querySelectorAll('.rocks image');

function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .opacity = '0.4';
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text');
  
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    
    dropzone.appendChild(draggableElement);
  
    event
      .dataTransfer
      .clearData();
}

// Bindings on load.
window.addEventListener('load', function () {


}, false);
