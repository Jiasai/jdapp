(function () {
    'use strict';

    // dpr->scale = 1 / dpr
    var docEl = document.documentElement,
        viewportEl = document.querySelector('meta[name="viewport"]'),
        dpr = window.devicePixelRatio || 1,
        maxWidth = 540,
        minWidth = 320;

    dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);

    docEl.setAttribute('data-dpr', dpr);
    docEl.setAttribute('max-width', maxWidth);
    docEl.setAttribute('min-width', minWidth);


    var scale = 1 / dpr,
        content = 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no';

    if (viewportEl) {
        viewportEl.setAttribute('content', content);
    } else {
        viewportEl = document.createElement('meta');
        viewportEl.setAttribute('name', 'viewport');
        viewportEl.setAttribute('content', content);
        document.head.appendChild(viewportEl);
    }

    setRemUnit();

    window.addEventListener('resize', setRemUnit);

    function setRemUnit() {
        var ratio = 18.75;
        var viewWidth = docEl.getBoundingClientRect().width || window.innerWidth;

        // console.log(viewWidth);

        if (maxWidth && (viewWidth / dpr > maxWidth)) {
            viewWidth = maxWidth * dpr;
        } else if (minWidth && (viewWidth / dpr < minWidth)) {
            viewWidth = minWidth * dpr;
        }

        docEl.style.fontSize = viewWidth / ratio *2.5 + 'px';
    }

    //简单屏幕适配、rem计算
    function sempleSetRem(){
        var viewWidth = document.documentElement.clientWidth||window.innerWidth||docEl.getBoundingClientRect().width||document.body.clientWidth;
        var ratio = viewWidth / 375;
        document.getElementsByTagName('html')[0].style.fontSize= (100 * ratio)+'px';
    }

})();