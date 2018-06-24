interact('#cart')
.draggable({
    // call this function on every dragmove event
    onmove: dragMoveListener,

    // enable inertial throwing
    inertia: true,

    // enable autoScroll
    autoScroll: false,

    // keep the element within the area of it's parent
    restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
});

function dragMoveListener (event) {
    const target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    if (y > 400 && elementAlreadyHasClass('quote-cart', event.currentTarget.classList)){
        event.currentTarget.classList.toggle('quote-cart-bottom');
        event.currentTarget.classList.remove('quote-cart');
        event.preventDefault();
    }
}

function elementAlreadyHasClass(elementClass, classList) {
    let alreadyHasClass = false;
    classList.forEach((c) => {
        if(elementClass === c) {
            alreadyHasClass = true;
        }
    });
    return alreadyHasClass;
}