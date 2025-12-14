'use strict';
var t, e; t = self, e = function () { return (() => { var t = { d: (e, n) => { for (var o in n) t.o(n, o) && !t.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: n[o] }) } }; t.g = function () { if ("object" == typeof globalThis) return globalThis; try { return this || new Function("return this")() } catch (t) { if ("object" == typeof window) return window } }(), t.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), t.r = t => { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "t", { value: !0 }) }; var e, n = {}; t.r(n), t.d(n, { AbortError: () => s, DefaultHttpClient: () => q, HttpClient: () => d, HttpError: () => o, HttpResponse: () => u, HttpTransportType: () => O, HubConnection: () => j, HubConnectionBuilder: () => Z, HubConnectionState: () => W, JsonHubProtocol: () => G, LogLevel: () => e, MessageType: () => H, NullLogger: () => p, Subject: () => L, TimeoutError: () => r, TransferFormat: () => _, VERSION: () => g }); class o extends Error { constructor(t, e) { const n = new.target.prototype; super(`${t}: Status code '${e}'`), this.statusCode = e, this.__proto__ = n } } class r extends Error { constructor(t = "A timeout occurred.") { const e = new.target.prototype; super(t), this.__proto__ = e } } class s extends Error { constructor(t = "An abort occurred.") { const e = new.target.prototype; super(t), this.__proto__ = e } } class i extends Error { constructor(t, e) { const n = new.target.prototype; super(t), this.transport = e, this.errorType = "UnsupportedTransportError", this.__proto__ = n } } class c extends Error { constructor(t, e) { const n = new.target.prototype; super(t), this.transport = e, this.errorType = "DisabledTransportError", this.__proto__ = n } } class a extends Error { constructor(t, e) { const n = new.target.prototype; super(t), this.transport = e, this.errorType = "FailedToStartTransportError", this.__proto__ = n } } class h extends Error { constructor(t) { const e = new.target.prototype; super(t), this.errorType = "FailedToNegotiateWithServerError", this.__proto__ = e } } class l extends Error { constructor(t, e) { const n = new.target.prototype; super(t), this.innerErrors = e, this.__proto__ = n } } class u { constructor(t, e, n) { this.statusCode = t, this.statusText = e, this.content = n } } class d { get(t, e) { return this.send({ ...e, method: "GET", url: t }) } post(t, e) { return this.send({ ...e, method: "POST", url: t }) } delete(t, e) { return this.send({ ...e, method: "DELETE", url: t }) } getCookieString(t) { return "" } } !function (t) { t[t.Trace = 0] = "Trace", t[t.Debug = 1] = "Debug", t[t.Information = 2] = "Information", t[t.Warning = 3] = "Warning", t[t.Error = 4] = "Error", t[t.Critical = 5] = "Critical", t[t.None = 6] = "None" }(e || (e = {})); class p { constructor() { } log(t, e) { } } p.instance = new p; const g = "6.0.1"; class f { static isRequired(t, e) { if (null == t) throw new Error(`The '${e}' argument is required.`) } static isNotEmpty(t, e) { if (!t || t.match(/^\s*$/)) throw new Error(`The '${e}' argument should not be empty.`) } static isIn(t, e, n) { if (!(t in e)) throw new Error(`Unknown ${n} value: ${t}.`) } } class w { static get isBrowser() { return "object" == typeof window } static get isWebWorker() { return "object" == typeof self && "importScripts" in self } static get isNode() { return !this.isBrowser && !this.isWebWorker } } function m(t, e) { let n = ""; return b(t) ? (n = `Binary data of length ${t.byteLength}`, e && (n += `. Content: '${function (t) { const e = new Uint8Array(t); let n = ""; return e.forEach((t => { n += `0x${t < 16 ? "0" : ""}${t.toString(16)} ` })), n.substr(0, n.length - 1) }(t)}'`)) : "string" == typeof t && (n = `String data of length ${t.length}`, e && (n += `. Content: '${t}'`)), n } function b(t) { return t && "undefined" != typeof ArrayBuffer && (t instanceof ArrayBuffer || t.constructor && "ArrayBuffer" === t.constructor.name) } async function y(t, n, o, r, s, i, c) { let a = {}; if (s) { const t = await s(); t && (a = { Authorization: `Bearer ${t}` }) } const [h, l] = S(); a[h] = l, t.log(e.Trace, `(${n} transport) sending data. ${m(i, c.logMessageContent)}.`); const u = b(i) ? "arraybuffer" : "text", d = await o.post(r, { content: i, headers: { ...a, ...c.headers }, responseType: u, timeout: c.timeout, withCredentials: c.withCredentials }); t.log(e.Trace, `(${n} transport) request complete. Response status: ${d.statusCode}.`) } class v { constructor(t, e) { this.i = t, this.h = e } dispose() { const t = this.i.observers.indexOf(this.h); t > -1 && this.i.observers.splice(t, 1), 0 === this.i.observers.length && this.i.cancelCallback && this.i.cancelCallback().catch((t => { })) } } class C { constructor(t) { this.l = t, this.out = console } log(t, n) { if (t >= this.l) { const o = `[${(new Date).toISOString()}] ${e[t]}: ${n}`; switch (t) { case e.Critical: case e.Error: this.out.error(o); break; case e.Warning: this.out.warn(o); break; case e.Information: this.out.info(o); break; default: this.out.log(o) } } } } function S() { let t = "X-SignalR-User-Agent"; return w.isNode && (t = "User-Agent"), [t, E(g, $(), w.isNode ? "NodeJS" : "Browser", T())] } function E(t, e, n, o) { let r = "Microsoft SignalR/"; const s = t.split("."); return r += `${s[0]}.${s[1]}`, r += ` (${t}; `, r += e && "" !== e ? `${e}; ` : "Unknown OS; ", r += `${n}`, r += o ? `; ${o}` : "; Unknown Runtime Version", r += ")", r } function $() { if (!w.isNode) return ""; switch (process.platform) { case "win32": return "Windows NT"; case "darwin": return "macOS"; case "linux": return "Linux"; default: return process.platform } } function T() { if (w.isNode) return process.versions.node } function k(t) { return t.stack ? t.stack : t.message ? t.message : `${t}` } class P extends d { constructor(e) { if (super(), this.u = e, "undefined" == typeof fetch) { const t = require; this.p = new (t("tough-cookie").CookieJar), this.m = t("node-fetch"), this.m = t("fetch-cookie")(this.m, this.p) } else this.m = fetch.bind(function () { if ("undefined" != typeof globalThis) return globalThis; if ("undefined" != typeof self) return self; if ("undefined" != typeof window) return window; if (void 0 !== t.g) return t.g; throw new Error("could not find global") }()); if ("undefined" == typeof AbortController) { const t = require; this.v = t("abort-controller") } else this.v = AbortController } async send(t) { if (t.abortSignal && t.abortSignal.aborted) throw new s; if (!t.method) throw new Error("No method defined."); if (!t.url) throw new Error("No url defined."); const n = new this.v; let i; t.abortSignal && (t.abortSignal.onabort = () => { n.abort(), i = new s }); let c, a = null; if (t.timeout) { const o = t.timeout; a = setTimeout((() => { n.abort(), this.u.log(e.Warning, "Timeout from HTTP request."), i = new r }), o) } try { c = await this.m(t.url, { body: t.content, cache: "no-cache", credentials: !0 === t.withCredentials ? "include" : "same-origin", headers: { "Content-Type": "text/plain;charset=UTF-8", "X-Requested-With": "XMLHttpRequest", ...t.headers }, method: t.method, mode: "cors", redirect: "follow", signal: n.signal }) } catch (t) { if (i) throw i; throw this.u.log(e.Warning, `Error from HTTP request. ${t}.`), t } finally { a && clearTimeout(a), t.abortSignal && (t.abortSignal.onabort = null) } if (!c.ok) { const t = await I(c, "text"); throw new o(t || c.statusText, c.status) } const h = I(c, t.responseType), l = await h; return new u(c.status, c.statusText, l) } getCookieString(t) { let e = ""; return w.isNode && this.p && this.p.getCookies(t, ((t, n) => e = n.join("; "))), e } } function I(t, e) { let n; switch (e) { case "arraybuffer": n = t.arrayBuffer(); break; case "text": n = t.text(); break; case "blob": case "document": case "json": throw new Error(`${e} is not supported.`); default: n = t.text() }return n } class D extends d { constructor(t) { super(), this.u = t } send(t) { return t.abortSignal && t.abortSignal.aborted ? Promise.reject(new s) : t.method ? t.url ? new Promise(((n, i) => { const c = new XMLHttpRequest; c.open(t.method, t.url, !0), c.withCredentials = void 0 === t.withCredentials || t.withCredentials, c.setRequestHeader("X-Requested-With", "XMLHttpRequest"), c.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"); const a = t.headers; a && Object.keys(a).forEach((t => { c.setRequestHeader(t, a[t]) })), t.responseType && (c.responseType = t.responseType), t.abortSignal && (t.abortSignal.onabort = () => { c.abort(), i(new s) }), t.timeout && (c.timeout = t.timeout), c.onload = () => { t.abortSignal && (t.abortSignal.onabort = null), c.status >= 200 && c.status < 300 ? n(new u(c.status, c.statusText, c.response || c.responseText)) : i(new o(c.response || c.responseText || c.statusText, c.status)) }, c.onerror = () => { this.u.log(e.Warning, `Error from HTTP request. ${c.status}: ${c.statusText}.`), i(new o(c.statusText, c.status)) }, c.ontimeout = () => { this.u.log(e.Warning, "Timeout from HTTP request."), i(new r) }, c.send(t.content || "") })) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined.")) } } class q extends d { constructor(t) { if (super(), "undefined" != typeof fetch || w.isNode) this.$ = new P(t); else { if ("undefined" == typeof XMLHttpRequest) throw new Error("No usable HttpClient found."); this.$ = new D(t) } } send(t) { return t.abortSignal && t.abortSignal.aborted ? Promise.reject(new s) : t.method ? t.url ? this.$.send(t) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined.")) } getCookieString(t) { return this.$.getCookieString(t) } } class R { static write(t) { return `${t}${R.RecordSeparator}` } static parse(t) { if (t[t.length - 1] !== R.RecordSeparator) throw new Error("Message is incomplete."); const e = t.split(R.RecordSeparator); return e.pop(), e } } R.RecordSeparatorCode = 30, R.RecordSeparator = String.fromCharCode(R.RecordSeparatorCode); class x { writeHandshakeRequest(t) { return R.write(JSON.stringify(t)) } parseHandshakeResponse(t) { let e, n; if (b(t)) { const o = new Uint8Array(t), r = o.indexOf(R.RecordSeparatorCode); if (-1 === r) throw new Error("Message is incomplete."); const s = r + 1; e = String.fromCharCode.apply(null, Array.prototype.slice.call(o.slice(0, s))), n = o.byteLength > s ? o.slice(s).buffer : null } else { const o = t, r = o.indexOf(R.RecordSeparator); if (-1 === r) throw new Error("Message is incomplete."); const s = r + 1; e = o.substring(0, s), n = o.length > s ? o.substring(s) : null } const o = R.parse(e), r = JSON.parse(o[0]); if (r.type) throw new Error("Expected a handshake response from the server."); return [n, r] } } var H, W; !function (t) { t[t.Invocation = 1] = "Invocation", t[t.StreamItem = 2] = "StreamItem", t[t.Completion = 3] = "Completion", t[t.StreamInvocation = 4] = "StreamInvocation", t[t.CancelInvocation = 5] = "CancelInvocation", t[t.Ping = 6] = "Ping", t[t.Close = 7] = "Close" }(H || (H = {})); class L { constructor() { this.observers = [] } next(t) { for (const e of this.observers) e.next(t) } error(t) { for (const e of this.observers) e.error && e.error(t) } complete() { for (const t of this.observers) t.complete && t.complete() } subscribe(t) { return this.observers.push(t), new v(this, t) } } !function (t) { t.Disconnected = "Disconnected", t.Connecting = "Connecting", t.Connected = "Connected", t.Disconnecting = "Disconnecting", t.Reconnecting = "Reconnecting" }(W || (W = {})); class j { constructor(t, n, o, r) { this.C = 0, this.S = () => { this.u.log(e.Warning, "The page is being frozen, this will likely lead to the connection being closed and messages being lost. For more information see the docs at https://docs.microsoft.com/aspnet/core/signalr/javascript-client#bsleep") }, f.isRequired(t, "connection"), f.isRequired(n, "logger"), f.isRequired(o, "protocol"), this.serverTimeoutInMilliseconds = 3e4, this.keepAliveIntervalInMilliseconds = 15e3, this.u = n, this.k = o, this.connection = t, this.P = r, this.T = new x, this.connection.onreceive = t => this.I(t), this.connection.onclose = t => this._(t), this.H = {}, this.D = {}, this.A = [], this.R = [], this.U = [], this.L = 0, this.N = !1, this.q = W.Disconnected, this.M = !1, this.W = this.k.writeMessage({ type: H.Ping }) } static create(t, e, n, o) { return new j(t, e, n, o) } get state() { return this.q } get connectionId() { return this.connection && this.connection.connectionId || null } get baseUrl() { return this.connection.baseUrl || "" } set baseUrl(t) { if (this.q !== W.Disconnected && this.q !== W.Reconnecting) throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url."); if (!t) throw new Error("The HubConnection url must be a valid url."); this.connection.baseUrl = t } start() { return this.O = this.j(), this.O } async j() { if (this.q !== W.Disconnected) return Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state.")); this.q = W.Connecting, this.u.log(e.Debug, "Starting HubConnection."); try { await this.F(), w.isBrowser && document && document.addEventListener("freeze", this.S), this.q = W.Connected, this.M = !0, this.u.log(e.Debug, "HubConnection connected successfully.") } catch (t) { return this.q = W.Disconnected, this.u.log(e.Debug, `HubConnection failed to start successfully because of error '${t}'.`), Promise.reject(t) } } async F() { this.B = void 0, this.N = !1; const t = new Promise(((t, e) => { this.X = t, this.J = e })); await this.connection.start(this.k.transferFormat); try { const n = { protocol: this.k.name, version: this.k.version }; if (this.u.log(e.Debug, "Sending handshake request."), await this.V(this.T.writeHandshakeRequest(n)), this.u.log(e.Information, `Using HubProtocol '${this.k.name}'.`), this.G(), this.K(), this.Y(), await t, this.B) throw this.B } catch (t) { throw this.u.log(e.Debug, `Hub handshake failed with error '${t}' during start(). Stopping HubConnection.`), this.G(), this.Z(), await this.connection.stop(t), t } } async stop() { const t = this.O; this.tt = this.et(), await this.tt; try { await t } catch (t) { } } et(t) { return this.q === W.Disconnected ? (this.u.log(e.Debug, `Call to HubConnection.stop(${t}) ignored because it is already in the disconnected state.`), Promise.resolve()) : this.q === W.Disconnecting ? (this.u.log(e.Debug, `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`), this.tt) : (this.q = W.Disconnecting, this.u.log(e.Debug, "Stopping HubConnection."), this.st ? (this.u.log(e.Debug, "Connection stopped during reconnect delay. Done reconnecting."), clearTimeout(this.st), this.st = void 0, this.nt(), Promise.resolve()) : (this.G(), this.Z(), this.B = t || new Error("The connection was stopped before the hub handshake could complete."), this.connection.stop(t))) } stream(t, ...e) { const [n, o] = this.it(e), r = this.rt(t, e, o); let s; const i = new L; return i.cancelCallback = () => { const t = this.ot(r.invocationId); return delete this.H[r.invocationId], s.then((() => this.ht(t))) }, this.H[r.invocationId] = (t, e) => { e ? i.error(e) : t && (t.type === H.Completion ? t.error ? i.error(new Error(t.error)) : i.complete() : i.next(t.item)) }, s = this.ht(r).catch((t => { i.error(t), delete this.H[r.invocationId] })), this.ct(n, s), i } V(t) { return this.Y(), this.connection.send(t) } ht(t) { return this.V(this.k.writeMessage(t)) } send(t, ...e) { const [n, o] = this.it(e), r = this.ht(this.at(t, e, !0, o)); return this.ct(n, r), r } invoke(t, ...e) { const [n, o] = this.it(e), r = this.at(t, e, !1, o); return new Promise(((t, e) => { this.H[r.invocationId] = (n, o) => { o ? e(o) : n && (n.type === H.Completion ? n.error ? e(new Error(n.error)) : t(n.result) : e(new Error(`Unexpected message type: ${n.type}`))) }; const o = this.ht(r).catch((t => { e(t), delete this.H[r.invocationId] })); this.ct(n, o) })) } on(t, e) { t && e && (t = t.toLowerCase(), this.D[t] || (this.D[t] = []), -1 === this.D[t].indexOf(e) && this.D[t].push(e)) } off(t, e) { if (!t) return; t = t.toLowerCase(); const n = this.D[t]; if (n) if (e) { const o = n.indexOf(e); -1 !== o && (n.splice(o, 1), 0 === n.length && delete this.D[t]) } else delete this.D[t] } onclose(t) { t && this.A.push(t) } onreconnecting(t) { t && this.R.push(t) } onreconnected(t) { t && this.U.push(t) } I(t) { if (this.G(), this.N || (t = this.lt(t), this.N = !0), t) { const n = this.k.parseMessages(t, this.u); for (const o of n) switch (o.type) { case H.Invocation: this.ut(o); break; case H.StreamItem: case H.Completion: { const n = this.H[o.invocationId]; if (n) { o.type === H.Completion && delete this.H[o.invocationId]; try { n(o) } catch (t) { this.u.log(e.Error, `Stream callback threw error: ${k(t)}`) } } break } case H.Ping: break; case H.Close: { this.u.log(e.Information, "Close message received from server."); const t = o.error ? new Error("Server returned an error on close: " + o.error) : void 0; !0 === o.allowReconnect ? this.connection.stop(t) : this.tt = this.et(t); break } default: this.u.log(e.Warning, `Invalid message type: ${o.type}.`) } } this.K() } lt(t) { let n, o; try { [o, n] = this.T.parseHandshakeResponse(t) } catch (t) { const n = "Error parsing handshake response: " + t; this.u.log(e.Error, n); const o = new Error(n); throw this.J(o), o } if (n.error) { const t = "Server returned handshake error: " + n.error; this.u.log(e.Error, t); const o = new Error(t); throw this.J(o), o } return this.u.log(e.Debug, "Server handshake complete."), this.X(), o } Y() { this.connection.features.inherentKeepAlive || (this.C = (new Date).getTime() + this.keepAliveIntervalInMilliseconds, this.Z()) } K() { if (!(this.connection.features && this.connection.features.inherentKeepAlive || (this.dt = setTimeout((() => this.serverTimeout()), this.serverTimeoutInMilliseconds), void 0 !== this.ft))) { let t = this.C - (new Date).getTime(); t < 0 && (t = 0), this.ft = setTimeout((async () => { if (this.q === W.Connected) try { await this.V(this.W) } catch { this.Z() } }), t) } } serverTimeout() { this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server.")) } ut(t) { const n = this.D[t.target.toLowerCase()]; if (n) { try { n.forEach((e => e.apply(this, t.arguments))) } catch (n) { this.u.log(e.Error, `A callback for the method ${t.target.toLowerCase()} threw error '${n}'.`) } if (t.invocationId) { const t = "Server requested a response, which is not supported in this version of the client."; this.u.log(e.Error, t), this.tt = this.et(new Error(t)) } } else this.u.log(e.Warning, `No client method with the name '${t.target}' found.`) } _(t) { this.u.log(e.Debug, `HubConnection.connectionClosed(${t}) called while in state ${this.q}.`), this.B = this.B || t || new Error("The underlying connection was closed before the hub handshake could complete."), this.X && this.X(), this.wt(t || new Error("Invocation canceled due to the underlying connection being closed.")), this.G(), this.Z(), this.q === W.Disconnecting ? this.nt(t) : this.q === W.Connected && this.P ? this.gt(t) : this.q === W.Connected && this.nt(t) } nt(t) { if (this.M) { this.q = W.Disconnected, this.M = !1, w.isBrowser && document && document.removeEventListener("freeze", this.S); try { this.A.forEach((e => e.apply(this, [t]))) } catch (n) { this.u.log(e.Error, `An onclose callback called with error '${t}' threw error '${n}'.`) } } } async gt(t) { const n = Date.now(); let o = 0, r = void 0 !== t ? t : new Error("Attempting to reconnect due to a unknown error."), s = this.yt(o++, 0, r); if (null === s) return this.u.log(e.Debug, "Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt."), void this.nt(t); if (this.q = W.Reconnecting, t ? this.u.log(e.Information, `Connection reconnecting because of error '${t}'.`) : this.u.log(e.Information, "Connection reconnecting."), 0 !== this.R.length) { try { this.R.forEach((e => e.apply(this, [t]))) } catch (n) { this.u.log(e.Error, `An onreconnecting callback called with error '${t}' threw error '${n}'.`) } if (this.q !== W.Reconnecting) return void this.u.log(e.Debug, "Connection left the reconnecting state in onreconnecting callback. Done reconnecting.") } for (; null !== s;) { if (this.u.log(e.Information, `Reconnect attempt number ${o} will start in ${s} ms.`), await new Promise((t => { this.st = setTimeout(t, s) })), this.st = void 0, this.q !== W.Reconnecting) return void this.u.log(e.Debug, "Connection left the reconnecting state during reconnect delay. Done reconnecting."); try { if (await this.F(), this.q = W.Connected, this.u.log(e.Information, "HubConnection reconnected successfully."), 0 !== this.U.length) try { this.U.forEach((t => t.apply(this, [this.connection.connectionId]))) } catch (t) { this.u.log(e.Error, `An onreconnected callback called with connectionId '${this.connection.connectionId}; threw error '${t}'.`) } return } catch (t) { if (this.u.log(e.Information, `Reconnect attempt failed because of error '${t}'.`), this.q !== W.Reconnecting) return this.u.log(e.Debug, `Connection moved to the '${this.q}' from the reconnecting state during reconnect attempt. Done reconnecting.`), void (this.q === W.Disconnecting && this.nt()); r = t instanceof Error ? t : new Error(t.toString()), s = this.yt(o++, Date.now() - n, r) } } this.u.log(e.Information, `Reconnect retries have been exhausted after ${Date.now() - n} ms and ${o} failed attempts. Connection disconnecting.`), this.nt() } yt(t, n, o) { try { return this.P.nextRetryDelayInMilliseconds({ elapsedMilliseconds: n, previousRetryCount: t, retryReason: o }) } catch (o) { return this.u.log(e.Error, `IRetryPolicy.nextRetryDelayInMilliseconds(${t}, ${n}) threw error '${o}'.`), null } } wt(t) { const n = this.H; this.H = {}, Object.keys(n).forEach((o => { const r = n[o]; try { r(null, t) } catch (n) { this.u.log(e.Error, `Stream 'error' callback called with '${t}' threw error: ${k(n)}`) } })) } Z() { this.ft && (clearTimeout(this.ft), this.ft = void 0) } G() { this.dt && clearTimeout(this.dt) } at(t, e, n, o) { if (n) return 0 !== o.length ? { arguments: e, streamIds: o, target: t, type: H.Invocation } : { arguments: e, target: t, type: H.Invocation }; { const n = this.L; return this.L++, 0 !== o.length ? { arguments: e, invocationId: n.toString(), streamIds: o, target: t, type: H.Invocation } : { arguments: e, invocationId: n.toString(), target: t, type: H.Invocation } } } ct(t, e) { if (0 !== t.length) { e || (e = Promise.resolve()); for (const n in t) t[n].subscribe({ complete: () => { e = e.then((() => this.ht(this.bt(n)))) }, error: t => { let o; o = t instanceof Error ? t.message : t && t.toString ? t.toString() : "Unknown error", e = e.then((() => this.ht(this.bt(n, o)))) }, next: t => { e = e.then((() => this.ht(this.vt(n, t)))) } }) } } it(t) { const e = [], n = []; for (let o = 0; o < t.length; o++) { const r = t[o]; if (this.Et(r)) { const s = this.L; this.L++, e[s] = r, n.push(s.toString()), t.splice(o, 1) } } return [e, n] } Et(t) { return t && t.subscribe && "function" == typeof t.subscribe } rt(t, e, n) { const o = this.L; return this.L++, 0 !== n.length ? { arguments: e, invocationId: o.toString(), streamIds: n, target: t, type: H.StreamInvocation } : { arguments: e, invocationId: o.toString(), target: t, type: H.StreamInvocation } } ot(t) { return { invocationId: t, type: H.CancelInvocation } } vt(t, e) { return { invocationId: t, item: e, type: H.StreamItem } } bt(t, e, n) { return e ? { error: e, invocationId: t, type: H.Completion } : { invocationId: t, result: n, type: H.Completion } } } const A = [0, 2e3, 1e4, 3e4, null]; class N { constructor(t) { this.$t = void 0 !== t ? [...t, null] : A } nextRetryDelayInMilliseconds(t) { return this.$t[t.previousRetryCount] } } class U { } var O, _; U.Authorization = "Authorization", U.Cookie = "Cookie", function (t) { t[t.None = 0] = "None", t[t.WebSockets = 1] = "WebSockets", t[t.ServerSentEvents = 2] = "ServerSentEvents", t[t.LongPolling = 4] = "LongPolling" }(O || (O = {})), function (t) { t[t.Text = 1] = "Text", t[t.Binary = 2] = "Binary" }(_ || (_ = {})); class M { constructor() { this.Ct = !1, this.onabort = null } abort() { this.Ct || (this.Ct = !0, this.onabort && this.onabort()) } get signal() { return this } get aborted() { return this.Ct } } class B { constructor(t, e, n, o) { this.$ = t, this.St = e, this.u = n, this.kt = new M, this.Pt = o, this.Tt = !1, this.onreceive = null, this.onclose = null } get pollAborted() { return this.kt.aborted } async connect(t, n) { if (f.isRequired(t, "url"), f.isRequired(n, "transferFormat"), f.isIn(n, _, "transferFormat"), this.It = t, this.u.log(e.Trace, "(LongPolling transport) Connecting."), n === _.Binary && "undefined" != typeof XMLHttpRequest && "string" != typeof (new XMLHttpRequest).responseType) throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported."); const [r, s] = S(), i = { [r]: s, ...this.Pt.headers }, c = { abortSignal: this.kt.signal, headers: i, timeout: 1e5, withCredentials: this.Pt.withCredentials }; n === _.Binary && (c.responseType = "arraybuffer"); const a = await this._t(); this.Ht(c, a); const h = `${t}&_=${Date.now()}`; this.u.log(e.Trace, `(LongPolling transport) polling: ${h}.`); const l = await this.$.get(h, c); 200 !== l.statusCode ? (this.u.log(e.Error, `(LongPolling transport) Unexpected response code: ${l.statusCode}.`), this.Dt = new o(l.statusText || "", l.statusCode), this.Tt = !1) : this.Tt = !0, this.xt = this.At(this.It, c) } async _t() { return this.St ? await this.St() : null } Ht(t, e) { t.headers || (t.headers = {}), e ? t.headers[U.Authorization] = `Bearer ${e}` : t.headers[U.Authorization] && delete t.headers[U.Authorization] } async At(t, n) { try { for (; this.Tt;) { const s = await this._t(); this.Ht(n, s); try { const r = `${t}&_=${Date.now()}`; this.u.log(e.Trace, `(LongPolling transport) polling: ${r}.`); const s = await this.$.get(r, n); 204 === s.statusCode ? (this.u.log(e.Information, "(LongPolling transport) Poll terminated by server."), this.Tt = !1) : 200 !== s.statusCode ? (this.u.log(e.Error, `(LongPolling transport) Unexpected response code: ${s.statusCode}.`), this.Dt = new o(s.statusText || "", s.statusCode), this.Tt = !1) : s.content ? (this.u.log(e.Trace, `(LongPolling transport) data received. ${m(s.content, this.Pt.logMessageContent)}.`), this.onreceive && this.onreceive(s.content)) : this.u.log(e.Trace, "(LongPolling transport) Poll timed out, reissuing.") } catch (t) { this.Tt ? t instanceof r ? this.u.log(e.Trace, "(LongPolling transport) Poll timed out, reissuing.") : (this.Dt = t, this.Tt = !1) : this.u.log(e.Trace, `(LongPolling transport) Poll errored after shutdown: ${t.message}`) } } } finally { this.u.log(e.Trace, "(LongPolling transport) Polling complete."), this.pollAborted || this.Rt() } } async send(t) { return this.Tt ? y(this.u, "LongPolling", this.$, this.It, this.St, t, this.Pt) : Promise.reject(new Error("Cannot send until the transport is connected")) } async stop() { this.u.log(e.Trace, "(LongPolling transport) Stopping polling."), this.Tt = !1, this.kt.abort(); try { await this.xt, this.u.log(e.Trace, `(LongPolling transport) sending DELETE request to ${this.It}.`); const t = {}, [n, o] = S(); t[n] = o; const r = { headers: { ...t, ...this.Pt.headers }, timeout: this.Pt.timeout, withCredentials: this.Pt.withCredentials }, s = await this._t(); this.Ht(r, s), await this.$.delete(this.It, r), this.u.log(e.Trace, "(LongPolling transport) DELETE request sent.") } finally { this.u.log(e.Trace, "(LongPolling transport) Stop finished."), this.Rt() } } Rt() { if (this.onclose) { let t = "(LongPolling transport) Firing onclose event."; this.Dt && (t += " Error: " + this.Dt), this.u.log(e.Trace, t), this.onclose(this.Dt) } } } class F { constructor(t, e, n, o) { this.$ = t, this.St = e, this.u = n, this.Pt = o, this.onreceive = null, this.onclose = null } async connect(t, n) { if (f.isRequired(t, "url"), f.isRequired(n, "transferFormat"), f.isIn(n, _, "transferFormat"), this.u.log(e.Trace, "(SSE transport) Connecting."), this.It = t, this.St) { const e = await this.St(); e && (t += (t.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(e)}`) } return new Promise(((o, r) => { let s, i = !1; if (n === _.Text) { if (w.isBrowser || w.isWebWorker) s = new this.Pt.EventSource(t, { withCredentials: this.Pt.withCredentials }); else { const e = this.$.getCookieString(t), n = {}; n.Cookie = e; const [o, r] = S(); n[o] = r, s = new this.Pt.EventSource(t, { withCredentials: this.Pt.withCredentials, headers: { ...n, ...this.Pt.headers } }) } try { s.onmessage = t => { if (this.onreceive) try { this.u.log(e.Trace, `(SSE transport) data received. ${m(t.data, this.Pt.logMessageContent)}.`), this.onreceive(t.data) } catch (t) { return void this.Ut(t) } }, s.onerror = t => { i ? this.Ut() : r(new Error("EventSource failed to connect. The connection could not be found on the server, either the connection ID is not present on the server, or a proxy is refusing/buffering the connection. If you have multiple servers check that sticky sessions are enabled.")) }, s.onopen = () => { this.u.log(e.Information, `SSE connected to ${this.It}`), this.Lt = s, i = !0, o() } } catch (t) { return void r(t) } } else r(new Error("The Server-Sent Events transport only supports the 'Text' transfer format")) })) } async send(t) { return this.Lt ? y(this.u, "SSE", this.$, this.It, this.St, t, this.Pt) : Promise.reject(new Error("Cannot send until the transport is connected")) } stop() { return this.Ut(), Promise.resolve() } Ut(t) { this.Lt && (this.Lt.close(), this.Lt = void 0, this.onclose && this.onclose(t)) } } class J { constructor(t, e, n, o, r, s) { this.u = n, this.St = e, this.Nt = o, this.qt = r, this.$ = t, this.onreceive = null, this.onclose = null, this.Mt = s } async connect(t, n) { if (f.isRequired(t, "url"), f.isRequired(n, "transferFormat"), f.isIn(n, _, "transferFormat"), this.u.log(e.Trace, "(WebSockets transport) Connecting."), this.St) { const e = await this.St(); e && (t += (t.indexOf("?") < 0 ? "?" : "&") + `access_token=${encodeURIComponent(e)}`) } return new Promise(((o, r) => { let s; t = t.replace(/^http/, "ws"); const i = this.$.getCookieString(t); let c = !1; if (w.isNode) { const e = {}, [n, o] = S(); e[n] = o, i && (e[U.Cookie] = `${i}`), s = new this.qt(t, void 0, { headers: { ...e, ...this.Mt } }) } s || (s = new this.qt(t)), n === _.Binary && (s.binaryType = "arraybuffer"), s.onopen = n => { this.u.log(e.Information, `WebSocket connected to ${t}.`), this.Wt = s, c = !0, o() }, s.onerror = t => { let n = null; n = "undefined" != typeof ErrorEvent && t instanceof ErrorEvent ? t.error : "There was an error with the transport", this.u.log(e.Information, `(WebSockets transport) ${n}.`) }, s.onmessage = t => { if (this.u.log(e.Trace, `(WebSockets transport) data received. ${m(t.data, this.Nt)}.`), this.onreceive) try { this.onreceive(t.data) } catch (t) { return void this.Ut(t) } }, s.onclose = t => { if (c) this.Ut(t); else { let e = null; e = "undefined" != typeof ErrorEvent && t instanceof ErrorEvent ? t.error : "WebSocket failed to connect. The connection could not be found on the server, either the endpoint may not be a SignalR endpoint, the connection ID is not present on the server, or there is a proxy blocking WebSockets. If you have multiple servers check that sticky sessions are enabled.", r(new Error(e)) } } })) } send(t) { return this.Wt && this.Wt.readyState === this.qt.OPEN ? (this.u.log(e.Trace, `(WebSockets transport) sending data. ${m(t, this.Nt)}.`), this.Wt.send(t), Promise.resolve()) : Promise.reject("WebSocket is not in the OPEN state") } stop() { return this.Wt && this.Ut(void 0), Promise.resolve() } Ut(t) { this.Wt && (this.Wt.onclose = () => { }, this.Wt.onmessage = () => { }, this.Wt.onerror = () => { }, this.Wt.close(), this.Wt = void 0), this.u.log(e.Trace, "(WebSockets transport) socket closed."), this.onclose && (!this.Ot(t) || !1 !== t.wasClean && 1e3 === t.code ? t instanceof Error ? this.onclose(t) : this.onclose() : this.onclose(new Error(`WebSocket closed with status code: ${t.code} (${t.reason || "no reason given"}).`))) } Ot(t) { return t && "boolean" == typeof t.wasClean && "number" == typeof t.code } } class X { constructor(t, n = {}) { var o; if (this.jt = () => { }, this.features = {}, this.Ft = 1, f.isRequired(t, "url"), this.u = void 0 === (o = n.logger) ? new C(e.Information) : null === o ? p.instance : void 0 !== o.log ? o : new C(o), this.baseUrl = this.Bt(t), (n = n || {}).logMessageContent = void 0 !== n.logMessageContent && n.logMessageContent, "boolean" != typeof n.withCredentials && void 0 !== n.withCredentials) throw new Error("withCredentials option was not a 'boolean' or 'undefined' value"); n.withCredentials = void 0 === n.withCredentials || n.withCredentials, n.timeout = void 0 === n.timeout ? 1e5 : n.timeout; let r = null, s = null; if (w.isNode) { const t = require; r = t("ws"), s = t("eventsource") } w.isNode || "undefined" == typeof WebSocket || n.WebSocket ? w.isNode && !n.WebSocket && r && (n.WebSocket = r) : n.WebSocket = WebSocket, w.isNode || "undefined" == typeof EventSource || n.EventSource ? w.isNode && !n.EventSource && void 0 !== s && (n.EventSource = s) : n.EventSource = EventSource, this.$ = n.httpClient || new q(this.u), this.q = "Disconnected", this.M = !1, this.Pt = n, this.onreceive = null, this.onclose = null } async start(t) { if (t = t || _.Binary, f.isIn(t, _, "transferFormat"), this.u.log(e.Debug, `Starting connection with transfer format '${_[t]}'.`), "Disconnected" !== this.q) return Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state.")); if (this.q = "Connecting", this.Xt = this.F(t), await this.Xt, "Disconnecting" === this.q) { const t = "Failed to start the HttpConnection before stop() was called."; return this.u.log(e.Error, t), await this.tt, Promise.reject(new Error(t)) } if ("Connected" !== this.q) { const t = "HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!"; return this.u.log(e.Error, t), Promise.reject(new Error(t)) } this.M = !0 } send(t) { return "Connected" !== this.q ? Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State.")) : (this.Jt || (this.Jt = new V(this.transport)), this.Jt.send(t)) } async stop(t) { return "Disconnected" === this.q ? (this.u.log(e.Debug, `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnected state.`), Promise.resolve()) : "Disconnecting" === this.q ? (this.u.log(e.Debug, `Call to HttpConnection.stop(${t}) ignored because the connection is already in the disconnecting state.`), this.tt) : (this.q = "Disconnecting", this.tt = new Promise((t => { this.jt = t })), await this.et(t), void await this.tt) } async et(t) { this.zt = t; try { await this.Xt } catch (t) { } if (this.transport) { try { await this.transport.stop() } catch (t) { this.u.log(e.Error, `HttpConnection.transport.stop() threw error '${t}'.`), this.Vt() } this.transport = void 0 } else this.u.log(e.Debug, "HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.") } async F(t) { let n = this.baseUrl; this.St = this.Pt.accessTokenFactory; try { if (this.Pt.skipNegotiation) { if (this.Pt.transport !== O.WebSockets) throw new Error("Negotiation can only be skipped when using the WebSocket transport directly."); this.transport = this.Gt(O.WebSockets), await this.Kt(n, t) } else { let e = null, o = 0; do { if (e = await this.Qt(n), "Disconnecting" === this.q || "Disconnected" === this.q) throw new Error("The connection was stopped during negotiation."); if (e.error) throw new Error(e.error); if (e.ProtocolVersion) throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details."); if (e.url && (n = e.url), e.accessToken) { const t = e.accessToken; this.St = () => t } o++ } while (e.url && o < 100); if (100 === o && e.url) throw new Error("Negotiate redirection limit exceeded."); await this.Yt(n, this.Pt.transport, e, t) } this.transport instanceof B && (this.features.inherentKeepAlive = !0), "Connecting" === this.q && (this.u.log(e.Debug, "The HttpConnection connected successfully."), this.q = "Connected") } catch (t) { return this.u.log(e.Error, "Failed to start the connection: " + t), this.q = "Disconnected", this.transport = void 0, this.jt(), Promise.reject(t) } } async Qt(t) { const n = {}; if (this.St) { const t = await this.St(); t && (n[U.Authorization] = `Bearer ${t}`) } const [r, s] = S(); n[r] = s; const i = this.Zt(t); this.u.log(e.Debug, `Sending negotiation request: ${i}.`); try { const t = await this.$.post(i, { content: "", headers: { ...n, ...this.Pt.headers }, timeout: this.Pt.timeout, withCredentials: this.Pt.withCredentials }); if (200 !== t.statusCode) return Promise.reject(new Error(`Unexpected status code returned from negotiate '${t.statusCode}'`)); const e = JSON.parse(t.content); return (!e.negotiateVersion || e.negotiateVersion < 1) && (e.connectionToken = e.connectionId), e } catch (t) { let n = "Failed to complete negotiation with the server: " + t; return t instanceof o && 404 === t.statusCode && (n += " Either this is not a SignalR endpoint or there is a proxy blocking the connection."), this.u.log(e.Error, n), Promise.reject(new h(n)) } } te(t, e) { return e ? t + (-1 === t.indexOf("?") ? "?" : "&") + `id=${e}` : t } async Yt(t, n, o, r) { let s = this.te(t, o.connectionToken); if (this.ee(n)) return this.u.log(e.Debug, "Connection was provided an instance of ITransport, using that directly."), this.transport = n, await this.Kt(s, r), void (this.connectionId = o.connectionId); const i = [], c = o.availableTransports || []; let h = o; for (const o of c) { const c = this.se(o, n, r); if (c instanceof Error) i.push(`${o.transport} failed:`), i.push(c); else if (this.ee(c)) { if (this.transport = c, !h) { try { h = await this.Qt(t) } catch (t) { return Promise.reject(t) } s = this.te(t, h.connectionToken) } try { return await this.Kt(s, r), void (this.connectionId = h.connectionId) } catch (t) { if (this.u.log(e.Error, `Failed to start the transport '${o.transport}': ${t}`), h = void 0, i.push(new a(`${o.transport} failed: ${t}`, O[o.transport])), "Connecting" !== this.q) { const t = "Failed to select transport before stop() was called."; return this.u.log(e.Debug, t), Promise.reject(new Error(t)) } } } } return i.length > 0 ? Promise.reject(new l(`Unable to connect to the server with any of the available transports. ${i.join(" ")}`, i)) : Promise.reject(new Error("None of the transports supported by the client are supported by the server.")) } Gt(t) { switch (t) { case O.WebSockets: if (!this.Pt.WebSocket) throw new Error("'WebSocket' is not supported in your environment."); return new J(this.$, this.St, this.u, this.Pt.logMessageContent, this.Pt.WebSocket, this.Pt.headers || {}); case O.ServerSentEvents: if (!this.Pt.EventSource) throw new Error("'EventSource' is not supported in your environment."); return new F(this.$, this.St, this.u, this.Pt); case O.LongPolling: return new B(this.$, this.St, this.u, this.Pt); default: throw new Error(`Unknown transport: ${t}.`) } } Kt(t, e) { return this.transport.onreceive = this.onreceive, this.transport.onclose = t => this.Vt(t), this.transport.connect(t, e) } se(t, n, o) { const r = O[t.transport]; if (null == r) return this.u.log(e.Debug, `Skipping transport '${t.transport}' because it is not supported by this client.`), new Error(`Skipping transport '${t.transport}' because it is not supported by this client.`); if (!function (t, e) { return !t || 0 != (e & t) }(n, r)) return this.u.log(e.Debug, `Skipping transport '${O[r]}' because it was disabled by the client.`), new c(`'${O[r]}' is disabled by the client.`, r); if (!(t.transferFormats.map((t => _[t])).indexOf(o) >= 0)) return this.u.log(e.Debug, `Skipping transport '${O[r]}' because it does not support the requested transfer format '${_[o]}'.`), new Error(`'${O[r]}' does not support ${_[o]}.`); if (r === O.WebSockets && !this.Pt.WebSocket || r === O.ServerSentEvents && !this.Pt.EventSource) return this.u.log(e.Debug, `Skipping transport '${O[r]}' because it is not supported in your environment.'`), new i(`'${O[r]}' is not supported in your environment.`, r); this.u.log(e.Debug, `Selecting transport '${O[r]}'.`); try { return this.Gt(r) } catch (t) { return t } } ee(t) { return t && "object" == typeof t && "connect" in t } Vt(t) { if (this.u.log(e.Debug, `HttpConnection.stopConnection(${t}) called while in state ${this.q}.`), this.transport = void 0, t = this.zt || t, this.zt = void 0, "Disconnected" !== this.q) { if ("Connecting" === this.q) throw this.u.log(e.Warning, `Call to HttpConnection.stopConnection(${t}) was ignored because the connection is still in the connecting state.`), new Error(`HttpConnection.stopConnection(${t}) was called while the connection is still in the connecting state.`); if ("Disconnecting" === this.q && this.jt(), t ? this.u.log(e.Error, `Connection disconnected with error '${t}'.`) : this.u.log(e.Information, "Connection disconnected."), this.Jt && (this.Jt.stop().catch((t => { this.u.log(e.Error, `TransportSendQueue.stop() threw error '${t}'.`) })), this.Jt = void 0), this.connectionId = void 0, this.q = "Disconnected", this.M) { this.M = !1; try { this.onclose && this.onclose(t) } catch (n) { this.u.log(e.Error, `HttpConnection.onclose(${t}) threw error '${n}'.`) } } } else this.u.log(e.Debug, `Call to HttpConnection.stopConnection(${t}) was ignored because the connection is already in the disconnected state.`) } Bt(t) { if (0 === t.lastIndexOf("https://", 0) || 0 === t.lastIndexOf("http://", 0)) return t; if (!w.isBrowser || !window.document) throw new Error(`Cannot resolve '${t}'.`); const n = window.document.createElement("a"); return n.href = t, this.u.log(e.Information, `Normalizing '${t}' to '${n.href}'.`), n.href } Zt(t) { const e = t.indexOf("?"); let n = t.substring(0, -1 === e ? t.length : e); return "/" !== n[n.length - 1] && (n += "/"), n += "negotiate", n += -1 === e ? "" : t.substring(e), -1 === n.indexOf("negotiateVersion") && (n += -1 === e ? "?" : "&", n += "negotiateVersion=" + this.Ft), n } } class V { constructor(t) { this.ne = t, this.ie = [], this.re = !0, this.oe = new z, this.he = new z, this.ce = this.ae() } send(t) { return this.le(t), this.he || (this.he = new z), this.he.promise } stop() { return this.re = !1, this.oe.resolve(), this.ce } le(t) { if (this.ie.length && typeof this.ie[0] != typeof t) throw new Error(`Expected data to be of type ${typeof this.ie} but was of type ${typeof t}`); this.ie.push(t), this.oe.resolve() } async ae() { for (; ;) { if (await this.oe.promise, !this.re) { this.he && this.he.reject("Connection stopped."); break } this.oe = new z; const t = this.he; this.he = void 0; const e = "string" == typeof this.ie[0] ? this.ie.join("") : V.ue(this.ie); this.ie.length = 0; try { await this.ne.send(e), t.resolve() } catch (e) { t.reject(e) } } } static ue(t) { const e = t.map((t => t.byteLength)).reduce(((t, e) => t + e)), n = new Uint8Array(e); let o = 0; for (const e of t) n.set(new Uint8Array(e), o), o += e.byteLength; return n.buffer } } class z { constructor() { this.promise = new Promise(((t, e) => [this.de, this.fe] = [t, e])) } resolve() { this.de() } reject(t) { this.fe(t) } } class G { constructor() { this.name = "json", this.version = 1, this.transferFormat = _.Text } parseMessages(t, n) { if ("string" != typeof t) throw new Error("Invalid input for JSON hub protocol. Expected a string."); if (!t) return []; null === n && (n = p.instance); const o = R.parse(t), r = []; for (const t of o) { const o = JSON.parse(t); if ("number" != typeof o.type) throw new Error("Invalid payload."); switch (o.type) { case H.Invocation: this.pe(o); break; case H.StreamItem: this.we(o); break; case H.Completion: this.ge(o); break; case H.Ping: case H.Close: break; default: n.log(e.Information, "Unknown message type '" + o.type + "' ignored."); continue }r.push(o) } return r } writeMessage(t) { return R.write(JSON.stringify(t)) } pe(t) { this.me(t.target, "Invalid payload for Invocation message."), void 0 !== t.invocationId && this.me(t.invocationId, "Invalid payload for Invocation message.") } we(t) { if (this.me(t.invocationId, "Invalid payload for StreamItem message."), void 0 === t.item) throw new Error("Invalid payload for StreamItem message.") } ge(t) { if (t.result && t.error) throw new Error("Invalid payload for Completion message."); !t.result && t.error && this.me(t.error, "Invalid payload for Completion message."), this.me(t.invocationId, "Invalid payload for Completion message.") } me(t, e) { if ("string" != typeof t || "" === t) throw new Error(e) } } const K = { trace: e.Trace, debug: e.Debug, info: e.Information, information: e.Information, warn: e.Warning, warning: e.Warning, error: e.Error, critical: e.Critical, none: e.None }; class Z { configureLogging(t) { if (f.isRequired(t, "logging"), void 0 !== t.log) this.logger = t; else if ("string" == typeof t) { const e = function (t) { const e = K[t.toLowerCase()]; if (void 0 !== e) return e; throw new Error(`Unknown log level: ${t}`) }(t); this.logger = new C(e) } else this.logger = new C(t); return this } withUrl(t, e) { return f.isRequired(t, "url"), f.isNotEmpty(t, "url"), this.url = t, this.httpConnectionOptions = "object" == typeof e ? { ...this.httpConnectionOptions, ...e } : { ...this.httpConnectionOptions, transport: e }, this } withHubProtocol(t) { return f.isRequired(t, "protocol"), this.protocol = t, this } withAutomaticReconnect(t) { if (this.reconnectPolicy) throw new Error("A reconnectPolicy has already been set."); return t ? Array.isArray(t) ? this.reconnectPolicy = new N(t) : this.reconnectPolicy = t : this.reconnectPolicy = new N, this } build() { const t = this.httpConnectionOptions || {}; if (void 0 === t.logger && (t.logger = this.logger), !this.url) throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection."); const e = new X(this.url, t); return j.create(e, this.logger || p.instance, this.protocol || new G, this.reconnectPolicy) } } return Uint8Array.prototype.indexOf || Object.defineProperty(Uint8Array.prototype, "indexOf", { value: Array.prototype.indexOf, writable: !0 }), Uint8Array.prototype.slice || Object.defineProperty(Uint8Array.prototype, "slice", { value: function (t, e) { return new Uint8Array(Array.prototype.slice.call(this, t, e)) }, writable: !0 }), Uint8Array.prototype.forEach || Object.defineProperty(Uint8Array.prototype, "forEach", { value: Array.prototype.forEach, writable: !0 }), n })() }, "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.signalR = e() : t.signalR = e();
let _my_hub, _socketToken;
function getEnemyIdByClass(_class) {
	switch (_class) {
		case 'warrior':
			return '01';
		case 'archer':
			return '02';
		case 'thief':
			return '03';
	}
	return null;
}

function createPlayer(_json) {
	const _e = episode.installMob({
		id: _json.t,
		minX: _json.x,
		maxX: _json.x,
		count: 1,
		name: _json.n,
		attackAfterHit: true
	}, null, 1);
	const _isPlayableCharacter = _json.t.toString().startsWith('0');
	if (_isPlayableCharacter)
		setKeyBoard(_e);
	else if (_json.hs)
		_e.hasStation = 1;
	_e.displayName = _json.n;
	_e.key = _json.k;
	if (episode.pvp || !_isPlayableCharacter) {
		_e.enemy = true;
		_e.friendly = false;
	}
	else {
		_e.enemy = false;
		_e.friendly = true;
	}
	_e.autoMode = _isPlayableCharacter ? undefined : _json.am;
	if (_isPlayableCharacter) {
		_e.firstAutoModeSet = false;
		_e.setAutoMode(_isPlayableCharacter ? undefined : 0, 1);
	}
	_e.socketId = _json.s ?? getRandomValue(1000, 9999);
	_e.setNewStatus(_json);
	_e.setHealth(_e.getMaxHP());
	_e.receive = true;
	if (_isPlayableCharacter && !episode.lobby && !episode.pvp) {
		_navbar.innerHTML += avatarTemplate(_e);
		addClass(addPlayer, 'd-none');
	}
}
function getKeyProps(_k, _c) {
	switch (_k) {
		case 'h':
		case 'H':
			return { key: 'h', name: 'block' };
		case 'j':
		case 'J':
			return { key: 'j', name: 'ground1' };
		case 'k':
		case 'K':
			return { key: 'k', name: 'ground2' };
		case 'l':
		case 'L':
			return { key: 'l', name: 'air1' };
		case 'e':
		case 'E':
			return { key: 'e', name: 'air2' };
		case 'g':
		case 'G':
			return { key: 'g', name: 'roll' };
		case 'q':
		case 'Q':
			return { key: 'q', name: 'defense' };
		case 'r':
		case 'R':
			return { key: 'r', name: _c.chains?.[0]?.key, chain: true };
		case 'f':
		case 'F':
			return { key: 'f', name: _c.chains?.[1]?.key, chain: true };
		case 'a':
		case 'A':
		case 'arrowleft':
			return { key: 'a', name: 'left' };
		case 'd':
		case 'D':
		case 'arrowright':
			return { key: 'd', name: 'right' };
		case 'w':
		case 'W':
		case 'arrowup':
			return { key: 'w', name: 'up' };
		case 's':
		case 'S':
		case 'arrowdown':
			return { key: 's', name: 'down' };
		default:
			return { key: ' ', name: 'attack' };
	}
}
let __mobsConnected = false, __maxAFKMs = 600000, 
__personalMessages = {
	"PM1234567890": {
		n: 'Serkan',
		a: '1234567890',
		m: [{
			time: 0,
			m: 'Aga napıyon yahu!!!'
		},{
			time: 10000,
			y: 1,
			m: 'Bişi yapamıyom ki aq, oyun ful bug'
		},{
			time: 20000,
			m: 'Y.r.rk gibi oyun he mi?'
		},{
			time: 30000,
			y: 1,
			m: 'He valla'
		}]
	}
},
__onlineMessages= [
	{
		act: 1,
		a: '1234567890',
		n: 'DeadEnt',
		m: 'Fuck off dude!',
		co: '#762c20'
	},
	{
		act: 1,
		a: '1234567891',
		n: 'Serkan',
		m: 'Ne diyo olm bu lavuq ?',
		co: '#CD7F32'
	},
	{
		act: 1,
		a: '1234567892',
		n: 'wer',
		m: 'Az evvel verdim eline pvpde',
		co: '#191970'
	},
	{
		act: 1,
		a: '1234567891',
		n: 'Serkan',
		m: '=))',
		co: '#CD7F32'
	}
],
__onlineUsers = [
	{
		l: 3,
		n: 'Serkan',
		cl: 'archer',
		pw: 541,
		ai: _client.createQuestID(10)
	},
	{
		l: 2,
		n: 'Domilian',
		cl: 'thief',
		pw: 215,
		ai: _client.createQuestID(10)
	},
	{
		l: 11,
		n: 'Arthas',
		cl: 'warrior',
		pw: 1234,
		y: 1,
		ai: _client.createQuestID(10)
	}
];
function pushToPersonalMessages(_json) {
	if(_json.to !== __account.key) 
		return;
	var _pms = __personalMessages['PM' + _json.a]
	if(!_pms)
		_pms = {
			a: _json.a,
			n: _json.n,
			m: []
		};
	if(_pms.m.length >= 50)
		_pms.m.shift();
	_pms.m.push({
		t: msNow,
		m: _json.m
	});
}
function pushToOnlineMessages(_json, _force) {
	if(_json.to) {
		pushToPersonalMessages(_json);
		return;
	}
	if(_force || _json.act === __account.act) {
		{
			//chat-board 'a yazdır
		}
		if(__onlineMessages?.length >= 50)
			__onlineMessages.shift();
		__onlineMessages.push(JSON.parse(JSON.stringify(_json)));
		const _chat = document.getElementById('chat-area-big');
		if(_chat)
			_chat.innerHTML += getChatMessageTemplate(_json);
	}
}
function getChatMessageTemplate(_m) {
	return `<div${_m.y ? ' style="direction:rtl"' : ''} class="chat-message flex flex-jc-start">
				<div style="color:${_m.co}dd !important">${_m.n}:</div>${_m.m}
		</div>`;
}
function askClearBigChatArea() {
	playClick();
	let _modal = `<div class="full flex inventory-question">
		<div class="inventory-modal">
            <div style="padding:4vh 2vh" class="flex">
                <span class="flex" style="color:#f7f7f7dd !important;font-size:3vh !important">${getLangData('Clear chat')}?</span>
            </div>
			<div style="padding:4vh 2vh" class="flex">
				<div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;font-size:3vh !important" onclick="clearBigChatArea()">${getLangData('YES')}</div>
				<div class="game-menu-button flex animate-me" style="cursor:pointer;color:#F4BB44 !important;min-width:10vw;font-size:3vh !important" onclick="closeInventoryQuestionModal()">${getLangData('NO')}</div>
			</div>
		</div>
	</div>`;
	const _div = document.createElement('div');
	_div.innerHTML = _modal;
	document.querySelector('.my-pop-up-wrapper:has(.my-pop-up)').appendChild(_div.firstChild);
}
function clearBigChatArea() {
	closeInventoryQuestionModal();
	var _chat = document.getElementById('chat-area-big');
	if(_chat)
		_chat.innerHTML = '';
	__onlineMessages = [];
}
let __pmId;
function openPersonelMessaegs(_id) {
	var _pms = __personalMessages['PM' + _id];
	if(_pms) {
		playClick();
		var _people = document.querySelectorAll('#book-content-12 .pvp-opponent-item');
		for(let _p of _people)
			if(_p.getAttribute('data-key') === _id.toString())
				addClass(_p, 'selected');
			else 
				removeClass(_p, 'selected');
		var gct = document.querySelector('.game-chat-top');
		gct.innerHTML = `<div class="game-chat-top-right flex flex-jc-start" onclick="goToPrevChatScreen()">
			&times;
		<div>
		<div class="game-chat-top-left">
			<div style="height:100%" class="flex">${_pms.n}</div>
		</div>
		<div class="game-chat-top-right flex flex-jc-end" style="font-size:24px !important" onclick="askClearPersonalChatArea('${_id}', '${_pms.n}')">
			&times;
		</div>`;
	}
}
function getOnlineUsersUI() {
	const _ouUI = document.getElementById('book-content-12');
	if(!_ouUI)
		return;
	__pmId = undefined;
	let _html = '', _messages = '';
	for(let _m of __onlineMessages)
		_messages += getChatMessageTemplate(_m);
	// for(let _ou of __onlineUsers.sort((a, b) => b.jd - a.jd))
	// 	_html += `<div onclick="" class="pvp-opponent-item flex opponent-${_ou.cl}">
	// 			<div class="opponent-item-left flex">
	// 				${_ou.n}
	// 			</div>
	// 			<div class="opponent-item-center flex">
	// 				<img src="./images/icons/${_ou.cl}.png" />${getLangData('Lvl')}&nbsp;${_ou.l}
	// 			</div>
	// 			<div class="opponent-item-right flex">
	// 				${_ou.pw.formatWithDots()}
	// 			</div>
	// 		</div>`;
	const _keys = Object.keys(__personalMessages);
	let _ch, _lastMsg;
	for(var _k of _keys) {
		_ch = __personalMessages[_k]; 
		_lastMsg = _ch.m[_ch.m.length - 1];
		_html += `<div data-key="${_ch.a}" onclick="openPersonelMessaegs('${_ch.a}')" class="pvp-opponent-item flex">
				<div style="font-weight:600" class="opponent-item-left flex">
					${_ch.n}
				</div>
				<div class="opponent-item-center flex">
					<div class="one-line w-100">
						${_lastMsg.m}
					</div>
				</div>
			</div>`;
	}
	_ouUI.innerHTML =
	`<div class="honor-items-container need-honor full" style="padding:0 9% 6% 9%;overflow:hidden;position:relative">
			<div class="full flex">
				<div style="width:50%;height:100%">
					<div class="online-users-content-left">
						<div class="full flex">
							<div class="game-chat-top flex flex">
								<div class="game-chat-top-left">
									<div style="height:100%" class="flex">ID:&nbsp;<span onclick="copyText(this)">${__account.id}</span></div>
								</div>
								<div class="game-chat-top-right flex flex-jc-end" style="font-size:24px !important" onclick="askClearBigChatArea()">
									&times;
								</div>
							</div>
							<div class="game-chat-middle">
								<div class="flex game-chat-middle-content flex-ai-end"><div id="chat-area-big" style="width:100%">`
									+ _messages +
								`</div></div>
							</div>
							<div class="game-chat-bottom flex">
								<div class="game-chat-bottom-left">
									<input onfocus="openKeyboard()" onblur="closeKeyboard()" onpaste="return false;" ondrop="return false;" autocomplete="off" type="text" maxlength="100" placeholder="#${__account.name}:" />
								</div>
								<div onclick="sendChatMessage()" class="game-chat-bottom-right flex">
									&raquo;
								</div>
							</div>
						</div>
					</div>
				</div>
				<div style="width:50%;height:100%">
					<div class="online-users-content-right">
						<div class="online-users-wrapper" style="position:relative !important;overflow:hidden !important">`
							+ _html +
						`</div>
					</div>
				</div>
			</div>
		</div>`;
}
function openKeyboard() {
	
}
function closeKeyboard() {

}
function sendChatMessage() {
	var _txtArea = document.querySelector('.game-chat-bottom-left input');
	if(!_txtArea)
		return;
	playClick();
	var _txt = _txtArea.value?.trim() ?? '';
	if(_txt.length > 0) {
		let _j = {
			c: 'ch',
			co: getCharacterColor(mainCharacter.class),
			a: __account.id,
			m: _txt,
			act: __account.act,
			y: 1,
			s: mainCharacter.socketId,
			n: __account.name
		};
		pushToOnlineMessages(_j, 1);
		const _json = JSON.stringify(_j);
		sendMessage(_json, 1);
		_txtArea.value = '';
	}
}
function addOnlineUser(_json) {
	if(!_json?.ai || _json.ai === __account.id)
		return;
	const _ou = __onlineUsers.find(x => x.ai === _json.ai);
	if(_ou)
		_ou.jd = _json.jd ?? _ou.jd;
	else
		__onlineUsers.push(JSON.parse(JSON.stringify(_json)));
}
function removeOnlineUser(_json) {
	if(!_json?.ai || _json.ai === __account.id)
		return;
	__onlineUsers = __onlineUsers.filter(x => x.ai !== _json.ai) ?? [];
}
function sendDungeonRequest(_id) {
	sendMessage(JSON.stringify({
		c: 'dr',
		s: mainCharacter.socketId,
		n: __account.name
	}), 1);
	hideMyModalPopUp();
	warn('<span>Dungeon request sended</span>');
}
function sendPvpRequest(_id) {
	sendMessage(JSON.stringify({
		c: 'pvp',
		s: mainCharacter.socketId,
		n: __account.name,
		to: _id
	}), 1);
	hideMyModalPopUp();
	warn('<span>Pvp request sended</span>');
}
function noNeedToSameMap(_json) {
	return (_json?.c === 'dc' || _json?.c === 'call' || _json?.c === 'arena' || _json?.c === 'dr' || _json?.c === 'pvp' || _json?.c === 'apk' || _json?.c === 'adr' || _json?.c === 'idr' || _json?.c === 'ak' || _json?.c === 'rk' || _json?.c === 'ch');
}
async function connectSocket() {
	return;
	//const _socketId = __account.id; //getParameterByName('socket') ?? 'U-1234';
	_socketToken = episode.id.toString(); // _socketId;// === 'U-1234' ? 'U-6789' : 'U-1234';
	if (_my_hub)
		await _my_hub.stop();
	//_my_hub = new signalR.HubConnectionBuilder()
	//	.withUrl("/gamehub", {
	//		accessTokenFactory: () => _socketId
	//	}).withAutomaticReconnect([0, 1000, 5000, 10000, 30000])
	//	.build();
	__mobsConnected = false;
	_my_hub = new signalR.HubConnectionBuilder()
		.withUrl('wss://webapi.kitap12.com/gamehub'/*'https://localhost:7298/gamehub'*/, {
			//accessTokenFactory: () => _socketId,
			skipNegotiation: true,
			transport: signalR.HttpTransportType.WebSockets
		}).withAutomaticReconnect([0, 1000, 5000, 10000, 30000])
		.build();
	_my_hub.on("R", async (cmd, message) => {
		return;
		if (cmd) {
			let _json = cmd ? JSON.parse(cmd) : null;
			if(_json?.c === 'c' && _json.jd)
				addOnlineUser(_json);
			else if(_json?.c === 'dc')
				removeOnlineUser(_json);
			if(_json?.e !== episode.id && !noNeedToSameMap(_json))
				return;
			switch (_json?.c) {
				case 'apk': {
					if (mainCharacter.socketId === _json.s)
						return;
					portToArena(1);
					sendMessage(JSON.stringify({
						c: 'arena',
						s: _json.to,
						e: episode.id,
						room: episode.roomId
					}));
				}
					break;
				case 'ch': {
					if (mainCharacter.socketId === _json.s)
						return;
					pushToOnlineMessages(_json);
				}
					break;
				case 'idr': {
					if (mainCharacter.socketId === _json.s)
						return;
					warn('<div class="flex"><span style="color:#f8f8f8 !important">' + (_json.n ?? 'User') + '&nbsp;<span style="color:red !important">ignored</span>&nbsp;your request</span></div>');
				}
					break;
				case 'adr': {
					if (mainCharacter.socketId === _json.s)
						return;
					portToDungeon(1);
					sendMessage(JSON.stringify({
						c: 'call',
						s: _json.to,
						e: 1000
					}));
				}
					break;
				case 'dr': {
					if(!__account.options.request) {
						sendMessage(JSON.stringify({
							c: 'idr',
							s: mainCharacter.socketId,
							to: _json.s,
							n: __account.name
						}), 1);
						return;
					}
					if (mainCharacter.socketId === _json.s)
						return;
					warn('<div class="flex"><span style="color:#f8f8f8 !important">' + (_json.n ?? 'User') + '&nbsp;<span style="color:darkgoldenrod !important">invited</span>&nbsp;you to play Dungeon</span></div>', 'level-up', 60000, 1, [
						{ text: 'OK', func: function() {
							sendMessage(JSON.stringify({
								c: 'adr',
								s: mainCharacter.socketId,
								to: _json.s
							}), 1);
							const _toasts = document.querySelectorAll('.toast-wrapper');
							if(_toasts?.[0])
								_toasts.forEach(x => x.remove());
						} },
						{ text: 'IGNORE', func: function() {
							sendMessage(JSON.stringify({
								c: 'idr',
								s: mainCharacter.socketId,
								to: _json.s,
								n: __account.name
							}), 1);
							const _toasts = document.querySelectorAll('.toast-wrapper');
							if(_toasts?.[0])
								_toasts.forEach(x => x.remove());
						} }
					]);
				}
					break;
				case 'pvp': {
						if(!__account.options.request) {
							sendMessage(JSON.stringify({
								c: 'idr',
								s: mainCharacter.socketId,
								to: _json.s,
								n: __account.name
							}), 1);
							return;
						}
						if (mainCharacter.socketId === _json.s)
							return;
						warn('<div class="flex"><span style="color:#f8f8f8 !important">' + (_json.n ?? 'User') + '&nbsp;<span style="color:darkgoldenrod !important">invited</span>&nbsp;you to Arena</span></div>', 'level-up', 60000, 1, [
							{ text: 'OK', func: function() {
								sendMessage(JSON.stringify({
									c: 'apk',
									s: mainCharacter.socketId,
									to: _json.s
								}), 1);
								const _toasts = document.querySelectorAll('.toast-wrapper');
								if(_toasts?.[0])
									_toasts.forEach(x => x.remove());
							} },
							{ text: 'IGNORE', func: function() {
								sendMessage(JSON.stringify({
									c: 'idr',
									s: mainCharacter.socketId,
									to: _json.s,
									n: __account.name
								}), 1);
								const _toasts = document.querySelectorAll('.toast-wrapper');
								if(_toasts?.[0])
									_toasts.forEach(x => x.remove());
							} }
						]);
					}
						break;
				case 'call': {
					if (mainCharacter.key === _json.k || mainCharacter.socketId === _json.s)
						return;
					console.log(mainCharacter.name + ' çağırıldığı dungeona gidiyor');
					removeCoopCharacter();
					portToDungeon(null, _json.e);
				}
					break;
				case 'arena': {
						if (mainCharacter.key === _json.k || mainCharacter.socketId === _json.s)
							return;
						//removeCoopCharacter();
						console.log(mainCharacter.name + ' arenaya port ediliyor');
						portToArena(null, _json.room);
					}
						break;
				case 'c': //connect
					if(episode.roomId !== _json.room)
						return;
					//birisi bize connect olduğunda burası çalışır
					if (mainCharacter.socketId !== _json.s && !__mobsConnected) {
						// if(!_json.jd || _json.jd < mainCharacter.joinDate)
						// 	delete mainCharacter.leader;
						if (episode.enemies.find(x => x.keyboard)) {
							if (mainCharacter.leader) {
								let _socketNo = 1;
								episode.enemies.filter(x => !x.keyboard)?.forEach(x => {
									x.socketId = _socketNo++;
									x.station = mainCharacter.socketId;
									x.getNewStatus(1, 5);
								});
								__mobsConnected = true;
							}
						}
					}
					if (mainCharacter.key === _json.k || mainCharacter.socketId === _json.s)
						return;
					if (!_json.st)
						warn('<div class="pvp-kill">' + (_json.n ?? 'User') + '&nbsp;<span style="color:darkgoldenrod !important">joined</span>&nbsp;the room</div>', 'level-up', null, null, 1);
					if (_json.ld && !mainCharacter.leader) {
						episode.enemies?.filter(x => !x.keyboard)?.forEach(x => {
							episode.hideHealthBar(x);
						});
						episode.enemies = episode.enemies.filter(x => x.keyboard || x.socketId);
					}
					if ((!episode.enemies.find(x => x.key === _json.k || x.socketId === _json.s)) && !_json.st) {
						console.log(_json.n + ' haritaya ekleniyor');
						createPlayer(_json);
						mainCharacter.getNewStatus(1, 3);
					}
					break;
				case 't':
					{
						if (mainCharacter.key === _json.k || mainCharacter.socketId === _json.s || mainCharacter.socketId === _json.st)
							return;
						let _e = episode.enemies.find(x => x.key === _json.k || x.socketId === _json.s);
						if (!_e)
							return;
						delete _json.k;
						_e.setNewStatus(_json);
					}
					break;
				case 'r':
					{
						if (mainCharacter.key === _json.k || mainCharacter.socketId === _json.s)
							return;
						//console.log('remove => ' + _json.k + ' on ' + mainCharacter.key);
						const _e = episode.enemies.find(x => x.key === _json.k || x.socketId === _json.s);
						if (_e)
							_e.remove = true;
					}
					break;
				case 'ak': //add move
					{
						if (mainCharacter.key === _json.k || mainCharacter.socketId === _json.s)
							return;
						const _c = episode.enemies.find(x => x.key === _json.k || x.socketId === _json.s);
						if (!_c)
							return;
						const _k = getKeyProps(_json.hk, _c);
						_c.keyboard.addKey(_k.key, _k.name, _k.chain);
					}
					break;
				case 'rk': //remove move
					{
						if (mainCharacter.key === _json.k || mainCharacter.socketId === _json.s)
							return;
						const _c = episode.enemies.find(x => x.key === _json.k || x.socketId === _json.s);
						if (!_c)
							return;
						const _k = getKeyProps(_json.hk, _c);
						_c.keyboard.removeKey(_k.key);
					}
					break;
				case 'dc': //disconnect
					{
						// if (mainCharacter.key === _json.k || mainCharacter.socketId === _json.s) {
						// 	delete mainCharacter.leader;
						// 	return;
						// }
						const _c = episode.enemies.find(x => x.key === _json.k || x.socketId === _json.s);
						if (!_c)
							return;
						
						episode.hideHealthBar(_c);
						//console.log('disconnect => ' + _json.k + ' on ' + mainCharacter.key);
						warn('<div class="pvp-kill">' + (_json.n ?? 'User') + '&nbsp;<span style="color:red !important">left</span>&nbsp;the room' + (_json.l ? ' <span style="color:red !important">(Party Disbanded)</span>' : '') + '</div>', 'level-up', null, null, 1);
						episode.enemies = episode.enemies.filter(x => x !== _c);
						if (_json.l && (episode.pvp || episode.dungeon))
							switchMap(1, 1);
					}
					break;
			}
		}
	});
	_my_hub.start().catch(err => {
		console.log(err.toString());
		_my_hub.failedBecauseNoConnection = 1;
	}).then(
		response => {
			if(_my_hub.failedBecauseNoConnection) {
				delete _my_hub.failedBecauseNoConnection;
				return;
			}
			if (!mainCharacter.socketId)
				mainCharacter.socketId = getRandomValue(1000, 9999);
			delete mainCharacter.disconnected;
			mainCharacter.joinDate = msNow;
			// sendMessage(JSON.stringify({
			// 	c: 'call',
			// 	s: mainCharacter.socketId
			// }));
			// if (episode.dungeon) {
			// 	if (mainCharacter.leader) {
			// 		sendMessage(JSON.stringify({
			// 			c: 'call',
			// 			s: mainCharacter.socketId
			// 		}));
			// 		return;
			// 	}
			// }
			mainCharacter.getNewStatus(1, 4);
			//mainCharacter.leader = 1;
		}
	);
	//this.start = async function () {
	//	try {
	//		await connection.start();
	//		console.log("SignalR Connected.");
	//	} catch (err) {
	//		console.log(err);
	//		setTimeout(this.start, 5000);
	//	}
	//};

	_my_hub.onclose(async () => {
		//await this.start();
	});

	//await this.start();
}
function disconnect() {
	__mobsConnected = false;
	sendMessage(JSON.stringify({ c: 'dc', l: mainCharacter.leader ? 1 : 0, n: mainCharacter.name, s: mainCharacter.socketId }));
	mainCharacter.disconnected = true;
	delete mainCharacter.joinDate;
}
function sendMessage(_json, _force) {
	if(!_force && !episode.lobby && !episode.dungeon && !episode.pvp && _json.c !== 'dc' && _json.c !== 'c')
		return;
	if (_my_hub && _my_hub.q === 'Connected')
		_my_hub.invoke("S", _socketToken, _json).catch(err => console.error(err.toString()));
}
function portToArena(_lead, _newId) {
	if (_lead)
		mainCharacter.leader = _lead;
	removeCoopCharacter();
	switchMap(10, 1, null, _newId);
}
function portToDungeon(_lead, _floor) {
	if (_lead)
		mainCharacter.leader = _lead;
	if (!_floor)
		removeCoopCharacter();
	switchMap(_floor ?? 1000, 1);
}
function invite(_to) {
	if (_my_hub)
		_my_hub.invoke("S", _socketToken, JSON.stringify({
			to: _to,
			c: 'i',
			from: mainCharacter.socketId,
			name: __account.name
		})).catch(err => console.error(err.toString()));
}
function addFriend(_to) {
	if (_my_hub)
		_my_hub.invoke("S", _socketToken, JSON.stringify({
			to: _to,
			c: 'fr',
			from: mainCharacter.socketId,
			name: __account.name
		})).catch(err => console.error(err.toString()));
}
window.onbeforeunload = function (e) {
	e.returnValue = 'onbeforeunload';
	disconnect();
	return 'onbeforeunload';
}