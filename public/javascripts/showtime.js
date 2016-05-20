(function() {
    var bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    window.ShowTime = (function() {
        var MQ;
        MQ = {
            SMALL: "only screen and (max-width: 38.6875em)",
            MEDIUM: "only screen and (min-width: 38.75em)",
            LARGE: "only screen and (min-width: 62.5em)",
            XLARGE: "only screen and (min-width: 85.625em)",
            XXLARGE: "only screen and (min-width: 99.375em)"
        };

        function ShowTime(wrapper) {
            this.wrapper = wrapper;
            this.beforeTransition = bind(this.beforeTransition, this);
            this.animateSlides = bind(this.animateSlides, this);
            this.setStyle = bind(this.setStyle, this);
            this.resetTransform = bind(this.resetTransform, this);
            this.createDots = bind(this.createDots, this);
            this.setDotPage = bind(this.setDotPage, this);
            this.showImage = bind(this.showImage, this);
            this.updateMovingCards = bind(this.updateMovingCards, this);
            this.trackSwipeInteraction = bind(this.trackSwipeInteraction, this);
            this.trackHighlightLink = bind(this.trackHighlightLink, this);
            this.onScrollEnd = bind(this.onScrollEnd, this);
            this.onBeforeScrollStart = bind(this.onBeforeScrollStart, this);
            this.buildClones = bind(this.buildClones, this);
            this.goTo = bind(this.goTo, this);
            this.fadeTo = bind(this.fadeTo, this);
            this.goDot = bind(this.goDot, this);
            this.hasClass = bind(this.hasClass, this);
            this.goRight = bind(this.goRight, this);
            this.goLeft = bind(this.goLeft, this);
            this.onKeyDown = bind(this.onKeyDown, this);
            this.onResize = bind(this.onResize, this);
            this.onMouseLeave = bind(this.onMouseLeave, this);
            this.onMouseEnter = bind(this.onMouseEnter, this);
            this.fixScrollLeft = bind(this.fixScrollLeft, this);
            this.setDefaultVariables = bind(this.setDefaultVariables, this);
            this.reset = bind(this.reset, this);
            this.getElementSize = bind(this.getElementSize, this);
            this.triggerEvent = bind(this.triggerEvent, this);
            this.isLarge = bind(this.isLarge, this);
            this.isMedium = bind(this.isMedium, this);
            this.isSmall = bind(this.isSmall, this);
            this.initEvents = bind(this.initEvents, this);
            this.container = this.wrapper.querySelector('.showtime__scroll-container');
            this.touchStrip = this.wrapper.querySelector('.showtime');
            this.originalSlides = this.container.querySelectorAll(".showtime__scroll-element-wrapper");
            this.originalSlidesLength = this.originalSlides.length;
            this.originalMediumScreenSlides = this.container.querySelectorAll(".showtime__scroll-desktop-page-wrapper");
            this.mediumScreenSlides = this.originalMediumScreenSlides;
            this.dotsContainer = this.wrapper.querySelector('.gui-navigation-dots');
            this.arrowLeft = this.wrapper.querySelector(".showtime__arrow--left");
            this.arrowRight = this.wrapper.querySelector(".showtime__arrow--right");
            this.highlightLinks = this.wrapper.querySelectorAll(".js-showtime-highlight-link");
            this.smallScreenSlides = this.originalSlides;
            this.debug = window.location.hash === "#debug";
            this.currentPage = 0;
            this.cloneOffset = 0;
            this.screenSize = this.getScreenSize();
            this.trackHighlightLink();
            this.fixElementSize();
            document.addEventListener("DOMContentLoaded", (function(_this) {
                return function() {
                    _this.fixElementSize();
                    return _this.IScrollInstance && _this.IScrollInstance.refresh && _this.IScrollInstance.refresh();
                };
            })(this));
            this.initEvents();
            this.setDefaultVariables();
            this.triggerEvent("init");
        }
        ShowTime.prototype.initEvents = function() {
            var fn, k, len1, ref, results;
            if (window.glb && window.glb.showTimeEvents) {
                ref = window.glb.showTimeEvents;
                results = [];
                for (k = 0, len1 = ref.length; k < len1; k++) {
                    fn = ref[k];
                    results.push(fn());
                }
                return results;
            }
        };
        ShowTime.prototype.isSmall = function() {
            return this.screenSize === 'small';
        };
        ShowTime.prototype.isMedium = function() {
            return this.screenSize === 'medium';
        };
        ShowTime.prototype.isLarge = function() {
            return this.screenSize === 'large';
        };
        ShowTime.prototype.isTouch = function() {
            return Modernizr.touch;
        };
        ShowTime.prototype.isBuggyVWBrowser = function() {
            var isBadStockAndroid, isMobileSafari, isOperaMini, userAgent;
            userAgent = window.navigator.userAgent;
            isOperaMini = userAgent.indexOf('Opera Mini') > -1;
            isMobileSafari = /(iPhone|iPod|iPad).+AppleWebKit/i.test(userAgent) && (function() {
                var iOSversion;
                iOSversion = userAgent.match(/OS (\d)/);
                return iOSversion && iOSversion.length > 1 && parseInt(iOSversion[1]) < 8;
            })();
            isBadStockAndroid = (function() {
                var isStockAndroid, versionNumber;
                isStockAndroid = userAgent.indexOf(' Android ') > -1 && userAgent.indexOf('Version/') > -1;
                if (!isStockAndroid) {
                    return false;
                }
                versionNumber = parseFloat((userAgent.match('Android ([0-9.]+)') || [])[1]);
                return versionNumber <= 4.4;
            })();
            return isMobileSafari || isBadStockAndroid || isOperaMini;
        };
        ShowTime.prototype.getScreenSize = function() {
            var screenSize;
            screenSize = 'small';
            if (matchMedia(MQ.LARGE).matches) {
                screenSize = 'large';
            } else if (matchMedia(MQ.MEDIUM).matches) {
                screenSize = 'medium';
            }
            return screenSize;
        };
        ShowTime.prototype.triggerEvent = function(evName) {
            var event;
            if (!window.CustomEvent) {
                return;
            }
            event = new CustomEvent(evName);
            return this.touchStrip.dispatchEvent(event);
        };
        ShowTime.prototype.getElementSize = function(element) {
            var computedStyle, elementWidth;
            computedStyle = getComputedStyle(element);
            elementWidth = element.getBoundingClientRect().width || element.clientWidth;
            elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
            return Math.floor(elementWidth);
        };
        ShowTime.prototype.resetMediumScreenSlideWidth = function() {
            var k, len1, ref, results, slide;
            ref = this.mediumScreenSlides;
            results = [];
            for (k = 0, len1 = ref.length; k < len1; k++) {
                slide = ref[k];
                results.push(slide.style['width'] = "");
            }
            return results;
        };
        ShowTime.prototype.fixElementSize = function() {
            var addMargin, el, element, k, l, len1, len2, len3, len4, m, margin, o, ref, ref1, ref2, ref3, slide, styleObj, width, windowWidth;
            if (this.isSmall()) {
                windowWidth = window.innerWidth;
                element = this.originalSlides[0];
                if (windowWidth !== element.offsetWidth || this.isBuggyVWBrowser()) {
                    width = windowWidth + "px";
                    margin = "1px";
                    addMargin = function(el) {
                        var parent;
                        parent = el.parentNode;
                        if (el !== parent.firstChild) {
                            el.style['marginLeft'] = margin;
                        }
                        if (el !== parent.lastChild) {
                            return el.style['marginRight'] = margin;
                        }
                    };
                    ref = this.mediumScreenSlides;
                    for (k = 0, len1 = ref.length; k < len1; k++) {
                        el = ref[k];
                        addMargin(el);
                    }
                    ref1 = this.smallScreenSlides;
                    for (l = 0, len2 = ref1.length; l < len2; l++) {
                        slide = ref1[l];
                        styleObj = slide.style;
                        styleObj['width'] = width;
                        addMargin(slide);
                    }
                }
            } else {
                width = this.getElementSize(this.touchStrip);
                ref2 = this.smallScreenSlides;
                for (m = 0, len3 = ref2.length; m < len3; m++) {
                    el = ref2[m];
                    el.style['width'] = "";
                    el.style['marginLeft'] = "";
                    el.style['marginRight'] = "";
                }
                ref3 = this.mediumScreenSlides;
                for (o = 0, len4 = ref3.length; o < len4; o++) {
                    slide = ref3[o];
                    slide.style['width'] = width + "px";
                    slide.style['paddingLeft'] = "";
                    slide.style['paddingRight'] = "";
                    slide.style['marginLeft'] = "";
                    slide.style['marginRight'] = "";
                }
            }
        };
        ShowTime.prototype.reset = function() {
            if (this.currentTimer) {
                clearTimeout(this.currentTimer);
            }
            if (this.IScrollInstance) {
                this.IScrollInstance.destroy();
            }
            this.resetMediumScreenSlideWidth();
            this.resetTransform();
            return this.setDefaultVariables();
        };
        ShowTime.prototype.setDefaultVariables = function() {
            this.IScrollInstance = null;
            this.screenCenter = document.body.getBoundingClientRect().width / 2;
            this.cardsWidth = this.originalSlides[0].getBoundingClientRect().width;
            this.halfCardsWidth = this.cardsWidth / 2;
            this.movingCards = [];
            this.triggerEvent("before-clone-build");
            if (this.originalSlidesLength > 1) {
                this.buildClones();
            }
            this.scrollCards = this.wrapper.querySelectorAll('.showtime__scroll-element-wrapper');
            return this.bindEvents();
        };
        ShowTime.prototype.getSnapElement = function() {
            if (this.isSmall()) {
                return ".showtime__scroll-element-wrapper";
            } else {
                return ".showtime__scroll-desktop-page-wrapper";
            }
        };
        ShowTime.prototype.bindEvents = function() {
            if (this.touchStrip.className.indexOf("showtime--initialized") === -1) {
                this.touchStrip.className += " showtime--initialized";
            }
            this.fixElementSize();
            if (this.isLarge() && this.originalMediumScreenSlides.length > 1) {
                this.arrowLeft.style['display'] = 'block';
                this.arrowRight.style['display'] = 'block';
            }
            if (this.originalMediumScreenSlides.length > 1) {
                this.dotsContainer.style['display'] = 'block';
            }
            if (this.originalSlidesLength > 1) {
                this.IScrollInstance = new IScroll(this.touchStrip, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    bounce: false,
                    bindToWrapper: true,
                    snap: this.getSnapElement(),
                    snapSpeed: 400,
                    eventPassthrough: true,
                    disableMouse: true
                });
                if (this.isLarge() && !this.isTouch()) {
                    this.initTimer();
                    this.wrapper.addEventListener('mouseleave', this.onMouseLeave);
                }
                this.IScrollInstance.on("scrollEnd", this.onScrollEnd);
                this.wrapper.addEventListener('mouseenter', this.onMouseEnter);
            }
            this.createDots();
            this.setDotPage(0);
            this.dotsContainer.removeEventListener('click', this.goDot);
            this.dotsContainer.addEventListener('click', this.goDot);
            if (this.isSmall()) {
                if (this.IScrollInstance) {
                    this.IScrollInstance.goToPage(2, 0, 0);
                    this.updateMovingCards();
                    this.IScrollInstance.on("beforeTransition", this.beforeTransition);
                    this.IScrollInstance.on("beforeScrollStart", this.onBeforeScrollStart);
                    this.touchStrip.addEventListener("touchmove", this.animateSlides);
                    setTimeout((function(_this) {
                        return function() {
                            return _this.beforeTransition();
                        };
                    })(this), 1900);
                }
            } else {
                if (this.IScrollInstance) {
                    this.IScrollInstance.goToPage(1, 0, 0);
                }
                this.arrowLeft.removeEventListener('click', this.goLeft);
                this.arrowLeft.addEventListener('click', this.goLeft);
                window.removeEventListener('keydown', this.onKeyDown, false);
                window.addEventListener('keydown', this.onKeyDown, false);
                this.arrowRight.removeEventListener('click', this.goRight);
                this.arrowRight.addEventListener('click', this.goRight);
                window.removeEventListener('keydown', this.onKeyDown, false);
                window.addEventListener('keydown', this.onKeyDown, false);
            }
            window.removeEventListener('resize', this.onResize);
            window.addEventListener('resize', this.onResize);
            if (!this.isSmall()) {
                return this.showImage();
            }
        };
        ShowTime.prototype.fixScrollLeft = function() {
            if (this.touchStrip.scrollLeft > 0) {
                return this.touchStrip.scrollLeft = 0;
            }
        };
        ShowTime.prototype.initTimer = function() {
            if (this.debug) {
                return;
            }
            if (this.currentTimer) {
                clearTimeout(this.currentTimer);
            }
            return this.currentTimer = setTimeout((function(_this) {
                return function() {
                    _this.goTo(null, 1);
                    return _this.currentTimer = setTimeout(function() {
                        return _this.initTimer();
                    }, 800);
                };
            })(this), 8000);
        };
        ShowTime.prototype.onMouseEnter = function(ev) {
            clearTimeout(this.currentTimer);
            return this.currentTimer = null;
        };
        ShowTime.prototype.onMouseLeave = function(ev) {
            return this.initTimer();
        };
        ShowTime.prototype.onResize = function() {
            var needsReset, newSize;
            newSize = this.getScreenSize();
            if (this.screenSize !== newSize) {
                needsReset = this.screenSize === 'small' || newSize === 'small';
                this.screenSize = newSize;
                if (needsReset) {
                    this.reset();
                }
            }
            if (newSize !== 'small') {
                return this.fixElementSize();
            }
        };
        ShowTime.prototype.onKeyDown = function(ev) {
            var clickEvent;
            clickEvent = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true,
                'isTrusted': true
            });
            if (ev.keyCode === 37) {
                ev.preventDefault();
                return this.arrowLeft.dispatchEvent(clickEvent);
            } else if (ev.keyCode === 39) {
                ev.preventDefault();
                return this.arrowRight.dispatchEvent(clickEvent);
            }
        };
        ShowTime.prototype.goLeft = function(ev) {
            return this.goTo(ev, -1);
        };
        ShowTime.prototype.goRight = function(ev) {
            return this.goTo(ev);
        };
        ShowTime.prototype.hasClass = function(el, klass) {
            return el.className.match("(?:(?:^| )" + klass + "(?: |$))");
        };
        ShowTime.prototype.goDot = function(ev) {
            var index;
            if (this.hasClass(ev.target, "navigation-dot")) {
                index = Array.prototype.indexOf.call(this.dotsContainer.childNodes, ev.target);
                this.setDotPage(index);
                index += this.cloneOffset;
                if (this.IScrollInstance.currentPage.pageX !== index) {
                    return this.IScrollInstance.goToPage(index, 0, 800);
                }
            }
        };
        ShowTime.prototype.fadeTo = function(cloneSlide, nextSlide, nextPage) {
            var transition;
            this.animating = true;
            cloneSlide.style['display'] = 'block';
            transition = nextSlide.style['transition'];
            nextSlide.style['transition'] = 'none';
            nextSlide.style['opacity'] = 0;
            nextSlide.style['transition'] = transition;
            this.IScrollInstance.goToPage(nextPage, 0, 0);
            this.setDotPage(nextPage - this.cloneOffset);
            setTimeout((function(_this) {
                return function() {
                    cloneSlide.style['opacity'] = 0;
                    return nextSlide.style['opacity'] = 1;
                };
            })(this), 50);
            return setTimeout((function(_this) {
                return function() {
                    cloneSlide.style['display'] = 'none';
                    cloneSlide.style['opacity'] = 1;
                    return _this.animating = false;
                };
            })(this), 850);
        };
        ShowTime.prototype.goTo = function(ev, next) {
            var len, nextSlide, nextStep;
            if (next == null) {
                next = 1;
            }
            if (ev) {
                ev.preventDefault();
            }
            if (this.animating) {
                return;
            }
            len = this.originalMediumScreenSlides.length;
            nextStep = this.IScrollInstance.currentPage.pageX - this.cloneOffset + next;
            if (nextStep < 0) {
                nextSlide = len - 1 + this.cloneOffset;
                return this.fadeTo(this.firstDesktopClone, this.originalMediumScreenSlides[len - 1], nextSlide);
            } else if (nextStep >= len) {
                nextSlide = 0 + this.cloneOffset;
                return this.fadeTo(this.lastDesktopClone, this.originalMediumScreenSlides[0], nextSlide);
            } else {
                nextSlide = this.IScrollInstance.currentPage.pageX + next;
                return this.IScrollInstance.goToPage(nextSlide, 0, 800);
            }
        };
        ShowTime.prototype.buildClones = function() {
            var clone, cloneCount, el, k, l, lastClones, len, len1, len2, len3, m, node, prevClones, ref;
            ref = this.wrapper.querySelectorAll(".clone, .desktop-clone");
            for (k = 0, len1 = ref.length; k < len1; k++) {
                el = ref[k];
                el.remove();
            }
            cloneCount = 0;
            if (this.isSmall()) {
                len = this.originalSlidesLength;
                prevClones = [this.originalSlides[--len], this.originalSlides[--len]];
                lastClones = [this.originalSlides[0], this.originalSlides[1]];
                for (l = 0, len2 = prevClones.length; l < len2; l++) {
                    node = prevClones[l];
                    clone = node.cloneNode(true);
                    clone.className += " clone";
                    this.container.insertBefore(clone, this.container.firstChild);
                    cloneCount++;
                }
                for (m = 0, len3 = lastClones.length; m < len3; m++) {
                    node = lastClones[m];
                    clone = node.cloneNode(true);
                    clone.className += " clone";
                    this.container.appendChild(clone);
                    cloneCount++;
                }
            } else {
                len = this.originalMediumScreenSlides.length;
                this.firstDesktopClone = this.originalMediumScreenSlides[0].cloneNode(true);
                this.lastDesktopClone = this.originalMediumScreenSlides[--len].cloneNode(true);
                this.firstDesktopClone.className += " desktop-clone";
                this.lastDesktopClone.className += " desktop-clone";
                this.wrapper.appendChild(this.firstDesktopClone);
                this.wrapper.appendChild(this.lastDesktopClone);
                cloneCount = 2;
                this.container.appendChild(this.firstDesktopClone.cloneNode(true));
                this.container.insertBefore(this.lastDesktopClone.cloneNode(true), this.container.firstChild);
                this.mediumScreenSlides = this.wrapper.querySelectorAll(".showtime__scroll-desktop-page-wrapper");
            }
            this.cloneOffset = cloneCount / 2;
            return this.smallScreenSlides = this.container.querySelectorAll(".showtime__scroll-element-wrapper");
        };
        ShowTime.prototype.onBeforeScrollStart = function() {
            return this.currentPage = this.IScrollInstance.currentPage.pageX;
        };
        ShowTime.prototype.onScrollEnd = function() {
            var current, firstPossiblePos, lastPossiblePos, originalSlideLength, pageLength;
            if (this.isTouch) {
                current = this.IScrollInstance.currentPage.pageX;
                pageLength = this.IScrollInstance.pages.length;
                lastPossiblePos = pageLength - this.cloneOffset - 1;
                firstPossiblePos = this.cloneOffset;
                if (!(this.currentTimer || this.isLarge())) {
                    this.trackSwipeInteraction(current);
                }
                if (current < firstPossiblePos) {
                    originalSlideLength = this.originalMediumScreenSlides.length;
                    if (this.isSmall()) {
                        originalSlideLength = this.originalSlidesLength;
                    }
                    this.setDotPage(originalSlideLength - 1);
                    this.IScrollInstance.goToPage(lastPossiblePos, 0, 0);
                } else if (current > lastPossiblePos) {
                    this.setDotPage(0);
                    this.IScrollInstance.goToPage(firstPossiblePos, 0, 0);
                } else {
                    this.setDotPage(current - this.cloneOffset);
                }
                if (this.isSmall()) {
                    this.updateMovingCards();
                }
            }
        };
        ShowTime.prototype.trackHighlightLink = function() {
            var addTrackInfo, i, k, len1, link, ref;
            addTrackInfo = (function(_this) {
                return function(el) {
                    var attributes, isSmall, j, k, len1, ref, secondary, size, type;
                    isSmall = el.parentNode.className.indexOf('--small') >= 0;
                    size = isSmall ? 'pequeno' : 'grande';
                    attributes = ["clique", size, "posicao " + (i + 1)];
                    if (_this.hasClass(el, 'destaque-showtime-subject__link')) {
                        type = _this.hasClass(el, 'destaque-showtime__highlight-link--no-photo') ? 'sem foto' : 'com foto';
                        attributes = ["clique", size, type, "posicao " + (i + 1)];
                        ref = el.parentNode.querySelectorAll('.destaque-showtime-subject__related-link');
                        for (j = k = 0, len1 = ref.length; k < len1; j = ++k) {
                            secondary = ref[j];
                            secondary.setAttribute('data-track-click', attributes.concat("secundario " + (j + 1)).join(" | "));
                        }
                    }
                    el.setAttribute('data-track-click', attributes.join(" | "));
                };
            })(this);
            ref = this.highlightLinks;
            for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
                link = ref[i];
                addTrackInfo(link, i);
            }
        };
        ShowTime.prototype.trackSwipeInteraction = function(nextPage) {
            var dataClick, direction, el, element;
            direction = nextPage - this.currentPage;
            if (direction) {
                element = this.arrowRight;
                if (direction < 0) {
                    element = this.arrowLeft;
                }
                if (window.glb && window.glb.ElementTracker && jQuery) {
                    el = jQuery(element);
                    dataClick = el.data('track-click');
                    return window.glb.ElementTracker.push(el, {
                        label: dataClick,
                        noninteraction: true
                    });
                }
            }
        };
        ShowTime.prototype.updateMovingCards = function() {
            var current;
            current = this.IScrollInstance.currentPage.pageX;
            this.movingCards = [this.scrollCards[current - 1], this.scrollCards[current], this.scrollCards[current + 1]];
            return this.showImage();
        };
        ShowTime.prototype.showImage = function() {
            var card, el, k, l, len1, len2, ref, ref1, results, results1;
            if (this.isSmall()) {
                ref = this.movingCards;
                results = [];
                for (k = 0, len1 = ref.length; k < len1; k++) {
                    card = ref[k];
                    el = card.querySelector('.showtime__scroll-element');
                    if (!this.hasClass(el, 'visible')) {
                        results.push(el.className = el.className + " visible");
                    } else {
                        results.push(void 0);
                    }
                }
                return results;
            } else {
                ref1 = this.scrollCards;
                results1 = [];
                for (l = 0, len2 = ref1.length; l < len2; l++) {
                    card = ref1[l];
                    el = card.querySelector('.showtime__scroll-element');
                    results1.push(el.className = el.className + " visible");
                }
                return results1;
            }
        };
        ShowTime.prototype.setDotPage = function(n) {
            var dot, dots, i, k, len1, results;
            dots = this.dotsContainer.children;
            results = [];
            for (i = k = 0, len1 = dots.length; k < len1; i = ++k) {
                dot = dots[i];
                results.push(dot.className = n === i ? 'navigation-dot active gui-color-primary-bg' : 'navigation-dot');
            }
            return results;
        };
        ShowTime.prototype.createDots = function() {
            var el, num, slides;
            slides = this.originalSlidesLength;
            if (!this.isSmall()) {
                slides = this.originalMediumScreenSlides.length;
            }
            this.dotsContainer.innerHTML = '';
            if (slides > 1) {
                return this.dots = (function() {
                    var k, ref, results;
                    results = [];
                    for (num = k = 1, ref = slides; 1 <= ref ? k <= ref : k >= ref; num = 1 <= ref ? ++k : --k) {
                        el = document.createElement('li');
                        el.className = 'navigation-dot';
                        el.setAttribute('data-track-click', 'subpaginacao');
                        el.setAttribute('data-track-noninteraction', 'true');
                        results.push(this.dotsContainer.appendChild(el));
                    }
                    return results;
                }).call(this);
            }
        };
        ShowTime.prototype.resetTransform = function() {
            var el, k, len1, ref;
            ref = this.scrollCards;
            for (k = 0, len1 = ref.length; k < len1; k++) {
                el = ref[k];
                this.setStyle(el);
            }
            if (!this.isSmall()) {
                return this.setStyle(this.container, 0);
            }
        };
        ShowTime.prototype.setStyle = function(el) {
            var css;
            css = "";
            el.style["transform"] = css;
            return el.style["-webkit-transform"] = css;
        };
        ShowTime.prototype.animateSlides = function() {
            var el, k, len1, ref, results;
            ref = this.movingCards;
            results = [];
            for (k = 0, len1 = ref.length; k < len1; k++) {
                el = ref[k];
                results.push(this.setStyle(el));
            }
            return results;
        };
        ShowTime.prototype.beforeTransition = function() {
            return this.updateMovingCards();
        };
        return ShowTime;
    })();
}).call(this);
(function(window, document, Math) {
    var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    var utils = (function() {
        var me = {};
        var _elementStyle = document.createElement('div').style;
        var _vendor = (function() {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform, i = 0,
                l = vendors.length;
            for (; i < l; i++) {
                transform = vendors[i] + 'ransform';
                if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
            }
            return false;
        })();

        function _prefixStyle(style) {
            if (_vendor === false) return false;
            if (_vendor === '') return style;
            return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }
        me.getTime = Date.now || function getTime() {
            return new Date().getTime();
        };
        me.extend = function(target, obj) {
            for (var i in obj) {
                target[i] = obj[i];
            }
        };
        me.addEvent = function(el, type, fn, capture) {
            el.addEventListener(type, fn, !!capture);
        };
        me.removeEvent = function(el, type, fn, capture) {
            el.removeEventListener(type, fn, !!capture);
        };
        me.prefixPointerEvent = function(pointerEvent) {
            return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) : pointerEvent;
        };
        me.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
            var distance = current - start,
                speed = Math.abs(distance) / time,
                destination, duration;
            deceleration = deceleration === undefined ? 0.0006 : deceleration;
            destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
            duration = speed / deceleration;
            if (destination < lowerMargin) {
                destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
                distance = Math.abs(destination - current);
                duration = distance / speed;
            } else if (destination > 0) {
                destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
                distance = Math.abs(current) + destination;
                duration = distance / speed;
            }
            return {
                destination: Math.round(destination),
                duration: duration
            };
        };
        var _transform = _prefixStyle('transform');
        me.extend(me, {
            hasTransform: _transform !== false,
            hasPerspective: _prefixStyle('perspective') in _elementStyle,
            hasTouch: 'ontouchstart' in window,
            hasPointer: window.PointerEvent || window.MSPointerEvent,
            hasTransition: _prefixStyle('transition') in _elementStyle
        });
        me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));
        me.extend(me.style = {}, {
            transform: _transform,
            transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
            transitionDuration: _prefixStyle('transitionDuration'),
            transitionDelay: _prefixStyle('transitionDelay'),
            transformOrigin: _prefixStyle('transformOrigin')
        });
        me.hasClass = function(e, c) {
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
            return re.test(e.className);
        };
        me.addClass = function(e, c) {
            if (me.hasClass(e, c)) {
                return;
            }
            var newclass = e.className.split(' ');
            newclass.push(c);
            e.className = newclass.join(' ');
        };
        me.removeClass = function(e, c) {
            if (!me.hasClass(e, c)) {
                return;
            }
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
            e.className = e.className.replace(re, ' ');
        };
        me.offset = function(el) {
            var left = -el.offsetLeft,
                top = -el.offsetTop;
            while (el = el.offsetParent) {
                left -= el.offsetLeft;
                top -= el.offsetTop;
            }
            return {
                left: left,
                top: top
            };
        };
        me.preventDefaultException = function(el, exceptions) {
            for (var i in exceptions) {
                if (exceptions[i].test(el[i])) {
                    return true;
                }
            }
            return false;
        };
        me.extend(me.eventType = {}, {
            touchstart: 1,
            touchmove: 1,
            touchend: 1,
            mousedown: 2,
            mousemove: 2,
            mouseup: 2,
            pointerdown: 3,
            pointermove: 3,
            pointerup: 3,
            MSPointerDown: 3,
            MSPointerMove: 3,
            MSPointerUp: 3
        });
        me.extend(me.ease = {}, {
            quadratic: {
                style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fn: function(k) {
                    return k * (2 - k);
                }
            },
            circular: {
                style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
                fn: function(k) {
                    return Math.sqrt(1 - (--k * k));
                }
            },
            back: {
                style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fn: function(k) {
                    var b = 4;
                    return (k = k - 1) * k * ((b + 1) * k + b) + 1;
                }
            },
            bounce: {
                style: '',
                fn: function(k) {
                    if ((k /= 1) < (1 / 2.75)) {
                        return 7.5625 * k * k;
                    } else if (k < (2 / 2.75)) {
                        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                    } else if (k < (2.5 / 2.75)) {
                        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                    } else {
                        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                    }
                }
            },
            elastic: {
                style: '',
                fn: function(k) {
                    var f = 0.22,
                        e = 0.4;
                    if (k === 0) {
                        return 0;
                    }
                    if (k == 1) {
                        return 1;
                    }
                    return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
                }
            }
        });
        me.tap = function(e, eventName) {
            var ev = document.createEvent('Event');
            ev.initEvent(eventName, true, true);
            ev.pageX = e.pageX;
            ev.pageY = e.pageY;
            e.target.dispatchEvent(ev);
        };
        me.click = function(e) {
            var target = e.target,
                ev;
            if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
                ev = document.createEvent('MouseEvents');
                ev.initMouseEvent('click', true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                ev._constructed = true;
                target.dispatchEvent(ev);
            }
        };
        return me;
    })();

    function IScroll(el, options) {
        this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
        this.scroller = this.wrapper.children[0];
        this.scrollerStyle = this.scroller.style;
        this.options = {
            resizeScrollbars: true,
            mouseWheelSpeed: 20,
            snapThreshold: 0.334,
            startX: 0,
            startY: 0,
            scrollY: true,
            directionLockThreshold: 5,
            momentum: true,
            bounce: true,
            bounceTime: 600,
            bounceEasing: '',
            preventDefault: true,
            preventDefaultException: {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
            },
            HWCompositing: true,
            useTransition: true,
            useTransform: true
        };
        for (var i in options) {
            this.options[i] = options[i];
        }
        this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';
        this.options.useTransition = utils.hasTransition && this.options.useTransition;
        this.options.useTransform = utils.hasTransform && this.options.useTransform;
        this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
        this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
        this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
        this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;
        this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
        this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
        this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;
        this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
        if (this.options.tap === true) {
            this.options.tap = 'tap';
        }
        if (this.options.shrinkScrollbars == 'scale') {
            this.options.useTransition = false;
        }
        this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
        if (this.options.probeType == 3) {
            this.options.useTransition = false;
        }
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;
        this._events = {};
        this._init();
        this.refresh();
        this.scrollTo(this.options.startX, this.options.startY);
        this.enable();
    }
    IScroll.prototype = {
        version: '5.1.4-globo',
        _init: function() {
            this._initEvents();
            if (this.options.scrollbars || this.options.indicators) {
                this._initIndicators();
            }
            if (this.options.mouseWheel) {
                this._initWheel();
            }
            if (this.options.snap) {
                this._initSnap();
            }
            if (this.options.keyBindings) {
                this._initKeys();
            }
        },
        destroy: function() {
            this._initEvents(true);
            this._execEvent('destroy');
        },
        _transitionEnd: function(e) {
            if (e.target != this.scroller || !this.isInTransition) {
                return;
            }
            this._transitionTime();
            if (!this.resetPosition(this.options.bounceTime)) {
                this.isInTransition = false;
                this._execEvent('scrollEnd');
            }
        },
        _start: function(e) {
            if (utils.eventType[e.type] != 1) {
                if (e.button !== 0) {
                    return;
                }
            }
            if (!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
                return;
            }
            if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
                e.preventDefault();
            }
            var point = e.touches ? e.touches[0] : e,
                pos;
            this.initiated = utils.eventType[e.type];
            this.moved = false;
            this.distX = 0;
            this.distY = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.directionLocked = 0;
            this._transitionTime();
            this.startTime = utils.getTime();
            if (this.options.useTransition && this.isInTransition) {
                this.isInTransition = false;
                pos = this.getComputedPosition();
                this._translate(Math.round(pos.x), Math.round(pos.y));
                this._execEvent('scrollEnd');
            } else if (!this.options.useTransition && this.isAnimating) {
                this.isAnimating = false;
                this._execEvent('scrollEnd');
            }
            this.startX = this.x;
            this.startY = this.y;
            this.absStartX = this.x;
            this.absStartY = this.y;
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            this._execEvent('beforeScrollStart');
        },
        _move: function(e) {
            if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
                return;
            }
            if (this.options.preventDefault) {
                e.preventDefault();
            }
            var point = e.touches ? e.touches[0] : e,
                deltaX = point.pageX - this.pointX,
                deltaY = point.pageY - this.pointY,
                timestamp = utils.getTime(),
                newX, newY, absDistX, absDistY;
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            this.distX += deltaX;
            this.distY += deltaY;
            absDistX = Math.abs(this.distX);
            absDistY = Math.abs(this.distY);
            if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
                return;
            }
            if (!this.directionLocked && !this.options.freeScroll) {
                if (absDistX > absDistY + this.options.directionLockThreshold) {
                    this.directionLocked = 'h';
                } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
                    this.directionLocked = 'v';
                } else {
                    this.directionLocked = 'n';
                }
            }
            if (this.directionLocked == 'h') {
                if (this.options.eventPassthrough == 'vertical') {
                    e.preventDefault();
                } else if (this.options.eventPassthrough == 'horizontal') {
                    this.initiated = false;
                    return;
                }
                deltaY = 0;
            } else if (this.directionLocked == 'v') {
                if (this.options.eventPassthrough == 'horizontal') {
                    e.preventDefault();
                } else if (this.options.eventPassthrough == 'vertical') {
                    this.initiated = false;
                    return;
                }
                deltaX = 0;
            }
            deltaX = this.hasHorizontalScroll ? deltaX : 0;
            deltaY = this.hasVerticalScroll ? deltaY : 0;
            newX = this.x + deltaX;
            newY = this.y + deltaY;
            if (newX > 0 || newX < this.maxScrollX) {
                newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
            }
            if (newY > 0 || newY < this.maxScrollY) {
                newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
            }
            this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
            if (!this.moved) {
                this._execEvent('scrollStart');
            }
            this.moved = true;
            this._translate(newX, newY);
            if (timestamp - this.startTime > 300) {
                this.startTime = timestamp;
                this.startX = this.x;
                this.startY = this.y;
                if (this.options.probeType == 1) {
                    this._execEvent('scroll');
                }
            }
            if (this.options.probeType > 1) {
                this._execEvent('scroll');
            }
        },
        _end: function(e) {
            if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
                return;
            }
            if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
                e.preventDefault();
            }
            var point = e.changedTouches ? e.changedTouches[0] : e,
                momentumX, momentumY, duration = utils.getTime() - this.startTime,
                newX = Math.round(this.x),
                newY = Math.round(this.y),
                distanceX = Math.abs(newX - this.startX),
                distanceY = Math.abs(newY - this.startY),
                time = 0,
                easing = '';
            this.isInTransition = 0;
            this.initiated = 0;
            this.endTime = utils.getTime();
            if (this.resetPosition(this.options.bounceTime)) {
                return;
            }
            this.scrollTo(newX, newY);
            if (!this.moved) {
                if (this.options.tap) {
                    utils.tap(e, this.options.tap);
                }
                if (this.options.click) {
                    utils.click(e);
                }
                this._execEvent('scrollCancel');
                return;
            }
            if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
                this._execEvent('flick');
                return;
            }
            if (this.options.momentum && duration < 300) {
                momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                    destination: newX,
                    duration: 0
                };
                momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                    destination: newY,
                    duration: 0
                };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                this.isInTransition = 1;
            }
            if (this.options.snap) {
                var snap = this._nearestSnap(newX, newY);
                this.currentPage = snap;
                time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
                newX = snap.x;
                newY = snap.y;
                this.directionX = 0;
                this.directionY = 0;
                easing = this.options.bounceEasing;
            }
            if (newX != this.x || newY != this.y) {
                if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                    easing = utils.ease.quadratic;
                }
                this.scrollTo(newX, newY, time, easing);
                return;
            }
            this._execEvent('scrollEnd');
        },
        _resize: function() {
            var that = this;
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(function() {
                that.refresh();
            }, this.options.resizePolling);
        },
        resetPosition: function(time) {
            var x = this.x,
                y = this.y;
            time = time || 0;
            if (!this.hasHorizontalScroll || this.x > 0) {
                x = 0;
            } else if (this.x < this.maxScrollX) {
                x = this.maxScrollX;
            }
            if (!this.hasVerticalScroll || this.y > 0) {
                y = 0;
            } else if (this.y < this.maxScrollY) {
                y = this.maxScrollY;
            }
            if (x == this.x && y == this.y) {
                return false;
            }
            this.scrollTo(x, y, time, this.options.bounceEasing);
            return true;
        },
        disable: function() {
            this.enabled = false;
        },
        enable: function() {
            this.enabled = true;
        },
        refresh: function() {
            var rf = this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth;
            this.wrapperHeight = this.wrapper.clientHeight;
            this.scrollerWidth = this.scroller.offsetWidth;
            this.scrollerHeight = this.scroller.offsetHeight;
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
            this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
            if (!this.hasHorizontalScroll) {
                this.maxScrollX = 0;
                this.scrollerWidth = this.wrapperWidth;
            }
            if (!this.hasVerticalScroll) {
                this.maxScrollY = 0;
                this.scrollerHeight = this.wrapperHeight;
            }
            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.wrapperOffset = utils.offset(this.wrapper);
            this._execEvent('refresh');
            this.resetPosition();
        },
        on: function(type, fn) {
            if (!this._events[type]) {
                this._events[type] = [];
            }
            this._events[type].push(fn);
        },
        off: function(type, fn) {
            if (!this._events[type]) {
                return;
            }
            var index = this._events[type].indexOf(fn);
            if (index > -1) {
                this._events[type].splice(index, 1);
            }
        },
        _execEvent: function(type) {
            if (!this._events[type]) {
                return;
            }
            var i = 0,
                l = this._events[type].length;
            if (!l) {
                return;
            }
            for (; i < l; i++) {
                this._events[type][i].apply(this, [].slice.call(arguments, 1));
            }
        },
        scrollBy: function(x, y, time, easing) {
            x = this.x + x;
            y = this.y + y;
            time = time || 0;
            this.scrollTo(x, y, time, easing);
        },
        scrollTo: function(x, y, time, easing) {
            easing = easing || utils.ease.circular;
            this.isInTransition = this.options.useTransition && time > 0;
            if (!time || (this.options.useTransition && easing.style)) {
                this._transitionTimingFunction(easing.style);
                this._transitionTime(time);
                this._translate(x, y);
                if (time >= 0) {
                    this._execEvent('beforeTransition');
                }
            } else {
                this._animate(x, y, time, easing.fn);
            }
        },
        scrollToElement: function(el, time, offsetX, offsetY, easing) {
            el = el.nodeType ? el : this.scroller.querySelector(el);
            if (!el) {
                return;
            }
            var pos = utils.offset(el);
            pos.left -= this.wrapperOffset.left;
            pos.top -= this.wrapperOffset.top;
            if (offsetX === true) {
                offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
            }
            if (offsetY === true) {
                offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
            }
            pos.left -= offsetX || 0;
            pos.top -= offsetY || 0;
            pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
            pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;
            time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;
            this.scrollTo(pos.left, pos.top, time, easing);
        },
        _transitionTime: function(time) {
            time = time || 0;
            this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';
            if (!time && utils.isBadAndroid) {
                this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
            }
            if (this.indicators) {
                for (var i = this.indicators.length; i--;) {
                    this.indicators[i].transitionTime(time);
                }
            }
        },
        _transitionTimingFunction: function(easing) {
            this.scrollerStyle[utils.style.transitionTimingFunction] = easing;
            if (this.indicators) {
                for (var i = this.indicators.length; i--;) {
                    this.indicators[i].transitionTimingFunction(easing);
                }
            }
        },
        _translate: function(x, y) {
            if (this.options.useTransform) {
                this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;
            } else {
                x = Math.round(x);
                y = Math.round(y);
                this.scrollerStyle.left = x + 'px';
                this.scrollerStyle.top = y + 'px';
            }
            this.x = x;
            this.y = y;
            if (this.indicators) {
                for (var i = this.indicators.length; i--;) {
                    this.indicators[i].updatePosition();
                }
            }
        },
        _initEvents: function(remove) {
            var eventType = remove ? utils.removeEvent : utils.addEvent,
                target = this.options.bindToWrapper ? this.wrapper : window;
            eventType(window, 'orientationchange', this);
            eventType(window, 'resize', this);
            if (this.options.click) {
                eventType(this.wrapper, 'click', this, true);
            }
            if (!this.options.disableMouse) {
                eventType(this.wrapper, 'mousedown', this);
                eventType(target, 'mousemove', this);
                eventType(target, 'mousecancel', this);
                eventType(target, 'mouseup', this);
            }
            if (utils.hasPointer && !this.options.disablePointer) {
                eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
                eventType(target, utils.prefixPointerEvent('pointermove'), this);
                eventType(target, utils.prefixPointerEvent('pointercancel'), this);
                eventType(target, utils.prefixPointerEvent('pointerup'), this);
            }
            if (utils.hasTouch && !this.options.disableTouch) {
                eventType(this.wrapper, 'touchstart', this);
                eventType(target, 'touchmove', this);
                eventType(target, 'touchcancel', this);
                eventType(target, 'touchend', this);
            }
            eventType(this.scroller, 'transitionend', this);
            eventType(this.scroller, 'webkitTransitionEnd', this);
            eventType(this.scroller, 'oTransitionEnd', this);
            eventType(this.scroller, 'MSTransitionEnd', this);
        },
        getComputedPosition: function() {
            var matrix = window.getComputedStyle(this.scroller, null),
                x, y;
            if (this.options.useTransform) {
                matrix = matrix[utils.style.transform].split(')')[0].split(', ');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
            } else {
                x = +matrix.left.replace(/[^-\d.]/g, '');
                y = +matrix.top.replace(/[^-\d.]/g, '');
            }
            return {
                x: x,
                y: y
            };
        },
        _initIndicators: function() {
            var interactive = this.options.interactiveScrollbars,
                customStyle = typeof this.options.scrollbars != 'string',
                indicators = [],
                indicator;
            var that = this;
            this.indicators = [];
            if (this.options.scrollbars) {
                if (this.options.scrollY) {
                    indicator = {
                        el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
                        interactive: interactive,
                        defaultScrollbars: true,
                        customStyle: customStyle,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenX: false
                    };
                    this.wrapper.appendChild(indicator.el);
                    indicators.push(indicator);
                }
                if (this.options.scrollX) {
                    indicator = {
                        el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
                        interactive: interactive,
                        defaultScrollbars: true,
                        customStyle: customStyle,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenY: false
                    };
                    this.wrapper.appendChild(indicator.el);
                    indicators.push(indicator);
                }
            }
            if (this.options.indicators) {
                indicators = indicators.concat(this.options.indicators);
            }
            for (var i = indicators.length; i--;) {
                this.indicators.push(new Indicator(this, indicators[i]));
            }

            function _indicatorsMap(fn) {
                for (var i = that.indicators.length; i--;) {
                    fn.call(that.indicators[i]);
                }
            }
            if (this.options.fadeScrollbars) {
                this.on('scrollEnd', function() {
                    _indicatorsMap(function() {
                        this.fade();
                    });
                });
                this.on('scrollCancel', function() {
                    _indicatorsMap(function() {
                        this.fade();
                    });
                });
                this.on('scrollStart', function() {
                    _indicatorsMap(function() {
                        this.fade(1);
                    });
                });
                this.on('beforeScrollStart', function() {
                    _indicatorsMap(function() {
                        this.fade(1, true);
                    });
                });
            }
            this.on('refresh', function() {
                _indicatorsMap(function() {
                    this.refresh();
                });
            });
            this.on('destroy', function() {
                _indicatorsMap(function() {
                    this.destroy();
                });
                delete this.indicators;
            });
        },
        _initWheel: function() {
            utils.addEvent(this.wrapper, 'wheel', this);
            utils.addEvent(this.wrapper, 'mousewheel', this);
            utils.addEvent(this.wrapper, 'DOMMouseScroll', this);
            this.on('destroy', function() {
                utils.removeEvent(this.wrapper, 'wheel', this);
                utils.removeEvent(this.wrapper, 'mousewheel', this);
                utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
            });
        },
        _wheel: function(e) {
            if (!this.enabled) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            var wheelDeltaX, wheelDeltaY, newX, newY, that = this;
            if (this.wheelTimeout === undefined) {
                that._execEvent('scrollStart');
            }
            clearTimeout(this.wheelTimeout);
            this.wheelTimeout = setTimeout(function() {
                that._execEvent('scrollEnd');
                that.wheelTimeout = undefined;
            }, 400);
            if ('deltaX' in e) {
                if (e.deltaMode === 1) {
                    wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
                    wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
                } else {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                }
            } else if ('wheelDeltaX' in e) {
                wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
                wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
            } else if ('wheelDelta' in e) {
                wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
            } else if ('detail' in e) {
                wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
            } else {
                return;
            }
            wheelDeltaX *= this.options.invertWheelDirection;
            wheelDeltaY *= this.options.invertWheelDirection;
            if (!this.hasVerticalScroll) {
                wheelDeltaX = wheelDeltaY;
                wheelDeltaY = 0;
            }
            if (this.options.snap) {
                newX = this.currentPage.pageX;
                newY = this.currentPage.pageY;
                if (wheelDeltaX > 0) {
                    newX--;
                } else if (wheelDeltaX < 0) {
                    newX++;
                }
                if (wheelDeltaY > 0) {
                    newY--;
                } else if (wheelDeltaY < 0) {
                    newY++;
                }
                this.goToPage(newX, newY);
                return;
            }
            newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
            newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);
            if (newX > 0) {
                newX = 0;
            } else if (newX < this.maxScrollX) {
                newX = this.maxScrollX;
            }
            if (newY > 0) {
                newY = 0;
            } else if (newY < this.maxScrollY) {
                newY = this.maxScrollY;
            }
            this.scrollTo(newX, newY, 0);
            if (this.options.probeType > 1) {
                this._execEvent('scroll');
            }
        },
        _initSnap: function() {
            this.currentPage = {};
            if (typeof this.options.snap == 'string') {
                this.options.snap = this.scroller.querySelectorAll(this.options.snap);
            }
            this.on('refresh', function() {
                var i = 0,
                    l, m = 0,
                    n, cx, cy, x = 0,
                    y, stepX = this.options.snapStepX || this.wrapperWidth,
                    stepY = this.options.snapStepY || this.wrapperHeight,
                    el;
                this.pages = [];
                if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
                    return;
                }
                if (this.options.snap === true) {
                    cx = Math.round(stepX / 2);
                    cy = Math.round(stepY / 2);
                    while (x > -this.scrollerWidth) {
                        this.pages[i] = [];
                        l = 0;
                        y = 0;
                        while (y > -this.scrollerHeight) {
                            this.pages[i][l] = {
                                x: Math.max(x, this.maxScrollX),
                                y: Math.max(y, this.maxScrollY),
                                width: stepX,
                                height: stepY,
                                cx: x - cx,
                                cy: y - cy
                            };
                            y -= stepY;
                            l++;
                        }
                        x -= stepX;
                        i++;
                    }
                } else {
                    el = this.options.snap;
                    l = el.length;
                    n = -1;
                    for (; i < l; i++) {
                        if (i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) {
                            m = 0;
                            n++;
                        }
                        if (!this.pages[m]) {
                            this.pages[m] = [];
                        }
                        x = Math.max(-el[i].offsetLeft, this.maxScrollX);
                        y = Math.max(-el[i].offsetTop, this.maxScrollY);
                        cx = x - Math.round(el[i].offsetWidth / 2);
                        cy = y - Math.round(el[i].offsetHeight / 2);
                        this.pages[m][n] = {
                            x: x,
                            y: y,
                            width: el[i].offsetWidth,
                            height: el[i].offsetHeight,
                            cx: cx,
                            cy: cy
                        };
                        if (x > this.maxScrollX) {
                            m++;
                        }
                    }
                }
                this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
                if (this.options.snapThreshold % 1 === 0) {
                    this.snapThresholdX = this.options.snapThreshold;
                    this.snapThresholdY = this.options.snapThreshold;
                } else {
                    this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
                    this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
                }
            });
            this.on('flick', function() {
                var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time);
            });
        },
        _nearestSnap: function(x, y) {
            if (!this.pages.length) {
                return {
                    x: 0,
                    y: 0,
                    pageX: 0,
                    pageY: 0
                };
            }
            var i = 0,
                l = this.pages.length,
                m = 0;
            if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
                return this.currentPage;
            }
            if (x > 0) {
                x = 0;
            } else if (x < this.maxScrollX) {
                x = this.maxScrollX;
            }
            if (y > 0) {
                y = 0;
            } else if (y < this.maxScrollY) {
                y = this.maxScrollY;
            }
            for (; i < l; i++) {
                if (x >= this.pages[i][0].cx) {
                    x = this.pages[i][0].x;
                    break;
                }
            }
            l = this.pages[i].length;
            for (; m < l; m++) {
                if (y >= this.pages[0][m].cy) {
                    y = this.pages[0][m].y;
                    break;
                }
            }
            if (i == this.currentPage.pageX) {
                i += this.directionX;
                if (i < 0) {
                    i = 0;
                } else if (i >= this.pages.length) {
                    i = this.pages.length - 1;
                }
                x = this.pages[i][0].x;
            }
            if (m == this.currentPage.pageY) {
                m += this.directionY;
                if (m < 0) {
                    m = 0;
                } else if (m >= this.pages[0].length) {
                    m = this.pages[0].length - 1;
                }
                y = this.pages[0][m].y;
            }
            return {
                x: x,
                y: y,
                pageX: i,
                pageY: m
            };
        },
        goToPage: function(x, y, time, easing) {
            easing = easing || this.options.bounceEasing;
            if (x >= this.pages.length) {
                x = this.pages.length - 1;
            } else if (x < 0) {
                x = 0;
            }
            if (y >= this.pages[x].length) {
                y = this.pages[x].length - 1;
            } else if (y < 0) {
                y = 0;
            }
            var posX = this.pages[x][y].x,
                posY = this.pages[x][y].y;
            time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;
            this.currentPage = {
                x: posX,
                y: posY,
                pageX: x,
                pageY: y
            };
            this.scrollTo(posX, posY, time, easing);
        },
        next: function(time, easing) {
            var x = this.currentPage.pageX,
                y = this.currentPage.pageY;
            x++;
            if (x >= this.pages.length && this.hasVerticalScroll) {
                x = 0;
                y++;
            }
            this.goToPage(x, y, time, easing);
        },
        prev: function(time, easing) {
            var x = this.currentPage.pageX,
                y = this.currentPage.pageY;
            x--;
            if (x < 0 && this.hasVerticalScroll) {
                x = 0;
                y--;
            }
            this.goToPage(x, y, time, easing);
        },
        _initKeys: function(e) {
            var keys = {
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
            var i;
            if (typeof this.options.keyBindings == 'object') {
                for (i in this.options.keyBindings) {
                    if (typeof this.options.keyBindings[i] == 'string') {
                        this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
                    }
                }
            } else {
                this.options.keyBindings = {};
            }
            for (i in keys) {
                this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
            }
            utils.addEvent(window, 'keydown', this);
            this.on('destroy', function() {
                utils.removeEvent(window, 'keydown', this);
            });
        },
        _key: function(e) {
            if (!this.enabled) {
                return;
            }
            var snap = this.options.snap,
                newX = snap ? this.currentPage.pageX : this.x,
                newY = snap ? this.currentPage.pageY : this.y,
                now = utils.getTime(),
                prevTime = this.keyTime || 0,
                acceleration = 0.250,
                pos;
            if (this.options.useTransition && this.isInTransition) {
                pos = this.getComputedPosition();
                this._translate(Math.round(pos.x), Math.round(pos.y));
                this.isInTransition = false;
            }
            this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;
            switch (e.keyCode) {
                case this.options.keyBindings.pageUp:
                    if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
                        newX += snap ? 1 : this.wrapperWidth;
                    } else {
                        newY += snap ? 1 : this.wrapperHeight;
                    }
                    break;
                case this.options.keyBindings.pageDown:
                    if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
                        newX -= snap ? 1 : this.wrapperWidth;
                    } else {
                        newY -= snap ? 1 : this.wrapperHeight;
                    }
                    break;
                case this.options.keyBindings.end:
                    newX = snap ? this.pages.length - 1 : this.maxScrollX;
                    newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
                    break;
                case this.options.keyBindings.home:
                    newX = 0;
                    newY = 0;
                    break;
                case this.options.keyBindings.left:
                    newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.up:
                    newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.right:
                    newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.down:
                    newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                default:
                    return;
            }
            if (snap) {
                this.goToPage(newX, newY);
                return;
            }
            if (newX > 0) {
                newX = 0;
                this.keyAcceleration = 0;
            } else if (newX < this.maxScrollX) {
                newX = this.maxScrollX;
                this.keyAcceleration = 0;
            }
            if (newY > 0) {
                newY = 0;
                this.keyAcceleration = 0;
            } else if (newY < this.maxScrollY) {
                newY = this.maxScrollY;
                this.keyAcceleration = 0;
            }
            this.scrollTo(newX, newY, 0);
            this.keyTime = now;
        },
        _animate: function(destX, destY, duration, easingFn) {
            var that = this,
                startX = this.x,
                startY = this.y,
                startTime = utils.getTime(),
                destTime = startTime + duration;

            function step() {
                var now = utils.getTime(),
                    newX, newY, easing;
                if (now >= destTime) {
                    that.isAnimating = false;
                    that._translate(destX, destY);
                    if (!that.resetPosition(that.options.bounceTime)) {
                        that._execEvent('scrollEnd');
                    }
                    return;
                }
                now = (now - startTime) / duration;
                easing = easingFn(now);
                newX = (destX - startX) * easing + startX;
                newY = (destY - startY) * easing + startY;
                that._translate(newX, newY);
                if (that.isAnimating) {
                    rAF(step);
                }
                if (that.options.probeType == 3) {
                    that._execEvent('scroll');
                }
            }
            this.isAnimating = true;
            step();
        },
        handleEvent: function(e) {
            switch (e.type) {
                case 'touchstart':
                case 'pointerdown':
                case 'MSPointerDown':
                case 'mousedown':
                    this._start(e);
                    break;
                case 'touchmove':
                case 'pointermove':
                case 'MSPointerMove':
                case 'mousemove':
                    this._move(e);
                    break;
                case 'touchend':
                case 'pointerup':
                case 'MSPointerUp':
                case 'mouseup':
                case 'touchcancel':
                case 'pointercancel':
                case 'MSPointerCancel':
                case 'mousecancel':
                    this._end(e);
                    break;
                case 'orientationchange':
                case 'resize':
                    this._resize();
                    break;
                case 'transitionend':
                case 'webkitTransitionEnd':
                case 'oTransitionEnd':
                case 'MSTransitionEnd':
                    this._transitionEnd(e);
                    break;
                case 'wheel':
                case 'DOMMouseScroll':
                case 'mousewheel':
                    this._wheel(e);
                    break;
                case 'keydown':
                    this._key(e);
                    break;
                case 'click':
                    if (!e._constructed) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    break;
            }
        }
    };

    function createDefaultScrollbar(direction, interactive, type) {
        var scrollbar = document.createElement('div'),
            indicator = document.createElement('div');
        if (type === true) {
            scrollbar.style.cssText = 'position:absolute;z-index:9999';
            indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
        }
        indicator.className = 'iScrollIndicator';
        if (direction == 'h') {
            if (type === true) {
                scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
                indicator.style.height = '100%';
            }
            scrollbar.className = 'iScrollHorizontalScrollbar';
        } else {
            if (type === true) {
                scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
                indicator.style.width = '100%';
            }
            scrollbar.className = 'iScrollVerticalScrollbar';
        }
        scrollbar.style.cssText += ';overflow:hidden';
        if (!interactive) {
            scrollbar.style.pointerEvents = 'none';
        }
        scrollbar.appendChild(indicator);
        return scrollbar;
    }

    function Indicator(scroller, options) {
        this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
        this.wrapperStyle = this.wrapper.style;
        this.indicator = this.wrapper.children[0];
        this.indicatorStyle = this.indicator.style;
        this.scroller = scroller;
        this.options = {
            listenX: true,
            listenY: true,
            interactive: false,
            resize: true,
            defaultScrollbars: false,
            shrink: false,
            fade: false,
            speedRatioX: 0,
            speedRatioY: 0
        };
        for (var i in options) {
            this.options[i] = options[i];
        }
        this.sizeRatioX = 1;
        this.sizeRatioY = 1;
        this.maxPosX = 0;
        this.maxPosY = 0;
        if (this.options.interactive) {
            if (!this.options.disableTouch) {
                utils.addEvent(this.indicator, 'touchstart', this);
                utils.addEvent(window, 'touchend', this);
            }
            if (!this.options.disablePointer) {
                utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
                utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
            }
            if (!this.options.disableMouse) {
                utils.addEvent(this.indicator, 'mousedown', this);
                utils.addEvent(window, 'mouseup', this);
            }
        }
        if (this.options.fade) {
            this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
            this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
            this.wrapperStyle.opacity = '0';
        }
    }
    Indicator.prototype = {
        handleEvent: function(e) {
            switch (e.type) {
                case 'touchstart':
                case 'pointerdown':
                case 'MSPointerDown':
                case 'mousedown':
                    this._start(e);
                    break;
                case 'touchmove':
                case 'pointermove':
                case 'MSPointerMove':
                case 'mousemove':
                    this._move(e);
                    break;
                case 'touchend':
                case 'pointerup':
                case 'MSPointerUp':
                case 'mouseup':
                case 'touchcancel':
                case 'pointercancel':
                case 'MSPointerCancel':
                case 'mousecancel':
                    this._end(e);
                    break;
            }
        },
        destroy: function() {
            if (this.options.interactive) {
                utils.removeEvent(this.indicator, 'touchstart', this);
                utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
                utils.removeEvent(this.indicator, 'mousedown', this);
                utils.removeEvent(window, 'touchmove', this);
                utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
                utils.removeEvent(window, 'mousemove', this);
                utils.removeEvent(window, 'touchend', this);
                utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
                utils.removeEvent(window, 'mouseup', this);
            }
            if (this.options.defaultScrollbars) {
                this.wrapper.parentNode.removeChild(this.wrapper);
            }
        },
        _start: function(e) {
            var point = e.touches ? e.touches[0] : e;
            e.preventDefault();
            e.stopPropagation();
            this.transitionTime();
            this.initiated = true;
            this.moved = false;
            this.lastPointX = point.pageX;
            this.lastPointY = point.pageY;
            this.startTime = utils.getTime();
            if (!this.options.disableTouch) {
                utils.addEvent(window, 'touchmove', this);
            }
            if (!this.options.disablePointer) {
                utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
            }
            if (!this.options.disableMouse) {
                utils.addEvent(window, 'mousemove', this);
            }
            this.scroller._execEvent('beforeScrollStart');
        },
        _move: function(e) {
            var point = e.touches ? e.touches[0] : e,
                deltaX, deltaY, newX, newY, timestamp = utils.getTime();
            if (!this.moved) {
                this.scroller._execEvent('scrollStart');
            }
            this.moved = true;
            deltaX = point.pageX - this.lastPointX;
            this.lastPointX = point.pageX;
            deltaY = point.pageY - this.lastPointY;
            this.lastPointY = point.pageY;
            newX = this.x + deltaX;
            newY = this.y + deltaY;
            this._pos(newX, newY);
            if (this.scroller.options.probeType == 1 && timestamp - this.startTime > 300) {
                this.startTime = timestamp;
                this.scroller._execEvent('scroll');
            } else if (this.scroller.options.probeType > 1) {
                this.scroller._execEvent('scroll');
            }
            e.preventDefault();
            e.stopPropagation();
        },
        _end: function(e) {
            if (!this.initiated) {
                return;
            }
            this.initiated = false;
            e.preventDefault();
            e.stopPropagation();
            utils.removeEvent(window, 'touchmove', this);
            utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
            utils.removeEvent(window, 'mousemove', this);
            if (this.scroller.options.snap) {
                var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);
                var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - snap.x), 1000), Math.min(Math.abs(this.scroller.y - snap.y), 1000)), 300);
                if (this.scroller.x != snap.x || this.scroller.y != snap.y) {
                    this.scroller.directionX = 0;
                    this.scroller.directionY = 0;
                    this.scroller.currentPage = snap;
                    this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
                }
            }
            if (this.moved) {
                this.scroller._execEvent('scrollEnd');
            }
        },
        transitionTime: function(time) {
            time = time || 0;
            this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';
            if (!time && utils.isBadAndroid) {
                this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
            }
        },
        transitionTimingFunction: function(easing) {
            this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
        },
        refresh: function() {
            this.transitionTime();
            if (this.options.listenX && !this.options.listenY) {
                this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
            } else if (this.options.listenY && !this.options.listenX) {
                this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
            } else {
                this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
            }
            if (this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll) {
                utils.addClass(this.wrapper, 'iScrollBothScrollbars');
                utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');
                if (this.options.defaultScrollbars && this.options.customStyle) {
                    if (this.options.listenX) {
                        this.wrapper.style.right = '8px';
                    } else {
                        this.wrapper.style.bottom = '8px';
                    }
                }
            } else {
                utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
                utils.addClass(this.wrapper, 'iScrollLoneScrollbar');
                if (this.options.defaultScrollbars && this.options.customStyle) {
                    if (this.options.listenX) {
                        this.wrapper.style.right = '2px';
                    } else {
                        this.wrapper.style.bottom = '2px';
                    }
                }
            }
            var r = this.wrapper.offsetHeight;
            if (this.options.listenX) {
                this.wrapperWidth = this.wrapper.clientWidth;
                if (this.options.resize) {
                    this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
                    this.indicatorStyle.width = this.indicatorWidth + 'px';
                } else {
                    this.indicatorWidth = this.indicator.clientWidth;
                }
                this.maxPosX = this.wrapperWidth - this.indicatorWidth;
                if (this.options.shrink == 'clip') {
                    this.minBoundaryX = -this.indicatorWidth + 8;
                    this.maxBoundaryX = this.wrapperWidth - 8;
                } else {
                    this.minBoundaryX = 0;
                    this.maxBoundaryX = this.maxPosX;
                }
                this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
            }
            if (this.options.listenY) {
                this.wrapperHeight = this.wrapper.clientHeight;
                if (this.options.resize) {
                    this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
                    this.indicatorStyle.height = this.indicatorHeight + 'px';
                } else {
                    this.indicatorHeight = this.indicator.clientHeight;
                }
                this.maxPosY = this.wrapperHeight - this.indicatorHeight;
                if (this.options.shrink == 'clip') {
                    this.minBoundaryY = -this.indicatorHeight + 8;
                    this.maxBoundaryY = this.wrapperHeight - 8;
                } else {
                    this.minBoundaryY = 0;
                    this.maxBoundaryY = this.maxPosY;
                }
                this.maxPosY = this.wrapperHeight - this.indicatorHeight;
                this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
            }
            this.updatePosition();
        },
        updatePosition: function() {
            var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
                y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
            if (!this.options.ignoreBoundaries) {
                if (x < this.minBoundaryX) {
                    if (this.options.shrink == 'scale') {
                        this.width = Math.max(this.indicatorWidth + x, 8);
                        this.indicatorStyle.width = this.width + 'px';
                    }
                    x = this.minBoundaryX;
                } else if (x > this.maxBoundaryX) {
                    if (this.options.shrink == 'scale') {
                        this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
                        this.indicatorStyle.width = this.width + 'px';
                        x = this.maxPosX + this.indicatorWidth - this.width;
                    } else {
                        x = this.maxBoundaryX;
                    }
                } else if (this.options.shrink == 'scale' && this.width != this.indicatorWidth) {
                    this.width = this.indicatorWidth;
                    this.indicatorStyle.width = this.width + 'px';
                }
                if (y < this.minBoundaryY) {
                    if (this.options.shrink == 'scale') {
                        this.height = Math.max(this.indicatorHeight + y * 3, 8);
                        this.indicatorStyle.height = this.height + 'px';
                    }
                    y = this.minBoundaryY;
                } else if (y > this.maxBoundaryY) {
                    if (this.options.shrink == 'scale') {
                        this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
                        this.indicatorStyle.height = this.height + 'px';
                        y = this.maxPosY + this.indicatorHeight - this.height;
                    } else {
                        y = this.maxBoundaryY;
                    }
                } else if (this.options.shrink == 'scale' && this.height != this.indicatorHeight) {
                    this.height = this.indicatorHeight;
                    this.indicatorStyle.height = this.height + 'px';
                }
            }
            this.x = x;
            this.y = y;
            if (this.scroller.options.useTransform) {
                this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
            } else {
                this.indicatorStyle.left = x + 'px';
                this.indicatorStyle.top = y + 'px';
            }
        },
        _pos: function(x, y) {
            if (x < 0) {
                x = 0;
            } else if (x > this.maxPosX) {
                x = this.maxPosX;
            }
            if (y < 0) {
                y = 0;
            } else if (y > this.maxPosY) {
                y = this.maxPosY;
            }
            x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
            y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;
            this.scroller.scrollTo(x, y);
        },
        fade: function(val, hold) {
            if (hold && !this.visible) {
                return;
            }
            clearTimeout(this.fadeTimeout);
            this.fadeTimeout = null;
            var time = val ? 250 : 500,
                delay = val ? 0 : 300;
            val = val ? '1' : '0';
            this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';
            this.fadeTimeout = setTimeout((function(val) {
                this.wrapperStyle.opacity = val;
                this.visible = +val;
            }).bind(this, val), delay);
        }
    };
    IScroll.utils = utils;
    if (typeof module != 'undefined' && module.exports) {
        module.exports = IScroll;
    } else {
        window.IScroll = IScroll;
    }
})(window, document, Math);
window.matchMedia || (window.matchMedia = function() {
    "use strict";
    var styleMedia = (window.styleMedia || window.media);
    if (!styleMedia) {
        var style = document.createElement('style'),
            script = document.getElementsByTagName('script')[0],
            info = null;
        style.type = 'text/css';
        style.id = 'matchmediajs-test';
        script.parentNode.insertBefore(style, script);
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;
        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }
                return info.width === '1px';
            }
        };
    }
    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
(function() {
    var ShowTimeAssunto, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    ShowTimeAssunto = (function() {
        function ShowTimeAssunto() {
            this.preventBgZoom = bind(this.preventBgZoom, this);
            this.handleHover = bind(this.handleHover, this);
            var i, len, ref, slide;
            this.slides = document.querySelectorAll('.destaque-showtime-subject');
            ref = this.slides;
            for (i = 0, len = ref.length; i < len; i++) {
                slide = ref[i];
                this.init(slide);
            }
        }
        ShowTimeAssunto.prototype.init = function(slide) {
            this.slide = slide;
            this.relatedList = this.slide.querySelectorAll('.destaque-showtime-subject__related--has-photo');
            if (this.relatedList.length) {
                this.fixTitlePosition();
                if (document.documentElement.classList) {
                    this.bindEvents();
                }
            } else {
                this.fixTitlePositionWithoutRelatedList();
            }
        };
        ShowTimeAssunto.prototype.bindEvents = function() {
            var i, j, len, len1, ref, ref1, relatedEl, relatedList;
            ref = this.relatedList;
            for (i = 0, len = ref.length; i < len; i++) {
                relatedList = ref[i];
                ref1 = relatedList.children;
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                    relatedEl = ref1[j];
                    relatedEl.removeEventListener('mouseenter', this.handleHover);
                    relatedEl.addEventListener('mouseenter', this.handleHover);
                    relatedEl.removeEventListener('mouseleave', this.handleHover);
                    relatedEl.addEventListener('mouseleave', this.handleHover);
                }
            }
        };
        ShowTimeAssunto.prototype.handleHover = function(ev) {
            var el, prevent;
            el = ev.currentTarget;
            prevent = ev.type === 'mouseenter';
            while (el && !el.classList.contains('destaque-showtime__highlight-container--has-bg-zoom')) {
                el = el.parentElement;
            }
            if (el) {
                return this.preventBgZoom(el, prevent);
            }
        };
        ShowTimeAssunto.prototype.preventBgZoom = function(el, prevent) {
            if (prevent == null) {
                prevent = true;
            }
            el.classList.toggle('js-prevent-bg-zoom', prevent);
        };
        ShowTimeAssunto.prototype.fixTitlePositionWithoutRelatedList = function() {
            var i, len, title, titleList;
            titleList = this.slide.querySelectorAll('.destaque-showtime-mini-uber .destaque-showtime__highlight-title');
            for (i = 0, len = titleList.length; i < len; i++) {
                title = titleList[i];
                title.style['visibility'] = 'visible';
                title.classList.add('destaque-showtime__highlight-title--without-related');
            }
        };
        ShowTimeAssunto.prototype.fixTitlePosition = function() {
            var i, j, len, len1, list, listStyle, outerHeight, prop, ref, ref1, titleEl;
            ref = this.relatedList;
            for (i = 0, len = ref.length; i < len; i++) {
                list = ref[i];
                listStyle = getComputedStyle(list);
                outerHeight = list.offsetHeight;
                ref1 = ['margin-top', 'margin-bottom'];
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                    prop = ref1[j];
                    outerHeight += parseInt(listStyle[prop], 10);
                }
                titleEl = list.parentNode.querySelector('.destaque-showtime__highlight-title');
                if (titleEl) {
                    titleEl.style['margin-bottom'] = outerHeight + "px";
                }
                list.style['visibility'] = 'visible';
                titleEl.style['visibility'] = 'visible';
            }
        };
        return ShowTimeAssunto;
    })();
    window.glb = window.glb || {};
    window.glb.showTimeEvents = window.glb.showTimeEvents || [];
    window.glb.showTimeEvents.push(function() {
        return document.querySelector('.showtime').addEventListener('before-clone-build', function() {
            return new ShowTimeAssunto();
        });
    });
}).call(this);