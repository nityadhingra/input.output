const isDragged = {};
/* this will create an object that looks like:
 * {
 *  sunface: false,
 *  shooting: false,
 *  sunring: false,
 *  moonLeft: false,
 *  circleEmpty: false,
 *  circleBlack: false,
 *  moonAngryRight: false,
 *  moonAngryLeft: false
 * }
 * this will be updated whenever the symbols are dropped
 * at their matching drop boxes */

document.querySelectorAll('.draggable').forEach((img) => {
  isDragged[img.getAttribute('data-slug')] = false;
  img.addEventListener('dragstart', handleDragStart);
  img.addEventListener('dragend', handleDragEnd);
});

document.querySelectorAll('.dropbox').forEach((dropbox) => {
  dropbox.addEventListener('dragover', handleDragOver);
  dropbox.addEventListener('drop', handleDrop);
});

document.querySelector('.bgbuttons').addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    document.body.style.backgroundColor = event.target.getAttribute('data-bg-color');
  }
});

function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.getAttribute('data-slug'));
  event.dataTransfer.setDragImage(this, 32, 32);

  this.style.opacity = 0.3;
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();

  if (event.currentTarget.getAttribute('data-slug') === event.dataTransfer.getData('text')) {
    isDragged[event.dataTransfer.getData('text')] = true;

    this.classList.remove('symbol-bg');
    this.style.opacity = 1;

    this.removeEventListener('dragover', handleDragOver);
    this.removeEventListener('drop', handleDrop);
  }
}

function handleDragEnd(event) {
  if (isDragged[event.target.getAttribute('data-slug')]) {
    this.removeAttribute('draggable');

    this.removeEventListener('dragstart', handleDragStart);
    this.removeEventListener('dragend', handleDragEnd);
  } else {
    this.removeAttribute('style');
  }
}

// Register touch event handlers
someElement.addEventListener('touchstart', process_touchstart, false);
someElement.addEventListener('touchmove', process_touchmove, false);
someElement.addEventListener('touchcancel', process_touchcancel, false);
someElement.addEventListener('touchend', process_touchend, false);

// touchstart handler
function process_touchstart(ev) {
  // Use the event's data to call out to the appropriate gesture handlers
  switch (ev.touches.length) {
    case 1: handle_one_touch(ev); break;
    case 2: handle_two_touches(ev); break;
    case 3: handle_three_touches(ev); break;
    default: gesture_not_supported(ev); break;
  }
}

// Create touchstart handler
someElement.addEventListener('touchstart', function(ev) {
  // Iterate through the touch points that were activated
  // for this element and process each event 'target'
  for (var i=0; i < ev.targetTouches.length; i++) {
    process_target(ev.targetTouches[i].target);
  }
}, false);

// touchmove handler
function process_touchmove(ev) {
  // Set call preventDefault()
  ev.preventDefault();
}