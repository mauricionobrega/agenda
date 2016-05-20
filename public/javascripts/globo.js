(function($) {
    $(document).ready(function() {
        glb.runner.run();
        Modernizr.load([{
            load: ['http://s.glbimg.com/bu/c/busca.padrao.suggest.css', 'http://s.glbimg.com/bu/j/jquery.buscaPadrao-v2.js'],
            complete: function() {
                var $busca = $('#busca-padrao');
                $busca.buscaPadrao({
                    'url': 'http://g1.globo.com/busca',
                    'produto': 'g1',
                    'suggest_ligado': true,
                    'site': 'G1',
                    'section': ''
                });
            }
        }]);
        $(".nano").nanoScroller({
            paneClass: 'pane',
            contentClass: 'content',
            sliderClass: 'slider',
            preventPageScrolling: true,
            alwaysVisible: true
        });
    });
}(jQuery));
! function(a, b) {
    "use strict";
    var c = b(a);
    a._gaq = a._gaq || [], a.glb = a.glb || {}, a.glb.ElementTracker = a.glb.ElementTracker || function() {
        function d() {
            return g(), h(), i(), this
        }

        function e() {
            b("body").off(".event-tracker"), b(a).off(".event-tracker")
        }

        function f() {
            return x
        }

        function g() {
            b("body").on("click.event-tracker", "[data-track-click]", function() {
                return o(b(this)), !0
            })
        }

        function h() {
            j(), k(), l()
        }

        function i() {
            b("body").on("click.event-tracker", "[data-track-links]", function(a) {
                "A" === a.target.tagName && q(b(a.target))
            })
        }

        function j() {
            var a, c, d = b("[data-track-scroll]");
            for (a = 0; a < d.length; a++) c = d.eq(a), x.scrollTrackItems.push(c)
        }

        function k() {
            c.on("scroll.event-tracker", function() {
                m()
            })
        }

        function l() {
            var a = t();
            n(a)
        }

        function m() {
            w && (w = !1, setTimeout(function() {
                var a = t();
                n(a), w = !0
            }, 150))
        }

        function n(a) {
            var b, c, d, e, f = [];
            for (e = 0; e < x.scrollTrackItems.length; e++) b = x.scrollTrackItems[e], c = b.offset().top, d = a > c + v, d ? p(b) : f.push(b);
            x.scrollTrackItems = f
        }

        function o(a) {
            var b = a.data("track-click");
            r(a, {
                label: b
            })
        }

        function p(a) {
            var b = a.data("track-scroll");
            r(a, {
                label: b
            })
        }

        function q(a) {
            var b = {
                action: a.text(),
                label: a.attr("href")
            };
            r(a, b)
        }

        function r(c, d) {
            d = d || {}, b.each(["category", "action", "value", "noninteraction"], function(a, b) {
                var e;
                d[b] || (e = u(c, b), d[b] = e || y[b])
            }), a._gaq.push(["_trackEvent", d.category, d.action, d.label, d.value, d.noninteraction])
        }

        function s() {
            return c.scrollTop.apply(c, arguments)
        }

        function t() {
            return s() + c.height()
        }

        function u(a, b) {
            var c = a.closest("[data-track-" + b + "]");
            return c.data("track-" + b)
        }
        var v = 30,
            w = !0,
            x = {
                scrollTrackItems: []
            },
            y = {
                value: 0,
                noninteraction: !1
            };
        return {
            init: d,
            destroy: e,
            initClicks: g,
            initScroll: h,
            initLinks: i,
            push: r,
            pushClick: o,
            pushScroll: p,
            pushLink: q,
            getInfo: f,
            removeElementsVisualized: n
        }
    }().init()
}(this, jQuery);
(function(window) {
    var document = window.document,
        areatemplate_direita, class_areatemplate_direita = 'areatemplate-direita',
        sufix_floating_wrapper = '__floating',
        sufix_floating_marker = '__marker',
        seletor_header = '#glb-topo .floating-bar',
        class_fixed = 'fixed',
        animateTimeout = null;
    if (document.querySelector) {
        var areatemplate_direita_base = document.querySelector('.' + class_areatemplate_direita),
            areatemplate_direita_marker = document.createElement('div');
        areatemplate_direita = document.createElement('div');
        areatemplate_direita.classList.add(class_areatemplate_direita + sufix_floating_wrapper);
        areatemplate_direita_marker.classList.add(class_areatemplate_direita + sufix_floating_marker);
        while (areatemplate_direita_base.childNodes.length) {
            areatemplate_direita.appendChild(areatemplate_direita_base.firstChild);
        }
        areatemplate_direita_base.appendChild(areatemplate_direita_marker);
        areatemplate_direita_base.appendChild(areatemplate_direita);
    }

    function getScrollTop() {
        var chromeScrollTop = document.body.scrollTop,
            ieScrollTop = document.documentElement.scrollTop;
        if (chromeScrollTop > ieScrollTop) {
            return chromeScrollTop;
        } else {
            return ieScrollTop;
        }
    }
    if (areatemplate_direita && areatemplate_direita.getBoundingClientRect && areatemplate_direita.classList && areatemplate_direita.previousSibling && areatemplate_direita.parentElement && areatemplate_direita.parentElement.previousElementSibling) {
        var header = document.querySelector(seletor_header),
            currentScrollTop = getScrollTop(),
            lastScrollPosition, bodyRects, targetRects, baseRects, previousRects, captureAction, headerHeight, distance, content, updateRects = function() {
                headerHeight = header ? (header.getBoundingClientRect().height + (2.5 * 16)) : 0;
                lastScrollPosition = currentScrollTop;
                currentScrollTop = getScrollTop();
                bodyRects = document.body.getBoundingClientRect();
                targetRects = areatemplate_direita.getBoundingClientRect();
                contentRects = areatemplate_direita.parentElement.previousElementSibling.getBoundingClientRect();
                baseRects = areatemplate_direita.parentElement.parentElement.getBoundingClientRect();
                previousRects = areatemplate_direita.previousElementSibling.getBoundingClientRect();
            },
            calcDistance = function(rising) {
                if (isRising()) {
                    return Math.abs(previousRects.bottom +
                        targetRects.height -
                        bodyRects.height);
                } else {
                    return Math.abs(previousRects.bottom -
                        targetRects.top);
                }
            },
            isTargetEndBeforeContentEnd = function() {
                return targetRects.bottom < contentRects.bottom;
            },
            isContentBiggerThanTarget = function() {
                return contentRects.height > targetRects.height;
            },
            isFixed = function() {
                return areatemplate_direita.classList.contains(class_fixed);
            },
            isRising = function() {
                return parseInt(currentScrollTop, 10) < parseInt(lastScrollPosition, 10);
            },
            isDistantOfPreviousElement = function() {
                return parseInt(targetRects.top, 10) > parseInt(previousRects.bottom, 10);
            },
            isAreaEnd = function() {
                return parseInt(baseRects.bottom, 10) <= parseInt(bodyRects.height, 10);
            },
            isTargetTopVisible = function() {
                return parseInt(targetRects.top, 10) >= parseInt(headerHeight, 10);
            },
            isTargetBottomVisible = function() {
                return parseInt(targetRects.bottom, 10) <= parseInt(bodyRects.height, 10);
            },
            shouldLockAtTop = function() {
                return isDistantOfPreviousElement() && isTargetTopVisible();
            },
            shouldLockAtBottom = function() {
                return !isAreaEnd() && isTargetBottomVisible() && isTargetEndBeforeContentEnd();
            },
            preLock = function() {
                areatemplate_direita.style.width = previousRects.width + 'px';
                areatemplate_direita.classList.add(class_fixed);
            },
            finishLock = function() {
                areatemplate_direita.style.marginTop = 'auto';
                areatemplate_direita.style.bottom = '0';
                areatemplate_direita.style.top = 'auto';
            },
            lockAtTop = function() {
                preLock();
                areatemplate_direita.style.marginTop = 'auto';
                areatemplate_direita.style.top = headerHeight + 'px';
                areatemplate_direita.style.bottom = 'auto';
            },
            startAnimate = function() {
                var to_animate = parseInt(targetRects.bottom, 10),
                    frame = Math.floor(to_animate / 10);
                animate = function() {
                    if (isTargetEndBeforeContentEnd() && to_animate > 0 && Math.abs(baseRects.bottom - targetRects.bottom) > frame) {
                        areatemplate_direita.style.bottom = to_animate + 'px';
                        to_animate = to_animate - frame;
                        animateTimeout = window.setTimeout(animate, 5);
                    } else {
                        finishLock();
                        stopAnimate();
                        checkPositions();
                    }
                };
                animate();
            },
            stopAnimate = function() {
                window.clearTimeout(animateTimeout);
                animateTimeout = null;
            },
            inAnimate = function() {
                return animateTimeout !== null;
            },
            lockAtBottom = function() {
                preLock();
                if (bodyRects.height - targetRects.bottom > 80) {
                    startAnimate();
                } else {
                    finishLock();
                }
            },
            unlock = function() {
                areatemplate_direita.style.marginTop = (function() {
                    if (!isDistantOfPreviousElement()) {
                        return 'auto';
                    } else {
                        return calcDistance() + 'px';
                    }
                })();
                areatemplate_direita.style.top = 'auto';
                areatemplate_direita.style.bottom = 'auto';
                areatemplate_direita.classList.remove(class_fixed);
            },
            checkPositions = function() {
                if (!areatemplate_direita.hidden && !inAnimate()) {
                    updateRects();
                    if (isContentBiggerThanTarget()) {
                        if (isRising()) {
                            if (shouldLockAtTop()) {
                                return lockAtTop();
                            } else if (isFixed()) {
                                return unlock();
                            }
                        } else {
                            if (shouldLockAtBottom()) {
                                return lockAtBottom();
                            } else if (isFixed()) {
                                return unlock();
                            }
                        }
                    }
                }
            };
        window.onscroll = checkPositions;
        window.onresize = checkPositions;
    }
})(window);
(function(global, doc) {
    var libby = global.libby = global.libby || {};
    var responsive = global.libby.responsive = {};
    var root = doc.documentElement;
    var utils = global.libby.responsive.utils = {
        root: root,
        slice: Array.prototype.slice,
        contains: (function() {
            return ('contains' in root) ? function(context, node) {
                return context !== node && context.contains(node);
            } : ('compareDocumentPosition' in root) ? function(context, node) {
                return context === node || !!(context.compareDocumentPosition(node) & 16);
            } : function(context, node) {
                while ((node = node.parentNode)) {
                    if (node === context) return true;
                }
                return false;
            };
        }()),
        isFunction: function(fn) {
            return (typeof fn === 'function');
        },
        bind: function(fn, context) {
            var args = utils.slice.call(arguments, 2);
            return function() {
                return fn.apply(context || this, args.concat(utils.slice.call(arguments, 0)));
            };
        },
        isWindow: function(obj) {
            return obj != null && obj === obj.window;
        },
        getWindow: function(node) {
            return utils.isWindow(node) ? node : (node.nodeType === 9) ? node.defaultView || node.parentWindow : false;
        },
        extend: function(object) {
            var obj, i, key, len;
            for (i = 1, len = arguments.length; i < len; i++) {
                obj = arguments[i];
                for (key in obj) {
                    object[key] = obj[key];
                }
            }
            return object;
        },
        filter: function(array, fn) {
            if (array.filter) {
                return array.filter(fn);
            }
            var filtered = [];
            for (var i = 0, len = array.length; i < len; ++i) {
                if (fn.call(array, array[i], i)) filtered.push(array[i]);
            }
            return filtered;
        },
        binarySearch: function(array, compareFn, element) {
            var start = 0,
                end = array.length,
                pivot, comparison;
            while (start < end) {
                pivot = Math.floor((start + end) / 2);
                comparison = compareFn(array[pivot], element);
                if (comparison < 0) {
                    end = pivot;
                } else if (comparison > 0) {
                    start = pivot + 1;
                } else {
                    return pivot;
                }
            }
            return start;
        }
    };
    libby.DeferredValue = function() {
        this.value = null;
        this.callbackList = [];
    };
    libby.DeferredValue.prototype = {
        get: function(callback) {
            this.value ? callback(this.value) : this.callbackList.push(callback);
        },
        set: function(value) {
            this.value = value;
            while (this.callbackList.length > 0) {
                this.callbackList.pop()(value);
            }
        }
    };
    libby.containerKindDefer = new libby.DeferredValue();
}(this, document));
(function(global, doc) {
    var utils = libby.responsive.utils;
    var Events = libby.responsive.Events = function() {};
    utils.extend(Events.prototype, {
        addEvent: function(eventId, fn, context, args) {
            if (!this._evts) this._evts = {};
            if (!this._evts[eventId]) this._evts[eventId] = [];
            this._evts[eventId].push({
                fn: fn,
                context: context || this,
                args: args || []
            });
            return this;
        },
        removeEvent: function(eventId, fn) {
            if (!this._evts || !this._evts[eventId]) {
                return;
            }
            var evts = this._evts[eventId],
                newEvts = [];
            for (var i = 0, len = evts.length; i < len; ++i) {
                if (evts[i].fn !== fn) {
                    newEvts.push(evts[i]);
                }
            }
            this._evts[eventId] = newEvts;
        },
        fireEvent: function(eventId, args) {
            if (!this._evts) this._evts = {};
            var evts = this._evts[eventId];
            if (!evts) return;
            if (!args) args = [];
            for (var i = 0, len = evts.length; i < len; i++) {
                evts[i].fn.apply(evts[i].context, args.concat(evts[i].args));
            }
            return this;
        },
        hasEvent: function(eventId) {
            return (this._evts && this._evts[eventId] && this._evts[eventId].length);
        }
    });
    utils.extend(Events, {
        dom: {
            _createEventHandler: function(element, handler, context, args) {
                var newHandler = function(event) {
                    if (!event) {
                        event = global.event;
                    }
                    if (!event.target) {
                        event.target = event.srcElement || doc;
                    }
                    return handler.apply(context || element, [event].concat(args));
                };
                handler.realHandler = newHandler;
                return newHandler;
            },
            on: function(element, type, handler, context, args) {
                handler = this._createEventHandler(element, handler, context, args);
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                } else if (element.attachEvent) {
                    element.attachEvent('on' + type, handler);
                }
            },
            off: function(element, type, handler) {
                if (handler.realHandler) {
                    handler = handler.realHandler;
                }
                if (element.removeEventListener) {
                    element.removeEventListener(type, handler, false);
                } else if (element.detachEvent) {
                    element.detachEvent('on' + type, handler);
                }
            }
        }
    });
}(this, document));
(function(global, doc) {
    var Events = libby.responsive.Events,
        utils = libby.responsive.utils;
    var HtmlNode = libby.responsive.HtmlNode = function(element) {
        if (!(this instanceof HtmlNode)) {
            return new HtmlNode(element);
        }
        if (element instanceof HtmlNode) {
            return element;
        }
        if (element.nodeType !== 1) {
            throw Error('element should be an HTMLElement instance');
        }
        this.element = element;
        var uuid = this.uuid();
        if (HtmlNode._instances[uuid]) {
            return HtmlNode._instances[uuid];
        } else {
            HtmlNode._instances[uuid] = this;
        }
    };
    HtmlNode._uuid = 1;
    HtmlNode._instances = {};
    utils.extend(HtmlNode.prototype, {
        uuid: function() {
            return this.element.uniqueNumberHtmlNode || (this.element.uniqueNumberHtmlNode = HtmlNode._uuid++);
        },
        scrollTop: function() {
            return this.element.scrollTop;
        },
        _getComputedStyle: function() {
            var defaultView = this.element.ownerDocument.defaultView;
            return (defaultView && defaultView.getComputedStyle) ? defaultView.getComputedStyle(this.element, null) : this.element.currentStyle;
        },
        css: function(style) {
            var value = this.element.style[style];
            if (value == null || value === 'auto') {
                value = this._getComputedStyle()[style];
            }
            return (value != null && isFinite(value)) ? parseFloat(value) : value;
        },
        innerHeight: function() {
            return this.element.offsetHeight - this.css('borderTopWidth') - this.css('boderBottomWidth');
        },
        innerWidth: function() {
            return this.element.offsetWidth - this.css('borderLeftWidth') - this.css('boderRightWidth');
        },
        outerHeight: function() {
            return this.element.offsetHeight;
        },
        offset: (function() {
            if (!("getBoundingClientRect" in utils.root)) {
                return function() {
                    return {
                        top: 0,
                        left: 0
                    };
                };
            }
            return function() {
                var box, root = utils.root;
                try {
                    box = this.element.getBoundingClientRect();
                } catch (e) {}
                if (!box || !utils.contains(root, this.element)) {
                    return box ? {
                        top: box.top,
                        left: box.left
                    } : {
                        top: 0,
                        left: 0
                    };
                }
                var body = doc.body,
                    win = utils.getWindow(doc),
                    clientTop = root.clientTop || body.clientTop || 0,
                    clientLeft = root.clientLeft || body.clientLeft || 0,
                    scrollTop = win.pageYOffset || root.scrollTop,
                    scrollLeft = win.pageXOffset || root.scrollLeft,
                    top = box.top + scrollTop - clientTop,
                    left = box.left + scrollLeft - clientLeft;
                return {
                    top: top,
                    left: left
                };
            };
        }()),
        on: function(event, callback) {
            Events.dom.on(this.element, event, callback);
            return this;
        },
        off: function(event, callback) {
            Events.dom.off(this.element, event, callback);
            return this;
        }
    });
    utils.extend(HtmlNode.prototype, new Events);
}(this, document));
(function(global, doc) {
    var utils = libby.responsive.utils,
        Events = libby.responsive.Events,
        HtmlNode = libby.responsive.HtmlNode;
    var ScrollSpy = libby.responsive.ScrollSpy = function(options) {
        this.options = utils.extend({}, this.options, options);
        this.window = window;
        this.compatElement = this.getDocumentScrollElement();
        this.elements = {};
        this.bound = {
            updateVisibleElements: utils.bind(this.updateVisibleElements, this),
            throttledScroll: utils.bind(this.throttledScroll, this),
            throttledResize: utils.bind(this.throttledResize, this),
            onScrollPolling: utils.bind(this.onScrollPolling, this)
        };
        this.updateContainerCachedSize();
        this.orderedElements = [];
        this.scrollTimeout = null;
        this.resizeTimeout = null;
        this.scrollPollingInterval = null;
        this.listeningToEvents = false;
        this.windowScrollTop = null;
    };
    utils.extend(ScrollSpy.prototype, {
        options: {
            offset: 50,
            useScrollEvent: true,
            throttlingTime: 500
        },
        getDocumentScrollElement: function() {
            return (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.documentElement : doc.body;
        },
        getWindowScrollTop: function() {
            return (this.windowScrollTop = this.window.pageYOffset || this.compatElement.scrollTop);
        },
        updateContainerCachedSize: function() {
            this.windowHeight = this.compatElement.clientHeight;
            this.windowWidth = this.compatElement.clientWidth;
        },
        check: function(windowScrollTop, windowScrollBottom, updatingSize) {
            this._updateCacheIfNeeded();
            var firstIdx = utils.binarySearch(this.orderedElements, function(a, b) {
                return b - (a.topPosition + a.cachedOuterHeight);
            }, windowScrollTop, 0);
            for (var i = firstIdx; i < this.orderedElements.length; ++i) {
                var currentElement = this.orderedElements[i],
                    uuid = currentElement.uuid();
                if (currentElement.topPosition > windowScrollBottom) {
                    break;
                }
                if (this.elements[uuid]) {
                    currentElement.fireEvent('scrollSpyVisible', [updatingSize ? 'resize' : 'scroll']);
                    this.clearAddedCallback(currentElement);
                    if (currentElement.waitChange) {
                        currentElement.addEvent('scrollSpyElementChanged', this.removeElementOnChange(uuid));
                    } else {
                        setTimeout(this.removeElementOnChange(uuid), 0);
                    }
                }
            }
            this._tryStopEventsListening();
        },
        removeElementOnChange: function(uuid) {
            var self = this;
            return function() {
                self.remove(uuid);
            };
        },
        checkElementVisibility: function(element) {
            if (this.windowScrollTop === null) {
                this.getWindowScrollTop();
            }
            var windowScrollTop = this.windowScrollTop,
                elOffset = element.topPosition;
            if (elOffset - this.options.offset <= (windowScrollTop + this.windowHeight)) {
                if (elOffset + element.cachedOuterHeight + this.options.offset >= windowScrollTop) {
                    element.fireEvent('scrollSpyVisible', ['visible']);
                    this.clearAddedCallback(element);
                    return true;
                }
            }
            return false;
        },
        clearAddedCallback: function(element) {
            if (element.spyAddedCallback) {
                element.removeEvent('scrollSpyVisible', element.spyAddedCallback);
                element.spyAddedCallback = null;
            }
        },
        removeAll: function() {
            this.elements = {};
            this.orderedElements = [];
        },
        remove: function(uuid) {
            delete this.elements[uuid];
            for (var i = 0, len = this.orderedElements.length; i < len; ++i) {
                if (this.orderedElements[i].uuid() === uuid) {
                    break;
                }
            }
            this.orderedElements.splice(i, 1);
        },
        add: function(element, callback) {
            element = HtmlNode(element);
            var uuid = element.uuid();
            if (this.elements[uuid]) {
                this._listenToEvents();
                return;
            }
            var elementTop = element.offset().top;
            element.topPosition = elementTop;
            element.cachedOuterHeight = element.outerHeight();
            if (callback) {
                element.spyAddedCallback = callback;
                element.addEvent('scrollSpyVisible', callback, element.element);
            }
            if (!this.checkElementVisibility(element)) {
                this.elements[uuid] = element;
                this._updateCacheIfNeeded();
                if (this.orderedElements.length === 0) {
                    this.orderedElements.push(element);
                }
                for (var i = 0; i < this.orderedElements.length; ++i) {
                    if (this.orderedElements[i].topPosition > elementTop) {
                        break;
                    }
                }
                this.orderedElements.splice(i, 0, element);
            }
            this._listenToEvents();
        },
        _updateCacheIfNeeded: function() {
            var len = this.orderedElements.length,
                i, el, firstEl = this.orderedElements[0],
                lastEl = this.orderedElements[len - 1];
            if (len === 0 || (lastEl.topPosition === lastEl.offset().top && firstEl.topPosition === firstEl.offset().top)) {
                return;
            }
            for (i = 0; i < len; ++i) {
                el = this.orderedElements[i];
                el.topPosition = el.offset().top;
                el.cachedOuterHeight = el.outerHeight();
            }
            this.orderedElements.sort(function(a, b) {
                return a.topPosition - b.topPosition;
            });
        },
        throttledScroll: function(ev) {
            if (this.scrollTimeout) {
                return;
            }
            var self = this;
            this.scrollTimeout = setTimeout(function() {
                self.scrollTimeout = null;
                self.updateVisibleElements();
            }, this.options.throttlingTime);
        },
        throttledResize: function(ev) {
            if (this.resizeTimeout) {
                return;
            }
            var self = this;
            this.resizeTimeout = setTimeout(function() {
                self.resizeTimeout = null;
                self.updateVisibleElements(true);
            }, self.options.throttlingTime);
        },
        onScrollPolling: function() {
            var windowScrollTop = this.getWindowScrollTop(),
                windowScrollBottom;
            if (this.lastPollingTop != windowScrollTop) {
                this.check(windowScrollTop, windowScrollTop + this.windowHeight);
                this.lastPollingTop = windowScrollTop;
            }
        },
        updateVisibleElements: function(shouldUpdateSize) {
            if (shouldUpdateSize === true) {
                this.updateContainerCachedSize();
            }
            var windowScrollTop = this.getWindowScrollTop(),
                windowScrollBottom = windowScrollTop + this.windowHeight;
            this.check(windowScrollTop, windowScrollBottom, shouldUpdateSize);
        },
        _listenToEvents: function() {
            if (this.listeningToEvents || this.orderedElements.length === 0) {
                return;
            }
            this.listeningToEvents = true;
            if (this.options.useScrollEvent) {
                Events.dom.on(this.window, 'scroll', this.bound.throttledScroll);
            } else {
                this.scrollPollingInterval = setInterval(this.bound.onScrollPolling, this.options.throttlingTime);
            }
            Events.dom.on(this.window, 'load', this.bound.updateVisibleElements);
            Events.dom.on(this.window, 'resize', this.bound.throttledResize);
        },
        _tryStopEventsListening: function() {
            if (!this.listeningToEvents || this.orderedElements.length > 0) {
                return;
            }
            this.listeningToEvents = false;
            if (this.options.useScrollEvent) {
                Events.dom.off(this.window, 'scroll', this.bound.throttledScroll);
            } else {
                clearInterval(this.scrollPollingInterval);
            }
            Events.dom.off(this.window, 'load', this.bound.updateVisibleElements);
            Events.dom.off(this.window, 'resize', this.bound.throttledResize);
        }
    });
    libby.responsive.scrollSpy = new ScrollSpy();
}(this, document));
(function(global, doc) {
    var Events = libby.responsive.Events,
        HtmlNode = libby.responsive.HtmlNode,
        utils = libby.responsive.utils;
    var Hub = libby.responsive.Hub = function(options) {
        this.options = utils.extend({}, this.options, options);
        if (this.options.thumborUrl.substr(this.options.thumborUrl.length - 1, 1) != '/') {
            this.options.thumborUrl += '/';
        }
        this.elements = {};
        this.containerWidth = null;
        if (this.options.autoInit) {
            this.init();
        }
    };
    utils.extend(Hub.prototype, {
        options: {
            getContainerWidth: function() {
                return parseInt(HtmlNode(doc.body).css('width'), 10);
            },
            resizeThrottleTime: 50,
            autoChangeImages: true,
            screenWidths: null,
            thumborUrl: 'http://s2.glbimg.com/',
            autoInit: true,
            deferredContainerKind: libby.containerKindDefer,
            changeAllOnScroll: function() {
                return window.Modernizr && Modernizr.touch;
            }
        },
        init: function() {
            if (this.containerWidth) {
                return false;
            }
            this.selectImageElements();
            this.containerWidth = this.options.getContainerWidth();
            this.detectChosenSize(this.containerWidth);
            this.spyImages();
            this.bindEvents();
            return true;
        },
        getContainerKind: function(callback) {
            this.options.deferredContainerKind.get(callback);
        },
        selectImageElements: function() {
            this.elements.imageLiveNodeList = doc.getElementsByTagName('img');
            this.elements.pictureLiveNodeList = doc.getElementsByTagName('figure');
        },
        filterImageElements: function() {
            var liveImagesList = this.elements.imageLiveNodeList,
                pictureLiveNodeList = this.elements.pictureLiveNodeList,
                images = this.elements.images = [],
                image, i, len;
            for (i = 0, len = liveImagesList.length; i < len; ++i) {
                image = liveImagesList[i];
                if (image.getAttribute('data-url-' + this.chosenSize)) {
                    images.push(HtmlNode(image));
                }
            }
            for (i = 0, len = pictureLiveNodeList.length; i < len; ++i) {
                image = pictureLiveNodeList[i];
                if (image.getAttribute('data-url-' + this.chosenSize)) {
                    images.push(HtmlNode(image));
                }
            }
        },
        spyImages: function() {
            if (!this.options.autoChangeImages) {
                return;
            }
            this.filterImageElements();
            var images = this.elements.images,
                scrollSpy = libby.responsive.scrollSpy,
                image, i, len;
            for (i = 0, len = images.length; i < len; ++i) {
                image = images[i];
                image.waitChange = true;
                if (!image.hasEvent('scrollSpyVisible')) {
                    image.addEvent('scrollSpyVisible', this.loadCorrectResolutionImage, this, image);
                }
                scrollSpy.add(image);
            }
        },
        forceChangeAll: function() {
            var images = this.elements.images,
                scrollSpy = libby.responsive.scrollSpy,
                i, len;
            if (!images || images.length === 0) {
                return;
            }
            for (i = 0, len = images.length; i < len; ++i) {
                this.loadCorrectResolutionImage('force', images[i]);
                scrollSpy.remove(images[i].uuid());
            }
            this.elements.images = [];
        },
        bindEvents: function() {
            Events.dom.on(window, 'resize', function() {
                clearTimeout(this.resizeThrottleTimer);
                this.resizeThrottleTimer = setTimeout(utils.bind(this.checkContainerChange, this), this.options.resizeThrottleTime);
            }, this);
        },
        updateImages: function() {
            if (!this.init()) {
                if (!this.checkContainerChange()) {
                    this.spyImages();
                }
            }
        },
        checkContainerChange: function() {
            var containerSize = this.options.getContainerWidth(),
                currentChosen = this.chosenSize,
                alreadySpied = false;
            if (this.containerWidth != containerSize) {
                this.detectChosenSize(containerSize);
                if (currentChosen != this.chosenSize) {
                    alreadySpied = true;
                    this.spyImages();
                }
                this.fireEvent('onContainerChanged', [containerSize, this.containerWidth, this.chosenSize]);
                this.containerWidth = containerSize;
            }
            return alreadySpied;
        },
        detectChosenSize: function(newSize) {
            var currentWidthInfo, i;
            for (i = 0; i < this.options.screenWidths.length; ++i) {
                currentWidthInfo = this.options.screenWidths[i];
                if (newSize >= currentWidthInfo[1]) {
                    this.chosenSize = currentWidthInfo[0];
                    break;
                }
            }
            if (this.options.deferredContainerKind) {
                this.options.deferredContainerKind.set(this.chosenSize);
            }
        },
        loadCorrectResolutionImage: function(status, image) {
            if (!this.options.autoChangeImages) {
                return;
            }
            var changeAllOnScroll = this.options.changeAllOnScroll
            if (utils.isFunction(changeAllOnScroll)) {
                changeAllOnScroll = changeAllOnScroll();
            }
            if (changeAllOnScroll && status === 'scroll') {
                var _this = this;
                setTimeout(function() {
                    _this.forceChangeAll()
                }, 0);
            }
            var dataStr = 'data-url-' + this.chosenSize,
                url = image.element.getAttribute(dataStr);
            if (window.devicePixelRatio && window.devicePixelRatio > 1.5) {
                retinaURL = image.element.getAttribute(dataStr + '2x');
                if (retinaURL) {
                    url = retinaURL;
                    dataStr = dataStr + '2x';
                }
            }
            if (window.Modernizr && Modernizr.webp) {
                webpURL = image.element.getAttribute(dataStr + '-webp');
                if (webpURL) {
                    url = webpURL;
                    dataStr = dataStr + '-webp';
                }
            }
            if (!url) {
                return;
            }
            var originalUrl = image.element.getAttribute('data-original-image');
            if (originalUrl != null) {
                url = url + originalUrl;
            }
            url = this.options.thumborUrl + url;
            if (this.getSource(image) === url) {
                return;
            }
            var preloadImage = doc.createElement('img');
            Events.dom.on(preloadImage, 'load', this.onPreloadLoaded(image));
            preloadImage.src = url;
        },
        onPreloadLoaded: function(image) {
            var _this = this;
            return function() {
                var newImgSrc = this.getAttribute('src');
                _this.setSource(image, newImgSrc);
            };
        },
        getSource: function(image) {
            if (image.element.getAttribute('data-as-back')) {
                return image.element.rhCurrentSrc;
            }
            return image.element.getAttribute('src');
        },
        setSource: function(image, newImgSrc) {
            if (image.element.getAttribute('data-as-back')) {
                image.element.style.backgroundImage = "url('" + newImgSrc + "')";
                image.element.rhCurrentSrc = newImgSrc;
            } else {
                image.element.setAttribute('src', newImgSrc);
            }
            image.fireEvent('scrollSpyElementChanged');
        }
    });
    utils.extend(Hub.prototype, new Events);
}(this, document));
(function(global) {
    var baseWidthContainer = null;
    var responsiveHub = global.responsiveHub = new libby.responsive.Hub({
        getContainerWidth: function() {
            if ('innerWidth' in window) {
                return window.innerWidth;
            }
            if (!baseWidthContainer) {
                baseWidthContainer = document.getElementById('base-container-width-element');
            }
            if (!baseWidthContainer) {
                baseWidthContainer = document.getElementsByTagName('body')[0];
            }
            if (!baseWidthContainer) {
                return 1055;
            }
            return baseWidthContainer.offsetWidth || baseWidthContainer.clientWidth;
        },
        autoChangeImages: RESPONSIVE_SETTINGS.autoChangeImages,
        screenWidths: RESPONSIVE_SETTINGS.screenWidths,
        thumborUrl: RESPONSIVE_SETTINGS.thumborUrl,
        autoInit: true
    });
}(this));
(function($) {
    if (!$.fn.on) {
        $.fn.on = function(events, selector, data, handler) {
            var self = this;
            var args = arguments.length;
            if (args > 3) {
                return self.delegate(selector, events, data, handler);
            } else if (args > 2) {
                if (typeof selector === 'string') {
                    return self.delegate(selector, events, data);
                } else {
                    return self.bind(events, selector, data);
                }
            } else {
                return self.bind(events, selector);
            }
        };
        $.fn.off = function(events, selector, handler) {
            var self = this;
            var args = arguments.length;
            if (typeof selector === 'string') {
                if (args > 2) {
                    return self.undelegate(selector, events, handler);
                } else if (args > 1) {
                    return self.undelegate(selector, events);
                } else {
                    return self.undelegate();
                }
            } else {
                if (args > 1) {
                    handler = selector;
                    return self.unbind(events, handler);
                } else if (args > 0) {
                    return self.unbind(events);
                } else {
                    return self.unbind();
                }
            }
        };
    }
})(this.jQuery);
(function(w, $, undefined) {
    w.tapHandling = false;
    w.tappy = true;
    var tap = function($els) {
        return $els.each(function() {
            var $el = $(this),
                resetTimer, startY, startX, cancel, scrollTolerance = 10;

            function trigger(e) {
                $(e.target).trigger("tap", [e, $(e.target).attr("href")]);
            }

            function getCoords(e) {
                var ev = e.originalEvent || e,
                    touches = ev.touches || ev.targetTouches;
                if (touches) {
                    return [touches[0].pageX, touches[0].pageY];
                } else {
                    return null;
                }
            }

            function start(e) {
                if (e.touches && e.touches.length > 1 || e.targetTouches && e.targetTouches.length > 1) {
                    return false;
                }
                var coords = getCoords(e);
                startX = coords[0];
                startY = coords[1];
            }

            function move(e) {
                if (!cancel) {
                    var coords = getCoords(e);
                    if (coords && (Math.abs(startY - coords[1]) > scrollTolerance || Math.abs(startX - coords[0]) > scrollTolerance)) {
                        cancel = true;
                    }
                }
            }

            function end(e) {
                clearTimeout(resetTimer);
                resetTimer = setTimeout(function() {
                    w.tapHandling = false;
                    cancel = false;
                }, 1000);
                if ((e.which && e.which > 1) || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) {
                    return;
                }
                e.preventDefault();
                if (cancel || w.tapHandling && w.tapHandling !== e.type) {
                    cancel = false;
                    return;
                }
                w.tapHandling = e.type;
                trigger(e);
            }
            $el.bind("touchstart.tappy MSPointerDown.tappy", start).bind("touchmove.tappy MSPointerMove.tappy", move).bind("touchend.tappy MSPointerUp.tappy", end).bind("click.tappy", end);
        });
    };
    var untap = function($els) {
        return $els.unbind(".tappy");
    };
    if ($.event && $.event.special) {
        $.event.special.tap = {
            add: function(handleObj) {
                tap($(this));
            },
            remove: function(handleObj) {
                untap($(this));
            }
        };
    } else {
        var oldBind = $.fn.bind,
            oldUnbind = $.fn.unbind;
        $.fn.bind = function(evt) {
            if (/(^| )tap( |$)/.test(evt)) {
                tap(this);
            }
            return oldBind.apply(this, arguments);
        };
        $.fn.unbind = function(evt) {
            if (/(^| )tap( |$)/.test(evt)) {
                untap(this);
            }
            return oldUnbind.apply(this, arguments);
        };
    }
}(this, jQuery));
(function() {
    var HeaderProduto, shouldNotAutoLoad, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    HeaderProduto = (function() {
        function HeaderProduto(container) {
            this.container = container;
            this.onFloatingLogoClick = bind(this.onFloatingLogoClick, this);
            this.defaultSearchFormAsProxy = bind(this.defaultSearchFormAsProxy, this);
            this.containerKind = 'desktop';
            this.isTouchable = 'ontouchstart' in window || navigator.msMaxTouchPoints || (window.DocumentTouch && document instanceof window.DocumentTouch);
            this.gatherElements();
            this.findContainerKind();
            this.verifyReguaExists();
            this.verifyShowtimeExists();
            this.bindEvents();
        }
        HeaderProduto.prototype.gatherElements = function() {
            this.elements = {};
            this.elements.cube = this.container.find('.cube');
            this.elements.menuButton = this.container.find('.menu-button');
            this.elements.searchContainer = this.container.find('.search-area');
            this.elements.glassContainer = this.container.find('.glass-container');
            this.elements.input = this.container.find('.search');
            this.elements.scrollAnim = $('html, body');
            this.elements.$html = $('html');
            this.elements.window = $(window);
            return this.elements.document = $(document);
        };
        HeaderProduto.prototype.addClassToHtml = function(htmlClass) {
            if ((htmlClass != null) && htmlClass) {
                return this.elements.$html.addClass(htmlClass);
            }
        };
        HeaderProduto.prototype.removeClassToHtml = function(htmlClass) {
            if ((htmlClass != null) && htmlClass) {
                return this.elements.$html.removeClass(htmlClass);
            }
        };
        HeaderProduto.prototype.verifyElmExists = function(elmSelector, htmlClassWhenExists, htmlClassWhenDoesntExists) {
            if (document.querySelector(elmSelector)) {
                return this.addClassToHtml(htmlClassWhenExists);
            } else {
                return this.addClassToHtml(htmlClassWhenDoesntExists);
            }
        };
        HeaderProduto.prototype.verifyReguaExists = function() {
            return this.verifyElmExists("#regua-navegacao", null, "has-not-regua");
        };
        HeaderProduto.prototype.verifyShowtimeExists = function() {
            return this.verifyElmExists(".showtime", "has-showtime");
        };
        HeaderProduto.prototype.findContainerKind = function() {
            if (window.responsiveHub) {
                responsiveHub.getContainerKind((function(_this) {
                    return function(containerKind) {
                        _this.containerKind = containerKind;
                        return _this.changedContainerKind();
                    };
                })(this));
                return responsiveHub.addEvent('onContainerChanged', (function(_this) {
                    return function(newWidth, oldWidth, containerKind) {
                        if (_this.containerKind !== containerKind) {
                            _this.containerKind = containerKind;
                            return _this.changedContainerKind();
                        }
                    };
                })(this));
            } else {
                return this.changedContainerKind();
            }
        };
        HeaderProduto.prototype.changedContainerKind = function() {
            if (this.isDesktop()) {
                return this.destroyMobileSearch();
            } else {
                this.createMobileSearch();
                return this.bindMobileEvents();
            }
        };
        HeaderProduto.prototype.isSmart = function() {
            return this.containerKind.indexOf('smart') > -1;
        };
        HeaderProduto.prototype.isDesktop = function() {
            return this.containerKind.indexOf('desktop') > -1 && !this.isTouchable;
        };
        HeaderProduto.prototype.bindMobileEvents = function() {
            this.elements.menuButton.off().on('tap', (function(_this) {
                return function() {
                    return _this.elements.document.trigger("glb.menu.open");
                };
            })(this));
            return this.elements.searchContainer.off().on('tap', (function(_this) {
                return function() {
                    _this.elements.cube.addClass('show-bottom');
                    return _this.elements.mobileInput[0].focus();
                };
            })(this));
        };
        HeaderProduto.prototype.bindEvents = function() {
            if (!this.isDesktop()) {
                this.bindMobileEvents();
            }
            return this.container.delegate('#frmBuscaMobile, #frmBuscaScroll', 'submit', this.defaultSearchFormAsProxy).delegate('.floating-bar .logo-area', 'click', this.onFloatingLogoClick);
        };
        HeaderProduto.prototype.defaultSearchFormAsProxy = function(ev) {
            var $buscaPadraoForm, $form, $inputBuscaPadrao;
            ev.preventDefault();
            $form = $(ev.target);
            $buscaPadraoForm = this.container.find('#busca-padrao form');
            $inputBuscaPadrao = $buscaPadraoForm.find('#busca-campo');
            $inputBuscaPadrao.val($form.find('input[type="text"]').val());
            return $buscaPadraoForm.trigger('submit');
        };
        HeaderProduto.prototype.onFloatingLogoClick = function(ev) {
            var scrollTop;
            ev.preventDefault();
            scrollTop = this.elements.window.scrollTop();
            return this.elements.scrollAnim.animate({
                scrollTop: 0
            }, Math.max(scrollTop * 0.3, 200));
        };
        HeaderProduto.prototype.destroyMobileSearch = function() {
            this.elements.cube.removeClass('show-bottom');
            if (this.elements.mobileSearch != null) {
                this.elements.mobileSearch.detach();
            }
            return this.elements.mobileSearch = null;
        };
        HeaderProduto.prototype.createMobileSearch = function() {
            if (this.elements.mobileSearch != null) {
                return;
            }
            this.elements.formAction = this.container.find('#busca-padrao:first form').attr('action');
            this.elements.mobileSearch = $("<div class='face bottom'>\n    <form id='frmBuscaMobile' class='area-busca' action='" + this.elements.formAction + "'>\n        <div class='input-container'>\n            <input type='text' class='search-input' name='q' />\n        </div>\n        <div class='close-container'>\n            <div class='close'></div>\n        </div>\n    </form>\n</div>");
            this.elements.cube.append(this.elements.mobileSearch);
            this.elements.mobileInput = this.elements.mobileSearch.find('input[type="text"]');
            this.elements.closeContainer = this.elements.mobileSearch.find('.close-container');
            return this.elements.closeContainer.off().on('tap', (function(_this) {
                return function(ev) {
                    return _this.elements.cube.removeClass('show-bottom');
                };
            })(this));
        };
        return HeaderProduto;
    })();
    window.glb = window.glb || {};
    window.glb.HeaderProduto = HeaderProduto;
    window.loadHeaderProduto = function() {
        return window.glb.currentHeader = new HeaderProduto($('#header-produto'));
    };
    shouldNotAutoLoad = (window.noAutoLoadHeaderProduto != null) && window.noAutoLoadHeaderProduto;
    if (!shouldNotAutoLoad) {
        window.loadHeaderProduto();
    }
}).call(this);
(function() {
    var classes, htmlTag, ieMatcher, mainVersion, newClasses, result, ua;
    htmlTag = document.getElementsByTagName('html')[0];
    classes = htmlTag.className;
    ua = navigator.userAgent;
    ieMatcher = /MSIE\s(\d+)/;
    result = ua.match(ieMatcher);
    mainVersion = null;
    newClasses = '';
    if (result) {
        mainVersion = result[1];
        if (classes.indexOf('is-ie') < 0) {
            newClasses += ' is-ie';
        }
        if (classes.indexOf('is-ie' + mainVersion) < 0) {
            newClasses += ' is-ie' + mainVersion;
        }
        htmlTag.className += newClasses;
    }
}).call(this);
(function() {
    var Sticky, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    Sticky = (function() {
        function Sticky(element) {
            this.element = element;
            this.updatePosition = bind(this.updatePosition, this);
            this.refresh = bind(this.refresh, this);
            this.offset = 50;
            this.isSticky = false;
            this.isOnFloating = false;
            this.gatherElements();
            this.measureElement();
            this.findContainerKind();
        }
        Sticky.prototype.findContainerKind = function() {
            if (window.responsiveHub) {
                responsiveHub.getContainerKind((function(_this) {
                    return function(containerKind) {
                        _this.containerKind = containerKind;
                        return _this.refresh();
                    };
                })(this));
                return responsiveHub.addEvent('onContainerChanged', (function(_this) {
                    return function(newWidth, oldWidth, containerKind) {
                        if (_this.containerKind !== containerKind) {
                            _this.containerKind = containerKind;
                            return _this.refresh();
                        }
                    };
                })(this));
            } else {
                return this.refresh();
            }
        };
        Sticky.prototype.gatherElements = function() {
            this.elements = {};
            this.elements.window = $(window);
            this.elements.body = $('body');
            this.elements.bar = this.element.find('#glbbarrawidget');
            this.elements.floatingBar = this.element.find('.floating-bar');
            return this.elements.headerBar = this.elements.floatingBar.find('.header-bar');
        };
        Sticky.prototype.measureElement = function() {
            return this.height = this.element.height();
        };
        Sticky.prototype.resetSticky = function() {
            this.unbindEvents();
            if (this.isSticky) {
                this.element.removeClass('sticky');
                this.elements.bar.append(this.bar.detach());
                this.bar.css('height', '').css('margin-top', '');
                this.isOnFloating = false;
                return this.isSticky = false;
            }
        };
        Sticky.prototype.monitorScroll = function() {
            this.unbindEvents();
            return this.elements.window.unbind('scroll.sticky').bind('scroll.sticky', this.updatePosition);
        };
        Sticky.prototype.unbindEvents = function() {
            return this.elements.window.unbind('scroll.sticky');
        };
        Sticky.prototype.clearTimer = function() {
            if (this.timer != null) {
                clearTimeout(this.timer);
            }
            return this.timer = null;
        };
        Sticky.prototype.refresh = function() {
            if (this.containerKind !== 'desktop') {
                return this.resetSticky();
            } else {
                this.monitorScroll();
                return this.updatePosition();
            }
        };
        Sticky.prototype.updatePosition = function() {
            var scrollTop;
            scrollTop = this.elements.window.scrollTop();
            if ((!this.bar) || this.bar.length === 0) {
                this.bar = this.elements.bar.find('#barra-globocom');
            }
            if (scrollTop > this.height + this.offset) {
                if (!this.isSticky) {
                    this.clearTimer();
                    this.elements.floatingBar.prepend(this.bar.detach());
                    this.element.addClass('sticky');
                    this.isSticky = true;
                    $(document).trigger('header_fixed');
                    return this.isSticky;
                }
            } else if (this.isSticky) {
                this.element.removeClass('sticky');
                this.clearTimer();
                this.timer = setTimeout((function(_this) {
                    return function() {
                        _this.elements.bar.append(_this.bar.detach());
                        _this.bar.css('height', '').css('margin-top', '');
                        return _this.isOnFloating = false;
                    };
                })(this), 150);
                return this.isSticky = false;
            }
        };
        return Sticky;
    })();
    $(function() {
        return new Sticky($('#header-produto'));
    });
}).call(this);
(function() {
    var HeaderTracking;
    HeaderTracking = (function() {
        function HeaderTracking(container) {
            this.container = container;
            this.logo = this.container.find(".logo");
            this.formBusca = this.container.find("#frmBusca");
            this.formBuscaMobile = this.container.find("#frmBuscaMobile");
            this.buscaCampo = this.formBusca.find("#busca-campo");
            this.buscaCampoMobile = this.container.find(".search-input");
            this.shouldTrack = !window.noTrackingMenuWeb;
            this.headerFramework = document.documentElement.className.indexOf('has-regua') > -1;
            this.bind();
        }
        HeaderTracking.prototype.trackGA = function(category, action, label, noninteraction) {
            if ((typeof _gaq !== "undefined" && _gaq !== null) && this.shouldTrack) {
                return _gaq.push(["_trackEvent", category, action, label, 0, noninteraction]);
            } else {
                return console.log([category, action, label, noninteraction]);
            }
        };
        HeaderTracking.prototype.bind = function() {
            var headerFramework, logo, trackGa;
            trackGa = (function(_this) {
                return function(category, action, label, noninteraction) {
                    return _this.trackGA(category, action, label, noninteraction);
                };
            })(this);
            logo = this.logo;
            headerFramework = this.headerFramework;
            if (this.container.hasClass("header-home")) {
                this.container.find(".logo-area, .logo-produto").on("click", function() {
                    var portalName;
                    portalName = window.REGUA_SETTINGS.portalName || $(this).text();
                    if (headerFramework) {
                        return trackGa("header_framework", "marca", "clique | " + portalName, false);
                    } else {
                        return trackGa("Header", "Clique no Item", "Logo do produto", false);
                    }
                });
            }
            if (this.container.hasClass("header-editoria")) {
                this.logo.on("click", (function(_this) {
                    return function() {
                        if (headerFramework) {
                            return trackGa("header_framework", "editoria", "clique | " + (_this.logo.html()), false);
                        } else {
                            return trackGa("Header", "Clique no Item", _this.logo.html(), false);
                        }
                    };
                })(this));
                this.container.find(".logo-afiliada-primeiro").on("click", (function(_this) {
                    return function() {
                        return trackGa("header_framework", "Clique no Item", _this.logo.html() + " > logo 1", false);
                    };
                })(this));
                this.container.find(".logo-afiliada-extra").on("click", (function(_this) {
                    return function() {
                        return trackGa("header_framework", "Clique no Item", _this.logo.html() + " > logo 2", false);
                    };
                })(this));
            }
            if (this.container.hasClass("header-subeditoria")) {
                this.container.find(".link-subtitulo").on("click", function() {
                    var link;
                    link = $(this);
                    if (headerFramework) {
                        return trackGa("header_framework", "editoria", "clique | " + (logo.html()) + " > " + (link.text().trim()), false);
                    } else {
                        return trackGa("SubHeader", "Clique no Item", link.text().trim(), false);
                    }
                });
            }
            this.container.find(".search-area .glass").on("click", (function(_this) {
                return function() {
                    return trackGa("Busca", "Abrir busca", "Abrir busca", true);
                };
            })(this));
            this.container.find(".close-container .close").on("click", (function(_this) {
                return function() {
                    return trackGa("Busca", "Fechar busca", "Fechar busca", true);
                };
            })(this));
            this.formBusca.on("click", (function(_this) {
                return function() {
                    return trackGa("Busca", "Item buscado", _this.buscaCampo.val(), false);
                };
            })(this));
            return this.formBuscaMobile.on("click", (function(_this) {
                return function() {
                    return trackGa("Busca", "Item buscado", _this.buscaCampoMobile.val(), false);
                };
            })(this));
        };
        return HeaderTracking;
    })();
    $(function() {
        return new HeaderTracking($('#header-produto'));
    });
}).call(this);
var localStoragePollyfillObject = {
    _data: {},
    setItem: function(id, val) {
        return this._data[id] = String(val);
    },
    getItem: function(id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },
    removeItem: function(id) {
        return delete this._data[id];
    },
    clear: function() {
        return this._data = {};
    }
};
if ('localStorage' in window) {
    try {
        localStorage.setItem('test', 1);
    } catch (error) {
        window.localStorage = localStoragePollyfillObject;
    }
} else {
    window.localStorage = localStoragePollyfillObject;
};
window.ModernizrWithPrefixed = function(a, b, c) {
    function w(a) {
        i.cssText = a
    }

    function x(a, b) {
        return w(prefixes.join(a + ";") + (b || ""))
    }

    function y(a, b) {
        return typeof a === b
    }

    function z(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function A(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!z(e, "-") && i[e] !== c) return b == "pfx" ? e : !0
        }
        return !1
    }

    function B(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : y(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function C(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + m.join(d + " ") + d).split(" ");
        return y(b, "string") || y(b, "undefined") ? A(e, b) : (e = (a + " " + n.join(d + " ") + d).split(" "), B(e, b, c))
    }
    var d = "2.8.3",
        e = {},
        f = b.documentElement,
        g = "modernizr",
        h = b.createElement(g),
        i = h.style,
        j, k = {}.toString,
        l = "Webkit Moz O ms",
        m = l.split(" "),
        n = l.toLowerCase().split(" "),
        o = {},
        p = {},
        q = {},
        r = [],
        s = r.slice,
        t, u = {}.hasOwnProperty,
        v;
    !y(u, "undefined") && !y(u.call, "undefined") ? v = function(a, b) {
        return u.call(a, b)
    } : v = function(a, b) {
        return b in a && y(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = s.call(arguments, 1),
            e = function() {
                if (this instanceof e) {
                    var a = function() {};
                    a.prototype = c.prototype;
                    var f = new a,
                        g = c.apply(f, d.concat(s.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return c.apply(b, d.concat(s.call(arguments)))
            };
        return e
    });
    for (var D in o) v(o, D) && (t = D.toLowerCase(), e[t] = o[D](), r.push((e[t] ? "" : "no-") + t));
    return e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a) v(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof enableClasses != "undefined" && enableClasses && (f.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, w(""), h = j = null, e._version = d, e._domPrefixes = n, e._cssomPrefixes = m, e.testProp = function(a) {
        return A([a])
    }, e.testAllProps = C, e.prefixed = function(a, b, c) {
        return b ? C(a, b, c) : C(a, "pfx")
    }, e
}(this, this.document);
(function(w, $, undefined) {
    w.tapHandling = false;
    w.tappy = true;
    var tap = function($els) {
        return $els.each(function() {
            var $el = $(this),
                resetTimer, startY, startX, cancel, scrollTolerance = 10;

            function trigger(e) {
                $(e.target).trigger("tap", [e, $(e.target).attr("href")]);
            }

            function getCoords(e) {
                var ev = e.originalEvent || e,
                    touches = ev.touches || ev.targetTouches;
                if (touches) {
                    return [touches[0].pageX, touches[0].pageY];
                } else {
                    return null;
                }
            }

            function start(e) {
                if (e.touches && e.touches.length > 1 || e.targetTouches && e.targetTouches.length > 1) {
                    return false;
                }
                var coords = getCoords(e);
                startX = coords[0];
                startY = coords[1];
            }

            function move(e) {
                if (!cancel) {
                    var coords = getCoords(e);
                    if (coords && (Math.abs(startY - coords[1]) > scrollTolerance || Math.abs(startX - coords[0]) > scrollTolerance)) {
                        cancel = true;
                    }
                }
            }

            function end(e) {
                clearTimeout(resetTimer);
                resetTimer = setTimeout(function() {
                    w.tapHandling = false;
                    cancel = false;
                }, 1000);
                if ((e.which && e.which > 1) || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) {
                    return;
                }
                e.preventDefault();
                if (cancel || w.tapHandling && w.tapHandling !== e.type) {
                    cancel = false;
                    return;
                }
                w.tapHandling = e.type;
                trigger(e);
            }
            $el.bind("touchstart.tappy MSPointerDown.tappy", start).bind("touchmove.tappy MSPointerMove.tappy", move).bind("touchend.tappy MSPointerUp.tappy", end).bind("click.tappy", end);
        });
    };
    var untap = function($els) {
        return $els.unbind(".tappy");
    };
    if ($.event && $.event.special) {
        $.event.special.tap = {
            add: function(handleObj) {
                tap($(this));
            },
            remove: function(handleObj) {
                untap($(this));
            }
        };
    } else {
        var oldBind = $.fn.bind,
            oldUnbind = $.fn.unbind;
        $.fn.bind = function(evt) {
            if (/(^| )tap( |$)/.test(evt)) {
                tap(this);
            }
            return oldBind.apply(this, arguments);
        };
        $.fn.unbind = function(evt) {
            if (/(^| )tap( |$)/.test(evt)) {
                untap(this);
            }
            return oldUnbind.apply(this, arguments);
        };
    }
}(this, jQuery));
"use strict";
window.suggestjs = window.suggestjs || (function($) {
    var settings = {};
    var cache = {
        suggestions: [],
        featuredContents: []
    };
    var defaultDiacriticsRemovalap = [{
        'base': 'A',
        'letters': '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'
    }, {
        'base': 'AA',
        'letters': '\uA732'
    }, {
        'base': 'AE',
        'letters': '\u00C6\u01FC\u01E2'
    }, {
        'base': 'AO',
        'letters': '\uA734'
    }, {
        'base': 'AU',
        'letters': '\uA736'
    }, {
        'base': 'AV',
        'letters': '\uA738\uA73A'
    }, {
        'base': 'AY',
        'letters': '\uA73C'
    }, {
        'base': 'B',
        'letters': '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'
    }, {
        'base': 'C',
        'letters': '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'
    }, {
        'base': 'D',
        'letters': '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779'
    }, {
        'base': 'DZ',
        'letters': '\u01F1\u01C4'
    }, {
        'base': 'Dz',
        'letters': '\u01F2\u01C5'
    }, {
        'base': 'E',
        'letters': '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'
    }, {
        'base': 'F',
        'letters': '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'
    }, {
        'base': 'G',
        'letters': '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'
    }, {
        'base': 'H',
        'letters': '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'
    }, {
        'base': 'I',
        'letters': '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'
    }, {
        'base': 'J',
        'letters': '\u004A\u24BF\uFF2A\u0134\u0248'
    }, {
        'base': 'K',
        'letters': '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'
    }, {
        'base': 'L',
        'letters': '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'
    }, {
        'base': 'LJ',
        'letters': '\u01C7'
    }, {
        'base': 'Lj',
        'letters': '\u01C8'
    }, {
        'base': 'M',
        'letters': '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'
    }, {
        'base': 'N',
        'letters': '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'
    }, {
        'base': 'NJ',
        'letters': '\u01CA'
    }, {
        'base': 'Nj',
        'letters': '\u01CB'
    }, {
        'base': 'O',
        'letters': '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'
    }, {
        'base': 'OI',
        'letters': '\u01A2'
    }, {
        'base': 'OO',
        'letters': '\uA74E'
    }, {
        'base': 'OU',
        'letters': '\u0222'
    }, {
        'base': 'OE',
        'letters': '\u008C\u0152'
    }, {
        'base': 'oe',
        'letters': '\u009C\u0153'
    }, {
        'base': 'P',
        'letters': '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'
    }, {
        'base': 'Q',
        'letters': '\u0051\u24C6\uFF31\uA756\uA758\u024A'
    }, {
        'base': 'R',
        'letters': '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'
    }, {
        'base': 'S',
        'letters': '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'
    }, {
        'base': 'T',
        'letters': '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'
    }, {
        'base': 'TZ',
        'letters': '\uA728'
    }, {
        'base': 'U',
        'letters': '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'
    }, {
        'base': 'V',
        'letters': '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'
    }, {
        'base': 'VY',
        'letters': '\uA760'
    }, {
        'base': 'W',
        'letters': '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'
    }, {
        'base': 'X',
        'letters': '\u0058\u24CD\uFF38\u1E8A\u1E8C'
    }, {
        'base': 'Y',
        'letters': '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'
    }, {
        'base': 'Z',
        'letters': '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'
    }, {
        'base': 'a',
        'letters': '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'
    }, {
        'base': 'aa',
        'letters': '\uA733'
    }, {
        'base': 'ae',
        'letters': '\u00E6\u01FD\u01E3'
    }, {
        'base': 'ao',
        'letters': '\uA735'
    }, {
        'base': 'au',
        'letters': '\uA737'
    }, {
        'base': 'av',
        'letters': '\uA739\uA73B'
    }, {
        'base': 'ay',
        'letters': '\uA73D'
    }, {
        'base': 'b',
        'letters': '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'
    }, {
        'base': 'c',
        'letters': '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'
    }, {
        'base': 'd',
        'letters': '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'
    }, {
        'base': 'dz',
        'letters': '\u01F3\u01C6'
    }, {
        'base': 'e',
        'letters': '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'
    }, {
        'base': 'f',
        'letters': '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'
    }, {
        'base': 'g',
        'letters': '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'
    }, {
        'base': 'h',
        'letters': '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'
    }, {
        'base': 'hv',
        'letters': '\u0195'
    }, {
        'base': 'i',
        'letters': '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'
    }, {
        'base': 'j',
        'letters': '\u006A\u24D9\uFF4A\u0135\u01F0\u0249'
    }, {
        'base': 'k',
        'letters': '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'
    }, {
        'base': 'l',
        'letters': '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'
    }, {
        'base': 'lj',
        'letters': '\u01C9'
    }, {
        'base': 'm',
        'letters': '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'
    }, {
        'base': 'n',
        'letters': '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'
    }, {
        'base': 'nj',
        'letters': '\u01CC'
    }, {
        'base': 'o',
        'letters': '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'
    }, {
        'base': 'oi',
        'letters': '\u01A3'
    }, {
        'base': 'ou',
        'letters': '\u0223'
    }, {
        'base': 'oo',
        'letters': '\uA74F'
    }, {
        'base': 'p',
        'letters': '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'
    }, {
        'base': 'q',
        'letters': '\u0071\u24E0\uFF51\u024B\uA757\uA759'
    }, {
        'base': 'r',
        'letters': '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'
    }, {
        'base': 's',
        'letters': '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'
    }, {
        'base': 't',
        'letters': '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'
    }, {
        'base': 'tz',
        'letters': '\uA729'
    }, {
        'base': 'u',
        'letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'
    }, {
        'base': 'v',
        'letters': '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'
    }, {
        'base': 'vy',
        'letters': '\uA761'
    }, {
        'base': 'w',
        'letters': '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'
    }, {
        'base': 'x',
        'letters': '\u0078\u24E7\uFF58\u1E8B\u1E8D'
    }, {
        'base': 'y',
        'letters': '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'
    }, {
        'base': 'z',
        'letters': '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'
    }];
    var diacriticsMap = {};
    for (var i = 0; i < defaultDiacriticsRemovalap.length; i++) {
        var letters = defaultDiacriticsRemovalap[i].letters;
        for (var j = 0; j < letters.length; j++) {
            diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
        }
    }
    var _prepararResultadoPreSuggest = function(size, data, callback) {
        var preSuggestList = [];
        for (var i = 0; i < data.suggestions.length; i++) {
            preSuggestList.push({
                term: data.suggestions[i].text,
                score: data.suggestions[i].score
            });
        };
        callback(_seleciona(['term'], preSuggestList).slice(0, size));
    };
    var _removeAcentos = function(termo) {
        return termo.replace(/[^\u0000-\u007E]/g, function(a) {
            return diacriticsMap[a] || a;
        });
    }
    var _todosTermosIniciamAlgumaPalavra = function(termo, frase) {
        var termos = _removeAcentos(termo).toLowerCase().split(/[^\w]+/);
        var palavras = _removeAcentos(frase).toLowerCase().split(/[^\w]+/);
        var result = true;
        for (var i = 0; i < termos.length; i++) {
            result = result && _algumaPalavraIniciaCom(termos[i], palavras);
        }
        return result;
    };
    var _algumaPalavraIniciaCom = function(termo, palavras) {
        for (var i = 0; i < palavras.length; i++) {
            if (palavras[i].indexOf(termo) == 0) {
                return true;
            }
        }
        return false;
    };
    var _iniciaCom = function(termo, frase) {
        return _removeAcentos(frase).toLowerCase().indexOf(_removeAcentos(termo).toLowerCase()) == 0;
    };
    var _seleciona = function(campos, lista) {
        var result = [];
        for (var i = 0; i < lista.length; i++) {
            var obj = {};
            for (var j = 0; j < campos.length; j++) {
                obj[campos[j]] = lista[i][campos[j]];
            }
            result.push(obj);
        }
        return result;
    };
    var _pesoPrioridade = function(a, b) {
        var aPrioritario = $.inArray(a.publisher.toLowerCase(), settings.prioritarios) != -1;
        var bPrioritario = $.inArray(b.publisher.toLowerCase(), settings.prioritarios) != -1;
        if (aPrioritario && !bPrioritario) {
            return -1;
        } else if (!aPrioritario && bPrioritario) {
            return 1;
        } else {
            return b.score - a.score;
        }
    };
    var _buscarTermosComPrefixo = function(termo, size, callback) {
        var suggestions = [];
        var featuredContents = [];
        for (var i = 0; i < cache.suggestions.length; i++) {
            if (_iniciaCom(termo, cache.suggestions[i].term)) {
                suggestions.push(cache.suggestions[i]);
            }
        }
        for (var i = 0; i < cache.featuredContents.length; i++) {
            if (_todosTermosIniciamAlgumaPalavra(termo, cache.featuredContents[i].term) || _todosTermosIniciamAlgumaPalavra(termo, cache.featuredContents[i].parent)) {
                featuredContents.push(cache.featuredContents[i]);
            }
        }
        suggestions.sort(function(a, b) {
            return b.score - a.score
        });
        featuredContents.sort(_pesoPrioridade);
        callback({
            "suggestions": _seleciona(['term'], suggestions).slice(0, size.suggestions),
            "featured_content": _seleciona(['term', 'product', 'parent', 'url', 'publisher', 'thumbnail'], featuredContents).slice(0, size.featured_contents)
        });
    };
    var _termoExiste = function(term, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].term == term) {
                return true;
            }
        }
        return false;
    };
    var _urlExiste = function(url, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].url == url) {
                return true;
            }
        }
        return false;
    };
    var _preencherCache = function(data) {
        for (var i = 0; i < data.suggestions.length; i++) {
            if (!_termoExiste(data.suggestions[i].text, cache.suggestions)) {
                cache.suggestions.push({
                    term: data.suggestions[i].text,
                    score: data.suggestions[i].score
                });
            }
        };
        for (var i = 0; i < data.featured_content.length; i++) {
            if (!_urlExiste(data.featured_content[i].url, cache.featuredContents)) {
                cache.featuredContents.push({
                    term: data.featured_content[i].title,
                    score: data.featured_content[i].score,
                    product: data.featured_content[i].product,
                    publisher: data.featured_content[i].publisher,
                    "parent": data.featured_content[i].parent,
                    url: data.featured_content[i].url,
                    thumbnail: data.featured_content[i].thumbnail
                });
            }
        };
    };
    var _sequence = 0;
    var _found = {};
    return {
        clearCache: function() {
            cache = {
                suggestions: [],
                featuredContents: []
            };
            _found = {};
        },
        init: function(config) {
            config.prioritarios = typeof config.prioritarios !== 'undefined' ? config.prioritarios : [];
            var prioritarios = [];
            for (i = 0; i < config.prioritarios.length; i++) {
                prioritarios.push(config.prioritarios[i].toLowerCase());
            }
            settings.dominio = config.dominio;
            settings.prioritarios = prioritarios;
            this.urlDeBusca = undefined;
        },
        getUrlBusca: function() {
            if (typeof this.urlDeBusca === 'undefined') {
                if (typeof settings.dominio !== 'undefined') {
                    var regexp_url = /^(?:http:\/\/)?(.*?)(?:\/)?(?:busca)?(?:\/)?$/g;
                    this.urlDeBusca = "http://" + regexp_url.exec(settings.dominio)[1] + "/busca";
                } else {
                    this.urlDeBusca = "/busca";
                }
            }
            return this.urlDeBusca;
        },
        preSuggest: function(size, callback) {
            var url = this.getUrlBusca();
            $.get(url + "/suggest", {
                score: true,
                size: size
            }, function(data) {
                _prepararResultadoPreSuggest(size, data, callback);
            });
        },
        suggest: function(termo, size, callback) {
            if (!size.hasOwnProperty('suggestions') && size.hasOwnProperty('featured_contents')) {
                size = {
                    suggestions: size.featured_contents,
                    featured_contents: size.featured_contents
                };
            } else if (size.hasOwnProperty('suggestions') && !size.hasOwnProperty('featured_contents')) {
                size = {
                    suggestions: size.suggestions,
                    featured_contents: size.suggestions
                };
            } else if (!size.hasOwnProperty('suggestions') && !size.hasOwnProperty('featured_contents')) {
                if (typeof size == "object") {
                    size = {
                        suggestions: 3,
                        featured_contents: 7
                    }
                } else {
                    size = {
                        suggestions: size,
                        featured_contents: size
                    }
                }
            }
            _buscarTermosComPrefixo(termo, size, callback);
            var api_size = size.suggestions > size.featured_contents ? size.suggestions : size.featured_contents;
            var key = JSON.stringify(size) + JSON.stringify(termo);
            if (!_found[key]) {
                _found[key] = true;
                _sequence++;
                var seq = _sequence;
                var url = this.getUrlBusca();
                $.get(url + "/suggest", {
                    q: termo,
                    score: true,
                    size: api_size,
                    prioritarios: settings.prioritarios.join()
                }, function(data) {
                    _preencherCache(data);
                    if (seq >= _sequence) {
                        _buscarTermosComPrefixo(termo, size, callback);
                    }
                });
            }
        }
    };
})(jQuery);
String.prototype.endsWith = String.prototype.endsWith || function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
window.jqueryAjaxCache = window.jqueryAjaxCache || (function($, window, document, undefined) {
    'use strict';
    var hasLocalstorage, storage, defaultExpirationMins, jqueryAjaxCache;
    hasLocalstorage = (function() {
        var mod = 'modernizr';
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    })();
    storage = {
        save: function(key, data, expirationMin) {
            if (!hasLocalstorage) {
                return false;
            }
            var expirationMS = expirationMin * 60 * 1000;
            var record = {
                value: data,
                timestamp: new Date().getTime() + expirationMS
            }
            localStorage.setItem(key, JSON.stringify(record));
            return data;
        },
        load: function(key) {
            if (!hasLocalstorage) {
                return false;
            }
            var record = JSON.parse(localStorage.getItem(key));
            if (!record) {
                return false;
            }
            return (new Date().getTime() < record.timestamp && record.value);
        }
    };
    defaultExpirationMins = 15;
    jqueryAjaxCache = {
        ajax: function(url, callback, cacheKey, extraContext, type) {
            var ajaxData, cacheData, ajaxContext, isJsonData, isXmlData;
            cacheKey = (typeof cacheKey !== "undefined") ? cacheKey : url;
            if (typeof type === "undefined" || !type) {
                type = url.split(".");
                type = type[type.length - 1];
            }
            isJsonData = (type == "json" || type == "jsonp");
            isXmlData = (type == "xml" || type == "svg");
            ajaxData = storage.load(cacheKey);
            if (ajaxData) {
                if (isJsonData) {
                    ajaxData = JSON.parse(ajaxData);
                }
                callback(ajaxData);
                return;
            }
            ajaxContext = $.extend({
                url: url,
                jsonp: false,
                cache: true,
                success: function(data) {
                    ajaxData = data;
                },
                error: function(e) {
                    console.error(e);
                },
                complete: function() {
                    if (ajaxData) {
                        if (isJsonData) {
                            cacheData = JSON.stringify(ajaxData);
                        } else if (isXmlData) {
                            cacheData = ajaxData = new XMLSerializer().serializeToString(ajaxData);
                        }
                        storage.save(cacheKey, cacheData, defaultExpirationMins);
                    }
                    callback(ajaxData);
                }
            }, extraContext);
            return $.ajax(ajaxContext);
        },
        get: function(url, callback, cacheKey, type) {
            return this.ajax(url, callback, cacheKey, {}, type);
        },
        getJSON: function(url, callback, cacheKey) {
            var type = url.endsWith("jsonp") ? "jsonp" : "json";
            return this.ajax(url, callback, cacheKey, {
                dataType: type,
                jsonpCallback: (type == "jsonp") ? 'globoapiMenusCallback' : null
            }, type);
        }
    };
    return jqueryAjaxCache;
})(jQuery, this, this.document);
(function(undefined) {
    var moment, VERSION = '2.9.0',
        globalScope = (typeof global !== 'undefined' && (typeof window === 'undefined' || window === global.window)) ? global : this,
        oldGlobalMoment, round = Math.round,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        i, YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        locales = {},
        momentProperties = [],
        hasModule = (typeof module !== 'undefined' && module && module.exports),
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        parseTokenOneOrTwoDigits = /\d\d?/,
        parseTokenOneToThreeDigits = /\d{1,3}/,
        parseTokenOneToFourDigits = /\d{1,4}/,
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/,
        parseTokenDigits = /\d+/,
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi,
        parseTokenT = /T/i,
        parseTokenOffsetMs = /[\+\-]?\d+/,
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/,
        parseTokenOneDigit = /\d/,
        parseTokenTwoDigits = /\d\d/,
        parseTokenThreeDigits = /\d{3}/,
        parseTokenFourDigits = /\d{4}/,
        parseTokenSixDigits = /[+-]?\d{6}/,
        parseTokenSignedNumber = /[+-]?\d+/,
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds': 1,
            'Seconds': 1e3,
            'Minutes': 6e4,
            'Hours': 36e5,
            'Days': 864e5,
            'Months': 2592e6,
            'Years': 31536e6
        },
        unitAliases = {
            ms: 'millisecond',
            s: 'second',
            m: 'minute',
            h: 'hour',
            d: 'day',
            D: 'date',
            w: 'week',
            W: 'isoWeek',
            M: 'month',
            Q: 'quarter',
            y: 'year',
            DDD: 'dayOfYear',
            e: 'weekday',
            E: 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },
        camelFunctions = {
            dayofyear: 'dayOfYear',
            isoweekday: 'isoWeekday',
            isoweek: 'isoWeek',
            weekyear: 'weekYear',
            isoweekyear: 'isoWeekYear'
        },
        formatFunctions = {},
        relativeTimeThresholds = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        },
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),
        formatTokenFunctions = {
            M: function() {
                return this.month() + 1;
            },
            MMM: function(format) {
                return this.localeData().monthsShort(this, format);
            },
            MMMM: function(format) {
                return this.localeData().months(this, format);
            },
            D: function() {
                return this.date();
            },
            DDD: function() {
                return this.dayOfYear();
            },
            d: function() {
                return this.day();
            },
            dd: function(format) {
                return this.localeData().weekdaysMin(this, format);
            },
            ddd: function(format) {
                return this.localeData().weekdaysShort(this, format);
            },
            dddd: function(format) {
                return this.localeData().weekdays(this, format);
            },
            w: function() {
                return this.week();
            },
            W: function() {
                return this.isoWeek();
            },
            YY: function() {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY: function() {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY: function() {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY: function() {
                var y = this.year(),
                    sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg: function() {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg: function() {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg: function() {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG: function() {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG: function() {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG: function() {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e: function() {
                return this.weekday();
            },
            E: function() {
                return this.isoWeekday();
            },
            a: function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), true);
            },
            A: function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), false);
            },
            H: function() {
                return this.hours();
            },
            h: function() {
                return this.hours() % 12 || 12;
            },
            m: function() {
                return this.minutes();
            },
            s: function() {
                return this.seconds();
            },
            S: function() {
                return toInt(this.milliseconds() / 100);
            },
            SS: function() {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS: function() {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS: function() {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z: function() {
                var a = this.utcOffset(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ: function() {
                var a = this.utcOffset(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z: function() {
                return this.zoneAbbr();
            },
            zz: function() {
                return this.zoneName();
            },
            x: function() {
                return this.valueOf();
            },
            X: function() {
                return this.unix();
            },
            Q: function() {
                return this.quarter();
            }
        },
        deprecations = {},
        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'],
        updateInProgress = false;

    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2:
                return a != null ? a : b;
            case 3:
                return a != null ? a : b != null ? b : c;
            default:
                throw new Error('Implement me');
        }
    }

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }

    function defaultParsingFlags() {
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
        };
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function() {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }

    function padToken(func, count) {
        return function(a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }

    function ordinalizeToken(func, period) {
        return function(a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }

    function monthDiff(a, b) {
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;
        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            adjust = (b - anchor) / (anchor2 - anchor);
        }
        return -(wholeMonthDiff + adjust);
    }
    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;
        if (meridiem == null) {
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            return hour;
        }
    }

    function Locale() {}

    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
        if (updateInProgress === false) {
            updateInProgress = true;
            moment.updateOffset(this);
            updateInProgress = false;
        }
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;
        this._milliseconds = +milliseconds +
            seconds * 1e3 +
            minutes * 6e4 +
            hours * 36e5;
        this._days = +days +
            weeks * 7;
        this._months = +months +
            quarters * 3 +
            years * 12;
        this._data = {};
        this._locale = moment.localeData();
        this._bubble();
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }
        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }
        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }
        return a;
    }

    function copyConfig(to, from) {
        var i, prop, val;
        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }
        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }
        return to;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    function positiveMomentsDifference(base, other) {
        var res = {
            milliseconds: 0,
            months: 0
        };
        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }
        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));
        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }
        return res;
    }

    function createAdder(direction, name) {
        return function(val, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val;
                val = period;
                period = tmp;
            }
            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;
        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
    }

    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) || (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp, prop;
        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }
        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;
        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        } else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        } else {
            return;
        }
        moment[field] = function(format, index) {
            var i, getter, method = moment._locale[field],
                results = [];
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }
            getter = function(i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };
            if (index != null) {
                return getter(index);
            } else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;
        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }
        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow = m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH : m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE : m._a[HOUR] < 0 || m._a[HOUR] > 24 || (m._a[HOUR] === 24 && (m._a[MINUTE] !== 0 || m._a[SECOND] !== 0 || m._a[MILLISECOND] !== 0)) ? HOUR : m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE : m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND : m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND : -1;
            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) && m._pf.overflow < 0 && !m._pf.empty && !m._pf.invalidMonth && !m._pf.nullInput && !m._pf.invalidFormat && !m._pf.userInvalidated;
            if (m._strict) {
                m._isValid = m._isValid && m._pf.charsLeftOver === 0 && m._pf.unusedTokens.length === 0 && m._pf.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    function chooseLocale(names) {
        var i = 0,
            j, next, locale, split;
        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                moment.locale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    function makeAs(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (moment.isMoment(input) || isDate(input) ? +input : +moment(input)) - (+res);
            res._d.setTime(+res._d + diff);
            moment.updateOffset(res, false);
            return res;
        } else {
            return moment(input).local();
        }
    }
    extend(Locale.prototype, {
        set: function(config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
        },
        _months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months: function(m) {
            return this._months[m.month()];
        },
        _monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort: function(m) {
            return this._monthsShort[m.month()];
        },
        monthsParse: function(monthName, format, strict) {
            var i, mom, regex;
            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }
            for (i = 0; i < 12; i++) {
                mom = moment.utc([2000, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                    this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
                }
                if (!strict && !this._monthsParse[i]) {
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                    return i;
                } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                    return i;
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },
        _weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays: function(m) {
            return this._weekdays[m.day()];
        },
        _weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort: function(m) {
            return this._weekdaysShort[m.day()];
        },
        _weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin: function(m) {
            return this._weekdaysMin[m.day()];
        },
        weekdaysParse: function(weekdayName) {
            var i, mom, regex;
            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }
            for (i = 0; i < 7; i++) {
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },
        _longDateFormat: {
            LTS: 'h:mm:ss A',
            LT: 'h:mm A',
            L: 'MM/DD/YYYY',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY LT',
            LLLL: 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat: function(key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },
        isPM: function(input) {
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },
        _calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        calendar: function(key, mom, now) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom, [now]) : output;
        },
        _relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        relativeTime: function(number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
        },
        pastFuture: function(diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },
        ordinal: function(number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal: '%d',
        _ordinalParse: /\d{1,2}/,
        preparse: function(string) {
            return string;
        },
        postformat: function(string) {
            return string;
        },
        week: function(mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },
        _week: {
            dow: 0,
            doy: 6
        },
        firstDayOfWeek: function() {
            return this._week.dow;
        },
        firstDayOfYear: function() {
            return this._week.doy;
        },
        _invalidDate: 'Invalid date',
        invalidDate: function() {
            return this._invalidDate;
        }
    });

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i, length;
        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }
        return function(mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }
        format = expandFormat(format, m.localeData());
        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }
        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }
        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }
        return format;
    }

    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
            case 'Q':
                return parseTokenOneDigit;
            case 'DDDD':
                return parseTokenThreeDigits;
            case 'YYYY':
            case 'GGGG':
            case 'gggg':
                return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
            case 'Y':
            case 'G':
            case 'g':
                return parseTokenSignedNumber;
            case 'YYYYYY':
            case 'YYYYY':
            case 'GGGGG':
            case 'ggggg':
                return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
            case 'S':
                if (strict) {
                    return parseTokenOneDigit;
                }
            case 'SS':
                if (strict) {
                    return parseTokenTwoDigits;
                }
            case 'SSS':
                if (strict) {
                    return parseTokenThreeDigits;
                }
            case 'DDD':
                return parseTokenOneToThreeDigits;
            case 'MMM':
            case 'MMMM':
            case 'dd':
            case 'ddd':
            case 'dddd':
                return parseTokenWord;
            case 'a':
            case 'A':
                return config._locale._meridiemParse;
            case 'x':
                return parseTokenOffsetMs;
            case 'X':
                return parseTokenTimestampMs;
            case 'Z':
            case 'ZZ':
                return parseTokenTimezone;
            case 'T':
                return parseTokenT;
            case 'SSSS':
                return parseTokenDigits;
            case 'MM':
            case 'DD':
            case 'YY':
            case 'GG':
            case 'gg':
            case 'HH':
            case 'hh':
            case 'mm':
            case 'ss':
            case 'ww':
            case 'WW':
                return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
            case 'M':
            case 'D':
            case 'd':
            case 'H':
            case 'h':
            case 'm':
            case 's':
            case 'w':
            case 'W':
            case 'e':
            case 'E':
                return parseTokenOneOrTwoDigits;
            case 'Do':
                return strict ? config._locale._ordinalParse : config._locale._ordinalParseLenient;
            default:
                a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
                return a;
        }
    }

    function utcOffsetFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);
        return parts[0] === '+' ? minutes : -minutes;
    }

    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;
        switch (token) {
            case 'Q':
                if (input != null) {
                    datePartArray[MONTH] = (toInt(input) - 1) * 3;
                }
                break;
            case 'M':
            case 'MM':
                if (input != null) {
                    datePartArray[MONTH] = toInt(input) - 1;
                }
                break;
            case 'MMM':
            case 'MMMM':
                a = config._locale.monthsParse(input, token, config._strict);
                if (a != null) {
                    datePartArray[MONTH] = a;
                } else {
                    config._pf.invalidMonth = input;
                }
                break;
            case 'D':
            case 'DD':
                if (input != null) {
                    datePartArray[DATE] = toInt(input);
                }
                break;
            case 'Do':
                if (input != null) {
                    datePartArray[DATE] = toInt(parseInt(input.match(/\d{1,2}/)[0], 10));
                }
                break;
            case 'DDD':
            case 'DDDD':
                if (input != null) {
                    config._dayOfYear = toInt(input);
                }
                break;
            case 'YY':
                datePartArray[YEAR] = moment.parseTwoDigitYear(input);
                break;
            case 'YYYY':
            case 'YYYYY':
            case 'YYYYYY':
                datePartArray[YEAR] = toInt(input);
                break;
            case 'a':
            case 'A':
                config._meridiem = input;
                break;
            case 'h':
            case 'hh':
                config._pf.bigHour = true;
            case 'H':
            case 'HH':
                datePartArray[HOUR] = toInt(input);
                break;
            case 'm':
            case 'mm':
                datePartArray[MINUTE] = toInt(input);
                break;
            case 's':
            case 'ss':
                datePartArray[SECOND] = toInt(input);
                break;
            case 'S':
            case 'SS':
            case 'SSS':
            case 'SSSS':
                datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
                break;
            case 'x':
                config._d = new Date(toInt(input));
                break;
            case 'X':
                config._d = new Date(parseFloat(input) * 1000);
                break;
            case 'Z':
            case 'ZZ':
                config._useUTC = true;
                config._tzm = utcOffsetFromString(input);
                break;
            case 'dd':
            case 'ddd':
            case 'dddd':
                a = config._locale.weekdaysParse(input);
                if (a != null) {
                    config._w = config._w || {};
                    config._w['d'] = a;
                } else {
                    config._pf.invalidWeekday = input;
                }
                break;
            case 'w':
            case 'ww':
            case 'W':
            case 'WW':
            case 'd':
            case 'e':
            case 'E':
                token = token.substr(0, 1);
            case 'gggg':
            case 'GGGG':
            case 'GGGGG':
                token = token.substr(0, 2);
                if (input) {
                    config._w = config._w || {};
                    config._w[token] = toInt(input);
                }
                break;
            case 'gg':
            case 'GG':
                config._w = config._w || {};
                config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;
        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);
            if (w.d != null) {
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                weekday = w.e + dow;
            } else {
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    function dateFromConfig(config) {
        var i, date, input = [],
            currentDate, yearToUse;
        if (config._d) {
            return;
        }
        currentDate = currentDateArray(config);
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);
            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }
            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }
        if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }
        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }
        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dateFromObject(config) {
        var normalizedInput;
        if (config._d) {
            return;
        }
        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [normalizedInput.year, normalizedInput.month, normalizedInput.day || normalizedInput.date, normalizedInput.hour, normalizedInput.minute, normalizedInput.second, normalizedInput.millisecond];
        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }
        config._a = [];
        config._pf.empty = true;
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped, stringLength = string.length,
            totalParsedInputLength = 0;
        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];
        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                } else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }
        if (config._pf.bigHour === true && config._a[HOUR] <= 12) {
            config._pf.bigHour = undefined;
        }
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    function makeDateFromStringAndArray(config) {
        var tempConfig, bestMoment, scoreToBeat, i, currentScore;
        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }
        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);
            if (!isValid(tempConfig)) {
                continue;
            }
            currentScore += tempConfig._pf.charsLeftOver;
            currentScore += tempConfig._pf.unusedTokens.length * 10;
            tempConfig._pf.score = currentScore;
            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }
        extend(config, bestMoment || tempConfig);
    }

    function parseISO(config) {
        var i, l, string = config._i,
            match = isoRegex.exec(string);
        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function(obj) {
                return parseInt(obj, 10);
            });
            dateFromConfig(config);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        var date = new Date(y, m, d, h, M, s, ms);
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            } else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            years = round(duration.as('y')),
            args = seconds < relativeTimeThresholds.s && ['s', seconds] || minutes === 1 && ['m'] || minutes < relativeTimeThresholds.m && ['mm', minutes] || hours === 1 && ['h'] || hours < relativeTimeThresholds.h && ['hh', hours] || days === 1 && ['d'] || days < relativeTimeThresholds.d && ['dd', days] || months === 1 && ['M'] || months < relativeTimeThresholds.M && ['MM', months] || years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }

    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;
        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }
        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }
        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(),
            daysToAdd, dayOfYear;
        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;
        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ? dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    function makeMoment(config) {
        var input = config._i,
            format = config._f,
            res;
        config._locale = config._locale || moment.localeData(config._l);
        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({
                nullInput: true
            });
        }
        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }
        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }
        res = new Moment(config);
        if (res._nextDay) {
            res.add(1, 'd');
            res._nextDay = undefined;
        }
        return res;
    }
    moment = function(input, format, locale, strict) {
        var c;
        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();
        return makeMoment(c);
    };
    moment.suppressDeprecationWarnings = false;
    moment.createFromInputFallback = deprecate('moment construction falls back to js Date. This is ' + 'discouraged and will be removed in upcoming major ' + 'release. Please refer to ' + 'https://github.com/moment/moment/issues/1407 for more info.', function(config) {
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
    });

    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }
    moment.min = function() {
        var args = [].slice.call(arguments, 0);
        return pickBy('isBefore', args);
    };
    moment.max = function() {
        var args = [].slice.call(arguments, 0);
        return pickBy('isAfter', args);
    };
    moment.utc = function(input, format, locale, strict) {
        var c;
        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();
        return makeMoment(c).utc();
    };
    moment.unix = function(input) {
        return moment(input * 1000);
    };
    moment.duration = function(input, key) {
        var duration = input,
            match = null,
            sign, ret, parseIso, diffRes;
        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function(inp) {
                var res = inp && parseFloat(inp.replace(',', '.'));
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (duration == null) {
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }
        ret = new Duration(duration);
        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }
        return ret;
    };
    moment.version = VERSION;
    moment.defaultFormat = isoFormat;
    moment.ISO_8601 = function() {};
    moment.momentProperties = momentProperties;
    moment.updateOffset = function() {};
    moment.relativeTimeThreshold = function(threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };
    moment.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', function(key, value) {
        return moment.locale(key, value);
    });
    moment.locale = function(key, values) {
        var data;
        if (key) {
            if (typeof(values) !== 'undefined') {
                data = moment.defineLocale(key, values);
            } else {
                data = moment.localeData(key);
            }
            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }
        return moment._locale._abbr;
    };
    moment.defineLocale = function(name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);
            moment.locale(name);
            return locales[name];
        } else {
            delete locales[name];
            return null;
        }
    };
    moment.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', function(key) {
        return moment.localeData(key);
    });
    moment.localeData = function(key) {
        var locale;
        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }
        if (!key) {
            return moment._locale;
        }
        if (!isArray(key)) {
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }
        return chooseLocale(key);
    };
    moment.isMoment = function(obj) {
        return obj instanceof Moment || (obj != null && hasOwnProp(obj, '_isAMomentObject'));
    };
    moment.isDuration = function(obj) {
        return obj instanceof Duration;
    };
    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }
    moment.normalizeUnits = function(units) {
        return normalizeUnits(units);
    };
    moment.invalid = function(flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        } else {
            m._pf.userInvalidated = true;
        }
        return m;
    };
    moment.parseZone = function() {
        return moment.apply(null, arguments).parseZone();
    };
    moment.parseTwoDigitYear = function(input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };
    moment.isDate = isDate;
    extend(moment.fn = Moment.prototype, {
        clone: function() {
            return moment(this);
        },
        valueOf: function() {
            return +this._d - ((this._offset || 0) * 60000);
        },
        unix: function() {
            return Math.floor(+this / 1000);
        },
        toString: function() {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        },
        toDate: function() {
            return this._offset ? new Date(+this) : this._d;
        },
        toISOString: function() {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                if ('function' === typeof Date.prototype.toISOString) {
                    return this.toDate().toISOString();
                } else {
                    return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
                }
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },
        toArray: function() {
            var m = this;
            return [m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds(), m.milliseconds()];
        },
        isValid: function() {
            return isValid(this);
        },
        isDSTShifted: function() {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }
            return false;
        },
        parsingFlags: function() {
            return extend({}, this._pf);
        },
        invalidAt: function() {
            return this._pf.overflow;
        },
        utc: function(keepLocalTime) {
            return this.utcOffset(0, keepLocalTime);
        },
        local: function(keepLocalTime) {
            if (this._isUTC) {
                this.utcOffset(0, keepLocalTime);
                this._isUTC = false;
                if (keepLocalTime) {
                    this.subtract(this._dateUtcOffset(), 'm');
                }
            }
            return this;
        },
        format: function(inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },
        add: createAdder(1, 'add'),
        subtract: createAdder(-1, 'subtract'),
        diff: function(input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (that.utcOffset() - this.utcOffset()) * 6e4,
                anchor, diff, output, daysAdjust;
            units = normalizeUnits(units);
            if (units === 'year' || units === 'month' || units === 'quarter') {
                output = monthDiff(this, that);
                if (units === 'quarter') {
                    output = output / 3;
                } else if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = this - that;
                output = units === 'second' ? diff / 1e3 : units === 'minute' ? diff / 6e4 : units === 'hour' ? diff / 36e5 : units === 'day' ? (diff - zoneDiff) / 864e5 : units === 'week' ? (diff - zoneDiff) / 6048e5 : diff;
            }
            return asFloat ? output : absRound(output);
        },
        from: function(time, withoutSuffix) {
            return moment.duration({
                to: this,
                from: time
            }).locale(this.locale()).humanize(!withoutSuffix);
        },
        fromNow: function(withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },
        calendar: function(time) {
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this, moment(now)));
        },
        isLeapYear: function() {
            return isLeapYear(this.year());
        },
        isDST: function() {
            return (this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset());
        },
        day: function(input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        },
        month: makeAccessor('Month', true),
        startOf: function(units) {
            units = normalizeUnits(units);
            switch (units) {
                case 'year':
                    this.month(0);
                case 'quarter':
                case 'month':
                    this.date(1);
                case 'week':
                case 'isoWeek':
                case 'day':
                    this.hours(0);
                case 'hour':
                    this.minutes(0);
                case 'minute':
                    this.seconds(0);
                case 'second':
                    this.milliseconds(0);
            }
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }
            return this;
        },
        endOf: function(units) {
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond') {
                return this;
            }
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },
        isAfter: function(input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return inputMs < +this.clone().startOf(units);
            }
        },
        isBefore: function(input, units) {
            var inputMs;
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            } else {
                inputMs = moment.isMoment(input) ? +input : +moment(input);
                return +this.clone().endOf(units) < inputMs;
            }
        },
        isBetween: function(from, to, units) {
            return this.isAfter(from, units) && this.isBefore(to, units);
        },
        isSame: function(input, units) {
            var inputMs;
            units = normalizeUnits(units || 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            } else {
                inputMs = +moment(input);
                return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
            }
        },
        min: deprecate('moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548', function(other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        }),
        max: deprecate('moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548', function(other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        }),
        zone: deprecate('moment().zone is deprecated, use moment().utcOffset instead. ' + 'https://github.com/moment/moment/issues/1779', function(input, keepLocalTime) {
            if (input != null) {
                if (typeof input !== 'string') {
                    input = -input;
                }
                this.utcOffset(input, keepLocalTime);
                return this;
            } else {
                return -this.utcOffset();
            }
        }),
        utcOffset: function(input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = utcOffsetFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._dateUtcOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.add(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this, moment.duration(input - offset, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
                return this;
            } else {
                return this._isUTC ? offset : this._dateUtcOffset();
            }
        },
        isLocal: function() {
            return !this._isUTC;
        },
        isUtcOffset: function() {
            return this._isUTC;
        },
        isUtc: function() {
            return this._isUTC && this._offset === 0;
        },
        zoneAbbr: function() {
            return this._isUTC ? 'UTC' : '';
        },
        zoneName: function() {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },
        parseZone: function() {
            if (this._tzm) {
                this.utcOffset(this._tzm);
            } else if (typeof this._i === 'string') {
                this.utcOffset(utcOffsetFromString(this._i));
            }
            return this;
        },
        hasAlignedHourOffset: function(input) {
            if (!input) {
                input = 0;
            } else {
                input = moment(input).utcOffset();
            }
            return (this.utcOffset() - input) % 60 === 0;
        },
        daysInMonth: function() {
            return daysInMonth(this.year(), this.month());
        },
        dayOfYear: function(input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },
        quarter: function(input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },
        weekYear: function(input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },
        isoWeekYear: function(input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },
        week: function(input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },
        isoWeek: function(input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },
        weekday: function(input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },
        isoWeekday: function(input) {
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },
        isoWeeksInYear: function() {
            return weeksInYear(this.year(), 1, 4);
        },
        weeksInYear: function() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },
        get: function(units) {
            units = normalizeUnits(units);
            return this[units]();
        },
        set: function(units, value) {
            var unit;
            if (typeof units === 'object') {
                for (unit in units) {
                    this.set(unit, units[unit]);
                }
            } else {
                units = normalizeUnits(units);
                if (typeof this[units] === 'function') {
                    this[units](value);
                }
            }
            return this;
        },
        locale: function(key) {
            var newLocaleData;
            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },
        lang: deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function(key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }),
        localeData: function() {
            return this._locale;
        },
        _dateUtcOffset: function() {
            return -Math.round(this._d.getTimezoneOffset() / 15) * 15;
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            if (typeof value !== 'number') {
                return mom;
            }
        }
        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function(value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }
    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;
    moment.fn.toJSON = moment.fn.toISOString;
    moment.fn.isUTC = moment.fn.isUtc;

    function daysToYears(days) {
        return days * 400 / 146097;
    }

    function yearsToDays(years) {
        return years * 146097 / 400;
    }
    extend(moment.duration.fn = Duration.prototype, {
        _bubble: function() {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;
            data.milliseconds = milliseconds % 1000;
            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;
            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;
            hours = absRound(minutes / 60);
            data.hours = hours % 24;
            days += absRound(hours / 24);
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));
            months += absRound(days / 30);
            days %= 30;
            years += absRound(months / 12);
            months %= 12;
            data.days = days;
            data.months = months;
            data.years = years;
        },
        abs: function() {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);
            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);
            return this;
        },
        weeks: function() {
            return absRound(this.days() / 7);
        },
        valueOf: function() {
            return this._milliseconds +
                this._days * 864e5 +
                (this._months % 12) * 2592e6 +
                toInt(this._months / 12) * 31536e6;
        },
        humanize: function(withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());
            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }
            return this.localeData().postformat(output);
        },
        add: function(input, val) {
            var dur = moment.duration(input, val);
            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;
            this._bubble();
            return this;
        },
        subtract: function(input, val) {
            var dur = moment.duration(input, val);
            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;
            this._bubble();
            return this;
        },
        get: function(units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },
        as: function(units) {
            var days, months;
            units = normalizeUnits(units);
            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                days = this._days + Math.round(yearsToDays(this._months / 12));
                switch (units) {
                    case 'week':
                        return days / 7 + this._milliseconds / 6048e5;
                    case 'day':
                        return days + this._milliseconds / 864e5;
                    case 'hour':
                        return days * 24 + this._milliseconds / 36e5;
                    case 'minute':
                        return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second':
                        return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    case 'millisecond':
                        return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default:
                        throw new Error('Unknown unit ' + units);
                }
            }
        },
        lang: moment.fn.lang,
        locale: moment.fn.locale,
        toIsoString: deprecate('toIsoString() is deprecated. Please use toISOString() instead ' + '(notice the capitals)', function() {
            return this.toISOString();
        }),
        toISOString: function() {
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);
            if (!this.asSeconds()) {
                return 'P0D';
            }
            return (this.asSeconds() < 0 ? '-' : '') + 'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },
        localeData: function() {
            return this._locale;
        },
        toJSON: function() {
            return this.toISOString();
        }
    });
    moment.duration.fn.toString = moment.duration.fn.toISOString;

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function() {
            return this._data[name];
        };
    }
    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }
    moment.duration.fn.asMilliseconds = function() {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function() {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function() {
        return this.as('m');
    };
    moment.duration.fn.asHours = function() {
        return this.as('h');
    };
    moment.duration.fn.asDays = function() {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function() {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function() {
        return this.as('M');
    };
    moment.duration.fn.asYears = function() {
        return this.as('y');
    };
    moment.locale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' : (b === 1) ? 'st' : (b === 2) ? 'nd' : (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    function makeGlobal(shouldDeprecate) {
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate('Accessing Moment through the global scope is ' + 'deprecated, and will be removed in an upcoming ' + 'release.', moment);
        } else {
            globalScope.moment = moment;
        }
    }
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define(function(require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                globalScope.moment = oldGlobalMoment;
            }
            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment'));
    } else {
        factory((typeof global !== 'undefined' ? global : this).moment);
    }
}(function(moment) {
    return moment.defineLocale('pt-br', {
        months: 'janeiro_fevereiro_marÃ§o_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
        monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
        weekdays: 'domingo_segunda-feira_terÃ§a-feira_quarta-feira_quinta-feira_sexta-feira_sÃ¡bado'.split('_'),
        weekdaysShort: 'dom_seg_ter_qua_qui_sex_sÃ¡b'.split('_'),
        weekdaysMin: 'dom_2Âª_3Âª_4Âª_5Âª_6Âª_sÃ¡b'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'LT:ss',
            L: 'DD/MM/YYYY',
            LL: 'D [de] MMMM [de] YYYY',
            LLL: 'D [de] MMMM [de] YYYY [Ã s] LT',
            LLLL: 'dddd, D [de] MMMM [de] YYYY [Ã s] LT'
        },
        calendar: {
            sameDay: '[Hoje Ã s] LT',
            nextDay: '[AmanhÃ£ Ã s] LT',
            nextWeek: 'dddd [Ã s] LT',
            lastDay: '[Ontem Ã s] LT',
            lastWeek: function() {
                return (this.day() === 0 || this.day() === 6) ? '[Ãšltimo] dddd [Ã s] LT' : '[Ãšltima] dddd [Ã s] LT';
            },
            sameElse: 'L'
        },
        relativeTime: {
            future: 'em %s',
            past: 'hÃ¡ %s',
            s: 'segundos',
            m: 'um minuto',
            mm: '%d minutos',
            h: 'uma hora',
            hh: '%d horas',
            d: 'um dia',
            dd: '%d dias',
            M: 'um mÃªs',
            MM: '%d meses',
            y: 'um ano',
            yy: '%d anos'
        },
        ordinalParse: /\d{1,2}Âº/,
        ordinal: '%dÂº'
    });
}));
(function() {
    var $body, $document, $html, $window, ReguaNavegacaoBusca, shouldNotAutoLoad, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    $window = $(window);
    $document = $(document);
    $html = $("html");
    $body = $("body");
    ReguaNavegacaoBusca = (function() {
        function ReguaNavegacaoBusca() {
            this.suggestLoader = bind(this.suggestLoader, this);
            this.submitForm = bind(this.submitForm, this);
            this.preSuggest = bind(this.preSuggest, this);
            this.eventTyping = bind(this.eventTyping, this);
            this.eventClose = bind(this.eventClose, this);
            this.eventOpen = bind(this.eventOpen, this);
            this.buscaClose = bind(this.buscaClose, this);
            this.buscaOpen = bind(this.buscaOpen, this);
            this.formAction = bind(this.formAction, this);
            this.scrolled = bind(this.scrolled, this);
            this.trackBlurTouchStart = bind(this.trackBlurTouchStart, this);
            this.blurOnTouchStart = bind(this.blurOnTouchStart, this);
            this.init = bind(this.init, this);
            if (window.glb.currentReguaNavegacao != null) {
                this.init();
            } else {
                this.waitForReguaNavegacaoToInit((function(_this) {
                    return function() {
                        return _this.init();
                    };
                })(this));
            }
        }
        ReguaNavegacaoBusca.prototype.cacheVariables = function() {
            this.regua = $('#regua-navegacao');
            this.aba = $('#regua-tab-busca');
            this.search_header = this.aba.find('.regua-search-header');
            this.search_form = this.aba.find('.regua-search-form');
            this.search_input = this.aba.find('.regua-search-input');
            this.search_button_go = this.aba.find('.search-button-go');
            this.search_buttons = this.aba.find('.regua-search-buttons-container');
            this.search_clear_button = this.aba.find('.regua-search-clear-button');
            this.suggest = this.aba.find('.regua-suggest');
            this.container_results = this.aba.find('.regua-container-search-body');
            this.pre_suggest = this.aba.find('.regua-pre-suggest');
            this.container_suggest = this.aba.find('.regua-container-suggest');
            this.settings = window.REGUA_SETTINGS;
            this.touchstart = 0;
            return this.posTop = 0;
        };
        ReguaNavegacaoBusca.prototype.init = function() {
            if (this.initCalled) {
                return;
            }
            this.cacheVariables();
            this.aba.detach().prependTo($body);
            this.eventOpen();
            this.eventClose();
            this.eventTyping();
            this.preSuggest();
            this.formAction();
            this.bind();
            this.scrolled();
            this.hideReguaOnFocus();
            return this.blurOnTouchStart();
        };
        ReguaNavegacaoBusca.prototype.blurOnTouchStart = function() {
            return this.aba.on('touchstart', this.trackBlurTouchStart);
        };
        ReguaNavegacaoBusca.prototype.trackBlurTouchStart = function() {
            return this.search_input.blur();
        };
        ReguaNavegacaoBusca.prototype.waitForReguaNavegacaoToInit = function(callback) {
            return $document.on("glb.regua.init", callback);
        };
        ReguaNavegacaoBusca.prototype.getUserAgent = function() {
            if (window.getUserAgent) {
                return window.getUserAgent();
            }
            return window.navigator.userAgent;
        };
        ReguaNavegacaoBusca.prototype.isAndroid = function() {
            var ua;
            ua = this.getUserAgent();
            if (ua.match(/(Android)/g)) {
                return true;
            }
            return false;
        };
        ReguaNavegacaoBusca.prototype.isOnApp = function() {
            return $html.hasClass("glb-on-app");
        };
        ReguaNavegacaoBusca.prototype.hideReguaOnFocus = function() {
            if (this.isAndroid() && !this.isOnApp()) {
                this.search_input.on('focus', (function(_this) {
                    return function() {
                        return setTimeout(function() {
                            return $html.addClass('regua-slide-down');
                        });
                    };
                })(this));
                return this.search_input.on('blur', (function(_this) {
                    return function() {
                        return $html.removeClass('regua-slide-down');
                    };
                })(this));
            }
        };
        ReguaNavegacaoBusca.prototype.bind = function() {
            this.search_button_go.on("click", (function(_this) {
                return function(e) {
                    var query;
                    query = _this.search_input.val();
                    _this.submitForm(query);
                    return false;
                };
            })(this));
            return this.search_form.on("submit", (function(_this) {
                return function() {
                    var query;
                    query = _this.search_input.val();
                    return $document.trigger("glb.busca.searched", [query]);
                };
            })(this));
        };
        ReguaNavegacaoBusca.prototype.scrolled = function() {
            var scrolledEvent;
            scrolledEvent = (function(_this) {
                return function() {
                    var distance;
                    _this.search_input.blur();
                    distance = _this.container_results.scrollTop();
                    if (distance > 10) {
                        _this.search_header.addClass('scrolled');
                    } else {
                        _this.search_header.removeClass('scrolled');
                    }
                };
            })(this);
            this.container_results.on("touchmove", scrolledEvent);
            return this.container_results.on("scroll", scrolledEvent);
        };
        ReguaNavegacaoBusca.prototype.formAction = function() {
            var buscaPath, portal;
            portal = this.settings.portalHome;
            if (portal) {
                buscaPath = 'busca/';
                portal = portal.replace("index.html", "");
                return this.aba.find('form').attr('action', portal + buscaPath);
            }
        };
        ReguaNavegacaoBusca.prototype.isIosGreaterThanSeven = function() {
            return !!navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS [8-9]_\d/i);
        };
        ReguaNavegacaoBusca.prototype.buscaOpen = function() {
            return this.aba.addClass('regua-busca-open');
        };
        ReguaNavegacaoBusca.prototype.buscaClose = function() {
            return this.aba.removeClass('regua-busca-open');
        };
        ReguaNavegacaoBusca.prototype.eventOpen = function() {
            var open;
            open = (function(_this) {
                return function() {
                    _this.buscaOpen();
                    return false;
                };
            })(this);
            return $document.on("glb.busca.open", open);
        };
        ReguaNavegacaoBusca.prototype.eventClose = function() {
            var close;
            close = (function(_this) {
                return function() {
                    _this.buscaClose();
                    return false;
                };
            })(this);
            return $document.on("glb.busca.close", close);
        };
        ReguaNavegacaoBusca.prototype.eventTyping = function() {
            var keyup;
            keyup = (function(_this) {
                return function(e) {
                    var query;
                    query = _this.search_input.val();
                    if (query.length || e.keycode) {
                        _this.search_buttons.addClass('animate');
                        _this.suggestLoader(query);
                        return _this.search_clear_button.on('click', function() {
                            _this.search_input.val('');
                            _this.search_buttons.removeClass('animate');
                            _this.pre_suggest.fadeIn('fast');
                            return _this.container_suggest.hide();
                        });
                    } else {
                        _this.search_buttons.removeClass('animate');
                        _this.pre_suggest.fadeIn('fast');
                        return _this.container_suggest.hide();
                    }
                };
            })(this);
            return this.search_input.on('keyup paste cut input', keyup);
        };
        ReguaNavegacaoBusca.prototype.preSuggest = function() {
            var portal, suggestUrl, urlQuery;
            portal = this.settings.portalName;
            if (portal === 'famosos') {
                portal = 'ego';
            }
            urlQuery = portal || 'g1';
            suggestUrl = this.settings.suggestUrl || "";
            if (suggestUrl.length) {
                suggestjs.init({
                    prioritarios: [urlQuery],
                    dominio: this.settings.suggestUrl.replace(/.*?:\/\//g, "")
                });
            } else {
                suggestjs.init({
                    prioritarios: [urlQuery]
                });
            }
            suggestjs.preSuggest(10, (function(_this) {
                return function(data) {
                    var content, htmlOut, i;
                    htmlOut = '';
                    htmlOut += '<li class="regua-list-label">mais buscados:</li>';
                    i = 0;
                    while (i < data.length) {
                        content = data[i];
                        htmlOut += "<li class=\"pre-suggest-item\">";
                        htmlOut += "<a href=\"#\" class=\"regua-pre-suggest-item-link\">";
                        htmlOut += "<div class=\"regua-table\">";
                        htmlOut += "<div class=\"regua-table-cell pre-suggest-icon-container\">";
                        htmlOut += "<svg class=\"regua-pre-suggest-icon\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#eixo-icone-busca\"></use></svg>";
                        htmlOut += "</div>";
                        htmlOut += "<div class=\"regua-table-cell regua-pre-suggest-text-container\">";
                        htmlOut += "<div class=\"regua-pre-suggest-text\">" + content.term + "</div>";
                        htmlOut += "</div></div></a></li>";
                        i++;
                    }
                    _this.pre_suggest.fadeIn('fast');
                    _this.pre_suggest.html(htmlOut);
                    return $('.regua-pre-suggest-item-link').on("click", function(e) {
                        var term;
                        term = $(e.target).text();
                        _this.submitForm(term);
                        return false;
                    });
                };
            })(this));
        };
        ReguaNavegacaoBusca.prototype.submitForm = function(query) {
            if (query !== '') {
                this.search_input.val(query);
                this.search_form.submit();
            } else {
                this.search_form.submit();
            }
            return false;
        };
        ReguaNavegacaoBusca.prototype.suggestLoader = function(query) {
            suggestjs.suggest(query, {
                suggestions: 7,
                featured_contents: 3
            }, (function(_this) {
                return function(response) {
                    var content, htmlOut, i, primary_product, secondary_product;
                    htmlOut = '';
                    i = 0;
                    while (i < response.featured_content.length) {
                        content = response.featured_content[i];
                        if (content.publisher) {
                            primary_product = 'regua-suggest-nav-' + content.publisher;
                        } else {
                            primary_product = '';
                        }
                        if (content.product) {
                            secondary_product = 'regua-suggest-nav-' + content.product;
                        } else {
                            secondary_product = '';
                        }
                        htmlOut += '<li class="' + primary_product.toLowerCase() + ' ' + secondary_product.toLowerCase() + '">';
                        htmlOut += '<a class="feature-content-link regua-nav-item-link" href="' + content.url + '">';
                        htmlOut += '<div class="regua-table">';
                        htmlOut += '<div class="regua-table-cell regua-suggest-icon-container">';
                        htmlOut += '<div class="regua-icon-block regua-nav-icon-block">';
                        htmlOut += '<svg class="regua-navegacao-icon">';
                        htmlOut += '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eixo-icone-busca"></use>';
                        htmlOut += '</svg>';
                        htmlOut += '</div>';
                        htmlOut += '</div>';
                        htmlOut += '<div class="regua-table-cell regua-suggest-text-container">';
                        htmlOut += '<div class="regua-suggest-nav-text">' + content.term + '</div>';
                        htmlOut += '<div class="regua-suggest-nav-desc">em <span class="regua-parent">' + content.parent + '</span></div>';
                        htmlOut += '</div></div></a></li>';
                        i++;
                    }
                    i = 0;
                    while (i < response.suggestions.length) {
                        content = response.suggestions[i];
                        htmlOut += '<li class="regua-suggest-item">';
                        htmlOut += '<a class="regua-suggest-link-result regua-pre-suggest-item-link" href="#">';
                        htmlOut += '<div class="regua-table">';
                        htmlOut += '<div class="regua-table-cell regua-suggest-icon-container">';
                        htmlOut += '<div class="regua-icon-block regua-nav-icon-block">';
                        htmlOut += '<svg class="regua-navegacao-icon">';
                        htmlOut += '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eixo-icone-busca"></use>';
                        htmlOut += '</svg>';
                        htmlOut += '</div>';
                        htmlOut += '</div>';
                        htmlOut += '<div class="regua-table-cell regua-suggest-text-container">';
                        htmlOut += '<div class="regua-suggest-text">' + content.term + '</div>';
                        htmlOut += '</div></div></a></li>';
                        i++;
                    }
                    htmlOut += '<li class="regua-suggest-item">';
                    htmlOut += '<a class="regua-pre-suggest-item-link regua-suggest-link-result-single" href="#">';
                    htmlOut += '<div class="regua-table">';
                    htmlOut += '<div class="regua-table-cell regua-suggest-icon-container">';
                    htmlOut += '<div class="regua-icon-block">';
                    htmlOut += '<svg class="regua-navegacao-icon">';
                    htmlOut += '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eixo-icone-busca"></use>';
                    htmlOut += '</svg>';
                    htmlOut += '</div>';
                    htmlOut += '</div>';
                    htmlOut += '<div class="regua-table-cell suggest-text-container">';
                    htmlOut += '<div class="regua-suggest-text regua-suggest-search-by"><span>buscar por</span> <span class="regua-suggest-search-by-term">' + query + '</span></div>';
                    htmlOut += '</div></div></a></li>';
                    if (query.length >= 2) {
                        _this.pre_suggest.hide();
                        _this.search_buttons.addClass('animate');
                        _this.container_suggest.fadeIn('fast');
                        _this.suggest.html(htmlOut);
                        $(window).scrollTop(0);
                        $('.regua-suggest-link-result-single').on("click", function(e) {
                            var term;
                            term = $(e.currentTarget).find('.regua-suggest-search-by-term').text();
                            _this.submitForm(term);
                            return false;
                        });
                        $('.regua-suggest-link-result').on("click", function(e) {
                            var term;
                            term = $(e.currentTarget).text();
                            _this.submitForm(term);
                            return false;
                        });
                        _this.aba.find('.feature-content-link').on("click", function() {
                            var link;
                            link = $(this).attr("href").trim();
                            return $document.trigger("glb.busca.featureContent", [link]);
                        });
                    }
                };
            })(this));
        };
        return ReguaNavegacaoBusca;
    })();
    window.glb = window.glb || {};
    window.glb.ReguaNavegacaoBusca = ReguaNavegacaoBusca;
    window.loadReguaBusca = function() {
        if ($html.hasClass("has-regua")) {
            return window.glb.currentReguaNavegacaoBusca = new window.glb.ReguaNavegacaoBusca();
        }
    };
    shouldNotAutoLoad = (window.noAutoLoadReguaNavegacao != null) && window.noAutoLoadReguaNavegacao;
    if (!shouldNotAutoLoad) {
        window.loadReguaBusca();
    }
}).call(this);
(function() {
    var $body, $document, $html, $window, ReguaNavegacao, debounce, html, shouldNotAutoLoad, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    $window = $(window);
    $document = $(document);
    $html = $("html");
    html = $html[0];
    $body = $("body");
    debounce = function(func, wait, immediate) {
        var timeout;
        timeout = null;
        return function() {
            var args, callNow, context, later;
            context = this;
            args = arguments;
            later = function() {
                timeout = null;
                if (!immediate) {
                    return func.apply(context, args);
                }
            };
            callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                return func.apply(context, args);
            }
        };
    };
    ReguaNavegacao = (function() {
        function ReguaNavegacao(isTouchable) {
            this.isTouchable = isTouchable;
            this.changeCurrentActiveItem = bind(this.changeCurrentActiveItem, this);
            this.addClass = window.glb.addClass;
            this.removeClass = window.glb.removeClass;
            this.hasClass = window.glb.hasClass;
            this.cacheVariables();
            this.getSvg();
            this.changeDom();
            this.aplicarEventosNaRegua();
            this.bind();
            this.refresh();
            this.setVersion();
            this.triggerReguaInit();
        }
        ReguaNavegacao.prototype.setVersion = function() {
            return this.version = "1.3.10";
        };
        ReguaNavegacao.prototype.cacheVariables = function() {
            this.settings = window.REGUA_SETTINGS;
            this.container = $('#regua-navegacao');
            this.reguaNavegacaoFooterHtml = "<div class=\"regua-navegacao-footer\"></div>";
            this.portal = {
                name: this.settings != null ? this.settings.portalName : "",
                home: this.settings != null ? this.trimUrl(this.settings.portalHome) : ""
            };
            this.svgSpriteName = this.settings.svgSpriteName;
            this.svgSpritePath = this.settings.staticUrl + "regua-navegacao/img/sprites/" + this.svgSpriteName;
            this.elements = {};
            this.elements.svgContainer = $('#regua-svg-container');
            this.elements.reguaLista = this.container.find('.regua-lista');
            this.elements.reguaListaItems = this.elements.reguaLista.find('.regua-navegacao-item');
            this.elements.reguaListaLinks = this.elements.reguaListaItems.find('.regua-navegacao-link');
            this.elements.homeItem = this.elements.reguaListaItems.first();
            this.elements.activeItem = this.elements.homeItem[0];
            this.createReguaListaMap();
            this.homeScroll = 0;
            this.heights = {
                container: this.container.outerHeight(true)
            };
            this.numberOfItens = this.elements.reguaListaItems.length;
            this.itemIsActive = "home";
            this.isIOS = /(iPad|iPhone|iPod)/g.test(window.navigator.userAgent);
            this.isIphone6Plus = this.isIOS && (window.innerWidth === 414 && window.isPortrait || window.innerWidth === 736 && !window.isPortrait);
            this.reguaCacheKey = "regua-sprite-svg";
        };
        ReguaNavegacao.prototype.createReguaListaMap = function() {
            var i, len, listaItem, ref, results;
            this.elements.reguaListaMap = {};
            ref = this.elements.reguaListaItems;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                listaItem = ref[i];
                results.push(this.elements.reguaListaMap[listaItem.id] = listaItem);
            }
            return results;
        };
        ReguaNavegacao.prototype.createStyleSheet = function() {
            var style;
            if (this.style) {
                $(this.style).remove();
            }
            style = document.createElement("style");
            style.setAttribute("media", "screen");
            style.appendChild(document.createTextNode(""));
            style.className = "regua-navegaca-extra-styles";
            document.head.appendChild(style);
            this.style = style;
            return this.sheet = style.sheet;
        };
        ReguaNavegacao.prototype.refreshIsPortrait = function() {
            window.isPortrait = window.innerWidth <= window.innerHeight;
            return this.isLandscape = !window.isPortrait;
        };
        ReguaNavegacao.prototype.refreshAbsPosition = function() {
            this.heights.window = window.innerHeight;
            if (this.isIphone6Plus && this.isLandscape) {
                return this.container.css({
                    'position': 'absolute',
                    'top': (this.heights.window + $window.scrollTop() - this.heights.container) + "px"
                });
            } else {
                return this.container.css({
                    'position': '',
                    'top': ''
                });
            }
        };
        ReguaNavegacao.prototype.refresh = function() {
            this.refreshIsPortrait();
            return this.refreshAbsPosition();
        };
        ReguaNavegacao.prototype.bind = function() {
            $window.on("resize", debounce((function(_this) {
                return function() {
                    return _this.refresh();
                };
            })(this), 250));
            return $window.on("scroll", (function(_this) {
                return function() {
                    return _this.refreshAbsPosition();
                };
            })(this));
        };
        ReguaNavegacao.prototype.getSvg = function() {
            var addSpriteNameToCache, checkSpriteNameInCache, writeSvgInline;
            addSpriteNameToCache = (function(_this) {
                return function() {
                    var record;
                    record = localStorage.getItem(_this.reguaCacheKey);
                    if (!record) {
                        return;
                    }
                    record = JSON.parse(record);
                    record.spriteName = _this.svgSpriteName;
                    localStorage.setItem(_this.reguaCacheKey, JSON.stringify(record));
                };
            })(this);
            checkSpriteNameInCache = (function(_this) {
                return function() {
                    var record;
                    record = localStorage.getItem(_this.reguaCacheKey);
                    if (!record) {
                        return;
                    }
                    record = JSON.parse(record);
                    if (record.spriteName !== _this.svgSpriteName) {
                        localStorage.removeItem(_this.reguaCacheKey);
                    }
                };
            })(this);
            writeSvgInline = (function(_this) {
                return function(svgContent) {
                    addSpriteNameToCache();
                    return _this.elements.svgContainer.html(svgContent);
                };
            })(this);
            if ((typeof jqueryAjaxCache !== "undefined" && jqueryAjaxCache !== null) && (jqueryAjaxCache.get != null)) {
                checkSpriteNameInCache();
                jqueryAjaxCache.get(this.svgSpritePath, writeSvgInline, this.reguaCacheKey);
                return;
            }
            $.get(this.svgSpritePath, writeSvgInline);
        };
        ReguaNavegacao.prototype.changeDom = function() {
            this.container.detach().prependTo($body);
            $body.append(this.reguaNavegacaoFooterHtml);
        };
        ReguaNavegacao.prototype.trimUrl = function(url) {
            if (!url) {
                return "";
            }
            return url.trim().replace(/\/$/g, '');
        };
        ReguaNavegacao.prototype.getCurrentLocation = function() {
            return this.trimUrl(window.location.protocol + '//' + window.location.host + window.location.pathname);
        };
        ReguaNavegacao.prototype.onHomeOfProduct = function() {
            return this.portal.home === this.getCurrentLocation();
        };
        ReguaNavegacao.prototype.elIsHomeTab = function(el) {
            return el.id === "regua-navegacao-item-home";
        };
        ReguaNavegacao.prototype.onHomeTab = function() {
            return this.elIsHomeTab(this.elements.activeItem);
        };
        ReguaNavegacao.prototype.anchorTop = function() {
            return $body.animate({
                scrollTop: 0
            }, '500');
        };
        ReguaNavegacao.prototype.changeCurrentActiveItem = function(newItem) {
            var oldItem;
            if (newItem == null) {
                return;
            }
            this.removeClass(this.elements.activeItem, 'active');
            oldItem = this.elements.activeItem;
            this.elements.activeItem = newItem;
            this.addClass(this.elements.activeItem, 'active');
            if (this.elIsHomeTab(oldItem)) {
                this.homeScroll = $window.scrollTop();
            }
            if (this.onHomeTab()) {
                return this.removeClass(html, "regua-navegacao-tab--visible");
            } else {
                return this.addClass(html, "regua-navegacao-tab--visible");
            }
        };
        ReguaNavegacao.prototype.triggerEventsNaRegua = function(navItem, navTarget) {
            if (navItem.id === ("regua-navegacao-item-" + this.itemIsActive)) {
                return;
            }
            $document.trigger("glb." + this.itemIsActive + ".close");
            if (navTarget !== "home") {
                $document.trigger("glb." + navTarget + ".open");
            }
            this.itemIsActive = navTarget;
        };
        ReguaNavegacao.prototype.changeReguaItems = function(navItemId) {
            var navItem, navTarget;
            navItem = this.elements.reguaListaMap[navItemId];
            if (this.hasClass(navItem, "active")) {
                if (this.onHomeTab()) {
                    if (this.onHomeOfProduct()) {
                        this.anchorTop();
                    } else {
                        window.location.href = this.portal.home;
                    }
                }
                return false;
            }
            navTarget = navItemId.replace("regua-navegacao-item-", "");
            $document.trigger("glb.regua.clicked", [navTarget]);
            this.addClass(html, "regua-navegacao-tab--fixed");
            this.changeCurrentActiveItem(navItem);
            this.triggerEventsNaRegua(navItem, navTarget);
            if (this.onHomeTab()) {
                $window.scrollTop(this.homeScroll);
                this.removeClass(html, "regua-navegacao-tab--fixed");
            } else {
                setTimeout((function(_this) {
                    return function() {
                        $window.scrollTop(0);
                        return _this.removeClass(html, "regua-navegacao-tab--fixed");
                    };
                })(this), 500);
            }
            return false;
        };
        ReguaNavegacao.prototype.aplicarEventosNaRegua = function() {
            var changeReguaItemsProxy, onReguaNavegacaoItemClicked;
            changeReguaItemsProxy = (function(_this) {
                return function(navItem) {
                    return _this.changeReguaItems(navItem.id);
                };
            })(this);
            onReguaNavegacaoItemClicked = function() {
                return changeReguaItemsProxy(this);
            };
            if (this.isTouchable) {
                if (this.isIOS) {
                    this.elements.reguaListaItems.on('tap', onReguaNavegacaoItemClicked);
                } else {
                    this.elements.reguaListaItems.on('touchend', onReguaNavegacaoItemClicked);
                }
            } else {
                this.elements.reguaListaItems.on('click', onReguaNavegacaoItemClicked);
            }
            $document.on("glb.regua.change", (function(_this) {
                return function(e, item) {
                    return _this.changeReguaItems("regua-navegacao-item-" + item);
                };
            })(this));
        };
        ReguaNavegacao.prototype.triggerReguaInit = function() {
            $document.trigger("glb.regua.init");
        };
        return ReguaNavegacao;
    })();
    window.glb = window.glb || {};
    window.glb.ReguaNavegacao = ReguaNavegacao;
    window.loadReguaNavegacao = function() {
        var animationEnd, animationEndEventNames, refreshHasReguaEvent, triggerHasNotRegua, triggerHasRegua;
        triggerHasRegua = function() {
            $html.removeClass("has-not-regua").addClass("has-regua");
            return $document.trigger("has-regua");
        };
        triggerHasNotRegua = function() {
            $html.removeClass("has-regua").addClass("has-not-regua");
            return $document.trigger("remove-regua");
        };
        if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
            $html.addClass("svg-support");
            if ((window.glb.reguaShouldStart != null) && window.glb.reguaShouldStart()) {
                window.glb.currentReguaNavegacao = new window.glb.ReguaNavegacao(window.isTouchable);
                triggerHasRegua();
            } else {
                window.glb.currentReguaNavegacao = null;
                triggerHasNotRegua();
            }
        } else {
            $html.removeClass("svg-support");
            window.glb.currentReguaNavegacao = null;
            triggerHasNotRegua();
        }
        refreshHasReguaEvent = function(event) {
            if (event.animationName === 'media-mobile') {
                if (window.glb.reguaShouldStart()) {
                    return triggerHasRegua();
                }
            } else if (event.animationName === 'media-not-mobile') {
                return triggerHasNotRegua();
            }
        };
        animationEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'MozAnimation': 'animationend',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        };
        animationEnd = animationEndEventNames[ModernizrWithPrefixed.prefixed('animation')];
        return document.addEventListener(animationEnd, refreshHasReguaEvent, false);
    };
    shouldNotAutoLoad = (window.noAutoLoadReguaNavegacao != null) && window.noAutoLoadReguaNavegacao;
    if (!shouldNotAutoLoad) {
        window.loadReguaNavegacao();
    }
}).call(this);
(function() {
    var $body, $document, $html, $window, ReguaTracking, shouldNotAutoLoad;
    $html = $("html");
    $body = $("body");
    $window = $(window);
    $document = $(document);
    ReguaTracking = (function() {
        function ReguaTracking() {
            this.shouldTrack = !window.noTrackingMenuWeb;
            this.trackFlag = false;
            this.bind();
        }
        ReguaTracking.prototype.trackGa = function(category, action, label, noninteraction) {
            if (this.trackFlag) {
                return;
            }
            this.trackFlag = true;
            setTimeout((function(_this) {
                return function() {
                    return _this.trackFlag = false;
                };
            })(this), 300);
            if ((typeof _gaq !== "undefined" && _gaq !== null) && this.shouldTrack) {
                return _gaq.push(["_trackEvent", category, action, label, 0, noninteraction]);
            } else {
                return console.log([category, action, label, noninteraction]);
            }
        };
        ReguaTracking.prototype.bind = function() {
            $document.on("glb.regua.clicked", (function(_this) {
                return function(e, element) {
                    return _this.trackGa("regua_framework", "eixos", "clique | " + element, true);
                };
            })(this));
            $document.on("glb.busca.searched", (function(_this) {
                return function(e, query) {
                    return _this.trackGa("busca_framework", "item buscado", query);
                };
            })(this));
            $document.on("glb.busca.featureContent", (function(_this) {
                return function(e, link) {
                    return _this.trackGa("busca_framework", "suggests", "clique | navegacional | " + link);
                };
            })(this));
            $document.on("glb.usuario.login", (function(_this) {
                return function() {
                    return _this.trackGa("usuario_framework", "login", "interacao | login");
                };
            })(this));
            $document.on("glb.usuario.logout", (function(_this) {
                return function() {
                    return _this.trackGa("usuario_framework", "login", "clique | logout");
                };
            })(this));
            $document.on("glb.usuario.notificationClicked", (function(_this) {
                return function(e, linkLocation) {
                    return _this.trackGa("usuario_framework", "notificacoes", "clique | " + linkLocation);
                };
            })(this));
            $document.on("glb.usuario.profileLinkClicked", (function(_this) {
                return function(e, linkText) {
                    return _this.trackGa("usuario_framework", "minha conta", "clique | links | " + linkText);
                };
            })(this));
        };
        return ReguaTracking;
    })();
    window.glb = window.glb || {};
    window.glb.ReguaTracking = ReguaTracking;
    window.loadReguaTracking = function() {
        if ($html.hasClass("has-regua")) {
            return window.glb.currentReguaTracking = new window.glb.ReguaTracking();
        }
    };
    shouldNotAutoLoad = (window.noAutoLoadReguaNavegacao != null) && window.noAutoLoadReguaNavegacao;
    if (!shouldNotAutoLoad) {
        window.loadReguaTracking();
    }
}).call(this);
(function() {
    var $body, $document, $html, $window, ReguaUser, cAF, debounce, rAF, shouldNotAutoLoad, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    $html = $("html");
    $body = $("body");
    $window = $(window);
    $document = $(document);
    debounce = function(func, wait, immediate) {
        var timeout;
        timeout = null;
        return function() {
            var args, callNow, context, later;
            context = this;
            args = arguments;
            later = function() {
                timeout = null;
                if (!immediate) {
                    return func.apply(context, args);
                }
            };
            callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                return func.apply(context, args);
            }
        };
    };
    rAF = ModernizrWithPrefixed.prefixed('requestAnimationFrame', window) || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
    };
    cAF = ModernizrWithPrefixed.prefixed('cancelAnimationFrame', window) || window.clearTimeout;
    ReguaUser = (function() {
        function ReguaUser() {
            this.setUserDataInfo = bind(this.setUserDataInfo, this);
            this.onNotifications = bind(this.onNotifications, this);
            this.onLogin = bind(this.onLogin, this);
            this.changeTabActive = bind(this.changeTabActive, this);
            this.verticalScrollEvent = bind(this.verticalScrollEvent, this);
            this.initCalled = false;
            this.bind();
            if (window.glb.currentReguaNavegacao != null) {
                this.init();
            } else {
                this.waitForReguaNavegacaoToInit((function(_this) {
                    return function() {
                        return _this.init();
                    };
                })(this));
            }
        }
        ReguaUser.prototype.waitForReguaNavegacaoToInit = function(callback) {
            return $document.on("glb.regua.init", callback);
        };
        ReguaUser.prototype.init = function() {
            if (this.initCalled) {
                return;
            }
            this.initCalled = true;
            this.userIsOpen = false;
            this.usuarioTriggered = false;
            this.setupMomentJs();
            this.cacheDom();
            this.cacheVariables();
            this.container.detach().prependTo($body);
            return this.waitForBarraLoad((function(_this) {
                return function() {
                    _this.barra = window.glb['barra'];
                    _this.barra.options.habilitarAnalytics = false;
                    _this.common = _this.barra['common'];
                    _this.bindAfterInit();
                    _this.loadBarraNotifications();
                    return _this.refreshPositionFixed();
                };
            })(this));
        };
        ReguaUser.prototype.waitForBarraLoad = function(callback) {
            if (this.timeoutCtrl) {
                clearTimeout(this.timeoutCtrl);
            }
            if ((window.glb['barra'] != null) && (window.glb['barra']['common'] != null)) {
                callback();
                return;
            }
            this.timeoutCtrl = setTimeout((function(_this) {
                return function() {
                    return _this.waitForBarraLoad(callback);
                };
            })(this), 10);
        };
        ReguaUser.prototype.setupMomentJs = function() {
            return moment.locale("pt-br");
        };
        ReguaUser.prototype.momentFromNow = function(dateVal) {
            var valStr;
            valStr = moment(dateVal).fromNow();
            if (valStr.indexOf("segundo") !== -1) {
                return "agora hÃ¡ pouco";
            }
            if (valStr.indexOf("um dia") !== -1) {
                return "ontem";
            }
            return valStr;
        };
        ReguaUser.prototype.cacheDom = function() {
            this.container = $("#regua-user-container");
            this.elements = {};
            this.elements.reguaContainer = $("#regua-navegacao");
            this.elements.userButton = this.elements.reguaContainer.find(".usuario-button");
            this.elements.userControls = $("#regua-user-controls");
            this.elements.userTabs = $("#regua-user-tabs");
            this.elements.userLogin = null;
            this.elements.userPopinIframe = null;
            this.elements.userTabsLabels = $("#tab-labels");
            this.createLabelTabsFixed();
            this.elements.userInnerTabs = this.elements.userTabs.find(".regua-tab");
            this.elements.userInnerTabsLabels = this.elements.userTabs.find(".tab-label");
            this.elements.contentsArea = this.elements.userTabs.find(".regua-content");
            this.elements.userProfileList = $("#regua-user-profile-list");
            this.elements.notificationsApps = $("#regua-user-profile-notifications");
            return this.elements.userLogoutArea = $("#regua-user-logout");
        };
        ReguaUser.prototype.createLabelTabsFixed = function() {
            return this.elements.userTabsLabelsFixed = this.elements.userTabsLabels.clone().attr("id", "tab-labels-fixed").addClass("tab-labels-fixed").insertAfter(this.elements.userTabsLabels);
        };
        ReguaUser.prototype.cacheVariables = function() {
            this.settings = window.REGUA_SETTINGS;
            this.staticUrl = this.settings.staticUrl;
            this.userMalePicture = this.staticUrl + "regua-navegacao/img/user/avatar-masculino.png";
            this.userFemalePicture = this.staticUrl + "regua-navegacao/img/user/avatar-feminino.png";
            this.userNoGenderPicture = this.staticUrl + "regua-navegacao/img/user/avatar-usuario.png";
            this.rafScrolling = null;
            this.timeoutAnimation = null;
            this.timeoutCtrl = null;
            this.userLoadedInfo = false;
            this.userPopinOpened = false;
            this.scrollInfo = {
                lastTop: 0,
                propDeltaY: 1.72,
                fixed: false,
                fixedShown: false,
                fixedThreshold: 6
            };
            this.tabIndex = 2;
            this.styleProps = {
                transitionDuration: ModernizrWithPrefixed.prefixed('transitionDuration'),
                transform: ModernizrWithPrefixed.prefixed('transform')
            };
            this.heights = {};
            this.addFbUrl = "https://meuperfil.globo.com/perfil/home";
            this.addFbLinkTag = "<a class=\"add-fb\" href=\"" + this.addFbUrl + "\"><span class=\"plus-sign\"></span><span class=\"fb-logo\"></span></a>";
            this.addServicesUrl = "https://meuperfil.globo.com/perfil/lista_servicos?exibicao=TOTAL";
            this.addServicesLinkTag = "<a class=\"add-service\" href=\"" + this.addServicesUrl + "\">adicione serviÃ§os<span class=\"add-service-arrow\"><svg class=\"regua-navegacao-icon\"><use xlink:href=\"#regua-arrow\" /></svg></span></a>";
            return this.profileTypeColors = {
                "default": "#0669de",
                "cadastrouniversalchannel": "#830181",
                "clubemaisvocÃª": "#608CD2",
                "domingÃ£odofaustÃ£o-girocomsejÃ£oloroza": "#22699A",
                "maisvocÃªrepÃ³rter": "#608CD2",
                "musica.com.br": "#E73E2C",
                "newslettergnt": "#5D0851",
                "parceriaamericanas.com": "#ea0001",
                "parceriacartacapital": "#ae1c1f",
                "parceriachefsclub": "#39B60E",
                "parceriaeditoraglobo": "#0669de",
                "parceriaexclusivafloresonline": "#3AA935",
                "parceriaexclusivapais&filhos": "#E30613",
                "parceriamagazineluiza": "#0083CA",
                "parcerianetshoes": "#5a2d82",
                "parcerianicephotos": "#D10246",
                "parceriaoglobo": "#1E96C8",
                "parceriapanini": "#CE2900",
                "parceriaricardoeletro": "#C91300",
                "parceriashoptime": "#F79F1A",
                "parceriawalmart": "#1A75CE",
                "receitas.com": "#ff6600",
                "santaajuda-participaÃ§Ã£o": "#5D0851",
                "vcnoglobovideochat": "#0669de",
                "vcnomaisvocÃª": "#608CD2",
                "vcnosuperbonitatransforma": "#5D0851",
                "vcnotitÃ£": "#2C3769",
                "vocÃªntvxuxa": "#541098",
                "vocÃªnoaltashoras": "#30B6D2",
                "vocÃªnocaldeirÃ£o": "#557FEB",
                "vocÃªnocasseta": "#EC7D00",
                "vocÃªnovÃ­deoshow": "#2190DB",
                "vcadastrosÃ³ciopremierefc": "#3E673B",
                "cartolafc": "#FF7400",
                "euatleta": "#FF6600",
                "gamefutebol": "#3EA909",
                "musadobrasileirÃ£o2011": "#3B9C00",
                "vcnoesporte": "#8CB712",
                "aventuranofantÃ¡stico": "#2C629C",
                "baixatudo-newsletter": "#333333",
                "extra": "#ED1E00",
                "newsletter-globonews": "#B91414",
                "newslettercidadeesoluÃ§Ãµes": "#B91414",
                "newsletterprofissÃ£orepÃ³rter": "#0F50A9",
                "newslettertvglobodigital.com": "#2C3769",
                "oglobo-comentÃ¡rios": "#1E96C8",
                "vcnaglobominas": "#2C3769",
                "vcnaglobonews": "#B91414",
                "vcnobomdiabrasil": "#D44C01",
                "vcnofantÃ¡stico": "#2C629C",
                "vcnog1": "#A80000",
                "vcnogloboesporte": "#3B9C00",
                "vcnogloborepÃ³rter": "#1F2E48",
                "vcnojornaldaglobo": "#16257B",
                "vcnoprofissÃ£orepÃ³rter": "#0F50A9",
                "vcnoradarrj": "#A80000",
                "vcnorjtv": "#A80000",
                "vcnosptv": "#A80000"
            };
        };
        ReguaUser.prototype.transitionDuration = function(el, duration) {
            if (duration != null) {
                return el.style[this.styleProps.transitionDuration] = duration + 'ms';
            }
        };
        ReguaUser.prototype.transform = function(el, op, duration) {
            if (el == null) {
                return;
            }
            this.transitionDuration(el, duration);
            return el.style[this.styleProps.transform] = op;
        };
        ReguaUser.prototype.translate3d = function(el, x, y, duration) {
            return this.transform(el, 'translate3d(' + x + 'px, ' + y + 'px, 0)', duration);
        };
        ReguaUser.prototype.translateTop = function(el, top, duration) {
            return this.translate3d(el, 0, parseInt(top, 10), duration);
        };
        ReguaUser.prototype.triggerUsuarioOpen = function() {
            var shouldChangeToUserTab;
            shouldChangeToUserTab = window.location.hash.indexOf("regua-tab-user") !== -1;
            if (shouldChangeToUserTab) {
                this.usuarioTriggered = true;
                $document.trigger("glb.regua.change", ["usuario"]);
                window.location.hash = window.location.hash.replace("&regua-tab-user", "");
                window.location.hash = window.location.hash.replace("regua-tab-user", "");
                if (window.location.hash === "" || window.location.hash === "#") {
                    return window.location.hash = "header-produto";
                }
            }
        };
        ReguaUser.prototype.setUsarioOpenOnHash = function() {
            var hash;
            hash = window.location.hash.trim();
            if (hash !== "" && hash !== "#") {
                return window.location.hash += "&regua-tab-user";
            } else {
                return window.location.hash = "regua-tab-user";
            }
        };
        ReguaUser.prototype.cadunUserLoginSucceeded = function() {
            if (!this.usuarioTriggered) {
                $document.trigger("glb.usuario.login");
                this.setUsarioOpenOnHash();
                return window.location.reload();
            }
        };
        ReguaUser.prototype.bind = function() {
            $document.on("glb.usuario.open", (function(_this) {
                return function() {
                    if ((_this.userData == null) || (_this.userData.name == null)) {
                        _this.showUserLogin();
                    }
                    _this.container.addClass("user-open");
                    _this.userIsOpen = true;
                    if (_this.elements.notificationsCount != null) {
                        _this.elements.notificationsCount.css("display", "none");
                    }
                    return _this.refresh();
                };
            })(this));
            $document.on("glb.usuario.close", (function(_this) {
                return function() {
                    _this.userIsOpen = false;
                    return _this.container.removeClass("user-open");
                };
            })(this));
            return $window.on("resize", debounce((function(_this) {
                return function() {
                    return _this.refresh();
                };
            })(this), 250));
        };
        ReguaUser.prototype.verticalScrollEvent = function(e) {
            this.scrollInfo.lastTop = this.container.scrollTop();
            if (this.scrollInfo.lastTop <= this.heights.userHeader && this.scrollInfo.fixed) {
                this.scrollInfo.fixed = false;
                return this.container.removeClass("inner-tabs-fixed");
            } else if (this.scrollInfo.lastTop > this.heights.userHeader && !this.scrollInfo.fixed) {
                this.scrollInfo.fixed = true;
                return this.container.addClass("inner-tabs-fixed");
            }
        };
        ReguaUser.prototype.changeTabActive = function(tabIndex) {
            this.elements.userTabs.removeClass("regua-user-tab-" + this.tabIndex);
            this.tabIndex = tabIndex;
            return this.elements.userTabs.addClass("regua-user-tab-" + this.tabIndex);
        };
        ReguaUser.prototype.changeToNotificationTab = function() {
            return this.changeTabActive(1);
        };
        ReguaUser.prototype.bindAfterInit = function() {
            var changeTabActiveProxy;
            this.common.bindEvent(window, "message", (function(_this) {
                return function(msg) {
                    if ("barra::close" === msg.data) {
                        return _this.cadunUserLoginSucceeded();
                    }
                };
            })(this));
            changeTabActiveProxy = (function(_this) {
                return function(tab) {
                    return _this.changeTabActive(tab);
                };
            })(this);
            this.elements.userInnerTabsLabels.bind('tap', function() {
                var tabIndex;
                tabIndex = parseInt($(this).attr("data-index"), 10);
                return changeTabActiveProxy(tabIndex);
            });
            return this.container.on('scroll', this.verticalScrollEvent);
        };
        ReguaUser.prototype.bindOnNotifications = function() {
            var barra;
            barra = this.barra;
            return this.elements.notificationsApps.on("click", ".notification-link", function(ev) {
                var anchor, href;
                anchor = this;
                $(anchor).parents(".notification-item").removeClass("notification-new");
                barra.notifications.linkSpy(anchor, ev.originalEvent);
                href = $(anchor).attr("href");
                return $document.trigger("glb.usuario.notificationClicked", [href]);
            });
        };
        ReguaUser.prototype.bindOnServices = function() {
            var barra, linkTrack;
            barra = this.barra;
            if (this.elements.userLogoutLinkElm != null) {
                this.elements.userLogoutLinkElm.on("click", function(ev) {
                    return $document.trigger("glb.usuario.logout");
                });
                linkTrack = function(ev) {
                    var $link, linkText;
                    $link = $(this);
                    linkText = $link.text().trim();
                    return $document.trigger("glb.usuario.profileLinkClicked", [linkText]);
                };
                this.elements.userLogoutArea.on("click", "a", linkTrack);
                return this.elements.userProfileList.on("click", "a", linkTrack);
            }
        };
        ReguaUser.prototype.removeUselessLinks = function() {
            this.elements.userLogoutArea.find(".hover-button a").first().remove();
            return this.elements.userLogoutArea.find(".hover-button .float-box a").first().remove();
        };
        ReguaUser.prototype.onLogin = function(userData) {
            this.elements.userControls.html("");
            this.userData = userData;
            if ((this.userData != null) && (this.userData.name != null)) {
                this.fetchNotificationsCount();
                this.fetchNotifications();
                this.container.removeClass("user-not-logged").addClass("user-logged");
                this.createLinksLogout();
                $document.trigger("glb.usuario.isAlreadyLogged");
            } else {
                this.container.removeClass("user-logged").addClass("user-not-logged");
                this.barra.nonlogged.addItems(this.elements.userControls.get(0));
                this.userLoadedInfo = true;
                if (this.userIsOpen) {
                    this.showUserLogin();
                }
            }
            this.triggerUsuarioOpen();
            this.bindOnServices();
            return this.removeUselessLinks();
        };
        ReguaUser.prototype.onNotifications = function(notificationsData) {
            if (!notificationsData || !notificationsData['pings']) {
                this.notifications = [];
            } else {
                this.notifications = notificationsData['pings'];
            }
            this.common['addClass'](this.elements.userControls.get(0), 'notifications-loaded');
            return this.createNotificationsApps(this.notifications);
        };
        ReguaUser.prototype.refresh = function() {
            return this.refreshHeights();
        };
        ReguaUser.prototype.refreshHeights = function() {
            this.heights.container = this.container.height();
            this.heights.userControls = this.elements.userControls.outerHeight(true);
            this.heights.userTabsLabels = this.elements.userTabsLabels.height();
            return this.heights.userHeader = this.heights.userControls;
        };
        ReguaUser.prototype.isIos7 = function() {
            return !!navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i);
        };
        ReguaUser.prototype.isAndroidBrowser = function() {
            var nua;
            nua = navigator.userAgent;
            return (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1);
        };
        ReguaUser.prototype.refreshPositionFixed = function() {
            if (this.isIos7() || this.isAndroidBrowser()) {
                this.container.addClass("regua-user--notfixed");
            }
        };
        ReguaUser.prototype.createLinksLogout = function() {
            this.barra.nonlogged.addItems(this.elements.userLogoutArea.get(0));
            this.elements.userLogoutLink = "<a id=\"regua-user-logout-link\" href=\"" + this.barra['options']['logoutUrl'] + "?url=" + document.location.href + "\" class=\"regua-user-logout-link\">sair</a>";
            this.elements.userLogoutArea.append(this.elements.userLogoutLink);
            return this.elements.userLogoutLinkElm = $("#regua-user-logout-link");
        };
        ReguaUser.prototype.showUserLogin = function() {
            var userPopinIframe;
            if (!this.elements.userLogin || this.elements.userLogin.length === 0) {
                this.elements.userLogin = $("#barra-item-login");
            }
            userPopinIframe = $("#login-popin-iframe");
            if (this.elements.userLogin && this.elements.userLogin.length > 0 && this.userLoadedInfo && (!this.userPopinOpened || userPopinIframe.attr("src").indexOf("login") === -1)) {
                this.elements.userLogin.click();
                return this.userPopinOpened = true;
            }
        };
        ReguaUser.prototype.setUserDataInfo = function(count) {
            var countHtml;
            if (this.userData.facebookId != null) {
                this.userData.photo = "http://graph.facebook.com/" + this.userData.facebookId + "/picture?type=large";
            } else {
                if (this.userData.isMale != null) {
                    this.userData.photo = this.userData.isMale ? this.userMalePicture : this.userFemalePicture;
                } else {
                    this.userData.photo = this.userNoGenderPicture;
                }
            }
            this.userData.firstName = this.userData.name.split(" ")[0];
            countHtml = count <= 100 ? "" + count : "+100";
            this.elements.notificationsCount = $("<span id=\"notification-count\" class=\"notification-count\"><span class=\"notification-number\">" + countHtml + "</span></span>");
            this.elements.userProfilePicture = $("<span id=\"user-profile-picture\" class=\"user-profile user-profile-picture\"><img src=\"" + this.userData.photo + "\"></span>");
            this.elements.userProfileName = $("<span id=\"user-profile-name\" class=\"user-profile user-profile-name\" title=\"" + this.userData.name + "\">" + this.userData.firstName + "</span>");
            this.elements.userProfileEmail = $("<span id=\"user-profile-email\" class=\"user-profile user-profile-email\">" + this.userData.email + "</span>");
            this.elements.userControls.append(this.elements.userProfilePicture).append(this.elements.userProfileName).append(this.elements.userProfileEmail);
            if ((count != null) && count > 0) {
                this.changeToNotificationTab();
                this.elements.userButton.append(this.elements.notificationsCount);
            }
            this.createNotificationsProfileTypes(this.userData.lastServices);
            return this.refresh();
        };
        ReguaUser.prototype.loadBarraNotifications = function() {
            this.barra.component = this.barra.component || {};
            this.barra.component.barraDiv = this.barra.component.barraDiv || {
                className: ''
            };
            return this.barra.auth.getUserData(this.onLogin);
        };
        ReguaUser.prototype.fetchNotificationsCount = function() {
            return this.common['jsonpGet'](this.barra['options']['notificationsCountPath'], this.setUserDataInfo, {
                callbackName: 'pingNotificationCount'
            });
        };
        ReguaUser.prototype.fetchNotifications = function() {
            return this.common['jsonpGet'](this.barra['options']['notificationsPath'], this.onNotifications, {
                callbackName: 'pingNotifications'
            });
        };
        ReguaUser.prototype.createNotificationsApps = function(notifications) {
            var i, len, notification, notificationClass, notificationItem, notificationItemHtml, notificationTime;
            notificationItemHtml = "";
            if (notifications != null) {
                for (i = 0, len = notifications.length; i < len; i++) {
                    notification = notifications[i];
                    notificationClass = !notification.lido ? 'notification-new' : '';
                    notificationTime = this.momentFromNow(notification.data);
                    notificationItem = "<li data-categoria=\"" + notification.categoria + "\" data-quantidade=\"" + notification.quantidade + "\"\n    data-servico=\"" + notification.servico + "\" class=\"notification-item " + notificationClass + "\">\n  <a class=\"notification-link\" href=\"" + notification.url + "\">\n    " + [notification.thumb ? "<img src=\"" + notification.thumb + "\" alt=\"" + notification.servico + " icone\" class=\"notification-icon\">" : void 0] + "\n    <span class=\"notification-text\">\n        <span class=\"notification-title\">" + notification.texto + "</span>\n        <span class=\"notification-time\">" + notificationTime + "</span>\n    </span>\n  </a>\n</li>";
                    notificationItemHtml += notificationItem;
                }
            }
            if (notificationItemHtml) {
                this.elements.notificationsApps.append(notificationItemHtml);
                return this.bindOnNotifications();
            } else {
                this.elements.notificationsApps.addClass("empty-notifications");
                return this.elements.notificationsApps.after(this.addServicesLinkTag);
            }
        };
        ReguaUser.prototype.getProfileTypeColor = function(profileType) {
            var color, profileSlug;
            profileSlug = profileType.name.toLowerCase().replace(/\s/g, "");
            color = this.profileTypeColors[profileSlug];
            if (!color) {
                color = this.profileTypeColors["default"];
            }
            return color;
        };
        ReguaUser.prototype.createNotificationsProfileTypes = function(myProfileTypes) {
            var i, len, profileItem, profileItemHtml, profileType;
            profileItemHtml = "";
            if (myProfileTypes != null) {
                for (i = 0, len = myProfileTypes.length; i < len; i++) {
                    profileType = myProfileTypes[i];
                    profileType.color = this.getProfileTypeColor(profileType);
                    profileItem = "<li class=\"notifications-my-profile-item\">\n  <a class=\"notifications-my-profile-item-link\" href=\"" + profileType.url + "\">\n    " + [profileType.logo ? "<span class=\"notifications-my-profile-icon\"><img class=\"mission-control-icon\" src=\"" + profileType.logo + "\"></span>" : void 0] + "\n    <span class=\"notifications-my-profile-title\" style=\"color: " + profileType.color + ";\">" + profileType.name + "</span>\n  </a>\n</li>";
                    profileItemHtml += profileItem;
                }
            }
            if (profileItemHtml) {
                this.elements.userProfileList.append(profileItemHtml);
                return this.elements.userProfileList.append(this.addServicesLinkTag.replace("adicione serviÃ§os", "todos os serviÃ§os"));
            } else {
                return this.elements.userProfileList.append(this.addServicesLinkTag);
            }
        };
        return ReguaUser;
    })();
    window.glb = window.glb || {};
    window.glb.ReguaUser = ReguaUser;
    window.loadReguaUser = function() {
        if ($html.hasClass("has-regua")) {
            return window.glb.currentReguaUser = new window.glb.ReguaUser();
        }
    };
    shouldNotAutoLoad = (window.noAutoLoadReguaNavegacao != null) && window.noAutoLoadReguaNavegacao;
    if (!shouldNotAutoLoad) {
        window.loadReguaUser();
    }
}).call(this);

function ShareBar(a) {
    "use strict";
    return this.init(a)
}
var BUTTON_WIDTH = 34,
    BUTTON_FULL_WIDTH = 110,
    BUTTON_PADDING = 4,
    MAX_SOCIAL_BUTTONS = 6;
! function(a, b) {
    "use strict";

    function c(b) {
        b && b.preventDefault ? b.preventDefault() : a.event && (a.event.returnValue = !1)
    }

    function d(a, b, c) {
        return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, function() {
            c.call(a)
        }) : void 0
    }
    ShareBar.prototype = {
        init: function(a) {
            this.eventName = this.getActionName(), this.verifyTouch(), this.supportSvg = this.hasSupportSvg(), this.createSVG(), this.mergeOptions(a), this.containers = b.querySelectorAll(this.selector), this.createBars()
        },
        getActionName: function() {
            return this.isTouch() ? "mouseup" : "click"
        },
        verifyTouch: function() {
            var a = b.querySelector("html"),
                c = this.isTouch();
            c && -1 === a.className.indexOf(" touch") ? a.className += " touch" : c || -1 !== a.className.indexOf(" no-touch") || (a.className += " no-touch")
        },
        isTouch: function() {
            var c = !1;
            return (void 0 !== a.ontouchstart || a.DocumentTouch && b instanceof DocumentTouch) && (c = !0), c
        },
        hasSupportSvg: function() {
            return b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
        },
        createSVG: function() {
            if (this.supportSvg) {
                var a = b.createElement("div");
                a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><symbol viewBox="0 0 500 500" id="icon-email"><title>email</title><path d="M1.37 386.854c0 27.48 22.257 49.766 49.728 49.766H449.29c27.473 0 49.73-22.283 49.73-49.766v-248.87s-12.964 10.14-199.146 148.416c-28.297 17.07-69.558 17.46-99.372-.243-181.93-135.1-199.12-148.16-199.12-148.16l-.013 248.857zm228.098-157.947c9.294 5.564 32.148 5.76 41.844 0 97.806-70.98 116.88-85.534 209.17-154.526-7.62-6.742-19.38-11-31.19-11H51.098c-11.883 0-22.793 4.173-31.347 11.136 102.4 74.878 111.524 81.56 209.718 154.39z"/></symbol><symbol viewBox="0 0 500 500" id="icon-facebook"><title>facebook</title><path id="facebook-White_2_" d="M471.38 1.153H28.62c-15.173 0-27.47 12.296-27.47 27.47v442.756c0 15.167 12.297 27.468 27.47 27.468h238.365V306.113H202.13v-75.11h64.857v-55.394c0-64.284 39.262-99.288 96.607-99.288 27.47 0 51.076 2.045 57.957 2.96v67.18l-39.77.017c-31.188 0-37.227 14.82-37.227 36.566v47.956h74.38l-9.685 75.11h-64.695v192.735H471.38c15.167 0 27.468-12.3 27.468-27.47V28.623c0-15.173-12.3-27.47-27.47-27.47z"/></symbol><symbol viewBox="0 0 500 500" id="icon-googleplus"><title>googleplus</title><path fill-rule="evenodd" clip-rule="evenodd" d="M332.72 1.512H185.872c-97.906 0-150.835 45.908-150.835 125.266 0 65.242 60.163 109.498 131.258 99.056-17.323 33.057 1.33 57.072 13.394 69.564-97.457 0-178.005 42.25-178.005 105.626 0 55.68 47.38 97.248 141.948 97.248 102.436 0 174.965-55.934 174.965-123.885 0-23.46-7.442-43.73-25.77-64.51-31.966-36.228-70.958-46.017-70.958-71.557 0-23.24 22.223-34.42 39.962-49.687 27.123-23.333 35.952-53.148 33.884-82.732-2.866-41.054-27.077-65.085-44.215-77.7 15.255.03 37.548.365 37.548.365L332.72 1.512zm-69.605 364.96c26.29 35.767 6.876 103.268-86.362 103.268-52.19 0-116.27-21.067-116.27-80.906 0-70.286 102.02-75.117 140.226-75.117 23.02 16.848 45.868 30.254 62.405 52.754zm-63.977-162.005c-45.116 18.017-81.727-10.47-99.57-68.952-14.48-47.405-3.872-93.318 29.746-105.112 43.718-15.33 79.012 9.32 98.334 62.96 21.46 59.545 6.957 95.006-28.51 111.104zm240.12 9.696v-59.1h-35.42v59.1h-59.204v35.37h59.204v59.607h35.42v-59.608h59.447v-35.37H439.26z"/></symbol><symbol viewBox="0 0 500 500" id="icon-pinterest"><title>pinterest</title><path d="M250.425 1.195C113.12 1.195 1.805 112.5 1.805 249.81c0 101.8 61.205 189.248 148.813 227.705-.704-17.358-.133-38.19 4.32-57.078 4.784-20.188 32-135.472 32-135.472s-7.95-15.878-7.95-39.33c0-36.855 21.352-64.368 47.948-64.368 22.615 0 33.54 16.982 33.54 37.328 0 22.73-14.493 56.732-21.96 88.22-6.226 26.38 13.232 47.89 39.247 47.89 47.1 0 78.83-60.502 78.83-132.177 0-54.493-36.695-95.28-103.448-95.28-75.42 0-122.398 56.24-122.398 119.066 0 21.656 6.385 36.927 16.388 48.75 4.6 5.438 5.244 7.623 3.57 13.862-1.19 4.577-3.934 15.587-5.063 19.957-1.65 6.288-6.76 8.546-12.442 6.215-34.742-14.178-50.923-52.21-50.923-94.976 0-70.62 59.566-155.308 177.692-155.308 94.914 0 157.382 68.683 157.382 142.416 0 97.526-54.213 170.384-134.137 170.384-26.84 0-52.09-14.494-60.744-30.98 0 0-14.432 57.272-17.48 68.344-5.28 19.167-15.598 38.335-25.03 53.267 22.36 6.59 45.983 10.185 70.467 10.185 137.28 0 248.596-111.304 248.596-248.62C499.02 112.5 387.706 1.194 250.425 1.194z"/></symbol><symbol viewBox="0 0 500 500" id="icon-twitter"><title>twitter</title><path d="M498.717 96.337c-18.296 8.108-37.96 13.593-58.6 16.056 21.063-12.63 37.24-32.6 44.852-56.426-19.714 11.698-41.545 20.185-64.78 24.76-18.613-19.822-45.125-32.215-74.473-32.215-56.338 0-102.01 45.666-102.01 101.977 0 8 .896 15.78 2.638 23.24-84.795-4.25-159.97-44.842-210.282-106.55-8.784 15.058-13.81 32.584-13.81 51.27 0 35.393 18 66.594 45.382 84.884-16.725-.527-32.457-5.115-46.22-12.758-.006.425-.006.857-.006 1.296 0 49.403 35.174 90.608 81.845 99.972-8.562 2.335-17.574 3.584-26.877 3.584-6.578 0-12.973-.642-19.193-1.822 12.98 40.52 50.65 69.993 95.292 70.815-34.913 27.344-78.897 43.657-126.695 43.657-8.238 0-16.36-.48-24.334-1.424 45.14 28.928 98.772 45.82 156.38 45.82 187.654 0 290.265-155.388 290.265-290.15 0-4.427-.088-8.82-.29-13.204 19.935-14.376 37.232-32.328 50.914-52.783z"/></symbol><symbol viewBox="0 0 500 500" id="icon-whatsapp"><title>whatsapp</title><path fill-rule="evenodd" clip-rule="evenodd" d="M254.55 1C119.793 1 10.543 109.368 10.543 243.056c0 45.74 12.796 88.506 35.012 124.986L1.514 497.92l135.094-42.91c34.962 19.17 75.16 30.114 117.942 30.114 134.77 0 244.01-108.396 244.01-242.068C498.56 109.368 389.32 1 254.55 1zm0 443.563c-41.254 0-79.675-12.277-111.758-33.32l-78.06 24.793 25.37-74.828c-24.31-33.23-38.68-74.05-38.68-118.152 0-111.108 91.127-201.518 203.13-201.518 112.012 0 203.133 90.41 203.133 201.518 0 111.115-91.122 201.507-203.134 201.507zm114.408-146.5c-6.117-3.32-36.16-19.41-41.797-21.693-5.636-2.26-9.75-3.44-14.135 2.587-4.39 6.018-16.855 19.492-20.633 23.474-3.795 3.994-7.44 4.364-13.562 1.038-6.105-3.314-25.934-10.59-48.928-32.52-17.892-17.06-29.63-37.764-33.038-44.073-3.403-6.315-.022-9.547 3.215-12.493 2.9-2.68 6.502-6.994 9.75-10.49 3.243-3.49 4.385-6.017 6.62-10.077 2.227-4.037 1.333-7.688-.11-10.838-1.446-3.138-12.753-34.008-17.48-46.572-4.72-12.564-9.983-10.69-13.618-10.82-3.635-.145-7.766-.817-11.924-.972-4.147-.15-10.96 1.147-16.9 7.126-5.94 5.956-22.596 20.307-23.743 50.708-1.147 30.406 20.06 60.61 23.016 64.845 2.963 4.236 40.496 70.14 102.876 97.237 62.385 27.087 62.71 18.836 74.16 18.23 11.45-.597 37.417-13.58 43.153-27.81 5.74-14.23 6.198-26.596 4.736-29.237-1.455-2.632-5.548-4.342-11.658-7.65z"/></symbol></svg>', a.style.display = "none", b.body.appendChild(a)
            }
        },
        mergeOptions: function(a) {
            var b, c = {
                selector: ".share-bar",
                classPopup: "share-popup",
                facebookAppId: "",
                networks: ["facebook", "twitter", "whatsapp", "google", "pinterest", "email"],
                theme: "natural",
                buttonWidth: BUTTON_WIDTH,
                buttonFullWidth: BUTTON_FULL_WIDTH,
                buttonPadding: BUTTON_PADDING,
                maxSocialButtons: MAX_SOCIAL_BUTTONS,
                context: "desktop",
                onCreateBar: function() {
                    return !1
                },
                onCreateButton: function() {
                    return !1
                },
                onShare: function() {
                    return !1
                }
            };
            a || (a = {});
            for (b in c) c.hasOwnProperty(b) && (this[b] = a[b] || c[b])
        },
        validateNetworks: function(a) {
            var b = 0,
                c = "",
                d = "";
            if ("[object Array]" !== Object.prototype.toString.call(a)) throw new Error("The list of networks passed on initialization is wrong [Should be an Array]");
            for (b; b < a.length; b++)
                if ("string" == typeof a[b]) {
                    if (c = a[b], c = c.substr(0, 1).toUpperCase() + c.substr(1), d = ShareBar.prototype["create" + c + "Button"], !d) throw new Error('The list of networks passed on initialization is wrong [Network name "' + a[b] + '" is wrong, should be facebook or twitter or whatsapp or google or pinterest or email]');
                    a[b] = d
                } else if ("function" != typeof a[b]) throw new Error("The list of networks passed on initialization is wrong [Should be string or function]");
            return a
        },
        createBars: function() {
            var a = this.containers,
                b = 0;
            for (b = 0; b < a.length; b++) this.createBar(a[b])
        },
        createBar: function(a, b) {
            var c = " share-theme-",
                d = 0,
                e = 0,
                f = [];
            for (b = this.validateNetworks(b || this.networks), b = b.slice(0, this.maxSocialButtons), e = b.length, f = this.getButtonsSize(a.offsetWidth, e), d; e > d; d++) b[d].call(this, a, f[d]);
            c += a.getAttribute("data-theme") || this.theme, a.className += " share-bar-container" + c, this.bindOpenPopup(a), this.bindShare(a), this.onCreateBar(a)
        },
        getButtonsSize: function(a, b) {
            var c = this.buttonFullWidth + this.buttonPadding,
                d = this.buttonWidth + this.buttonPadding,
                e = this.isSmallScreen();
            return b * d > a ? this.getButtonsSmall(b, d, a) : e ? ["", "", "", "", "", ""] : this.getButtonsFull(b, c, d, a)
        },
        getButtonsSmall: function(a, b, c) {
            var d = [],
                e = 1,
                f = 0,
                g = this.isSmallScreen();
            for (e; a >= e; e++) f = e * b, d[e - 1] = c >= f ? g ? "" : " share-small" : " share-hidden";
            return d
        },
        getButtonsFull: function(a, b, c, d) {
            var e = [],
                f = 1,
                g = 0,
                h = 0;
            for (f; a >= f; f++) g = f * b, h = (a - f) * c, e[f - 1] = d >= h + g ? " share-full" : " share-small";
            return e
        },
        bindOpenPopup: function(a) {
            var b = a.querySelectorAll("." + this.classPopup),
                e = 0,
                f = this,
                g = function(a) {
                    f.openPopup.call(this, a)
                };
            for (e; e < b.length; e++) d(b[e], this.eventName, g), d(b[e], "click", c)
        },
        bindShare: function(a) {
            var b = a.querySelectorAll(".share-button"),
                c = 0,
                e = this,
                f = function() {
                    e.onShare(this)
                };
            for (c; c < b.length; c++) d(b[c], this.eventName, f)
        },
        openPopup: function() {
            var b = a.open(this.getAttribute("href"), "popup", "height=400,width=500,left=10,top=10,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no");
            b.focus()
        },
        getMetadataFromElement: function(b) {
            var c = a.encodeURIComponent,
                d = b.getAttribute("data-url") || "",
                e = {
                    url: c(d + "?utm_source=#source#&utm_medium=share-bar-" + this.context + "&utm_campaign=share-bar"),
                    title: c(b.getAttribute("data-title") || ""),
                    imageUrl: c(b.getAttribute("data-image-url") || ""),
                    hashtags: c(b.getAttribute("data-hashtags") || "")
                };
            return e
        },
        deviceIsIphone: function() {
            return null !== navigator.userAgent.match(/iPhone/i)
        },
        isSmallScreen: function() {
            var b = 768,
                c = a.innerWidth || screen.width;
            return b > c
        },
        createButton: function(a, c, d, e, f, g) {
            var h = b.createElement("div"),
                i = "";
            return f = f || c, h.className = "share-button share-" + c + d, f = f[0].toUpperCase() + f.slice(1), e = e.replace("%23source%23", c), g || (i = this.classPopup), h.innerHTML = ['<a class="' + i + '" href="' + e + '" title="Compartilhar via ' + f + '" target="_blank" rel="external">', this.createContentButton(c, f), "</a>"].join(""), a.appendChild(h), this.onCreateButton(h), h
        },
        createContentButton: function(a, b) {
            var c;
            return b = b || a, c = this.supportSvg ? ['   <div class="svg-size">', '      <svg viewBox="0 0 100 100" class="share-icon">', '           <use xlink:href="#icon-' + a + '"></use>', "       </svg>", "   </div>", "<span>" + b + "</span>"].join("") : ['   <i class="share-font ico-share-' + a + '"></i>', "   <span>" + b + "</span>"].join("")
        },
        createFacebookButton: function(b, e) {
            var f = "",
                g = "",
                h = this.getMetadataFromElement(b),
                i = h.url.replace("%23source%23", "facebook");
            e = e || "", g = this.createButton(b, "facebook", e, "http://www.facebook.com/", "", !0), this.getFacebookUi(), f = function() {
                var b = a.decodeURIComponent;
                FB.ui({
                    method: "feed",
                    link: b(i),
                    name: b(h.title),
                    picture: b(h.imageUrl)
                })
            }, d(g, this.eventName, f), d(g, "click", c)
        },
        getFacebookUi: function() {
            var c = this.facebookAppId || this.getOgFbAppId();
            return a.FB ? !1 : void(c && (a.fbAsyncInit = function() {
                FB.init({
                    appId: c,
                    xfbml: !0,
                    version: "v2.1"
                })
            }, function(a, b, c) {
                var d, e = a.getElementsByTagName(b)[0];
                a.getElementById(c) || (d = a.createElement(b), d.id = c, d.src = "//connect.facebook.net/en_US/sdk.js", e.parentNode.insertBefore(d, e))
            }(b, "script", "facebook-jssdk")))
        },
        getOgFbAppId: function() {
            var a = b.querySelector("meta[property='fb:app_id']");
            return null !== a ? a.getAttribute("content") : void 0
        },
        createTwitterButton: function(a, b) {
            var c = this.getMetadataFromElement(a);
            b = b || "", this.createButton(a, "twitter", b, "https://twitter.com/share?url=" + c.url + "&amp;text=" + c.title + " " + c.hashtags)
        },
        createGoogleButton: function(a, b) {
            var c = this.getMetadataFromElement(a);
            b = b || "", this.createButton(a, "googleplus", b, "https://plus.google.com/share?url=" + c.url, "google+")
        },
        createPinterestButton: function(a, b) {
            var c = this.getMetadataFromElement(a);
            b = b || "", this.createButton(a, "pinterest", b, "http://www.pinterest.com/pin/create/button/?url=" + c.url + "&amp;media=" + c.imageUrl + "&amp;description=" + c.title)
        },
        createWhatsappButton: function(a, b) {
            var c = this.getMetadataFromElement(a);
            return this.isSmallScreen() && this.isTouch() ? (b = b || "", void this.createButton(a, "whatsapp", b, "whatsapp://send?text=" + c.title + "%20" + c.url, "", !0)) : !1
        },
        createEmailButton: function(a, b) {
            var c = this.getMetadataFromElement(a);
            return this.isTouch() ? (b = b || "", void this.createButton(a, "email", b, "mailto:?subject=" + c.title + "&amp;body=" + c.url, "e-mail", !0)) : !1
        }
    }
}(window, document);
(function(a) {
    var b = "Close",
        c = "BeforeClose",
        d = "AfterClose",
        e = "BeforeAppend",
        f = "MarkupParse",
        g = "Open",
        h = "Change",
        i = "mfp",
        j = "." + i,
        k = "mfp-ready",
        l = "mfp-removing",
        m = "mfp-prevent-close",
        n, o = function() {},
        p = !!window.jQuery,
        q, r = a(window),
        s, t, u, v, w, x = function(a, b) {
            n.ev.on(i + a + j, b)
        },
        y = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        z = function(b, c) {
            n.ev.triggerHandler(i + b, c), n.st.callbacks && (b = b.charAt(0).toLowerCase() + b.slice(1), n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]))
        },
        A = function(b) {
            if (b !== w || !n.currTemplate.closeBtn) n.currTemplate.closeBtn = a(n.st.closeMarkup.replace("%title%", n.st.tClose)), w = b;
            return n.currTemplate.closeBtn
        },
        B = function() {
            a.magnificPopup.instance || (n = new o, n.init(), a.magnificPopup.instance = n)
        },
        C = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (a.transition !== undefined) return !0;
            while (b.length)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    o.prototype = {
        constructor: o,
        init: function() {
            var b = navigator.appVersion;
            n.isIE7 = b.indexOf("MSIE 7.") !== -1, n.isIE8 = b.indexOf("MSIE 8.") !== -1, n.isLowIE = n.isIE7 || n.isIE8, n.isAndroid = /android/gi.test(b), n.isIOS = /iphone|ipad|ipod/gi.test(b), n.supportsTransition = C(), n.probablyMobile = n.isAndroid || n.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), t = a(document), n.popupsCache = {}
        },
        open: function(b) {
            s || (s = a(document.body));
            var c;
            if (b.isObj === !1) {
                n.items = b.items.toArray(), n.index = 0;
                var d = b.items,
                    e;
                for (c = 0; c < d.length; c++) {
                    e = d[c], e.parsed && (e = e.el[0]);
                    if (e === b.el[0]) {
                        n.index = c;
                        break
                    }
                }
            } else n.items = a.isArray(b.items) ? b.items : [b.items], n.index = b.index || 0;
            if (n.isOpen) {
                n.updateItemHTML();
                return
            }
            n.types = [], v = "", b.mainEl && b.mainEl.length ? n.ev = b.mainEl.eq(0) : n.ev = t, b.key ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}), n.currTemplate = n.popupsCache[b.key]) : n.currTemplate = {}, n.st = a.extend(!0, {}, a.magnificPopup.defaults, b), n.fixedContentPos = n.st.fixedContentPos === "auto" ? !n.probablyMobile : n.st.fixedContentPos, n.st.modal && (n.st.closeOnContentClick = !1, n.st.closeOnBgClick = !1, n.st.showCloseBtn = !1, n.st.enableEscapeKey = !1), n.bgOverlay || (n.bgOverlay = y("bg").on("click" + j, function() {
                n.close()
            }), n.wrap = y("wrap").attr("tabindex", -1).on("click" + j, function(a) {
                n._checkIfClose(a.target) && n.close()
            }), n.container = y("container", n.wrap)), n.contentContainer = y("content"), n.st.preloader && (n.preloader = y("preloader", n.container, n.st.tLoading));
            var h = a.magnificPopup.modules;
            for (c = 0; c < h.length; c++) {
                var i = h[c];
                i = i.charAt(0).toUpperCase() + i.slice(1), n["init" + i].call(n)
            }
            z("BeforeOpen"), n.st.showCloseBtn && (n.st.closeBtnInside ? (x(f, function(a, b, c, d) {
                c.close_replaceWith = A(d.type)
            }), v += " mfp-close-btn-in") : n.wrap.append(A())), n.st.alignTop && (v += " mfp-align-top"), n.fixedContentPos ? n.wrap.css({
                overflow: n.st.overflowY,
                overflowX: "hidden",
                overflowY: n.st.overflowY
            }) : n.wrap.css({
                top: r.scrollTop(),
                position: "absolute"
            }), (n.st.fixedBgPos === !1 || n.st.fixedBgPos === "auto" && !n.fixedContentPos) && n.bgOverlay.css({
                height: t.height(),
                position: "absolute"
            }), n.st.enableEscapeKey && t.on("keyup" + j, function(a) {
                a.keyCode === 27 && n.close()
            }), r.on("resize" + j, function() {
                n.updateSize()
            }), n.st.closeOnContentClick || (v += " mfp-auto-cursor"), v && n.wrap.addClass(v);
            var l = n.wH = r.height(),
                m = {};
            if (n.fixedContentPos && n._hasScrollBar(l)) {
                var o = n._getScrollbarSize();
                o && (m.marginRight = o)
            }
            n.fixedContentPos && (n.isIE7 ? a("body, html").css("overflow", "hidden") : m.overflow = "hidden");
            var p = n.st.mainClass;
            return n.isIE7 && (p += " mfp-ie7"), p && n._addClassToMFP(p), n.updateItemHTML(), z("BuildControls"), a("html").css(m), n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || s), n._lastFocusedEl = document.activeElement, setTimeout(function() {
                n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k), t.on("focusin" + j, n._onFocusIn)
            }, 16), n.isOpen = !0, n.updateSize(l), z(g), b
        },
        close: function() {
            if (!n.isOpen) return;
            z(c), n.isOpen = !1, n.st.removalDelay && !n.isLowIE && n.supportsTransition ? (n._addClassToMFP(l), setTimeout(function() {
                n._close()
            }, n.st.removalDelay)) : n._close()
        },
        _close: function() {
            z(b);
            var c = l + " " + k + " ";
            n.bgOverlay.detach(), n.wrap.detach(), n.container.empty(), n.st.mainClass && (c += n.st.mainClass + " "), n._removeClassFromMFP(c);
            if (n.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                n.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            t.off("keyup" + j + " focusin" + j), n.ev.off(j), n.wrap.attr("class", "mfp-wrap").removeAttr("style"), n.bgOverlay.attr("class", "mfp-bg"), n.container.attr("class", "mfp-container"), n.st.showCloseBtn && (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) && n.currTemplate.closeBtn && n.currTemplate.closeBtn.detach(), n._lastFocusedEl && a(n._lastFocusedEl).focus(), n.currItem = null, n.content = null, n.currTemplate = null, n.prevHeight = 0, z(d)
        },
        updateSize: function(a) {
            if (n.isIOS) {
                var b = document.documentElement.clientWidth / window.innerWidth,
                    c = window.innerHeight * b;
                n.wrap.css("height", c), n.wH = c
            } else n.wH = a || r.height();
            n.fixedContentPos || n.wrap.css("height", n.wH), z("Resize")
        },
        updateItemHTML: function() {
            var b = n.items[n.index];
            n.contentContainer.detach(), n.content && n.content.detach(), b.parsed || (b = n.parseEl(n.index));
            var c = b.type;
            z("BeforeChange", [n.currItem ? n.currItem.type : "", c]), n.currItem = b;
            if (!n.currTemplate[c]) {
                var d = n.st[c] ? n.st[c].markup : !1;
                z("FirstMarkupParse", d), d ? n.currTemplate[c] = a(d) : n.currTemplate[c] = !0
            }
            u && u !== b.type && n.container.removeClass("mfp-" + u + "-holder");
            var e = n["get" + c.charAt(0).toUpperCase() + c.slice(1)](b, n.currTemplate[c]);
            n.appendContent(e, c), b.preloaded = !0, z(h, b), u = b.type, n.container.prepend(n.contentContainer), z("AfterChange")
        },
        appendContent: function(a, b) {
            n.content = a, a ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0 ? n.content.find(".mfp-close").length || n.content.append(A()) : n.content = a : n.content = "", z(e), n.container.addClass("mfp-" + b + "-holder"), n.contentContainer.append(n.content)
        },
        parseEl: function(b) {
            var c = n.items[b],
                d;
            c.tagName ? c = {
                el: a(c)
            } : (d = c.type, c = {
                data: c,
                src: c.src
            });
            if (c.el) {
                var e = n.types;
                for (var f = 0; f < e.length; f++)
                    if (c.el.hasClass("mfp-" + e[f])) {
                        d = e[f];
                        break
                    }
                c.src = c.el.attr("data-mfp-src"), c.src || (c.src = c.el.attr("href"))
            }
            return c.type = d || n.st.type || "inline", c.index = b, c.parsed = !0, n.items[b] = c, z("ElementParse", c), n.items[b]
        },
        addGroup: function(a, b) {
            var c = function(c) {
                c.mfpEl = this, n._openClick(c, a, b)
            };
            b || (b = {});
            var d = "click.magnificPopup";
            b.mainEl = a, b.items ? (b.isObj = !0, a.off(d).on(d, c)) : (b.isObj = !1, b.delegate ? a.off(d).on(d, b.delegate, c) : (b.items = a, a.off(d).on(d, c)))
        },
        _openClick: function(b, c, d) {
            var e = d.midClick !== undefined ? d.midClick : a.magnificPopup.defaults.midClick;
            if (!e && (b.which === 2 || b.ctrlKey || b.metaKey)) return;
            var f = d.disableOn !== undefined ? d.disableOn : a.magnificPopup.defaults.disableOn;
            if (f)
                if (a.isFunction(f)) {
                    if (!f.call(n)) return !0
                } else if (r.width() < f) return !0;
            b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()), d.el = a(b.mfpEl), d.delegate && (d.items = c.find(d.delegate)), n.open(d)
        },
        updateStatus: function(a, b) {
            if (n.preloader) {
                q !== a && n.container.removeClass("mfp-s-" + q), !b && a === "loading" && (b = n.st.tLoading);
                var c = {
                    status: a,
                    text: b
                };
                z("UpdateStatus", c), a = c.status, b = c.text, n.preloader.html(b), n.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), n.container.addClass("mfp-s-" + a), q = a
            }
        },
        _checkIfClose: function(b) {
            if (a(b).hasClass(m)) return;
            var c = n.st.closeOnContentClick,
                d = n.st.closeOnBgClick;
            if (c && d) return !0;
            if (!n.content || a(b).hasClass("mfp-close") || n.preloader && b === n.preloader[0]) return !0;
            if (b !== n.content[0] && !a.contains(n.content[0], b)) {
                if (d && a.contains(document, b)) return !0
            } else if (c) return !0;
            return !1
        },
        _addClassToMFP: function(a) {
            n.bgOverlay.addClass(a), n.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), n.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (n.isIE7 ? t.height() : document.body.scrollHeight) > (a || r.height())
        },
        _setFocus: function() {
            (n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus()
        },
        _onFocusIn: function(b) {
            if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target)) return n._setFocus(), !1
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), z(f, [b, c, d]), a.each(c, function(a, c) {
                if (c === undefined || c === !1) return !0;
                e = a.split("_");
                if (e.length > 1) {
                    var d = b.find(j + "-" + e[0]);
                    if (d.length > 0) {
                        var f = e[1];
                        f === "replaceWith" ? d[0] !== c[0] && d.replaceWith(c) : f === "img" ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c)
                    }
                } else b.find(j + "-" + a).html(c)
            })
        },
        _getScrollbarSize: function() {
            if (n.scrollbarSize === undefined) {
                var a = document.createElement("div");
                a.id = "mfp-sbm", a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), n.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return n.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: o.prototype,
        modules: [],
        open: function(b, c) {
            return B(), b ? b = a.extend(!0, {}, b) : b = {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, a.fn.magnificPopup = function(b) {
        B();
        var c = a(this);
        if (typeof b == "string")
            if (b === "open") {
                var d, e = p ? c.data("magnificPopup") : c[0].magnificPopup,
                    f = parseInt(arguments[1], 10) || 0;
                e.items ? d = e.items[f] : (d = c, e.delegate && (d = d.find(e.delegate)), d = d.eq(f)), n._openClick({
                    mfpEl: d
                }, c, e)
            } else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
        else b = a.extend(!0, {}, b), p ? c.data("magnificPopup", b) : c[0].magnificPopup = b, n.addGroup(c, b);
        return c
    };
    var D = "inline",
        E, F, G, H = function() {
            G && (F.after(G.addClass(E)).detach(), G = null)
        };
    a.magnificPopup.registerModule(D, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                n.types.push(D), x(b + "." + D, function() {
                    H()
                })
            },
            getInline: function(b, c) {
                H();
                if (b.src) {
                    var d = n.st.inline,
                        e = a(b.src);
                    if (e.length) {
                        var f = e[0].parentNode;
                        f && f.tagName && (F || (E = d.hiddenClass, F = y(E), E = "mfp-" + E), G = e.after(F).detach().removeClass(E)), n.updateStatus("ready")
                    } else n.updateStatus("error", d.tNotFound), e = a("<div>");
                    return b.inlineElement = e, e
                }
                return n.updateStatus("ready"), n._parseMarkup(c, {}, b), c
            }
        }
    });
    var I, J = function(b) {
        if (b.data && b.data.title !== undefined) return b.data.title;
        var c = n.st.image.titleSrc;
        if (c) {
            if (a.isFunction(c)) return c.call(n, b);
            if (b.el) return b.el.attr(c) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var a = n.st.image,
                    c = ".image";
                n.types.push("image"), x(g + c, function() {
                    n.currItem.type === "image" && a.cursor && s.addClass(a.cursor)
                }), x(b + c, function() {
                    a.cursor && s.removeClass(a.cursor), r.off("resize" + j)
                }), x("Resize" + c, n.resizeImage), n.isLowIE && x("AfterChange", n.resizeImage)
            },
            resizeImage: function() {
                var a = n.currItem;
                if (!a || !a.img) return;
                if (n.st.image.verticalFit) {
                    var b = 0;
                    n.isLowIE && (b = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", n.wH - b)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, I && clearInterval(I), a.isCheckingImgSize = !1, z("ImageHasSize", a), a.imgHidden && (n.content && n.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var b = 0,
                    c = a.img[0],
                    d = function(e) {
                        I && clearInterval(I), I = setInterval(function() {
                            if (c.naturalWidth > 0) {
                                n._onImageHasSize(a);
                                return
                            }
                            b > 200 && clearInterval(I), b++, b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500)
                        }, e)
                    };
                d(1)
            },
            getImage: function(b, c) {
                var d = 0,
                    e = function() {
                        b && (b.img[0].complete ? (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("ready")), b.hasSize = !0, b.loaded = !0, z("ImageLoadComplete")) : (d++, d < 200 ? setTimeout(e, 100) : f()))
                    },
                    f = function() {
                        b && (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("error", g.tError.replace("%url%", b.src))), b.hasSize = !0, b.loaded = !0, b.loadError = !0)
                    },
                    g = n.st.image,
                    h = c.find(".mfp-img");
                if (h.length) {
                    var i = document.createElement("img");
                    i.className = "mfp-img", b.img = a(i).on("load.mfploader", e).on("error.mfploader", f), i.src = b.src, h.is("img") && (b.img = b.img.clone()), i = b.img[0], i.naturalWidth > 0 ? b.hasSize = !0 : i.width || (b.hasSize = !1)
                }
                return n._parseMarkup(c, {
                    title: J(b),
                    img_replaceWith: b.img
                }, b), n.resizeImage(), b.hasSize ? (I && clearInterval(I), b.loadError ? (c.addClass("mfp-loading"), n.updateStatus("error", g.tError.replace("%url%", b.src))) : (c.removeClass("mfp-loading"), n.updateStatus("ready")), c) : (n.updateStatus("loading"), b.loading = !0, b.hasSize || (b.imgHidden = !0, c.addClass("mfp-loading"), n.findImageSize(b)), c)
            }
        }
    });
    var K, L = function() {
        return K === undefined && (K = document.createElement("p").style.MozTransform !== undefined), K
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a = n.st.zoom,
                    d = ".zoom",
                    e;
                if (!a.enabled || !n.supportsTransition) return;
                var f = a.duration,
                    g = function(b) {
                        var c = b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            d = "all " + a.duration / 1e3 + "s " + a.easing,
                            e = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            },
                            f = "transition";
                        return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, c.css(e), c
                    },
                    h = function() {
                        n.content.css("visibility", "visible")
                    },
                    i, j;
                x("BuildControls" + d, function() {
                    if (n._allowZoom()) {
                        clearTimeout(i), n.content.css("visibility", "hidden"), e = n._getItemToZoom();
                        if (!e) {
                            h();
                            return
                        }
                        j = g(e), j.css(n._getOffset()), n.wrap.append(j), i = setTimeout(function() {
                            j.css(n._getOffset(!0)), i = setTimeout(function() {
                                h(), setTimeout(function() {
                                    j.remove(), e = j = null, z("ZoomAnimationEnded")
                                }, 16)
                            }, f)
                        }, 16)
                    }
                }), x(c + d, function() {
                    if (n._allowZoom()) {
                        clearTimeout(i), n.st.removalDelay = f;
                        if (!e) {
                            e = n._getItemToZoom();
                            if (!e) return;
                            j = g(e)
                        }
                        j.css(n._getOffset(!0)), n.wrap.append(j), n.content.css("visibility", "hidden"), setTimeout(function() {
                            j.css(n._getOffset())
                        }, 16)
                    }
                }), x(b + d, function() {
                    n._allowZoom() && (h(), j && j.remove(), e = null)
                })
            },
            _allowZoom: function() {
                return n.currItem.type === "image"
            },
            _getItemToZoom: function() {
                return n.currItem.hasSize ? n.currItem.img : !1
            },
            _getOffset: function(b) {
                var c;
                b ? c = n.currItem.img : c = n.st.zoom.opener(n.currItem.el || n.currItem);
                var d = c.offset(),
                    e = parseInt(c.css("padding-top"), 10),
                    f = parseInt(c.css("padding-bottom"), 10);
                d.top -= a(window).scrollTop() - e;
                var g = {
                    width: c.width(),
                    height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e
                };
                return L() ? g["-moz-transform"] = g.transform = "translate(" + d.left + "px," + d.top + "px)" : (g.left = d.left, g.top = d.top), g
            }
        }
    }), B()
})(window.jQuery || window.Zepto);
(function(window, $) {
    'use strict';
    var src = 'http://s.glbimg.com/gl/cd/libs/';
    var getCachedScript = function(url, callback) {
        callback = callback || function() {};
        $.ajax({
            url: url,
            dataType: "script",
            cache: true,
            success: callback
        });
    };
    var lightbox = function lightbox(options) {
        if (!window.gui || !window.gui.lightbox) {
            getCachedScript(src + 'gui-lightbox/1.4.13/js/gui.lightbox.min.js', function() {
                if (!window.ShareBar) {
                    getCachedScript(src + 'share-bar/3.0.15/js/share.bar.min.js', function() {
                        window.gui.lightbox.init(options);
                    });
                } else {
                    window.gui.lightbox.init(options);
                }
            });
        } else {
            window.gui.lightbox.init(options);
        }
    };
    window.GUILightbox = function(context, options) {
        options = options || {};
        options.arg_busca = context.selector + ' ' + (options.arg_busca || '[data-video-id]');
        lightbox(options);
        console.warn('Method window.GUILightbox is deprecated, use gui.lightbox instead.');
    };
    $.fn.playerVideoLightBox = function(options) {
        options = options || {};
        options.arg_busca = $(this).selector + ' ' + (options.arg_busca || '[data-video-id]');
        lightbox(options);
        console.warn('Method $.playerVideoLightBox is deprecated, use gui.lightbox instead.');
        return this;
    };
})(window, jQuery);
(function() {
    var getData, initVitrines, optionsAjax, url, widgets;
    window.globoComVitrines = [];
    widgets = $('.widget-shopping');
    getData = function(shopping, dataAttr) {
        return shopping.attr('data-' + dataAttr);
    };
    initVitrines = function() {
        return widgets.each(function() {
            var brandingColor, options, responsive, shopping, sitepage, vitrine;
            shopping = $(this);
            sitepage = getData(shopping, 'sitepage');
            responsive = getData(shopping, 'responsive') === 'on';
            brandingColor = getData(shopping, 'branding-color');
            if (sitepage == null) {
                sitepage = "globocom/home";
            }
            options = {
                sitepage: sitepage,
                container: shopping.attr('id')
            };
            if (brandingColor !== "") {
                options.text_color = brandingColor;
            }
            vitrine = new Vitrine(options);
            vitrine.init();
            return window.globoComVitrines.push(vitrine);
        });
    };
    if (widgets.length > 0) {
        url = getData(widgets.first(), 'url') || "http://vitrines.globo.com/vitrine/vitrine.min.js";
        optionsAjax = {
            url: url,
            dataType: "script",
            cache: true,
            success: initVitrines
        };
        $.ajax(optionsAjax);
    }
}).call(this);
jQuery(function($) {
    'use strict';

    function _createConfig(series, tipo) {
        var values = series,
            abertura = parseFloat(series[0][1]),
            start = series[0][0],
            chartColor = tipo === 'negativo' ? '#C5160C' : '#65a021',
            finish = start + (7 * 60 * 60 * 1000);
        return {
            chart: {
                type: 'spline',
                spacingLeft: 20,
                spacingRight: 0,
                spacingBottom: 0,
                animation: {
                    duration: 1200
                }
            },
            colors: [chartColor],
            credits: {
                enabled: false
            },
            navigation: {
                buttonOptions: false,
            },
            xAxis: {
                tickInterval: 3600 * 1000,
                type: 'datetime',
                min: start,
                max: finish,
                labels: {
                    overflow: 'right',
                    step: 7,
                    autoRotation: false,
                    style: {
                        'font-family': 'opensans-regular'
                    }
                },
                dateTimeLabelFormats: {
                    hour: '%Hh',
                },
                tickWidth: 0,
                lineWidth: 0,
                gridLineWidth: 0,
                maxPadding: 0,
                startOnTick: true,
                endOnTick: true,
                tickLength: 3,
                tickmarkPlacement: "on",
                plotLines: [{
                    id: 'time-start',
                    color: '#ccc',
                    dashStyle: 'Solid',
                    width: 1,
                    value: start,
                    zIndex: 0
                }],
            },
            yAxis: {
                gridLineWidth: 0,
                lineColor: '#999',
                labels: {
                    enabled: false,
                },
                title: {
                    text: null,
                },
                plotLines: [{
                    id: 'limit-open',
                    color: '#333',
                    dashStyle: 'Dot',
                    width: 1,
                    value: abertura,
                    zIndex: 1
                }],
            },
            legend: {
                enabled: false,
            },
            title: {
                text: null,
            },
            tooltip: {
                headerFormat: '',
                borderColor: '#e5e5e5',
                borderRadius: 4,
                pointFormat: '{point.x}<br/><b>{point.y}</b>',
                formatter: function() {
                    return 'HorÃ¡rio: ' + Highcharts.dateFormat('%Hh%M', new Date(this.x)) +
                        '<br/><b>' + this.y + ' pontos</b>';
                }
            },
            plotOptions: {
                spline: {
                    lineWidth: 2,
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [{
                data: []
            }]
        };
    }
    $.fn.ibovespaChart = function(series, tipo) {
        var delayControl, instance = this,
            $chartArea = $(instance),
            chartConfig = _createConfig(series, tipo),
            $scrollTarget = $([window, window.document.body]);
        $chartArea.highcharts(chartConfig);

        function _isScrolledIntoChart() {
            var $window = $(window),
                docViewTop = $window.scrollTop(),
                docViewBottom = docViewTop + $window.height(),
                elemTop = $chartArea.offset().top,
                elemBottom = elemTop + $chartArea.height();
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

        function _scrollToChartHandler(e) {
            window.clearTimeout(delayControl);
            delayControl = window.setTimeout(function() {
                if (_isScrolledIntoChart()) {
                    $chartArea.trigger('ibovespaChart.visible');
                    $chartArea.addClass('loaded-chart');
                }
            }, 50);
        }
        $scrollTarget.on('scroll', _scrollToChartHandler);
        $chartArea.on('ibovespaChart.visible', function(e) {
            var ibovespaChart = $chartArea.highcharts();
            ibovespaChart.series[0].remove();
            ibovespaChart.addSeries({
                data: series,
                marker: {
                    symbol: 'circle'
                }
            });
            $scrollTarget.off('scroll', _scrollToChartHandler);
        });
        _scrollToChartHandler();
        return $chartArea;
    };
});
jQuery(function($) {
    if (window.gui && window.gui.card_economia && window.gui.card_economia.timeseries && window.gui.card_economia.timeseries[0]) {
        function callChart() {
            $('.widget-card-economia .widget-card-economia_bolsa__chart').ibovespaChart(window.gui.card_economia.timeseries, window.gui.card_economia.tipo);
        }
        if ($.fn.highcharts) {
            callChart();
        } else {
            $.ajax({
                url: '//s.glbimg.com/gl/cd/libs/highcharts/4.1.9/highcharts.js',
                dataType: "script",
                cache: true,
                success: callChart
            });
        }
    }
});
(function(window, $) {
    'use strict';
    window.CardLocal = function(selector, options) {
        options = options || {};
        var self = this,
            saoPaulo = CardLocal.Local('SP', 'SÃ£o Paulo', 'sao-paulo', 'SÃ£o Paulo', 'http://semantica.globo.com/base/Cidade_Sao_Paulo_SP'),
            _history = CardLocal.History(options.history),
            _local = saoPaulo;
        this.init = function() {
            this.$el = $(selector);
            this.$title = this.$el.find('.js-card-local-title');
            this.$links = this.$title;
            this.$content = this.$el.find('.js-card-local-content');
            this.$loading = this.$el.find('.js-card-local-loading');
            this.$search = this.$el.find('.js-card-local-search');
            this.$searchText = this.$el.find('.js-card-local-search-text');
            this.$searchToggle = this.$el.find('.js-card-local-search-toggle');
            this.$linkFooter = this.$el.find('.js-card-local-region-link.card-local-footer');
            this.brazilianStates = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
            CardLocal.Search({
                element: this.$search,
                history: _history
            });
            this.bindActions();
            this.bindCallbacks();
            window.CardLocal.TabBar({
                element: this.$el
            });
            this.loadLocal();
        };
        this.bindActions = function() {
            var _render = function _render(html) {
                this.$content.html(html);
                this.$title.text(this.$content.find('.js-card-local-editoria-title').text());
                this.$links.attr('href', this.$content.find('.js-card-local-editoria-url').text());
                this.$linkFooter.attr('href', this.$content.find('.js-card-local-editoria-url').text());
                window.CardLocal.TabBar({
                    element: this.$el
                });
                this.applyJS(html);
                this.$el.trigger('loadedLocal');
            };
            this.$el.on('setLocal', function(e, local) {
                self.$loading.show();
                $.ajax({
                    url: '/api/card-local/' + local.city.uri.replace('http://', ''),
                    complete: function() {
                        self.$loading.hide();
                    },
                    success: _render.bind(self)
                });
            });
            this.$searchToggle.on('click', function() {
                var closed = self.$search.hasClass('off');
                self.$search.stop(true, true);
                if (closed) {
                    self.$search.slideDown('linear', self.openSearch);
                } else {
                    self.$search.slideUp('linear', self.closeSearch);
                    self.$el.trigger('closeSearch');
                }
            });
            this.$search.on('localSelect', function(event, local) {
                this.setLocal(local);
            }.bind(this));
        };
        this.openSearch = function openSearch() {
            self.$search.removeClass('off').show();
            self.$searchText.focus();
            self.$el.trigger('openSearch');
        };
        this.closeSearch = function closeSearch() {
            self.$search.addClass('off').hide();
        };
        this.applyJS = function(html) {
            var regJSScripts = new RegExp('/\<script.*?>(.*?)\<\/script\>/gi'),
                regJSTags = new RegExp('/\<\/?script.*?\>/gi'),
                scripts = html.match(regJSScripts);
            if (scripts && scripts.length) {
                html = html.replace(regJSScripts, '');
                for (var i = 0; i < scripts.length; i++) {
                    var scriptEl = document.createElement('script'),
                        scriptContent = scripts[i];
                    scriptContent.replace(regJSTags, '');
                    scriptEl.innerText = scriptContent;
                    document.body.appendChild(scriptEl);
                }
            }
            return html;
        };
        this.bindCallbacks = function() {
            window.globoapi_geo_callback = this.globoapi_geo_callback.bind(this);
        };
        this.loadLocal = function() {
            var local = _history.newest();
            if (local && local.city && local.city.uri && local.city.uri !== saoPaulo.city.uri) {
                this.setLocal(local);
            } else {
                this.getUserLocationFromGeoApi();
            }
        };
        this.getUserLocationFromGeoApi = function() {
            this.$loading.show();
            $.ajax({
                url: 'http://api.globo.com/geo',
                dataType: 'jsonp',
                jsonp: 'globoapi_geo_callback'
            });
        };
        this.globoapi_geo_callback = function(data) {
            if (!data || !data.extra || !data.city || (data && data.extra && data.extra.city_uri === saoPaulo.city.uri)) {
                this.$loading.hide();
            } else {
                this.setLocal(CardLocal.Local.from_geo(data));
            }
        };
        this.getLocal = function() {
            return _local;
        };
        this.setLocal = function(l) {
            _local = l;
            this.closeSearch();
            this.$el.trigger('setLocal', _local);
        };
        this.init();
    };
    window.CardLocal.TabBar = function(options) {
        options = options || {};
        var $el = $(options.element),
            $tabBar = $el.find('.js-card-local-tabs'),
            $tabs = $([]),
            $content = $el.find('.js-card-local-tabs-content'),
            $tabsContents = $el.find('.js-modulo-local-tab'),
            $inlines = $el.find('.js-modulo-local-inline'),
            $firstTab, $currentTab, $currentContent;
        $tabBar.hide().empty();
        $tabsContents.remove();
        var loadThumbs = function($content) {
            var $moduloPracaImgs = $content.find('.modulo-local-praca-tv-item-foto');
            $moduloPracaImgs.each(function() {
                var $image = $(this);
                var thumbUrl = $image.attr("data-thumb-url");
                if (thumbUrl) {
                    $image.css({
                        height: "100px",
                        width: "170px"
                    });
                    $image.one("load", function() {
                        $(this).css({
                            height: "",
                            width: ""
                        });
                    });
                    $image.attr("src", thumbUrl);
                    $image.removeAttr("data-thumb-url");
                }
            });
        };
        if ($tabsContents.length > 0) {
            $inlines.remove();
            $currentContent = $('<div class="modulo-local-tab js-modulo-local-tab">');
            $currentContent.append($inlines);
            $tabsContents = $currentContent.add($tabsContents);
            $tabsContents.hide().each(function(index) {
                var $tab = $('<li>'),
                    $tabContent = $(this);
                $tab.text($tabContent.data('modulo-local-tab-title')).addClass('js-card-local-tab').addClass('card-local-tab').addClass('gui-tab-item').on('click', function() {
                    var $target = $(this);
                    if ($target.is($currentTab)) {
                        return;
                    }
                    $currentTab.removeClass('js-card-local-tab--active').removeClass('gui-is-activated').removeClass('gui-color-primary-border-bottom').removeClass('gui-color-primary');
                    $currentTab = $target;
                    $currentTab.addClass('js-card-local-tab--active').addClass('gui-is-activated').addClass('gui-color-primary-border-bottom').addClass('gui-color-primary');
                    if ($tabContent[0] !== $firstTab[0]) {
                        $tabContent.height($firstTab.height());
                    }
                    $currentContent.hide().addClass('modulo-local-tab--hidden');
                    $currentContent = $tabContent;
                    $currentContent.show().removeClass('modulo-local-tab--hidden');
                    loadThumbs($currentContent);
                    $(".modulo-local-praca-tv-item-text").dotdotdot({
                        watch: "window"
                    });
                    $('.modulo-local-praca-tv.nano').nanoScroller({
                        paneClass: 'pane',
                        contentClass: 'content',
                        sliderClass: 'slider',
                        preventPageScrolling: true,
                        alwaysVisible: true
                    });
                    $el.trigger('changeTab', index);
                });
                $tabBar.append($tab);
                $tabs = $tabs.add($tab);
            });
            $currentContent = $firstTab = $tabsContents.eq(0);
            $currentContent.show();
            $currentTab = $tabs.eq(0);
            $currentTab.text('Ãšltimas').addClass('js-card-local-tab--active').addClass('gui-is-activated').addClass('gui-color-primary-border-bottom').addClass('gui-color-primary');
            $tabBar.show();
            $content.append($tabsContents);
        }
    };
    window.CardLocal.Search = function(options) {
        options = options || {};
        var $el = $(options.element);
        var $input = $el.find('.js-card-local-search-input');
        var $result = $el.find('.js-card-local-search-result');
        var $title = $el.find('.js-card-local-search-title');
        var $resultList = $el.find('.js-card-local-search-result-list');
        var history = options.history || CardLocal.History();
        var autocomplete = function autocomplete() {
            var term = $input.val();
            if (term.length < 3) {
                if (history.isEmpty()) {
                    clearResult();
                } else {
                    renderList('Escolhidas Recentemente', history.slice(), 'history');
                }
            } else {
                $.ajax({
                    url: "http://api.globo.com/citysearch/" + encodeURIComponent(term) + ".jsonp",
                    dataType: "jsonp",
                    jsonp: "globoapi_citySearch_callback"
                });
            }
        };
        var renderList = function renderList(title, cities, origin) {
            var $list = $(),
                city;
            $result.show();
            $title.empty();
            $resultList.empty();
            $title.text(title);
            for (var i = 0; i < cities.length; i++) {
                city = cities[i];
                $list = $list.add(renderListItem(city, origin));
            }
            $resultList.html($list);
        };
        var renderListItem = function renderListItem(local, origin) {
            var $item = $('<li class="card-local-result-item js-card-local-search-result-item"></li>'),
                $cidade = $('<span class="gui-color-primary card-local-resultado-cidade"></span>');
            $cidade.text(local.city.name);
            $item.text(' - ' + local.state);
            $item.prepend($cidade);
            $item.on('click', function() {
                $el.trigger('localSelect', $.extend({}, local, {
                    origin: origin
                }));
                history.add(local);
            });
            return $item;
        };
        var citysearchCallback = function(data) {
            var brazilianStates = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
                results = data.results || [],
                cities = [],
                city;
            for (var index = 0; index < results.length; index++) {
                city = results[index];
                if (_.includes(brazilianStates, city.state)) {
                    cities.push(CardLocal.Local.from_citysearch(city));
                }
            }
            renderList('Cidades Encontradas', cities, 'search');
        };
        var clearResult = function clearResult() {
            $result.hide();
            $title.empty();
            $resultList.empty();
        };
        var init = function init() {
            if (!history.isEmpty()) {
                renderList('Escolhidas Recentemente', history.slice(), 'history');
            } else {
                clearResult();
            }
            window.globoapi_citySearch_callback = citysearchCallback;
            $input.on('keyup', _.throttle(autocomplete, 400));
        };
        init();
    };
    window.CardLocal.History = function(options) {
        options = options || {};
        var maxSize = options.maxSize || 100,
            localStorageKey = options.localStorageKey || 'CardLocal.History',
            history = (options.history || JSON.parse(localStorage.getItem(localStorageKey)) || []).slice(0, maxSize);
        var add = function add(selection) {
            history = _.reject(history, selection);
            history.unshift(selection);
            history = history.slice(0, maxSize);
            localStorage.setItem(localStorageKey, JSON.stringify(history));
        };
        var clear = function clear() {
            history = [];
            localStorage.setItem(localStorageKey, JSON.stringify(history));
        };
        var size = function size() {
            return history.length;
        };
        var isEmpty = function isEmpty() {
            return size() === 0;
        };
        var slice = function slice() {
            var start = 0,
                end = size();
            if (arguments.length === 2) {
                start = arguments[0];
                end = arguments[1];
            }
            return history.slice(start, end);
        };
        var oldest = function oldest() {
            return history[history.length - 1];
        };
        var newest = function newest() {
            return history[0];
        };
        return {
            add: add,
            clear: clear,
            isEmpty: isEmpty,
            size: size,
            slice: slice,
            oldest: oldest,
            newest: newest
        };
    };
    window.CardLocal.Tracking = function(options) {
        options = options || {};
        var $cardLocal = $(options.element);
        $cardLocal.on('openSearch', function() {
            if (glb && glb.ElementTracker) {
                glb.ElementTracker.push($(this), {
                    'label': 'interacao | seta troca cidade | abrir',
                    'value': 0,
                    'noninteraction': true
                });
            }
        });
        $cardLocal.on('closeSearch', function() {
            if (glb && glb.ElementTracker) {
                glb.ElementTracker.push($(this), {
                    'label': 'interacao | seta troca cidade | fechar',
                    'value': 0,
                    'noninteraction': true
                });
            }
        });
        $cardLocal.on('localSelect', function(event, local) {
            var origin = local.origin === 'history' ? 'escolhidas recentemente' : 'locais encontrados';
            if (glb && glb.ElementTracker) {
                glb.ElementTracker.push($(this), {
                    'label': 'interacao | troca view | ' + origin,
                    'value': 0,
                    'noninteraction': true
                });
            }
        });
        $cardLocal.on('changeTab', function(event, index) {
            if (glb && glb.ElementTracker) {
                glb.ElementTracker.push($(this), {
                    'label': 'interacao | troca view | posicao '.concat(String(index + 1)),
                    'value': 0,
                    'noninteraction': true
                });
            }
        });
        $cardLocal.on('click', '.js-modulo-local-inline', function() {
            var $modulo = $(this),
                $modulos = $cardLocal.find('.js-modulo-local-inline'),
                position = $modulos.index($modulo) + 1,
                name;
            if ($modulo.find('.modulo-local-destaque-afiliada').length) {
                name = 'noticia';
            } else if ($modulo.find('.modulo-local-tempo').length) {
                name = 'tempo';
            } else if ($modulo.find('.modulo-local-interatividade').length) {
                name = 'transito';
            } else if ($modulo.find('.modulo-local-agenda-de-shows').length) {
                name = 'agenda shows';
            }
            glb.ElementTracker.push($modulo, {
                'label': 'clique | ' + name + ' | posicao ' + position
            });
        });
    };
    window.CardLocal.Local = function(state, regionName, regionPath, cityName, cityURI) {
        return {
            state: state,
            region: {
                name: regionName,
                path: regionPath
            },
            city: {
                name: cityName,
                uri: cityURI
            }
        };
    };
    window.CardLocal.Local.from_geo = function(geoObject) {
        return window.CardLocal.Local(geoObject.state.code, geoObject.extra.region_name, geoObject.extra.region_news_path, geoObject.city.name, geoObject.extra.city_uri);
    };
    window.CardLocal.Local.from_citysearch = function(citysearchObject) {
        return window.CardLocal.Local(citysearchObject.state, citysearchObject.region_name, citysearchObject.region_news_path, citysearchObject.city, citysearchObject.city_uri);
    };
})(window, jQuery);;
(function() {
    var undefined;
    var VERSION = '3.10.1';
    var BIND_FLAG = 1,
        BIND_KEY_FLAG = 2,
        CURRY_BOUND_FLAG = 4,
        CURRY_FLAG = 8,
        CURRY_RIGHT_FLAG = 16,
        PARTIAL_FLAG = 32,
        PARTIAL_RIGHT_FLAG = 64,
        ARY_FLAG = 128,
        REARG_FLAG = 256;
    var DEFAULT_TRUNC_LENGTH = 30,
        DEFAULT_TRUNC_OMISSION = '...';
    var HOT_COUNT = 150,
        HOT_SPAN = 16;
    var LARGE_ARRAY_SIZE = 200;
    var LAZY_FILTER_FLAG = 1,
        LAZY_MAP_FLAG = 2;
    var FUNC_ERROR_TEXT = 'Expected a function';
    var PLACEHOLDER = '__lodash_placeholder__';
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';
    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
        reUnescapedHtml = /[&<>"'`]/g,
        reHasEscapedHtml = RegExp(reEscapedHtml.source),
        reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g,
        reEvaluate = /<%([\s\S]+?)%>/g,
        reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/,
        rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
    var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
        reHasRegExpChars = RegExp(reRegExpChars.source);
    var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;
    var reEscapeChar = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reHasHexPrefix = /^0[xX]/;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^\d+$/;
    var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var reWords = (function() {
        var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
            lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';
        return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
    }());
    var contextProps = ['Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array', 'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number', 'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'isFinite', 'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array', 'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap'];
    var shadowProps = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;
    var deburredLetters = {
        '\xc0': 'A',
        '\xc1': 'A',
        '\xc2': 'A',
        '\xc3': 'A',
        '\xc4': 'A',
        '\xc5': 'A',
        '\xe0': 'a',
        '\xe1': 'a',
        '\xe2': 'a',
        '\xe3': 'a',
        '\xe4': 'a',
        '\xe5': 'a',
        '\xc7': 'C',
        '\xe7': 'c',
        '\xd0': 'D',
        '\xf0': 'd',
        '\xc8': 'E',
        '\xc9': 'E',
        '\xca': 'E',
        '\xcb': 'E',
        '\xe8': 'e',
        '\xe9': 'e',
        '\xea': 'e',
        '\xeb': 'e',
        '\xcC': 'I',
        '\xcd': 'I',
        '\xce': 'I',
        '\xcf': 'I',
        '\xeC': 'i',
        '\xed': 'i',
        '\xee': 'i',
        '\xef': 'i',
        '\xd1': 'N',
        '\xf1': 'n',
        '\xd2': 'O',
        '\xd3': 'O',
        '\xd4': 'O',
        '\xd5': 'O',
        '\xd6': 'O',
        '\xd8': 'O',
        '\xf2': 'o',
        '\xf3': 'o',
        '\xf4': 'o',
        '\xf5': 'o',
        '\xf6': 'o',
        '\xf8': 'o',
        '\xd9': 'U',
        '\xda': 'U',
        '\xdb': 'U',
        '\xdc': 'U',
        '\xf9': 'u',
        '\xfa': 'u',
        '\xfb': 'u',
        '\xfc': 'u',
        '\xdd': 'Y',
        '\xfd': 'y',
        '\xff': 'y',
        '\xc6': 'Ae',
        '\xe6': 'ae',
        '\xde': 'Th',
        '\xfe': 'th',
        '\xdf': 'ss'
    };
    var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;'
    };
    var htmlUnescapes = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#96;': '`'
    };
    var objectTypes = {
        'function': true,
        'object': true
    };
    var regexpEscapes = {
        '0': 'x30',
        '1': 'x31',
        '2': 'x32',
        '3': 'x33',
        '4': 'x34',
        '5': 'x35',
        '6': 'x36',
        '7': 'x37',
        '8': 'x38',
        '9': 'x39',
        'A': 'x41',
        'B': 'x42',
        'C': 'x43',
        'D': 'x44',
        'E': 'x45',
        'F': 'x46',
        'a': 'x61',
        'b': 'x62',
        'c': 'x63',
        'd': 'x64',
        'e': 'x65',
        'f': 'x66',
        'n': 'x6e',
        'r': 'x72',
        't': 'x74',
        'u': 'x75',
        'v': 'x76',
        'x': 'x78'
    };
    var stringEscapes = {
        '\\': '\\',
        "'": "'",
        '\n': 'n',
        '\r': 'r',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
    var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
    var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;
    var freeSelf = objectTypes[typeof self] && self && self.Object && self;
    var freeWindow = objectTypes[typeof window] && window && window.Object && window;
    var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
    var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;

    function baseCompareAscending(value, other) {
        if (value !== other) {
            var valIsNull = value === null,
                valIsUndef = value === undefined,
                valIsReflexive = value === value;
            var othIsNull = other === null,
                othIsUndef = other === undefined,
                othIsReflexive = other === other;
            if ((value > other && !othIsNull) || !valIsReflexive || (valIsNull && !othIsUndef && othIsReflexive) || (valIsUndef && othIsReflexive)) {
                return 1;
            }
            if ((value < other && !valIsNull) || !othIsReflexive || (othIsNull && !valIsUndef && valIsReflexive) || (othIsUndef && valIsReflexive)) {
                return -1;
            }
        }
        return 0;
    }

    function baseFindIndex(array, predicate, fromRight) {
        var length = array.length,
            index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length)) {
            if (predicate(array[index], index, array)) {
                return index;
            }
        }
        return -1;
    }

    function baseIndexOf(array, value, fromIndex) {
        if (value !== value) {
            return indexOfNaN(array, fromIndex);
        }
        var index = fromIndex - 1,
            length = array.length;
        while (++index < length) {
            if (array[index] === value) {
                return index;
            }
        }
        return -1;
    }

    function baseIsFunction(value) {
        return typeof value == 'function' || false;
    }

    function baseToString(value) {
        return value == null ? '' : (value + '');
    }

    function charsLeftIndex(string, chars) {
        var index = -1,
            length = string.length;
        while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
        return index;
    }

    function charsRightIndex(string, chars) {
        var index = string.length;
        while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
        return index;
    }

    function compareAscending(object, other) {
        return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
    }

    function compareMultiple(object, other, orders) {
        var index = -1,
            objCriteria = object.criteria,
            othCriteria = other.criteria,
            length = objCriteria.length,
            ordersLength = orders.length;
        while (++index < length) {
            var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
            if (result) {
                if (index >= ordersLength) {
                    return result;
                }
                var order = orders[index];
                return result * ((order === 'asc' || order === true) ? 1 : -1);
            }
        }
        return object.index - other.index;
    }

    function deburrLetter(letter) {
        return deburredLetters[letter];
    }

    function escapeHtmlChar(chr) {
        return htmlEscapes[chr];
    }

    function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
        if (leadingChar) {
            chr = regexpEscapes[chr];
        } else if (whitespaceChar) {
            chr = stringEscapes[chr];
        }
        return '\\' + chr;
    }

    function escapeStringChar(chr) {
        return '\\' + stringEscapes[chr];
    }

    function indexOfNaN(array, fromIndex, fromRight) {
        var length = array.length,
            index = fromIndex + (fromRight ? 0 : -1);
        while ((fromRight ? index-- : ++index < length)) {
            var other = array[index];
            if (other !== other) {
                return index;
            }
        }
        return -1;
    }
    var isHostObject = (function() {
        try {
            Object({
                'toString': 0
            } + '');
        } catch (e) {
            return function() {
                return false;
            };
        }
        return function(value) {
            return typeof value.toString != 'function' && typeof(value + '') == 'string';
        };
    }());

    function isObjectLike(value) {
        return !!value && typeof value == 'object';
    }

    function isSpace(charCode) {
        return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 || (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
    }

    function replaceHolders(array, placeholder) {
        var index = -1,
            length = array.length,
            resIndex = -1,
            result = [];
        while (++index < length) {
            if (array[index] === placeholder) {
                array[index] = PLACEHOLDER;
                result[++resIndex] = index;
            }
        }
        return result;
    }

    function sortedUniq(array, iteratee) {
        var seen, index = -1,
            length = array.length,
            resIndex = -1,
            result = [];
        while (++index < length) {
            var value = array[index],
                computed = iteratee ? iteratee(value, index, array) : value;
            if (!index || seen !== computed) {
                seen = computed;
                result[++resIndex] = value;
            }
        }
        return result;
    }

    function trimmedLeftIndex(string) {
        var index = -1,
            length = string.length;
        while (++index < length && isSpace(string.charCodeAt(index))) {}
        return index;
    }

    function trimmedRightIndex(string) {
        var index = string.length;
        while (index-- && isSpace(string.charCodeAt(index))) {}
        return index;
    }

    function unescapeHtmlChar(chr) {
        return htmlUnescapes[chr];
    }

    function runInContext(context) {
        context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
        var Array = context.Array,
            Date = context.Date,
            Error = context.Error,
            Function = context.Function,
            Math = context.Math,
            Number = context.Number,
            Object = context.Object,
            RegExp = context.RegExp,
            String = context.String,
            TypeError = context.TypeError;
        var arrayProto = Array.prototype,
            errorProto = Error.prototype,
            objectProto = Object.prototype,
            stringProto = String.prototype;
        var fnToString = Function.prototype.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var objToString = objectProto.toString;
        var oldDash = root._;
        var reIsNative = RegExp('^' +
            fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
        var ArrayBuffer = context.ArrayBuffer,
            clearTimeout = context.clearTimeout,
            parseFloat = context.parseFloat,
            pow = Math.pow,
            propertyIsEnumerable = objectProto.propertyIsEnumerable,
            Set = getNative(context, 'Set'),
            setTimeout = context.setTimeout,
            splice = arrayProto.splice,
            Uint8Array = context.Uint8Array,
            WeakMap = getNative(context, 'WeakMap');
        var nativeCeil = Math.ceil,
            nativeCreate = getNative(Object, 'create'),
            nativeFloor = Math.floor,
            nativeIsArray = getNative(Array, 'isArray'),
            nativeIsFinite = context.isFinite,
            nativeKeys = getNative(Object, 'keys'),
            nativeMax = Math.max,
            nativeMin = Math.min,
            nativeNow = getNative(Date, 'now'),
            nativeParseInt = context.parseInt,
            nativeRandom = Math.random;
        var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
            POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
        var MAX_ARRAY_LENGTH = 4294967295,
            MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
            HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var MAX_SAFE_INTEGER = 9007199254740991;
        var metaMap = WeakMap && new WeakMap;
        var realNames = {};
        var ctorByTag = {};
        ctorByTag[float32Tag] = context.Float32Array;
        ctorByTag[float64Tag] = context.Float64Array;
        ctorByTag[int8Tag] = context.Int8Array;
        ctorByTag[int16Tag] = context.Int16Array;
        ctorByTag[int32Tag] = context.Int32Array;
        ctorByTag[uint8Tag] = Uint8Array;
        ctorByTag[uint8ClampedTag] = context.Uint8ClampedArray;
        ctorByTag[uint16Tag] = context.Uint16Array;
        ctorByTag[uint32Tag] = context.Uint32Array;
        var nonEnumProps = {};
        nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = {
            'constructor': true,
            'toLocaleString': true,
            'toString': true,
            'valueOf': true
        };
        nonEnumProps[boolTag] = nonEnumProps[stringTag] = {
            'constructor': true,
            'toString': true,
            'valueOf': true
        };
        nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = {
            'constructor': true,
            'toString': true
        };
        nonEnumProps[objectTag] = {
            'constructor': true
        };
        arrayEach(shadowProps, function(key) {
            for (var tag in nonEnumProps) {
                if (hasOwnProperty.call(nonEnumProps, tag)) {
                    var props = nonEnumProps[tag];
                    props[key] = hasOwnProperty.call(props, key);
                }
            }
        });

        function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
                if (value instanceof LodashWrapper) {
                    return value;
                }
                if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
                    return wrapperClone(value);
                }
            }
            return new LodashWrapper(value);
        }

        function baseLodash() {}

        function LodashWrapper(value, chainAll, actions) {
            this.__wrapped__ = value;
            this.__actions__ = actions || [];
            this.__chain__ = !!chainAll;
        }
        var support = lodash.support = {};
        (function(x) {
            var Ctor = function() {
                    this.x = x;
                },
                object = {
                    '0': x,
                    'length': x
                },
                props = [];
            Ctor.prototype = {
                'valueOf': x,
                'y': x
            };
            for (var key in new Ctor) {
                props.push(key);
            }
            support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');
            support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');
            support.nonEnumShadows = !/valueOf/.test(props);
            support.ownLast = props[0] != 'x';
            support.spliceObjects = (splice.call(object, 0, 1), !object[0]);
            support.unindexedChars = ('x' [0] + Object('x')[0]) != 'xx';
        }(1, 0));
        lodash.templateSettings = {
            'escape': reEscape,
            'evaluate': reEvaluate,
            'interpolate': reInterpolate,
            'variable': '',
            'imports': {
                '_': lodash
            }
        };

        function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = POSITIVE_INFINITY;
            this.__views__ = [];
        }

        function lazyClone() {
            var result = new LazyWrapper(this.__wrapped__);
            result.__actions__ = arrayCopy(this.__actions__);
            result.__dir__ = this.__dir__;
            result.__filtered__ = this.__filtered__;
            result.__iteratees__ = arrayCopy(this.__iteratees__);
            result.__takeCount__ = this.__takeCount__;
            result.__views__ = arrayCopy(this.__views__);
            return result;
        }

        function lazyReverse() {
            if (this.__filtered__) {
                var result = new LazyWrapper(this);
                result.__dir__ = -1;
                result.__filtered__ = true;
            } else {
                result = this.clone();
                result.__dir__ *= -1;
            }
            return result;
        }

        function lazyValue() {
            var array = this.__wrapped__.value(),
                dir = this.__dir__,
                isArr = isArray(array),
                isRight = dir < 0,
                arrLength = isArr ? array.length : 0,
                view = getView(0, arrLength, this.__views__),
                start = view.start,
                end = view.end,
                length = end - start,
                index = isRight ? end : (start - 1),
                iteratees = this.__iteratees__,
                iterLength = iteratees.length,
                resIndex = 0,
                takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || arrLength < LARGE_ARRAY_SIZE || (arrLength == length && takeCount == length)) {
                return baseWrapperValue(array, this.__actions__);
            }
            var result = [];
            outer: while (length-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1,
                    value = array[index];
                while (++iterIndex < iterLength) {
                    var data = iteratees[iterIndex],
                        iteratee = data.iteratee,
                        type = data.type,
                        computed = iteratee(value);
                    if (type == LAZY_MAP_FLAG) {
                        value = computed;
                    } else if (!computed) {
                        if (type == LAZY_FILTER_FLAG) {
                            continue outer;
                        } else {
                            break outer;
                        }
                    }
                }
                result[resIndex++] = value;
            }
            return result;
        }

        function MapCache() {
            this.__data__ = {};
        }

        function mapDelete(key) {
            return this.has(key) && delete this.__data__[key];
        }

        function mapGet(key) {
            return key == '__proto__' ? undefined : this.__data__[key];
        }

        function mapHas(key) {
            return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
        }

        function mapSet(key, value) {
            if (key != '__proto__') {
                this.__data__[key] = value;
            }
            return this;
        }

        function SetCache(values) {
            var length = values ? values.length : 0;
            this.data = {
                'hash': nativeCreate(null),
                'set': new Set
            };
            while (length--) {
                this.push(values[length]);
            }
        }

        function cacheIndexOf(cache, value) {
            var data = cache.data,
                result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
            return result ? 0 : -1;
        }

        function cachePush(value) {
            var data = this.data;
            if (typeof value == 'string' || isObject(value)) {
                data.set.add(value);
            } else {
                data.hash[value] = true;
            }
        }

        function arrayConcat(array, other) {
            var index = -1,
                length = array.length,
                othIndex = -1,
                othLength = other.length,
                result = Array(length + othLength);
            while (++index < length) {
                result[index] = array[index];
            }
            while (++othIndex < othLength) {
                result[index++] = other[othIndex];
            }
            return result;
        }

        function arrayCopy(source, array) {
            var index = -1,
                length = source.length;
            array || (array = Array(length));
            while (++index < length) {
                array[index] = source[index];
            }
            return array;
        }

        function arrayEach(array, iteratee) {
            var index = -1,
                length = array.length;
            while (++index < length) {
                if (iteratee(array[index], index, array) === false) {
                    break;
                }
            }
            return array;
        }

        function arrayEachRight(array, iteratee) {
            var length = array.length;
            while (length--) {
                if (iteratee(array[length], length, array) === false) {
                    break;
                }
            }
            return array;
        }

        function arrayEvery(array, predicate) {
            var index = -1,
                length = array.length;
            while (++index < length) {
                if (!predicate(array[index], index, array)) {
                    return false;
                }
            }
            return true;
        }

        function arrayExtremum(array, iteratee, comparator, exValue) {
            var index = -1,
                length = array.length,
                computed = exValue,
                result = computed;
            while (++index < length) {
                var value = array[index],
                    current = +iteratee(value);
                if (comparator(current, computed)) {
                    computed = current;
                    result = value;
                }
            }
            return result;
        }

        function arrayFilter(array, predicate) {
            var index = -1,
                length = array.length,
                resIndex = -1,
                result = [];
            while (++index < length) {
                var value = array[index];
                if (predicate(value, index, array)) {
                    result[++resIndex] = value;
                }
            }
            return result;
        }

        function arrayMap(array, iteratee) {
            var index = -1,
                length = array.length,
                result = Array(length);
            while (++index < length) {
                result[index] = iteratee(array[index], index, array);
            }
            return result;
        }

        function arrayPush(array, values) {
            var index = -1,
                length = values.length,
                offset = array.length;
            while (++index < length) {
                array[offset + index] = values[index];
            }
            return array;
        }

        function arrayReduce(array, iteratee, accumulator, initFromArray) {
            var index = -1,
                length = array.length;
            if (initFromArray && length) {
                accumulator = array[++index];
            }
            while (++index < length) {
                accumulator = iteratee(accumulator, array[index], index, array);
            }
            return accumulator;
        }

        function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
            var length = array.length;
            if (initFromArray && length) {
                accumulator = array[--length];
            }
            while (length--) {
                accumulator = iteratee(accumulator, array[length], length, array);
            }
            return accumulator;
        }

        function arraySome(array, predicate) {
            var index = -1,
                length = array.length;
            while (++index < length) {
                if (predicate(array[index], index, array)) {
                    return true;
                }
            }
            return false;
        }

        function arraySum(array, iteratee) {
            var length = array.length,
                result = 0;
            while (length--) {
                result += +iteratee(array[length]) || 0;
            }
            return result;
        }

        function assignDefaults(objectValue, sourceValue) {
            return objectValue === undefined ? sourceValue : objectValue;
        }

        function assignOwnDefaults(objectValue, sourceValue, key, object) {
            return (objectValue === undefined || !hasOwnProperty.call(object, key)) ? sourceValue : objectValue;
        }

        function assignWith(object, source, customizer) {
            var index = -1,
                props = keys(source),
                length = props.length;
            while (++index < length) {
                var key = props[index],
                    value = object[key],
                    result = customizer(value, source[key], key, object, source);
                if ((result === result ? (result !== value) : (value === value)) || (value === undefined && !(key in object))) {
                    object[key] = result;
                }
            }
            return object;
        }

        function baseAssign(object, source) {
            return source == null ? object : baseCopy(source, keys(source), object);
        }

        function baseAt(collection, props) {
            var index = -1,
                isNil = collection == null,
                isArr = !isNil && isArrayLike(collection),
                length = isArr ? collection.length : 0,
                propsLength = props.length,
                result = Array(propsLength);
            while (++index < propsLength) {
                var key = props[index];
                if (isArr) {
                    result[index] = isIndex(key, length) ? collection[key] : undefined;
                } else {
                    result[index] = isNil ? undefined : collection[key];
                }
            }
            return result;
        }

        function baseCopy(source, props, object) {
            object || (object = {});
            var index = -1,
                length = props.length;
            while (++index < length) {
                var key = props[index];
                object[key] = source[key];
            }
            return object;
        }

        function baseCallback(func, thisArg, argCount) {
            var type = typeof func;
            if (type == 'function') {
                return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
            }
            if (func == null) {
                return identity;
            }
            if (type == 'object') {
                return baseMatches(func);
            }
            return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
        }

        function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
            var result;
            if (customizer) {
                result = object ? customizer(value, key, object) : customizer(value);
            }
            if (result !== undefined) {
                return result;
            }
            if (!isObject(value)) {
                return value;
            }
            var isArr = isArray(value);
            if (isArr) {
                result = initCloneArray(value);
                if (!isDeep) {
                    return arrayCopy(value, result);
                }
            } else {
                var tag = objToString.call(value),
                    isFunc = tag == funcTag;
                if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
                    if (isHostObject(value)) {
                        return object ? value : {};
                    }
                    result = initCloneObject(isFunc ? {} : value);
                    if (!isDeep) {
                        return baseAssign(result, value);
                    }
                } else {
                    return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : (object ? value : {});
                }
            }
            stackA || (stackA = []);
            stackB || (stackB = []);
            var length = stackA.length;
            while (length--) {
                if (stackA[length] == value) {
                    return stackB[length];
                }
            }
            stackA.push(value);
            stackB.push(result);
            (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
                result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
            });
            return result;
        }
        var baseCreate = (function() {
            function object() {}
            return function(prototype) {
                if (isObject(prototype)) {
                    object.prototype = prototype;
                    var result = new object;
                    object.prototype = undefined;
                }
                return result || {};
            };
        }());

        function baseDelay(func, wait, args) {
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            return setTimeout(function() {
                func.apply(undefined, args);
            }, wait);
        }

        function baseDifference(array, values) {
            var length = array ? array.length : 0,
                result = [];
            if (!length) {
                return result;
            }
            var index = -1,
                indexOf = getIndexOf(),
                isCommon = indexOf === baseIndexOf,
                cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
                valuesLength = values.length;
            if (cache) {
                indexOf = cacheIndexOf;
                isCommon = false;
                values = cache;
            }
            outer: while (++index < length) {
                var value = array[index];
                if (isCommon && value === value) {
                    var valuesIndex = valuesLength;
                    while (valuesIndex--) {
                        if (values[valuesIndex] === value) {
                            continue outer;
                        }
                    }
                    result.push(value);
                } else if (indexOf(values, value, 0) < 0) {
                    result.push(value);
                }
            }
            return result;
        }
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);

        function baseEvery(collection, predicate) {
            var result = true;
            baseEach(collection, function(value, index, collection) {
                result = !!predicate(value, index, collection);
                return result;
            });
            return result;
        }

        function baseExtremum(collection, iteratee, comparator, exValue) {
            var computed = exValue,
                result = computed;
            baseEach(collection, function(value, index, collection) {
                var current = +iteratee(value, index, collection);
                if (comparator(current, computed) || (current === exValue && current === result)) {
                    computed = current;
                    result = value;
                }
            });
            return result;
        }

        function baseFill(array, value, start, end) {
            var length = array.length;
            start = start == null ? 0 : (+start || 0);
            if (start < 0) {
                start = -start > length ? 0 : (length + start);
            }
            end = (end === undefined || end > length) ? length : (+end || 0);
            if (end < 0) {
                end += length;
            }
            length = start > end ? 0 : (end >>> 0);
            start >>>= 0;
            while (start < length) {
                array[start++] = value;
            }
            return array;
        }

        function baseFilter(collection, predicate) {
            var result = [];
            baseEach(collection, function(value, index, collection) {
                if (predicate(value, index, collection)) {
                    result.push(value);
                }
            });
            return result;
        }

        function baseFind(collection, predicate, eachFunc, retKey) {
            var result;
            eachFunc(collection, function(value, key, collection) {
                if (predicate(value, key, collection)) {
                    result = retKey ? key : value;
                    return false;
                }
            });
            return result;
        }

        function baseFlatten(array, isDeep, isStrict, result) {
            result || (result = []);
            var index = -1,
                length = array.length;
            while (++index < length) {
                var value = array[index];
                if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
                    if (isDeep) {
                        baseFlatten(value, isDeep, isStrict, result);
                    } else {
                        arrayPush(result, value);
                    }
                } else if (!isStrict) {
                    result[result.length] = value;
                }
            }
            return result;
        }
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);

        function baseForIn(object, iteratee) {
            return baseFor(object, iteratee, keysIn);
        }

        function baseForOwn(object, iteratee) {
            return baseFor(object, iteratee, keys);
        }

        function baseForOwnRight(object, iteratee) {
            return baseForRight(object, iteratee, keys);
        }

        function baseFunctions(object, props) {
            var index = -1,
                length = props.length,
                resIndex = -1,
                result = [];
            while (++index < length) {
                var key = props[index];
                if (isFunction(object[key])) {
                    result[++resIndex] = key;
                }
            }
            return result;
        }

        function baseGet(object, path, pathKey) {
            if (object == null) {
                return;
            }
            object = toObject(object);
            if (pathKey !== undefined && pathKey in object) {
                path = [pathKey];
            }
            var index = 0,
                length = path.length;
            while (object != null && index < length) {
                object = toObject(object)[path[index++]];
            }
            return (index && index == length) ? object : undefined;
        }

        function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
            if (value === other) {
                return true;
            }
            if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
                return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
        }

        function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
            var objIsArr = isArray(object),
                othIsArr = isArray(other),
                objTag = arrayTag,
                othTag = arrayTag;
            if (!objIsArr) {
                objTag = objToString.call(object);
                if (objTag == argsTag) {
                    objTag = objectTag;
                } else if (objTag != objectTag) {
                    objIsArr = isTypedArray(object);
                }
            }
            if (!othIsArr) {
                othTag = objToString.call(other);
                if (othTag == argsTag) {
                    othTag = objectTag;
                } else if (othTag != objectTag) {
                    othIsArr = isTypedArray(other);
                }
            }
            var objIsObj = objTag == objectTag && !isHostObject(object),
                othIsObj = othTag == objectTag && !isHostObject(other),
                isSameTag = objTag == othTag;
            if (isSameTag && !(objIsArr || objIsObj)) {
                return equalByTag(object, other, objTag);
            }
            if (!isLoose) {
                var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
                    othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
                if (objIsWrapped || othIsWrapped) {
                    return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
                }
            }
            if (!isSameTag) {
                return false;
            }
            stackA || (stackA = []);
            stackB || (stackB = []);
            var length = stackA.length;
            while (length--) {
                if (stackA[length] == object) {
                    return stackB[length] == other;
                }
            }
            stackA.push(object);
            stackB.push(other);
            var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
            stackA.pop();
            stackB.pop();
            return result;
        }

        function baseIsMatch(object, matchData, customizer) {
            var index = matchData.length,
                length = index,
                noCustomizer = !customizer;
            if (object == null) {
                return !length;
            }
            object = toObject(object);
            while (index--) {
                var data = matchData[index];
                if ((noCustomizer && data[2]) ? data[1] !== object[data[0]] : !(data[0] in object)) {
                    return false;
                }
            }
            while (++index < length) {
                data = matchData[index];
                var key = data[0],
                    objValue = object[key],
                    srcValue = data[1];
                if (noCustomizer && data[2]) {
                    if (objValue === undefined && !(key in object)) {
                        return false;
                    }
                } else {
                    var result = customizer ? customizer(objValue, srcValue, key) : undefined;
                    if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
                        return false;
                    }
                }
            }
            return true;
        }

        function baseMap(collection, iteratee) {
            var index = -1,
                result = isArrayLike(collection) ? Array(collection.length) : [];
            baseEach(collection, function(value, key, collection) {
                result[++index] = iteratee(value, key, collection);
            });
            return result;
        }

        function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
                var key = matchData[0][0],
                    value = matchData[0][1];
                return function(object) {
                    if (object == null) {
                        return false;
                    }
                    object = toObject(object);
                    return object[key] === value && (value !== undefined || (key in object));
                };
            }
            return function(object) {
                return baseIsMatch(object, matchData);
            };
        }

        function baseMatchesProperty(path, srcValue) {
            var isArr = isArray(path),
                isCommon = isKey(path) && isStrictComparable(srcValue),
                pathKey = (path + '');
            path = toPath(path);
            return function(object) {
                if (object == null) {
                    return false;
                }
                var key = pathKey;
                object = toObject(object);
                if ((isArr || !isCommon) && !(key in object)) {
                    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
                    if (object == null) {
                        return false;
                    }
                    key = last(path);
                    object = toObject(object);
                }
                return object[key] === srcValue ? (srcValue !== undefined || (key in object)) : baseIsEqual(srcValue, object[key], undefined, true);
            };
        }

        function baseMerge(object, source, customizer, stackA, stackB) {
            if (!isObject(object)) {
                return object;
            }
            var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
                props = isSrcArr ? undefined : keys(source);
            arrayEach(props || source, function(srcValue, key) {
                if (props) {
                    key = srcValue;
                    srcValue = source[key];
                }
                if (isObjectLike(srcValue)) {
                    stackA || (stackA = []);
                    stackB || (stackB = []);
                    baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
                } else {
                    var value = object[key],
                        result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
                        isCommon = result === undefined;
                    if (isCommon) {
                        result = srcValue;
                    }
                    if ((result !== undefined || (isSrcArr && !(key in object))) && (isCommon || (result === result ? (result !== value) : (value === value)))) {
                        object[key] = result;
                    }
                }
            });
            return object;
        }

        function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
            var length = stackA.length,
                srcValue = source[key];
            while (length--) {
                if (stackA[length] == srcValue) {
                    object[key] = stackB[length];
                    return;
                }
            }
            var value = object[key],
                result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
                isCommon = result === undefined;
            if (isCommon) {
                result = srcValue;
                if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
                    result = isArray(value) ? value : (isArrayLike(value) ? arrayCopy(value) : []);
                } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                    result = isArguments(value) ? toPlainObject(value) : (isPlainObject(value) ? value : {});
                } else {
                    isCommon = false;
                }
            }
            stackA.push(srcValue);
            stackB.push(result);
            if (isCommon) {
                object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
            } else if (result === result ? (result !== value) : (value === value)) {
                object[key] = result;
            }
        }

        function baseProperty(key) {
            return function(object) {
                return object == null ? undefined : toObject(object)[key];
            };
        }

        function basePropertyDeep(path) {
            var pathKey = (path + '');
            path = toPath(path);
            return function(object) {
                return baseGet(object, path, pathKey);
            };
        }

        function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0;
            while (length--) {
                var index = indexes[length];
                if (index != previous && isIndex(index)) {
                    var previous = index;
                    splice.call(array, index, 1);
                }
            }
            return array;
        }

        function baseRandom(min, max) {
            return min + nativeFloor(nativeRandom() * (max - min + 1));
        }

        function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
            eachFunc(collection, function(value, index, collection) {
                accumulator = initFromCollection ? (initFromCollection = false, value) : iteratee(accumulator, value, index, collection);
            });
            return accumulator;
        }
        var baseSetData = !metaMap ? identity : function(func, data) {
            metaMap.set(func, data);
            return func;
        };

        function baseSlice(array, start, end) {
            var index = -1,
                length = array.length;
            start = start == null ? 0 : (+start || 0);
            if (start < 0) {
                start = -start > length ? 0 : (length + start);
            }
            end = (end === undefined || end > length) ? length : (+end || 0);
            if (end < 0) {
                end += length;
            }
            length = start > end ? 0 : ((end - start) >>> 0);
            start >>>= 0;
            var result = Array(length);
            while (++index < length) {
                result[index] = array[index + start];
            }
            return result;
        }

        function baseSome(collection, predicate) {
            var result;
            baseEach(collection, function(value, index, collection) {
                result = predicate(value, index, collection);
                return !result;
            });
            return !!result;
        }

        function baseSortBy(array, comparer) {
            var length = array.length;
            array.sort(comparer);
            while (length--) {
                array[length] = array[length].value;
            }
            return array;
        }

        function baseSortByOrder(collection, iteratees, orders) {
            var callback = getCallback(),
                index = -1;
            iteratees = arrayMap(iteratees, function(iteratee) {
                return callback(iteratee);
            });
            var result = baseMap(collection, function(value) {
                var criteria = arrayMap(iteratees, function(iteratee) {
                    return iteratee(value);
                });
                return {
                    'criteria': criteria,
                    'index': ++index,
                    'value': value
                };
            });
            return baseSortBy(result, function(object, other) {
                return compareMultiple(object, other, orders);
            });
        }

        function baseSum(collection, iteratee) {
            var result = 0;
            baseEach(collection, function(value, index, collection) {
                result += +iteratee(value, index, collection) || 0;
            });
            return result;
        }

        function baseUniq(array, iteratee) {
            var index = -1,
                indexOf = getIndexOf(),
                length = array.length,
                isCommon = indexOf === baseIndexOf,
                isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
                seen = isLarge ? createCache() : null,
                result = [];
            if (seen) {
                indexOf = cacheIndexOf;
                isCommon = false;
            } else {
                isLarge = false;
                seen = iteratee ? [] : result;
            }
            outer: while (++index < length) {
                var value = array[index],
                    computed = iteratee ? iteratee(value, index, array) : value;
                if (isCommon && value === value) {
                    var seenIndex = seen.length;
                    while (seenIndex--) {
                        if (seen[seenIndex] === computed) {
                            continue outer;
                        }
                    }
                    if (iteratee) {
                        seen.push(computed);
                    }
                    result.push(value);
                } else if (indexOf(seen, computed, 0) < 0) {
                    if (iteratee || isLarge) {
                        seen.push(computed);
                    }
                    result.push(value);
                }
            }
            return result;
        }

        function baseValues(object, props) {
            var index = -1,
                length = props.length,
                result = Array(length);
            while (++index < length) {
                result[index] = object[props[index]];
            }
            return result;
        }

        function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length,
                index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
            return isDrop ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length)) : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
        }

        function baseWrapperValue(value, actions) {
            var result = value;
            if (result instanceof LazyWrapper) {
                result = result.value();
            }
            var index = -1,
                length = actions.length;
            while (++index < length) {
                var action = actions[index];
                result = action.func.apply(action.thisArg, arrayPush([result], action.args));
            }
            return result;
        }

        function binaryIndex(array, value, retHighest) {
            var low = 0,
                high = array ? array.length : low;
            if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
                while (low < high) {
                    var mid = (low + high) >>> 1,
                        computed = array[mid];
                    if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
                        low = mid + 1;
                    } else {
                        high = mid;
                    }
                }
                return high;
            }
            return binaryIndexBy(array, value, identity, retHighest);
        }

        function binaryIndexBy(array, value, iteratee, retHighest) {
            value = iteratee(value);
            var low = 0,
                high = array ? array.length : 0,
                valIsNaN = value !== value,
                valIsNull = value === null,
                valIsUndef = value === undefined;
            while (low < high) {
                var mid = nativeFloor((low + high) / 2),
                    computed = iteratee(array[mid]),
                    isDef = computed !== undefined,
                    isReflexive = computed === computed;
                if (valIsNaN) {
                    var setLow = isReflexive || retHighest;
                } else if (valIsNull) {
                    setLow = isReflexive && isDef && (retHighest || computed != null);
                } else if (valIsUndef) {
                    setLow = isReflexive && (retHighest || isDef);
                } else if (computed == null) {
                    setLow = false;
                } else {
                    setLow = retHighest ? (computed <= value) : (computed < value);
                }
                if (setLow) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
        }

        function bindCallback(func, thisArg, argCount) {
            if (typeof func != 'function') {
                return identity;
            }
            if (thisArg === undefined) {
                return func;
            }
            switch (argCount) {
                case 1:
                    return function(value) {
                        return func.call(thisArg, value);
                    };
                case 3:
                    return function(value, index, collection) {
                        return func.call(thisArg, value, index, collection);
                    };
                case 4:
                    return function(accumulator, value, index, collection) {
                        return func.call(thisArg, accumulator, value, index, collection);
                    };
                case 5:
                    return function(value, other, key, object, source) {
                        return func.call(thisArg, value, other, key, object, source);
                    };
            }
            return function() {
                return func.apply(thisArg, arguments);
            };
        }

        function bufferClone(buffer) {
            var result = new ArrayBuffer(buffer.byteLength),
                view = new Uint8Array(result);
            view.set(new Uint8Array(buffer));
            return result;
        }

        function composeArgs(args, partials, holders) {
            var holdersLength = holders.length,
                argsIndex = -1,
                argsLength = nativeMax(args.length - holdersLength, 0),
                leftIndex = -1,
                leftLength = partials.length,
                result = Array(leftLength + argsLength);
            while (++leftIndex < leftLength) {
                result[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
                result[holders[argsIndex]] = args[argsIndex];
            }
            while (argsLength--) {
                result[leftIndex++] = args[argsIndex++];
            }
            return result;
        }

        function composeArgsRight(args, partials, holders) {
            var holdersIndex = -1,
                holdersLength = holders.length,
                argsIndex = -1,
                argsLength = nativeMax(args.length - holdersLength, 0),
                rightIndex = -1,
                rightLength = partials.length,
                result = Array(argsLength + rightLength);
            while (++argsIndex < argsLength) {
                result[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
                result[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
                result[offset + holders[holdersIndex]] = args[argsIndex++];
            }
            return result;
        }

        function createAggregator(setter, initializer) {
            return function(collection, iteratee, thisArg) {
                var result = initializer ? initializer() : {};
                iteratee = getCallback(iteratee, thisArg, 3);
                if (isArray(collection)) {
                    var index = -1,
                        length = collection.length;
                    while (++index < length) {
                        var value = collection[index];
                        setter(result, value, iteratee(value, index, collection), collection);
                    }
                } else {
                    baseEach(collection, function(value, key, collection) {
                        setter(result, value, iteratee(value, key, collection), collection);
                    });
                }
                return result;
            };
        }

        function createAssigner(assigner) {
            return restParam(function(object, sources) {
                var index = -1,
                    length = object == null ? 0 : sources.length,
                    customizer = length > 2 ? sources[length - 2] : undefined,
                    guard = length > 2 ? sources[2] : undefined,
                    thisArg = length > 1 ? sources[length - 1] : undefined;
                if (typeof customizer == 'function') {
                    customizer = bindCallback(customizer, thisArg, 5);
                    length -= 2;
                } else {
                    customizer = typeof thisArg == 'function' ? thisArg : undefined;
                    length -= (customizer ? 1 : 0);
                }
                if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                    customizer = length < 3 ? undefined : customizer;
                    length = 1;
                }
                while (++index < length) {
                    var source = sources[index];
                    if (source) {
                        assigner(object, source, customizer);
                    }
                }
                return object;
            });
        }

        function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee) {
                var length = collection ? getLength(collection) : 0;
                if (!isLength(length)) {
                    return eachFunc(collection, iteratee);
                }
                var index = fromRight ? length : -1,
                    iterable = toObject(collection);
                while ((fromRight ? index-- : ++index < length)) {
                    if (iteratee(iterable[index], index, iterable) === false) {
                        break;
                    }
                }
                return collection;
            };
        }

        function createBaseFor(fromRight) {
            return function(object, iteratee, keysFunc) {
                var iterable = toObject(object),
                    props = keysFunc(object),
                    length = props.length,
                    index = fromRight ? length : -1;
                while ((fromRight ? index-- : ++index < length)) {
                    var key = props[index];
                    if (iteratee(iterable[key], key, iterable) === false) {
                        break;
                    }
                }
                return object;
            };
        }

        function createBindWrapper(func, thisArg) {
            var Ctor = createCtorWrapper(func);

            function wrapper() {
                var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
                return fn.apply(thisArg, arguments);
            }
            return wrapper;
        }

        function createCache(values) {
            return (nativeCreate && Set) ? new SetCache(values) : null;
        }

        function createCompounder(callback) {
            return function(string) {
                var index = -1,
                    array = words(deburr(string)),
                    length = array.length,
                    result = '';
                while (++index < length) {
                    result = callback(result, array[index], index);
                }
                return result;
            };
        }

        function createCtorWrapper(Ctor) {
            return function() {
                var args = arguments;
                switch (args.length) {
                    case 0:
                        return new Ctor;
                    case 1:
                        return new Ctor(args[0]);
                    case 2:
                        return new Ctor(args[0], args[1]);
                    case 3:
                        return new Ctor(args[0], args[1], args[2]);
                    case 4:
                        return new Ctor(args[0], args[1], args[2], args[3]);
                    case 5:
                        return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                    case 6:
                        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                    case 7:
                        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                }
                var thisBinding = baseCreate(Ctor.prototype),
                    result = Ctor.apply(thisBinding, args);
                return isObject(result) ? result : thisBinding;
            };
        }

        function createCurry(flag) {
            function curryFunc(func, arity, guard) {
                if (guard && isIterateeCall(func, arity, guard)) {
                    arity = undefined;
                }
                var result = createWrapper(func, flag, undefined, undefined, undefined, undefined, undefined, arity);
                result.placeholder = curryFunc.placeholder;
                return result;
            }
            return curryFunc;
        }

        function createDefaults(assigner, customizer) {
            return restParam(function(args) {
                var object = args[0];
                if (object == null) {
                    return object;
                }
                args.push(customizer);
                return assigner.apply(undefined, args);
            });
        }

        function createExtremum(comparator, exValue) {
            return function(collection, iteratee, thisArg) {
                if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
                    iteratee = undefined;
                }
                iteratee = getCallback(iteratee, thisArg, 3);
                if (iteratee.length == 1) {
                    collection = isArray(collection) ? collection : toIterable(collection);
                    var result = arrayExtremum(collection, iteratee, comparator, exValue);
                    if (!(collection.length && result === exValue)) {
                        return result;
                    }
                }
                return baseExtremum(collection, iteratee, comparator, exValue);
            };
        }

        function createFind(eachFunc, fromRight) {
            return function(collection, predicate, thisArg) {
                predicate = getCallback(predicate, thisArg, 3);
                if (isArray(collection)) {
                    var index = baseFindIndex(collection, predicate, fromRight);
                    return index > -1 ? collection[index] : undefined;
                }
                return baseFind(collection, predicate, eachFunc);
            };
        }

        function createFindIndex(fromRight) {
            return function(array, predicate, thisArg) {
                if (!(array && array.length)) {
                    return -1;
                }
                predicate = getCallback(predicate, thisArg, 3);
                return baseFindIndex(array, predicate, fromRight);
            };
        }

        function createFindKey(objectFunc) {
            return function(object, predicate, thisArg) {
                predicate = getCallback(predicate, thisArg, 3);
                return baseFind(object, predicate, objectFunc, true);
            };
        }

        function createFlow(fromRight) {
            return function() {
                var wrapper, length = arguments.length,
                    index = fromRight ? length : -1,
                    leftIndex = 0,
                    funcs = Array(length);
                while ((fromRight ? index-- : ++index < length)) {
                    var func = funcs[leftIndex++] = arguments[index];
                    if (typeof func != 'function') {
                        throw new TypeError(FUNC_ERROR_TEXT);
                    }
                    if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
                        wrapper = new LodashWrapper([], true);
                    }
                }
                index = wrapper ? -1 : length;
                while (++index < length) {
                    func = funcs[index];
                    var funcName = getFuncName(func),
                        data = funcName == 'wrapper' ? getData(func) : undefined;
                    if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
                        wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                    } else {
                        wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
                    }
                }
                return function() {
                    var args = arguments,
                        value = args[0];
                    if (wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
                        return wrapper.plant(value).value();
                    }
                    var index = 0,
                        result = length ? funcs[index].apply(this, args) : value;
                    while (++index < length) {
                        result = funcs[index].call(this, result);
                    }
                    return result;
                };
            };
        }

        function createForEach(arrayFunc, eachFunc) {
            return function(collection, iteratee, thisArg) {
                return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ? arrayFunc(collection, iteratee) : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
            };
        }

        function createForIn(objectFunc) {
            return function(object, iteratee, thisArg) {
                if (typeof iteratee != 'function' || thisArg !== undefined) {
                    iteratee = bindCallback(iteratee, thisArg, 3);
                }
                return objectFunc(object, iteratee, keysIn);
            };
        }

        function createForOwn(objectFunc) {
            return function(object, iteratee, thisArg) {
                if (typeof iteratee != 'function' || thisArg !== undefined) {
                    iteratee = bindCallback(iteratee, thisArg, 3);
                }
                return objectFunc(object, iteratee);
            };
        }

        function createObjectMapper(isMapKeys) {
            return function(object, iteratee, thisArg) {
                var result = {};
                iteratee = getCallback(iteratee, thisArg, 3);
                baseForOwn(object, function(value, key, object) {
                    var mapped = iteratee(value, key, object);
                    key = isMapKeys ? mapped : key;
                    value = isMapKeys ? value : mapped;
                    result[key] = value;
                });
                return result;
            };
        }

        function createPadDir(fromRight) {
            return function(string, length, chars) {
                string = baseToString(string);
                return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
            };
        }

        function createPartial(flag) {
            var partialFunc = restParam(function(func, partials) {
                var holders = replaceHolders(partials, partialFunc.placeholder);
                return createWrapper(func, flag, undefined, partials, holders);
            });
            return partialFunc;
        }

        function createReduce(arrayFunc, eachFunc) {
            return function(collection, iteratee, accumulator, thisArg) {
                var initFromArray = arguments.length < 3;
                return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection)) ? arrayFunc(collection, iteratee, accumulator, initFromArray) : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
            };
        }

        function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
            var isAry = bitmask & ARY_FLAG,
                isBind = bitmask & BIND_FLAG,
                isBindKey = bitmask & BIND_KEY_FLAG,
                isCurry = bitmask & CURRY_FLAG,
                isCurryBound = bitmask & CURRY_BOUND_FLAG,
                isCurryRight = bitmask & CURRY_RIGHT_FLAG,
                Ctor = isBindKey ? undefined : createCtorWrapper(func);

            function wrapper() {
                var length = arguments.length,
                    index = length,
                    args = Array(length);
                while (index--) {
                    args[index] = arguments[index];
                }
                if (partials) {
                    args = composeArgs(args, partials, holders);
                }
                if (partialsRight) {
                    args = composeArgsRight(args, partialsRight, holdersRight);
                }
                if (isCurry || isCurryRight) {
                    var placeholder = wrapper.placeholder,
                        argsHolders = replaceHolders(args, placeholder);
                    length -= argsHolders.length;
                    if (length < arity) {
                        var newArgPos = argPos ? arrayCopy(argPos) : undefined,
                            newArity = nativeMax(arity - length, 0),
                            newsHolders = isCurry ? argsHolders : undefined,
                            newHoldersRight = isCurry ? undefined : argsHolders,
                            newPartials = isCurry ? args : undefined,
                            newPartialsRight = isCurry ? undefined : args;
                        bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
                        bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
                        if (!isCurryBound) {
                            bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
                        }
                        var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                            result = createHybridWrapper.apply(undefined, newData);
                        if (isLaziable(func)) {
                            setData(result, newData);
                        }
                        result.placeholder = placeholder;
                        return result;
                    }
                }
                var thisBinding = isBind ? thisArg : this,
                    fn = isBindKey ? thisBinding[func] : func;
                if (argPos) {
                    args = reorder(args, argPos);
                }
                if (isAry && ary < args.length) {
                    args.length = ary;
                }
                if (this && this !== root && this instanceof wrapper) {
                    fn = Ctor || createCtorWrapper(func);
                }
                return fn.apply(thisBinding, args);
            }
            return wrapper;
        }

        function createPadding(string, length, chars) {
            var strLength = string.length;
            length = +length;
            if (strLength >= length || !nativeIsFinite(length)) {
                return '';
            }
            var padLength = length - strLength;
            chars = chars == null ? ' ' : (chars + '');
            return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
        }

        function createPartialWrapper(func, bitmask, thisArg, partials) {
            var isBind = bitmask & BIND_FLAG,
                Ctor = createCtorWrapper(func);

            function wrapper() {
                var argsIndex = -1,
                    argsLength = arguments.length,
                    leftIndex = -1,
                    leftLength = partials.length,
                    args = Array(leftLength + argsLength);
                while (++leftIndex < leftLength) {
                    args[leftIndex] = partials[leftIndex];
                }
                while (argsLength--) {
                    args[leftIndex++] = arguments[++argsIndex];
                }
                var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
                return fn.apply(isBind ? thisArg : this, args);
            }
            return wrapper;
        }

        function createRound(methodName) {
            var func = Math[methodName];
            return function(number, precision) {
                precision = precision === undefined ? 0 : (+precision || 0);
                if (precision) {
                    precision = pow(10, precision);
                    return func(number * precision) / precision;
                }
                return func(number);
            };
        }

        function createSortedIndex(retHighest) {
            return function(array, value, iteratee, thisArg) {
                var callback = getCallback(iteratee);
                return (iteratee == null && callback === baseCallback) ? binaryIndex(array, value, retHighest) : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
            };
        }

        function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
            var isBindKey = bitmask & BIND_KEY_FLAG;
            if (!isBindKey && typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
                bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
                partials = holders = undefined;
            }
            length -= (holders ? holders.length : 0);
            if (bitmask & PARTIAL_RIGHT_FLAG) {
                var partialsRight = partials,
                    holdersRight = holders;
                partials = holders = undefined;
            }
            var data = isBindKey ? undefined : getData(func),
                newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
            if (data) {
                mergeData(newData, data);
                bitmask = newData[1];
                arity = newData[9];
            }
            newData[9] = arity == null ? (isBindKey ? 0 : func.length) : (nativeMax(arity - length, 0) || 0);
            if (bitmask == BIND_FLAG) {
                var result = createBindWrapper(newData[0], newData[2]);
            } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
                result = createPartialWrapper.apply(undefined, newData);
            } else {
                result = createHybridWrapper.apply(undefined, newData);
            }
            var setter = data ? baseSetData : setData;
            return setter(result, newData);
        }

        function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
            var index = -1,
                arrLength = array.length,
                othLength = other.length;
            if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
                return false;
            }
            while (++index < arrLength) {
                var arrValue = array[index],
                    othValue = other[index],
                    result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
                if (result !== undefined) {
                    if (result) {
                        continue;
                    }
                    return false;
                }
                if (isLoose) {
                    if (!arraySome(other, function(othValue) {
                            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
                        })) {
                        return false;
                    }
                } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
                    return false;
                }
            }
            return true;
        }

        function equalByTag(object, other, tag) {
            switch (tag) {
                case boolTag:
                case dateTag:
                    return +object == +other;
                case errorTag:
                    return object.name == other.name && object.message == other.message;
                case numberTag:
                    return (object != +object) ? other != +other : object == +other;
                case regexpTag:
                case stringTag:
                    return object == (other + '');
            }
            return false;
        }

        function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
            var objProps = keys(object),
                objLength = objProps.length,
                othProps = keys(other),
                othLength = othProps.length;
            if (objLength != othLength && !isLoose) {
                return false;
            }
            var index = objLength;
            while (index--) {
                var key = objProps[index];
                if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
                    return false;
                }
            }
            var skipCtor = isLoose;
            while (++index < objLength) {
                key = objProps[index];
                var objValue = object[key],
                    othValue = other[key],
                    result = customizer ? customizer(isLoose ? othValue : objValue, isLoose ? objValue : othValue, key) : undefined;
                if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
                    return false;
                }
                skipCtor || (skipCtor = key == 'constructor');
            }
            if (!skipCtor) {
                var objCtor = object.constructor,
                    othCtor = other.constructor;
                if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
                    return false;
                }
            }
            return true;
        }

        function getCallback(func, thisArg, argCount) {
            var result = lodash.callback || callback;
            result = result === callback ? baseCallback : result;
            return argCount ? result(func, thisArg, argCount) : result;
        }
        var getData = !metaMap ? noop : function(func) {
            return metaMap.get(func);
        };

        function getFuncName(func) {
            var result = (func.name + ''),
                array = realNames[result],
                length = array ? array.length : 0;
            while (length--) {
                var data = array[length],
                    otherFunc = data.func;
                if (otherFunc == null || otherFunc == func) {
                    return data.name;
                }
            }
            return result;
        }

        function getIndexOf(collection, target, fromIndex) {
            var result = lodash.indexOf || indexOf;
            result = result === indexOf ? baseIndexOf : result;
            return collection ? result(collection, target, fromIndex) : result;
        }
        var getLength = baseProperty('length');

        function getMatchData(object) {
            var result = pairs(object),
                length = result.length;
            while (length--) {
                result[length][2] = isStrictComparable(result[length][1]);
            }
            return result;
        }

        function getNative(object, key) {
            var value = object == null ? undefined : object[key];
            return isNative(value) ? value : undefined;
        }

        function getView(start, end, transforms) {
            var index = -1,
                length = transforms.length;
            while (++index < length) {
                var data = transforms[index],
                    size = data.size;
                switch (data.type) {
                    case 'drop':
                        start += size;
                        break;
                    case 'dropRight':
                        end -= size;
                        break;
                    case 'take':
                        end = nativeMin(end, start + size);
                        break;
                    case 'takeRight':
                        start = nativeMax(start, end - size);
                        break;
                }
            }
            return {
                'start': start,
                'end': end
            };
        }

        function initCloneArray(array) {
            var length = array.length,
                result = new array.constructor(length);
            if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
                result.index = array.index;
                result.input = array.input;
            }
            return result;
        }

        function initCloneObject(object) {
            var Ctor = object.constructor;
            if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
                Ctor = Object;
            }
            return new Ctor;
        }

        function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
                case arrayBufferTag:
                    return bufferClone(object);
                case boolTag:
                case dateTag:
                    return new Ctor(+object);
                case float32Tag:
                case float64Tag:
                case int8Tag:
                case int16Tag:
                case int32Tag:
                case uint8Tag:
                case uint8ClampedTag:
                case uint16Tag:
                case uint32Tag:
                    if (Ctor instanceof Ctor) {
                        Ctor = ctorByTag[tag];
                    }
                    var buffer = object.buffer;
                    return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
                case numberTag:
                case stringTag:
                    return new Ctor(object);
                case regexpTag:
                    var result = new Ctor(object.source, reFlags.exec(object));
                    result.lastIndex = object.lastIndex;
            }
            return result;
        }

        function invokePath(object, path, args) {
            if (object != null && !isKey(path, object)) {
                path = toPath(path);
                object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
                path = last(path);
            }
            var func = object == null ? object : object[path];
            return func == null ? undefined : func.apply(object, args);
        }

        function isArrayLike(value) {
            return value != null && isLength(getLength(value));
        }

        function isIndex(value, length) {
            value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return value > -1 && value % 1 == 0 && value < length;
        }

        function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
                return false;
            }
            var type = typeof index;
            if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
                var other = object[index];
                return value === value ? (value === other) : (other !== other);
            }
            return false;
        }

        function isKey(value, object) {
            var type = typeof value;
            if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
                return true;
            }
            if (isArray(value)) {
                return false;
            }
            var result = !reIsDeepProp.test(value);
            return result || (object != null && value in toObject(object));
        }

        function isLaziable(func) {
            var funcName = getFuncName(func),
                other = lodash[funcName];
            if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
                return false;
            }
            if (func === other) {
                return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
        }

        function isLength(value) {
            return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }

        function isStrictComparable(value) {
            return value === value && !isObject(value);
        }

        function mergeData(data, source) {
            var bitmask = data[1],
                srcBitmask = source[1],
                newBitmask = bitmask | srcBitmask,
                isCommon = newBitmask < ARY_FLAG;
            var isCombo = (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) || (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) || (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);
            if (!(isCommon || isCombo)) {
                return data;
            }
            if (srcBitmask & BIND_FLAG) {
                data[2] = source[2];
                newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
                var partials = data[3];
                data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
                data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
            }
            value = source[5];
            if (value) {
                partials = data[5];
                data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
                data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
            }
            value = source[7];
            if (value) {
                data[7] = arrayCopy(value);
            }
            if (srcBitmask & ARY_FLAG) {
                data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
                data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
        }

        function mergeDefaults(objectValue, sourceValue) {
            return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
        }

        function pickByArray(object, props) {
            object = toObject(object);
            var index = -1,
                length = props.length,
                result = {};
            while (++index < length) {
                var key = props[index];
                if (key in object) {
                    result[key] = object[key];
                }
            }
            return result;
        }

        function pickByCallback(object, predicate) {
            var result = {};
            baseForIn(object, function(value, key, object) {
                if (predicate(value, key, object)) {
                    result[key] = value;
                }
            });
            return result;
        }

        function reorder(array, indexes) {
            var arrLength = array.length,
                length = nativeMin(indexes.length, arrLength),
                oldArray = arrayCopy(array);
            while (length--) {
                var index = indexes[length];
                array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
            }
            return array;
        }
        var setData = (function() {
            var count = 0,
                lastCalled = 0;
            return function(key, value) {
                var stamp = now(),
                    remaining = HOT_SPAN - (stamp - lastCalled);
                lastCalled = stamp;
                if (remaining > 0) {
                    if (++count >= HOT_COUNT) {
                        return key;
                    }
                } else {
                    count = 0;
                }
                return baseSetData(key, value);
            };
        }());

        function shimKeys(object) {
            var props = keysIn(object),
                propsLength = props.length,
                length = propsLength && object.length;
            var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object) || isString(object));
            var index = -1,
                result = [];
            while (++index < propsLength) {
                var key = props[index];
                if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
                    result.push(key);
                }
            }
            return result;
        }

        function toIterable(value) {
            if (value == null) {
                return [];
            }
            if (!isArrayLike(value)) {
                return values(value);
            }
            if (lodash.support.unindexedChars && isString(value)) {
                return value.split('');
            }
            return isObject(value) ? value : Object(value);
        }

        function toObject(value) {
            if (lodash.support.unindexedChars && isString(value)) {
                var index = -1,
                    length = value.length,
                    result = Object(value);
                while (++index < length) {
                    result[index] = value.charAt(index);
                }
                return result;
            }
            return isObject(value) ? value : Object(value);
        }

        function toPath(value) {
            if (isArray(value)) {
                return value;
            }
            var result = [];
            baseToString(value).replace(rePropName, function(match, number, quote, string) {
                result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
            });
            return result;
        }

        function wrapperClone(wrapper) {
            return wrapper instanceof LazyWrapper ? wrapper.clone() : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
        }

        function chunk(array, size, guard) {
            if (guard ? isIterateeCall(array, size, guard) : size == null) {
                size = 1;
            } else {
                size = nativeMax(nativeFloor(size) || 1, 1);
            }
            var index = 0,
                length = array ? array.length : 0,
                resIndex = -1,
                result = Array(nativeCeil(length / size));
            while (index < length) {
                result[++resIndex] = baseSlice(array, index, (index += size));
            }
            return result;
        }

        function compact(array) {
            var index = -1,
                length = array ? array.length : 0,
                resIndex = -1,
                result = [];
            while (++index < length) {
                var value = array[index];
                if (value) {
                    result[++resIndex] = value;
                }
            }
            return result;
        }
        var difference = restParam(function(array, values) {
            return (isObjectLike(array) && isArrayLike(array)) ? baseDifference(array, baseFlatten(values, false, true)) : [];
        });

        function drop(array, n, guard) {
            var length = array ? array.length : 0;
            if (!length) {
                return [];
            }
            if (guard ? isIterateeCall(array, n, guard) : n == null) {
                n = 1;
            }
            return baseSlice(array, n < 0 ? 0 : n);
        }

        function dropRight(array, n, guard) {
            var length = array ? array.length : 0;
            if (!length) {
                return [];
            }
            if (guard ? isIterateeCall(array, n, guard) : n == null) {
                n = 1;
            }
            n = length - (+n || 0);
            return baseSlice(array, 0, n < 0 ? 0 : n);
        }

        function dropRightWhile(array, predicate, thisArg) {
            return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true) : [];
        }

        function dropWhile(array, predicate, thisArg) {
            return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), true) : [];
        }

        function fill(array, value, start, end) {
            var length = array ? array.length : 0;
            if (!length) {
                return [];
            }
            if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
                start = 0;
                end = length;
            }
            return baseFill(array, value, start, end);
        }
        var findIndex = createFindIndex();
        var findLastIndex = createFindIndex(true);

        function first(array) {
            return array ? array[0] : undefined;
        }

        function flatten(array, isDeep, guard) {
            var length = array ? array.length : 0;
            if (guard && isIterateeCall(array, isDeep, guard)) {
                isDeep = false;
            }
            return length ? baseFlatten(array, isDeep) : [];
        }

        function flattenDeep(array) {
            var length = array ? array.length : 0;
            return length ? baseFlatten(array, true) : [];
        }

        function indexOf(array, value, fromIndex) {
            var length = array ? array.length : 0;
            if (!length) {
                return -1;
            }
            if (typeof fromIndex == 'number') {
                fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
            } else if (fromIndex) {
                var index = binaryIndex(array, value);
                if (index < length && (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
                    return index;
                }
                return -1;
            }
            return baseIndexOf(array, value, fromIndex || 0);
        }

        function initial(array) {
            return dropRight(array, 1);
        }
        var intersection = restParam(function(arrays) {
            var othLength = arrays.length,
                othIndex = othLength,
                caches = Array(length),
                indexOf = getIndexOf(),
                isCommon = indexOf === baseIndexOf,
                result = [];
            while (othIndex--) {
                var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
                caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
            }
            var array = arrays[0],
                index = -1,
                length = array ? array.length : 0,
                seen = caches[0];
            outer: while (++index < length) {
                value = array[index];
                if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
                    var othIndex = othLength;
                    while (--othIndex) {
                        var cache = caches[othIndex];
                        if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
                            continue outer;
                        }
                    }
                    if (seen) {
                        seen.push(value);
                    }
                    result.push(value);
                }
            }
            return result;
        });

        function last(array) {
            var length = array ? array.length : 0;
            return length ? array[length - 1] : undefined;
        }

        function lastIndexOf(array, value, fromIndex) {
            var length = array ? array.length : 0;
            if (!length) {
                return -1;
            }
            var index = length;
            if (typeof fromIndex == 'number') {
                index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
            } else if (fromIndex) {
                index = binaryIndex(array, value, true) - 1;
                var other = array[index];
                if (value === value ? (value === other) : (other !== other)) {
                    return index;
                }
                return -1;
            }
            if (value !== value) {
                return indexOfNaN(array, index, true);
            }
            while (index--) {
                if (array[index] === value) {
                    return index;
                }
            }
            return -1;
        }

        function pull() {
            var args = arguments,
                array = args[0];
            if (!(array && array.length)) {
                return array;
            }
            var index = 0,
                indexOf = getIndexOf(),
                length = args.length;
            while (++index < length) {
                var fromIndex = 0,
                    value = args[index];
                while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
                    splice.call(array, fromIndex, 1);
                }
            }
            return array;
        }
        var pullAt = restParam(function(array, indexes) {
            indexes = baseFlatten(indexes);
            var result = baseAt(array, indexes);
            basePullAt(array, indexes.sort(baseCompareAscending));
            return result;
        });

        function remove(array, predicate, thisArg) {
            var result = [];
            if (!(array && array.length)) {
                return result;
            }
            var index = -1,
                indexes = [],
                length = array.length;
            predicate = getCallback(predicate, thisArg, 3);
            while (++index < length) {
                var value = array[index];
                if (predicate(value, index, array)) {
                    result.push(value);
                    indexes.push(index);
                }
            }
            basePullAt(array, indexes);
            return result;
        }

        function rest(array) {
            return drop(array, 1);
        }

        function slice(array, start, end) {
            var length = array ? array.length : 0;
            if (!length) {
                return [];
            }
            if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
                start = 0;
                end = length;
            }
            return baseSlice(array, start, end);
        }
        var sortedIndex = createSortedIndex();
        var sortedLastIndex = createSortedIndex(true);

        function take(array, n, guard) {
            var length = array ? array.length : 0;
            if (!length) {
                return [];
            }
            if (guard ? isIterateeCall(array, n, guard) : n == null) {
                n = 1;
            }
            return baseSlice(array, 0, n < 0 ? 0 : n);
        }

        function takeRight(array, n, guard) {
            var length = array ? array.length : 0;
            if (!length) {
                return [];
            }
            if (guard ? isIterateeCall(array, n, guard) : n == null) {
                n = 1;
            }
            n = length - (+n || 0);
            return baseSlice(array, n < 0 ? 0 : n);
        }

        function takeRightWhile(array, predicate, thisArg) {
            return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true) : [];
        }

        function takeWhile(array, predicate, thisArg) {
            return (array && array.length) ? baseWhile(array, getCallback(predicate, thisArg, 3)) : [];
        }
        var union = restParam(function(arrays) {
            return baseUniq(baseFlatten(arrays, false, true));
        });

        function uniq(array, isSorted, iteratee, thisArg) {
            var length = array ? array.length : 0;
            if (!length) {
                return [];
            }
            if (isSorted != null && typeof isSorted != 'boolean') {
                thisArg = iteratee;
                iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
                isSorted = false;
            }
            var callback = getCallback();
            if (!(iteratee == null && callback === baseCallback)) {
                iteratee = callback(iteratee, thisArg, 3);
            }
            return (isSorted && getIndexOf() === baseIndexOf) ? sortedUniq(array, iteratee) : baseUniq(array, iteratee);
        }

        function unzip(array) {
            if (!(array && array.length)) {
                return [];
            }
            var index = -1,
                length = 0;
            array = arrayFilter(array, function(group) {
                if (isArrayLike(group)) {
                    length = nativeMax(group.length, length);
                    return true;
                }
            });
            var result = Array(length);
            while (++index < length) {
                result[index] = arrayMap(array, baseProperty(index));
            }
            return result;
        }

        function unzipWith(array, iteratee, thisArg) {
            var length = array ? array.length : 0;
            if (!length) {
                return [];
            }
            var result = unzip(array);
            if (iteratee == null) {
                return result;
            }
            iteratee = bindCallback(iteratee, thisArg, 4);
            return arrayMap(result, function(group) {
                return arrayReduce(group, iteratee, undefined, true);
            });
        }
        var without = restParam(function(array, values) {
            return isArrayLike(array) ? baseDifference(array, values) : [];
        });

        function xor() {
            var index = -1,
                length = arguments.length;
            while (++index < length) {
                var array = arguments[index];
                if (isArrayLike(array)) {
                    var result = result ? arrayPush(baseDifference(result, array), baseDifference(array, result)) : array;
                }
            }
            return result ? baseUniq(result) : [];
        }
        var zip = restParam(unzip);

        function zipObject(props, values) {
            var index = -1,
                length = props ? props.length : 0,
                result = {};
            if (length && !values && !isArray(props[0])) {
                values = [];
            }
            while (++index < length) {
                var key = props[index];
                if (values) {
                    result[key] = values[index];
                } else if (key) {
                    result[key[0]] = key[1];
                }
            }
            return result;
        }
        var zipWith = restParam(function(arrays) {
            var length = arrays.length,
                iteratee = length > 2 ? arrays[length - 2] : undefined,
                thisArg = length > 1 ? arrays[length - 1] : undefined;
            if (length > 2 && typeof iteratee == 'function') {
                length -= 2;
            } else {
                iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
                thisArg = undefined;
            }
            arrays.length = length;
            return unzipWith(arrays, iteratee, thisArg);
        });

        function chain(value) {
            var result = lodash(value);
            result.__chain__ = true;
            return result;
        }

        function tap(value, interceptor, thisArg) {
            interceptor.call(thisArg, value);
            return value;
        }

        function thru(value, interceptor, thisArg) {
            return interceptor.call(thisArg, value);
        }

        function wrapperChain() {
            return chain(this);
        }

        function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
        }
        var wrapperConcat = restParam(function(values) {
            values = baseFlatten(values);
            return this.thru(function(array) {
                return arrayConcat(isArray(array) ? array : [toObject(array)], values);
            });
        });

        function wrapperPlant(value) {
            var result, parent = this;
            while (parent instanceof baseLodash) {
                var clone = wrapperClone(parent);
                if (result) {
                    previous.__wrapped__ = clone;
                } else {
                    result = clone;
                }
                var previous = clone;
                parent = parent.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result;
        }

        function wrapperReverse() {
            var value = this.__wrapped__;
            var interceptor = function(value) {
                return value.reverse();
            };
            if (value instanceof LazyWrapper) {
                var wrapped = value;
                if (this.__actions__.length) {
                    wrapped = new LazyWrapper(this);
                }
                wrapped = wrapped.reverse();
                wrapped.__actions__.push({
                    'func': thru,
                    'args': [interceptor],
                    'thisArg': undefined
                });
                return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(interceptor);
        }

        function wrapperToString() {
            return (this.value() + '');
        }

        function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        var at = restParam(function(collection, props) {
            if (isArrayLike(collection)) {
                collection = toIterable(collection);
            }
            return baseAt(collection, baseFlatten(props));
        });
        var countBy = createAggregator(function(result, value, key) {
            hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
        });

        function every(collection, predicate, thisArg) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
                predicate = undefined;
            }
            if (typeof predicate != 'function' || thisArg !== undefined) {
                predicate = getCallback(predicate, thisArg, 3);
            }
            return func(collection, predicate);
        }

        function filter(collection, predicate, thisArg) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            predicate = getCallback(predicate, thisArg, 3);
            return func(collection, predicate);
        }
        var find = createFind(baseEach);
        var findLast = createFind(baseEachRight, true);

        function findWhere(collection, source) {
            return find(collection, baseMatches(source));
        }
        var forEach = createForEach(arrayEach, baseEach);
        var forEachRight = createForEach(arrayEachRight, baseEachRight);
        var groupBy = createAggregator(function(result, value, key) {
            if (hasOwnProperty.call(result, key)) {
                result[key].push(value);
            } else {
                result[key] = [value];
            }
        });

        function includes(collection, target, fromIndex, guard) {
            var length = collection ? getLength(collection) : 0;
            if (!isLength(length)) {
                collection = values(collection);
                length = collection.length;
            }
            if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
                fromIndex = 0;
            } else {
                fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
            }
            return (typeof collection == 'string' || !isArray(collection) && isString(collection)) ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1) : (!!length && getIndexOf(collection, target, fromIndex) > -1);
        }
        var indexBy = createAggregator(function(result, value, key) {
            result[key] = value;
        });
        var invoke = restParam(function(collection, path, args) {
            var index = -1,
                isFunc = typeof path == 'function',
                isProp = isKey(path),
                result = isArrayLike(collection) ? Array(collection.length) : [];
            baseEach(collection, function(value) {
                var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined);
                result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
            });
            return result;
        });

        function map(collection, iteratee, thisArg) {
            var func = isArray(collection) ? arrayMap : baseMap;
            iteratee = getCallback(iteratee, thisArg, 3);
            return func(collection, iteratee);
        }
        var partition = createAggregator(function(result, value, key) {
            result[key ? 0 : 1].push(value);
        }, function() {
            return [
                [],
                []
            ];
        });

        function pluck(collection, path) {
            return map(collection, property(path));
        }
        var reduce = createReduce(arrayReduce, baseEach);
        var reduceRight = createReduce(arrayReduceRight, baseEachRight);

        function reject(collection, predicate, thisArg) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            predicate = getCallback(predicate, thisArg, 3);
            return func(collection, function(value, index, collection) {
                return !predicate(value, index, collection);
            });
        }

        function sample(collection, n, guard) {
            if (guard ? isIterateeCall(collection, n, guard) : n == null) {
                collection = toIterable(collection);
                var length = collection.length;
                return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
            }
            var index = -1,
                result = toArray(collection),
                length = result.length,
                lastIndex = length - 1;
            n = nativeMin(n < 0 ? 0 : (+n || 0), length);
            while (++index < n) {
                var rand = baseRandom(index, lastIndex),
                    value = result[rand];
                result[rand] = result[index];
                result[index] = value;
            }
            result.length = n;
            return result;
        }

        function shuffle(collection) {
            return sample(collection, POSITIVE_INFINITY);
        }

        function size(collection) {
            var length = collection ? getLength(collection) : 0;
            return isLength(length) ? length : keys(collection).length;
        }

        function some(collection, predicate, thisArg) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
                predicate = undefined;
            }
            if (typeof predicate != 'function' || thisArg !== undefined) {
                predicate = getCallback(predicate, thisArg, 3);
            }
            return func(collection, predicate);
        }

        function sortBy(collection, iteratee, thisArg) {
            if (collection == null) {
                return [];
            }
            if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
                iteratee = undefined;
            }
            var index = -1;
            iteratee = getCallback(iteratee, thisArg, 3);
            var result = baseMap(collection, function(value, key, collection) {
                return {
                    'criteria': iteratee(value, key, collection),
                    'index': ++index,
                    'value': value
                };
            });
            return baseSortBy(result, compareAscending);
        }
        var sortByAll = restParam(function(collection, iteratees) {
            if (collection == null) {
                return [];
            }
            var guard = iteratees[2];
            if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
                iteratees.length = 1;
            }
            return baseSortByOrder(collection, baseFlatten(iteratees), []);
        });

        function sortByOrder(collection, iteratees, orders, guard) {
            if (collection == null) {
                return [];
            }
            if (guard && isIterateeCall(iteratees, orders, guard)) {
                orders = undefined;
            }
            if (!isArray(iteratees)) {
                iteratees = iteratees == null ? [] : [iteratees];
            }
            if (!isArray(orders)) {
                orders = orders == null ? [] : [orders];
            }
            return baseSortByOrder(collection, iteratees, orders);
        }

        function where(collection, source) {
            return filter(collection, baseMatches(source));
        }
        var now = nativeNow || function() {
            return new Date().getTime();
        };

        function after(n, func) {
            if (typeof func != 'function') {
                if (typeof n == 'function') {
                    var temp = n;
                    n = func;
                    func = temp;
                } else {
                    throw new TypeError(FUNC_ERROR_TEXT);
                }
            }
            n = nativeIsFinite(n = +n) ? n : 0;
            return function() {
                if (--n < 1) {
                    return func.apply(this, arguments);
                }
            };
        }

        function ary(func, n, guard) {
            if (guard && isIterateeCall(func, n, guard)) {
                n = undefined;
            }
            n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
            return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
        }

        function before(n, func) {
            var result;
            if (typeof func != 'function') {
                if (typeof n == 'function') {
                    var temp = n;
                    n = func;
                    func = temp;
                } else {
                    throw new TypeError(FUNC_ERROR_TEXT);
                }
            }
            return function() {
                if (--n > 0) {
                    result = func.apply(this, arguments);
                }
                if (n <= 1) {
                    func = undefined;
                }
                return result;
            };
        }
        var bind = restParam(function(func, thisArg, partials) {
            var bitmask = BIND_FLAG;
            if (partials.length) {
                var holders = replaceHolders(partials, bind.placeholder);
                bitmask |= PARTIAL_FLAG;
            }
            return createWrapper(func, bitmask, thisArg, partials, holders);
        });
        var bindAll = restParam(function(object, methodNames) {
            methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);
            var index = -1,
                length = methodNames.length;
            while (++index < length) {
                var key = methodNames[index];
                object[key] = createWrapper(object[key], BIND_FLAG, object);
            }
            return object;
        });
        var bindKey = restParam(function(object, key, partials) {
            var bitmask = BIND_FLAG | BIND_KEY_FLAG;
            if (partials.length) {
                var holders = replaceHolders(partials, bindKey.placeholder);
                bitmask |= PARTIAL_FLAG;
            }
            return createWrapper(key, bitmask, object, partials, holders);
        });
        var curry = createCurry(CURRY_FLAG);
        var curryRight = createCurry(CURRY_RIGHT_FLAG);

        function debounce(func, wait, options) {
            var args, maxTimeoutId, result, stamp, thisArg, timeoutId, trailingCall, lastCalled = 0,
                maxWait = false,
                trailing = true;
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            wait = wait < 0 ? 0 : (+wait || 0);
            if (options === true) {
                var leading = true;
                trailing = false;
            } else if (isObject(options)) {
                leading = !!options.leading;
                maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
                trailing = 'trailing' in options ? !!options.trailing : trailing;
            }

            function cancel() {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                if (maxTimeoutId) {
                    clearTimeout(maxTimeoutId);
                }
                lastCalled = 0;
                maxTimeoutId = timeoutId = trailingCall = undefined;
            }

            function complete(isCalled, id) {
                if (id) {
                    clearTimeout(id);
                }
                maxTimeoutId = timeoutId = trailingCall = undefined;
                if (isCalled) {
                    lastCalled = now();
                    result = func.apply(thisArg, args);
                    if (!timeoutId && !maxTimeoutId) {
                        args = thisArg = undefined;
                    }
                }
            }

            function delayed() {
                var remaining = wait - (now() - stamp);
                if (remaining <= 0 || remaining > wait) {
                    complete(trailingCall, maxTimeoutId);
                } else {
                    timeoutId = setTimeout(delayed, remaining);
                }
            }

            function maxDelayed() {
                complete(trailing, timeoutId);
            }

            function debounced() {
                args = arguments;
                stamp = now();
                thisArg = this;
                trailingCall = trailing && (timeoutId || !leading);
                if (maxWait === false) {
                    var leadingCall = leading && !timeoutId;
                } else {
                    if (!maxTimeoutId && !leading) {
                        lastCalled = stamp;
                    }
                    var remaining = maxWait - (stamp - lastCalled),
                        isCalled = remaining <= 0 || remaining > maxWait;
                    if (isCalled) {
                        if (maxTimeoutId) {
                            maxTimeoutId = clearTimeout(maxTimeoutId);
                        }
                        lastCalled = stamp;
                        result = func.apply(thisArg, args);
                    } else if (!maxTimeoutId) {
                        maxTimeoutId = setTimeout(maxDelayed, remaining);
                    }
                }
                if (isCalled && timeoutId) {
                    timeoutId = clearTimeout(timeoutId);
                } else if (!timeoutId && wait !== maxWait) {
                    timeoutId = setTimeout(delayed, wait);
                }
                if (leadingCall) {
                    isCalled = true;
                    result = func.apply(thisArg, args);
                }
                if (isCalled && !timeoutId && !maxTimeoutId) {
                    args = thisArg = undefined;
                }
                return result;
            }
            debounced.cancel = cancel;
            return debounced;
        }
        var defer = restParam(function(func, args) {
            return baseDelay(func, 1, args);
        });
        var delay = restParam(function(func, wait, args) {
            return baseDelay(func, wait, args);
        });
        var flow = createFlow();
        var flowRight = createFlow(true);

        function memoize(func, resolver) {
            if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            var memoized = function() {
                var args = arguments,
                    key = resolver ? resolver.apply(this, args) : args[0],
                    cache = memoized.cache;
                if (cache.has(key)) {
                    return cache.get(key);
                }
                var result = func.apply(this, args);
                memoized.cache = cache.set(key, result);
                return result;
            };
            memoized.cache = new memoize.Cache;
            return memoized;
        }
        var modArgs = restParam(function(func, transforms) {
            transforms = baseFlatten(transforms);
            if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            var length = transforms.length;
            return restParam(function(args) {
                var index = nativeMin(args.length, length);
                while (index--) {
                    args[index] = transforms[index](args[index]);
                }
                return func.apply(this, args);
            });
        });

        function negate(predicate) {
            if (typeof predicate != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            return function() {
                return !predicate.apply(this, arguments);
            };
        }

        function once(func) {
            return before(2, func);
        }
        var partial = createPartial(PARTIAL_FLAG);
        var partialRight = createPartial(PARTIAL_RIGHT_FLAG);
        var rearg = restParam(function(func, indexes) {
            return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes));
        });

        function restParam(func, start) {
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
            return function() {
                var args = arguments,
                    index = -1,
                    length = nativeMax(args.length - start, 0),
                    rest = Array(length);
                while (++index < length) {
                    rest[index] = args[start + index];
                }
                switch (start) {
                    case 0:
                        return func.call(this, rest);
                    case 1:
                        return func.call(this, args[0], rest);
                    case 2:
                        return func.call(this, args[0], args[1], rest);
                }
                var otherArgs = Array(start + 1);
                index = -1;
                while (++index < start) {
                    otherArgs[index] = args[index];
                }
                otherArgs[start] = rest;
                return func.apply(this, otherArgs);
            };
        }

        function spread(func) {
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            return function(array) {
                return func.apply(this, array);
            };
        }

        function throttle(func, wait, options) {
            var leading = true,
                trailing = true;
            if (typeof func != 'function') {
                throw new TypeError(FUNC_ERROR_TEXT);
            }
            if (options === false) {
                leading = false;
            } else if (isObject(options)) {
                leading = 'leading' in options ? !!options.leading : leading;
                trailing = 'trailing' in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
                'leading': leading,
                'maxWait': +wait,
                'trailing': trailing
            });
        }

        function wrap(value, wrapper) {
            wrapper = wrapper == null ? identity : wrapper;
            return createWrapper(wrapper, PARTIAL_FLAG, undefined, [value], []);
        }

        function clone(value, isDeep, customizer, thisArg) {
            if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
                isDeep = false;
            } else if (typeof isDeep == 'function') {
                thisArg = customizer;
                customizer = isDeep;
                isDeep = false;
            }
            return typeof customizer == 'function' ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3)) : baseClone(value, isDeep);
        }

        function cloneDeep(value, customizer, thisArg) {
            return typeof customizer == 'function' ? baseClone(value, true, bindCallback(customizer, thisArg, 3)) : baseClone(value, true);
        }

        function gt(value, other) {
            return value > other;
        }

        function gte(value, other) {
            return value >= other;
        }

        function isArguments(value) {
            return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
        }
        var isArray = nativeIsArray || function(value) {
            return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
        };

        function isBoolean(value) {
            return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
        }

        function isDate(value) {
            return isObjectLike(value) && objToString.call(value) == dateTag;
        }

        function isElement(value) {
            return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
        }

        function isEmpty(value) {
            if (value == null) {
                return true;
            }
            if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) || (isObjectLike(value) && isFunction(value.splice)))) {
                return !value.length;
            }
            return !keys(value).length;
        }

        function isEqual(value, other, customizer, thisArg) {
            customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
            var result = customizer ? customizer(value, other) : undefined;
            return result === undefined ? baseIsEqual(value, other, customizer) : !!result;
        }

        function isError(value) {
            return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
        }

        function isFinite(value) {
            return typeof value == 'number' && nativeIsFinite(value);
        }

        function isFunction(value) {
            return isObject(value) && objToString.call(value) == funcTag;
        }

        function isObject(value) {
            var type = typeof value;
            return !!value && (type == 'object' || type == 'function');
        }

        function isMatch(object, source, customizer, thisArg) {
            customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
            return baseIsMatch(object, getMatchData(source), customizer);
        }

        function isNaN(value) {
            return isNumber(value) && value != +value;
        }

        function isNative(value) {
            if (value == null) {
                return false;
            }
            if (isFunction(value)) {
                return reIsNative.test(fnToString.call(value));
            }
            return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
        }

        function isNull(value) {
            return value === null;
        }

        function isNumber(value) {
            return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
        }

        function isPlainObject(value) {
            var Ctor;
            if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isHostObject(value) && !isArguments(value)) || (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
                return false;
            }
            var result;
            if (lodash.support.ownLast) {
                baseForIn(value, function(subValue, key, object) {
                    result = hasOwnProperty.call(object, key);
                    return false;
                });
                return result !== false;
            }
            baseForIn(value, function(subValue, key) {
                result = key;
            });
            return result === undefined || hasOwnProperty.call(value, result);
        }

        function isRegExp(value) {
            return isObject(value) && objToString.call(value) == regexpTag;
        }

        function isString(value) {
            return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
        }

        function isTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
        }

        function isUndefined(value) {
            return value === undefined;
        }

        function lt(value, other) {
            return value < other;
        }

        function lte(value, other) {
            return value <= other;
        }

        function toArray(value) {
            var length = value ? getLength(value) : 0;
            if (!isLength(length)) {
                return values(value);
            }
            if (!length) {
                return [];
            }
            return (lodash.support.unindexedChars && isString(value)) ? value.split('') : arrayCopy(value);
        }

        function toPlainObject(value) {
            return baseCopy(value, keysIn(value));
        }
        var merge = createAssigner(baseMerge);
        var assign = createAssigner(function(object, source, customizer) {
            return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
        });

        function create(prototype, properties, guard) {
            var result = baseCreate(prototype);
            if (guard && isIterateeCall(prototype, properties, guard)) {
                properties = undefined;
            }
            return properties ? baseAssign(result, properties) : result;
        }
        var defaults = createDefaults(assign, assignDefaults);
        var defaultsDeep = createDefaults(merge, mergeDefaults);
        var findKey = createFindKey(baseForOwn);
        var findLastKey = createFindKey(baseForOwnRight);
        var forIn = createForIn(baseFor);
        var forInRight = createForIn(baseForRight);
        var forOwn = createForOwn(baseForOwn);
        var forOwnRight = createForOwn(baseForOwnRight);

        function functions(object) {
            return baseFunctions(object, keysIn(object));
        }

        function get(object, path, defaultValue) {
            var result = object == null ? undefined : baseGet(object, toPath(path), (path + ''));
            return result === undefined ? defaultValue : result;
        }

        function has(object, path) {
            if (object == null) {
                return false;
            }
            var result = hasOwnProperty.call(object, path);
            if (!result && !isKey(path)) {
                path = toPath(path);
                object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
                if (object == null) {
                    return false;
                }
                path = last(path);
                result = hasOwnProperty.call(object, path);
            }
            return result || (isLength(object.length) && isIndex(path, object.length) && (isArray(object) || isArguments(object) || isString(object)));
        }

        function invert(object, multiValue, guard) {
            if (guard && isIterateeCall(object, multiValue, guard)) {
                multiValue = undefined;
            }
            var index = -1,
                props = keys(object),
                length = props.length,
                result = {};
            while (++index < length) {
                var key = props[index],
                    value = object[key];
                if (multiValue) {
                    if (hasOwnProperty.call(result, value)) {
                        result[value].push(key);
                    } else {
                        result[value] = [key];
                    }
                } else {
                    result[value] = key;
                }
            }
            return result;
        }
        var keys = !nativeKeys ? shimKeys : function(object) {
            var Ctor = object == null ? undefined : object.constructor;
            if ((typeof Ctor == 'function' && Ctor.prototype === object) || (typeof object == 'function' ? lodash.support.enumPrototypes : isArrayLike(object))) {
                return shimKeys(object);
            }
            return isObject(object) ? nativeKeys(object) : [];
        };

        function keysIn(object) {
            if (object == null) {
                return [];
            }
            if (!isObject(object)) {
                object = Object(object);
            }
            var length = object.length,
                support = lodash.support;
            length = (length && isLength(length) && (isArray(object) || isArguments(object) || isString(object)) && length) || 0;
            var Ctor = object.constructor,
                index = -1,
                proto = (isFunction(Ctor) && Ctor.prototype) || objectProto,
                isProto = proto === object,
                result = Array(length),
                skipIndexes = length > 0,
                skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
                skipProto = support.enumPrototypes && isFunction(object);
            while (++index < length) {
                result[index] = (index + '');
            }
            for (var key in object) {
                if (!(skipProto && key == 'prototype') && !(skipErrorProps && (key == 'message' || key == 'name')) && !(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
                    result.push(key);
                }
            }
            if (support.nonEnumShadows && object !== objectProto) {
                var tag = object === stringProto ? stringTag : (object === errorProto ? errorTag : objToString.call(object)),
                    nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];
                if (tag == objectTag) {
                    proto = objectProto;
                }
                length = shadowProps.length;
                while (length--) {
                    key = shadowProps[length];
                    var nonEnum = nonEnums[key];
                    if (!(isProto && nonEnum) && (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
                        result.push(key);
                    }
                }
            }
            return result;
        }
        var mapKeys = createObjectMapper(true);
        var mapValues = createObjectMapper();
        var omit = restParam(function(object, props) {
            if (object == null) {
                return {};
            }
            if (typeof props[0] != 'function') {
                var props = arrayMap(baseFlatten(props), String);
                return pickByArray(object, baseDifference(keysIn(object), props));
            }
            var predicate = bindCallback(props[0], props[1], 3);
            return pickByCallback(object, function(value, key, object) {
                return !predicate(value, key, object);
            });
        });

        function pairs(object) {
            object = toObject(object);
            var index = -1,
                props = keys(object),
                length = props.length,
                result = Array(length);
            while (++index < length) {
                var key = props[index];
                result[index] = [key, object[key]];
            }
            return result;
        }
        var pick = restParam(function(object, props) {
            if (object == null) {
                return {};
            }
            return typeof props[0] == 'function' ? pickByCallback(object, bindCallback(props[0], props[1], 3)) : pickByArray(object, baseFlatten(props));
        });

        function result(object, path, defaultValue) {
            var result = object == null ? undefined : toObject(object)[path];
            if (result === undefined) {
                if (object != null && !isKey(path, object)) {
                    path = toPath(path);
                    object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
                    result = object == null ? undefined : toObject(object)[last(path)];
                }
                result = result === undefined ? defaultValue : result;
            }
            return isFunction(result) ? result.call(object) : result;
        }

        function set(object, path, value) {
            if (object == null) {
                return object;
            }
            var pathKey = (path + '');
            path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);
            var index = -1,
                length = path.length,
                lastIndex = length - 1,
                nested = object;
            while (nested != null && ++index < length) {
                var key = path[index];
                if (isObject(nested)) {
                    if (index == lastIndex) {
                        nested[key] = value;
                    } else if (nested[key] == null) {
                        nested[key] = isIndex(path[index + 1]) ? [] : {};
                    }
                }
                nested = nested[key];
            }
            return object;
        }

        function transform(object, iteratee, accumulator, thisArg) {
            var isArr = isArray(object) || isTypedArray(object);
            iteratee = getCallback(iteratee, thisArg, 4);
            if (accumulator == null) {
                if (isArr || isObject(object)) {
                    var Ctor = object.constructor;
                    if (isArr) {
                        accumulator = isArray(object) ? new Ctor : [];
                    } else {
                        accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
                    }
                } else {
                    accumulator = {};
                }
            }
            (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
                return iteratee(accumulator, value, index, object);
            });
            return accumulator;
        }

        function values(object) {
            return baseValues(object, keys(object));
        }

        function valuesIn(object) {
            return baseValues(object, keysIn(object));
        }

        function inRange(value, start, end) {
            start = +start || 0;
            if (end === undefined) {
                end = start;
                start = 0;
            } else {
                end = +end || 0;
            }
            return value >= nativeMin(start, end) && value < nativeMax(start, end);
        }

        function random(min, max, floating) {
            if (floating && isIterateeCall(min, max, floating)) {
                max = floating = undefined;
            }
            var noMin = min == null,
                noMax = max == null;
            if (floating == null) {
                if (noMax && typeof min == 'boolean') {
                    floating = min;
                    min = 1;
                } else if (typeof max == 'boolean') {
                    floating = max;
                    noMax = true;
                }
            }
            if (noMin && noMax) {
                max = 1;
                noMax = false;
            }
            min = +min || 0;
            if (noMax) {
                max = min;
                min = 0;
            } else {
                max = +max || 0;
            }
            if (floating || min % 1 || max % 1) {
                var rand = nativeRandom();
                return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
            }
            return baseRandom(min, max);
        }
        var camelCase = createCompounder(function(result, word, index) {
            word = word.toLowerCase();
            return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
        });

        function capitalize(string) {
            string = baseToString(string);
            return string && (string.charAt(0).toUpperCase() + string.slice(1));
        }

        function deburr(string) {
            string = baseToString(string);
            return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
        }

        function endsWith(string, target, position) {
            string = baseToString(string);
            target = (target + '');
            var length = string.length;
            position = position === undefined ? length : nativeMin(position < 0 ? 0 : (+position || 0), length);
            position -= target.length;
            return position >= 0 && string.indexOf(target, position) == position;
        }

        function escape(string) {
            string = baseToString(string);
            return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }

        function escapeRegExp(string) {
            string = baseToString(string);
            return (string && reHasRegExpChars.test(string)) ? string.replace(reRegExpChars, escapeRegExpChar) : (string || '(?:)');
        }
        var kebabCase = createCompounder(function(result, word, index) {
            return result + (index ? '-' : '') + word.toLowerCase();
        });

        function pad(string, length, chars) {
            string = baseToString(string);
            length = +length;
            var strLength = string.length;
            if (strLength >= length || !nativeIsFinite(length)) {
                return string;
            }
            var mid = (length - strLength) / 2,
                leftLength = nativeFloor(mid),
                rightLength = nativeCeil(mid);
            chars = createPadding('', rightLength, chars);
            return chars.slice(0, leftLength) + string + chars;
        }
        var padLeft = createPadDir();
        var padRight = createPadDir(true);

        function parseInt(string, radix, guard) {
            if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
                radix = 0;
            } else if (radix) {
                radix = +radix;
            }
            string = trim(string);
            return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
        }

        function repeat(string, n) {
            var result = '';
            string = baseToString(string);
            n = +n;
            if (n < 1 || !string || !nativeIsFinite(n)) {
                return result;
            }
            do {
                if (n % 2) {
                    result += string;
                }
                n = nativeFloor(n / 2);
                string += string;
            } while (n);
            return result;
        }
        var snakeCase = createCompounder(function(result, word, index) {
            return result + (index ? '_' : '') + word.toLowerCase();
        });
        var startCase = createCompounder(function(result, word, index) {
            return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
        });

        function startsWith(string, target, position) {
            string = baseToString(string);
            position = position == null ? 0 : nativeMin(position < 0 ? 0 : (+position || 0), string.length);
            return string.lastIndexOf(target, position) == position;
        }

        function template(string, options, otherOptions) {
            var settings = lodash.templateSettings;
            if (otherOptions && isIterateeCall(string, options, otherOptions)) {
                options = otherOptions = undefined;
            }
            string = baseToString(string);
            options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);
            var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
                importsKeys = keys(imports),
                importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0,
                interpolate = options.interpolate || reNoMatch,
                source = "__p += '";
            var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' +
                interpolate.source + '|' +
                (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
                (options.evaluate || reNoMatch).source + '|$', 'g');
            var sourceURL = '//# sourceURL=' +
                ('sourceURL' in options ? options.sourceURL : ('lodash.templateSources[' + (++templateCounter) + ']')) + '\n';
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                interpolateValue || (interpolateValue = esTemplateValue);
                source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
                if (escapeValue) {
                    isEscaping = true;
                    source += "' +\n__e(" + escapeValue + ") +\n'";
                }
                if (evaluateValue) {
                    isEvaluating = true;
                    source += "';\n" + evaluateValue + ";\n__p += '";
                }
                if (interpolateValue) {
                    source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
                }
                index = offset + match.length;
                return match;
            });
            source += "';\n";
            var variable = options.variable;
            if (!variable) {
                source = 'with (obj) {\n' + source + '\n}\n';
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
            source = 'function(' + (variable || 'obj') + ') {\n' +
                (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" +
                (isEscaping ? ', __e = _.escape' : '') +
                (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') +
                source + 'return __p\n}';
            var result = attempt(function() {
                return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
            });
            result.source = source;
            if (isError(result)) {
                throw result;
            }
            return result;
        }

        function trim(string, chars, guard) {
            var value = string;
            string = baseToString(string);
            if (!string) {
                return string;
            }
            if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
                return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
            }
            chars = (chars + '');
            return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
        }

        function trimLeft(string, chars, guard) {
            var value = string;
            string = baseToString(string);
            if (!string) {
                return string;
            }
            if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
                return string.slice(trimmedLeftIndex(string));
            }
            return string.slice(charsLeftIndex(string, (chars + '')));
        }

        function trimRight(string, chars, guard) {
            var value = string;
            string = baseToString(string);
            if (!string) {
                return string;
            }
            if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
                return string.slice(0, trimmedRightIndex(string) + 1);
            }
            return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
        }

        function trunc(string, options, guard) {
            if (guard && isIterateeCall(string, options, guard)) {
                options = undefined;
            }
            var length = DEFAULT_TRUNC_LENGTH,
                omission = DEFAULT_TRUNC_OMISSION;
            if (options != null) {
                if (isObject(options)) {
                    var separator = 'separator' in options ? options.separator : separator;
                    length = 'length' in options ? (+options.length || 0) : length;
                    omission = 'omission' in options ? baseToString(options.omission) : omission;
                } else {
                    length = +options || 0;
                }
            }
            string = baseToString(string);
            if (length >= string.length) {
                return string;
            }
            var end = length - omission.length;
            if (end < 1) {
                return omission;
            }
            var result = string.slice(0, end);
            if (separator == null) {
                return result + omission;
            }
            if (isRegExp(separator)) {
                if (string.slice(end).search(separator)) {
                    var match, newEnd, substring = string.slice(0, end);
                    if (!separator.global) {
                        separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
                    }
                    separator.lastIndex = 0;
                    while ((match = separator.exec(substring))) {
                        newEnd = match.index;
                    }
                    result = result.slice(0, newEnd == null ? end : newEnd);
                }
            } else if (string.indexOf(separator, end) != end) {
                var index = result.lastIndexOf(separator);
                if (index > -1) {
                    result = result.slice(0, index);
                }
            }
            return result + omission;
        }

        function unescape(string) {
            string = baseToString(string);
            return (string && reHasEscapedHtml.test(string)) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }

        function words(string, pattern, guard) {
            if (guard && isIterateeCall(string, pattern, guard)) {
                pattern = undefined;
            }
            string = baseToString(string);
            return string.match(pattern || reWords) || [];
        }
        var attempt = restParam(function(func, args) {
            try {
                return func.apply(undefined, args);
            } catch (e) {
                return isError(e) ? e : new Error(e);
            }
        });

        function callback(func, thisArg, guard) {
            if (guard && isIterateeCall(func, thisArg, guard)) {
                thisArg = undefined;
            }
            return isObjectLike(func) ? matches(func) : baseCallback(func, thisArg);
        }

        function constant(value) {
            return function() {
                return value;
            };
        }

        function identity(value) {
            return value;
        }

        function matches(source) {
            return baseMatches(baseClone(source, true));
        }

        function matchesProperty(path, srcValue) {
            return baseMatchesProperty(path, baseClone(srcValue, true));
        }
        var method = restParam(function(path, args) {
            return function(object) {
                return invokePath(object, path, args);
            };
        });
        var methodOf = restParam(function(object, args) {
            return function(path) {
                return invokePath(object, path, args);
            };
        });

        function mixin(object, source, options) {
            if (options == null) {
                var isObj = isObject(source),
                    props = isObj ? keys(source) : undefined,
                    methodNames = (props && props.length) ? baseFunctions(source, props) : undefined;
                if (!(methodNames ? methodNames.length : isObj)) {
                    methodNames = false;
                    options = source;
                    source = object;
                    object = this;
                }
            }
            if (!methodNames) {
                methodNames = baseFunctions(source, keys(source));
            }
            var chain = true,
                index = -1,
                isFunc = isFunction(object),
                length = methodNames.length;
            if (options === false) {
                chain = false;
            } else if (isObject(options) && 'chain' in options) {
                chain = options.chain;
            }
            while (++index < length) {
                var methodName = methodNames[index],
                    func = source[methodName];
                object[methodName] = func;
                if (isFunc) {
                    object.prototype[methodName] = (function(func) {
                        return function() {
                            var chainAll = this.__chain__;
                            if (chain || chainAll) {
                                var result = object(this.__wrapped__),
                                    actions = result.__actions__ = arrayCopy(this.__actions__);
                                actions.push({
                                    'func': func,
                                    'args': arguments,
                                    'thisArg': object
                                });
                                result.__chain__ = chainAll;
                                return result;
                            }
                            return func.apply(object, arrayPush([this.value()], arguments));
                        };
                    }(func));
                }
            }
            return object;
        }

        function noConflict() {
            root._ = oldDash;
            return this;
        }

        function noop() {}

        function property(path) {
            return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
        }

        function propertyOf(object) {
            return function(path) {
                return baseGet(object, toPath(path), (path + ''));
            };
        }

        function range(start, end, step) {
            if (step && isIterateeCall(start, end, step)) {
                end = step = undefined;
            }
            start = +start || 0;
            step = step == null ? 1 : (+step || 0);
            if (end == null) {
                end = start;
                start = 0;
            } else {
                end = +end || 0;
            }
            var index = -1,
                length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
                result = Array(length);
            while (++index < length) {
                result[index] = start;
                start += step;
            }
            return result;
        }

        function times(n, iteratee, thisArg) {
            n = nativeFloor(n);
            if (n < 1 || !nativeIsFinite(n)) {
                return [];
            }
            var index = -1,
                result = Array(nativeMin(n, MAX_ARRAY_LENGTH));
            iteratee = bindCallback(iteratee, thisArg, 1);
            while (++index < n) {
                if (index < MAX_ARRAY_LENGTH) {
                    result[index] = iteratee(index);
                } else {
                    iteratee(index);
                }
            }
            return result;
        }

        function uniqueId(prefix) {
            var id = ++idCounter;
            return baseToString(prefix) + id;
        }

        function add(augend, addend) {
            return (+augend || 0) + (+addend || 0);
        }
        var ceil = createRound('ceil');
        var floor = createRound('floor');
        var max = createExtremum(gt, NEGATIVE_INFINITY);
        var min = createExtremum(lt, POSITIVE_INFINITY);
        var round = createRound('round');

        function sum(collection, iteratee, thisArg) {
            if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
                iteratee = undefined;
            }
            iteratee = getCallback(iteratee, thisArg, 3);
            return iteratee.length == 1 ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee) : baseSum(collection, iteratee);
        }
        lodash.prototype = baseLodash.prototype;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        MapCache.prototype['delete'] = mapDelete;
        MapCache.prototype.get = mapGet;
        MapCache.prototype.has = mapHas;
        MapCache.prototype.set = mapSet;
        SetCache.prototype.push = cachePush;
        memoize.Cache = MapCache;
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.callback = callback;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.functions = functions;
        lodash.groupBy = groupBy;
        lodash.indexBy = indexBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.invert = invert;
        lodash.invoke = invoke;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.modArgs = modArgs;
        lodash.negate = negate;
        lodash.omit = omit;
        lodash.once = once;
        lodash.pairs = pairs;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pluck = pluck;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.restParam = restParam;
        lodash.set = set;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortByAll = sortByAll;
        lodash.sortByOrder = sortByOrder;
        lodash.spread = spread;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.times = times;
        lodash.toArray = toArray;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.union = union;
        lodash.uniq = uniq;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.where = where;
        lodash.without = without;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipWith = zipWith;
        lodash.backflow = flowRight;
        lodash.collect = map;
        lodash.compose = flowRight;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.extend = assign;
        lodash.iteratee = callback;
        lodash.methods = functions;
        lodash.object = zipObject;
        lodash.select = filter;
        lodash.tail = rest;
        lodash.unique = uniq;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.deburr = deburr;
        lodash.endsWith = endsWith;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.findWhere = findWhere;
        lodash.first = first;
        lodash.floor = floor;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isBoolean = isBoolean;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isError = isError;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isMatch = isMatch;
        lodash.isNaN = isNaN;
        lodash.isNative = isNative;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isString = isString;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.min = min;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padLeft = padLeft;
        lodash.padRight = padRight;
        lodash.parseInt = parseInt;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.sum = sum;
        lodash.template = template;
        lodash.trim = trim;
        lodash.trimLeft = trimLeft;
        lodash.trimRight = trimRight;
        lodash.trunc = trunc;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.words = words;
        lodash.all = every;
        lodash.any = some;
        lodash.contains = includes;
        lodash.eq = isEqual;
        lodash.detect = find;
        lodash.foldl = reduce;
        lodash.foldr = reduceRight;
        lodash.head = first;
        lodash.include = includes;
        lodash.inject = reduce;
        mixin(lodash, (function() {
            var source = {};
            baseForOwn(lodash, function(func, methodName) {
                if (!lodash.prototype[methodName]) {
                    source[methodName] = func;
                }
            });
            return source;
        }()), false);
        lodash.sample = sample;
        lodash.prototype.sample = function(n) {
            if (!this.__chain__ && n == null) {
                return sample(this.value());
            }
            return this.thru(function(value) {
                return sample(value, n);
            });
        };
        lodash.VERSION = VERSION;
        arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
            lodash[methodName].placeholder = lodash;
        });
        arrayEach(['drop', 'take'], function(methodName, index) {
            LazyWrapper.prototype[methodName] = function(n) {
                var filtered = this.__filtered__;
                if (filtered && !index) {
                    return new LazyWrapper(this);
                }
                n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);
                var result = this.clone();
                if (filtered) {
                    result.__takeCount__ = nativeMin(result.__takeCount__, n);
                } else {
                    result.__views__.push({
                        'size': n,
                        'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
                    });
                }
                return result;
            };
            LazyWrapper.prototype[methodName + 'Right'] = function(n) {
                return this.reverse()[methodName](n).reverse();
            };
        });
        arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
            var type = index + 1,
                isFilter = type != LAZY_MAP_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
                var result = this.clone();
                result.__iteratees__.push({
                    'iteratee': getCallback(iteratee, thisArg, 1),
                    'type': type
                });
                result.__filtered__ = result.__filtered__ || isFilter;
                return result;
            };
        });
        arrayEach(['first', 'last'], function(methodName, index) {
            var takeName = 'take' + (index ? 'Right' : '');
            LazyWrapper.prototype[methodName] = function() {
                return this[takeName](1).value()[0];
            };
        });
        arrayEach(['initial', 'rest'], function(methodName, index) {
            var dropName = 'drop' + (index ? '' : 'Right');
            LazyWrapper.prototype[methodName] = function() {
                return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
        });
        arrayEach(['pluck', 'where'], function(methodName, index) {
            var operationName = index ? 'filter' : 'map',
                createCallback = index ? baseMatches : property;
            LazyWrapper.prototype[methodName] = function(value) {
                return this[operationName](createCallback(value));
            };
        });
        LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
        };
        LazyWrapper.prototype.reject = function(predicate, thisArg) {
            predicate = getCallback(predicate, thisArg, 1);
            return this.filter(function(value) {
                return !predicate(value);
            });
        };
        LazyWrapper.prototype.slice = function(start, end) {
            start = start == null ? 0 : (+start || 0);
            var result = this;
            if (result.__filtered__ && (start > 0 || end < 0)) {
                return new LazyWrapper(result);
            }
            if (start < 0) {
                result = result.takeRight(-start);
            } else if (start) {
                result = result.drop(start);
            }
            if (end !== undefined) {
                end = (+end || 0);
                result = end < 0 ? result.dropRight(-end) : result.take(end - start);
            }
            return result;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate, thisArg) {
            return this.reverse().takeWhile(predicate, thisArg).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
            return this.take(POSITIVE_INFINITY);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
                retUnwrapped = /^(?:first|last)$/.test(methodName),
                lodashFunc = lodash[retUnwrapped ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName];
            if (!lodashFunc) {
                return;
            }
            lodash.prototype[methodName] = function() {
                var args = retUnwrapped ? [1] : arguments,
                    chainAll = this.__chain__,
                    value = this.__wrapped__,
                    isHybrid = !!this.__actions__.length,
                    isLazy = value instanceof LazyWrapper,
                    iteratee = args[0],
                    useLazy = isLazy || isArray(value);
                if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
                    isLazy = useLazy = false;
                }
                var interceptor = function(value) {
                    return (retUnwrapped && chainAll) ? lodashFunc(value, 1)[0] : lodashFunc.apply(undefined, arrayPush([value], args));
                };
                var action = {
                        'func': thru,
                        'args': [interceptor],
                        'thisArg': undefined
                    },
                    onlyLazy = isLazy && !isHybrid;
                if (retUnwrapped && !chainAll) {
                    if (onlyLazy) {
                        value = value.clone();
                        value.__actions__.push(action);
                        return func.call(value);
                    }
                    return lodashFunc.call(undefined, this.value())[0];
                }
                if (!retUnwrapped && useLazy) {
                    value = onlyLazy ? value : new LazyWrapper(this);
                    var result = func.apply(value, args);
                    result.__actions__.push(action);
                    return new LodashWrapper(result, chainAll);
                }
                return this.thru(interceptor);
            };
        });
        arrayEach(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
            var protoFunc = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
                chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
                fixObjects = !support.spliceObjects && /^(?:pop|shift|splice)$/.test(methodName),
                retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);
            var func = !fixObjects ? protoFunc : function() {
                var result = protoFunc.apply(this, arguments);
                if (this.length === 0) {
                    delete this[0];
                }
                return result;
            };
            lodash.prototype[methodName] = function() {
                var args = arguments;
                if (retUnwrapped && !this.__chain__) {
                    return func.apply(this.value(), args);
                }
                return this[chainName](function(value) {
                    return func.apply(value, args);
                });
            };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
                var key = (lodashFunc.name + ''),
                    names = realNames[key] || (realNames[key] = []);
                names.push({
                    'name': methodName,
                    'func': lodashFunc
                });
            }
        });
        realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{
            'name': 'wrapper',
            'func': undefined
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.concat = wrapperConcat;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toString = wrapperToString;
        lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.collect = lodash.prototype.map;
        lodash.prototype.head = lodash.prototype.first;
        lodash.prototype.select = lodash.prototype.filter;
        lodash.prototype.tail = lodash.prototype.rest;
        return lodash;
    }
    var _ = runInContext();
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        root._ = _;
        define(function() {
            return _;
        });
    } else if (freeExports && freeModule) {
        if (moduleExports) {
            (freeModule.exports = _)._ = _;
        } else {
            freeExports._ = _;
        }
    } else {
        root._ = _;
    }
}.call(this));
var localStoragePollyfillObject = {
    _data: {},
    setItem: function(id, val) {
        return this._data[id] = String(val);
    },
    getItem: function(id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },
    removeItem: function(id) {
        return delete this._data[id];
    },
    clear: function() {
        return this._data = {};
    }
};
if ('localStorage' in window) {
    try {
        localStorage.setItem('test', 1);
    } catch (error) {
        window.localStorage = localStoragePollyfillObject;
    }
} else {
    window.localStorage = localStoragePollyfillObject;
}
(function($) {
    if (!$.fn.on) {
        $.fn.on = function(events, selector, data, handler) {
            var self = this;
            var args = arguments.length;
            if (args > 3) {
                return self.delegate(selector, events, data, handler);
            } else if (args > 2) {
                if (typeof selector === 'string') {
                    return self.delegate(selector, events, data);
                } else {
                    return self.bind(events, selector, data);
                }
            } else {
                return self.bind(events, selector);
            }
        };
        $.fn.off = function(events, selector, handler) {
            var self = this;
            var args = arguments.length;
            if (typeof selector === 'string') {
                if (args > 2) {
                    return self.undelegate(selector, events, handler);
                } else if (args > 1) {
                    return self.undelegate(selector, events);
                } else {
                    return self.undelegate();
                }
            } else {
                if (args > 1) {
                    handler = selector;
                    return self.unbind(events, handler);
                } else if (args > 0) {
                    return self.unbind(events);
                } else {
                    return self.unbind();
                }
            }
        };
    }
})(this.jQuery);
(function(w, $, undefined) {
    w.tapHandling = false;
    w.tappy = true;
    var tap = function($els) {
        return $els.each(function() {
            var $el = $(this),
                resetTimer, startY, startX, cancel, scrollTolerance = 10;

            function trigger(e) {
                $(e.target).trigger("tap", [e, $(e.target).attr("href")]);
            }

            function getCoords(e) {
                var ev = e.originalEvent || e,
                    touches = ev.touches || ev.targetTouches;
                if (touches) {
                    return [touches[0].pageX, touches[0].pageY];
                } else {
                    return null;
                }
            }

            function start(e) {
                if (e.touches && e.touches.length > 1 || e.targetTouches && e.targetTouches.length > 1) {
                    return false;
                }
                var coords = getCoords(e);
                startX = coords[0];
                startY = coords[1];
            }

            function move(e) {
                if (!cancel) {
                    var coords = getCoords(e);
                    if (coords && (Math.abs(startY - coords[1]) > scrollTolerance || Math.abs(startX - coords[0]) > scrollTolerance)) {
                        cancel = true;
                    }
                }
            }

            function end(e) {
                clearTimeout(resetTimer);
                resetTimer = setTimeout(function() {
                    w.tapHandling = false;
                    cancel = false;
                }, 1000);
                if ((e.which && e.which > 1) || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) {
                    return;
                }
                e.preventDefault();
                if (cancel || w.tapHandling && w.tapHandling !== e.type) {
                    cancel = false;
                    return;
                }
                w.tapHandling = e.type;
                trigger(e);
            }
            $el.bind("touchstart.tappy MSPointerDown.tappy", start).bind("touchmove.tappy MSPointerMove.tappy", move).bind("touchend.tappy MSPointerUp.tappy", end).bind("click.tappy", end);
        });
    };
    var untap = function($els) {
        return $els.unbind(".tappy");
    };
    if ($.event && $.event.special) {
        $.event.special.tap = {
            add: function(handleObj) {
                tap($(this));
            },
            remove: function(handleObj) {
                untap($(this));
            }
        };
    } else {
        var oldBind = $.fn.bind,
            oldUnbind = $.fn.unbind;
        $.fn.bind = function(evt) {
            if (/(^| )tap( |$)/.test(evt)) {
                tap(this);
            }
            return oldBind.apply(this, arguments);
        };
        $.fn.unbind = function(evt) {
            if (/(^| )tap( |$)/.test(evt)) {
                untap(this);
            }
            return oldUnbind.apply(this, arguments);
        };
    }
}(this, jQuery));
(function() {
    'use strict';
    var Swiper = function(container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);
        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            autoplay: false,
            autoplayDisableOnInteraction: true,
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: 'slide',
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            parallax: false,
            scrollbar: null,
            scrollbarHide: true,
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            hashnav: false,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            pagination: null,
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            resistance: true,
            resistanceRatio: 0.85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingOnTransitionStart: false,
            preloadImages: true,
            updateOnImagesReady: true,
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: undefined,
            controlInverse: false,
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slidePrevClass: 'swiper-slide-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationHiddenClass: 'swiper-pagination-hidden',
            observer: false,
            observeParents: false,
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            runCallbacksOnInit: true
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        params = params || {};
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            } else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        var s = this;
        s.version = '3.0.8';
        s.params = params;
        s.classNames = [];
        var $;
        if (typeof Dom7 === 'undefined') {
            $ = window.Dom7 || window.Zepto || window.jQuery;
        } else {
            $ = Dom7;
        }
        if (!$) return;
        s.$ = $;
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            s.container.each(function() {
                new Swiper(this, params);
            });
            return;
        }
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        s.classNames.push('swiper-container-' + s.params.direction);
        if (s.params.freeMode) {
            s.classNames.push('swiper-container-free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push('swiper-container-no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        if (['cube', 'coverflow'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push('swiper-container-3d');
            } else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push('swiper-container-' + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
            s.params.setWrapperSize = false;
        }
        if (s.params.effect === 'fade') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.paginationClickable) {
                s.paginationContainer.addClass('swiper-pagination-clickable');
            }
        }

        function isH() {
            return s.params.direction === 'horizontal';
        }
        s.rtl = isH() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push('swiper-container-rtl');
        }
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push('swiper-container-multirow');
        }
        if (s.device.android) {
            s.classNames.push('swiper-container-android');
        }
        s.container.addClass(s.classNames.join(' '));
        s.translate = 0;
        s.progress = 0;
        s.velocity = 0;
        s.lockSwipeToNext = function() {
            s.params.allowSwipeToNext = false;
        };
        s.lockSwipeToPrev = function() {
            s.params.allowSwipeToPrev = false;
        };
        s.lockSwipes = function() {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
        };
        s.unlockSwipeToNext = function() {
            s.params.allowSwipeToNext = true;
        };
        s.unlockSwipeToPrev = function() {
            s.params.allowSwipeToPrev = true;
        };
        s.unlockSwipes = function() {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
        };
        if (s.params.grabCursor) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = '-webkit-grab';
            s.container[0].style.cursor = '-moz-grab';
            s.container[0].style.cursor = 'grab';
        }
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        s.loadImage = function(imgElement, src, checkForComplete, callback) {
            var image;

            function onReady() {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    image.src = src;
                } else {
                    onReady();
                }
            } else {
                onReady();
            }
        };
        s.preloadImages = function() {
            s.imagesToLoad = s.container.find('img');

            function _onReady() {
                if (typeof s === 'undefined' || s === null) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), true, _onReady);
            }
        };
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;

        function autoplay() {
            s.autoplayTimeoutId = setTimeout(function() {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                } else {
                    if (!s.isEnd) {
                        s._slideNext();
                    } else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                        } else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, s.params.autoplay);
        }
        s.startAutoplay = function() {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function(internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function(speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            } else {
                s.wrapper.transitionEnd(function() {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    } else {
                        autoplay();
                    }
                });
            }
        };
        s.minTranslate = function() {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function() {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        s.updateContainerSize = function() {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            } else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            } else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && isH() || height === 0 && !isH()) {
                return;
            }
            s.width = width;
            s.height = height;
            s.size = isH() ? s.width : s.height;
        };
        s.updateSlidesSize = function() {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
            var spaceBetween = s.params.spaceBetween,
                slidePosition = 0,
                i, prevSlideSize = 0,
                index = 0;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
            s.virtualSize = -spaceBetween;
            if (s.rtl) s.slides.css({
                marginLeft: '',
                marginTop: ''
            });
            else s.slides.css({
                marginRight: '',
                marginBottom: ''
            });
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                } else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
            }
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide.css({
                            '-webkit-box-ordinal-group': newSlideOrderIndex,
                            '-moz-box-ordinal-group': newSlideOrderIndex,
                            '-ms-flex-order': newSlideOrderIndex,
                            '-webkit-order': newSlideOrderIndex,
                            'order': newSlideOrderIndex
                        });
                    } else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide.css({
                        'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                    }).attr('data-swiper-column', column).attr('data-swiper-row', row);
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = isH() ? slide.outerWidth(true) : slide.outerHeight(true);
                } else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (isH()) {
                        s.slides[i].style.width = slideSize + 'px';
                    } else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                } else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                s.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size);
            var newSlidesGrid;
            if (s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({
                    width: s.virtualSize + s.params.spaceBetween + 'px'
                });
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (isH()) s.wrapper.css({
                    width: s.virtualSize + s.params.spaceBetween + 'px'
                });
                else s.wrapper.css({
                    height: s.virtualSize + s.params.spaceBetween + 'px'
                });
            }
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                s.wrapper.css({
                    width: s.virtualSize + s.params.spaceBetween + 'px'
                });
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) > Math.floor(s.snapGrid[s.snapGrid.length - 1])) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
            if (s.params.spaceBetween !== 0) {
                if (isH()) {
                    if (s.rtl) s.slides.css({
                        marginLeft: spaceBetween + 'px'
                    });
                    else s.slides.css({
                        marginRight: spaceBetween + 'px'
                    });
                } else s.slides.css({
                    marginBottom: spaceBetween + 'px'
                });
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function() {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = isH() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        s.updateSlidesProgress = function(translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
            var offsetCenter = s.params.centeredSlides ? -translate + s.size / 2 : -translate;
            if (s.rtl) offsetCenter = s.params.centeredSlides ? translate - s.size / 2 : translate;
            var containerBox = s.container[0].getBoundingClientRect();
            var sideBefore = isH() ? 'left' : 'top';
            var sideAfter = isH() ? 'right' : 'bottom';
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideCenterOffset = (s.params.centeredSlides === true) ? slide.swiperSlideSize / 2 : 0;
                var slideProgress = (offsetCenter - slide.swiperSlideOffset - slideCenterOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset - slideCenterOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible = (slideBefore >= 0 && slideBefore < s.size) || (slideAfter > 0 && slideAfter <= s.size) || (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function(translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            } else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd) s.emit('onReachEnd', s);
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function() {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    } else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                } else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
        };
        s.updateClasses = function() {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            activeSlide.addClass(s.params.slideActiveClass);
            activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.bullets && s.bullets.length > 0) {
                s.bullets.removeClass(s.params.bulletActiveClass);
                var bulletIndex;
                if (s.params.loop) {
                    bulletIndex = Math.ceil(s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup;
                    if (bulletIndex > s.slides.length - 1 - s.loopedSlides * 2) {
                        bulletIndex = bulletIndex - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (bulletIndex > s.bullets.length - 1) bulletIndex = bulletIndex - s.bullets.length;
                } else {
                    if (typeof s.snapIndex !== 'undefined') {
                        bulletIndex = s.snapIndex;
                    } else {
                        bulletIndex = s.activeIndex || 0;
                    }
                }
                if (s.paginationContainer.length > 1) {
                    s.bullets.each(function() {
                        if ($(this).index() === bulletIndex) $(this).addClass(s.params.bulletActiveClass);
                    });
                } else {
                    s.bullets.eq(bulletIndex).addClass(s.params.bulletActiveClass);
                }
            }
            if (!s.params.loop) {
                if (s.params.prevButton) {
                    if (s.isBeginning) {
                        $(s.params.prevButton).addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.prevButton));
                    } else {
                        $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.prevButton));
                    }
                }
                if (s.params.nextButton) {
                    if (s.isEnd) {
                        $(s.params.nextButton).addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.nextButton));
                    } else {
                        $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.nextButton));
                    }
                }
            }
        };
        s.updatePagination = function() {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var bulletsHTML = '';
                var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                for (var i = 0; i < numberOfBullets; i++) {
                    if (s.params.paginationBulletRender) {
                        bulletsHTML += s.params.paginationBulletRender(i, s.params.bulletClass);
                    } else {
                        bulletsHTML += '<span class="' + s.params.bulletClass + '"></span>';
                    }
                }
                s.paginationContainer.html(bulletsHTML);
                s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
            }
        };
        s.update = function(updateTranslate) {
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }

            function forceSetTranslate() {
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated, newTranslate;
                if (s.params.freeMode) {
                    forceSetTranslate();
                } else {
                    if (s.params.slidesPerView === 'auto' && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    } else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            }
        };
        s.onResize = function(forceUpdatePagination) {
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            } else {
                s.updateClasses();
                if (s.params.slidesPerView === 'auto' && s.isEnd && !s.params.centeredSlides) {
                    s.slideTo(s.slides.length - 1, 0, false, true);
                } else {
                    s.slideTo(s.activeIndex, 0, false, true);
                }
            }
        };
        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
        if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
        else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        s.touchEvents = {
            start: s.support.touch || !s.params.simulateTouch ? 'touchstart' : desktopEvents[0],
            move: s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
            end: s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
        };
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        s.initEvents = function(detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
            var moveCapture = s.params.nested ? true : false;
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            } else {
                if (s.support.touch) {
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false);
                }
                if (params.simulateTouch && !s.device.ios && !s.device.android) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            if (s.params.nextButton) {
                $(s.params.nextButton)[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) $(s.params.nextButton)[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton) {
                $(s.params.prevButton)[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) $(s.params.prevButton)[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                $(s.paginationContainer)[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
            }
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function(detach) {
            s.initEvents();
        };
        s.detachEvents = function() {
            s.initEvents(true);
        };
        s.allowClick = true;
        s.preventClicks = function(e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        s.onClickNext = function(e) {
            e.preventDefault();
            s.slideNext();
        };
        s.onClickPrev = function(e) {
            e.preventDefault();
            s.slidePrev();
        };
        s.onClickIndex = function(e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };

        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                } else if (selector.nodeType) {
                    var found;
                    el.parents().each(function(index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function(e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            } else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex;
                if (s.params.loop) {
                    realIndex = $(s.clickedSlide).attr('data-swiper-slide-index');
                    if (slideToIndex > s.slides.length - s.params.slidesPerView) {
                        s.fixLoop();
                        slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]').eq(0).index();
                        setTimeout(function() {
                            s.slideTo(slideToIndex);
                        }, 0);
                    } else if (slideToIndex < s.params.slidesPerView - 1) {
                        s.fixLoop();
                        var duplicatedSlides = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]');
                        slideToIndex = duplicatedSlides.eq(duplicatedSlides.length - 1).index();
                        setTimeout(function() {
                            s.slideTo(slideToIndex);
                        }, 0);
                    } else {
                        s.slideTo(slideToIndex);
                    }
                } else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        var isTouched, isMoved, touchStartTime, isScrolling, currentTranslate, startTranslate, allowThresholdMove, formElements = 'input, select, textarea, button',
            lastClickTime = Date.now(),
            clickTimeout, velocities = [],
            allowMomentumBounce;
        s.animating = false;
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        var isTouchEvent, startMoving;
        s.onTouchStart = function(e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
            isTouched = true;
            isMoved = false;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        s.onTouchMove = function(e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) return;
            if (s.params.onlyExternal) {
                isMoved = true;
                s.allowClick = false;
                return;
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            s.emit('onTouchMove', s, e);
            if (e.targetTouches && e.targetTouches.length > 1) return;
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            if (typeof isScrolling === 'undefined') {
                var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                isScrolling = isH() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling) {
                isTouched = false;
                return;
            }
            if (!startMoving && s.browser.ieTouch) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    } else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                if (s.params.grabCursor) {
                    s.container[0].style.cursor = 'move';
                    s.container[0].style.cursor = '-webkit-grabbing';
                    s.container[0].style.cursor = '-moz-grabbin';
                    s.container[0].style.cursor = 'grabbing';
                }
            }
            isMoved = true;
            var diff = s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            } else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.followFinger) return;
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = isH() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                } else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[isH() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[isH() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            s.updateProgress(currentTranslate);
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function(e) {
            if (e.originalEvent) e = e.originalEvent;
            s.emit('onTouchEnd', s, e);
            if (!isTouched) return;
            if (s.params.grabCursor && isMoved && isTouched) {
                s.container[0].style.cursor = 'move';
                s.container[0].style.cursor = '-webkit-grab';
                s.container[0].style.cursor = '-moz-grab';
                s.container[0].style.cursor = 'grab';
            }
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function() {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
            lastClickTime = Date.now();
            setTimeout(function() {
                if (s) s.allowClick = true;
            }, 0);
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            } else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                } else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    } else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(),
                            velocityEvent = velocities.pop();
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < 0.02) {
                            s.velocity = 0;
                        }
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = -newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        } else {
                            newPosition = s.maxTranslate();
                        }
                    } else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        } else {
                            newPosition = s.minTranslate();
                        }
                    } else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = -newPosition;
                    }
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        } else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    } else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function() {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function() {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function() {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
                    } else {
                        s.updateProgress(newPosition);
                    }
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
            var i, stopIndex = 0,
                groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                } else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
            if (timeDiff > s.params.longSwipesMs) {
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            } else {
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        s._slideTo = function(slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function(slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
            var translate = -s.snapGrid[s.snapIndex];
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                return false;
            }
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                } else {
                    s.stopAutoplay();
                }
            }
            s.updateProgress(translate);
            for (var i = 0; i < s.slidesGrid.length; i++) {
                if (-translate >= s.slidesGrid[i]) {
                    slideIndex = i;
                }
            }
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            if (translate === s.translate) {
                s.updateClasses();
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
            var translateX = isH() ? translate : 0,
                translateY = isH() ? 0 : translate;
            if (speed === 0) {
                s.setWrapperTransition(0);
                s.setWrapperTranslate(translate);
                s.onTransitionEnd(runCallbacks);
            } else {
                s.setWrapperTransition(speed);
                s.setWrapperTranslate(translate);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function() {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
            }
            return true;
        };
        s.onTransitionStart = function(runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                }
            }
        };
        s.onTransitionEnd = function(runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                }
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        };
        s.slideNext = function(runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            } else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function(speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function(runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            } else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function(speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function(runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        s.setWrapperTransition = function(duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function(translate, updateActiveIndex, byController) {
            var x = 0,
                y = 0,
                z = 0;
            if (isH()) {
                x = s.rtl ? -translate : translate;
            } else {
                y = translate;
            }
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
            s.translate = isH() ? x : y;
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        s.getTranslate = function(el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                transformMatrix = new window.WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
            if (axis === 'x') {
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function(axis) {
            if (typeof axis === 'undefined') {
                axis = isH() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        s.observers = [];

        function initObserver(target, options) {
            options = options || {};
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function(mutations) {
                mutations.forEach(function(mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
            s.observers.push(observer);
        }
        s.initObservers = function() {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
            initObserver(s.container[0], {
                childList: false
            });
            initObserver(s.wrapper[0], {
                attributes: false
            });
        };
        s.disconnectObservers = function() {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        s.createLoop = function() {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            var slides = s.wrapper.children('.' + s.params.slideClass);
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
            var prependSlides = [],
                appendSlides = [],
                i;
            slides.each(function(index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function() {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.fixLoop = function() {
            var newIndex;
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            } else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        s.appendSlide = function(slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            } else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function(slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            } else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function(slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            } else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            } else {
                s.slideTo(newActiveIndex, 0, false);
            }
        };
        s.removeAllSlides = function() {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        s.effects = {
            fade: {
                setTranslate: function() {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!isH()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide.css({
                            opacity: slideOpacity
                        }).transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
                    }
                },
                setTransition: function(duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function() {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function() {
                    var wrapperRotate = 0,
                        cubeShadow;
                    if (s.params.cube.shadow) {
                        if (isH()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({
                                height: s.width + 'px'
                            });
                        } else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0,
                            ty = 0,
                            tz = 0;
                        if (i % 4 === 0) {
                            tx = -round * 4 * s.size;
                            tz = 0;
                        } else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = -round * 4 * s.size;
                        } else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        } else if ((i - 3) % 4 === 0) {
                            tx = -s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
                        if (!isH()) {
                            ty = tx;
                            tx = 0;
                        }
                        var transform = 'rotateX(' + (isH() ? 0 : -slideAngle) + 'deg) rotateY(' + (isH() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            var shadowOpacity = slide[0].progress;
                            if (shadowBefore.length) shadowBefore[0].style.opacity = -slide[0].progress;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = slide[0].progress;
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
                    if (s.params.cube.shadow) {
                        if (isH()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        } else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (isH() ? 0 : wrapperRotate) + 'deg) rotateY(' + (isH() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !isH()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function() {
                    var transform = s.translate;
                    var center = isH() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = isH() ? s.params.coverflow.rotate : -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
                        var rotateY = isH() ? rotate * offsetMultiplier : 0;
                        var rotateX = isH() ? 0 : rotate * offsetMultiplier;
                        var translateZ = -translate * Math.abs(offsetMultiplier);
                        var translateY = isH() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = isH() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            var shadowBefore = isH() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = isH() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (isH() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (isH() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function(duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function(index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
                var slide = s.slides.eq(index);
                var img = slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
                if (slide.hasClass('swiper-lazy') && !slide.hasClass('swiper-lazy-loaded') && !slide.hasClass('swiper-lazy-loading')) {
                    img.add(slide[0]);
                }
                if (img.length === 0) return;
                img.each(function() {
                    var _img = $(this);
                    _img.addClass('swiper-lazy-loading');
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src');
                    s.loadImage(_img[0], (src || background), false, function() {
                        if (background) {
                            _img.css('background-image', 'url(' + background + ')');
                            _img.removeAttr('data-background');
                        } else {
                            _img.attr('src', src);
                            _img.removeAttr('data-src');
                        }
                        _img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');
                        slide.find('.swiper-lazy-preloader, .preloader').remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            } else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
            },
            load: function() {
                var i;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function() {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                } else {
                    if (s.params.slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    } else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (s.params.slidesPerView > 1) {
                        for (i = s.activeIndex + s.params.slidesPerView; i < s.activeIndex + s.params.slidesPerView + s.params.slidesPerView; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        for (i = s.activeIndex - s.params.slidesPerView; i < s.activeIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    } else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function() {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function() {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        s.scrollbar = {
            set: function() {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = isH() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
                if (isH()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                } else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                } else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function() {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && isH()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    } else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                } else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    } else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (isH()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    } else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                } else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    } else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function() {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function(duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };
        s.controller = {
            setTranslate: function(translate, byController) {
                var controlled = s.params.control;
                var multiplier, controlledTranslate;

                function setControlledTranslate(c) {
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                    controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
                }
                if (s.isArray(controlled)) {
                    for (var i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTranslate(controlled[i]);
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTranslate(controlled);
                }
            },
            setTransition: function(duration, byController) {
                var controlled = s.params.control;
                var i;

                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function() {
                            if (!controlled) return;
                            c.onTransitionEnd();
                        });
                    }
                }
                if (s.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                } else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };
        s.hashnav = {
            init: function() {
                if (!s.params.hashnav) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (!hash) return;
                var speed = 0;
                for (var i = 0, length = s.slides.length; i < length; i++) {
                    var slide = s.slides.eq(i);
                    var slideHash = slide.attr('data-hash');
                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                        var index = slide.index();
                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                    }
                }
            },
            setHash: function() {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || '';
            }
        };

        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent;
            var kc = e.keyCode || e.charCode;
            if (!s.params.allowSwipeToNext && (isH() && kc === 39 || !isH() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (isH() && kc === 37 || !isH() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                if (s.container.parents('.swiper-slide').length > 0 && s.container.parents('.swiper-slide-active').length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + s.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + s.height],
                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                ];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
                        inView = true;
                    }
                }
                if (!inView) return;
            }
            if (isH()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
            } else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
        }
        s.disableKeyboardControl = function() {
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function() {
            $(document).on('keydown', handleKeyboard);
        };
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        if (s.params.mousewheelControl) {
            if (document.onmousewheel !== undefined) {
                s.mousewheel.event = 'mousewheel';
            }
            if (!s.mousewheel.event) {
                try {
                    new window.WheelEvent('wheel');
                    s.mousewheel.event = 'wheel';
                } catch (e) {}
            }
            if (!s.mousewheel.event) {
                s.mousewheel.event = 'DOMMouseScroll';
            }
        }

        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent;
            var we = s.mousewheel.event;
            var delta = 0;
            if (e.detail) delta = -e.detail;
            else if (we === 'mousewheel') {
                if (s.params.mousewheelForceToAxis) {
                    if (isH()) {
                        if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX;
                        else return;
                    } else {
                        if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
                        else return;
                    }
                } else {
                    delta = e.wheelDelta;
                }
            } else if (we === 'DOMMouseScroll') delta = -e.detail;
            else if (we === 'wheel') {
                if (s.params.mousewheelForceToAxis) {
                    if (isH()) {
                        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX;
                        else return;
                    } else {
                        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
                        else return;
                    }
                } else {
                    delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
                }
            }
            if (s.params.mousewheelInvert) delta = -delta;
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if (!s.isEnd) s.slideNext();
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    } else {
                        if (!s.isBeginning) s.slidePrev();
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
            } else {
                var position = s.getWrapperTranslate() + delta;
                if (position > 0) position = 0;
                if (position < s.maxTranslate()) position = s.maxTranslate();
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function() {
                        s.slideReset();
                    }, 300);
                }
                if (position === 0 || position === s.maxTranslate()) return;
            }
            if (s.params.autoplay) s.stopAutoplay();
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function() {
            if (!s.mousewheel.event) return false;
            s.container.off(s.mousewheel.event, handleMousewheel);
            return true;
        };
        s.enableMousewheelControl = function() {
            if (!s.mousewheel.event) return false;
            s.container.on(s.mousewheel.event, handleMousewheel);
            return true;
        };

        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            } else {
                if (isH()) {
                    pX = p;
                    pY = '0';
                } else {
                    pY = p;
                    pX = '0';
                }
            }
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress + '%';
            } else {
                pX = pX * progress + 'px';
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            } else {
                pY = pY * progress + 'px';
            }
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function() {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function() {
                    setParallaxTransform(this, s.progress);
                });
                s.slides.each(function() {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function() {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function(duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function() {
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        s.callPlugins = function(eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };

        function normalizeEventName(eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                } else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {};
        s.emit = function(eventName) {
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function(eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function(eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if (s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function(eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function() {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };
        s.a11y = {
            makeFocusable: function($el) {
                $el[0].tabIndex = '0';
                return $el;
            },
            addRole: function($el, role) {
                $el.attr('role', role);
                return $el;
            },
            addLabel: function($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
            disable: function($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
            enable: function($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
            onEnterKey: function(event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMsg);
                    } else {
                        s.a11y.notify(s.params.nextSlideMsg);
                    }
                } else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMsg);
                    } else {
                        s.a11y.notify(s.params.prevSlideMsg);
                    }
                }
            },
            liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
            notify: function(message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function() {
                if (s.params.nextButton) {
                    var nextButton = $(s.params.nextButton);
                    s.a11y.makeFocusable(nextButton);
                    s.a11y.addRole(nextButton, 'button');
                    s.a11y.addLabel(nextButton, s.params.nextSlideMsg);
                }
                if (s.params.prevButton) {
                    var prevButton = $(s.params.prevButton);
                    s.a11y.makeFocusable(prevButton);
                    s.a11y.addRole(prevButton, 'button');
                    s.a11y.addLabel(prevButton, s.params.prevSlideMsg);
                }
                $(s.container).append(s.a11y.liveRegion);
            },
            destroy: function() {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        s.init = function() {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            } else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        s.cleanupStyles = function() {
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
            s.wrapper.removeAttr('style');
            if (s.slides && s.slides.length) {
                s.slides.removeClass([s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
            }
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        s.destroy = function(deleteInstance, cleanupStyles) {
            s.detachEvents();
            s.stopAutoplay();
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            s.disconnectObservers();
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            s.emit('onDestroy');
            if (deleteInstance !== false) s = null;
        };
        s.init();
        return s;
    };
    Swiper.prototype = {
        isSafari: (function() {
            var ua = navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
        },
        device: (function() {
            var ua = navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipad,
                android: android
            };
        })(),
        support: {
            touch: (window.Modernizr && Modernizr.touch === true) || (function() {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
            transforms3d: (window.Modernizr && Modernizr.csstransforms3d === true) || (function() {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
            flexbox: (function() {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
            observer: (function() {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })()
        },
        plugins: {}
    };
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];

    function addLibraryPlugin(lib) {
        lib.fn.swiper = function(params) {
            var firstInstance;
            lib(this).each(function() {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }
    for (var i = 0; i < swiperDomPlugins.length; i++) {
        if (window[swiperDomPlugins[i]]) {
            addLibraryPlugin(window[swiperDomPlugins[i]]);
        }
    }
    var domLib;
    if (typeof Dom7 === 'undefined') {
        domLib = window.Dom7 || window.Zepto || window.jQuery;
    } else {
        domLib = Dom7;
    }
    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function(callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;

                function fireCallBack(e) {
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function(transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function(duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
    }
    window.Swiper = Swiper;
})();
if (typeof(module) !== 'undefined') {
    module.exports = window.Swiper;
} else if (typeof define === 'function' && define.amd) {
    define([], function() {
        'use strict';
        return window.Swiper;
    });
}
(function(global, factory) {
    if (typeof exports === "object" && exports) {
        factory(exports);
    } else if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else {
        factory(global.Mustache = {});
    }
}(this, function(mustache) {
    var Object_toString = Object.prototype.toString;
    var isArray = Array.isArray || function(object) {
        return Object_toString.call(object) === '[object Array]';
    };

    function isFunction(object) {
        return typeof object === 'function';
    }

    function escapeRegExp(string) {
        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }
    var RegExp_test = RegExp.prototype.test;

    function testRegExp(re, string) {
        return RegExp_test.call(re, string);
    }
    var nonSpaceRe = /\S/;

    function isWhitespace(string) {
        return !testRegExp(nonSpaceRe, string);
    }
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function(s) {
            return entityMap[s];
        });
    }
    var whiteRe = /\s*/;
    var spaceRe = /\s+/;
    var equalsRe = /\s*=/;
    var curlyRe = /\s*\}/;
    var tagRe = /#|\^|\/|>|\{|&|=|!/;

    function parseTemplate(template, tags) {
        if (!template)
            return [];
        var sections = [];
        var tokens = [];
        var spaces = [];
        var hasTag = false;
        var nonSpace = false;

        function stripSpace() {
            if (hasTag && !nonSpace) {
                while (spaces.length)
                    delete tokens[spaces.pop()];
            } else {
                spaces = [];
            }
            hasTag = false;
            nonSpace = false;
        }
        var openingTagRe, closingTagRe, closingCurlyRe;

        function compileTags(tags) {
            if (typeof tags === 'string')
                tags = tags.split(spaceRe, 2);
            if (!isArray(tags) || tags.length !== 2)
                throw new Error('Invalid tags: ' + tags);
            openingTagRe = new RegExp(escapeRegExp(tags[0]) + '\\s*');
            closingTagRe = new RegExp('\\s*' + escapeRegExp(tags[1]));
            closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tags[1]));
        }
        compileTags(tags || mustache.tags);
        var scanner = new Scanner(template);
        var start, type, value, chr, token, openSection;
        while (!scanner.eos()) {
            start = scanner.pos;
            value = scanner.scanUntil(openingTagRe);
            if (value) {
                for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
                    chr = value.charAt(i);
                    if (isWhitespace(chr)) {
                        spaces.push(tokens.length);
                    } else {
                        nonSpace = true;
                    }
                    tokens.push(['text', chr, start, start + 1]);
                    start += 1;
                    if (chr === '\n')
                        stripSpace();
                }
            }
            if (!scanner.scan(openingTagRe))
                break;
            hasTag = true;
            type = scanner.scan(tagRe) || 'name';
            scanner.scan(whiteRe);
            if (type === '=') {
                value = scanner.scanUntil(equalsRe);
                scanner.scan(equalsRe);
                scanner.scanUntil(closingTagRe);
            } else if (type === '{') {
                value = scanner.scanUntil(closingCurlyRe);
                scanner.scan(curlyRe);
                scanner.scanUntil(closingTagRe);
                type = '&';
            } else {
                value = scanner.scanUntil(closingTagRe);
            }
            if (!scanner.scan(closingTagRe))
                throw new Error('Unclosed tag at ' + scanner.pos);
            token = [type, value, start, scanner.pos];
            tokens.push(token);
            if (type === '#' || type === '^') {
                sections.push(token);
            } else if (type === '/') {
                openSection = sections.pop();
                if (!openSection)
                    throw new Error('Unopened section "' + value + '" at ' + start);
                if (openSection[1] !== value)
                    throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
            } else if (type === 'name' || type === '{' || type === '&') {
                nonSpace = true;
            } else if (type === '=') {
                compileTags(value);
            }
        }
        openSection = sections.pop();
        if (openSection)
            throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
        return nestTokens(squashTokens(tokens));
    }

    function squashTokens(tokens) {
        var squashedTokens = [];
        var token, lastToken;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];
            if (token) {
                if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
                    lastToken[1] += token[1];
                    lastToken[3] = token[3];
                } else {
                    squashedTokens.push(token);
                    lastToken = token;
                }
            }
        }
        return squashedTokens;
    }

    function nestTokens(tokens) {
        var nestedTokens = [];
        var collector = nestedTokens;
        var sections = [];
        var token, section;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            token = tokens[i];
            switch (token[0]) {
                case '#':
                case '^':
                    collector.push(token);
                    sections.push(token);
                    collector = token[4] = [];
                    break;
                case '/':
                    section = sections.pop();
                    section[5] = token[2];
                    collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
                    break;
                default:
                    collector.push(token);
            }
        }
        return nestedTokens;
    }

    function Scanner(string) {
        this.string = string;
        this.tail = string;
        this.pos = 0;
    }
    Scanner.prototype.eos = function() {
        return this.tail === "";
    };
    Scanner.prototype.scan = function(re) {
        var match = this.tail.match(re);
        if (!match || match.index !== 0)
            return '';
        var string = match[0];
        this.tail = this.tail.substring(string.length);
        this.pos += string.length;
        return string;
    };
    Scanner.prototype.scanUntil = function(re) {
        var index = this.tail.search(re),
            match;
        switch (index) {
            case -1:
                match = this.tail;
                this.tail = "";
                break;
            case 0:
                match = "";
                break;
            default:
                match = this.tail.substring(0, index);
                this.tail = this.tail.substring(index);
        }
        this.pos += match.length;
        return match;
    };

    function Context(view, parentContext) {
        this.view = view;
        this.cache = {
            '.': this.view
        };
        this.parent = parentContext;
    }
    Context.prototype.push = function(view) {
        return new Context(view, this);
    };
    Context.prototype.lookup = function(name) {
        var cache = this.cache;
        var value;
        if (name in cache) {
            value = cache[name];
        } else {
            var context = this,
                names, index, lookupHit = false;
            while (context) {
                if (name.indexOf('.') > 0) {
                    value = context.view;
                    names = name.split('.');
                    index = 0;
                    while (value != null && index < names.length) {
                        if (index === names.length - 1 && value != null)
                            lookupHit = (typeof value === 'object') && value.hasOwnProperty(names[index]);
                        value = value[names[index++]];
                    }
                } else if (context.view != null && typeof context.view === 'object') {
                    value = context.view[name];
                    lookupHit = context.view.hasOwnProperty(name);
                }
                if (lookupHit)
                    break;
                context = context.parent;
            }
            cache[name] = value;
        }
        if (isFunction(value))
            value = value.call(this.view);
        return value;
    };

    function Writer() {
        this.cache = {};
    }
    Writer.prototype.clearCache = function() {
        this.cache = {};
    };
    Writer.prototype.parse = function(template, tags) {
        var cache = this.cache;
        var tokens = cache[template];
        if (tokens == null)
            tokens = cache[template] = parseTemplate(template, tags);
        return tokens;
    };
    Writer.prototype.render = function(template, view, partials) {
        var tokens = this.parse(template);
        var context = (view instanceof Context) ? view : new Context(view);
        return this.renderTokens(tokens, context, partials, template);
    };
    Writer.prototype.renderTokens = function(tokens, context, partials, originalTemplate) {
        var buffer = '';
        var token, symbol, value;
        for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
            value = undefined;
            token = tokens[i];
            symbol = token[0];
            if (symbol === '#') value = this._renderSection(token, context, partials, originalTemplate);
            else if (symbol === '^') value = this._renderInverted(token, context, partials, originalTemplate);
            else if (symbol === '>') value = this._renderPartial(token, context, partials, originalTemplate);
            else if (symbol === '&') value = this._unescapedValue(token, context);
            else if (symbol === 'name') value = this._escapedValue(token, context);
            else if (symbol === 'text') value = this._rawValue(token);
            if (value !== undefined)
                buffer += value;
        }
        return buffer;
    };
    Writer.prototype._renderSection = function(token, context, partials, originalTemplate) {
        var self = this;
        var buffer = '';
        var value = context.lookup(token[1]);

        function subRender(template) {
            return self.render(template, context, partials);
        }
        if (!value) return;
        if (isArray(value)) {
            for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
                buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
            }
        } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
            buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
            if (typeof originalTemplate !== 'string')
                throw new Error('Cannot use higher-order sections without the original template');
            value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
            if (value != null)
                buffer += value;
        } else {
            buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }
        return buffer;
    };
    Writer.prototype._renderInverted = function(token, context, partials, originalTemplate) {
        var value = context.lookup(token[1]);
        if (!value || (isArray(value) && value.length === 0))
            return this.renderTokens(token[4], context, partials, originalTemplate);
    };
    Writer.prototype._renderPartial = function(token, context, partials) {
        if (!partials) return;
        var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
        if (value != null)
            return this.renderTokens(this.parse(value), context, partials, value);
    };
    Writer.prototype._unescapedValue = function(token, context) {
        var value = context.lookup(token[1]);
        if (value != null)
            return value;
    };
    Writer.prototype._escapedValue = function(token, context) {
        var value = context.lookup(token[1]);
        if (value != null)
            return mustache.escape(value);
    };
    Writer.prototype._rawValue = function(token) {
        return token[1];
    };
    mustache.name = "mustache.js";
    mustache.version = "2.0.0";
    mustache.tags = ["{{", "}}"];
    var defaultWriter = new Writer();
    mustache.clearCache = function() {
        return defaultWriter.clearCache();
    };
    mustache.parse = function(template, tags) {
        return defaultWriter.parse(template, tags);
    };
    mustache.render = function(template, view, partials) {
        return defaultWriter.render(template, view, partials);
    };
    mustache.to_html = function(template, view, partials, send) {
        var result = mustache.render(template, view, partials);
        if (isFunction(send)) {
            send(result);
        } else {
            return result;
        }
    };
    mustache.escape = escapeHtml;
    mustache.Scanner = Scanner;
    mustache.Context = Context;
    mustache.Writer = Writer;
}));;
window.ModernizrWithPrefixed = function(a, b, c) {
    function w(a) {
        i.cssText = a
    }

    function x(a, b) {
        return w(prefixes.join(a + ";") + (b || ""))
    }

    function y(a, b) {
        return typeof a === b
    }

    function z(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function A(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!z(e, "-") && i[e] !== c) return b == "pfx" ? e : !0
        }
        return !1
    }

    function B(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : y(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function C(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + m.join(d + " ") + d).split(" ");
        return y(b, "string") || y(b, "undefined") ? A(e, b) : (e = (a + " " + n.join(d + " ") + d).split(" "), B(e, b, c))
    }
    var d = "2.8.3",
        e = {},
        f = b.documentElement,
        g = "modernizr",
        h = b.createElement(g),
        i = h.style,
        j, k = {}.toString,
        l = "Webkit Moz O ms",
        m = l.split(" "),
        n = l.toLowerCase().split(" "),
        o = {},
        p = {},
        q = {},
        r = [],
        s = r.slice,
        t, u = {}.hasOwnProperty,
        v;
    !y(u, "undefined") && !y(u.call, "undefined") ? v = function(a, b) {
        return u.call(a, b)
    } : v = function(a, b) {
        return b in a && y(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = s.call(arguments, 1),
            e = function() {
                if (this instanceof e) {
                    var a = function() {};
                    a.prototype = c.prototype;
                    var f = new a,
                        g = c.apply(f, d.concat(s.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return c.apply(b, d.concat(s.call(arguments)))
            };
        return e
    });
    for (var D in o) v(o, D) && (t = D.toLowerCase(), e[t] = o[D](), r.push((e[t] ? "" : "no-") + t));
    return e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a) v(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c) return e;
            b = typeof b == "function" ? b() : b, typeof enableClasses != "undefined" && enableClasses && (f.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, w(""), h = j = null, e._version = d, e._domPrefixes = n, e._cssomPrefixes = m, e.testProp = function(a) {
        return A([a])
    }, e.testAllProps = C, e.prefixed = function(a, b, c) {
        return b ? C(a, b, c) : C(a, "pfx")
    }, e
}(this, this.document);
String.prototype.endsWith = String.prototype.endsWith || function(suffix) {
    'use strict';
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
window.jqueryAjaxCache = window.jqueryAjaxCache || (function($, window, document, undefined) {
    'use strict';
    var hasLocalstorage, storage, defaultExpirationMins, jqueryAjaxCache;
    hasLocalstorage = (function() {
        var mod = 'modernizr';
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    })();
    storage = {
        save: function(key, data, expirationMin) {
            if (!hasLocalstorage) {
                return false;
            }
            var expirationMS = expirationMin * 60 * 1000;
            var record = {
                value: data,
                timestamp: new Date().getTime() + expirationMS
            };
            localStorage.setItem(key, JSON.stringify(record));
            return data;
        },
        load: function(key) {
            if (!hasLocalstorage) {
                return false;
            }
            var record = JSON.parse(localStorage.getItem(key));
            if (!record) {
                return false;
            }
            return (new Date().getTime() < record.timestamp && record.value);
        }
    };
    defaultExpirationMins = 15;
    jqueryAjaxCache = {
        ajax: function(url, callback, cacheKey, extraContext, type) {
            var ajaxData, cacheData, ajaxContext, isJsonData, isXmlData;
            cacheKey = (typeof cacheKey !== 'undefined') ? cacheKey : url;
            if (typeof type === 'undefined' || !type) {
                type = url.split('.');
                type = type[type.length - 1];
            }
            isJsonData = (type === 'json' || type === 'jsonp');
            isXmlData = (type === 'xml' || type === 'svg');
            ajaxData = storage.load(cacheKey);
            if (ajaxData) {
                if (isJsonData) {
                    ajaxData = JSON.parse(ajaxData);
                }
                callback(ajaxData);
                return;
            }
            ajaxContext = $.extend({
                url: url,
                jsonp: false,
                cache: true,
                success: function(data) {
                    ajaxData = data;
                },
                error: function(e) {
                    console.error(e);
                },
                complete: function() {
                    if (ajaxData) {
                        if (isJsonData) {
                            cacheData = JSON.stringify(ajaxData);
                        } else if (isXmlData) {
                            cacheData = ajaxData = new XMLSerializer().serializeToString(ajaxData);
                        }
                        storage.save(cacheKey, cacheData, defaultExpirationMins);
                    }
                    callback(ajaxData);
                }
            }, extraContext);
            return $.ajax(ajaxContext);
        },
        get: function(url, callback, cacheKey, type) {
            return this.ajax(url, callback, cacheKey, {}, type);
        },
        getJSON: function(url, callback, cacheKey) {
            var type = url.endsWith('jsonp') ? 'jsonp' : 'json';
            return this.ajax(url, callback, cacheKey, {
                dataType: type,
                jsonpCallback: (type === 'jsonp') ? 'globoapiMenusCallback' : null
            }, type);
        }
    };
    return jqueryAjaxCache;
})(jQuery, this, this.document);
(function(global) {
    'use strict';
    var $document = $(document);
    var MenuWebTracker = function($menu_root, on_mobile) {
        this.attr = {
            item_selector: '.menu-item',
            link_selector: '.menu-item-link',
            title_selector: '.menu-item-title',
            item_back_selector: '.menu-item-back',
            item_highlighted_selector: '.menu-item-highlighted',
            product_selector: '.menu-carousel-item',
            item_highlighted_class: 'menu-item-highlighted',
            event_namespace: '.ga_tracking',
            accent_matcher: null,
            translate_table: null,
            shouldTrack: !window.noTrackingMenuWeb,
            track_item_events_flag: false,
            onMobile: on_mobile || false
        };
        this.attr.menuFramework = on_mobile && (document.documentElement.className.indexOf('has-regua') > -1);
        this.cache_dom($menu_root);
        this.prepare_translation();
        this.listen_events();
    };
    MenuWebTracker.prototype = {
        cache_dom: function($menu_root) {
            var dom = {};
            dom.$menu_button = $('.menu-button');
            dom.$menu_root = $menu_root;
            this.dom = dom;
        },
        listen_events: function() {
            var that = this;
            var originalShouldTrack;
            var shouldNotTrackOtherEvents = function() {
                originalShouldTrack = that.attr.shouldTrack;
                that.attr.shouldTrack = false;
                setTimeout(function() {
                    that.attr.shouldTrack = originalShouldTrack;
                }, 300);
            };
            var $item;
            var dom = this.dom;
            var attr = this.attr;
            var item_selector = attr.item_selector;
            var item_back_selector = attr.item_back_selector;
            var event_namespace = attr.event_namespace;
            var ns = function(event_name) {
                return event_name + event_namespace;
            };
            dom.$menu_button.on(ns('click'), function(e) {
                that.track_menu_shown(e);
            });
            dom.$menu_root.on(ns('click'), item_selector, function(e) {
                that.track_item_events(e);
            });
            dom.$menu_root.on(ns('click'), item_back_selector, function() {
                $item = $(this);
                that.track_item_back_events($item);
            });
            $document.on('glb.menu.item-personalizado', function(e, productName, choice) {
                that.register_event('item', 'clique | top itens | ' + productName + ' | personalizado | ' + choice);
                shouldNotTrackOtherEvents();
            });
            $document.on('glb.menu.navegacional', function(e, productName, widget, choice) {
                that.register_event('item', 'clique | estrutura | ' + productName + ' | ' + widget + ' > ' + choice);
                shouldNotTrackOtherEvents();
            });
            $document.on('glb.menu.personalizacao', function(e, productName, widget, choice) {
                that.register_event('interacoes', 'personalizacao | ' + productName + ' | ' + widget + ' | ' + choice, 0, true);
                shouldNotTrackOtherEvents();
            });
            $document.on('glb.menu.marca_click', function(e, productName) {
                that.register_event('marca', 'clique | ' + productName);
            });
            $document.on('glb.menu.marca_navigation', function(e, productName) {
                that.register_event('marca', 'interacao | ' + productName, 0, true);
            });
            $document.on('glb.menu.swipe', function(e, direction) {
                that.register_event('interacoes', 'swipe | ' + direction, 0, true);
            });
        },
        register_event: function() {
            var base = ['_trackEvent'];
            if (this.attr.menuFramework) {
                base.push('menu_framework');
            } else {
                base.push('Menu');
            }
            var args = Array.prototype.slice.call(arguments, 0);
            var params = base.concat(args);
            if (global._gaq && this.attr.shouldTrack) {
                global._gaq.push(params);
            }
        },
        track_menu_shown: function() {
            if (!this.attr.menuFramework) {
                this.register_event('exibicao', 'menu exibido', 0, true);
            }
        },
        prepare_translation: function() {
            var attr = this.attr;
            var in_chrs = 'Ã Ã¡Ã¢Ã£Ã¤Ã§Ã¨Ã©ÃªÃ«Ã¬Ã­Ã®Ã¯Ã±Ã²Ã³Ã´ÃµÃ¶Ã¹ÃºÃ»Ã¼Ã½Ã¿Ã€ÃÃ‚ÃƒÃ„Ã‡ÃˆÃ‰ÃŠÃ‹ÃŒÃÃŽÃÃ‘Ã’Ã“Ã”Ã•Ã–Ã™ÃšÃ›ÃœÃ';
            var out_chrs = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY';
            var table = {},
                i;
            for (i = 0; i < in_chrs.length; i++) {
                table[in_chrs[i]] = out_chrs[i];
            }
            attr.accent_matcher = new RegExp('[' + in_chrs + ']', 'g');
            attr.translate_table = table;
        },
        accent_replacer: function(character) {
            return this.attr.translate_table[character] || character;
        },
        strip_accents: function(text) {
            var that = this;
            return text.replace(this.attr.accent_matcher, function(character) {
                return that.accent_replacer(character);
            });
        },
        track_item_events: function(event) {
            var attr = this.attr,
                acceptable_items = [attr.item_selector, attr.link_selector, attr.title_selector].join(', '),
                $trackable_item = $(event.target).filter(acceptable_items),
                $menu_item, $menu_items_highlighted, menu_item_highlighted_order, $product_item, $link, $path, label, originalLabel, parent_link_text, product_name;
            if (attr.track_item_events_flag) {
                return;
            }
            attr.track_item_events_flag = true;
            setTimeout(function() {
                attr.track_item_events_flag = false;
            }, 300);
            if ($trackable_item.length) {
                $menu_item = $trackable_item.closest(attr.item_selector);
                $link = $menu_item.children(attr.link_selector);
                $path = $menu_item.parents(attr.item_selector);
                label = $.trim($link.text());
                $product_item = $menu_item.parents(attr.product_selector);
                product_name = $product_item.attr('data-produto');
                $path.each(function() {
                    parent_link_text = $(this).children(attr.link_selector).text();
                    label = $.trim(parent_link_text) + ' > ' + label;
                });
                label = this.strip_accents(label.toLowerCase());
                if ($menu_item.hasClass(attr.item_highlighted_class) && attr.menuFramework) {
                    $menu_items_highlighted = $menu_item.parent().find(attr.item_highlighted_selector);
                    menu_item_highlighted_order = $menu_items_highlighted.index($menu_item) + 1;
                    label = 'clique | top itens | ' + product_name + ' | posicao ' + menu_item_highlighted_order + ' | ' + label;
                    this.register_event('item', label);
                    return;
                }
                originalLabel = label;
                label = 'clique | estrutura | ' + product_name + ' | ' + label;
                if ($link.attr('href')) {
                    if (attr.menuFramework) {
                        this.register_event('item', label);
                    } else {
                        this.register_event('Links clicaveis', originalLabel);
                    }
                } else {
                    if (attr.menuFramework) {
                        this.register_event('item agregador', label, 0, true);
                    } else {
                        this.register_event('Links nao clicaveis', originalLabel, 0, true);
                    }
                }
            }
        },
        track_item_back_events: function($item) {
            var attr = this.attr,
                $product_item = $item.parents(attr.product_selector),
                product_name = $product_item.attr('data-produto'),
                label = 'interacao | back | ' + product_name + ' | ' + $.trim($item.text());
            this.register_event('item', label, 0, true);
        },
        destroy: function() {
            var dom = this.dom;
            var event_namespace = this.attr.event_namespace;
            dom.$menu_button.off(event_namespace);
            dom.$menu_root.off(event_namespace);
        }
    };
    if (!global.glb) {
        global.glb = {};
    }
    global.glb.MenuWebTracker = MenuWebTracker;
})(this);
(function(global) {
    'use strict';
    try {
        new CustomEvent('test');
    } catch (e) {
        var CE = function(event, params) {
            var evt;
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };
        CE.prototype = window.Event.prototype;
        window.CustomEvent = CE;
    }
    var getStyle = function(el, styleProp) {
        var defaultView;
        if (typeof el === 'undefined' || el === null) {
            return null;
        }
        defaultView = el.ownerDocument.defaultView;
        if (defaultView && defaultView.getComputedStyle) {
            return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
        }
        return $(el).css(styleProp);
    };
    var $document = $(document),
        $html = $('html'),
        rAF = ModernizrWithPrefixed.prefixed('requestAnimationFrame', window) || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        },
        cAF = ModernizrWithPrefixed.prefixed('cancelAnimationFrame', window) || window.clearTimeout;
    var MenuWebCarousel = function() {
        var globoApiHostDefault;
        this.menuContainer = $('#menu-container');
        this.reguaContainer = $('#regua-navegacao');
        this.initCalled = false;
        this.animationCalled = true;
        this.rafScrolling = null;
        this.settings = window.REGUA_SETTINGS || {};
        globoApiHostDefault = 'http://c.api.globo.com';
        this.settings.globoapiHost = this.settings.globoapiHost || globoApiHostDefault;
        this.attr = {
            itemsCreated: false,
            menuPersonalized: false,
            globoapiHost: this.settings.globoapiHost,
            portals: {
                name: this.settings.portalName || '',
                all: this.settings.portalsList || [],
                links: this.settings.portalsLinkList || []
            },
            templates: {
                partial: $('#menu-dinamico-template').html(),
                items: $('#menu-rounder-template').html(),
                carousel: $('#menu-carousel-template').html(),
                custom: $('#menu-custom-template').html()
            },
            customItems: {
                ge: {
                    menu: '.menu-carousel-ge',
                    label: 'Escolha seu time',
                    labelSlug: 'escolha-seu-time',
                    link: '#',
                    rotaUrl: 'http://globoesporte.globo.com/mosaico/mosaico/49/50/29/mosaico.jsonp'
                }
            },
            animationEndEventNames: {
                'WebkitAnimation': 'webkitAnimationEnd',
                'MozAnimation': 'animationend',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            },
            lastTime: null,
            lastTimeUrl: null,
            timeCores: {
                'atlÃ©tico-mg': '000000',
                'atlÃ©tico-pr': 'a80000',
                'avaÃ­': '0099cc',
                'chapecoense': '177d49',
                'corinthians': '000000',
                'coritiba': '177d49',
                'cruzeiro': '0099cc',
                'figueirense': '000000',
                'flamengo': 'a80000',
                'fluminense': '177d49',
                'goiÃ¡s': '177d49',
                'grÃªmio': '0099cc',
                'internacional': 'a80000',
                'joinville': 'a80000',
                'palmeiras': '177d49',
                'ponte preta': '000000',
                'santos': '000000',
                'sÃ£o paulo': 'a80000',
                'sport': 'a80000',
                'vasco': '000000',
                'abc': '000000',
                'amÃ©rica-mg': '177d49',
                'atlÃ©tico-go': 'a80000',
                'bahia': '104175',
                'boa esporte': 'a80000',
                'botafogo': '000000',
                'bragantino': '000000',
                'cearÃ¡': '000000',
                'crb': 'a80000',
                'criciÃºma': '000000',
                'luverdense': '177d49',
                'macaÃ©': '0099cc',
                'mogi mirim': 'a80000',
                'nÃ¡utico': 'a80000',
                'oeste': 'a80000',
                'paranÃ¡': 'a80000',
                'paysandu': '0099cc',
                'sampaio': '177d49',
                'santa cruz': 'a80000',
                'vitÃ³ria': 'a80000',
                'arsenal': 'cc0000',
                'atlÃ©tico de madri': '171796',
                'barcelona': 'a40030',
                'bayern de munique': 'c0005b',
                'benfica': '000000',
                'borussia dortmund': '000000',
                'chelsea': '034694',
                'inter de milÃ£o': '0053a4',
                'juventus': '000000',
                'liverpool': 'cc0000',
                'manchester city': '5cbfeb',
                'manchester united': 'da020e',
                'milan': 'cc0000',
                'paris saint germain': '002561',
                'porto': '0059b1',
                'real madrid': 'ffffff',
                'roma': '7f0000',
                'shakhtar donetsk': 'ff532c',
                'tottenham': '000066',
                'valencia': 'f87100'
            }
        };
        this.attr.portals.len = this.attr.portals.all.length;
        this.createCarouselHtml();
        this.bind();
    };
    MenuWebCarousel.prototype.init = function() {
        if (this.initCalled) {
            return;
        }
        this.initCalled = true;
        this.onInitProcess = true;
        this.cacheVariables();
        this.refreshPositionOfMenuContainer();
        this.initSwiper();
        this.resetMenusLevel();
        this.resetMenuWebAnimation();
        this.bindAfterInit();
        this.createCarouselMenusItemsHtml();
        this.notifyReady();
    };
    MenuWebCarousel.prototype.restore = function() {
        this.carouselVisible = true;
        this.refreshMenuLinks();
        this.menuContainer.trigger('personalizeMenuRequest');
    };
    MenuWebCarousel.prototype.resetAction = function() {
        this.menuContainer.addClass('menu-no-animation');
        this.resetMenusLevel();
        this.resetMenuVerticalScroll();
        this.containerHeader.removeAttr('style');
        this.containerBody.removeAttr('style');
        this.menuContainer.removeClass('menu-no-animation');
    };
    MenuWebCarousel.prototype.reset = function() {
        this.carouselVisible = false;
        this.menuContainer.addClass('menu-invisible');
        this.resetAction();
        this.refresh();
        this.setHorizontalCarouselsToInitialPage();
        this.menuContainer.removeClass('menu-invisible');
    };
    MenuWebCarousel.prototype.isLowHeightDevice = function() {
        return window.innerHeight < 450;
    };
    MenuWebCarousel.prototype.isIos = function() {
        return /(iPad|iPhone|iPod)/g.test(window.navigator.userAgent);
    };
    MenuWebCarousel.prototype.isIphone4 = function() {
        var isIos;
        if (typeof window.isPortrait === 'undefined') {
            window.isPortrait = window.innerWidth <= window.innerHeight;
        }
        isIos = this.isIos();
        return isIos && (window.innerWidth === 320 && window.isPortrait || window.innerWidth === 480 && !window.isPortrait);
    };
    MenuWebCarousel.prototype.isIos7 = function() {
        return !!navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i);
    };
    MenuWebCarousel.prototype.isIos9 = function() {
        return !!navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 9_\d/i);
    };
    MenuWebCarousel.prototype.isAndroidBrowser = function() {
        var nua = navigator.userAgent;
        return ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && (nua.indexOf('Chrome') === -1));
    };
    MenuWebCarousel.prototype.isAndroidBrowserWebview = function() {
        var nua = navigator.userAgent;
        return (nua.indexOf('AndroidBrowserWebview') > -1);
    };
    MenuWebCarousel.prototype.capitalizeString = function(str) {
        return str[0].toUpperCase() + str.substring(1, str.length);
    };
    MenuWebCarousel.prototype.moveHighlightedItems = function(menuRoot) {
        if (menuRoot && menuRoot.length > 0) {
            menuRoot.children('.menu-item-highlighted').detach().slice(0, 3).prependTo(menuRoot);
        }
    };
    MenuWebCarousel.prototype.mergeBrokenColumns = function() {
        var $second_columns = this.menuElms.menuRoot.find('.menu-submenu-column-2');
        $second_columns.each(function() {
            var $second_column = $(this);
            var $children = $second_column.children().remove();
            var $first_column = $second_column.prev();
            $first_column.append($children);
        });
    };
    MenuWebCarousel.prototype.hideMenuAddon = function() {
        if (!this.menuElms.menuAddons) {
            this.menuElms.menuAddons = this.menuElms.menuRounder.find('.menu-addon');
        }
        this.menuElms.menuAddons.css('display', 'none');
    };
    MenuWebCarousel.prototype.removerAcentos = function(newStringComAcento) {
        var letra, expressaoRegular, string = newStringComAcento,
            mapaAcentosHex = {
                a: /[\xE0-\xE6]/g,
                e: /[\xE8-\xEB]/g,
                i: /[\xEC-\xEF]/g,
                o: /[\xF2-\xF6]/g,
                u: /[\xF9-\xFC]/g,
                c: /\xE7/g,
                n: /\xF1/g
            };
        for (letra in mapaAcentosHex) {
            expressaoRegular = mapaAcentosHex[letra];
            string = string.replace(expressaoRegular, letra);
        }
        return string;
    };
    MenuWebCarousel.prototype.slugify = function(text) {
        text = text.toString().toLowerCase().split(' ').join('-');
        return this.removerAcentos(text);
    };
    MenuWebCarousel.prototype.getMenuExtraContext = function(item, deepness) {
        var k, subitem;
        deepness = (typeof deepness !== 'undefined') ? deepness : 1;
        item.deepness = deepness;
        item.tituloSlug = this.slugify(item.titulo);
        item.hasSubmenuBroken = false;
        item.hasChildren = false;
        item.shouldBeLink = (item.link.trim() !== '') ? item : false;
        if (item.quebra) {
            item.quebra = {
                deepness: deepness
            };
        }
        if (item.children.length > 0) {
            item.shouldBeLink = false;
            item.hasChildren = item;
            for (k = 0; k < item.children.length; k++) {
                subitem = item.children[k];
                if (subitem.quebra) {
                    item.hasSubmenuBroken = true;
                }
                item.children[k] = this.getMenuExtraContext(subitem, deepness + 1);
            }
        }
        return item;
    };
    MenuWebCarousel.prototype.getPortalIndex = function(portal) {
        var i;
        for (i = 0; i < this.attr.portals.len; i++) {
            if (this.attr.portals.name[i] === portal) {
                return i;
            }
        }
        return -1;
    };
    MenuWebCarousel.prototype.getMenuHtml = function(portal, menuData, portalIndex) {
        var i, items = [],
            menu;
        portalIndex = (typeof portalIndex !== 'undefined') ? portalIndex : this.getPortalIndex(portal);
        if (menuData) {
            for (i = 0; i < menuData.length; i++) {
                items.push(this.getMenuExtraContext(menuData[i]));
            }
        } else {
            return null;
        }
        menu = Mustache.render(this.attr.templates.items, {
            index: portalIndex,
            items: items
        }, {
            recursive_partial: this.attr.templates.partial
        });
        menu = $(menu).find('.menu-root').html();
        return menu;
    };
    MenuWebCarousel.prototype.createCarouselHtml = function() {
        var i, menu, link, portal, carouselHtml, data = {
            portals: []
        };
        Mustache.parse(this.attr.templates.carousel);
        Mustache.parse(this.attr.templates.items);
        for (i = 0; i < this.attr.portals.len; i++) {
            portal = this.attr.portals.all[i];
            link = this.attr.portals.links[i];
            menu = Mustache.render(this.attr.templates.items, {
                index: i,
                items: []
            }, {
                recursive_partial: ''
            });
            data.portals.push({
                name: portal,
                menu: menu,
                link: link,
                index: i,
                active: (portal === this.attr.portals.name)
            });
        }
        carouselHtml = Mustache.render(this.attr.templates.carousel, data);
        this.menuContainer.html(carouselHtml);
    };
    MenuWebCarousel.prototype.sortDataMenuIndex = function() {
        var i, itemHeader, itemBody;
        for (i = 0; i < this.attr.portals.len; i++) {
            itemHeader = this.currentItemsHeader.eq(i);
            itemBody = this.currentItemsBody.eq(i);
            if (itemHeader && itemHeader.length > 0) {
                itemHeader.find('.menu-carousel-link').attr('data-index', i);
            }
            if (itemBody && itemBody.length > 0) {
                itemBody.find('.menu-cascade').attr('data-menu-index', i);
            }
        }
    };
    MenuWebCarousel.prototype.carouselItemsCreated = function() {
        var i, portal, menuRoot;
        for (i = 0; i < this.attr.portals.len; i++) {
            portal = this.attr.portals.all[i];
            menuRoot = this.menuElms.menuRoot.eq(i);
            this.moveHighlightedItems(menuRoot);
        }
        this.mergeBrokenColumns();
        this.hideMenuAddon();
        this.attr.itemsCreated = true;
        if (this.attr.menuRemoved) {
            this.refreshMenuDataAfterRemovals();
        }
        this.reset();
        if (this.detections.isAndroidBrowserWebview) {
            this.menuElms.menuArrowNavegacaoIcon = this.containerBody.find('.menu-item-arrow .regua-navegacao-icon');
            this.menuElms.menuArrowNavegacaoIcon.replaceWith('<svg class="regua-navegacao-icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#regua-arrow"></use></svg>');
        }
        this.personalizeMenu();
        this.onInitProcess = false;
    };
    MenuWebCarousel.prototype.refreshMenuDataAfterRemovals = function() {
        var forceUpdate = true;
        this.cacheCarouselItemsVariables(forceUpdate);
        this.cacheMenuElmsVariables(forceUpdate);
        this.sortDataMenuIndex();
        this.menuWeb.cache_dom();
        this.menuWeb.attrPerMenu = [];
        this.menuWeb.init_deepness();
    };
    MenuWebCarousel.prototype.createCarouselMenusItemsHtml = function() {
        var i, portal, menu, menuRoot, that = this;
        if (this.attr.itemsCreated) {
            return;
        }
        jqueryAjaxCache.getJSON(this.attr.globoapiHost + '/menus/all.jsonp', function(menusData) {
            that.attr.menuRemoved = false;
            for (i = 0; i < that.attr.portals.len; i++) {
                portal = that.attr.portals.all[i];
                menu = that.getMenuHtml(portal, menusData[portal], i);
                menuRoot = that.menuElms.menuRoot.eq(i);
                if (menu) {
                    menuRoot.html(menu);
                } else {
                    that.currentItemsHeader.filter('[data-produto="' + portal + '"]').remove();
                    that.currentItemsBody.filter('[data-produto="' + portal + '"]').remove();
                    that.attr.menuRemoved = true;
                }
            }
            that.carouselItemsCreated();
        });
    };
    MenuWebCarousel.prototype.cacheCarouselItemsVariablesWithSuffix = function(suffix, forceUpdate) {
        var capitalizedSuffix, container, currentItems, screenWidth;
        forceUpdate = (typeof forceUpdate !== 'undefined' && forceUpdate);
        capitalizedSuffix = this.capitalizeString(suffix);
        container = (!forceUpdate && this['container' + capitalizedSuffix]) || $('#menu-carousel-' + suffix);
        currentItems = (!forceUpdate && this['currentItems' + capitalizedSuffix]) || container.find('.menu-carousel-item');
        screenWidth = (!forceUpdate && this['screenWidth' + capitalizedSuffix]) || container.outerWidth(false);
        this['screenCenter' + capitalizedSuffix] = screenWidth / 2;
        this['itemWidth' + capitalizedSuffix] = currentItems.first().outerWidth(false);
        this['container' + capitalizedSuffix] = container;
        this['currentItems' + capitalizedSuffix] = currentItems;
        if (suffix === 'header' && !this.currentLinksHeader) {
            this.currentLinksHeader = currentItems.find('.menu-carousel-link');
            this.currentLinksHeaderFirst = this.currentLinksHeader.first();
            this.currentLinksShadowHeader = currentItems.find('.menu-carousel-link-shadow');
            this.currentLinksShadowHeaderFirst = this.currentLinksShadowHeader.first();
        }
    };
    MenuWebCarousel.prototype.cacheCarouselItemsVariables = function(forceUpdate) {
        this.cacheCarouselItemsVariablesWithSuffix('header', forceUpdate);
        this.cacheCarouselItemsVariablesWithSuffix('body', forceUpdate);
    };
    MenuWebCarousel.prototype.refreshPositionOfMenuContainer = function() {
        if (this.detections.isIos9) {
            $html.addClass('is-ios9');
        }
    };
    MenuWebCarousel.prototype.cacheMenuElmsVariables = function(forceUpdate) {
        forceUpdate = (typeof forceUpdate !== 'undefined' && forceUpdate);
        this.menuElms = this.menuElms || {};
        this.menuElms.menuRounder = (!forceUpdate && this.menuElms.menuRounder) || this.menuContainer.find('.menu-rounder');
        this.menuElms.menuCascade = (!forceUpdate && this.menuElms.menuCascade) || this.menuContainer.find('.menu-cascade');
        this.menuElms.menuRoot = (!forceUpdate && this.menuElms.menuRoot) || this.menuContainer.find('.menu-root:not(.mosaic-states-list)');
        this.menuElms.menuSizesInfo = (!forceUpdate && this.menuElms.menuSizesInfo) || $('#menu-carousel-header-sizes-infos')[0];
        this.menuElms.menuVerticalScroll = (!forceUpdate && this.menuElms.menuVerticalScroll) || this.menuElms.menuRoot.find('.menu-submenu-vertical-scroll');
        this.menuElms.menuItemsHighlighted = null;
        this.menuElms.count = this.menuElms.menuCascade.length;
    };
    MenuWebCarousel.prototype.cacheVariables = function(forceUpdate) {
        this.currentLinksHeader = null;
        this.cacheCarouselItemsVariables(forceUpdate);
        this.cacheMenuElmsVariables(forceUpdate);
        this.swiperHeader = null;
        this.swiperBody = null;
        this.scrollInfo = {
            resize: false,
            transitionAnimationTime: 100,
            initialActivePage: {
                header: this.currentItemsHeader.index(this.currentItemsHeader.filter('.menu-carousel-item-active')),
                body: this.currentItemsBody.index(this.currentItemsBody.filter('.menu-carousel-item-active'))
            },
            thresholdX: 5,
            thresholdY: 5,
            swiperMoving: false,
            lastTimeLinkClicked: null,
            snapSpeed: 300,
            resetTimeout: 500,
            spaceBetween: 0,
            defaultSpaceBetween: 0,
            maxScale: 1,
            defaultScaleMinHeader: 0.72,
            scaleMinHeader: 0.72,
            scaleMaxHeader: 1,
            lastScale: null,
            defaultDurationPercentage: 0.3,
            scaleSpeed: 0,
            initialScaleHeaderPerc: 1,
            scaleHeaderPerc: 1,
            scaleDeltaY: 75,
            dropShadowMaxRange: 20,
            propDeltaY: 1.72
        };
        this.scrollInfo.scaleMaxBody = 1 - this.scrollInfo.scaleMinHeader;
        this.previousMenuLevel = 0;
        this.menuLevel = 0;
        this.elmsHeights = {};
        this.menusLevel = {};
        this.direction = null;
        this.animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
        this.styleProps = {
            transitionDuration: ModernizrWithPrefixed.prefixed('transitionDuration'),
            transform: ModernizrWithPrefixed.prefixed('transform'),
            boxShadow: ModernizrWithPrefixed.prefixed('boxShadow')
        };
        this.detections = {
            isIos: this.isIos(),
            isAndroidBrowser: this.isAndroidBrowser(),
            isAndroidBrowserWebview: this.isAndroidBrowserWebview(),
            isIos7: this.isIos7(),
            isIos9: this.isIos9(),
            isIphone4: this.isIphone4(),
            isLowHeightDevice: this.isLowHeightDevice()
        };
    };
    MenuWebCarousel.prototype.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    };
    MenuWebCarousel.prototype.refresh = function() {
        if (this.scrollInfo.resize || this.onInitProcess) {
            this.refreshBrandsSpaces();
            this.cacheCarouselItemsVariables();
            this.refreshHeights();
            this.refreshCurrentHeaderScale(0);
            this.refreshHorizontalCarousels();
        }
    };
    MenuWebCarousel.prototype.injectExtraWidth = function(container) {
        var menuBrand = container.find('.menu-brands').first(),
            width = parseInt(menuBrand.css('width'), 10);
        width += 5;
        menuBrand.css('width', width);
    };
    MenuWebCarousel.prototype.refreshHorizontalCarousels = function() {
        var that = this;
        if (this.swiperHeader !== null) {
            this.swiperHeader.update();
        }
        if (this.swiperBody !== null) {
            this.swiperBody.update();
        }
        setTimeout(function() {
            if (that.detections.isAndroidBrowserWebview) {
                that.injectExtraWidth(that.containerHeader);
                that.injectExtraWidth(that.containerBody);
            }
        }, 500);
    };
    MenuWebCarousel.prototype.setHorizontalCarouselsToPage = function(page, delay) {
        delay = delay || 0;
        this.swiperHeader.slideTo(page, delay);
        this.swiperBody.slideTo(page, delay);
    };
    MenuWebCarousel.prototype.setHorizontalCarouselsToInitialPage = function(delay) {
        this.setHorizontalCarouselsToPage(this.scrollInfo.initialActivePage.header, delay);
    };
    MenuWebCarousel.prototype.setHorizontalCarouselsToCurrentPage = function(delay) {
        this.setHorizontalCarouselsToPage(this.swiperHeader.activeIndex, delay);
    };
    MenuWebCarousel.prototype.notifyReady = function() {
        document.dispatchEvent(new CustomEvent('glb.menu-carousel.ready'));
        $document.trigger('glb.menu-carousel.ready');
    };
    MenuWebCarousel.prototype.slideToHeaderLink = function(menuLink) {
        var page, menuCarouselItem, productName, activePage = this.swiperBody.activeIndex,
            currentTimeLinkClicked = new Date();
        page = parseInt(menuLink.attr('data-index'), 10);
        menuCarouselItem = menuLink.parents('.menu-carousel-item');
        productName = menuCarouselItem.attr('data-produto');
        if (page === activePage && !this.scrollInfo.swiperMoving) {
            $document.trigger('glb.menu.marca_click', [productName]);
            window.location.href = menuLink.attr('href');
            return true;
        }
        this.setHorizontalCarouselsToPage(page, this.scrollInfo.snapSpeed);
        $document.trigger('glb.menu.marca_navigation', [productName]);
        this.scrollInfo.lastTimeLinkClicked = currentTimeLinkClicked;
        return false;
    };
    MenuWebCarousel.prototype.resetMenusActive = function() {
        this.menuElms.menuRoot.find('.is-activated.menu-item').removeClass('is-activated');
    };
    MenuWebCarousel.prototype.resetMenusLevel = function() {
        var menuIndex, page, menuCascade, menuRoot, removeClassByRegex = function(index, css) {
            return (css.match(/\bmenu-level-\d+/g) || []).join(' ');
        };
        for (page = 0; page < this.menuElms.count; page++) {
            menuCascade = this.menuElms.menuCascade.eq(page);
            menuRoot = this.menuElms.menuRoot.eq(page);
            this.menusLevel[page] = 0;
            menuRoot.removeClass(removeClassByRegex).addClass('menu-level-0');
            menuIndex = parseInt(menuCascade.attr('data-menu-index'), 10);
            this.menuWeb.move_to_level(0, menuIndex, false);
        }
    };
    MenuWebCarousel.prototype.resetMenuWebAnimation = function() {
        this.menuWeb.attr.menu_animation_duration = 0;
    };
    MenuWebCarousel.prototype.getFromActiveSubmenu = function(sel) {
        var page = this.swiperBody.activeIndex,
            level = this.menuLevel,
            menuRoot = this.menuElms.menuRoot.eq(page);
        return menuRoot.find('.is-activated.menu-item > .menu-submenu-level' + level + ' > ' + sel);
    };
    MenuWebCarousel.prototype.refreshMenuLevel = function(deepness) {
        var that = this,
            page = this.swiperHeader.activeIndex,
            menuRoot = this.menuElms.menuRoot.eq(this.swiperBody.activeIndex),
            forceRefreshOnAndroidBrowser = function(menuRoot) {
                if (that.detections.isAndroidBrowserWebview) {
                    that.forceRepainting(menuRoot);
                }
            };
        if (typeof deepness === 'undefined') {
            this.menuLevel = this.menusLevel[page];
            return;
        }
        this.previousMenuLevel = this.menusLevel[page] || 0;
        this.menuLevel = this.menusLevel[page] = deepness || 0;
        if (this.menuLevel === 0 && this.previousMenuLevel > 0) {
            setTimeout(function() {
                menuRoot.addClass('menu-level-' + that.menuLevel);
                forceRefreshOnAndroidBrowser(menuRoot);
            }, this.scrollInfo.transitionAnimationTime);
        } else {
            menuRoot.addClass('menu-level-' + this.menuLevel);
            forceRefreshOnAndroidBrowser(menuRoot);
        }
        if (this.menuLevel !== 0 || this.previousMenuLevel !== 0) {
            if (this.previousMenuLevel === 0 && this.menuLevel > 0) {
                setTimeout(function() {
                    menuRoot.removeClass('menu-level-' + that.previousMenuLevel);
                    forceRefreshOnAndroidBrowser(menuRoot);
                }, this.scrollInfo.transitionAnimationTime);
            } else {
                menuRoot.removeClass('menu-level-' + this.previousMenuLevel);
                forceRefreshOnAndroidBrowser(menuRoot);
            }
        }
    };
    MenuWebCarousel.prototype.resetMenuVerticalScroll = function() {
        this.menuElms.menuRoot.scrollTop(0);
        this.menuElms.menuVerticalScroll.scrollTop(0);
    };
    MenuWebCarousel.prototype.forceRepainting = function($elm) {
        $elm.hide().show(0);
        setTimeout(function() {
            $elm.css({
                'overflow': '',
                'display': ''
            });
        });
    };
    MenuWebCarousel.prototype.refreshMenuLinks = function() {
        this.forceRepainting(this.currentLinksHeaderFirst);
        this.forceRepainting(this.currentLinksShadowHeaderFirst);
    };
    MenuWebCarousel.prototype.refreshMenuVerticalScroll = function(nextMenuLevel) {
        if (this.menuLevel > nextMenuLevel) {
            this.getFromActiveSubmenu('.menu-submenu-vertical-scroll').scrollTop(0);
        }
    };
    MenuWebCarousel.prototype.verticalScrollTouchStartEvent = function(e) {
        var page = this.swiperHeader.activeIndex,
            menuElmScroll;
        if (this.menuLevel === 0) {
            menuElmScroll = this.menuElms.menuRoot.eq(page);
        } else {
            menuElmScroll = this.getFromActiveSubmenu('.menu-submenu-vertical-scroll').last();
        }
        this.scrollInfo.initialScrollPage = page;
        this.scrollInfo.initialElmScroll = menuElmScroll;
        this.scrollInfo.initialScrollTop = menuElmScroll.scrollTop();
        this.scrollInfo.initialPageX = e.originalEvent.touches[0].pageX;
        this.scrollInfo.initialPageY = e.originalEvent.touches[0].pageY;
        this.scrollInfo.initialScaleHeaderPerc = this.scrollInfo.scaleHeaderPerc;
        this.scrollInfo.initialScaleHeaderPerc = this.scrollInfo.scaleHeaderPerc;
        this.scrollInfo.headerScaleActive = false;
    };
    MenuWebCarousel.prototype.getMaxScroll = function(elm) {
        var scrollHeight = (typeof elm.prop !== 'undefined' && elm.prop) ? elm.prop('scrollHeight') : elm.attr('scrollHeight'),
            elmHeight = elm.outerHeight(true);
        return scrollHeight - elmHeight;
    };
    MenuWebCarousel.prototype.verticalScrollTouchMoveEvent = function(e) {
        var pageX = e.originalEvent.touches[0].pageX,
            pageY = e.originalEvent.touches[0].pageY,
            menuElmScroll = this.scrollInfo.initialElmScroll,
            scrollY = menuElmScroll.scrollTop(),
            deltaX = this.scrollInfo.initialPageX - pageX,
            deltaY = this.scrollInfo.initialPageY - pageY,
            deltaScrollY = scrollY - this.scrollInfo.initialScrollTop,
            absDeltaX = Math.abs(deltaX),
            absDeltaY = Math.abs(deltaY),
            maxScrollY = this.getMaxScroll(menuElmScroll);
        if (absDeltaY < this.scrollInfo.propDeltaY * absDeltaX || absDeltaY <= this.scrollInfo.thresholdY) {
            return true;
        }
        if (deltaY !== 0 && (scrollY === maxScrollY && deltaY > 0 || scrollY === 0 && deltaY < 0) && deltaScrollY === 0) {
            this.refreshCurrentHeaderScale(deltaY);
        }
        if (!this.scrollInfo.headerScaleActive) {
            this.scrollInfo.headerScaleActive = true;
            this.stepAnimation(this.stepHeaderScale, []);
        }
    };
    MenuWebCarousel.prototype.verticalScrollTouchEndEvent = function() {
        var that = this;
        that.scrollInfo.headerScaleActive = false;
        setTimeout(function() {
            that.cancelLastAnimation();
        }, 100);
    };
    MenuWebCarousel.prototype.stepHeaderScale = function() {
        var menuElmScroll = this.scrollInfo.initialElmScroll,
            pageY = menuElmScroll.scrollTop(),
            deltaY = pageY - this.scrollInfo.initialScrollTop;
        if (deltaY !== 0) {
            this.refreshCurrentHeaderScale(deltaY);
        }
    };
    MenuWebCarousel.prototype.refreshCurrentHeaderScale = function(deltaY) {
        var newPerc, percTop, top, deltaYPerc, diffScale = this.scrollInfo.scaleMaxHeader - this.scrollInfo.scaleMinHeader,
            initialPerc = this.scrollInfo.initialScaleHeaderPerc,
            duration;
        deltaYPerc = Math.abs(deltaY / this.scrollInfo.scaleDeltaY);
        if (deltaYPerc > 1) {
            deltaYPerc = 1;
        }
        deltaYPerc = deltaYPerc * diffScale;
        newPerc = (deltaY > 0) ? initialPerc - deltaYPerc : initialPerc + deltaYPerc;
        if (newPerc < this.scrollInfo.scaleMinHeader || this.scrollInfo.forceMinHeader) {
            newPerc = this.scrollInfo.scaleMinHeader;
        } else if (newPerc > this.scrollInfo.scaleMaxHeader) {
            newPerc = this.scrollInfo.scaleMaxHeader;
        }
        percTop = 1 - newPerc;
        top = this.scrollInfo.topMaxBody * percTop / this.scrollInfo.scaleMaxBody;
        duration = this.scrollInfo.scaleSpeed;
        this.scale3d(this.containerHeader[0], newPerc, duration);
        this.translateTop(this.containerBody[0], -top, duration);
        this.scrollInfo.scaleHeaderPerc = newPerc;
    };
    MenuWebCarousel.prototype.refreshHeights = function() {
        this.elmsHeights.reguaContainer = this.reguaContainer.outerHeight(false);
        this.elmsHeights.menuContainer = this.menuContainer.outerHeight(false);
        this.elmsHeights.menuHeader = this.containerHeader.outerHeight(false);
        this.elmsHeights.menuBody = this.elmsHeights.menuContainer - this.elmsHeights.menuHeader;
        this.scrollInfo.topMaxBody = this.scrollInfo.scaleMaxBody * this.elmsHeights.menuHeader;
    };
    MenuWebCarousel.prototype.initSwiper = function() {
        var that = this,
            currentTranslate, deltaX, absDeltaX, swiperOptions = {
                initialSlide: this.scrollInfo.initialActivePage.header,
                runCallbacksOnInit: false,
                resistance: true,
                resistanceRatio: 0,
                threshold: 0,
                spaceBetween: this.scrollInfo.spaceBetween,
                setWrapperSize: true,
                slideActiveClass: 'menu-carousel-item-active',
                centeredSlides: true,
                speed: that.scrollInfo.snapSpeed,
                longSwipesMs: that.scrollInfo.snapSpeed,
                onTouchStart: function(swiper) {
                    that.scrollInfo.initialSwiperTranslation = swiper.translate;
                },
                onSliderMove: function(swiper) {
                    currentTranslate = swiper.translate;
                    deltaX = that.scrollInfo.initialSwiperTranslation - currentTranslate;
                    absDeltaX = Math.abs(deltaX);
                    if (absDeltaX > that.scrollInfo.thresholdX && !that.scrollInfo.swiperMoving) {
                        that.scrollInfo.swiperMoving = true;
                        that.scrollInfo.startPosition = swiper.activeIndex;
                        that.swiperHeader.container.addClass('swiper-moving');
                    }
                },
                onTouchEnd: function() {
                    that.swiperHeader.container.removeClass('swiper-moving');
                },
                onSlideChangeStart: function() {
                    that.swiperHeader.container.removeClass('swiper-moving');
                },
                onSlideChangeEnd: function(swiper) {
                    that.scrollInfo.endPosition = swiper.activeIndex;
                    if (that.scrollInfo.swiperMoving) {
                        if (that.scrollInfo.endPosition > that.scrollInfo.startPosition) {
                            $document.trigger('glb.menu.swipe', ['direita']);
                        } else if (that.scrollInfo.endPosition < that.scrollInfo.startPosition) {
                            $document.trigger('glb.menu.swipe', ['esquerda']);
                        }
                    }
                    that.scrollInfo.swiperMoving = false;
                    that.swiperHeader.container.removeClass('swiper-moving');
                }
            };
        this.swiperHeader = new Swiper(this.containerHeader[0], $.extend({
            slidesPerView: 'auto'
        }, swiperOptions));
        this.swiperBody = new Swiper(this.containerBody[0], $.extend({
            slidesPerView: 1,
            control: this.swiperHeader,
            onSlideChangeEnd: function() {
                that.refreshMenuLevel();
            }
        }, swiperOptions));
        this.swiperHeader.params.control = this.swiperBody;
    };
    MenuWebCarousel.prototype.transitionDuration = function(el, duration) {
        if (typeof duration !== 'undefined' && duration !== null) {
            el.style[this.styleProps.transitionDuration] = duration + 'ms';
        }
    };
    MenuWebCarousel.prototype.transform = function(el, op, duration) {
        if (!el) {
            return;
        }
        this.transitionDuration(el, duration);
        el.style[this.styleProps.transform] = op;
    };
    MenuWebCarousel.prototype.boxShadow = function(el, range, duration) {
        if (!el) {
            return;
        }
        this.transitionDuration(el, duration);
        el.style[this.styleProps.boxShadow] = 'rgba(0, 0, 0, 0.1) 0 ' + range + 'px ' + range + 'px';
    };
    MenuWebCarousel.prototype.scale3d = function(el, scale, duration) {
        this.transform(el, 'scale3d(' + scale + ', ' + scale + ', 1)', duration);
    };
    MenuWebCarousel.prototype.translate3d = function(el, x, y, duration) {
        this.transform(el, 'translate3d(' + x + 'px, ' + y + 'px, 0)', duration);
    };
    MenuWebCarousel.prototype.translateTop = function(el, top, duration) {
        this.translate3d(el, 0, parseInt(top, 10), duration);
    };
    MenuWebCarousel.prototype.stepAnimation = function(callback, params) {
        var that = this;
        callback.apply(this, params);
        if (this.rafScrolling) {
            cAF(this.rafScrolling);
        }
        this.rafScrolling = rAF(function() {
            that.stepAnimation(callback, params);
        });
    };
    MenuWebCarousel.prototype.cancelLastAnimation = function() {
        if (this.rafScrolling) {
            cAF(this.rafScrolling);
            return true;
        }
        return false;
    };
    MenuWebCarousel.prototype.refreshSubmenuClass = function() {
        if (this.menuLevel !== 0) {
            this.containerBody.addClass('is-carousel-submenu-active');
        } else {
            this.containerBody.removeClass('is-carousel-submenu-active');
        }
    };
    MenuWebCarousel.prototype.refreshBrandsSpaces = function() {
        this.scrollInfo.spaceBetween = parseInt(getStyle(this.menuElms.menuSizesInfo, 'padding'), 10);
        this.scrollInfo.scaleMinHeader = parseFloat(getStyle(this.menuElms.menuSizesInfo, 'opacity'), 10);
        if (isNaN(this.scrollInfo.spaceBetween)) {
            this.scrollInfo.spaceBetween = this.scrollInfo.defaultSpaceBetween;
        }
        if (isNaN(this.scrollInfo.scaleMinHeader)) {
            this.scrollInfo.scaleMinHeader = this.scrollInfo.defaultScaleMinHeader;
        }
        this.scrollInfo.forceMinHeader = parseInt(getStyle(this.menuElms.menuSizesInfo, 'margin'), 10);
        this.scrollInfo.forceMinHeader = (this.scrollInfo.forceMinHeader === 1);
        this.scrollInfo.forceMinHeader = this.scrollInfo.forceMinHeader || this.isLowHeightDevice();
        if (this.scrollInfo.spaceBetween < 0) {
            this.scrollInfo.spaceBetween = 0;
        }
        this.swiperHeader.params.spaceBetween = this.scrollInfo.spaceBetween;
    };
    MenuWebCarousel.prototype.bindAfterInit = function() {
        var that = this;
        $(window).on('resize', this.debounce(function() {
            that.scrollInfo.resize = true;
            if (that.carouselVisible) {
                that.resetAction();
                that.menuContainer.addClass('menu-no-animation');
                that.refresh();
                that.menuContainer.removeClass('menu-no-animation');
                that.setHorizontalCarouselsToCurrentPage();
            } else {
                that.reset();
            }
            setTimeout(function() {
                that.resetMenusActive();
            }, that.scrollInfo.transitionAnimationTime);
            that.scrollInfo.resize = false;
        }, 250));
        this.currentLinksHeader.bind('tap', function() {
            return that.slideToHeaderLink($(this));
        });
        this.menuElms.menuCascade.on('touchstart', function(e) {
            that.verticalScrollTouchStartEvent(e);
        });
        this.menuElms.menuCascade.on('touchmove', function(e) {
            that.verticalScrollTouchMoveEvent(e);
        });
        this.menuElms.menuCascade.on('touchend', function(e) {
            that.verticalScrollTouchEndEvent(e);
        });
    };
    MenuWebCarousel.prototype.bind = function() {
        var that = this;
        this.menuContainer.on('menu_ready', function(e, menuWeb) {
            that.menuWeb = menuWeb;
            that.init();
        });
        this.menuContainer.on('menu_shown', function() {
            document.dispatchEvent(new CustomEvent('glb.menu-carousel.shown.before'));
            that.restore();
            document.dispatchEvent(new CustomEvent('glb.menu-carousel.shown.after'));
        });
        this.menuContainer.on('menu_off', function() {
            document.dispatchEvent(new CustomEvent('glb.menu-carousel.off.before'));
            setTimeout(function() {
                that.reset();
                document.dispatchEvent(new CustomEvent('glb.menu-carousel.off.after'));
            }, that.scrollInfo.resetTimeout);
        });
        this.menuContainer.on('menu_pre_move', function(e, deepness) {
            that.refreshMenuVerticalScroll(deepness);
        });
        this.menuContainer.on('menu_moved', function(e, deepness) {
            that.refreshMenuLevel(deepness);
            that.refreshSubmenuClass();
        });
    };
    MenuWebCarousel.prototype._bindClickAbas = function(that) {
        var self = $(that.target),
            $abas = self.closest('.gui-abas-wrapper'),
            pos = $abas.find('.gui-abas-item').index(self);
        $abas.find('.ativo').removeClass('ativo');
        self.addClass('ativo');
        $abas.find('.gui-abas-content').eq(pos).addClass('ativo');
    };
    MenuWebCarousel.prototype._initAbas = function() {
        var self = this,
            _bindClickAbasProxy = function(that) {
                self._bindClickAbas(that);
            };
        this.menuElms.timesPersonalizadoAbasItem.on('click', _bindClickAbasProxy);
        this.menuElms.timesNavegacionalAbasItem.on('click', _bindClickAbasProxy);
        this._bindEscudos();
    };
    MenuWebCarousel.prototype._getTimeUrlUsingTimeName = function(time) {
        var i, escudo, timeUrl = null;
        if (typeof this.menuElms.timesPersonalizadoEscudos !== 'undefined' && this.menuElms.timesPersonalizadoEscudos) {
            for (i = 0; i < this.menuElms.timesPersonalizadoEscudos.length; i++) {
                escudo = this.menuElms.timesPersonalizadoEscudos[i];
                if (escudo.title.toLowerCase() === time) {
                    timeUrl = escudo.href;
                    break;
                }
            }
        }
        return timeUrl;
    };
    MenuWebCarousel.prototype._trocarTimeSelecionado = function(time, timeUrl) {
        this.attr.lastTime = time;
        this.attr.lastTimeUrl = timeUrl;
        if (typeof this.menuElms.menuTrocarLabel !== 'undefined' && this.menuElms.menuTrocarLabel !== null) {
            this.menuElms.menuTrocarLabel.remove();
        }
        if (typeof time !== 'undefined' && time !== null) {
            time = time.toLowerCase();
            if (typeof timeUrl === 'undefined' || timeUrl === null) {
                timeUrl = this._getTimeUrlUsingTimeName(time);
            }
            if (typeof timeUrl !== 'undefined' && timeUrl !== null) {
                this.menuElms.menuTrocarLabel = $('<a style="color:#' + this.attr.timeCores[time] + '" class="menu-item menu-time-escolhido" href="' + timeUrl + '">' + time + '</a>');
                this.menuElms.timesPersonalizadoItem.before(this.menuElms.menuTrocarLabel);
                if (typeof this.menuElms.menuTrocarLink === 'undefined' || this.menuElms.menuTrocarLink === null) {
                    this.menuElms.timesPersonalizadoItem.addClass('menu-item-escolha-seu-time');
                    this.menuElms.menuTrocarLink = this.menuElms.timesPersonalizadoItem.find('.menu-item-link').addClass('menu-trocar-link');
                    this.menuElms.menuTrocarTitle = this.menuElms.timesPersonalizadoItem.find('.menu-item-title').text('trocar').addClass('menu-time-trocar');
                    this._bindTrocar(this.menuElms.menuTrocarLink, this.menuElms.menuTrocarLabel);
                }
            }
        }
    };
    MenuWebCarousel.prototype._recuperaTime = function() {
        var that = this;
        $.ajax({
            type: 'GET',
            url: 'http://cocoon.globo.com/preferences/esportes?callback=equipe',
            cache: true,
            jsonpCallback: 'equipe',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(data) {
                that._trocarTimeSelecionado(data.time, data.time_url);
            },
            error: function() {
                console.error('NÃ£o foi possÃ­vel obter o seu time.');
            }
        });
    };
    MenuWebCarousel.prototype._bindTrocar = function(menuTrocarLink, menuTrocarLabel) {
        menuTrocarLink.off().on('click', function() {
            $document.trigger('glb.menu.personalizacao', ['ge', 'times', menuTrocarLink.text().trim()]);
        });
        menuTrocarLabel.off().on('click', function() {
            $document.trigger('glb.menu.item-personalizado', ['ge', menuTrocarLabel.text().trim()]);
        });
    };
    MenuWebCarousel.prototype._bindEscudos = function() {
        var time, timeUrl, self = this;
        this.menuElms.timesPersonalizadoEscudos.on('click', function(e) {
            e.preventDefault();
            time = this.title;
            timeUrl = this.href;
            self._trocarTimeSelecionado(time, timeUrl);
            self._voltarAbaAposCliqueEmEscudo(this);
            self._saveTime(time, timeUrl);
        });
        this.menuElms.timesNavegacionalEscudos.on('click', function() {
            $document.trigger('glb.menu.navegacional', ['ge', 'times', this.title]);
        });
    };
    MenuWebCarousel.prototype._voltarAbaAposCliqueEmEscudo = function(escudo) {
        var menuSubmenu, menuItemBack;
        $document.trigger('glb.menu.personalizacao', ['ge', 'times', escudo.title]);
        menuSubmenu = $(escudo).parents('.menu-submenu');
        menuItemBack = menuSubmenu.find('.menu-item-back');
        menuItemBack.click();
    };
    MenuWebCarousel.prototype._saveTime = function(time, timeUrl) {
        var that = this;
        $.ajax({
            type: 'GET',
            url: 'http://cocoon.globo.com/preferences/esportes/time?value=' + time,
            cache: true,
            jsonpCallback: 'time',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function() {
                that._saveTimeUrl(timeUrl);
            },
            error: function() {
                console.error('NÃ£o foi possÃ­vel salvar o seu time');
            }
        });
    };
    MenuWebCarousel.prototype._saveTimeUrl = function(timeUrl) {
        $.ajax({
            type: 'GET',
            url: 'http://cocoon.globo.com/preferences/esportes/time_url?value=' + timeUrl,
            cache: true,
            jsonpCallback: 'time_url',
            contentType: 'application/json',
            dataType: 'jsonp',
            error: function() {
                console.error('NÃ£o foi possÃ­vel salvar a url do time');
            }
        });
    };
    MenuWebCarousel.prototype.includeComponents = function(label, labelSlug, rotaUrl) {
        var $containerPersonalizadoItem, $containerCustomItem, $containerTimes, $route = rotaUrl,
            $labelSlug = labelSlug,
            that = this;
        $containerPersonalizadoItem = $('#menu-1-' + labelSlug);
        $containerCustomItem = $containerPersonalizadoItem.find('.menu-submenu ul');
        if ($labelSlug === 'escolha-seu-time') {
            that.menuElms.timesPersonalizadoItem = $containerPersonalizadoItem;
            that.menuElms.timesNavegacionalItem = $('#menu-1-times');
            this._recuperaTime();
        }
        this.menuContainer.one('personalizeMenuRequest', function() {
            $.ajax({
                type: 'GET',
                url: $route,
                cache: true,
                jsonpCallback: 'data',
                contentType: 'application/json',
                dataType: 'jsonp',
                success: function(data) {
                    $containerCustomItem.html(data);
                    if ($labelSlug === 'escolha-seu-time') {
                        $containerTimes = that.menuElms.timesNavegacionalMosaicoContainer = that.menuElms.timesNavegacionalItem.find('.menu-submenu ul');
                        $containerTimes.html(data);
                        that.menuElms.timesPersonalizadoMosaicoContainer = $containerCustomItem;
                        that.menuElms.timesPersonalizadoAbasItem = that.menuElms.timesPersonalizadoItem.find('.gui-abas-item');
                        that.menuElms.timesPersonalizadoAbasItem.first().addClass('ativo');
                        that.menuElms.timesPersonalizadoAbasContent = that.menuElms.timesPersonalizadoItem.find('.gui-abas-content');
                        that.menuElms.timesPersonalizadoAbasContent.first().addClass('ativo');
                        that.menuElms.timesPersonalizadoEscudos = that.menuElms.timesPersonalizadoItem.find('.glb-ge-mosaico-list-item a');
                        that.menuElms.timesNavegacionalAbasItem = that.menuElms.timesNavegacionalItem.find('.gui-abas-item');
                        that.menuElms.timesNavegacionalAbasItem.first().addClass('ativo');
                        that.menuElms.timesNavegacionalAbasContent = that.menuElms.timesNavegacionalItem.find('.gui-abas-content');
                        that.menuElms.timesNavegacionalAbasContent.first().addClass('ativo');
                        that.menuElms.timesNavegacionalEscudos = that.menuElms.timesNavegacionalItem.find('.glb-ge-mosaico-list-item a');
                        that._initAbas();
                        that._trocarTimeSelecionado(that.attr.lastTime, that.attr.lastTimeUrl);
                    }
                },
                error: function(e) {
                    console.log(e.message);
                }
            });
        });
    };
    MenuWebCarousel.prototype.includeCustomItem = function(menu, label, labelSlug, mylink, rotaUrl) {
        var item = [{
            agrupador: false,
            children: [],
            deepness: 1,
            destacado: true,
            hasChildren: true,
            hasSubmenuBroken: false,
            link: mylink,
            quebra: false,
            separador: false,
            shouldBeLink: true,
            titulo: label,
            tituloSlug: labelSlug
        }];
        var customItem = Mustache.render(this.attr.templates.custom, {
            index: 0,
            items: item
        }, {
            recursive_partial: this.attr.templates.partial
        });
        $(menu).find('.menu-root').prepend(customItem);
        this.includeComponents(label, labelSlug, rotaUrl);
    };
    MenuWebCarousel.prototype.personalizeMenu = function() {
        var that = this;
        if (this.attr.menuPersonalized) {
            return;
        }
        this.attr.menuPersonalized = true;
        $.each(this.attr.customItems, function(ind, val) {
            that.includeCustomItem(val.menu, val.label, val.labelSlug, val.link, val.rotaUrl);
        });
    };
    if (!global.glb) {
        global.glb = {};
    }
    global.glb.MenuWebCarousel = MenuWebCarousel;
})(this);
(function(global) {
    'use strict';
    var MenuWebDesktop = function(options) {
        this.version = '3.5.2';
        this.attr = {
            hover_class: 'is-hovered',
            active_class: 'is-activated',
            father_class: 'is-father',
            floated_class: 'is-floated',
            ready_class: 'is-menu-ready',
            desktop_class: 'is-menu-desktop',
            column_break_class: 'menu-item-submenu-broken',
            item_selector: '.menu-item',
            link_selector: '.menu-item-link',
            title_selector: '.menu-item-title',
            menu_leave_timeout: 200,
            submenu_leave_timeout: 350,
            animation_duration: 300,
            submenu_with_break_aditional: 90,
            column_width: null,
            activation_stack: [],
            submenu_opened: null,
            $submenu_to_open: null,
            hover_item: null,
        };
        $.extend(this.attr, options);
        this.timers = {};
        this.cache_dom();
        this.move_markup();
        this.init_tracking();
        this.createProxies();
        this.listen_events();
        this.mark_as_ready();
    };
    MenuWebDesktop.prototype = {
        cache_dom: function() {
            var dom = {};
            dom.$window = $(window);
            dom.$document = $(document);
            dom.$html = $('html');
            dom.$body = $('body');
            dom.$menu_button = $('.menu-button');
            dom.$menu_container = $('#menu-container');
            dom.$previous_container_sibling = dom.$menu_container.prev();
            dom.$menu_cascade = dom.$menu_container.find('#menu-cascade');
            dom.$menu_addon = dom.$menu_container.find('#menu-addon');
            dom.$menu_root = dom.$menu_cascade.children('.menu-root');
            this.dom = dom;
        },
        move_markup: function() {
            var dom = this.dom;
            dom.$body.append(dom.$menu_container.detach());
        },
        init_tracking: function() {
            this.attr.tracking = new global.glb.MenuWebTracker(this.dom.$menu_root);
        },
        createProxies: function() {
            var proxies = {};
            var proxy_name;
            proxies.reveal_menu = $.proxy(this, 'reveal_menu');
            proxies.hide_menu = $.proxy(this, 'hide_menu');
            proxies.cancel_menu_leave_timeout = $.proxy(this, 'cancel_menu_leave_timeout');
            proxies.enter_item = $.proxy(this, 'enter_item');
            proxies.set_hover = $.proxy(this, 'set_hover');
            proxies.leave_item = $.proxy(this, 'leave_item');
            proxies.cancel_submenu_leave_timeout = $.proxy(this, 'cancel_submenu_leave_timeout');
            for (proxy_name in proxies) {
                if (proxies.hasOwnProperty(proxy_name)) {
                    this['prx_' + proxy_name] = proxies[proxy_name];
                }
            }
        },
        listen_events: function() {
            var dom = this.dom;
            var item_selector = this.attr.item_selector;
            dom.$document.on('header_fixed.menu_web', this.prx_hide_menu);
            dom.$menu_button.on('mouseenter.menu_web', this.prx_reveal_menu).on('mouseleave.menu_web', this.prx_hide_menu);
            dom.$menu_container.on('mouseenter.menu_web', this.prx_cancel_menu_leave_timeout).on('mouseleave.menu_web', this.prx_hide_menu);
            dom.$menu_addon.on('mouseenter.menu_web', this.prx_cancel_submenu_leave_timeout);
            dom.$menu_cascade.on('mouseover.menu_web', item_selector, this.prx_enter_item).on('mouseleave.menu_web', item_selector, this.prx_leave_item).find(item_selector).on('mouseenter.menu_web', this.prx_set_hover);
        },
        mark_as_ready: function() {
            var dom = this.dom;
            var attr = this.attr;
            var classes = attr.desktop_class + ' ' + attr.ready_class;
            dom.$html.addClass(classes);
            dom.$menu_container.trigger('menu_ready');
        },
        reveal_menu: function(event) {
            var $menu_button = $(event.target).closest('.menu-button');
            var menu_button_offset = $menu_button.offset();
            var top = menu_button_offset.top;
            var left = menu_button_offset.left;
            var height = $menu_button.height();
            var top_distance;
            var scroll;
            var dom = this.dom;
            var attr = this.attr;
            this.cancel_menu_leave_timeout();
            if ($menu_button.closest('.floating-bar')[0]) {
                scroll = dom.$window.scrollTop();
                top_distance = top - scroll + height + 20;
                dom.$menu_container.addClass(attr.floated_class);
            } else {
                top_distance = top + height + 24;
                dom.$menu_container.removeClass(attr.floated_class);
            }
            dom.$menu_container.css({
                'top': top_distance,
                'left': left - 14,
                'display': 'block'
            });
            this.measure_column_width();
            this.open_first_item();
            dom.$menu_container.trigger('menu_shown');
        },
        open_first_item: function() {
            var $first_menu_item_with_submenu = this.dom.$menu_root.children('.is-father').eq(0);
            var event = {};
            if ($first_menu_item_with_submenu.length > 0) {
                event.target = $first_menu_item_with_submenu[0];
                this.set_hover(event);
                this.enter_item(event);
            }
        },
        measure_column_width: function() {
            var attr = this.attr;
            var dom = this.dom;
            attr.column_width = dom.$menu_root.width();
            dom.$menu_cascade.width(attr.column_width);
            this.measure_column_width = $.noop;
        },
        hide_menu: function() {
            this.cancel_menu_leave_timeout();
            this.timers.menu_leave_timeout = this._late(function() {
                var attr = this.attr;
                this.dom.$menu_container.hide().trigger('menu_leave_timeout');
                attr.activation_stack = [];
                attr.submenu_opened = null;
                attr.$submenu_to_open = null;
                this.change_columns();
                this.timers.menu_leave_timeout = null;
                this._cancel_late(this.timers.submenu_leave_timeout);
                this._cancel_late(this.timers.submenu_closing_timeout);
                this.dom.$menu_root.find(attr.item_selector).filter('.' + attr.active_class + ', .' + attr.hover_class).removeClass(attr.active_class + ' ' + attr.hover_class);
            }, this.attr.menu_leave_timeout);
        },
        cancel_menu_leave_timeout: function() {
            this._cancel_late(this.timers.menu_leave_timeout);
            this.timers.menu_leave_timeout = null;
        },
        cancel_submenu_leave_timeout: function() {
            this._cancel_late(this.timers.submenu_leave_timeout);
            this._cancel_late(this.timers.submenu_closing_timeout);
        },
        set_hover: function(event) {
            var attr = this.attr;
            var $target = $(event.target);
            var $menu_item = $target.closest(attr.item_selector);
            var is_father = this._is_father($menu_item);
            var is_stack_head = this._is_stack_head($menu_item[0]);
            var has_submenu_opened_at_same_level;
            var has_submenu_opened_under;
            var is_in_broken_submenu;
            var submenu_opened_deepness;
            var menu_item_deepness;
            $menu_item.addClass(attr.hover_class);
            attr.hover_item = $menu_item[0];
            is_in_broken_submenu = $menu_item.parents('.' + attr.column_break_class).length > 0;
            if (is_father && !is_stack_head && !is_in_broken_submenu) {
                has_submenu_opened_at_same_level = attr.submenu_opened && $menu_item.siblings().filter(attr.submenu_opened).length > 0;
                submenu_opened_deepness = $(attr.submenu_opened).parents(attr.item_selector).length;
                menu_item_deepness = $menu_item.parents(attr.item_selector).length;
                has_submenu_opened_under = attr.submenu_opened && submenu_opened_deepness > menu_item_deepness;
                if (has_submenu_opened_at_same_level || has_submenu_opened_under) {
                    attr.$submenu_to_open = $menu_item;
                }
            } else {
                attr.$submenu_to_open = null;
            }
        },
        enter_item: function(event) {
            var attr = this.attr;
            var $stack_head = this._stack_head();
            var $target = $(event.target);
            var $menu_item = $target.closest(attr.item_selector);
            var $menu_item_parents = $menu_item.parents();
            var is_inside_submenu;
            var is_father = this._is_father($menu_item);
            var is_stack_head = this._is_stack_head($menu_item[0]);
            var has_submenu_opened_at_same_level;
            var has_submenu_opened_under;
            var is_in_broken_submenu;
            var submenu_opened_deepness;
            var menu_item_deepness;
            var is_already_opened;
            if ($stack_head) {
                is_inside_submenu = $menu_item_parents.filter($stack_head).length > 0;
                if (is_inside_submenu || is_stack_head) {
                    this._cancel_late(this.timers.submenu_leave_timeout);
                }
            }
            is_in_broken_submenu = $menu_item.parents('.' + attr.column_break_class).length > 0;
            is_already_opened = attr.submenu_opened && attr.submenu_opened[0] === $menu_item[0];
            if (is_father && !is_stack_head && !is_in_broken_submenu) {
                has_submenu_opened_at_same_level = attr.submenu_opened && $menu_item.siblings().filter(attr.submenu_opened).length > 0;
                submenu_opened_deepness = $(attr.submenu_opened).parents(attr.item_selector).length;
                menu_item_deepness = $menu_item.parents(attr.item_selector).length;
                has_submenu_opened_under = attr.submenu_opened && submenu_opened_deepness > menu_item_deepness;
                if (!has_submenu_opened_at_same_level && !has_submenu_opened_under) {
                    this._cancel_late(this.timers.submenu_closing_timeout);
                    this.activate_submenu($menu_item);
                }
            }
        },
        activate_submenu: function($menu_item) {
            var attr = this.attr;
            var aditional = 0;
            attr.$submenu_to_open = null;
            attr.submenu_opened = $menu_item[0];
            $menu_item.addClass(attr.active_class);
            if ($menu_item.hasClass(attr.column_break_class)) {
                aditional = attr.submenu_with_break_aditional;
            }
            attr.activation_stack.push($menu_item);
            this.change_columns(aditional);
        },
        leave_item: function(event) {
            var attr = this.attr;
            var $target = $(event.target);
            var $menu_item = $target.closest(attr.item_selector);
            var $submenu_to_open = attr.$submenu_to_open;
            var $menu_item_parents = $menu_item.parents();
            var $stack_head = this._stack_head();
            var is_submenu_to_open = ($submenu_to_open && $submenu_to_open[0] === $menu_item[0]);
            var is_father = this._is_father($menu_item);
            var is_inside_submenu;
            $menu_item.removeClass(attr.hover_class);
            attr.hover_item = null;
            if (is_father) {
                if (!is_submenu_to_open) {
                    this.deactivate_menu_item($menu_item);
                } else {
                    attr.$submenu_to_open = null;
                }
            } else {
                is_inside_submenu = ($stack_head && $menu_item_parents.filter($stack_head).length > 0);
                if (is_inside_submenu) {
                    this.deactivate_menu_item($menu_item);
                }
            }
        },
        deactivate_menu_item: function($menu_item) {
            var attr = this.attr;
            this._cancel_late(this.timers.submenu_leave_timeout);
            this.timers.submenu_leave_timeout = this._late(function() {
                var $stack_head = this._stack_head();
                var is_hovering_an_item = (attr.hover_item !== null);
                var is_going_up = false;
                var $items_to_deactivate = $menu_item;
                var is_going_down = false;
                var to_open_is_father;
                var to_open_is_inside_current_submenu;
                var hover_is_not_inside_stack_head;
                var i;
                var stack_item;
                if (is_hovering_an_item) {
                    hover_is_not_inside_stack_head = $(attr.hover_item).parents().filter($stack_head).length === 0;
                    if (hover_is_not_inside_stack_head) {
                        is_going_up = true;
                    }
                }
                if (attr.$submenu_to_open) {
                    to_open_is_father = attr.$submenu_to_open.hasClass(attr.father_class);
                    to_open_is_inside_current_submenu = (attr.$submenu_to_open.parents().filter($stack_head).length > 0);
                    if (to_open_is_father && to_open_is_inside_current_submenu) {
                        is_going_down = true;
                    }
                }
                if (is_going_down) {
                    this.activate_submenu(attr.$submenu_to_open);
                    return;
                }
                if (is_going_up) {
                    $items_to_deactivate = $();
                    for (i = attr.activation_stack.length; i > 0; i--) {
                        stack_item = attr.activation_stack[i - 1];
                        $items_to_deactivate = $items_to_deactivate.add(stack_item);
                        if ($(stack_item).siblings().filter(attr.hover_item).length > 0) {
                            break;
                        }
                    }
                }
                attr.activation_stack = attr.activation_stack.slice(0, -$items_to_deactivate.length);
                if (attr.$submenu_to_open) {
                    this.deactivate_submenus($items_to_deactivate);
                } else {
                    this.change_columns();
                    this.timers.submenu_closing_timeout = this._late(function() {
                        this.deactivate_submenus($items_to_deactivate);
                    }, attr.animation_duration);
                }
            }, attr.submenu_leave_timeout);
        },
        deactivate_submenus: function($menu_item) {
            var attr = this.attr;
            var $stack_head = this._stack_head();
            attr.submenu_opened = ($stack_head || null);
            $menu_item.removeClass(attr.active_class + ' ' + attr.hover_class);
            if (attr.$submenu_to_open) {
                this.activate_submenu(attr.$submenu_to_open);
            }
        },
        change_columns: function(aditional) {
            var attr = this.attr;
            var new_width;
            aditional = aditional || 0;
            new_width = attr.column_width * (attr.activation_stack.length + 1);
            this.dom.$menu_cascade.width(new_width + aditional);
        },
        _is_father: function($menu_item) {
            var attr = this.attr;
            return $menu_item.hasClass(attr.father_class);
        },
        _stack_head: function() {
            var attr = this.attr;
            var activation_stack = attr.activation_stack;
            return activation_stack[activation_stack.length - 1];
        },
        _is_stack_head: function($menu_item) {
            var $stack_head = this._stack_head();
            return $stack_head && ($menu_item === $stack_head[0]);
        },
        _cancel_late: function(id) {
            window.clearTimeout(id);
        },
        _late: function(fn, timeout) {
            return window.setTimeout($.proxy(fn, this), timeout);
        },
        destroy: function() {
            var attr = this.attr;
            var dom = this.dom;
            var timers = this.timers;
            var timer_name;
            var item_selector = attr.item_selector;
            dom.$previous_container_sibling.after(dom.$menu_container.detach());
            dom.$document.off('.menu_web');
            dom.$menu_button.off('.menu_web');
            dom.$menu_container.off('.menu_web');
            dom.$menu_addon.off('.menu_web');
            dom.$menu_cascade.off('.menu_web').find(item_selector).off('.menu_web');
            dom.$menu_root.off('.menu_web');
            dom.$html.removeClass(attr.desktop_class + ' ' + attr.ready_class);
            for (timer_name in timers) {
                if (timers.hasOwnProperty(timer_name)) {
                    window.clearTimeout(timers[timer_name]);
                }
            }
            attr.tracking.destroy();
            return MenuWebDesktop;
        }
    };
    if (!global.glb) {
        global.glb = {};
    }
    global.glb.MenuWebDesktop = MenuWebDesktop;
})(this);
(function(global) {
    'use strict';
    var MenuWebTouch = function(options) {
        this.version = '3.5.2';
        this.$document = $(document);
        this.attr = {
            pushing_class: 'is-menu-pushing',
            pushed_class: 'is-menu-pushed',
            touch_class: 'is-menu-touch',
            hover_class: 'is-hovered',
            active_class: 'is-activated',
            back_class: 'menu-item-back',
            father_class: 'is-father',
            auto_created_class: 'is-auto-created',
            ready_class: 'is-menu-ready',
            menu_button_selector: '.menu-button',
            container_selector: '#menu-container',
            menu_rounder_selector: '.menu-rounder',
            menu_cascade_selector: '.menu-cascade',
            menu_area_selector: '.menu-area',
            root_selector: '.menu-root',
            submenu_selector: '.menu-submenu',
            item_selector: '.menu-item',
            link_selector: '.menu-item-link',
            title_selector: '.menu-item-title',
            submenu_title_selector: '.menu-submenu-title',
            back_selector: '.menu-item-back',
            father_selector: '.is-father',
            activated_selector: '.is-activated',
            hovered_selector: '.is-hovered',
            second_column_selector: '.menu-submenu-column-2',
            clickable_item_selector: '.menu-item, .menu-item-back',
            event_namespace: '.menu_touch',
            menu_animation_duration: 300,
            submenu_animation_duration: 300,
            testing_mode: false,
            menu_width: null,
            menu_opened: false,
            items_created: false,
            second_columns: [],
            is_mouse_capable: false,
            is_scrolls_capable: false
        };
        this.attr.menuFramework = (document.documentElement.className.indexOf('has-regua') > -1);
        this.attrPerMenu = [];
        $.extend(this.attr, options);
        this.cache_dom();
        this.init_tracking();
        this.init_deepness();
        this.move_to_body();
        this.move_overlay_to_body();
        this.create_proxies();
        this.merge_broken_columns();
        this.listen_events();
        this.notify_of_boot();
        this.force_menu_bind();
    };
    MenuWebTouch.prototype = {
        cache_dom: function() {
            var attr = this.attr;
            var dom = {};
            dom.$html = $('html');
            dom.$window = $(window);
            dom.$body = (attr.testing_mode ? $('#fake-body') : $('body'));
            dom.$menu_button = $(attr.menu_button_selector);
            dom.$menu_container = $(attr.container_selector);
            dom.$menu_area = $(attr.menu_area_selector);
            dom.$previous_container_sibling = dom.$menu_container.prev();
            dom.$overlay = $('#menu-content-overlay');
            dom.$header = $('#header-produto');
            this.dom = dom;
            this.cache_menu_rounder_dom();
        },
        cache_menu_rounder_dom: function() {
            this.dom.$menu_rounder = this.dom.$menu_container.find(this.attr.menu_rounder_selector);
            this.dom.$menu_cascade = this.dom.$menu_container.find(this.attr.menu_cascade_selector);
            this.dom.$menu_root = this.dom.$menu_cascade.children(this.attr.root_selector);
            this.attr.number_of_menus = this.dom.$menu_root.length;
        },
        init_tracking: function() {
            var onMobile = true;
            this.attr.tracking = new global.glb.MenuWebTracker(this.dom.$menu_root, onMobile);
        },
        init_deepness: function() {
            var i;
            for (i = 0; i < this.attr.number_of_menus; i++) {
                this.attrPerMenu.push({
                    deepness: 0
                });
            }
        },
        move_to_body: function() {
            this.dom.$menu_container.detach().prependTo(this.dom.$body);
        },
        move_overlay_to_body: function() {
            this.dom.$overlay.detach().prependTo(this.dom.$body);
        },
        create_proxies: function() {
            var proxies = {};
            var proxy_name;
            proxies.reveal_menu = $.proxy(this, 'reveal_menu');
            proxies.collapse_menu = $.proxy(this, 'collapse_menu');
            proxies.reset_menu = $.proxy(this, 'reset_menu');
            proxies.reveal_submenu = $.proxy(this, 'reveal_submenu');
            proxies.hide_submenu = $.proxy(this, 'hide_submenu');
            proxies.enter_item = $.proxy(this, 'enter_item');
            proxies.leave_item = $.proxy(this, 'leave_item');
            proxies.refresh = $.proxy(this, 'refresh');
            for (proxy_name in proxies) {
                if (proxies.hasOwnProperty(proxy_name)) {
                    this['prx_' + proxy_name] = proxies[proxy_name];
                }
            }
        },
        merge_broken_columns: function() {
            var attr = this.attr;
            var second_columns = attr.second_columns;
            var $second_columns = this.dom.$menu_root.find(attr.second_column_selector);
            $second_columns.each(function() {
                var $second_column = $(this);
                var $children = $second_column.children().remove();
                var $first_column = $second_column.prev();
                $first_column.append($children);
                second_columns.push({
                    'first_column': $first_column,
                    'second_column': $second_column.remove(),
                    'children': $children
                });
            });
        },
        debounce: function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) {
                        func.apply(context, args);
                    }
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    func.apply(context, args);
                }
            };
        },
        refresh: function() {
            this.attr.menu_width = this.dom.$menu_cascade.first().outerWidth(false);
        },
        listen_events: function() {
            var dom = this.dom;
            var attr = this.attr;
            var event_namespace = attr.event_namespace;
            var might_be_mouse = false;
            var ns = function(event, extras) {
                var parts = [event, event_namespace];
                if (extras) {
                    parts.push(extras);
                }
                return parts.join('');
            };
            dom.$body.one(ns('mousedown'), $.proxy(function() {
                might_be_mouse = false;
            }));
            dom.$body.on(ns('mousemove'), $.proxy(function() {
                if (might_be_mouse) {
                    attr.is_mouse_capable = true;
                    dom.$body.off(ns('mousemove'));
                    dom.$menu_rounder.on(ns('mouseenter'), attr.clickable_item_selector, this.prx_enter_item).on(ns('mouseleave'), attr.clickable_item_selector, this.prx_leave_item);
                }
                might_be_mouse = true;
            }, this));
            dom.$overlay.on(ns('click'), this.prx_collapse_menu);
            dom.$menu_root.on(ns('click'), attr.father_selector, this.prx_reveal_submenu).on(ns('click'), attr.back_selector, this.prx_hide_submenu);
            dom.$window.on('resize', this.debounce(this.prx_refresh, 250));
            this.$document.on('glb.menu.open', this.prx_reveal_menu);
            this.$document.on('glb.menu.close', this.prx_collapse_menu);
        },
        notify_of_boot: function() {
            var attr = this.attr;
            var dom = this.dom;
            var classes = this._join(attr.touch_class, attr.ready_class);
            dom.$html.addClass(classes);
            dom.$menu_container.trigger('menu_ready', [this]);
        },
        check_scrolls_support: function() {
            var doc = global.document;
            var doc_element = doc.documentElement;
            var is_mouse_capable = this.attr.is_mouse_capable;
            var is_scrolls_capable = (is_mouse_capable || 'WebkitOverflowScrolling' in doc_element.style || 'msOverflowStyle' in doc_element.style || (function() {
                var ua = global.navigator.userAgent,
                    webkit = ua.match(/AppleWebKit\/([0-9]+)/),
                    wkversion = webkit && webkit[1],
                    wkLte534 = webkit && wkversion >= 534;
                return (ua.match(/Android ([0-9]+)/) && RegExp.$1 >= 3 && wkLte534 || ua.match(/ Version\/([0-9]+)/) && RegExp.$1 >= 0 && global.blackberry && wkLte534 || ua.indexOf('PlayBook') > -1 && wkLte534 && ua.indexOf('Android 2') > -1 || ua.match(/Firefox\/([0-9]+)/) && RegExp.$1 >= 4 || ua.match(/wOSBrowser\/([0-9]+)/) && RegExp.$1 >= 233 && wkLte534 || ua.match(/NokiaBrowser\/([0-9\.]+)/) && parseFloat(RegExp.$1) === 7.3 && webkit && wkversion >= 533);
            })());
            this.attr.is_scrolls_capable = is_scrolls_capable;
            this.dom.$html.addClass((is_scrolls_capable ? 'has-' : 'has-not-') + 'native-scrolls');
        },
        reveal_menu: function() {
            var dom = this.dom;
            var attr = this.attr;
            var classes = this._join(attr.pushing_class, attr.pushed_class);
            if (!attr.menu_opened) {
                this.check_scrolls_support();
                dom.$html.addClass(classes);
                this.refresh();
                dom.$menu_container.trigger('menu_shown');
                if (attr.menu_animation_duration > 0) {
                    setTimeout(function() {
                        attr.menu_opened = true;
                    }, attr.menu_animation_duration);
                } else {
                    attr.menu_opened = true;
                }
            }
        },
        force_menu_bind: function() {
            var self = this;
            var menu_button = this.dom.$menu_button;
            if (!this.dom.$header.hasClass('header-navegacao')) {
                menu_button.on('click', function() {
                    self.reveal_menu();
                    return false;
                });
            }
        },
        collapse_menu: function() {
            var attr = this.attr,
                that = this;
            if (attr.menu_opened) {
                attr.menu_opened = false;
                this.dom.$html.removeClass(attr.pushed_class);
                if (attr.menu_animation_duration > 0) {
                    setTimeout(this.prx_reset_menu, attr.menu_animation_duration);
                    setTimeout(function() {
                        that.dom.$menu_container.trigger('menu_off');
                    }, attr.menu_animation_duration);
                } else {
                    this.reset_menu();
                    this.dom.$menu_container.trigger('menu_off');
                }
            }
        },
        reveal_submenu: function(event) {
            var attr = this.attr;
            var $target = $(event.target);
            var $closest_active = $target.closest(attr.activated_selector);
            var $menu_item = $target.closest(attr.item_selector);
            var is_father = $menu_item.hasClass(attr.father_class);
            var is_not_bubbled = ($closest_active[0] !== $menu_item[0]);
            if (is_father && is_not_bubbled) {
                $menu_item.addClass(attr.active_class);
                this.navigate('forward', $menu_item);
                event.preventDefault();
            }
        },
        hide_submenu: function(event) {
            var attr = this.attr;
            var $back_item = $(event.target);
            var $parent_menu_item = $back_item.parents(attr.activated_selector).first();
            $parent_menu_item.removeClass(attr.hover_class);
            this.navigate('back', $parent_menu_item);
            setTimeout(function() {
                $parent_menu_item.removeClass(attr.active_class);
            }, attr.submenu_animation_duration);
        },
        navigate: function(deepness_direction, reference_menu_item) {
            var modifier, direction_map = {
                    'back': -1,
                    'forward': 1
                },
                menu_index, $menu_cascade = (reference_menu_item) ? reference_menu_item.parents(this.attr.menu_cascade_selector) : null;
            if (deepness_direction in direction_map) {
                modifier = direction_map[deepness_direction];
                menu_index = parseInt($menu_cascade.attr('data-menu-index'), 10);
                this.move_to_level(this.attrPerMenu[menu_index].deepness + modifier, menu_index);
            }
        },
        move_to_level: function(deepness, menu_index, trigger_moved) {
            var left, $menu_cascade, dom = this.dom,
                attr = this.attr;
            trigger_moved = (typeof trigger_moved !== 'undefined') ? trigger_moved : true;
            deepness = (deepness >= 0 ? deepness : 0);
            if (typeof menu_index !== 'undefined' && menu_index !== null && this.attrPerMenu[menu_index]) {
                this.attrPerMenu[menu_index].deepness = deepness;
                $menu_cascade = dom.$menu_cascade.eq(menu_index);
            } else {
                $menu_cascade = dom.$menu_cascade;
            }
            if (trigger_moved) {
                dom.$menu_container.trigger('menu_pre_move', [deepness]);
            }
            left = deepness * attr.menu_width;
            if (!this.attr.menuFramework) {
                dom.$body.scrollTop(0);
            }
            dom.$menu_rounder.scrollTop(0);
            $menu_cascade.css('left', -(left));
            if (trigger_moved) {
                dom.$menu_container.trigger('menu_moved', [deepness]);
            }
        },
        enter_item: function(event) {
            var attr = this.attr;
            $(event.target).closest(attr.clickable_item_selector).addClass(attr.hover_class);
        },
        leave_item: function(event) {
            var attr = this.attr;
            $(event.target).closest(attr.clickable_item_selector).removeClass(attr.hover_class);
        },
        reset_menu: function() {
            var i;
            var dom = this.dom;
            var attr = this.attr;
            attr.menu_opened = false;
            attr.items_created = false;
            for (i = 0; i < this.attr.number_of_menus; i++) {
                this.move_to_level(0, i);
            }
            dom.$html.removeClass(this._join(attr.pushing_class, attr.pushed_class));
            dom.$menu_root.find(attr.activated_selector).removeClass(attr.active_class);
            dom.$menu_root.find(attr.hovered_selector).removeClass(attr.hover_class);
            dom.$menu_container.trigger('menu_reset');
        },
        destroy: function() {
            var dom = this.dom;
            var attr = this.attr;
            var event_namespace = attr.event_namespace;
            var second_columns = attr.second_columns;
            var second_column_data;
            var $first_column;
            var $second_column;
            var $children;
            dom.$body.off(event_namespace);
            dom.$overlay.off(event_namespace);
            dom.$menu_button.off(event_namespace);
            dom.$menu_root.off(event_namespace);
            attr.tracking.destroy();
            this.reset_menu();
            while (second_columns.length > 0) {
                second_column_data = second_columns.shift();
                $first_column = second_column_data.first_column;
                $second_column = second_column_data.second_column;
                $children = second_column_data.children;
                $second_column.append($children.remove());
                $first_column.after($second_column);
            }
            dom.$html.removeClass(this._join(attr.touch_class, attr.ready_class));
            dom.$previous_container_sibling.after(dom.$menu_container.remove());
            dom.$menu_container.after(dom.$overlay.remove());
            return MenuWebTouch;
        },
        _join: function() {
            var args = Array.prototype.slice.call(arguments, 0);
            return args.join(' ');
        }
    };
    if (!global.glb) {
        global.glb = {};
    }
    global.glb.MenuWebTouch = MenuWebTouch;
})(this);
(function(definition) {
    'use strict';
    var global = window;
    var module_id = global.menu_web_module_id || 'menu_web';
    var glb = global.glb || {};
    if (glb && glb.runner === 'function') {
        global.glb.runner.push(definition);
    } else if (typeof global.define === 'function' && global.define.amd) {
        global.define(module_id, [], definition);
    } else {
        glb[module_id] = definition();
        global.glb = glb;
    }
})(function() {
    'use strict';
    var is_touchable = ('ontouchstart' in window || navigator.msMaxTouchPoints || (window.DocumentTouch && document instanceof window.DocumentTouch));
    var min_width = 960;
    var hasRegua = (document.documentElement.className.indexOf('has-regua') > -1);
    if (is_touchable || $(window).width() < min_width) {
        if (hasRegua) {
            glb.currentMenuWebCarousel = new glb.MenuWebCarousel();
        }
        glb.currentMenuWeb = new glb.MenuWebTouch();
    } else {
        glb.currentMenuWeb = new glb.MenuWebDesktop();
    }
    return glb.currentMenuWeb;
});
(function($) {
    $.fn.menuAim = function(opts) {
        this.each(function() {
            init.call(this, opts);
        });
        return this;
    };

    function init(opts) {
        var $menu = $(this),
            activeRow = null,
            mouseLocs = [],
            lastDelayLoc = null,
            timeoutId = null,
            options = $.extend({
                rowSelector: "> li",
                submenuSelector: "*",
                submenuDirection: "right",
                tolerance: 75,
                enter: $.noop,
                exit: $.noop,
                activate: $.noop,
                deactivate: $.noop,
                exitMenu: $.noop
            }, opts);
        var MOUSE_LOCS_TRACKED = 3,
            DELAY = 300;
        var mousemoveDocument = function(e) {
            mouseLocs.push({
                x: e.pageX,
                y: e.pageY
            });
            if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                mouseLocs.shift();
            }
        };
        var mouseleaveMenu = function() {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (options.exitMenu(this)) {
                if (activeRow) {
                    options.deactivate(activeRow);
                }
                activeRow = null;
            }
        };
        var mouseenterRow = function() {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                options.enter(this);
                possiblyActivate(this);
            },
            mouseleaveRow = function() {
                options.exit(this);
            };
        var clickRow = function() {
            activate(this);
        };
        var activate = function(row) {
            if (row == activeRow) {
                return;
            }
            if (activeRow) {
                options.deactivate(activeRow);
            }
            options.activate(row);
            activeRow = row;
        };
        var possiblyActivate = function(row) {
            var delay = activationDelay();
            if (delay) {
                timeoutId = setTimeout(function() {
                    possiblyActivate(row);
                }, delay);
            } else {
                activate(row);
            }
        };
        var activationDelay = function() {
            if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
                return 0;
            }
            var offset = $menu.offset(),
                upperLeft = {
                    x: offset.left,
                    y: offset.top - options.tolerance
                },
                upperRight = {
                    x: offset.left + $menu.outerWidth(),
                    y: upperLeft.y
                },
                lowerLeft = {
                    x: offset.left,
                    y: offset.top + $menu.outerHeight() + options.tolerance
                },
                lowerRight = {
                    x: offset.left + $menu.outerWidth(),
                    y: lowerLeft.y
                },
                loc = mouseLocs[mouseLocs.length - 1],
                prevLoc = mouseLocs[0];
            if (!loc) {
                return 0;
            }
            if (!prevLoc) {
                prevLoc = loc;
            }
            if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x || prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                return 0;
            }
            if (lastDelayLoc && loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                return 0;
            }

            function slope(a, b) {
                return (b.y - a.y) / (b.x - a.x);
            };
            var decreasingCorner = upperRight,
                increasingCorner = lowerRight;
            if (options.submenuDirection == "left") {
                decreasingCorner = lowerLeft;
                increasingCorner = upperLeft;
            } else if (options.submenuDirection == "below") {
                decreasingCorner = lowerRight;
                increasingCorner = lowerLeft;
            } else if (options.submenuDirection == "above") {
                decreasingCorner = upperLeft;
                increasingCorner = upperRight;
            }
            var decreasingSlope = slope(loc, decreasingCorner),
                increasingSlope = slope(loc, increasingCorner),
                prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                prevIncreasingSlope = slope(prevLoc, increasingCorner);
            if (decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope) {
                lastDelayLoc = loc;
                return DELAY;
            }
            lastDelayLoc = null;
            return 0;
        };
        $menu.mouseleave(mouseleaveMenu).find(options.rowSelector).mouseenter(mouseenterRow).mouseleave(mouseleaveRow).click(clickRow);
        $(document).mousemove(mousemoveDocument);
    };
})(jQuery);
(function(global) {
    'use strict';
    var MenuWebMosaicoG1Helper = function() {
        this.version = '{{ version }}';
        this.attr = {
            pushing_class: 'is-menu-pushing',
            mosaic_map_width: '265px',
            mosaic_states_width: '200px',
            mosaic_regions_width: '375px',
            active_class: 'is-activated',
            is_father_class: 'is-father',
            menu_width: 264
        };
        this.cache_dom();
        if (this.supports_svg()) {
            this.createProxies();
            this.listen_events();
        }
    };
    MenuWebMosaicoG1Helper.prototype = {
        cache_dom: function() {
            var dom = {};
            dom.$html = $('html');
            dom.$menu_item_sua_regiao = $('#menu-1-sua-regiao');
            dom.$map_region_triggers = $('#mosaic-map-svg .region-trigger');
            dom.$menu_addon_container = $('#menu-addon-container');
            dom.$mosaic_container = $('#mosaic-container');
            this.dom = dom;
        },
        supports_svg: function() {
            var checks_for_svg_support = function() {
                try {
                    var rect = global.document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    rect.setAttribute('width', '1');
                    rect.setAttribute('height', '1');
                    return !!(rect.width && rect.getAttribute('width') === '1');
                } catch (e) {
                    return false;
                }
            };
            var has_svg = checks_for_svg_support();
            if (has_svg && !this.dom.$html.hasClass('has-svg')) {
                this.dom.$html.addClass('has-svg');
            }
            this.supports_svg = function() {
                return has_svg;
            };
            return has_svg;
        },
        createProxies: function() {
            var proxies = {};
            var proxy_name;
            proxies.show_states_list = $.proxy(this, 'show_states_list');
            for (proxy_name in proxies) {
                if (proxies.hasOwnProperty(proxy_name)) {
                    this['prx_' + proxy_name] = proxies[proxy_name];
                }
            }
        },
        listen_events: function() {
            var dom = this.dom;
            dom.$map_region_triggers.on('click', this.prx_show_states_list);
        },
        show_states_list: function(event) {
            var attr = this.attr,
                dom = this.dom,
                region_name, $states_list, is_touchable = this.is_touchable(),
                $menu_addon_container = dom.$menu_addon_container,
                $mosaic_container = dom.$mosaic_container;
            if (event.target.className.baseVal.indexOf('region-trigger') > -1) {
                region_name = $(event.target).attr('data-region');
            } else {
                var close_parents = $(event.target).parents().slice(0, 3);
                close_parents.each(function() {
                    if ($(this)[0].className.baseVal.indexOf('region-trigger') > -1) {
                        region_name = $(this).attr('data-region');
                    }
                });
            }
            $states_list = dom.$menu_addon_container.find('.regiao-' + region_name).first();
            if (is_touchable) {
                $states_list.show();
                $menu_addon_container.css('left', -(attr.menu_width));
            } else {
                $mosaic_container.fadeOut(300, function() {
                    $menu_addon_container.width(attr.mosaic_states_width);
                    $states_list.fadeIn(300);
                });
            }
        },
        is_touchable: function() {
            if ($('html').hasClass('is-menu-touch')) {
                return true;
            } else {
                return false;
            }
        }
    };
    if (!global.glb) {
        global.glb = {};
    }
    global.glb.MenuWebMosaicoG1Helper = MenuWebMosaicoG1Helper;
})(this);
(function(global) {
    'use strict';
    var MenuWebMosaicoG1Touch = function() {
        this.version = '2.3.3';
        this.helper = new global.glb.MenuWebMosaicoG1Helper();
        this.cache_dom();
        if (this.helper.supports_svg()) {
            this.move_to_menu_container();
            this.createProxies();
            this.listen_events();
        }
    };
    MenuWebMosaicoG1Touch.prototype = {
        cache_dom: function() {
            var dom = {};
            dom.$menu_container = $('#menu-container');
            dom.$menu_rounder = $('#menu-rounder');
            dom.$menu_addon = $('#menu-addon');
            dom.$menu_addon_container = $('#menu-addon-container');
            dom.$menu_addon_back = dom.$menu_addon_container.find('.regiao > .menu-item-back');
            dom.$mosaic_state_container = $('#mosaic-state-container');
            dom.$mosaic_states_with_subregions = dom.$mosaic_state_container.find('.is-father .state');
            dom.$subregions_back_buttons = dom.$mosaic_state_container.find('.menu-subregion-back');
            dom.$menu_cascade = $('#menu-cascade');
            dom.$menu_web_root = dom.$menu_cascade.children('.menu-root');
            dom.$menu_web_root_itens = dom.$menu_cascade.find('.menu-root > .menu-item > .menu-item-link');
            dom.$menu_back_to_root_buttons = dom.$menu_web_root.find('.menu-submenu-level1 > .menu-item-back');
            dom.$map_region_triggers = $('#mosaic-map-svg .region-trigger');
            this.dom = dom;
        },
        move_to_menu_container: function() {
            var dom = this.dom,
                $menu_addon = dom.$menu_addon,
                $menu_rounder = dom.$menu_rounder,
                $menu_addon_container = dom.$menu_addon_container;
            $menu_addon.detach();
            $menu_addon_container.detach();
            $menu_rounder.prepend($menu_addon);
            $menu_addon.prepend($menu_addon_container);
        },
        createProxies: function() {
            var proxies = {},
                proxy_name;
            proxies.navigate_into_menu_web = $.proxy(this, 'navigate_into_menu_web');
            proxies.back_to_root = $.proxy(this, 'back_to_root');
            proxies.scroll_menu_web_too = $.proxy(this, 'scroll_menu_web_too');
            proxies.show_subregions_list = $.proxy(this, 'show_subregions_list');
            proxies.back_to_states_list = $.proxy(this, 'back_to_states_list');
            proxies.reset_menu_mosaic = $.proxy(this, 'reset_menu_mosaic');
            for (proxy_name in proxies) {
                if (proxies.hasOwnProperty(proxy_name)) {
                    this['prx_' + proxy_name] = proxies[proxy_name];
                }
            }
        },
        listen_events: function() {
            var dom = this.dom;
            dom.$menu_web_root_itens.on('click', this.prx_navigate_into_menu_web);
            dom.$menu_addon_back.on('click', this.prx_back_to_root);
            dom.$menu_back_to_root_buttons.on('click', this.prx_back_to_root);
            dom.$map_region_triggers.on('click', this.prx_scroll_menu_web_too);
            dom.$mosaic_states_with_subregions.on('click', this.prx_show_subregions_list);
            dom.$subregions_back_buttons.on('click', this.prx_back_to_states_list);
            dom.$menu_container.on('menu_shown', this.prx_reset_menu_mosaic);
        },
        navigate_into_menu_web: function() {
            var $menu_addon_container = this.dom.$menu_addon_container,
                $menu_cascade = this.dom.$menu_cascade,
                menu_width = this.helper.attr.menu_width;
            $menu_addon_container.css('left', -(menu_width));
            window.setTimeout(function() {
                $menu_cascade.addClass('is-activated');
            }, 300);
        },
        back_to_root: function(event) {
            var dom = this.dom;
            dom.$menu_cascade.removeClass('is-activated').css('left', 0);
            dom.$menu_addon_container.css('left', 0);
            window.setTimeout(function() {
                $(event.target).parent('.regiao').hide();
            }, 300);
        },
        scroll_menu_web_too: function() {
            var menu_width = this.helper.attr.menu_width;
            this.dom.$menu_cascade.css('left', -(menu_width));
        },
        show_subregions_list: function(event) {
            var $clicked_state = $(event.target),
                subregions_list_id = $clicked_state.attr('data-submenu-id'),
                $subregion = $('#' + subregions_list_id),
                $menu_addon_container = this.dom.$menu_addon_container,
                menu_width = this.helper.attr.menu_width;
            event.preventDefault();
            $subregion.show();
            $menu_addon_container.css('left', -(2 * menu_width));
        },
        back_to_states_list: function(event) {
            var $subregions_list = $(event.target).parent(),
                $menu_addon_container = this.dom.$menu_addon_container,
                menu_width = this.helper.attr.menu_width;
            $menu_addon_container.css('left', -(menu_width));
            window.setTimeout(function() {
                $subregions_list.hide();
            }, 300);
        },
        reset_menu_mosaic: function() {
            var dom = this.dom,
                $menu_addon_container = dom.$menu_addon_container,
                $mosaic_state_container = dom.$mosaic_state_container,
                $regions = $mosaic_state_container.find('.regiao'),
                $subregions = $mosaic_state_container.find('.menu-submenu-level1'),
                $menu_cascade = dom.$menu_cascade;
            $menu_addon_container.css('left', '0');
            $regions.hide();
            $subregions.hide();
            $menu_cascade.removeClass('is-activated');
        }
    };
    if (!global.glb) {
        global.glb = {};
    }
    global.glb.MenuWebMosaicoG1Touch = MenuWebMosaicoG1Touch;
})(this);
(function(global) {
    'use strict';
    var MenuWebMosaicoG1Desktop = function() {
        this.version = '2.3.3';
        this.helper = new global.glb.MenuWebMosaicoG1Helper();
        this.cache_dom();
        if (this.helper.supports_svg()) {
            this.move_to_menu_container();
            this.createProxies();
            this.listen_events();
            this.call_aim();
        }
    };
    MenuWebMosaicoG1Desktop.prototype = {
        cache_dom: function() {
            var dom = {};
            dom.$states_lists = $('.mosaic-states-list');
            dom.$menu_addon = $('#menu-addon');
            dom.$menu_addon_container = $('#menu-addon-container');
            dom.$menu_addon_back = dom.$menu_addon_container.find('.back');
            dom.$mosaic_map_svg = $('#mosaic-map-svg');
            dom.$map_region_triggers = $('#mosaic-map-svg .region-trigger');
            dom.$map_labels = $('#mosaic-map-svg .label');
            dom.$menu_item_sua_regiao = $('#menu-1-sua-regiao');
            this.dom = dom;
        },
        createProxies: function() {
            var proxies = {};
            var proxy_name;
            proxies.show_map = $.proxy(this, 'show_map');
            proxies.show_map_region = $.proxy(this, 'show_map_region');
            proxies.show_all_map_regions = $.proxy(this, 'show_all_map_regions');
            for (proxy_name in proxies) {
                if (proxies.hasOwnProperty(proxy_name)) {
                    this['prx_' + proxy_name] = proxies[proxy_name];
                }
            }
        },
        listen_events: function() {
            var dom = this.dom;
            dom.$menu_addon_back.on('click', this.prx_show_map);
            dom.$map_region_triggers.hover(this.prx_show_map_region, this.prx_show_all_map_regions);
        },
        call_aim: function() {
            var dom = this.dom;
            dom.$states_lists.menuAim({
                activate: $.proxy(this.activate_submenu, this),
                deactivate: $.proxy(this.deactivate_submenu, this),
                exitMenu: $.proxy(this.deactivate_all_submenus, this)
            });
        },
        activate_submenu: function(row) {
            var $row = $(row),
                attr = this.helper.attr,
                $menu_addon_container = this.dom.$menu_addon_container;
            if ($row.hasClass(attr.is_father_class)) {
                $row.addClass(attr.active_class);
                $menu_addon_container.width(attr.mosaic_regions_width);
            }
        },
        deactivate_submenu: function(row) {
            var $row = $(row),
                attr = this.helper.attr,
                $menu_addon_container = this.dom.$menu_addon_container;
            if ($row.hasClass(attr.is_father_class)) {
                $row.removeClass(attr.active_class);
                $menu_addon_container.width(attr.mosaic_states_width);
            }
        },
        deactivate_all_submenus: function() {
            return true;
        },
        show_map: function(event) {
            var dom = this.dom,
                attr = this.helper.attr;
            $(event.target).parent('.regiao').fadeOut(300, function() {
                $('#mosaic-container').fadeIn(300);
            });
            dom.$menu_addon_container.width(attr.mosaic_map_width);
        },
        show_map_region: function(event) {
            var dom = this.dom,
                $specific_labels, region_name;
            if (event.target.className.baseVal.indexOf('region-trigger') > -1) {
                region_name = $(event.target).attr('data-region');
            } else {
                var close_parents = $(event.target).parents().slice(0, 3);
                close_parents.each(function() {
                    if ($(this)[0].className.baseVal.indexOf('region-trigger') > -1) {
                        region_name = $(this).attr('data-region');
                    }
                });
            }
            dom.$map_labels.each(function() {
                var pure_elem = $(this)[0];
                pure_elem.setAttribute('class', pure_elem.className.baseVal + ' transparent');
            });
            $specific_labels = $('#mosaic-map-svg .label-' + region_name);
            $specific_labels.each(function() {
                var pure_elem = $(this)[0],
                    new_class;
                new_class = pure_elem.className.baseVal.replace(/ transparent/, '');
                pure_elem.setAttribute('class', new_class);
            });
        },
        show_all_map_regions: function() {
            var dom = this.dom;
            dom.$map_labels.each(function() {
                var pure_elem = $(this)[0];
                pure_elem.setAttribute('class', pure_elem.className.baseVal.replace(/ transparent/, ''));
            });
        },
        move_to_menu_container: function() {
            var dom = this.dom,
                $menu_addon_container = dom.$menu_addon_container;
            $menu_addon_container.detach();
            dom.$menu_addon.append($menu_addon_container);
        }
    };
    if (!global.glb) {
        global.glb = {};
    }
    global.glb.MenuWebMosaicoG1Desktop = MenuWebMosaicoG1Desktop;
})(this);
(function() {
    'use strict';
    var TrackingMenuWebMosaicoG1 = function() {
        this.dom = {};
        this.gaq = window._gaq || [];
        this.commonGaqAttrs = ['_trackEvent', 'Menu', 'Escolha Sua Regiao'];
        this.accentMatcher = null;
        this.translationObject = null;
    };
    TrackingMenuWebMosaicoG1.prototype = {
        init: function() {
            this.prepareTranslationObject();
            this.cacheDom();
            this.trackRegiao();
            this.trackBackButton();
            this.trackEstado();
            this.trackRegiaoAfiliada();
        },
        prepareTranslationObject: function() {
            var inChrs = 'Ã Ã¡Ã¢Ã£Ã¤Ã§Ã¨Ã©ÃªÃ«Ã¬Ã­Ã®Ã¯Ã±Ã²Ã³Ã´ÃµÃ¶Ã¹ÃºÃ»Ã¼Ã½Ã¿Ã€ÃÃ‚ÃƒÃ„Ã‡ÃˆÃ‰ÃŠÃ‹ÃŒÃÃŽÃÃ‘Ã’Ã“Ã”Ã•Ã–Ã™ÃšÃ›ÃœÃ',
                outChrs = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY',
                object = {},
                i;
            for (i = 0; i < inChrs.length; i++) {
                object[inChrs[i]] = outChrs[i];
            }
            this.accentMatcher = new RegExp('[' + inChrs + ']', 'g');
            this.translationObject = object;
        },
        stripAccents: function(text) {
            var instance = this;
            return text.replace(this.accentMatcher, function(character) {
                return instance.translationObject[character] || character;
            });
        },
        cacheDom: function() {
            var dom = {};
            dom.menuAddOnContainer = $('#menu-addon-container');
            this.dom = dom;
        },
        trackRegiao: function() {
            var instance = this;
            this.dom.menuAddOnContainer.on('click', '#norte, #nordeste, #centro-oeste, #sudeste, #sul, image, text', function() {
                var $regiao = instance.dom.menuAddOnContainer.find('.regiao-' + $(this).attr('data-region')),
                    regiaoName = $regiao.children('.menu-submenu-title').text();
                instance._trackEvent(regiaoName + ' > Interacao', 0, true);
            });
        },
        trackBackButton: function() {
            var instance = this;
            this.dom.menuAddOnContainer.on('click', '.back', function() {
                instance._trackEvent('Voltar', 0, true);
            });
        },
        trackEstado: function() {
            var instance = this;
            this.dom.menuAddOnContainer.on('click', '.state', function() {
                var $this = $(this),
                    estadoName = $this.text(),
                    regiaoName = instance._getRegiaoName($this);
                instance._trackEvent(instance.stripAccents(regiaoName) + ' > ' + instance.stripAccents(estadoName));
            });
        },
        trackRegiaoAfiliada: function() {
            var instance = this;
            this.dom.menuAddOnContainer.on('click', '.item-afiliada', function() {
                var $this = $(this),
                    regiaoAfiliadaName = $this.text(),
                    estadoName = $this.closest('.menu-submenu').siblings('.state').text(),
                    regiaoName = instance._getRegiaoName($this);
                instance._trackEvent(regiaoName + ' > ' + instance.stripAccents(estadoName) + ' > ' + instance.stripAccents(regiaoAfiliadaName));
            });
        },
        _getRegiaoName: function($element) {
            return $element.closest('.mosaic-states-list').siblings('.menu-submenu-title').text();
        },
        _trackEvent: function() {
            var args = Array.prototype.slice.call(arguments, 0);
            this.gaq.push(this.commonGaqAttrs.concat(args));
        }
    };
    if (!window.glb) {
        window.glb = {};
    }
    window.glb.TrackingMenuWebMosaicoG1 = TrackingMenuWebMosaicoG1;
})();
(function(global) {
    'use strict';
    var SvgBrasilMap = function(staticUrl) {
        this.staticUrlValue = staticUrl;
    };
    SvgBrasilMap.prototype = {
        init: function() {
            var instance = this;
            $.ajax({
                url: this.staticUrlValue + 'menu_web_mosaico_g1/template/mapa_brasil.svg',
                dataType: 'text',
                success: function(strSvg) {
                    strSvg = instance.replaceStaticUrl(strSvg);
                    instance.appendToDom($('#mosaic-container'), strSvg);
                    instance.instantiateMosaicoG1();
                    instance.instantiateTrackingMosaicoG1();
                }
            });
        },
        replaceStaticUrl: function(data) {
            return data.replace(/__STATIC_URL__/g, this.staticUrlValue);
        },
        appendToDom: function(elementToAppend, whatToAppend) {
            elementToAppend.append(whatToAppend);
        },
        instantiateMosaicoG1: function() {
            var menuWebMosaicoG1Desktop, menuWebMosaicoG1Touch;
            if (this.isMosaicoMobile()) {
                menuWebMosaicoG1Touch = new window.glb.MenuWebMosaicoG1Touch();
                window.glb.menu_web_mosaico_g1_touch = menuWebMosaicoG1Touch;
            } else {
                menuWebMosaicoG1Desktop = new window.glb.MenuWebMosaicoG1Desktop();
                window.glb.menu_web_mosaico_g1_desktop = menuWebMosaicoG1Desktop;
            }
        },
        instantiateTrackingMosaicoG1: function() {
            new window.glb.TrackingMenuWebMosaicoG1().init();
        },
        isMosaicoMobile: function() {
            var limitMobileScreenWidth = 960,
                isTouchable = ('ontouchstart' in window || navigator.msMaxTouchPoints || (window.DocumentTouch && document instanceof window.DocumentTouch));
            if (isTouchable || $(window).width() < limitMobileScreenWidth) {
                return true;
            } else {
                return false;
            }
        }
    };
    if (!window.glb) {
        window.glb = {};
    }
    window.glb.SvgBrasilMap = SvgBrasilMap;
})(this);
(function(global) {
    new global.glb.SvgBrasilMap(global.SETTINGS.STATIC_URL).init();
})(this);
! function(a, b) {
    "use strict";
    var c = b(a);
    a._gaq = a._gaq || [], a.glb = a.glb || {}, a.glb.ElementTracker = a.glb.ElementTracker || function() {
        function d() {
            return g(), h(), i(), this
        }

        function e() {
            b("body").off(".event-tracker"), b(a).off(".event-tracker")
        }

        function f() {
            return x
        }

        function g() {
            b("body").on("click.event-tracker", "[data-track-click]", function() {
                return o(b(this)), !0
            })
        }

        function h() {
            j(), k(), l()
        }

        function i() {
            b("body").on("click.event-tracker", "[data-track-links]", function(a) {
                "A" === a.target.tagName && q(b(a.target))
            })
        }

        function j() {
            var a, c, d = b("[data-track-scroll]");
            for (a = 0; a < d.length; a++) c = d.eq(a), x.scrollTrackItems.push(c)
        }

        function k() {
            c.on("scroll.event-tracker", function() {
                m()
            })
        }

        function l() {
            var a = t();
            n(a)
        }

        function m() {
            w && (w = !1, setTimeout(function() {
                var a = t();
                n(a), w = !0
            }, 150))
        }

        function n(a) {
            var b, c, d, e, f = [];
            for (e = 0; e < x.scrollTrackItems.length; e++) b = x.scrollTrackItems[e], c = b.offset().top, d = a > c + v, d ? p(b) : f.push(b);
            x.scrollTrackItems = f
        }

        function o(a) {
            var b = a.data("track-click");
            r(a, {
                label: b
            })
        }

        function p(a) {
            var b = a.data("track-scroll");
            r(a, {
                label: b
            })
        }

        function q(a) {
            var b = {
                action: a.text(),
                label: a.attr("href")
            };
            r(a, b)
        }

        function r(c, d) {
            d = d || {}, b.each(["category", "action", "value", "noninteraction"], function(a, b) {
                var e;
                d[b] || (e = u(c, b), d[b] = e || y[b])
            }), a._gaq.push(["_trackEvent", d.category, d.action, d.label, d.value, d.noninteraction])
        }

        function s() {
            return c.scrollTop.apply(c, arguments)
        }

        function t() {
            return s() + c.height()
        }

        function u(a, b) {
            var c = a.closest("[data-track-" + b + "]");
            return c.data("track-" + b)
        }
        var v = 30,
            w = !0,
            x = {
                scrollTrackItems: []
            },
            y = {
                value: 0,
                noninteraction: !1
            };
        return {
            init: d,
            destroy: e,
            initClicks: g,
            initScroll: h,
            initLinks: i,
            push: r,
            pushClick: o,
            pushScroll: p,
            pushLink: q,
            getInfo: f,
            removeElementsVisualized: n
        }
    }().init()
}(this, jQuery);
$(function() {
    'use strict';
    var cdn_src = 'http://s.glbimg.com/gl/cd/libs/',
        share_bar_selector = '.box-share-inferior__share-bar',
        networks = ['facebook', 'twitter', 'whatsapp', 'google'],
        getCachedScript = function(url, callback) {
            callback = callback || function() {};
            $.ajax({
                url: cdn_src + url,
                dataType: "script",
                cache: true,
                success: callback
            });
        },
        getNetworkByButton = function(button) {
            var networksLength = networks.length;
            for (var i = networksLength - 1; i >= 0; i--) {
                var network = networks[i];
                if (button.className.indexOf(network) > -1) {
                    return network;
                }
            }
        },
        initShareBar = function() {
            if (!$(share_bar_selector).attr('data-url')) {
                $(share_bar_selector).attr('data-url', window.location.href);
            }
            if (!$(share_bar_selector).attr('data-title')) {
                $(share_bar_selector).attr('data-title', window.document.title);
            }
            new ShareBar({
                'selector': share_bar_selector,
                'networks': networks.slice(0),
                'onShare': function(button) {
                    if (typeof _gaq !== 'undefined') {
                        var network = getNetworkByButton(button);
                        _gaq.push(['_trackEvent', 'social', network, 'clique | share | rodape']);
                    }
                }
            });
        };
    if (typeof window.ShareBar !== 'undefined') {
        initShareBar();
    } else {
        $("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: cdn_src + 'share-bar/3.0.13/css/share.bar.min.css'
        }).appendTo("head");
        getCachedScript('share-bar/3.0.13/js/share.bar.min.js', function() {
            initShareBar();
        });
    }
});
var CardDeVideos = function(selector) {
    'use strict';
    var $elm = $(selector),
        cdn_src = 'http://s.glbimg.com/gl/cd/libs/',
        getCachedScript = function(url, callback) {
            callback = callback || function() {};
            $.ajax({
                url: cdn_src + url,
                dataType: "script",
                cache: true,
                success: callback
            });
        };
    var initImages = function() {
        function loadImageBG(object) {
            var imageUrl = object.data('image');
            var downloadingImage = $('<img>');
            downloadingImage.load(function() {
                object.attr('src', imageUrl);
            });
            downloadingImage.attr("src", imageUrl);
        }
        var image_wide = $elm.find('.card-de-videos-item-wide-foto');
        for (var a = 0; a < image_wide.length; a++) {
            loadImageBG($(image_wide[a]));
        }
        var images = $elm.find('.card-de-videos-item-foto');
        for (var b = 0; b < images.length; b++) {
            loadImageBG($(images[b]));
        }
        var timeout = setTimeout(function() {
            image_wide.css('height', 'auto');
            images.css('height', 'auto');
        }, 2000);
    };
    var initLightbox = function() {
        var init = function() {
            var videoElements = $elm.find('.gui-lightbox');
            for (var index = 0; index < videoElements.length; index++) {
                window.gui.lightbox.init(videoElements[index], {});
            }
        }
        if (!window.gui || !window.gui.lightbox) {
            getCachedScript('gui-lightbox/1.4.13/js/gui.lightbox.min.js', function() {
                if (!window.ShareBar) {
                    getCachedScript('share-bar/3.0.13/js/share.bar.min.js', function() {
                        init();
                    });
                } else {
                    init();
                }
            });
        } else {
            init();
        }
    }
    var truncateText = function() {
        function init() {
            $elm.find('.card-de-videos-item-text').dotdotdot({
                watch: 'window'
            });
        }
        if (!$.fn.dotdotdot) {
            getCachedScript('jQuery.dotdotdot/1.7.4/jquery.dotdotdot.min.js', function() {
                init();
            });
        } else {
            init();
        }
    };
    initImages();
    initLightbox();
    truncateText();
    return {};
};
(function(window, $) {
    'use strict';

    function loadImageBG(object) {
        var imageUrl = object.data('image');
        var downloadingImage = $('<img>');
        downloadingImage.load(function() {
            object.attr('src', imageUrl);
        });
        downloadingImage.attr("src", imageUrl);
    }
    var image_wide = $('.card-lista-item-wide-img');
    for (var a = 0; a < image_wide.length; a++) {
        loadImageBG($(image_wide[a]));
    }
    var images = $('.card-lista-item-img');
    for (var b = 0; b < images.length; b++) {
        loadImageBG($(images[b]));
    }
    var timeout = setTimeout(function() {
        image_wide.css('height', 'auto');
        images.css('height', 'auto');
    }, 2000);
    var cdn_src = 'http://s.glbimg.com/gl/cd/libs/',
        getCachedScript = function(url, callback) {
            callback = callback || function() {};
            $.ajax({
                url: cdn_src + url,
                dataType: 'script',
                cache: true,
                success: callback
            });
        },
        reallyLoaded = function(fn) {
            if (window.document.readyState == 'complete') {
                return fn();
            }
            if (window.addEventListener) {
                window.addEventListener('load', fn, false);
            } else if (window.attachEvent) {
                window.attachEvent('onload', fn);
            } else {
                window.onload = fn;
            }
        };
    reallyLoaded(function() {
        function truncateItemsText() {
            $('.card-lista-item-text, .card-lista-item-wide-text').dotdotdot({
                watch: 'window'
            });
        }
        if (!$.fn.dotdotdot) {
            getCachedScript('jQuery.dotdotdot/1.7.4/jquery.dotdotdot.min.js', function() {
                truncateItemsText();
            });
        } else {
            truncateItemsText();
        }
    });
})(window, jQuery);
(function(window, $) {
    'use strict';
    var src = 'http://s.glbimg.com/gl/cd/libs/';
    var getCachedScript = function(url, callback) {
        callback = callback || function() {};
        $.ajax({
            url: url,
            dataType: "script",
            cache: true,
            success: callback
        });
    };
    var lightbox = function lightbox(options) {
        if (!window.gui || !window.gui.lightbox) {
            getCachedScript(src + 'gui-lightbox/1.4.13/js/gui.lightbox.min.js', function() {
                if (!window.ShareBar) {
                    getCachedScript(src + 'share-bar/3.0.15/js/share.bar.min.js', function() {
                        window.gui.lightbox.init(options);
                    });
                } else {
                    window.gui.lightbox.init(options);
                }
            });
        } else {
            window.gui.lightbox.init(options);
        }
    };
    window.GUILightbox = function(context, options) {
        options = options || {};
        options.arg_busca = context.selector + ' ' + (options.arg_busca || '[data-video-id]');
        lightbox(options);
        console.warn('Method window.GUILightbox is deprecated, use gui.lightbox instead.');
    };
    $.fn.playerVideoLightBox = function(options) {
        options = options || {};
        options.arg_busca = $(this).selector + ' ' + (options.arg_busca || '[data-video-id]');
        lightbox(options);
        console.warn('Method $.playerVideoLightBox is deprecated, use gui.lightbox instead.');
        return this;
    };
})(window, jQuery);
(function() {
    var ShowTimeVideo, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };
    ShowTimeVideo = (function() {
        function ShowTimeVideo() {
            this.removeTracking = bind(this.removeTracking, this);
            this.trackClose = bind(this.trackClose, this);
            this.hidePopinTitle = bind(this.hidePopinTitle, this);
            this.trackShareBar = bind(this.trackShareBar, this);
            this.afterPopinOpen = bind(this.afterPopinOpen, this);
            this.trackLightBox = bind(this.trackLightBox, this);
            this.trackThis = bind(this.trackThis, this);
            this.lightBox = bind(this.lightBox, this);
            this.doc = document;
            this.lightBox();
        }
        ShowTimeVideo.prototype.lightBox = function() {
            if (window.gui && window.gui.lightbox) {
                return window.gui.lightbox.init({
                    onBeforeOpen: this.trackLightBox,
                    onAfterOpen: this.afterPopinOpen,
                    onBeforeClose: this.trackClose,
                    onAfterClose: this.removeTracking,
                    fbAppId: '289255557788943',
                    selector: '.destaque-showtime__highlight-video'
                });
            }
        };
        ShowTimeVideo.prototype.trackThis = function(el) {
            if (window.glb && window.glb.ElementTracker && jQuery) {
                return window.glb.ElementTracker.pushClick(jQuery(el));
            }
        };
        ShowTimeVideo.prototype.trackLightBox = function(el) {
            this.videoContainer = this.doc.getElementById("gui-lightbox-container");
            this.videoContainer.setAttribute('data-track-category', 'destaques');
            this.videoContainer.setAttribute('data-track-action', 'video');
            return this.trackThis(el);
        };
        ShowTimeVideo.prototype.afterPopinOpen = function(el) {
            this.trackShareBar(el);
            return this.hidePopinTitle();
        };
        ShowTimeVideo.prototype.trackShareBar = function(el) {
            var handleShare, share;
            share = this.doc.querySelector('.gui-lightbox-share-bar');
            share.setAttribute('data-url', el.getAttribute('data-short-url'));
            share.setAttribute('data-track-click', 'compartilhou');
            handleShare = (function(_this) {
                return function(ev) {
                    _this.trackThis(ev.target);
                    if (ev && ev.stopPropagation) {
                        return ev.stopPropagation();
                    }
                };
            })(this);
            share.addEventListener('click', handleShare);
            return share.addEventListener('touchend', handleShare);
        };
        ShowTimeVideo.prototype.hidePopinTitle = function() {
            var title;
            title = this.doc.querySelector("#gui-lightbox-container .lightbox-title");
            if (title) {
                return title.style.display = 'none';
            }
        };
        ShowTimeVideo.prototype.trackClose = function() {
            this.videoCloses = this.doc.querySelector('.lightbox-close');
            this.videoCloses.setAttribute('data-track-click', 'fechou');
            return this.trackThis(this.videoCloses);
        };
        ShowTimeVideo.prototype.removeTracking = function() {
            this.videoContainer.removeAttribute("data-track-category");
            this.videoContainer.removeAttribute("data-track-action");
            return this.videoCloses.removeAttribute("data-track-click");
        };
        return ShowTimeVideo;
    })();
    $(function() {
        return new ShowTimeVideo();
    });
}).call(this);
