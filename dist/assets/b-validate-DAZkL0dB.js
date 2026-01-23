var t = Object.prototype.toString;
function e(e2) {
  return "[object Array]" === t.call(e2);
}
function i(e2) {
  return "[object Object]" === t.call(e2);
}
function n(e2) {
  return "[object String]" === t.call(e2);
}
function s(e2) {
  return "[object Function]" === t.call(e2);
}
function r(t2) {
  return null == t2 || "" === t2;
}
function a(t2) {
  return e(t2) && !t2.length;
}
var o = function(t2, e2) {
  if ("object" != typeof t2 || "object" != typeof e2) return t2 === e2;
  if (s(t2) && s(e2)) return t2 === e2 || t2.toString() === e2.toString();
  if (Object.keys(t2).length !== Object.keys(e2).length) return false;
  for (var i2 in t2) {
    if (!o(t2[i2], e2[i2])) return false;
  }
  return true;
}, h = function(t2, e2) {
  var n2 = Object.assign({}, t2);
  return Object.keys(e2 || {}).forEach(function(t3) {
    var s2 = n2[t3], r2 = null == e2 ? void 0 : e2[t3];
    n2[t3] = i(s2) ? Object.assign(Object.assign({}, s2), r2) : r2 || s2;
  }), n2;
}, l = "#{field} is not a #{type} type", u = { required: "#{field} is required", type: { ip: l, email: l, url: l, string: l, number: l, array: l, object: l, boolean: l }, number: { min: "`#{value}` is not greater than `#{min}`", max: "`#{value}` is not less than `#{max}`", equal: "`#{value}` is not equal to `#{equal}`", range: "`#{value}` is not in range `#{min} ~ #{max}`", positive: "`#{value}` is not a positive number", negative: "`#{value}` is not a negative number" }, string: { maxLength: "#{field} cannot be longer than #{maxLength} characters", minLength: "#{field} must be at least #{minLength} characters", length: "#{field} must be exactly #{length} characters", match: "`#{value}` does not match pattern #{pattern}", uppercase: "`#{value}` must be all uppercase", lowercase: "`#{value}` must be all lowercased" }, array: { length: "#{field} must be exactly #{length} in length", minLength: "#{field} cannot be less than #{minLength} in length", maxLength: "#{field} cannot be greater than #{maxLength} in length", includes: "#{field} is not includes #{includes}", deepEqual: "#{field} is not deep equal with #{deepEqual}", empty: "#{field} is not an empty array" }, object: { deepEqual: "#{field} is not deep equal to expected value", hasKeys: "#{field} does not contain required fields", empty: "#{field} is not an empty object" }, boolean: { true: "Expect true but got `#{value}`", false: "Expect false but got `#{value}`" } }, c = function(t2, r2) {
  var a2 = this;
  this.getValidateMsg = function(t3, r3) {
    void 0 === r3 && (r3 = {});
    var o2 = Object.assign(Object.assign({}, r3), { value: a2.obj, field: a2.field, type: a2.type }), h2 = (function(t4, e2) {
      for (var i2 = e2.split("."), n2 = t4, s2 = 0; s2 < i2.length; s2++) if (void 0 === (n2 = n2 && n2[i2[s2]])) return n2;
      return n2;
    })(a2.validateMessages, t3);
    return s(h2) ? h2(o2) : n(h2) ? h2.replace(/\#\{.+?\}/g, function(t4) {
      var n2 = t4.slice(2, -1);
      if (n2 in o2) {
        if (i(o2[n2]) || e(o2[n2])) try {
          return JSON.stringify(o2[n2]);
        } catch (t5) {
          return o2[n2];
        }
        return String(o2[n2]);
      }
      return t4;
    }) : h2;
  }, i(r2) && n(t2) && r2.trim ? this.obj = t2.trim() : i(r2) && r2.ignoreEmptyString && "" === t2 ? this.obj = void 0 : this.obj = t2, this.message = r2.message, this.type = r2.type, this.error = null, this.field = r2.field || r2.type, this.validateMessages = h(u, r2.validateMessages);
}, g = { not: { configurable: true }, isRequired: { configurable: true }, end: { configurable: true } };
g.not.get = function() {
  return this._not = !this._not, this;
}, g.isRequired.get = function() {
  if (r(this.obj) || a(this.obj)) {
    var t2 = this.getValidateMsg("required");
    this.error = { value: this.obj, type: this.type, requiredError: true, message: this.message || (i(t2) ? t2 : (this._not ? "[NOT MODE]:" : "") + t2) };
  }
  return this;
}, g.end.get = function() {
  return this.error;
}, c.prototype.addError = function(t2) {
  !this.error && t2 && (this.error = { value: this.obj, type: this.type, message: this.message || (i(t2) ? t2 : (this._not ? "[NOT MODE]:" : "") + t2) });
}, c.prototype.validate = function(t2, e2) {
  return (this._not ? t2 : !t2) && this.addError(e2), this;
}, c.prototype.collect = function(t2) {
  t2 && t2(this.error);
}, Object.defineProperties(c.prototype, g);
var p = (function(t2) {
  function e2(e3, i3) {
    t2.call(this, e3, Object.assign(Object.assign({}, i3), { type: "string" })), this.validate(!i3 || !i3.strict || n(this.obj), this.getValidateMsg("type.string"));
  }
  t2 && (e2.__proto__ = t2), e2.prototype = Object.create(t2 && t2.prototype), e2.prototype.constructor = e2;
  var i2 = { uppercase: { configurable: true }, lowercase: { configurable: true } };
  return e2.prototype.maxLength = function(t3) {
    return this.obj ? this.validate(this.obj.length <= t3, this.getValidateMsg("string.maxLength", { maxLength: t3 })) : this;
  }, e2.prototype.minLength = function(t3) {
    return this.obj ? this.validate(this.obj.length >= t3, this.getValidateMsg("string.minLength", { minLength: t3 })) : this;
  }, e2.prototype.length = function(t3) {
    return this.obj ? this.validate(this.obj.length === t3, this.getValidateMsg("string.length", { length: t3 })) : this;
  }, e2.prototype.match = function(t3) {
    var e3 = t3 instanceof RegExp;
    return e3 && (t3.lastIndex = 0), this.validate(void 0 === this.obj || e3 && t3.test(this.obj), this.getValidateMsg("string.match", { pattern: t3 }));
  }, i2.uppercase.get = function() {
    return this.obj ? this.validate(this.obj.toUpperCase() === this.obj, this.getValidateMsg("string.uppercase")) : this;
  }, i2.lowercase.get = function() {
    return this.obj ? this.validate(this.obj.toLowerCase() === this.obj, this.getValidateMsg("string.lowercase")) : this;
  }, Object.defineProperties(e2.prototype, i2), e2;
})(c), b = (function(e2) {
  function i2(i3, n3) {
    e2.call(this, i3, Object.assign(Object.assign({}, n3), { type: "number" })), this.validate(!n3 || !n3.strict || (function(e3) {
      return "[object Number]" === t.call(e3) && e3 == e3;
    })(this.obj), this.getValidateMsg("type.number"));
  }
  e2 && (i2.__proto__ = e2), i2.prototype = Object.create(e2 && e2.prototype), i2.prototype.constructor = i2;
  var n2 = { positive: { configurable: true }, negative: { configurable: true } };
  return i2.prototype.min = function(t2) {
    return r(this.obj) ? this : this.validate(this.obj >= t2, this.getValidateMsg("number.min", { min: t2 }));
  }, i2.prototype.max = function(t2) {
    return r(this.obj) ? this : this.validate(this.obj <= t2, this.getValidateMsg("number.max", { max: t2 }));
  }, i2.prototype.equal = function(t2) {
    return r(this.obj) ? this : this.validate(this.obj === t2, this.getValidateMsg("number.equal", { equal: t2 }));
  }, i2.prototype.range = function(t2, e3) {
    return r(this.obj) ? this : this.validate(this.obj >= t2 && this.obj <= e3, this.getValidateMsg("number.range", { min: t2, max: e3 }));
  }, n2.positive.get = function() {
    return r(this.obj) ? this : this.validate(this.obj > 0, this.getValidateMsg("number.positive"));
  }, n2.negative.get = function() {
    return r(this.obj) ? this : this.validate(this.obj < 0, this.getValidateMsg("number.negative"));
  }, Object.defineProperties(i2.prototype, n2), i2;
})(c), f = (function(t2) {
  function i2(i3, n3) {
    t2.call(this, i3, Object.assign(Object.assign({}, n3), { type: "array" })), this.validate(!n3 || !n3.strict || e(this.obj), this.getValidateMsg("type.array", { value: this.obj, type: this.type }));
  }
  t2 && (i2.__proto__ = t2), i2.prototype = Object.create(t2 && t2.prototype), i2.prototype.constructor = i2;
  var n2 = { empty: { configurable: true } };
  return i2.prototype.length = function(t3) {
    return this.obj ? this.validate(this.obj.length === t3, this.getValidateMsg("array.length", { value: this.obj, length: t3 })) : this;
  }, i2.prototype.minLength = function(t3) {
    return this.obj ? this.validate(this.obj.length >= t3, this.getValidateMsg("array.minLength", { value: this.obj, minLength: t3 })) : this;
  }, i2.prototype.maxLength = function(t3) {
    return this.obj ? this.validate(this.obj.length <= t3, this.getValidateMsg("array.maxLength", { value: this.obj, maxLength: t3 })) : this;
  }, i2.prototype.includes = function(t3) {
    var e2 = this;
    return this.obj ? this.validate(t3.every(function(t4) {
      return -1 !== e2.obj.indexOf(t4);
    }), this.getValidateMsg("array.includes", { value: this.obj, includes: t3 })) : this;
  }, i2.prototype.deepEqual = function(t3) {
    return this.obj ? this.validate(o(this.obj, t3), this.getValidateMsg("array.deepEqual", { value: this.obj, deepEqual: t3 })) : this;
  }, n2.empty.get = function() {
    return this.validate(a(this.obj), this.getValidateMsg("array.empty", { value: this.obj }));
  }, Object.defineProperties(i2.prototype, n2), i2;
})(c), d = (function(t2) {
  function e2(e3, n3) {
    t2.call(this, e3, Object.assign(Object.assign({}, n3), { type: "object" })), this.validate(!n3 || !n3.strict || i(this.obj), this.getValidateMsg("type.object"));
  }
  t2 && (e2.__proto__ = t2), e2.prototype = Object.create(t2 && t2.prototype), e2.prototype.constructor = e2;
  var n2 = { empty: { configurable: true } };
  return e2.prototype.deepEqual = function(t3) {
    return this.obj ? this.validate(o(this.obj, t3), this.getValidateMsg("object.deepEqual", { deepEqual: t3 })) : this;
  }, e2.prototype.hasKeys = function(t3) {
    var e3 = this;
    return this.obj ? this.validate(t3.every(function(t4) {
      return e3.obj[t4];
    }), this.getValidateMsg("object.hasKeys", { keys: t3 })) : this;
  }, n2.empty.get = function() {
    return this.validate(i(t3 = this.obj) && 0 === Object.keys(t3).length, this.getValidateMsg("object.empty"));
    var t3;
  }, Object.defineProperties(e2.prototype, n2), e2;
})(c), j = (function(e2) {
  function i2(i3, n3) {
    e2.call(this, i3, Object.assign(Object.assign({}, n3), { type: "boolean" })), this.validate(!n3 || !n3.strict || (function(e3) {
      return "[object Boolean]" === t.call(e3);
    })(this.obj), this.getValidateMsg("type.boolean"));
  }
  e2 && (i2.__proto__ = e2), i2.prototype = Object.create(e2 && e2.prototype), i2.prototype.constructor = i2;
  var n2 = { true: { configurable: true }, false: { configurable: true } };
  return n2.true.get = function() {
    return this.validate(true === this.obj, this.getValidateMsg("boolean.true"));
  }, n2.false.get = function() {
    return this.validate(false === this.obj, this.getValidateMsg("boolean.false"));
  }, Object.defineProperties(i2.prototype, n2), i2;
})(c), y = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, v = new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i"), m = /^(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}$/, O = (function(t2) {
  function e2(e3, i3) {
    t2.call(this, e3, Object.assign(Object.assign({}, i3), { type: "type" }));
  }
  t2 && (e2.__proto__ = t2), e2.prototype = Object.create(t2 && t2.prototype), e2.prototype.constructor = e2;
  var i2 = { email: { configurable: true }, url: { configurable: true }, ip: { configurable: true } };
  return i2.email.get = function() {
    return this.type = "email", this.validate(void 0 === this.obj || y.test(this.obj), this.getValidateMsg("type.email"));
  }, i2.url.get = function() {
    return this.type = "url", this.validate(void 0 === this.obj || v.test(this.obj), this.getValidateMsg("type.url"));
  }, i2.ip.get = function() {
    return this.type = "ip", this.validate(void 0 === this.obj || m.test(this.obj), this.getValidateMsg("type.ip"));
  }, Object.defineProperties(e2.prototype, i2), e2;
})(c), M = (function(t2) {
  function e2(e3, i3) {
    t2.call(this, e3, Object.assign(Object.assign({}, i3), { type: "custom" }));
  }
  t2 && (e2.__proto__ = t2), e2.prototype = Object.create(t2 && t2.prototype), e2.prototype.constructor = e2;
  var i2 = { validate: { configurable: true } };
  return i2.validate.get = function() {
    var t3 = this;
    return function(e3, i3) {
      var n2;
      if (e3) return (n2 = e3(t3.obj, t3.addError.bind(t3))) && n2.then ? (i3 && n2.then(function() {
        i3 && i3(t3.error);
      }, function(t4) {
      }), [n2, t3]) : (i3 && i3(t3.error), t3.error);
    };
  }, Object.defineProperties(e2.prototype, i2), e2;
})(c), _ = function(t2, e2) {
  return new V(t2, Object.assign({ field: "value" }, e2));
};
_.globalConfig = {}, _.setGlobalConfig = function(t2) {
  _.globalConfig = t2 || {};
};
var V = function(t2, e2) {
  var i2 = _.globalConfig, n2 = Object.assign(Object.assign(Object.assign({}, i2), e2), { validateMessages: h(i2.validateMessages, e2.validateMessages) });
  this.string = new p(t2, n2), this.number = new b(t2, n2), this.array = new f(t2, n2), this.object = new d(t2, n2), this.boolean = new j(t2, n2), this.type = new O(t2, n2), this.custom = new M(t2, n2);
}, E = function(t2, e2) {
  void 0 === e2 && (e2 = {}), this.schema = t2, this.options = e2;
};
E.prototype.messages = function(t2) {
  this.options = Object.assign(Object.assign({}, this.options), { validateMessages: h(this.options.validateMessages, t2) });
}, E.prototype.validate = function(t2, n2) {
  var s2 = this;
  if (i(t2)) {
    var r2 = [], a2 = null;
    this.schema && Object.keys(this.schema).forEach(function(i2) {
      if (e(s2.schema[i2])) for (var n3 = function(e2) {
        var n4 = s2.schema[i2][e2], h3 = n4.type, l2 = n4.message;
        if (!h3 && !n4.validator) throw "You must specify a type to field " + i2 + "!";
        var u2 = Object.assign(Object.assign({}, s2.options), { message: l2, field: i2 });
        "ignoreEmptyString" in n4 && (u2.ignoreEmptyString = n4.ignoreEmptyString), "strict" in n4 && (u2.strict = n4.strict);
        var c2 = new V(t2[i2], u2), g2 = c2.type[h3] || null;
        if (!g2) {
          if (n4.validator) return g2 = c2.custom.validate(n4.validator), void ("[object Array]" === Object.prototype.toString.call(g2) && g2[0].then ? r2.push({ function: g2[0], _this: g2[1], key: i2 }) : g2 && o2(i2, g2));
          g2 = c2[h3];
        }
        if (Object.keys(n4).forEach(function(t3) {
          n4.required && (g2 = g2.isRequired), "message" !== t3 && g2[t3] && n4[t3] && "object" == typeof g2[t3] && (g2 = g2[t3]), g2[t3] && void 0 !== n4[t3] && "function" == typeof g2[t3] && (g2 = g2[t3](n4[t3]));
        }), g2.collect(function(t3) {
          t3 && o2(i2, t3);
        }), a2) return "break";
      }, h2 = 0; h2 < s2.schema[i2].length; h2++) {
        if ("break" === n3(h2)) break;
      }
    }), r2.length > 0 ? Promise.all(r2.map(function(t3) {
      return t3.function;
    })).then(function() {
      r2.forEach(function(t3) {
        t3._this.error && o2(t3.key, t3._this.error);
      }), n2 && n2(a2);
    }) : n2 && n2(a2);
  }
  function o2(t3, e2) {
    a2 || (a2 = {}), a2[t3] && !e2.requiredError || (a2[t3] = e2);
  }
};
export {
  E as S
};
