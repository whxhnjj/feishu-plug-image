var t = function(t2) {
  return function(i2) {
    return Math.pow(i2, t2);
  };
}, i = function(t2) {
  return function(i2) {
    return 1 - Math.abs(Math.pow(i2 - 1, t2));
  };
}, n = function(n2) {
  return function(s2) {
    return s2 < 0.5 ? t(n2)(2 * s2) / 2 : i(n2)(2 * s2 - 1) / 2 + 0.5;
  };
}, s = t(2), e = i(2), r = n(2), a = t(3), h = i(3), u = n(3), o = t(4), d = i(4), f = n(4), c = t(5), m = i(5), l = n(5), p = function(t2) {
  var i2 = 7.5625, n2 = 2.75;
  return t2 < 1 / n2 ? i2 * t2 * t2 : t2 < 2 / n2 ? i2 * (t2 -= 1.5 / n2) * t2 + 0.75 : t2 < 2.5 / n2 ? i2 * (t2 -= 2.25 / n2) * t2 + 0.9375 : i2 * (t2 -= 2.625 / n2) * t2 + 0.984375;
}, I = function(t2) {
  return 1 - p(1 - t2);
}, O = Object.freeze({ linear: function(t2) {
  return t2;
}, quadIn: s, quadOut: e, quadInOut: r, cubicIn: a, cubicOut: h, cubicInOut: u, quartIn: o, quartOut: d, quartInOut: f, quintIn: c, quintOut: m, quintInOut: l, sineIn: function(t2) {
  return 1 + Math.sin(Math.PI / 2 * t2 - Math.PI / 2);
}, sineOut: function(t2) {
  return Math.sin(Math.PI / 2 * t2);
}, sineInOut: function(t2) {
  return (1 + Math.sin(Math.PI * t2 - Math.PI / 2)) / 2;
}, bounceOut: p, bounceIn: I, bounceInOut: function(t2) {
  return t2 < 0.5 ? 0.5 * I(2 * t2) : 0.5 * p(2 * t2 - 1) + 0.5;
} }), y = function(t2) {
  var i2 = t2.from, n2 = t2.to, s2 = t2.duration, e2 = t2.delay, r2 = t2.easing, a2 = t2.onStart, h2 = t2.onUpdate, u2 = t2.onFinish;
  for (var o2 in i2) void 0 === n2[o2] && (n2[o2] = i2[o2]);
  for (var d2 in n2) void 0 === i2[d2] && (i2[d2] = n2[d2]);
  this.from = i2, this.to = n2, this.duration = s2 || 500, this.delay = e2 || 0, this.easing = r2 || "linear", this.onStart = a2, this.onUpdate = h2 || function() {
  }, this.onFinish = u2, this.startTime = Date.now() + this.delay, this.started = false, this.finished = false, this.timer = null, this.keys = {};
};
y.prototype.update = function() {
  if (this.time = Date.now(), !(this.time < this.startTime || this.finished)) if (this.elapsed !== this.duration) {
    for (var t2 in this.elapsed = this.time - this.startTime, this.elapsed = this.elapsed > this.duration ? this.duration : this.elapsed, this.to) this.keys[t2] = this.from[t2] + (this.to[t2] - this.from[t2]) * O[this.easing](this.elapsed / this.duration);
    this.started || (this.onStart && this.onStart(this.keys), this.started = true), this.onUpdate(this.keys);
  } else this.finished || (this.finished = true, this.onFinish && this.onFinish(this.keys));
}, y.prototype.start = function() {
  var t2 = this;
  this.startTime = Date.now() + this.delay;
  var i2 = function() {
    t2.update(), t2.timer = requestAnimationFrame(i2), t2.finished && (cancelAnimationFrame(t2.timer), t2.timer = null);
  };
  i2();
}, y.prototype.stop = function() {
  cancelAnimationFrame(this.timer), this.timer = null;
};
export {
  y as T
};
