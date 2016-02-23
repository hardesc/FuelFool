/*
Copyright (c) 2015, Mapbox

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

/*
MODIFIED 22 Feb 2016:

Instead of flyTo() being used to move to new location, jumpTo() is used.
This was done to alleviate burden on mobile browsers.

lines 3191, 3206
*/
! function e(t, n, r) {
    function i(s, u) {
        if (!n[s]) {
            if (!t[s]) {
                var c = "function" == typeof require && require;
                if (!u && c) return c(s, !0);
                if (o) return o(s, !0);
                var a = new Error("Cannot find module '" + s + "'");
                throw a.code = "MODULE_NOT_FOUND", a
            }
            var f = n[s] = {
                exports: {}
            };
            t[s][0].call(f.exports, function(e) {
                var n = t[s][1][e];
                return i(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[s].exports
    }
    for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);
    return i
}({
    1: [function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        var i = e("./src/geocoder"),
            o = r(i);
        window.mapboxgl ? mapboxgl.Geocoder = o["default"] : "undefined" != typeof t && (t.exports = o["default"])
    }, {
        "./src/geocoder": 65
    }],
    2: [function(e, t, n) {
        function r(e, t) {
            return d.isUndefined(t) ? "" + t : d.isNumber(t) && !isFinite(t) ? t.toString() : d.isFunction(t) || d.isRegExp(t) ? t.toString() : t
        }

        function i(e, t) {
            return d.isString(e) ? e.length < t ? e : e.slice(0, t) : e
        }

        function o(e) {
            return i(JSON.stringify(e.actual, r), 128) + " " + e.operator + " " + i(JSON.stringify(e.expected, r), 128)
        }

        function s(e, t, n, r, i) {
            throw new y.AssertionError({
                message: n,
                actual: e,
                expected: t,
                operator: r,
                stackStartFunction: i
            })
        }

        function u(e, t) {
            e || s(e, !0, t, "==", y.ok)
        }

        function c(e, t) {
            if (e === t) return !0;
            if (d.isBuffer(e) && d.isBuffer(t)) {
                if (e.length != t.length) return !1;
                for (var n = 0; n < e.length; n++)
                    if (e[n] !== t[n]) return !1;
                return !0
            }
            return d.isDate(e) && d.isDate(t) ? e.getTime() === t.getTime() : d.isRegExp(e) && d.isRegExp(t) ? e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase : d.isObject(e) || d.isObject(t) ? f(e, t) : e == t
        }

        function a(e) {
            return "[object Arguments]" == Object.prototype.toString.call(e)
        }

        function f(e, t) {
            if (d.isNullOrUndefined(e) || d.isNullOrUndefined(t)) return !1;
            if (e.prototype !== t.prototype) return !1;
            if (d.isPrimitive(e) || d.isPrimitive(t)) return e === t;
            var n = a(e),
                r = a(t);
            if (n && !r || !n && r) return !1;
            if (n) return e = h.call(e), t = h.call(t), c(e, t);
            var i, o, s = v(e),
                u = v(t);
            if (s.length != u.length) return !1;
            for (s.sort(), u.sort(), o = s.length - 1; o >= 0; o--)
                if (s[o] != u[o]) return !1;
            for (o = s.length - 1; o >= 0; o--)
                if (i = s[o], !c(e[i], t[i])) return !1;
            return !0
        }

        function p(e, t) {
            return e && t ? "[object RegExp]" == Object.prototype.toString.call(t) ? t.test(e) : e instanceof t ? !0 : t.call({}, e) === !0 ? !0 : !1 : !1
        }

        function l(e, t, n, r) {
            var i;
            d.isString(n) && (r = n, n = null);
            try {
                t()
            } catch (o) {
                i = o
            }
            if (r = (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : "."), e && !i && s(i, n, "Missing expected exception" + r), !e && p(i, n) && s(i, n, "Got unwanted exception" + r), e && i && n && !p(i, n) || !e && i) throw i
        }
        var d = e("util/"),
            h = Array.prototype.slice,
            m = Object.prototype.hasOwnProperty,
            y = t.exports = u;
        y.AssertionError = function(e) {
            this.name = "AssertionError", this.actual = e.actual, this.expected = e.expected, this.operator = e.operator, e.message ? (this.message = e.message, this.generatedMessage = !1) : (this.message = o(this), this.generatedMessage = !0);
            var t = e.stackStartFunction || s;
            if (Error.captureStackTrace) Error.captureStackTrace(this, t);
            else {
                var n = new Error;
                if (n.stack) {
                    var r = n.stack,
                        i = t.name,
                        u = r.indexOf("\n" + i);
                    if (u >= 0) {
                        var c = r.indexOf("\n", u + 1);
                        r = r.substring(c + 1)
                    }
                    this.stack = r
                }
            }
        }, d.inherits(y.AssertionError, Error), y.fail = s, y.ok = u, y.equal = function(e, t, n) {
            e != t && s(e, t, n, "==", y.equal)
        }, y.notEqual = function(e, t, n) {
            e == t && s(e, t, n, "!=", y.notEqual)
        }, y.deepEqual = function(e, t, n) {
            c(e, t) || s(e, t, n, "deepEqual", y.deepEqual)
        }, y.notDeepEqual = function(e, t, n) {
            c(e, t) && s(e, t, n, "notDeepEqual", y.notDeepEqual)
        }, y.strictEqual = function(e, t, n) {
            e !== t && s(e, t, n, "===", y.strictEqual)
        }, y.notStrictEqual = function(e, t, n) {
            e === t && s(e, t, n, "!==", y.notStrictEqual)
        }, y["throws"] = function(e, t, n) {
            l.apply(this, [!0].concat(h.call(arguments)))
        }, y.doesNotThrow = function(e, t) {
            l.apply(this, [!1].concat(h.call(arguments)))
        }, y.ifError = function(e) {
            if (e) throw e
        };
        var v = Object.keys || function(e) {
            var t = [];
            for (var n in e) m.call(e, n) && t.push(n);
            return t
        }
    }, {
        "util/": 7
    }],
    3: [function(e, t, n) {
        function r() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function i(e) {
            return "function" == typeof e
        }

        function o(e) {
            return "number" == typeof e
        }

        function s(e) {
            return "object" == typeof e && null !== e
        }

        function u(e) {
            return void 0 === e
        }
        t.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(e) {
            if (!o(e) || 0 > e || isNaN(e)) throw TypeError("n must be a positive number");
            return this._maxListeners = e, this
        }, r.prototype.emit = function(e) {
            var t, n, r, o, c, a;
            if (this._events || (this._events = {}), "error" === e && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
                if (t = arguments[1], t instanceof Error) throw t;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if (n = this._events[e], u(n)) return !1;
            if (i(n)) switch (arguments.length) {
                case 1:
                    n.call(this);
                    break;
                case 2:
                    n.call(this, arguments[1]);
                    break;
                case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    for (r = arguments.length, o = new Array(r - 1), c = 1; r > c; c++) o[c - 1] = arguments[c];
                    n.apply(this, o)
            } else if (s(n)) {
                for (r = arguments.length, o = new Array(r - 1), c = 1; r > c; c++) o[c - 1] = arguments[c];
                for (a = n.slice(), r = a.length, c = 0; r > c; c++) a[c].apply(this, o)
            }
            return !0
        }, r.prototype.addListener = function(e, t) {
            var n;
            if (!i(t)) throw TypeError("listener must be a function");
            if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, i(t.listener) ? t.listener : t), this._events[e] ? s(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, s(this._events[e]) && !this._events[e].warned) {
                var n;
                n = u(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners, n && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())
            }
            return this
        }, r.prototype.on = r.prototype.addListener, r.prototype.once = function(e, t) {
            function n() {
                this.removeListener(e, n), r || (r = !0, t.apply(this, arguments))
            }
            if (!i(t)) throw TypeError("listener must be a function");
            var r = !1;
            return n.listener = t, this.on(e, n), this
        }, r.prototype.removeListener = function(e, t) {
            var n, r, o, u;
            if (!i(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (n = this._events[e], o = n.length, r = -1, n === t || i(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
            else if (s(n)) {
                for (u = o; u-- > 0;)
                    if (n[u] === t || n[u].listener && n[u].listener === t) {
                        r = u;
                        break
                    }
                if (0 > r) return this;
                1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", e, t)
            }
            return this
        }, r.prototype.removeAllListeners = function(e) {
            var t, n;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
            if (0 === arguments.length) {
                for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (n = this._events[e], i(n)) this.removeListener(e, n);
            else
                for (; n.length;) this.removeListener(e, n[n.length - 1]);
            return delete this._events[e], this
        }, r.prototype.listeners = function(e) {
            var t;
            return t = this._events && this._events[e] ? i(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
        }, r.listenerCount = function(e, t) {
            var n;
            return n = e._events && e._events[t] ? i(e._events[t]) ? 1 : e._events[t].length : 0
        }
    }, {}],
    4: [function(e, t, n) {
        "function" == typeof Object.create ? t.exports = function(e, t) {
            e.super_ = t, e.prototype = Object.create(t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : t.exports = function(e, t) {
            e.super_ = t;
            var n = function() {};
            n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
        }
    }, {}],
    5: [function(e, t, n) {
        function r() {
            f = !1, u.length ? a = u.concat(a) : p = -1, a.length && i()
        }

        function i() {
            if (!f) {
                var e = setTimeout(r);
                f = !0;
                for (var t = a.length; t;) {
                    for (u = a, a = []; ++p < t;) u && u[p].run();
                    p = -1, t = a.length
                }
                u = null, f = !1, clearTimeout(e)
            }
        }

        function o(e, t) {
            this.fun = e, this.array = t
        }

        function s() {}
        var u, c = t.exports = {},
            a = [],
            f = !1,
            p = -1;
        c.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            a.push(new o(e, t)), 1 !== a.length || f || setTimeout(i, 0)
        }, o.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = s, c.addListener = s, c.once = s, c.off = s, c.removeListener = s, c.removeAllListeners = s, c.emit = s, c.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, c.cwd = function() {
            return "/"
        }, c.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, c.umask = function() {
            return 0
        }
    }, {}],
    6: [function(e, t, n) {
        t.exports = function(e) {
            return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8
        }
    }, {}],
    7: [function(e, t, n) {
        (function(t, r) {
            function i(e, t) {
                var r = {
                    seen: [],
                    stylize: s
                };
                return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), m(t) ? r.showHidden = t : t && n._extend(r, t), _(r.showHidden) && (r.showHidden = !1), _(r.depth) && (r.depth = 2), _(r.colors) && (r.colors = !1), _(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = o), c(r, e, r.depth)
            }

            function o(e, t) {
                var n = i.styles[t];
                return n ? "[" + i.colors[n][0] + "m" + e + "[" + i.colors[n][1] + "m" : e
            }

            function s(e, t) {
                return e
            }

            function u(e) {
                var t = {};
                return e.forEach(function(e, n) {
                    t[e] = !0
                }), t
            }

            function c(e, t, r) {
                if (e.customInspect && t && O(t.inspect) && t.inspect !== n.inspect && (!t.constructor || t.constructor.prototype !== t)) {
                    var i = t.inspect(r, e);
                    return w(i) || (i = c(e, i, r)), i
                }
                var o = a(e, t);
                if (o) return o;
                var s = Object.keys(t),
                    m = u(s);
                if (e.showHidden && (s = Object.getOwnPropertyNames(t)), T(t) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0)) return f(t);
                if (0 === s.length) {
                    if (O(t)) {
                        var y = t.name ? ": " + t.name : "";
                        return e.stylize("[Function" + y + "]", "special")
                    }
                    if (x(t)) return e.stylize(RegExp.prototype.toString.call(t), "regexp");
                    if (j(t)) return e.stylize(Date.prototype.toString.call(t), "date");
                    if (T(t)) return f(t)
                }
                var v = "",
                    g = !1,
                    b = ["{", "}"];
                if (h(t) && (g = !0, b = ["[", "]"]), O(t)) {
                    var _ = t.name ? ": " + t.name : "";
                    v = " [Function" + _ + "]"
                }
                if (x(t) && (v = " " + RegExp.prototype.toString.call(t)), j(t) && (v = " " + Date.prototype.toUTCString.call(t)), T(t) && (v = " " + f(t)), 0 === s.length && (!g || 0 == t.length)) return b[0] + v + b[1];
                if (0 > r) return x(t) ? e.stylize(RegExp.prototype.toString.call(t), "regexp") : e.stylize("[Object]", "special");
                e.seen.push(t);
                var E;
                return E = g ? p(e, t, r, m, s) : s.map(function(n) {
                    return l(e, t, r, m, n, g)
                }), e.seen.pop(), d(E, v, b)
            }

            function a(e, t) {
                if (_(t)) return e.stylize("undefined", "undefined");
                if (w(t)) {
                    var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(n, "string")
                }
                return g(t) ? e.stylize("" + t, "number") : m(t) ? e.stylize("" + t, "boolean") : y(t) ? e.stylize("null", "null") : void 0
            }

            function f(e) {
                return "[" + Error.prototype.toString.call(e) + "]"
            }

            function p(e, t, n, r, i) {
                for (var o = [], s = 0, u = t.length; u > s; ++s) C(t, String(s)) ? o.push(l(e, t, n, r, String(s), !0)) : o.push("");
                return i.forEach(function(i) {
                    i.match(/^\d+$/) || o.push(l(e, t, n, r, i, !0))
                }), o
            }

            function l(e, t, n, r, i, o) {
                var s, u, a;
                if (a = Object.getOwnPropertyDescriptor(t, i) || {
                        value: t[i]
                    }, a.get ? u = a.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : a.set && (u = e.stylize("[Setter]", "special")), C(r, i) || (s = "[" + i + "]"), u || (e.seen.indexOf(a.value) < 0 ? (u = y(n) ? c(e, a.value, null) : c(e, a.value, n - 1), u.indexOf("\n") > -1 && (u = o ? u.split("\n").map(function(e) {
                        return "  " + e
                    }).join("\n").substr(2) : "\n" + u.split("\n").map(function(e) {
                        return "   " + e
                    }).join("\n"))) : u = e.stylize("[Circular]", "special")), _(s)) {
                    if (o && i.match(/^\d+$/)) return u;
                    s = JSON.stringify("" + i), s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
                }
                return s + ": " + u
            }

            function d(e, t, n) {
                var r = 0,
                    i = e.reduce(function(e, t) {
                        return r++, t.indexOf("\n") >= 0 && r++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
                    }, 0);
                return i > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]
            }

            function h(e) {
                return Array.isArray(e)
            }

            function m(e) {
                return "boolean" == typeof e
            }

            function y(e) {
                return null === e
            }

            function v(e) {
                return null == e
            }

            function g(e) {
                return "number" == typeof e
            }

            function w(e) {
                return "string" == typeof e
            }

            function b(e) {
                return "symbol" == typeof e
            }

            function _(e) {
                return void 0 === e
            }

            function x(e) {
                return E(e) && "[object RegExp]" === S(e)
            }

            function E(e) {
                return "object" == typeof e && null !== e
            }

            function j(e) {
                return E(e) && "[object Date]" === S(e)
            }

            function T(e) {
                return E(e) && ("[object Error]" === S(e) || e instanceof Error)
            }

            function O(e) {
                return "function" == typeof e
            }

            function A(e) {
                return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
            }

            function S(e) {
                return Object.prototype.toString.call(e)
            }

            function L(e) {
                return 10 > e ? "0" + e.toString(10) : e.toString(10)
            }

            function k() {
                var e = new Date,
                    t = [L(e.getHours()), L(e.getMinutes()), L(e.getSeconds())].join(":");
                return [e.getDate(), D[e.getMonth()], t].join(" ")
            }

            function C(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
            var R = /%[sdj%]/g;
            n.format = function(e) {
                if (!w(e)) {
                    for (var t = [], n = 0; n < arguments.length; n++) t.push(i(arguments[n]));
                    return t.join(" ")
                }
                for (var n = 1, r = arguments, o = r.length, s = String(e).replace(R, function(e) {
                        if ("%%" === e) return "%";
                        if (n >= o) return e;
                        switch (e) {
                            case "%s":
                                return String(r[n++]);
                            case "%d":
                                return Number(r[n++]);
                            case "%j":
                                try {
                                    return JSON.stringify(r[n++])
                                } catch (t) {
                                    return "[Circular]"
                                }
                            default:
                                return e
                        }
                    }), u = r[n]; o > n; u = r[++n]) s += y(u) || !E(u) ? " " + u : " " + i(u);
                return s
            }, n.deprecate = function(e, i) {
                function o() {
                    if (!s) {
                        if (t.throwDeprecation) throw new Error(i);
                        t.traceDeprecation ? console.trace(i) : console.error(i), s = !0
                    }
                    return e.apply(this, arguments)
                }
                if (_(r.process)) return function() {
                    return n.deprecate(e, i).apply(this, arguments)
                };
                if (t.noDeprecation === !0) return e;
                var s = !1;
                return o
            };
            var P, q = {};
            n.debuglog = function(e) {
                if (_(P) && (P = t.env.NODE_DEBUG || ""), e = e.toUpperCase(), !q[e])
                    if (new RegExp("\\b" + e + "\\b", "i").test(P)) {
                        var r = t.pid;
                        q[e] = function() {
                            var t = n.format.apply(n, arguments);
                            console.error("%s %d: %s", e, r, t)
                        }
                    } else q[e] = function() {};
                return q[e]
            }, n.inspect = i, i.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            }, i.styles = {
                special: "cyan",
                number: "yellow",
                "boolean": "yellow",
                undefined: "grey",
                "null": "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, n.isArray = h, n.isBoolean = m, n.isNull = y, n.isNullOrUndefined = v, n.isNumber = g, n.isString = w, n.isSymbol = b, n.isUndefined = _, n.isRegExp = x, n.isObject = E, n.isDate = j, n.isError = T, n.isFunction = O, n.isPrimitive = A, n.isBuffer = e("./support/isBuffer");
            var D = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            n.log = function() {
                console.log("%s - %s", k(), n.format.apply(n, arguments))
            }, n.inherits = e("inherits"), n._extend = function(e, t) {
                if (!t || !E(t)) return e;
                for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];
                return e
            }
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "./support/isBuffer": 6,
        _process: 5,
        inherits: 4
    }],
    8: [function(e, t, n) {
        function r(e, t, n) {
            function r() {
                v && clearTimeout(v), d && clearTimeout(d), w = 0, d = v = g = void 0
            }

            function o(t, n) {
                n && clearTimeout(n), d = v = g = void 0, t && (w = a(), h = e.apply(y, l), v || d || (l = y = void 0))
            }

            function c() {
                var e = t - (a() - m);
                0 >= e || e > t ? o(g, d) : v = setTimeout(c, e)
            }

            function f() {
                o(_, v)
            }

            function p() {
                if (l = arguments, m = a(), y = this, g = _ && (v || !x), b === !1) var n = x && !v;
                else {
                    d || x || (w = m);
                    var r = b - (m - w),
                        i = 0 >= r || r > b;
                    i ? (d && (d = clearTimeout(d)), w = m, h = e.apply(y, l)) : d || (d = setTimeout(f, r))
                }
                return i && v ? v = clearTimeout(v) : v || t === b || (v = setTimeout(c, t)), n && (i = !0, h = e.apply(y, l)), !i || v || d || (l = y = void 0), h
            }
            var l, d, h, m, y, v, g, w = 0,
                b = !1,
                _ = !0;
            if ("function" != typeof e) throw new TypeError(s);
            if (t = 0 > t ? 0 : +t || 0, n === !0) {
                var x = !0;
                _ = !1
            } else i(n) && (x = !!n.leading, b = "maxWait" in n && u(+n.maxWait || 0, t), _ = "trailing" in n ? !!n.trailing : _);
            return p.cancel = r, p
        }

        function i(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }
        var o = e("lodash._getnative"),
            s = "Expected a function",
            u = Math.max,
            c = o(Date, "now"),
            a = c || function() {
                return (new Date).getTime()
            };
        t.exports = r
    }, {
        "lodash._getnative": 9
    }],
    9: [function(e, t, n) {
        function r(e) {
            return !!e && "object" == typeof e
        }

        function i(e, t) {
            var n = null == e ? void 0 : e[t];
            return u(n) ? n : void 0
        }

        function o(e) {
            return s(e) && d.call(e) == c
        }

        function s(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }

        function u(e) {
            return null == e ? !1 : o(e) ? h.test(p.call(e)) : r(e) && a.test(e)
        }
        var c = "[object Function]",
            a = /^\[object .+?Constructor\]$/,
            f = Object.prototype,
            p = Function.prototype.toString,
            l = f.hasOwnProperty,
            d = f.toString,
            h = RegExp("^" + p.call(l).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        t.exports = i
    }, {}],
    10: [function(e, t, n) {
        "use strict";
        t.exports = function(e) {
            return window.atob(e)
        }
    }, {}],
    11: [function(e, t, n) {
        "use strict";
        var r = e("rest/interceptor"),
            i = r({
                success: function(e) {
                    var t = e && e.request,
                        n = t && t.callback;
                    return "function" == typeof n && n(null, e.entity), e
                },
                error: function(e) {
                    var t = e && e.request,
                        n = t && t.callback;
                    if ("function" == typeof n) {
                        var r = e.error || e.entity;
                        "object" != typeof r && (r = new Error(r)), n(r)
                    }
                    return e
                }
            });
        t.exports = i
    }, {
        "rest/interceptor": 22
    }],
    12: [function(e, t, n) {
        "use strict";
        var r = e("rest"),
            i = e("./callbackify");
        t.exports = function(t) {
            return r.wrap(e("rest/interceptor/errorCode")).wrap(e("rest/interceptor/pathPrefix"), {
                prefix: t.endpoint
            }).wrap(e("rest/interceptor/mime"), {
                mime: "application/json"
            }).wrap(e("rest/interceptor/defaultRequest"), {
                params: {
                    access_token: t.accessToken
                }
            }).wrap(e("rest/interceptor/template")).wrap(i)
        }
    }, {
        "./callbackify": 11,
        rest: 18,
        "rest/interceptor/defaultRequest": 23,
        "rest/interceptor/errorCode": 24,
        "rest/interceptor/mime": 25,
        "rest/interceptor/pathPrefix": 26,
        "rest/interceptor/template": 27
    }],
    13: [function(e, t, n) {
        t.exports.DEFAULT_ENDPOINT = "https://api.mapbox.com", t.exports.API_GEOCODER_FORWARD = "/geocoding/v5/{dataset}/{query}.json{?proximity,country,types}", t.exports.API_GEOCODER_REVERSE = "/geocoding/v5/{dataset}/{longitude},{latitude}.json{?types}", t.exports.API_DIRECTIONS = "/v4/directions/{profile}/{encodedWaypoints}.json{?alternatives,instructions,geometry,steps}", t.exports.API_DISTANCE = "/distances/v1/mapbox/{profile}", t.exports.API_SURFACE = "/v4/surface/{mapid}.json{?layer,fields,points,geojson,interpolate,encoded_polyline}", t.exports.API_UPLOADS = "/uploads/v1/{owner}", t.exports.API_UPLOAD = "/uploads/v1/{owner}/{upload}", t.exports.API_UPLOAD_CREDENTIALS = "/uploads/v1/{owner}/credentials", t.exports.API_MATCHING = "/matching/v4/{profile}.json", t.exports.API_DATASET_DATASETS = "/datasets/v1/{owner}", t.exports.API_DATASET_DATASET = "/datasets/v1/{owner}/{dataset}", t.exports.API_DATASET_FEATURES = "/datasets/v1/{owner}/{dataset}/features{?reverse,limit,start}", t.exports.API_DATASET_FEATURE = "/datasets/v1/{owner}/{dataset}/features/{id}", t.exports.API_TILESTATS_STATISTICS = "/tilestats/v1/{owner}/{tileset}", t.exports.API_TILESTATS_LAYER = "/tilestats/v1/{owner}/{tileset}/{layer}", t.exports.API_TILESTATS_ATTRIBUTE = "/tilestats/v1/{owner}/{tileset}/{layer}/{attribute}", t.exports.API_STATIC = "/v4/{mapid}{+overlay}/{+xyz}/{width}x{height}{+retina}{.format}"
    }, {}],
    14: [function(e, t, n) {
        (function(n) {
            "use strict";

            function r(e) {
                var t = e.split(".")[1];
                if (!t) return null;
                if (t = t.replace(/-/g, "+").replace(/_/g, "/"), n.browser) t = t.replace(/=/g, "");
                else {
                    var r = t.length % 4;
                    if (2 === r && (t += "=="), 3 === r && (t += "="), 1 === r || r > 3) return null
                }
                try {
                    return JSON.parse(i(t)).u
                } catch (o) {
                    return null
                }
            }
            var i = e("atob");
            t.exports = r
        }).call(this, e("_process"))
    }, {
        _process: 5,
        atob: 10
    }],
    15: [function(e, t, n) {
        "use strict";

        function r(e) {
            function t(t, n) {
                this.name = e, i("string" == typeof t, "accessToken required to instantiate Mapbox client");
                var r = o.DEFAULT_ENDPOINT;
                void 0 !== n && (i("object" == typeof n, "options must be an object"), n.endpoint && (i("string" == typeof n.endpoint, "endpoint must be a string"), r = n.endpoint), n.account && (i("string" == typeof n.account, "account must be a string"), this.owner = n.account)), this.client = s({
                    endpoint: r,
                    accessToken: t
                }), this.accessToken = t, this.endpoint = r, this.owner = this.owner || u(t), i(!!this.owner, "could not determine account from provided accessToken")
            }
            return t
        }
        var i = e("assert"),
            o = e("./constants"),
            s = e("./client"),
            u = e("./get_user");
        t.exports = r
    }, {
        "./client": 12,
        "./constants": 13,
        "./get_user": 14,
        assert: 2
    }],
    16: [function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n = Math.pow(10, t);
            return Math.round(e * n) / n
        }
        var i = e("assert"),
            o = e("../make_service"),
            s = e("../constants"),
            u = o("MapboxGeocoder"),
            c = 5,
            a = 3;
        u.prototype.geocodeForward = function(e, t, n) {
            void 0 === n && "function" == typeof t && (n = t, t = {}), i("string" == typeof e, "query must be a string"), i("object" == typeof t, "options must be an object"), i("function" == typeof n, "callback must be a function");
            var o = {
                    query: e,
                    dataset: "mapbox.places"
                },
                u = a;
            t.precision && (i("number" == typeof t.precision, "precision option must be number"), u = t.precision), t.proximity && (i("number" == typeof t.proximity.latitude && "number" == typeof t.proximity.longitude, "proximity must be an object with numeric latitude & longitude properties"), o.proximity = r(t.proximity.longitude, u) + "," + r(t.proximity.latitude, u)), t.dataset && (i("string" == typeof t.dataset, "dataset option must be string"), o.dataset = t.dataset), t.country && (i("string" == typeof t.country, "country option must be string"), o.country = t.country), t.types && (i("string" == typeof t.types, "types option must be string"), o.types = t.types), this.client({
                path: s.API_GEOCODER_FORWARD,
                params: o,
                callback: n
            })
        }, u.prototype.geocodeReverse = function(e, t, n) {
            void 0 === n && "function" == typeof t && (n = t, t = {}), i("object" == typeof e, "location must be an object"), i("object" == typeof t, "options must be an object"), i("function" == typeof n, "callback must be a function"), i("number" == typeof e.latitude && "number" == typeof e.longitude, "location must be an object with numeric latitude & longitude properties");
            var o = {
                dataset: "mapbox.places"
            };
            t.dataset && (i("string" == typeof t.dataset, "dataset option must be string"), o.dataset = t.dataset);
            var u = c;
            t.precision && (i("number" == typeof t.precision, "precision option must be number"), u = t.precision), t.types && (i("string" == typeof t.types, "types option must be string"), o.types = t.types), o.longitude = r(e.longitude, u), o.latitude = r(e.latitude, u), this.client({
                path: s.API_GEOCODER_REVERSE,
                params: o,
                callback: n
            })
        }, t.exports = u
    }, {
        "../constants": 13,
        "../make_service": 15,
        assert: 2
    }],
    17: [function(e, t, n) {
        ! function(e, t) {
            "use strict";
            var n;
            e(function(e) {
                function r(e, t) {
                    var n, r, i, o;
                    if (n = e, i = {}, t) {
                        for (r in t) o = new RegExp("\\{" + r + "\\}"), o.test(n) ? n = n.replace(o, encodeURIComponent(t[r]), "g") : i[r] = t[r];
                        for (r in i) n += -1 === n.indexOf("?") ? "?" : "&", n += encodeURIComponent(r), null !== i[r] && void 0 !== i[r] && (n += "=", n += encodeURIComponent(i[r]))
                    }
                    return n
                }

                function i(e, t) {
                    return 0 === e.indexOf(t)
                }

                function o(e, t) {
                    return this instanceof o ? void(e instanceof o ? (this._template = e.template, this._params = s({}, this._params, t)) : (this._template = (e || "").toString(), this._params = t || {})) : new o(e, t)
                }
                var s, u, c, a, f;
                return s = e("./util/mixin"), c = /([a-z][a-z0-9\+\-\.]*:)\/\/([^@]+@)?(([^:\/]+)(:([0-9]+))?)?(\/[^?#]*)?(\?[^#]*)?(#\S*)?/i, a = /^([a-z][a-z0-9\-\+\.]*:\/\/|\/)/i, f = /([a-z][a-z0-9\+\-\.]*:)\/\/([^@]+@)?(([^:\/]+)(:([0-9]+))?)?\//i, o.prototype = {
                    append: function(e, t) {
                        return new o(this._template + e, s({}, this._params, t))
                    },
                    fullyQualify: function() {
                        if (!t) return this;
                        if (this.isFullyQualified()) return this;
                        var e = this._template;
                        return i(e, "//") ? e = u.protocol + e : i(e, "/") ? e = u.origin + e : this.isAbsolute() || (e = u.origin + u.pathname.substring(0, u.pathname.lastIndexOf("/") + 1)), -1 === e.indexOf("/", 8) && (e += "/"), new o(e, this._params)
                    },
                    isAbsolute: function() {
                        return a.test(this.build())
                    },
                    isFullyQualified: function() {
                        return f.test(this.build())
                    },
                    isCrossOrigin: function() {
                        if (!u) return !0;
                        var e = this.parts();
                        return e.protocol !== u.protocol || e.hostname !== u.hostname || e.port !== u.port
                    },
                    parts: function() {
                        var e, t;
                        return e = this.fullyQualify().build().match(c), t = {
                            href: e[0],
                            protocol: e[1],
                            host: e[3] || "",
                            hostname: e[4] || "",
                            port: e[6],
                            pathname: e[7] || "",
                            search: e[8] || "",
                            hash: e[9] || ""
                        }, t.origin = t.protocol + "//" + t.host, t.port = t.port || ("https:" === t.protocol ? "443" : "http:" === t.protocol ? "80" : ""), t
                    },
                    build: function(e) {
                        return r(this._template, s({}, this._params, e))
                    },
                    toString: function() {
                        return this.build()
                    }
                }, u = t ? new o(t.href).parts() : n, o
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        }, "undefined" != typeof window ? window.location : void 0)
    }, {
        "./util/mixin": 55
    }],
    18: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                var t = e("./client/default"),
                    n = e("./client/xhr");
                return t.setPlatformDefaultClient(n), t
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "./client/default": 20,
        "./client/xhr": 21
    }],
    19: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                return function(e, t) {
                    return t && (e.skip = function() {
                        return t
                    }), e.wrap = function(t, n) {
                        return t(e, n)
                    }, e.chain = function() {
                        return "undefined" != typeof console && console.log("rest.js: client.chain() is deprecated, use client.wrap() instead"), e.wrap.apply(this, arguments)
                    }, e
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    20: [function(e, t, n) {
        ! function(e) {
            "use strict";
            var t;
            e(function(e) {
                function n() {
                    return i.apply(t, arguments)
                }
                var r, i, o;
                return r = e("../client"), n.setDefaultClient = function(e) {
                    i = e
                }, n.getDefaultClient = function() {
                    return i
                }, n.resetDefaultClient = function() {
                    i = o
                }, n.setPlatformDefaultClient = function(e) {
                    if (o) throw new Error("Unable to redefine platformDefaultClient");
                    i = o = e
                }, r(n)
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../client": 19
    }],
    21: [function(e, t, n) {
        ! function(e, t) {
            "use strict";
            e(function(e) {
                function n(e) {
                    var t = {};
                    return e ? (e.trim().split(a).forEach(function(e) {
                        var n, r, i;
                        n = e.indexOf(":"), r = s(e.substring(0, n).trim()), i = e.substring(n + 1).trim(), t[r] ? Array.isArray(t[r]) ? t[r].push(i) : t[r] = [t[r], i] : t[r] = i
                    }), t) : t
                }

                function r(e, t) {
                    return Object.keys(t || {}).forEach(function(n) {
                        if (t.hasOwnProperty(n) && n in e) try {
                            e[n] = t[n]
                        } catch (r) {}
                    }), e
                }
                var i, o, s, u, c, a;
                return i = e("when"), o = e("../UrlBuilder"), s = e("../util/normalizeHeaderName"), u = e("../util/responsePromise"), c = e("../client"), a = /[\r|\n]+/, c(function(e) {
                    return u.promise(function(i, s) {
                        var u, c, a, f, p, l, d, h;
                        if (e = "string" == typeof e ? {
                                path: e
                            } : e || {}, d = {
                                request: e
                            }, e.canceled) return d.error = "precanceled", void s(d);
                        if (h = e.engine || t.XMLHttpRequest, !h) return void s({
                            request: e,
                            error: "xhr-not-available"
                        });
                        p = e.entity, e.method = e.method || (p ? "POST" : "GET"), c = e.method, a = new o(e.path || "", e.params).build();
                        try {
                            u = d.raw = new h, r(u, e.mixin), u.open(c, a, !0), r(u, e.mixin), f = e.headers;
                            for (l in f)("Content-Type" !== l || "multipart/form-data" !== f[l]) && u.setRequestHeader(l, f[l]);
                            e.canceled = !1, e.cancel = function() {
                                e.canceled = !0, u.abort(), s(d)
                            }, u.onreadystatechange = function() {
                                e.canceled || u.readyState === (h.DONE || 4) && (d.status = {
                                    code: u.status,
                                    text: u.statusText
                                }, d.headers = n(u.getAllResponseHeaders()), d.entity = u.responseText, d.status.code > 0 ? i(d) : setTimeout(function() {
                                    i(d)
                                }, 0))
                            };
                            try {
                                u.onerror = function() {
                                    d.error = "loaderror", s(d)
                                }
                            } catch (m) {}
                            u.send(p)
                        } catch (m) {
                            d.error = "loaderror", s(d)
                        }
                    })
                })
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        }, "undefined" != typeof window ? window : void 0)
    }, {
        "../UrlBuilder": 17,
        "../client": 19,
        "../util/normalizeHeaderName": 56,
        "../util/responsePromise": 57,
        when: 52
    }],
    22: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                function t(e) {
                    return e
                }

                function n(e) {
                    return e
                }

                function r(e) {
                    return e
                }

                function i(e) {
                    return p.promise(function(t, n) {
                        e.forEach(function(e) {
                            p(e, t, n)
                        })
                    })
                }

                function o(e) {
                    return this instanceof o ? void c(this, e) : new o(e)
                }

                function s(e) {
                    var s, c, l, d;
                    return e = e || {}, s = e.init || t, c = e.request || n, l = e.success || e.response || r, d = e.error || function() {
                            return p((e.response || r).apply(this, arguments), p.reject, p.reject)
                        },
                        function(t, n) {
                            function r(e) {
                                var s, u;
                                return s = {}, u = {
                                    arguments: Array.prototype.slice.call(arguments),
                                    client: r
                                }, e = "string" == typeof e ? {
                                    path: e
                                } : e || {}, e.originator = e.originator || r, a(c.call(s, e, n, u), function(e) {
                                    var r, c, a;
                                    return a = t, e instanceof o && (c = e.abort, a = e.client || a, r = e.response, e = e.request), r = r || p(e, function(e) {
                                        return p(a(e), function(e) {
                                            return l.call(s, e, n, u)
                                        }, function(e) {
                                            return d.call(s, e, n, u)
                                        })
                                    }), c ? i([r, c]) : r
                                }, function(t) {
                                    return p.reject({
                                        request: e,
                                        error: t
                                    })
                                })
                            }
                            return "object" == typeof t && (n = t), "function" != typeof t && (t = e.client || u), n = s(n || {}), f(r, t)
                        }
                }
                var u, c, a, f, p;
                return u = e("./client/default"), c = e("./util/mixin"), a = e("./util/responsePromise"), f = e("./client"), p = e("when"), s.ComplexRequest = o, s
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "./client": 19,
        "./client/default": 20,
        "./util/mixin": 55,
        "./util/responsePromise": 57,
        when: 52
    }],
    23: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                var t, n, r;
                return t = e("../interceptor"), n = e("../util/mixin"), r = function() {
                    function e(e, t, r) {
                        (e in t || e in r) && (t[e] = n({}, r[e], t[e]))
                    }

                    function t(e, t, n) {
                        e in n && !(e in t) && (t[e] = n[e])
                    }
                    var r = {
                        method: t,
                        path: t,
                        params: e,
                        headers: e,
                        entity: t,
                        mixin: e
                    };
                    return function(e, t) {
                        for (var n in r) r[n](n, e, t);
                        return e
                    }
                }(), t({
                    request: function(e, t) {
                        return r(e, t)
                    }
                })
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../interceptor": 22,
        "../util/mixin": 55
    }],
    24: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                var t, n;
                return t = e("../interceptor"), n = e("when"), t({
                    init: function(e) {
                        return e.code = e.code || 400, e
                    },
                    response: function(e, t) {
                        return e.status && e.status.code >= t.code ? n.reject(e) : e
                    }
                })
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../interceptor": 22,
        when: 52
    }],
    25: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                var t, n, r, i, o;
                return t = e("../interceptor"), n = e("../mime"), r = e("../mime/registry"), o = e("when"), i = {
                    read: function(e) {
                        return e
                    },
                    write: function(e) {
                        return e
                    }
                }, t({
                    init: function(e) {
                        return e.registry = e.registry || r, e
                    },
                    request: function(e, t) {
                        var r, s;
                        return s = e.headers || (e.headers = {}), r = n.parse(s["Content-Type"] = s["Content-Type"] || t.mime || "text/plain"), s.Accept = s.Accept || t.accept || r.raw + ", application/json;q=0.8, text/plain;q=0.5, */*;q=0.2", "entity" in e ? t.registry.lookup(r).otherwise(function() {
                            if (t.permissive) return i;
                            throw "mime-unknown"
                        }).then(function(n) {
                            var i = t.client || e.originator;
                            return o.attempt(n.write, e.entity, {
                                client: i,
                                request: e,
                                mime: r,
                                registry: t.registry
                            }).otherwise(function() {
                                throw "mime-serialization"
                            }).then(function(t) {
                                return e.entity = t, e
                            })
                        }) : e
                    },
                    response: function(e, t) {
                        if (!(e.headers && e.headers["Content-Type"] && e.entity)) return e;
                        var r = n.parse(e.headers["Content-Type"]);
                        return t.registry.lookup(r).otherwise(function() {
                            return i
                        }).then(function(n) {
                            var i = t.client || e.request && e.request.originator;
                            return o.attempt(n.read, e.entity, {
                                client: i,
                                response: e,
                                mime: r,
                                registry: t.registry
                            }).otherwise(function(t) {
                                throw e.error = "mime-deserialization", e.cause = t, e
                            }).then(function(t) {
                                return e.entity = t, e
                            })
                        })
                    }
                })
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../interceptor": 22,
        "../mime": 28,
        "../mime/registry": 29,
        when: 52
    }],
    26: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                function t(e, t) {
                    return 0 === e.indexOf(t)
                }

                function n(e, t) {
                    return e.lastIndexOf(t) + t.length === e.length
                }
                var r, i;
                return r = e("../interceptor"), i = e("../UrlBuilder"), r({
                    request: function(e, r) {
                        var o;
                        return r.prefix && !new i(e.path).isFullyQualified() && (o = r.prefix, e.path && (n(o, "/") || t(e.path, "/") || (o += "/"), o += e.path), e.path = o), e
                    }
                })
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../UrlBuilder": 17,
        "../interceptor": 22
    }],
    27: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                var t, n, r;
                return t = e("../interceptor"), n = e("../util/uriTemplate"), r = e("../util/mixin"), t({
                    init: function(e) {
                        return e.params = e.params || {}, e.template = e.template || "", e
                    },
                    request: function(e, t) {
                        var i, o;
                        return i = e.path || t.template, o = r({}, e.params, t.params), e.path = n.expand(i, o), delete e.params, e
                    }
                })
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../interceptor": 22,
        "../util/mixin": 55,
        "../util/uriTemplate": 59
    }],
    28: [function(e, t, n) {
        ! function(e) {
            "use strict";
            var t;
            e(function() {
                function e(e) {
                    var n, r;
                    return n = e.split(";"), r = n[0].trim().split("+"), {
                        raw: e,
                        type: r[0],
                        suffix: r[1] ? "+" + r[1] : "",
                        params: n.slice(1).reduce(function(e, n) {
                            return n = n.split("="), e[n[0].trim()] = n[1] ? n[1].trim() : t, e
                        }, {})
                    }
                }
                return {
                    parse: e
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    29: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                function t(e) {
                    this.lookup = function(t) {
                        var i;
                        return i = "string" == typeof t ? n.parse(t) : t, e[i.raw] ? e[i.raw] : e[i.type + i.suffix] ? e[i.type + i.suffix] : e[i.type] ? e[i.type] : e[i.suffix] ? e[i.suffix] : r.reject(new Error('Unable to locate converter for mime "' + i.raw + '"'))
                    }, this.delegate = function(e) {
                        return {
                            read: function() {
                                var t = arguments;
                                return this.lookup(e).then(function(e) {
                                    return e.read.apply(this, t)
                                }.bind(this))
                            }.bind(this),
                            write: function() {
                                var t = arguments;
                                return this.lookup(e).then(function(e) {
                                    return e.write.apply(this, t)
                                }.bind(this))
                            }.bind(this)
                        }
                    }, this.register = function(t, n) {
                        return e[t] = r(n), e[t]
                    }, this.child = function() {
                        return new t(Object.create(e))
                    }
                }
                var n, r, i;
                return n = e("../mime"), r = e("when"), i = new t({}), i.register("application/hal", e("./type/application/hal")), i.register("application/json", e("./type/application/json")), i.register("application/x-www-form-urlencoded", e("./type/application/x-www-form-urlencoded")), i.register("multipart/form-data", e("./type/multipart/form-data")), i.register("text/plain", e("./type/text/plain")), i.register("+json", i.delegate("application/json")), i
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../mime": 28,
        "./type/application/hal": 30,
        "./type/application/json": 31,
        "./type/application/x-www-form-urlencoded": 32,
        "./type/multipart/form-data": 33,
        "./type/text/plain": 34,
        when: 52
    }],
    30: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                function t(e, t, n) {
                    Object.defineProperty(e, t, {
                        value: n,
                        configurable: !0,
                        enumerable: !1,
                        writeable: !0
                    })
                }
                var n, r, i, o, s, u;
                return n = e("../../../interceptor/pathPrefix"), r = e("../../../interceptor/template"), i = e("../../../util/find"), o = e("../../../util/lazyPromise"), s = e("../../../util/responsePromise"), u = e("when"), {
                    read: function(e, c) {
                        function a(e, t) {
                            (t && p && p.warn || p.log) && (p.warn || p.log).call(p, "Relationship '" + e + "' is deprecated, see " + t)
                        }
                        var f, p;
                        return c = c || {}, f = c.client, p = c.console || p, c.registry.lookup(c.mime.suffix).then(function(p) {
                            return u(p.read(e, c)).then(function(e) {
                                return i.findProperties(e, "_embedded", function(e, n, r) {
                                    Object.keys(e).forEach(function(r) {
                                        if (!(r in n)) {
                                            var i = s({
                                                entity: e[r]
                                            });
                                            t(n, r, i)
                                        }
                                    }), t(n, r, e)
                                }), i.findProperties(e, "_links", function(e, i, u) {
                                    Object.keys(e).forEach(function(n) {
                                        var u = e[n];
                                        n in i || t(i, n, s.make(o(function() {
                                            return u.deprecation && a(n, u.deprecation), u.templated === !0 ? r(f)({
                                                path: u.href
                                            }) : f({
                                                path: u.href
                                            })
                                        })))
                                    }), t(i, u, e), t(i, "clientFor", function(t, i) {
                                        var o = e[t];
                                        if (!o) throw new Error("Unknown relationship: " + t);
                                        return o.deprecation && a(t, o.deprecation), o.templated === !0 ? r(i || f, {
                                            template: o.href
                                        }) : n(i || f, {
                                            prefix: o.href
                                        })
                                    }), t(i, "requestFor", function(e, t, n) {
                                        var r = this.clientFor(e, n);
                                        return r(t)
                                    })
                                }), e
                            })
                        })
                    },
                    write: function(e, t) {
                        return t.registry.lookup(t.mime.suffix).then(function(n) {
                            return n.write(e, t)
                        })
                    }
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../../../interceptor/pathPrefix": 26,
        "../../../interceptor/template": 27,
        "../../../util/find": 53,
        "../../../util/lazyPromise": 54,
        "../../../util/responsePromise": 57,
        when: 52
    }],
    31: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(t, n) {
                    return {
                        read: function(e) {
                            return JSON.parse(e, t)
                        },
                        write: function(e) {
                            return JSON.stringify(e, n)
                        },
                        extend: e
                    }
                }
                return e()
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    32: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(e) {
                    return e = encodeURIComponent(e), e.replace(r, "+")
                }

                function t(e) {
                    return e = e.replace(i, " "), decodeURIComponent(e)
                }

                function n(t, r, i) {
                    return Array.isArray(i) ? i.forEach(function(e) {
                        t = n(t, r, e)
                    }) : (t.length > 0 && (t += "&"), t += e(r), void 0 !== i && null !== i && (t += "=" + e(i))), t
                }
                var r, i;
                return r = /%20/g, i = /\+/g, {
                    read: function(e) {
                        var n = {};
                        return e.split("&").forEach(function(e) {
                            var r, i, o;
                            r = e.split("="), i = t(r[0]), o = 2 === r.length ? t(r[1]) : null, i in n ? (Array.isArray(n[i]) || (n[i] = [n[i]]), n[i].push(o)) : n[i] = o
                        }), n
                    },
                    write: function(e) {
                        var t = "";
                        return Object.keys(e).forEach(function(r) {
                            t = n(t, r, e[r])
                        }), t
                    }
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    33: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(e) {
                    return e && 1 === e.nodeType && "FORM" === e.tagName
                }

                function t(e) {
                    var t, n = new FormData;
                    for (var r in e) e.hasOwnProperty(r) && (t = e[r], t instanceof File ? n.append(r, t, t.name) : t instanceof Blob ? n.append(r, t) : n.append(r, String(t)));
                    return n
                }
                return {
                    write: function(n) {
                        if ("undefined" == typeof FormData) throw new Error("The multipart/form-data mime serializer requires FormData support");
                        if (n instanceof FormData) return n;
                        if (e(n)) return new FormData(n);
                        if ("object" == typeof n && null !== n) return t(n);
                        throw new Error("Unable to create FormData from object " + n)
                    }
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    34: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                return {
                    read: function(e) {
                        return e
                    },
                    write: function(e) {
                        return e.toString()
                    }
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    35: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                var t = e("./makePromise"),
                    n = e("./Scheduler"),
                    r = e("./env").asap;
                return t({
                    scheduler: new n(r)
                })
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "./Scheduler": 36,
        "./env": 48,
        "./makePromise": 50
    }],
    36: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(e) {
                    this._async = e, this._running = !1, this._queue = this, this._queueLen = 0, this._afterQueue = {}, this._afterQueueLen = 0;
                    var t = this;
                    this.drain = function() {
                        t._drain()
                    }
                }
                return e.prototype.enqueue = function(e) {
                    this._queue[this._queueLen++] = e, this.run()
                }, e.prototype.afterQueue = function(e) {
                    this._afterQueue[this._afterQueueLen++] = e, this.run()
                }, e.prototype.run = function() {
                    this._running || (this._running = !0, this._async(this.drain))
                }, e.prototype._drain = function() {
                    for (var e = 0; e < this._queueLen; ++e) this._queue[e].run(), this._queue[e] = void 0;
                    for (this._queueLen = 0, this._running = !1, e = 0; e < this._afterQueueLen; ++e) this._afterQueue[e].run(), this._afterQueue[e] = void 0;
                    this._afterQueueLen = 0
                }, e
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    37: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(t) {
                    Error.call(this), this.message = t, this.name = e.name, "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, e)
                }
                return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    38: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(e, n) {
                    function r(t, r, o) {
                        var s = e._defer(),
                            u = o.length,
                            c = new Array(u);
                        return i({
                            f: t,
                            thisArg: r,
                            args: o,
                            params: c,
                            i: u - 1,
                            call: n
                        }, s._handler), s
                    }

                    function i(t, r) {
                        if (t.i < 0) return n(t.f, t.thisArg, t.params, r);
                        var i = e._handler(t.args[t.i]);
                        i.fold(o, t, void 0, r)
                    }

                    function o(e, t, n) {
                        e.params[e.i] = t, e.i -= 1, i(e, n)
                    }
                    return arguments.length < 2 && (n = t), r
                }

                function t(e, t, n, r) {
                    try {
                        r.resolve(e.apply(t, n))
                    } catch (i) {
                        r.reject(i)
                    }
                }
                return e.tryCatchResolve = t, e
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    39: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                var t = e("../state"),
                    n = e("../apply");
                return function(e) {
                    function r(t) {
                        function n(e) {
                            f = null, this.resolve(e)
                        }

                        function r(e) {
                            this.resolved || (f.push(e), 0 === --a && this.reject(f))
                        }
                        for (var i, o, s = e._defer(), u = s._handler, c = t.length >>> 0, a = c, f = [], p = 0; c > p; ++p)
                            if (o = t[p], void 0 !== o || p in t) {
                                if (i = e._handler(o), i.state() > 0) {
                                    u.become(i), e._visitRemaining(t, p, i);
                                    break
                                }
                                i.visit(u, n, r)
                            } else --a;
                        return 0 === a && u.reject(new RangeError("any(): array must not be empty")), s
                    }

                    function i(t, n) {
                        function r(e) {
                            this.resolved || (f.push(e), 0 === --d && (p = null, this.resolve(f)))
                        }

                        function i(e) {
                            this.resolved || (p.push(e), 0 === --o && (f = null, this.reject(p)))
                        }
                        var o, s, u, c = e._defer(),
                            a = c._handler,
                            f = [],
                            p = [],
                            l = t.length >>> 0,
                            d = 0;
                        for (u = 0; l > u; ++u) s = t[u], (void 0 !== s || u in t) && ++d;
                        for (n = Math.max(n, 0), o = d - n + 1, d = Math.min(n, d), n > d ? a.reject(new RangeError("some(): array must contain at least " + n + " item(s), but had " + d)) : 0 === d && a.resolve(f), u = 0; l > u; ++u) s = t[u], (void 0 !== s || u in t) && e._handler(s).visit(a, r, i, a.notify);
                        return c
                    }

                    function o(t, n) {
                        return e._traverse(n, t)
                    }

                    function s(t, n) {
                        var r = g.call(t);
                        return e._traverse(n, r).then(function(e) {
                            return u(r, e)
                        })
                    }

                    function u(t, n) {
                        for (var r = n.length, i = new Array(r), o = 0, s = 0; r > o; ++o) n[o] && (i[s++] = e._handler(t[o]).value);
                        return i.length = s, i
                    }

                    function c(e) {
                        return m(e.map(a))
                    }

                    function a(n) {
                        var r = e._handler(n);
                        return 0 === r.state() ? h(n).then(t.fulfilled, t.rejected) : (r._unreport(), t.inspect(r))
                    }

                    function f(e, t) {
                        return arguments.length > 2 ? y.call(e, l(t), arguments[2]) : y.call(e, l(t))
                    }

                    function p(e, t) {
                        return arguments.length > 2 ? v.call(e, l(t), arguments[2]) : v.call(e, l(t))
                    }

                    function l(e) {
                        return function(t, n, r) {
                            return d(e, void 0, [t, n, r])
                        }
                    }
                    var d = n(e),
                        h = e.resolve,
                        m = e.all,
                        y = Array.prototype.reduce,
                        v = Array.prototype.reduceRight,
                        g = Array.prototype.slice;
                    return e.any = r, e.some = i, e.settle = c, e.map = o, e.filter = s, e.reduce = f, e.reduceRight = p, e.prototype.spread = function(e) {
                        return this.then(m).then(function(t) {
                            return e.apply(this, t)
                        })
                    }, e
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../apply": 38,
        "../state": 51
    }],
    40: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e() {
                    throw new TypeError("catch predicate must be a function")
                }

                function t(e, t) {
                    return n(t) ? e instanceof t : t(e)
                }

                function n(e) {
                    return e === Error || null != e && e.prototype instanceof Error
                }

                function r(e) {
                    return ("object" == typeof e || "function" == typeof e) && null !== e
                }

                function i(e) {
                    return e
                }
                return function(n) {
                    function o(e, n) {
                        return function(r) {
                            return t(r, n) ? e.call(this, r) : a(r)
                        }
                    }

                    function s(e, t, n, i) {
                        var o = e.call(t);
                        return r(o) ? u(o, n, i) : n(i)
                    }

                    function u(e, t, n) {
                        return c(e).then(function() {
                            return t(n)
                        })
                    }
                    var c = n.resolve,
                        a = n.reject,
                        f = n.prototype["catch"];
                    return n.prototype.done = function(e, t) {
                        this._handler.visit(this._handler.receiver, e, t)
                    }, n.prototype["catch"] = n.prototype.otherwise = function(t) {
                        return arguments.length < 2 ? f.call(this, t) : "function" != typeof t ? this.ensure(e) : f.call(this, o(arguments[1], t))
                    }, n.prototype["finally"] = n.prototype.ensure = function(e) {
                        return "function" != typeof e ? this : this.then(function(t) {
                            return s(e, this, i, t)
                        }, function(t) {
                            return s(e, this, a, t)
                        })
                    }, n.prototype["else"] = n.prototype.orElse = function(e) {
                        return this.then(void 0, function() {
                            return e
                        })
                    }, n.prototype["yield"] = function(e) {
                        return this.then(function() {
                            return e
                        })
                    }, n.prototype.tap = function(e) {
                        return this.then(e)["yield"](this)
                    }, n
                }
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    41: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                return function(e) {
                    return e.prototype.fold = function(t, n) {
                        var r = this._beget();
                        return this._handler.fold(function(n, r, i) {
                            e._handler(n).fold(function(e, n, r) {
                                r.resolve(t.call(this, n, e))
                            }, r, this, i)
                        }, n, r._handler.receiver, r._handler), r
                    }, e
                }
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    42: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                var t = e("../state").inspect;
                return function(e) {
                    return e.prototype.inspect = function() {
                        return t(e._handler(this))
                    }, e
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../state": 51
    }],
    43: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                return function(e) {
                    function t(e, t, r, i) {
                        return n(function(t) {
                            return [t, e(t)]
                        }, t, r, i)
                    }

                    function n(e, t, i, o) {
                        function s(o, s) {
                            return r(i(o)).then(function() {
                                return n(e, t, i, s)
                            })
                        }
                        return r(o).then(function(n) {
                            return r(t(n)).then(function(t) {
                                return t ? n : r(e(n)).spread(s)
                            })
                        })
                    }
                    var r = e.resolve;
                    return e.iterate = t, e.unfold = n, e
                }
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    44: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                return function(e) {
                    return e.prototype.progress = function(e) {
                        return this.then(void 0, void 0, e)
                    }, e
                }
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    45: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                function t(e, t, r, i) {
                    return n.setTimer(function() {
                        e(r, i, t)
                    }, t)
                }
                var n = e("../env"),
                    r = e("../TimeoutError");
                return function(e) {
                    function i(e, n, r) {
                        t(o, e, n, r)
                    }

                    function o(e, t) {
                        t.resolve(e)
                    }

                    function s(e, t, n) {
                        var i = "undefined" == typeof e ? new r("timed out after " + n + "ms") : e;
                        t.reject(i)
                    }
                    return e.prototype.delay = function(e) {
                        var t = this._beget();
                        return this._handler.fold(i, e, void 0, t._handler), t
                    }, e.prototype.timeout = function(e, r) {
                        var i = this._beget(),
                            o = i._handler,
                            u = t(s, e, r, i._handler);
                        return this._handler.visit(o, function(e) {
                            n.clearTimer(u), this.resolve(e)
                        }, function(e) {
                            n.clearTimer(u), this.reject(e)
                        }, o.notify), i
                    }, e
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../TimeoutError": 37,
        "../env": 48
    }],
    46: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                function t(e) {
                    throw e
                }

                function n() {}
                var r = e("../env").setTimer,
                    i = e("../format");
                return function(e) {
                    function o(e) {
                        e.handled || (d.push(e), f("Potentially unhandled rejection [" + e.id + "] " + i.formatError(e.value)))
                    }

                    function s(e) {
                        var t = d.indexOf(e);
                        t >= 0 && (d.splice(t, 1), p("Handled previous rejection [" + e.id + "] " + i.formatObject(e.value)))
                    }

                    function u(e, t) {
                        l.push(e, t), null === h && (h = r(c, 0))
                    }

                    function c() {
                        for (h = null; l.length > 0;) l.shift()(l.shift())
                    }
                    var a, f = n,
                        p = n;
                    "undefined" != typeof console && (a = console, f = "undefined" != typeof a.error ? function(e) {
                        a.error(e)
                    } : function(e) {
                        a.log(e)
                    }, p = "undefined" != typeof a.info ? function(e) {
                        a.info(e)
                    } : function(e) {
                        a.log(e)
                    }), e.onPotentiallyUnhandledRejection = function(e) {
                        u(o, e)
                    }, e.onPotentiallyUnhandledRejectionHandled = function(e) {
                        u(s, e)
                    }, e.onFatalRejection = function(e) {
                        u(t, e.value)
                    };
                    var l = [],
                        d = [],
                        h = null;
                    return e
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "../env": 48,
        "../format": 49
    }],
    47: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                return function(e) {
                    return e.prototype["with"] = e.prototype.withThis = function(e) {
                        var t = this._beget(),
                            n = t._handler;
                        return n.receiver = e, this._handler.chain(n, e), t
                    }, e
                }
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    48: [function(e, t, n) {
        (function(n) {
            ! function(e) {
                "use strict";
                e(function(e) {
                    function t() {
                        return "undefined" != typeof n && "[object process]" === Object.prototype.toString.call(n)
                    }

                    function r() {
                        return "function" == typeof MutationObserver && MutationObserver || "function" == typeof WebKitMutationObserver && WebKitMutationObserver
                    }

                    function i(e) {
                        function t() {
                            var e = n;
                            n = void 0, e()
                        }
                        var n, r = document.createTextNode(""),
                            i = new e(t);
                        i.observe(r, {
                            characterData: !0
                        });
                        var o = 0;
                        return function(e) {
                            n = e, r.data = o ^= 1
                        }
                    }
                    var o, s = "undefined" != typeof setTimeout && setTimeout,
                        u = function(e, t) {
                            return setTimeout(e, t)
                        },
                        c = function(e) {
                            return clearTimeout(e)
                        },
                        a = function(e) {
                            return s(e, 0)
                        };
                    if (t()) a = function(e) {
                        return n.nextTick(e)
                    };
                    else if (o = r()) a = i(o);
                    else if (!s) {
                        var f = e,
                            p = f("vertx");
                        u = function(e, t) {
                            return p.setTimer(t, e)
                        }, c = p.cancelTimer, a = p.runOnLoop || p.runOnContext
                    }
                    return {
                        setTimer: u,
                        clearTimer: c,
                        asap: a
                    }
                })
            }("function" == typeof define && define.amd ? define : function(n) {
                t.exports = n(e)
            })
        }).call(this, e("_process"))
    }, {
        _process: 5
    }],
    49: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(e) {
                    var n = "object" == typeof e && null !== e && (e.stack || e.message) ? e.stack || e.message : t(e);
                    return e instanceof Error ? n : n + " (WARNING: non-Error used)"
                }

                function t(e) {
                    var t = String(e);
                    return "[object Object]" === t && "undefined" != typeof JSON && (t = n(e, t)), t
                }

                function n(e, t) {
                    try {
                        return JSON.stringify(e)
                    } catch (n) {
                        return t
                    }
                }
                return {
                    formatError: e,
                    formatObject: t,
                    tryStringify: n
                }
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    50: [function(e, t, n) {
        (function(e) {
            ! function(t) {
                "use strict";
                t(function() {
                    return function(t) {
                        function n(e, t) {
                            this._handler = e === b ? t : r(e)
                        }

                        function r(e) {
                            function t(e) {
                                i.resolve(e)
                            }

                            function n(e) {
                                i.reject(e)
                            }

                            function r(e) {
                                i.notify(e)
                            }
                            var i = new x;
                            try {
                                e(t, n, r)
                            } catch (o) {
                                n(o)
                            }
                            return i
                        }

                        function i(e) {
                            return D(e) ? e : new n(b, new E(v(e)))
                        }

                        function o(e) {
                            return new n(b, new E(new O(e)))
                        }

                        function s() {
                            return ee
                        }

                        function u() {
                            return new n(b, new x)
                        }

                        function c(e, t) {
                            var n = new x(e.receiver, e.join().context);
                            return new t(b, n)
                        }

                        function a(e) {
                            return p(G, null, e)
                        }

                        function f(e, t) {
                            return p(F, e, t)
                        }

                        function p(e, t, r) {
                            function i(n, i, s) {
                                s.resolved || l(r, o, n, e(t, i, n), s)
                            }

                            function o(e, t, n) {
                                f[e] = t, 0 === --a && n.become(new T(f))
                            }
                            for (var s, u = "function" == typeof t ? i : o, c = new x, a = r.length >>> 0, f = new Array(a), p = 0; p < r.length && !c.resolved; ++p) s = r[p], void 0 !== s || p in r ? l(r, u, p, s, c) : --a;
                            return 0 === a && c.become(new T(f)), new n(b, c)
                        }

                        function l(e, t, n, r, i) {
                            if (I(r)) {
                                var o = g(r),
                                    s = o.state();
                                0 === s ? o.fold(t, n, void 0, i) : s > 0 ? t(n, o.value, i) : (i.become(o), d(e, n + 1, o))
                            } else t(n, r, i)
                        }

                        function d(e, t, n) {
                            for (var r = t; r < e.length; ++r) h(v(e[r]), n)
                        }

                        function h(e, t) {
                            if (e !== t) {
                                var n = e.state();
                                0 === n ? e.visit(e, void 0, e._unreport) : 0 > n && e._unreport()
                            }
                        }

                        function m(e) {
                            return "object" != typeof e || null === e ? o(new TypeError("non-iterable passed to race()")) : 0 === e.length ? s() : 1 === e.length ? i(e[0]) : y(e)
                        }

                        function y(e) {
                            var t, r, i, o = new x;
                            for (t = 0; t < e.length; ++t)
                                if (r = e[t], void 0 !== r || t in e) {
                                    if (i = v(r), 0 !== i.state()) {
                                        o.become(i), d(e, t + 1, i);
                                        break
                                    }
                                    i.visit(o, o.resolve, o.reject)
                                }
                            return new n(b, o)
                        }

                        function v(e) {
                            return D(e) ? e._handler.join() : I(e) ? w(e) : new T(e)
                        }

                        function g(e) {
                            return D(e) ? e._handler.join() : w(e)
                        }

                        function w(e) {
                            try {
                                var t = e.then;
                                return "function" == typeof t ? new j(t, e) : new T(e)
                            } catch (n) {
                                return new O(n)
                            }
                        }

                        function b() {}

                        function _() {}

                        function x(e, t) {
                            n.createContext(this, t), this.consumers = void 0, this.receiver = e, this.handler = void 0, this.resolved = !1
                        }

                        function E(e) {
                            this.handler = e
                        }

                        function j(e, t) {
                            x.call(this), W.enqueue(new R(e, t, this))
                        }

                        function T(e) {
                            n.createContext(this), this.value = e
                        }

                        function O(e) {
                            n.createContext(this), this.id = ++X, this.value = e, this.handled = !1, this.reported = !1, this._report()
                        }

                        function A(e, t) {
                            this.rejection = e, this.context = t
                        }

                        function S(e) {
                            this.rejection = e
                        }

                        function L() {
                            return new O(new TypeError("Promise cycle"))
                        }

                        function k(e, t) {
                            this.continuation = e, this.handler = t
                        }

                        function C(e, t) {
                            this.handler = t, this.value = e
                        }

                        function R(e, t, n) {
                            this._then = e, this.thenable = t, this.resolver = n
                        }

                        function P(e, t, n, r, i) {
                            try {
                                e.call(t, n, r, i)
                            } catch (o) {
                                r(o)
                            }
                        }

                        function q(e, t, n, r) {
                            this.f = e, this.z = t, this.c = n, this.to = r, this.resolver = Z, this.receiver = this
                        }

                        function D(e) {
                            return e instanceof n
                        }

                        function I(e) {
                            return ("object" == typeof e || "function" == typeof e) && null !== e
                        }

                        function U(e, t, r, i) {
                            return "function" != typeof e ? i.become(t) : (n.enterContext(t), M(e, t.value, r, i), void n.exitContext())
                        }

                        function z(e, t, r, i, o) {
                            return "function" != typeof e ? o.become(r) : (n.enterContext(r), H(e, t, r.value, i, o), void n.exitContext())
                        }

                        function N(e, t, r, i, o) {
                            return "function" != typeof e ? o.notify(t) : (n.enterContext(r), B(e, t, i, o), void n.exitContext())
                        }

                        function F(e, t, n) {
                            try {
                                return e(t, n)
                            } catch (r) {
                                return o(r)
                            }
                        }

                        function M(e, t, n, r) {
                            try {
                                r.become(v(e.call(n, t)))
                            } catch (i) {
                                r.become(new O(i))
                            }
                        }

                        function H(e, t, n, r, i) {
                            try {
                                e.call(r, t, n, i)
                            } catch (o) {
                                i.become(new O(o))
                            }
                        }

                        function B(e, t, n, r) {
                            try {
                                r.notify(e.call(n, t))
                            } catch (i) {
                                r.notify(i)
                            }
                        }

                        function Q(e, t) {
                            t.prototype = V(e.prototype), t.prototype.constructor = t
                        }

                        function G(e, t) {
                            return t
                        }

                        function J() {}

                        function $() {
                            return "undefined" != typeof e && null !== e && "function" == typeof e.emit ? function(t, n) {
                                return "unhandledRejection" === t ? e.emit(t, n.value, n) : e.emit(t, n)
                            } : "undefined" != typeof self && "function" == typeof CustomEvent ? function(e, t, n) {
                                var r = !1;
                                try {
                                    var i = new n("unhandledRejection");
                                    r = i instanceof n
                                } catch (o) {}
                                return r ? function(e, r) {
                                    var i = new n(e, {
                                        detail: {
                                            reason: r.value,
                                            key: r
                                        },
                                        bubbles: !1,
                                        cancelable: !0
                                    });
                                    return !t.dispatchEvent(i)
                                } : e
                            }(J, self, CustomEvent) : J
                        }
                        var W = t.scheduler,
                            K = $(),
                            V = Object.create || function(e) {
                                function t() {}
                                return t.prototype = e, new t
                            };
                        n.resolve = i, n.reject = o, n.never = s, n._defer = u, n._handler = v, n.prototype.then = function(e, t, n) {
                            var r = this._handler,
                                i = r.join().state();
                            if ("function" != typeof e && i > 0 || "function" != typeof t && 0 > i) return new this.constructor(b, r);
                            var o = this._beget(),
                                s = o._handler;
                            return r.chain(s, r.receiver, e, t, n), o
                        }, n.prototype["catch"] = function(e) {
                            return this.then(void 0, e)
                        }, n.prototype._beget = function() {
                            return c(this._handler, this.constructor)
                        }, n.all = a, n.race = m, n._traverse = f, n._visitRemaining = d, b.prototype.when = b.prototype.become = b.prototype.notify = b.prototype.fail = b.prototype._unreport = b.prototype._report = J, b.prototype._state = 0, b.prototype.state = function() {
                            return this._state
                        }, b.prototype.join = function() {
                            for (var e = this; void 0 !== e.handler;) e = e.handler;
                            return e
                        }, b.prototype.chain = function(e, t, n, r, i) {
                            this.when({
                                resolver: e,
                                receiver: t,
                                fulfilled: n,
                                rejected: r,
                                progress: i
                            })
                        }, b.prototype.visit = function(e, t, n, r) {
                            this.chain(Z, e, t, n, r)
                        }, b.prototype.fold = function(e, t, n, r) {
                            this.when(new q(e, t, n, r))
                        }, Q(b, _), _.prototype.become = function(e) {
                            e.fail()
                        };
                        var Z = new _;
                        Q(b, x), x.prototype._state = 0, x.prototype.resolve = function(e) {
                            this.become(v(e))
                        }, x.prototype.reject = function(e) {
                            this.resolved || this.become(new O(e))
                        }, x.prototype.join = function() {
                            if (!this.resolved) return this;
                            for (var e = this; void 0 !== e.handler;)
                                if (e = e.handler, e === this) return this.handler = L();
                            return e
                        }, x.prototype.run = function() {
                            var e = this.consumers,
                                t = this.handler;
                            this.handler = this.handler.join(), this.consumers = void 0;
                            for (var n = 0; n < e.length; ++n) t.when(e[n])
                        }, x.prototype.become = function(e) {
                            this.resolved || (this.resolved = !0, this.handler = e, void 0 !== this.consumers && W.enqueue(this), void 0 !== this.context && e._report(this.context))
                        }, x.prototype.when = function(e) {
                            this.resolved ? W.enqueue(new k(e, this.handler)) : void 0 === this.consumers ? this.consumers = [e] : this.consumers.push(e)
                        }, x.prototype.notify = function(e) {
                            this.resolved || W.enqueue(new C(e, this))
                        }, x.prototype.fail = function(e) {
                            var t = "undefined" == typeof e ? this.context : e;
                            this.resolved && this.handler.join().fail(t)
                        }, x.prototype._report = function(e) {
                            this.resolved && this.handler.join()._report(e)
                        }, x.prototype._unreport = function() {
                            this.resolved && this.handler.join()._unreport()
                        }, Q(b, E), E.prototype.when = function(e) {
                            W.enqueue(new k(e, this))
                        }, E.prototype._report = function(e) {
                            this.join()._report(e)
                        }, E.prototype._unreport = function() {
                            this.join()._unreport()
                        }, Q(x, j), Q(b, T), T.prototype._state = 1, T.prototype.fold = function(e, t, n, r) {
                            z(e, t, this, n, r)
                        }, T.prototype.when = function(e) {
                            U(e.fulfilled, this, e.receiver, e.resolver)
                        };
                        var X = 0;
                        Q(b, O), O.prototype._state = -1, O.prototype.fold = function(e, t, n, r) {
                            r.become(this)
                        }, O.prototype.when = function(e) {
                            "function" == typeof e.rejected && this._unreport(), U(e.rejected, this, e.receiver, e.resolver)
                        }, O.prototype._report = function(e) {
                            W.afterQueue(new A(this, e))
                        }, O.prototype._unreport = function() {
                            this.handled || (this.handled = !0, W.afterQueue(new S(this)))
                        }, O.prototype.fail = function(e) {
                            this.reported = !0, K("unhandledRejection", this), n.onFatalRejection(this, void 0 === e ? this.context : e)
                        }, A.prototype.run = function() {
                            this.rejection.handled || this.rejection.reported || (this.rejection.reported = !0, K("unhandledRejection", this.rejection) || n.onPotentiallyUnhandledRejection(this.rejection, this.context))
                        }, S.prototype.run = function() {
                            this.rejection.reported && (K("rejectionHandled", this.rejection) || n.onPotentiallyUnhandledRejectionHandled(this.rejection))
                        }, n.createContext = n.enterContext = n.exitContext = n.onPotentiallyUnhandledRejection = n.onPotentiallyUnhandledRejectionHandled = n.onFatalRejection = J;
                        var Y = new b,
                            ee = new n(b, Y);
                        return k.prototype.run = function() {
                            this.handler.join().when(this.continuation)
                        }, C.prototype.run = function() {
                            var e = this.handler.consumers;
                            if (void 0 !== e)
                                for (var t, n = 0; n < e.length; ++n) t = e[n], N(t.progress, this.value, this.handler, t.receiver, t.resolver)
                        }, R.prototype.run = function() {
                            function e(e) {
                                r.resolve(e)
                            }

                            function t(e) {
                                r.reject(e)
                            }

                            function n(e) {
                                r.notify(e)
                            }
                            var r = this.resolver;
                            P(this._then, this.thenable, e, t, n)
                        }, q.prototype.fulfilled = function(e) {
                            this.f.call(this.c, this.z, e, this.to)
                        }, q.prototype.rejected = function(e) {
                            this.to.reject(e)
                        }, q.prototype.progress = function(e) {
                            this.to.notify(e)
                        }, n
                    }
                })
            }("function" == typeof define && define.amd ? define : function(e) {
                t.exports = e()
            })
        }).call(this, e("_process"))
    }, {
        _process: 5
    }],
    51: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e() {
                    return {
                        state: "pending"
                    }
                }

                function t(e) {
                    return {
                        state: "rejected",
                        reason: e
                    }
                }

                function n(e) {
                    return {
                        state: "fulfilled",
                        value: e
                    }
                }

                function r(r) {
                    var i = r.state();
                    return 0 === i ? e() : i > 0 ? n(r.value) : t(r.value)
                }
                return {
                    pending: e,
                    fulfilled: n,
                    rejected: t,
                    inspect: r
                }
            })
        }("function" == typeof define && define.amd ? define : function(e) {
            t.exports = e()
        })
    }, {}],
    52: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                function t(e, t, n, r) {
                    var i = E.resolve(e);
                    return arguments.length < 2 ? i : i.then(t, n, r)
                }

                function n(e) {
                    return new E(e)
                }

                function r(e) {
                    return function() {
                        for (var t = 0, n = arguments.length, r = new Array(n); n > t; ++t) r[t] = arguments[t];
                        return j(e, this, r)
                    }
                }

                function i(e) {
                    for (var t = 0, n = arguments.length - 1, r = new Array(n); n > t; ++t) r[t] = arguments[t + 1];
                    return j(e, this, r)
                }

                function o() {
                    return new s
                }

                function s() {
                    function e(e) {
                        r._handler.resolve(e)
                    }

                    function t(e) {
                        r._handler.reject(e)
                    }

                    function n(e) {
                        r._handler.notify(e)
                    }
                    var r = E._defer();
                    this.promise = r, this.resolve = e, this.reject = t, this.notify = n, this.resolver = {
                        resolve: e,
                        reject: t,
                        notify: n
                    }
                }

                function u(e) {
                    return e && "function" == typeof e.then
                }

                function c() {
                    return E.all(arguments)
                }

                function a(e) {
                    return t(e, E.all)
                }

                function f(e) {
                    return t(e, E.settle)
                }

                function p(e, n) {
                    return t(e, function(e) {
                        return E.map(e, n)
                    })
                }

                function l(e, n) {
                    return t(e, function(e) {
                        return E.filter(e, n)
                    })
                }
                var d = e("./lib/decorators/timed"),
                    h = e("./lib/decorators/array"),
                    m = e("./lib/decorators/flow"),
                    y = e("./lib/decorators/fold"),
                    v = e("./lib/decorators/inspect"),
                    g = e("./lib/decorators/iterate"),
                    w = e("./lib/decorators/progress"),
                    b = e("./lib/decorators/with"),
                    _ = e("./lib/decorators/unhandledRejection"),
                    x = e("./lib/TimeoutError"),
                    E = [h, m, y, g, w, v, b, d, _].reduce(function(e, t) {
                        return t(e)
                    }, e("./lib/Promise")),
                    j = e("./lib/apply")(E);
                return t.promise = n, t.resolve = E.resolve, t.reject = E.reject, t.lift = r, t["try"] = i, t.attempt = i, t.iterate = E.iterate, t.unfold = E.unfold, t.join = c, t.all = a, t.settle = f, t.any = r(E.any), t.some = r(E.some), t.race = r(E.race), t.map = p, t.filter = l, t.reduce = r(E.reduce), t.reduceRight = r(E.reduceRight), t.isPromiseLike = u, t.Promise = E, t.defer = o, t.TimeoutError = x, t
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "./lib/Promise": 35,
        "./lib/TimeoutError": 37,
        "./lib/apply": 38,
        "./lib/decorators/array": 39,
        "./lib/decorators/flow": 40,
        "./lib/decorators/fold": 41,
        "./lib/decorators/inspect": 42,
        "./lib/decorators/iterate": 43,
        "./lib/decorators/progress": 44,
        "./lib/decorators/timed": 45,
        "./lib/decorators/unhandledRejection": 46,
        "./lib/decorators/with": 47
    }],
    53: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                return {
                    findProperties: function e(t, n, r) {
                        "object" == typeof t && null !== t && (n in t && r(t[n], t, n), Object.keys(t).forEach(function(i) {
                            e(t[i], n, r)
                        }))
                    }
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    54: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                function t(e) {
                    var t, r, i, o, s;
                    return t = n.defer(), r = !1, i = t.resolver, o = t.promise, s = o.then, o.then = function() {
                        return r || (r = !0, n.attempt(e).then(i.resolve, i.reject)), s.apply(o, arguments)
                    }, o
                }
                var n;
                return n = e("when"), t
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        when: 52
    }],
    55: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(e) {
                    var n, r, i, o;
                    for (e || (e = {}), n = 1, r = arguments.length; r > n; n += 1) {
                        i = arguments[n];
                        for (o in i) o in e && (e[o] === i[o] || o in t && t[o] === i[o]) || (e[o] = i[o])
                    }
                    return e
                }
                var t = {};
                return e
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    56: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(e) {
                    return e.toLowerCase().split("-").map(function(e) {
                        return e.charAt(0).toUpperCase() + e.slice(1)
                    }).join("-")
                }
                return e
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    57: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function(e) {
                function t(e, t) {
                    return e.then(function(e) {
                        return e && e[t]
                    }, function(e) {
                        return a.reject(e && e[t])
                    })
                }

                function n() {
                    return t(this, "entity")
                }

                function r() {
                    return t(t(this, "status"), "code")
                }

                function i() {
                    return t(this, "headers")
                }

                function o(e) {
                    return e = f(e), t(this.headers(), e)
                }

                function s(e) {
                    return e = [].concat(e), u(a.reduce(e, function(e, t) {
                        if ("string" == typeof t && (t = {
                                rel: t
                            }), "function" != typeof e.entity.clientFor) throw new Error("Hypermedia response expected");
                        var n = e.entity.clientFor(t.rel);
                        return n({
                            params: t.params
                        })
                    }, this))
                }

                function u(e) {
                    return e.status = r, e.headers = i, e.header = o, e.entity = n, e.follow = s, e
                }

                function c() {
                    return u(a.apply(a, arguments))
                }
                var a = e("when"),
                    f = e("./normalizeHeaderName");
                return c.make = u, c.reject = function(e) {
                    return u(a.reject(e))
                }, c.promise = function(e) {
                    return u(a.promise(e))
                }, c
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "./normalizeHeaderName": 56,
        when: 52
    }],
    58: [function(e, t, n) {
        ! function(e) {
            "use strict";
            e(function() {
                function e(e, t) {
                    if ("string" != typeof e) throw new Error("String required for URL encoding");
                    return e.split("").map(function(e) {
                        if (t.hasOwnProperty(e)) return e;
                        var n = e.charCodeAt(0);
                        return 127 >= n ? "%" + n.toString(16).toUpperCase() : encodeURIComponent(e).toUpperCase()
                    }).join("")
                }

                function t(t) {
                    return t = t || r.unreserved,
                        function(n) {
                            return e(n, t)
                        }
                }

                function n(e) {
                    return decodeURIComponent(e)
                }
                var r;
                return r = function() {
                    var e = {
                        alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                        digit: "0123456789"
                    };
                    return e.genDelims = ":/?#[]@", e.subDelims = "!$&'()*+,;=", e.reserved = e.genDelims + e.subDelims, e.unreserved = e.alpha + e.digit + "-._~", e.url = e.reserved + e.unreserved, e.scheme = e.alpha + e.digit + "+-.", e.userinfo = e.unreserved + e.subDelims + ":", e.host = e.unreserved + e.subDelims, e.port = e.digit, e.pchar = e.unreserved + e.subDelims + ":@", e.segment = e.pchar, e.path = e.segment + "/", e.query = e.pchar + "/?", e.fragment = e.pchar + "/?", Object.keys(e).reduce(function(t, n) {
                        return t[n] = e[n].split("").reduce(function(e, t) {
                            return e[t] = !0, e
                        }, {}), t
                    }, {})
                }(), {
                    decode: n,
                    encode: t(),
                    encodeURL: t(r.url),
                    encodeScheme: t(r.scheme),
                    encodeUserInfo: t(r.userinfo),
                    encodeHost: t(r.host),
                    encodePort: t(r.port),
                    encodePathSegment: t(r.segment),
                    encodePath: t(r.path),
                    encodeQuery: t(r.query),
                    encodeFragment: t(r.fragment)
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {}],
    59: [function(e, t, n) {
        ! function(e) {
            "use strict";
            var t;
            e(function(e) {
                function n(e, n, r) {
                    return n.split(",").reduce(function(n, i) {
                        var s, c;
                        if (s = {}, "*" === i.slice(-1) && (i = i.slice(0, -1), s.explode = !0), u.test(i)) {
                            var a = u.exec(i);
                            i = a[1], s.maxLength = parseInt(a[2])
                        }
                        return i = o.decode(i), c = r[i], c === t || null === c ? n : (Array.isArray(c) ? n += c.reduce(function(t, n) {
                            return t.length ? (t += s.explode ? e.separator : ",", e.named && s.explode && (t += e.encoder(i), t += n.length ? "=" : e.empty)) : (t += e.first, e.named && (t += e.encoder(i), t += n.length ? "=" : e.empty)), t += e.encoder(n)
                        }, "") : "object" == typeof c ? n += Object.keys(c).reduce(function(t, n) {
                            return t.length ? t += s.explode ? e.separator : "," : (t += e.first, e.named && !s.explode && (t += e.encoder(i), t += c[n].length ? "=" : e.empty)), t += e.encoder(n), t += s.explode ? "=" : ",", t += e.encoder(c[n])
                        }, "") : (c = String(c), s.maxLength && (c = c.slice(0, s.maxLength)), n += n.length ? e.separator : e.first, e.named && (n += e.encoder(i), n += c.length ? "=" : e.empty), n += e.encoder(c)), n)
                    }, "")
                }

                function r(e, t) {
                    var r;
                    if (r = s[e.slice(0, 1)], r ? e = e.slice(1) : r = s[""], r.reserved) throw new Error("Reserved expression operations are not supported");
                    return n(r, e, t)
                }

                function i(e, t) {
                    var n, i, o;
                    for (o = "", i = 0;;) {
                        if (n = e.indexOf("{", i), -1 === n) {
                            o += e.slice(i);
                            break
                        }
                        o += e.slice(i, n), i = e.indexOf("}", n) + 1, o += r(e.slice(n + 1, i - 1), t)
                    }
                    return o
                }
                var o, s, u;
                return o = e("./uriEncoder"), u = /^([^:]*):([0-9]+)$/, s = {
                    "": {
                        first: "",
                        separator: ",",
                        named: !1,
                        empty: "",
                        encoder: o.encode
                    },
                    "+": {
                        first: "",
                        separator: ",",
                        named: !1,
                        empty: "",
                        encoder: o.encodeURL
                    },
                    "#": {
                        first: "#",
                        separator: ",",
                        named: !1,
                        empty: "",
                        encoder: o.encodeURL
                    },
                    ".": {
                        first: ".",
                        separator: ".",
                        named: !1,
                        empty: "",
                        encoder: o.encode
                    },
                    "/": {
                        first: "/",
                        separator: "/",
                        named: !1,
                        empty: "",
                        encoder: o.encode
                    },
                    ";": {
                        first: ";",
                        separator: ";",
                        named: !0,
                        empty: "",
                        encoder: o.encode
                    },
                    "?": {
                        first: "?",
                        separator: "&",
                        named: !0,
                        empty: "=",
                        encoder: o.encode
                    },
                    "&": {
                        first: "&",
                        separator: "&",
                        named: !0,
                        empty: "=",
                        encoder: o.encode
                    },
                    "=": {
                        reserved: !0
                    },
                    ",": {
                        reserved: !0
                    },
                    "!": {
                        reserved: !0
                    },
                    "@": {
                        reserved: !0
                    },
                    "|": {
                        reserved: !0
                    }
                }, {
                    expand: i
                }
            })
        }("function" == typeof define && define.amd ? define : function(n) {
            t.exports = n(e)
        })
    }, {
        "./uriEncoder": 58
    }],
    60: [function(e, t, n) {
        "use strict";
        var r = e("./src/suggestions");
        window.Suggestions = t.exports = r
    }, {
        "./src/suggestions": 63
    }],
    61: [function(e, t, n) {
        ! function() {
            var e = this,
                r = {};
            "undefined" != typeof n ? t.exports = r : e.fuzzy = r, r.simpleFilter = function(e, t) {
                return t.filter(function(t) {
                    return r.test(e, t)
                })
            }, r.test = function(e, t) {
                return null !== r.match(e, t)
            }, r.match = function(e, t, n) {
                n = n || {};
                var r, i = 0,
                    o = [],
                    s = t.length,
                    u = 0,
                    c = 0,
                    a = n.pre || "",
                    f = n.post || "",
                    p = n.caseSensitive && t || t.toLowerCase();
                e = n.caseSensitive && e || e.toLowerCase();
                for (var l = 0; s > l; l++) r = t[l], p[l] === e[i] ? (r = a + r + f, i += 1, c += 1 + c) : c = 0, u += c, o[o.length] = r;
                return i === e.length ? {
                    rendered: o.join(""),
                    score: u
                } : null
            }, r.filter = function(e, t, n) {
                return n = n || {}, t.reduce(function(t, i, o, s) {
                    var u = i;
                    n.extract && (u = n.extract(i));
                    var c = r.match(e, u, n);
                    return null != c && (t[t.length] = {
                        string: c.rendered,
                        score: c.score,
                        index: o,
                        original: i
                    }), t
                }, []).sort(function(e, t) {
                    var n = t.score - e.score;
                    return n ? n : e.index - t.index
                })
            }
        }()
    }, {}],
    62: [function(e, t, n) {
        "Use strict";
        var r = function(e) {
            return this.component = e, this.items = [], this.active = 0, this.element = document.createElement("ul"), this.element.className = "suggestions", e.el.parentNode.insertBefore(this.element, e.el.nextSibling), this
        };
        r.prototype.show = function() {
            this.element.style.display = "block"
        }, r.prototype.hide = function() {
            this.element.style.display = "none"
        }, r.prototype.add = function(e) {
            this.items.push(e)
        }, r.prototype.clear = function() {
            this.items = [], this.active = 0
        }, r.prototype.isEmpty = function() {
            return !this.items.length
        }, r.prototype.draw = function() {
            if (this.element.innerHTML = "", 0 === this.items.length) return void this.hide();
            for (var e = 0; e < this.items.length; e++) this.drawItem(this.items[e], this.active === e);
            this.show()
        }, r.prototype.drawItem = function(e, t) {
            var n = document.createElement("li"),
                r = document.createElement("a");
            t && (n.className += " active"), r.innerHTML = e.string, n.appendChild(r), this.element.appendChild(n), n.addEventListener("mousedown", function() {
                this.handleMouseDown.call(this, e)
            }.bind(this))
        }, r.prototype.handleMouseDown = function(e) {
            this.component.value(e.original), this.clear(), this.draw()
        }, r.prototype.move = function(e) {
            this.active = e, this.draw()
        }, r.prototype.previous = function() {
            this.move(0 === this.active ? this.items.length - 1 : this.active - 1)
        }, r.prototype.next = function() {
            this.move(this.active === this.items.length - 1 ? 0 : this.active + 1)
        }, t.exports = r
    }, {}],
    63: [function(e, t, n) {
        "use strict";
        var r = e("xtend"),
            i = e("fuzzy"),
            o = e("./list"),
            s = function(e, t, n) {
                return n = n || {}, this.options = r({
                    minLength: 2,
                    limit: 5
                }, n), this.el = e, this.data = t || [], this.list = new o(this), this.query = "", this.selected = null, this.list.draw(), this.el.addEventListener("keyup", function(e) {
                    this.handleKeyUp(e.keyCode)
                }.bind(this), !1), this.el.addEventListener("keydown", function(e) {
                    this.handleKeyDown(e)
                }.bind(this)), this.el.addEventListener("focus", function() {
                    this.handleFocus()
                }.bind(this)), this.el.addEventListener("blur", function() {
                    this.handleBlur()
                }.bind(this)), this
            };
        s.prototype.handleKeyUp = function(e) {
            return 40 !== e && 38 !== e && 27 !== e && 13 !== e && 9 !== e ? (this.query = this.normalize(this.el.value), this.list.clear(), this.query.length < this.options.minLength ? void this.list.draw() : void this.getCandidates(function(e) {
                for (var t = 0; t < e.length && (this.list.add(e[t]), t !== this.options.limit - 1); t++);
                this.list.draw()
            }.bind(this))) : void 0
        }, s.prototype.handleKeyDown = function(e) {
            switch (e.keyCode) {
                case 13:
                case 9:
                    this.list.isEmpty() || (this.value(this.list.items[this.list.active].original), this.list.hide());
                    break;
                case 27:
                    this.list.isEmpty() || this.list.hide();
                    break;
                case 38:
                    this.list.previous();
                    break;
                case 40:
                    this.list.next()
            }
        }, s.prototype.handleBlur = function() {
            this.list.hide()
        }, s.prototype.handleFocus = function() {
            this.list.isEmpty() || this.list.show()
        }, s.prototype.update = function(e) {
            this.data = e, this.list.draw()
        }, s.prototype.clear = function() {
            this.data = [], this.list.clear()
        }, s.prototype.normalize = function(e) {
            return e = e.toLowerCase()
        }, s.prototype.match = function(e, t) {
            return e.indexOf(t) > -1
        }, s.prototype.value = function(e) {
            if (this.selected = e, this.el.value = this.getItemValue(e), document.createEvent) {
                var t = document.createEvent("HTMLEvents");
                t.initEvent("change", !0, !1), this.el.dispatchEvent(t)
            } else this.el.fireEvent("onchange")
        }, s.prototype.getCandidates = function(e) {
            var t = {
                    pre: "<strong>",
                    post: "</strong>",
                    extract: function(e) {
                        return this.getItemValue(e)
                    }.bind(this)
                },
                n = i.filter(this.query, this.data, t);
            e(n)
        }, s.prototype.getItemValue = function(e) {
            return e
        }, t.exports = s
    }, {
        "./list": 62,
        fuzzy: 61,
        xtend: 64
    }],
    64: [function(e, t, n) {
        function r() {
            for (var e = {}, t = 0; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) i.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        t.exports = r;
        var i = Object.prototype.hasOwnProperty
    }, {}],
    65: [function(e, t, n) {
        "use strict";

        function r(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        n.__esModule = !0;
        var s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            u = e("mapbox/lib/services/geocoder"),
            c = r(u),
            a = e("suggestions"),
            f = r(a),
            p = e("lodash.debounce"),
            l = r(p),
            d = e("events"),
            h = function(e) {
                function t(n) {
                    i(this, t), e.call(this), this.options = {
                        position: "top-left"
                    }, this._ev = new d.EventEmitter, this.options = s({}, this.options, n)
                }
                return o(t, e), t.prototype.onAdd = function(e) {
                    var t = this;
                    this.container = this.options.container ? "string" == typeof this.options.container ? document.getElementById(this.options.container) : this.options.container : e.getContainer();
                    var n = document.createElement("div");
                    n.className = "mapboxgl-ctrl-geocoder";
                    var r = document.createElement("span");
                    r.classList.add("geocoder-icon", "geocoder-icon-search");
                    var i = this._inputEl = document.createElement("input");
                    i.type = "text", i.placeholder = "Search", i.addEventListener("keydown", l["default"](function(e) {
                        -1 === [9, 27, 37, 39, 13, 38, 40].indexOf(e.keyCode) && t._queryFromInput(e.target.value)
                    }), 200), i.addEventListener("change", function() {
                        var n = t._typeahead.selected;
			/*		
						if (n) {
                            if (n.bbox) {
                                var r = n.bbox;
                                e.fitBounds([
                                    [r[0], r[1]],
                                    [r[2], r[3]]
                                ])
                            } else e.jumpTo({
                                center: n.center
                            });
                            t._input = n, t.fire("geocoder.input", {
                                result: n
                            })
                        }
			*/				
                        if (n) {
							 /*
							 Jump to location, rather than flyTo.
							 
							 -the flyTo() option seemed to be too much to handle on mobile device, modified this to jumpTo() to alleviate this
							 */							 
							 e.jumpTo({
                                    center: n.center,
									zoom: 7 //added zoom, with higher zoom, fewer tiles need to be draw	
                                });
                            
                        }
                    });
                    var o = document.createElement("div");
                    o.classList.add("geocoder-pin-right");
                    var s = this._clearEl = document.createElement("button");
                    s.classList.add("geocoder-icon", "geocoder-icon-close"), s.addEventListener("click", this._clear.bind(this));
                    var u = this._loadingEl = document.createElement("span");
                    return u.classList.add("geocoder-icon", "geocoder-icon-loading"), o.appendChild(s), o.appendChild(u), n.appendChild(r), n.appendChild(i), n.appendChild(o), this.container.appendChild(n), this.client = new c["default"](this.options.accessToken ? this.options.accessToken : mapboxgl.accessToken), this.options.container && (this.options.position = !1), this._typeahead = new f["default"](i, []), this._typeahead.getItemValue = function(e) {
                        return e.place_name
                    }, n
                }, t.prototype._geocode = function(e, t) {
                    var n = this;
                    this._loadingEl.classList.toggle("active", !0), this.fire("geocoder.loading");
                    var r = {};
                    return this.options.proximity && (r.proximity = {
                        longitude: this.options.proximity[0],
                        latitude: this.options.proximity[1]
                    }), this.options.country && (r.country = this.options.country), this.options.types && (r.types = this.options.types), this.client.geocodeForward(e.trim(), r, function(e, r) {
                        return n._loadingEl.classList.toggle("active", !1), e ? n.fire("geocoder.error", {
                            error: e.message
                        }) : (r.features.length || (n._typeahead.selected = null), n._typeahead.update(r.features), n._clearEl.classList.toggle("active", r.features.length), t(r.features))
                    })
                }, t.prototype._queryFromInput = function(e) {
                    var t = this;
                    e = e.trim(), e || this._clear(), e.length > 2 && this._geocode(e, function(e) {
                        t._results = e
                    })
                }, t.prototype._change = function() {
                    var e = document.createEvent("HTMLEvents");
                    e.initEvent("change", !0, !1), this._inputEl.dispatchEvent(e)
                }, t.prototype._query = function(e) {
                    var t = this;
                    if (e) {
                        var n = "string" == typeof e ? e : e.join();
                        this._geocode(n, function(e) {
                            if (e.length) {
                                var n = e[0];
                                t._results = e, t._typeahead.selected = n, t._inputEl.value = n.place_name, t._change()
                            }
                        })
                    }
                }, t.prototype._clear = function() {
                    this._input = null, this._inputEl.value = "", this._typeahead.selected = null, this._typeahead.clear(), this._change(), this._inputEl.focus(), this._clearEl.classList.remove("active"), this.fire("geocoder.clear")
                }, t.prototype.getResult = function() {
                    return this._input
                }, t.prototype.query = function(e) {
                    return this._query(e), this
                }, t.prototype.on = function(e, t) {
                    return this._ev.on(e, t), this
                }, t.prototype.fire = function(e, t) {
                    return this._ev.emit(e, t), this
                }, t.prototype.off = function(e, t) {
                    return this._ev.removeListener(e, t), this
                }, t
            }(mapboxgl.Control);
        n["default"] = h, t.exports = n["default"]
    }, {
        events: 3,
        "lodash.debounce": 8,
        "mapbox/lib/services/geocoder": 16,
        suggestions: 60
    }]
}, {}, [1]);