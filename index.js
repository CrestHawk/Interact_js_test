let cartStartPos = null;
let footerCartStartPos = null;
const configurationPanel = document.getElementById("configuration-panel");
const footerQuoteCart = document.getElementById("footer-cart");
const cart = document.getElementById("cart");

interact('#cart')
.draggable({
    // call this function on every dragmove event
    onmove: moveCart,

    // enable inertial throwing
    inertia: true,

    // enable autoScroll
    autoScroll: false,
})
.restrict({
    drag: "",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
})
.snap({
    mode: 'anchor',
    anchors: [],
    range: Infinity,
    elementOrigin: { x: 0.5, y: 0.5 },
    endOnly: true
})
.on('dragstart', function (event) {
    if (!cartStartPos) {
      var rect = interact.getElementRect(event.target);

      // record center point when starting the very first a drag
      cartStartPos = {
        x: rect.left + rect.width  / 2,
        y: rect.top  + rect.height / 2
      }
    }

    // snap to the start position
    event.interactable.snap({ anchors: [cartStartPos] });
});

function moveCart (event) {
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

    if (y > 400 && (!elementAlreadyHasClass("configuration-panel-animate-right", configurationPanel.classList))) {
        expandConfigurationPanel();
        displayFooterQuoteCart();
        hideCart();
        //event.target.snap();
        event.preventDefault();
    }
}

interact('#footer-cart')
.draggable({
    // call this function on every dragmove event
    onmove: moveFooterCart,

    // enable inertial throwing
    inertia: true,

    // enable autoScroll
    autoScroll: false,
})
.restrict({
    drag: "",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
})
.snap({
    mode: 'anchor',
    anchors: [],
    range: Infinity,
    elementOrigin: { x: 0.5, y: 0.5 },
    endOnly: true
})
.on('dragstart', function (event) {
    if (!footerCartStartPos) {
      var rect = interact.getElementRect(event.target);

      // record center point when starting the very first a drag
      footerCartStartPos = {
        x: rect.left + rect.width  / 2,
        y: rect.top  + rect.height / 2
      }
    }

    // snap to the start position
    event.interactable.snap({ anchors: [footerCartStartPos] });
});

function moveFooterCart (event) {
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

    if (y < -400 && (elementAlreadyHasClass("configuration-panel-animate-right", configurationPanel.classList))) {
        resetConfigurationPanel();
        hideFooterCart();
        //event.target.snap();
        displayCart();
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

function hideCart () {
    cart.style.display = "none";
}

function displayCart () {
    cart.style.display = "block";
}

function expandConfigurationPanel () {
    if(elementAlreadyHasClass("reset-configuration-panel-animate", configurationPanel.classList)) {
        configurationPanel.classList.remove("reset-configuration-panel-animate");
    }
    configurationPanel.classList.toggle("configuration-panel-animate-right");
}

function resetConfigurationPanel () {
    configurationPanel.classList.remove("configuration-panel-animate-right");
    configurationPanel.classList.toggle("reset-configuration-panel-animate");
}

function displayFooterQuoteCart () {
    footerQuoteCart.style.display = "block";
}

function hideFooterCart () {
    footerQuoteCart.style.display = "none";
}