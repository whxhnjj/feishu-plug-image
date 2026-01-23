var t = (function() {
  if ("undefined" != typeof Map) return Map;
  function t3(t4, e2) {
    var n2 = -1;
    return t4.some(function(t5, r2) {
      return t5[0] === e2 && (n2 = r2, true);
    }), n2;
  }
  return (function() {
    function e2() {
      this.__entries__ = [];
    }
    return Object.defineProperty(e2.prototype, "size", { get: function() {
      return this.__entries__.length;
    }, enumerable: true, configurable: true }), e2.prototype.get = function(e3) {
      var n2 = t3(this.__entries__, e3), r2 = this.__entries__[n2];
      return r2 && r2[1];
    }, e2.prototype.set = function(e3, n2) {
      var r2 = t3(this.__entries__, e3);
      ~r2 ? this.__entries__[r2][1] = n2 : this.__entries__.push([e3, n2]);
    }, e2.prototype.delete = function(e3) {
      var n2 = this.__entries__, r2 = t3(n2, e3);
      ~r2 && n2.splice(r2, 1);
    }, e2.prototype.has = function(e3) {
      return !!~t3(this.__entries__, e3);
    }, e2.prototype.clear = function() {
      this.__entries__.splice(0);
    }, e2.prototype.forEach = function(t4, e3) {
      void 0 === e3 && (e3 = null);
      for (var n2 = 0, r2 = this.__entries__; n2 < r2.length; n2++) {
        var i2 = r2[n2];
        t4.call(e3, i2[1], i2[0]);
      }
    }, e2;
  })();
})(), e = "undefined" != typeof window && "undefined" != typeof document && window.document === document, n = "undefined" != typeof global && global.Math === Math ? global : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(), r = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(n) : function(t3) {
  return setTimeout(function() {
    return t3(Date.now());
  }, 1e3 / 60);
};
var i = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], o = "undefined" != typeof MutationObserver, s = (function() {
  function t3() {
    this.connected_ = false, this.mutationEventsAdded_ = false, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = /* @__PURE__ */ (function(t4, e2) {
      var n2 = false, i2 = false, o2 = 0;
      function s2() {
        n2 && (n2 = false, t4()), i2 && a2();
      }
      function c2() {
        r(s2);
      }
      function a2() {
        var t5 = Date.now();
        if (n2) {
          if (t5 - o2 < 2) return;
          i2 = true;
        } else n2 = true, i2 = false, setTimeout(c2, e2);
        o2 = t5;
      }
      return a2;
    })(this.refresh.bind(this), 20);
  }
  return t3.prototype.addObserver = function(t4) {
    ~this.observers_.indexOf(t4) || this.observers_.push(t4), this.connected_ || this.connect_();
  }, t3.prototype.removeObserver = function(t4) {
    var e2 = this.observers_, n2 = e2.indexOf(t4);
    ~n2 && e2.splice(n2, 1), !e2.length && this.connected_ && this.disconnect_();
  }, t3.prototype.refresh = function() {
    this.updateObservers_() && this.refresh();
  }, t3.prototype.updateObservers_ = function() {
    var t4 = this.observers_.filter(function(t5) {
      return t5.gatherActive(), t5.hasActive();
    });
    return t4.forEach(function(t5) {
      return t5.broadcastActive();
    }), t4.length > 0;
  }, t3.prototype.connect_ = function() {
    e && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), o ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, { attributes: true, childList: true, characterData: true, subtree: true })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = true), this.connected_ = true);
  }, t3.prototype.disconnect_ = function() {
    e && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = false, this.connected_ = false);
  }, t3.prototype.onTransitionEnd_ = function(t4) {
    var e2 = t4.propertyName, n2 = void 0 === e2 ? "" : e2;
    i.some(function(t5) {
      return !!~n2.indexOf(t5);
    }) && this.refresh();
  }, t3.getInstance = function() {
    return this.instance_ || (this.instance_ = new t3()), this.instance_;
  }, t3.instance_ = null, t3;
})(), c = function(t3, e2) {
  for (var n2 = 0, r2 = Object.keys(e2); n2 < r2.length; n2++) {
    var i2 = r2[n2];
    Object.defineProperty(t3, i2, { value: e2[i2], enumerable: false, writable: false, configurable: true });
  }
  return t3;
}, a = function(t3) {
  return t3 && t3.ownerDocument && t3.ownerDocument.defaultView || n;
}, h = l(0, 0, 0, 0);
function u(t3) {
  return parseFloat(t3) || 0;
}
function f(t3) {
  for (var e2 = [], n2 = 1; n2 < arguments.length; n2++) e2[n2 - 1] = arguments[n2];
  return e2.reduce(function(e3, n3) {
    return e3 + u(t3["border-" + n3 + "-width"]);
  }, 0);
}
function d(t3) {
  var e2 = t3.clientWidth, n2 = t3.clientHeight;
  if (!e2 && !n2) return h;
  var r2 = a(t3).getComputedStyle(t3), i2 = (function(t4) {
    for (var e3 = {}, n3 = 0, r3 = ["top", "right", "bottom", "left"]; n3 < r3.length; n3++) {
      var i3 = r3[n3], o3 = t4["padding-" + i3];
      e3[i3] = u(o3);
    }
    return e3;
  })(r2), o2 = i2.left + i2.right, s2 = i2.top + i2.bottom, c2 = u(r2.width), d2 = u(r2.height);
  if ("border-box" === r2.boxSizing && (Math.round(c2 + o2) !== e2 && (c2 -= f(r2, "left", "right") + o2), Math.round(d2 + s2) !== n2 && (d2 -= f(r2, "top", "bottom") + s2)), !(function(t4) {
    return t4 === a(t4).document.documentElement;
  })(t3)) {
    var p2 = Math.round(c2 + o2) - e2, v2 = Math.round(d2 + s2) - n2;
    1 !== Math.abs(p2) && (c2 -= p2), 1 !== Math.abs(v2) && (d2 -= v2);
  }
  return l(i2.left, i2.top, c2, d2);
}
var p = "undefined" != typeof SVGGraphicsElement ? function(t3) {
  return t3 instanceof a(t3).SVGGraphicsElement;
} : function(t3) {
  return t3 instanceof a(t3).SVGElement && "function" == typeof t3.getBBox;
};
function v(t3) {
  return e ? p(t3) ? (function(t4) {
    var e2 = t4.getBBox();
    return l(0, 0, e2.width, e2.height);
  })(t3) : d(t3) : h;
}
function l(t3, e2, n2, r2) {
  return { x: t3, y: e2, width: n2, height: r2 };
}
var _ = (function() {
  function t3(t4) {
    this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = l(0, 0, 0, 0), this.target = t4;
  }
  return t3.prototype.isActive = function() {
    var t4 = v(this.target);
    return this.contentRect_ = t4, t4.width !== this.broadcastWidth || t4.height !== this.broadcastHeight;
  }, t3.prototype.broadcastRect = function() {
    var t4 = this.contentRect_;
    return this.broadcastWidth = t4.width, this.broadcastHeight = t4.height, t4;
  }, t3;
})(), b = function(t3, e2) {
  var n2, r2, i2, o2, s2, a2, h2, u2 = (r2 = (n2 = e2).x, i2 = n2.y, o2 = n2.width, s2 = n2.height, a2 = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, h2 = Object.create(a2.prototype), c(h2, { x: r2, y: i2, width: o2, height: s2, top: i2, right: r2 + o2, bottom: s2 + i2, left: r2 }), h2);
  c(this, { target: t3, contentRect: u2 });
}, m = (function() {
  function e2(e3, n2, r2) {
    if (this.activeObservations_ = [], this.observations_ = new t(), "function" != typeof e3) throw new TypeError("The callback provided as parameter 1 is not a function.");
    this.callback_ = e3, this.controller_ = n2, this.callbackCtx_ = r2;
  }
  return e2.prototype.observe = function(t3) {
    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
    if ("undefined" != typeof Element && Element instanceof Object) {
      if (!(t3 instanceof a(t3).Element)) throw new TypeError('parameter 1 is not of type "Element".');
      var e3 = this.observations_;
      e3.has(t3) || (e3.set(t3, new _(t3)), this.controller_.addObserver(this), this.controller_.refresh());
    }
  }, e2.prototype.unobserve = function(t3) {
    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
    if ("undefined" != typeof Element && Element instanceof Object) {
      if (!(t3 instanceof a(t3).Element)) throw new TypeError('parameter 1 is not of type "Element".');
      var e3 = this.observations_;
      e3.has(t3) && (e3.delete(t3), e3.size || this.controller_.removeObserver(this));
    }
  }, e2.prototype.disconnect = function() {
    this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
  }, e2.prototype.gatherActive = function() {
    var t3 = this;
    this.clearActive(), this.observations_.forEach(function(e3) {
      e3.isActive() && t3.activeObservations_.push(e3);
    });
  }, e2.prototype.broadcastActive = function() {
    if (this.hasActive()) {
      var t3 = this.callbackCtx_, e3 = this.activeObservations_.map(function(t4) {
        return new b(t4.target, t4.broadcastRect());
      });
      this.callback_.call(t3, e3, t3), this.clearActive();
    }
  }, e2.prototype.clearActive = function() {
    this.activeObservations_.splice(0);
  }, e2.prototype.hasActive = function() {
    return this.activeObservations_.length > 0;
  }, e2;
})(), y = "undefined" != typeof WeakMap ? /* @__PURE__ */ new WeakMap() : new t(), g = function t2(e2) {
  if (!(this instanceof t2)) throw new TypeError("Cannot call a class as a function.");
  if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
  var n2 = s.getInstance(), r2 = new m(e2, n2, this);
  y.set(this, r2);
};
["observe", "unobserve", "disconnect"].forEach(function(t3) {
  g.prototype[t3] = function() {
    var e2;
    return (e2 = y.get(this))[t3].apply(e2, arguments);
  };
});
var w = void 0 !== n.ResizeObserver ? n.ResizeObserver : g;
export {
  w as i
};
