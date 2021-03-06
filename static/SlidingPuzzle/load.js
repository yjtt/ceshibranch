!function(t, r) {
	"object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.initNECaptcha = r() : t.initNECaptcha = r()
}(this, function() {
	return function(t) {
		function r(e) {
			if (n[e]) return n[e].exports;
			var o = n[e] = {
				exports: {},
				id: e,
				loaded: !1
			};
			return t[e].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports
		}
		var n = {};
		return r.m = t, r.c = n, r.p = "/", r(0)
	}([function(t, r, n) {
		n(15), n(17), n(16), n(14);
		var e = n(12);
		t.exports = e
	}, function(t, r) {
		function n(t, r, n) {
			return r in t ? Object.defineProperty(t, r, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : t[r] = n, t
		}
		function e(t, r) {
			function n() {}
			n.prototype = r.prototype, t.prototype = new n, t.prototype.constructor = t
		}
		function o(t, r, n) {
			this.name = "CaptchaError", this.code = t, this.message = t + ("(" + v[t] + ")") + (r ? " - " + r : ""), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack, this.data = n || {}
		}
		var i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
		function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, c = "prototype", u = 100, s = 200, l = 500, f = 501, p = 502, h = 503, d = 504, y = 1e3, v = (i = {}, n(i, u, "script error"), n(i, s, "business error"), n(i, l, "request error"), n(i, f, "request api error"), n(i, p, "request script error"), n(i, h, "request img error"), n(i, d, "request timeout error"), n(i, y, "unknown error"), i);
		e(o, Error), o[c].toString = function() {
			var t = String(this.stack);
			return 0 === t.indexOf("CaptchaError:") ? t : this.name + ": " + this.message + (t ? "\n    " + t : "")
		}, o.set = function(t, r) {
			"number" == typeof t && "string" == typeof r && (v[t] = r), "object" === ("undefined" == typeof t ? "undefined" : a(t)) && t && Object.assign(v, t)
		}, o.get = function(t) {
			return v[t]
		}, o.remove = function(t) {
			String(t) in v && delete v[t]
		}, r = t.exports = o, r.SCRIPT_ERROR = u, r.BUSINESS_ERROR = s, r.REQUEST_ERROR = l, r.REQUEST_API_ERROR = f, r.REQUEST_SCRIPT_ERROR = p, r.REQUEST_IMG_ERROR = h, r.REQUEST_TIMEOUT_ERROR = d, r.UNKNOWN_ERROR = y
	}, function(t, r, n) {
		function e(t, r) {
			var n = {};
			for (var e in t) r.indexOf(e) >= 0 || Object.prototype.hasOwnProperty.call(t, e) && (n[e] = t[e]);
			return n
		}
		var o = Object.assign ||
		function(t) {
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		}, i = n(18), a = n(3), c = n(7), u = n(10), s = 0, l = function(t) {
			return "string" == typeof t ? [t, t] : Array.isArray(t) && 1 === t.length ? t.concat(t) : t
		}, f = {
			script: function(t, r) {
				var n = this;
				i(t, {
					charset: "UTF-8"
				}, function(e, o) {
					if (e) {
						var i = new Error("Failed to load script(" + t + ")." + e.message);
						return i.data = {
							url: t,
							retry: !! n._options.retry
						}, void r(i)
					}
					r(o)
				})
			},
			image: function(t, r) {
				var n = this,
					e = document.createElement("img");
				e.onload = function() {
					e.onload = e.onerror = null, r({
						width: e.width,
						height: e.height,
						src: t
					})
				}, e.onerror = function(o) {
					e.onload = e.onerror = null;
					var i = new Error("Failed to load image(" + t + ")." + o.message);
					i.data = {
						url: t,
						retry: !! n._options.retry
					}, r(i)
				}, e.src = t
			},
			api: function(t, r, n) {
				var e = this;
				u(t, n, function(n, o) {
					if (n) {
						var i = new Error("Failed to request api(" + t + ")." + n.message);
						return i.data = {
							url: t,
							retry: !! e._options.retry
						}, void r(i)
					}
					r(o)
				}, {
					timeout: this.timeout
				})
			}
		}, p = function(t) {
			this.id = t.id || "resource_" + s++, this.type = t.type || "script", this.url = t.url || "", this.payload = t.payload, this.timeout = t.timeout || 6e3, this._options = t, a.call(this), this.load(), this.setTimeout()
		};
		c(p, a), Object.assign(p.prototype, {
			load: function() {
				var t = this,
					r = f[this.type];
				r && r.call(this, this.url, function(r) {
					return t.resolve(r)
				}, this.payload)
			},
			addSupport: function(t, r, n) {
				("function" != typeof f[t] || n) && (f[t] = r)
			},
			setTimeout: function() {
				var t = this;
				window.setTimeout(function() {
					var r = String(t.url),
						n = new Error("Timeout: failed to request " + t.type + "(" + r + ").");
					n.data = {
						url: r
					}, t.resolve(n)
				}, this.timeout)
			}
		}), p.SUPPORTS = f;
		var h = function(t) {
				f.hasOwnProperty(t) && (p[t] = function(r) {
					var n = r.disableRetry,
						i = r.onTryError,
						c = e(r, ["disableRetry", "onTryError"]);
					if (n) {
						var u = c.url;
						return Array.isArray(u) && (u = u[0] || ""), new p(o({}, c, {
							url: u,
							type: t
						}))
					}
					var s = l(r.url),
						f = new a,
						h = function d() {
							var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
								n = s[r],
								e = new p(o({}, c, {
									type: t,
									url: n,
									retry: r > 0
								}));
							e.then(function(t) {
								return f.resolve(t)
							})["catch"](function(e) {
								var a = s.length;
								r < a - 1 ? d(r + 1) : r === a - 1 && (e.data = o({}, e.data, {
									url: String(s)
								}), f.resolve(e)), "function" == typeof i && i(e, {
									type: t,
									urls: s,
									url: n,
									index: r
								})
							})
						};
					return h(0), f
				})
			};
		for (var d in f) h(d);
		p.all = function(t) {
			var r = 0,
				n = !1,
				e = new a,
				o = [];
			return t.map(function(i, a) {
				i.then(function(i) {
					n || (o[a] = i, r++, r === t.length && e.resolve(o))
				})["catch"](function(t) {
					n = !0, e.resolve(t)
				})
			}), e
		}, t.exports = p
	}, function(t, r) {
		function n() {
			this._state = i, this._arg = void 0, this._fullfilledCallback = [], this._rejectedCallback = []
		}
		function e(t) {
			window.setTimeout(t, 1)
		}
		function o(t) {
			if (t) {
				var r = new n;
				t.then = function() {
					return r.then.apply(r, arguments)
				}, t["catch"] = function() {
					return r["catch"].apply(r, arguments)
				}, t["finally"] = function() {
					return r["finally"].apply(r, arguments)
				}, t.resolve = function() {
					return r.resolve.apply(r, arguments)
				}
			}
		}
		var i = "pending",
			a = "fullfilled",
			c = "rejected";
		Object.assign(n.prototype, {
			then: function(t, r) {
				var n = function(t) {
						return "function" == typeof t
					};
				return n(t) && this._fullfilledCallback.push(t), n(r) && this._rejectedCallback.push(r), this._state !== i && this._emit(this._state), this
			},
			"catch": function(t) {
				return this.then(null, t)
			},
			"finally": function(t) {
				return this.then(t, t)
			},
			resolve: function(t) {
				this._state === i && (t instanceof Error ? this._state = c : this._state = a, this._arg = t, this._emit(this._state))
			},
			_emit: function(t) {
				var r = this;
				switch (t) {
				case a:
					e(function() {
						r._fullfilledCallback.map(function(t) {
							return t(r._arg)
						}), r._fullfilledCallback = [], r._rejectedCallback = []
					});
					break;
				case c:
					e(function() {
						r._rejectedCallback.map(function(t) {
							return t(r._arg)
						}), r._fullfilledCallback = [], r._rejectedCallback = []
					})
				}
			}
		}), n.mixin = o, t.exports = n
	}, function(t, r) {
		t.exports = function(t) {
			var r = t.protocol,
				n = void 0 === r ? "" : r,
				e = t.host,
				o = void 0 === e ? "" : e,
				i = t.port,
				a = void 0 === i ? "" : i,
				c = t.path,
				u = void 0 === c ? "" : c,
				s = t.search,
				l = void 0 === s ? "" : s,
				f = t.hash,
				p = void 0 === f ? "" : f;
			if (n && (n = n.replace(/:?\/{0,2}$/, "://")), o) {
				var h = o.match(/^([-0-9a-zA-Z.:]*)(\/.*)?/);
				o = h[1], u = (h[2] || "") + "/" + u
			}
			if (!o && (n = ""), a) {
				if (!o) throw Error('"host" is required, if "port" was provided');
				a = ":" + a
			}
			return u && (u = u.replace(/^\/*|\/+/g, "/")), l && (l = l.replace(/^\??/, "?")), p && (p = p.replace(/^#?/, "#")), n + o + a + u + l + p
		}
	}, function(t, r, n) {
		var e = Object.assign ||
		function(t) {
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		}, o = n(2), i = n(9);
		t.exports = function(t) {
			return function(r, n, a, c) {
				Object.assign(n, {
					referer: i()
				});
				var u = e({}, t, c, {
					url: r,
					payload: n
				});
				o.api(u).then(function(t) {
					return a(null, t)
				})["catch"](a)
			}
		}
	}, function(t, r, n) {
		var e = Object.assign ||
		function(t) {
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		}, o = n(8), i = n(1), a = i.REQUEST_SCRIPT_ERROR, c = i.REQUEST_IMG_ERROR, u = i.REQUEST_API_ERROR;
		t.exports = function(t, r) {
			return function(n, s) {
				var l = s.type,
					f = s.url,
					p = s.index,
					h = {
						script: a,
						image: c,
						api: u
					},
					d = new i(h[l], n.message, e({}, r, {
						url: f
					}));
				o(d, t, {
					times: p + 1
				})
			}
		}
	}, function(t, r) {
		t.exports = function(t, r) {
			function n() {}
			n.prototype = r.prototype, t.prototype = new n, t.prototype.constructor = t
		}
	}, function(t, r, n) {
		function e(t, r, n) {
			return r in t ? Object.defineProperty(t, r, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}) : t[r] = n, t
		}
		var o, i = n(5),
			a = n(4),
			c = n(1),
			u = c.REQUEST_SCRIPT_ERROR,
			s = c.REQUEST_API_ERROR,
			l = c.REQUEST_IMG_ERROR,
			f = n(3),
			p = n(2),
			h = (o = {}, e(o, s, "api"), e(o, l, "image"), e(o, u, "script"), o),
			d = null;
		t.exports = function(t, r, n) {
			var e = r.protocol,
				o = r.apiServer,
				c = r.__serverConfig__,
				u = r.captchaId,
				s = r.timeout,
				l = new f,
				y = function(t) {
					var r = "/api/v2/collect";
					return Array.isArray(t) ? t.map(function(t) {
						return a({
							protocol: e,
							host: t,
							path: r
						})
					}) : a({
						protocol: e,
						host: t,
						path: r
					})
				},
				v = y(o || c.apiServer || "c.dun.163yun.com"),
				m = i({
					timeout: s,
					disableRetry: !0
				}),
				_ = t.data,
				g = Object.assign({
					id: u,
					token: _.token || "",
					type: h[t.code] || "other",
					target: _.url || _.resource || "",
					message: t.toString()
				}, n);
			null == window.ip && (window.ip = function(t, r, n) {
				d = {
					ip: t,
					dns: n
				}
			});
			var E = new p({
				url: e + "://nstool.netease.com/ip.js",
				timeout: s
			});
			return E.then(function(t) {
				t && t.parentElement.removeChild(t)
			})["finally"](function() {
				Object.assign(g, d), m(v, g, function(t, r) {
					if (t || r.error) {
						console && console.warn("Failed to collect error.");
						var n = new Error(t ? t.message : r.msg);
						return n.data = {
							url: v
						}, void l.resolve(n)
					}
					l.resolve()
				})
			}), l
		}
	}, function(t, r) {
		t.exports = function() {
			return location.href.replace(/\?[\s\S]*/, "").substring(0, 128)
		}
	}, function(t, r) {
		function n() {}
		function e(t, r, e, a) {
			function c() {
				l.parentNode && l.parentNode.removeChild(l), window[d] = n, f && clearTimeout(f)
			}
			function u() {
				window[d] && c()
			}
			function s(t) {
				var r = [];
				for (var n in t) t.hasOwnProperty(n) && r.push(m(n) + "=" + m(t[n]));
				return r.join("&")
			}
			"object" === ("undefined" == typeof e ? "undefined" : o(e)) && (a = e, e = null), "function" == typeof r && (e = r, r = null), a || (a = {});
			var l, f, p = Math.random().toString(36).slice(2, 9),
				h = a.prefix || "__JSONP",
				d = a.name || h + ("_" + p) + ("_" + i++),
				y = a.param || "callback",
				v = a.timeout || 6e3,
				m = window.encodeURIComponent,
				_ = document.getElementsByTagName("script")[0] || document.head;
			return v && (f = setTimeout(function() {
				c(), e && e(new Error("Timeout"))
			}, v)), window[d] = function(t) {
				c(), e && e(null, t)
			}, r && (t = t.split("?")[0]), t += (~t.indexOf("?") ? "&" : "?") + s(r) + "&" + y + "=" + m(d), t = t.replace("?&", "?"), l = document.createElement("script"), l.type = "text/javascript", l.src = t, _.parentNode.insertBefore(l, _), u
		}
		var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
		function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, i = 0;
		t.exports = e
	}, function(t, r, n) {
		function e() {
			this._events = {}
		}
		var o = n(3);
		t.exports = e, Object.assign(e.prototype, {
			on: function(t, r) {
				var n = this._events;
				return n[t] || (n[t] = []), n[t].push(r), this
			},
			once: function(t, r) {
				var n = this,
					e = function o() {
						r.apply(void 0, arguments), n.off(t, o)
					};
				return this.on(t, e)
			},
			off: function(t, r) {
				if (t) if (t && !r) this._events[t] = [];
				else {
					var n = this._events[t] || [],
						e = n.indexOf(r);
					e > -1 && n.splice(e, 1)
				} else this._events = {};
				return this
			},
			emit: function(t) {
				for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), e = 1; e < r; e++) n[e - 1] = arguments[e];
				var i = this._events[t] || [],
					a = new o,
					c = {},
					u = function s(t) {
						var r = i[t];
						if (!r) return void a.resolve(c);
						var e = !1,
							o = {
								async: function() {
									return e = !0, function(r) {
										return r instanceof Error ? void a.resolve(r) : void s(t + 1)
									}
								}
							};
						r.call.apply(r, [o].concat(n, [c])), !e && s(t + 1)
					};
				return u(0), a
			}
		})
	}, function(t, r, n) {
		function e(t, r, n) {
			r = r ||
			function() {}, n = n ||
			function(t) {
				console && console.error('[NECaptcha] initNECaptcha(config, onload, onerror) has thrown an error. If needed, handle it yourself in callback "onerror".\n', t)
			};
			var a = {
				protocol: window.location.protocol.replace(":", ""),
				timeout: 6e3
			};
			t = Object.assign({}, a, t);
			var h = function(r) {
					var n = "plugins" + (f ? "" : ".min") + ".js";
					return Array.isArray(r) ? r.map(function(r) {
						return c({
							protocol: t.protocol,
							host: r,
							path: n
						})
					}) : c({
						protocol: t.protocol,
						host: r,
						path: n
					})
				},
				d = "loader_plugins",
				y = p[d] || i.script({
					id: d,
					url: h(t.staticServer || ["/static/SlidingPuzzle", "cstatic.dun.163yun.com"]),
					timeout: t.timeout,
					onTryError: l(t)
				});
			!p[d] && (p[d] = y), y.then(function() {
				var i = new o({
					captchaConfig: t,
					cache: p
				});
				i._hooks = {
					onload: r,
					onerror: n
				}, e.apply(i), i.run()
			})["catch"](function(t) {
				p[d] = null, n(new u(s, t.message, t.data))
			})
		}
		var o = n(13),
			i = n(2),
			a = n(3),
			c = n(4),
			u = n(1),
			s = u.REQUEST_SCRIPT_ERROR,
			l = n(6),
			f = !1,
			p = {};
		e.use = function(t) {
			this._plugins || (this._plugins = []);
			var r = t.constructor,
				n = !! r.singleton,
				e = this._plugins.map(function(t) {
					return t.constructor
				}).indexOf(r) > -1;
			e && n || this._plugins.push(t)
		}, e.apply = function(t) {
			this._plugins && this._plugins.map(function(r) {
				return r.apply(t)
			})
		}, e.VERSION = "2.1.0", e.ResourceLoader = i, e.Thenable = a, e.CaptchaError = u, t.exports = e
	}, function(t, r, n) {
		function e(t, r) {
			if (!t) throw new Error("[NECaptcha Loader] " + r)
		}
		function o(t) {
			s.call(this), e(t.captchaConfig, 'option "captchaConfig" is required.'), e(t.cache, 'option "cache" is required.'), this._captchaConfig = t.captchaConfig, this._captchaHooks = t.captchaHooks, this._cache = t.cache, this._error = null
		}
		var i = Object.assign ||
		function(t) {
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		}, a = n(5), c = n(4), u = n(1), s = n(11), l = n(7), f = n(2), p = n(6), h = u.REQUEST_API_ERROR, d = u.REQUEST_SCRIPT_ERROR, y = u.UNKNOWN_ERROR, v = !1;
		l(o, s), Object.assign(o.prototype, {
			run: function() {
				var t = this;
				this.fetchConfig(function() {
					return t.loadResources()
				})
			},
			fetchConfig: function(t) {
				var r = this,
					n = this._captchaConfig,
					e = n.captchaId,
					o = n.protocol,
					u = n.timeout,
					s = n.apiServer,
					l = n.__serverConfig__;
				null == s && (s = "c.dun.163yun.com");
				var f = function() {
						var t = "/api/v2/getconf";
						return Array.isArray(s) ? s.map(function(r) {
							return c({
								protocol: o,
								host: r,
								path: t
							})
						}) : c({
							protocol: o,
							host: s,
							path: t
						})
					},
					d = f(),
					y = {
						id: e
					},
					m = {
						timeout: u
					},
					_ = a(i({}, m, {
						onTryError: p(this._captchaConfig)
					})),
					g = function() {
						_(d, y, function(n, e) {
							if (n || e.error) {
								var o = n ? n.message : e.msg,
									i = new Error(o + " (" + d + ")");
								return i.data = {
									url: d
								}, void r.catchError(i, h)
							}
							var a = function(t) {
									var n = r._captchaConfig;
									null == n.apiServer && (n.apiServer = t.apiServer), null == n.staticServer && (n.staticServer = t.staticServers), n.theme = t.theme, n.__serverConfig__ = t
								},
								c = e.data;
							v && l && (c = l), a(c), r.emit("after-config", r._captchaConfig.__serverConfig__).then(t)["catch"](function(t) {
								return r.catchError(t)
							})
						})
					};
				this.emit("before-config", {
					params: y,
					jsonpOpts: m
				}).then(g)["catch"](function(t) {
					return r.catchError(t)
				})
			},
			loadResources: function() {
				var t = this,
					r = this._captchaConfig,
					n = r.protocol,
					e = r.timeout,
					o = r.staticServer,
					i = r.__serverConfig__,
					a = function(t, r) {
						return Array.isArray(t) ? t.map(function(t) {
							return c({
								protocol: n,
								host: t,
								path: r
							})
						}) : c({
							protocol: n,
							host: t,
							path: r
						})
					};
				this.emit("before-load", o).then(function() {
					var r = i.resources.map(function(r) {
						var n = a(o, r),
							i = n[0],
							c = t._cache[i];
						return c || (c = f.script({
							id: i,
							url: n,
							timeout: e,
							onTryError: p(t._captchaConfig)
						}), t._cache[i] = c, c["catch"](function() {
							t._cache[i] = null
						})), c
					});
					f.all(r).then(function() {
						t.emit("after-load")["catch"](function(r) {
							return t.catchError(r)
						})
					})["catch"](function(r) {
						return t.catchError(r, d)
					})
				})["catch"](function(r) {
					return t.catchError(r)
				})
			},
			catchError: function(t, r) {
				if (!this._error) {
					var n = new u(r || y, t.message, t.data);
					this._error = n, this.emit("error", n)
				}
			}
		}), t.exports = o
	}, function(t, r) {
		Array.isArray || (Array.isArray = function(t) {
			return "[object Array]" === Object.prototype.toString.call(t)
		})
	}, function(t, r) {
		"function" != typeof Object.assign && (Object.assign = function(t) {
			if (null == t) throw new TypeError("Cannot convert undefined or null to object");
			t = Object(t);
			for (var r = 1; r < arguments.length; r++) {
				var n = arguments[r];
				if (null != n) for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (t[e] = n[e])
			}
			return t
		})
	}, function(t, r) {
		Array.prototype.indexOf || (Array.prototype.indexOf = function(t, r) {
			var n;
			if (null == this) throw new TypeError('"this" is null or not defined');
			var e = Object(this),
				o = e.length >>> 0;
			if (0 === o) return -1;
			var i = +r || 0;
			if (Math.abs(i) === 1 / 0 && (i = 0), i >= o) return -1;
			for (n = Math.max(i >= 0 ? i : o - Math.abs(i), 0); n < o;) {
				if (n in e && e[n] === t) return n;
				n++
			}
			return -1
		})
	}, function(t, r) {
		Array.prototype.map || (Array.prototype.map = function(t, r) {
			var n, e, o;
			if (null == this) throw new TypeError(" this is null or not defined");
			var i = Object(this),
				a = i.length >>> 0;
			if ("[object Function]" !== Object.prototype.toString.call(t)) throw new TypeError(t + " is not a function");
			for (r && (n = r), e = new Array(a), o = 0; o < a;) {
				var c, u;
				o in i && (c = i[o], u = t.call(n, c, o, i), e[o] = u), o++
			}
			return e
		})
	}, function(t, r) {
		function n(t, r) {
			for (var n in r) t.setAttribute(n, r[n])
		}
		function e(t, r) {
			t.onload = function() {
				this.onerror = this.onload = null, r(null, t)
			}, t.onerror = function() {
				this.onerror = this.onload = null, r(new Error("Failed to load " + this.src), t)
			}
		}
		function o(t, r) {
			t.onreadystatechange = function() {
				"complete" != this.readyState && "loaded" != this.readyState || (this.onreadystatechange = null, r(null, t))
			}
		}
		t.exports = function(t, r, i) {
			var a = document.head || document.getElementsByTagName("head")[0],
				c = document.createElement("script");
			"function" == typeof r && (i = r, r = {}), r = r || {}, i = i ||
			function() {}, c.type = r.type || "text/javascript", c.charset = r.charset || "utf8", c.async = !("async" in r) || !! r.async, c.src = t, r.attrs && n(c, r.attrs), r.text && (c.text = "" + r.text);
			var u = "onload" in c ? e : o;
			u(c, i), c.onload || e(c, i), a.appendChild(c)
		}
	}])
});