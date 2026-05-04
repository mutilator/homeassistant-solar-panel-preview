(function (exports) {
    'use strict';

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$1=window,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$3=new WeakMap;let o$3 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$1=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$2?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$1.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$2;const e$1=window,r$1=e$1.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$1.reactiveElementPolyfillSupport,n$2={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$2,reflect:!1,hasChanged:a$1},d$1="finalized";let u$1 = class u extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return !1;this[d$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$2).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$2;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};u$1[d$1]=!0,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:u$1}),(null!==(s$2=e$1.reactiveElementVersions)&&void 0!==s$2?s$2:e$1.reactiveElementVersions=[]).push("1.6.3");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t;const i=window,s$1=i.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1="$lit$",n$1=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$1,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$1+s.slice(v)+n$1+w):s+n$1+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$1)||i.startsWith(n$1)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$1).split(n$1),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$1),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$1,t+1));)v.push({type:7,index:r}),t+=n$1.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var l,o;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.3.3");

    const PANEL_IMAGE_DATA_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAN0CAYAAAB7nmsgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuMTGKCBbOAAAAuGVYSWZJSSoACAAAAAUAGgEFAAEAAABKAAAAGwEFAAEAAABSAAAAKAEDAAEAAAACAAAAMQECABEAAABaAAAAaYcEAAEAAABsAAAAAAAAAGAAAAABAAAAYAAAAAEAAABQYWludC5ORVQgNS4xLjExAAADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlgAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAAAGNdRzso9yOwAAH9NJREFUeF7t2U1u67gaBFDl9caydG+sO28UIHJoir9OATpnFuojIRUHBd/78Xg8vg4AINL/nhcq/n1e4E+4hwzuIYN7yOAeNmot6v+O4/jneZG3cw8Z3EMG95DBPWz20fpP35+fnx/Pa70ej8fXinN22vWOrTlfWfVuu75zpR3vmHYP33Z862or3zHpHlZ+1y673jHpHo6N37nSjne8uoemX9SrX+qOVmS44oy7W5HhijPubkWGK864uxUZrjjj7q4yvCzqqwNoN5PlzF7OZrKc2cvZTJYzezmbyXJmL2e1LKtFXdvImJFMR/ZQN5LpyB7qRjId2UPdSKYje6h7lenLon61gXk92fbM0qcn255Z+vRk2zNLn55se2bpU8q2WNSlQdZqybhlhjktGbfMMKcl45YZ5rRk3DLDnOeMfxX18wD71LKuPWOtWta1Z6xVy7r2jLVqWdeesdbPrE9F7RLer5R5aY29SpmX1tirlHlpjb1KmZfW2Os781+/qAGAHIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAh2KurH4/H182/2K2VeWmOvUualNfYqZV5aY69S5qU19vrO/NcvapfxPrWsa89Yq5Z17Rlr1bKuPWOtWta1Z6z1M+tfRX24jLdoybhlhjktGbfMMKcl45YZ5rRk3DLDnOeMi0V9FAZZpyfbnln69GTbM0ufnmx7ZunTk23PLH1K2b4s6uPFBuaMZDqyh7qRTEf2UDeS6cge6kYyHdlD3atMq0V9VDbSbybLmb2czWQ5s5ezmSxn9nI2k+XMXs5qWV4W9XFxAG1WZLjijLtbkeGKM+5uRYYrzri7FRmuOOPurjL8uBoAAP5O0y9qAOBv9BT1v88L/An3kME9ZHAPGdzDRq1F/d9xHP88L/J27iGDe8jgHjK4h82a/4/68/Pz43mt1+Px+Fpxzk673rE15yur3m3Xd6604x3T7uHbjm9dbeU7Jt3Dyu/aZdc7Jt3DsfE7V9rxjlf30PSLevVL3dGKDFeccXcrMlxxxt2tyHDFGXe3IsMVZ9zdVYaXRX11AO1mspzZy9lMljN7OZvJcmYvZzNZzuzlrJZltahrGxkzkunIHupGMh3ZQ91IpiN7qBvJdGQPda8yfVnUrzYwryfbnln69GTbM0ufnmx7ZunTk23PLH1K2RaLujTIWi0Zt8wwpyXjlhnmtGTcMsOcloxbZpjznPGvon4eYJ9a1rVnrFXLuvaMtWpZ156xVi3r2jPW+pn1qahdwvuVMi+tsVcp89Iae5UyL62xVynz0hp7fWf+6xc1AJBDUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwU5F/Xg8vn7+zX6lzEtr7FXKvLTGXqXMS2vsVcq8tMZe35n/+kXtMt6nlnXtGWvVsq49Y61a1rVnrFXLuvaMtX5m/auoD5fxFi0Zt8wwpyXjlhnmtGTcMsOcloxbZpjznHGxqI/CIOv0ZNszS5+ebHtm6dOTbc8sfXqy7ZmlTynbl0V9vNjAnJFMR/ZQN5LpyB7qRjId2UPdSKYje6h7lWm1qI/KRvrNZDmzl7OZLGf2cjaT5cxezmaynNnLWS3Ly6I+Lg6gzYoMV5xxdysyXHHG3a3IcMUZd7ciwxVn3N1Vhh9XAwDA32n6RQ0A/I2eov73eYE/4R4yuIcM7iGDe9iotaj/O47jn+dF3s49ZHAPGdxDBvewWfP/UX9+fn48r/V6PB5fK87Zadc7tuZ8ZdW77frOlXa8Y9o9fNvxrautfMeke1j5Xbvsesekezg2fudKO97x6h6aflGvfqk7WpHhijPubkWGK864uxUZrjjj7lZkuOKMu7vK8LKorw6g3UyWM3s5m8lyZi9nM1nO7OVsJsuZvZzVsqwWdW0jY0YyHdlD3UimI3uoG8l0ZA91I5mO7KHuVaYvi/rVBub1ZNszS5+ebHtm6dOTbc8sfXqy7ZmlTynbYlGXBlmrJeOWGea0ZNwyw5yWjFtmmNOSccsMc54z/lXUzwPsU8u69oy1alnXnrFWLevaM9aqZV17xlo/sz4VtUt4v1LmpTX2KmVeWmOvUualNfYqZV5aY6/vzH/9ogYAcihqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASDYqagfj8fXz7/Zr5R5aY29SpmX1tirlHlpjb1KmZfW2Os781+/qF3G+9Syrj1jrVrWtWesVcu69oy1alnXnrHWz6x/FfXhMt6iJeOWGea0ZNwyw5yWjFtmmNOSccsMc54zLhb1URhknZ5se2bp05Ntzyx9erLtmaVPT7Y9s/QpZfuyqI8XG5gzkunIHupGMh3ZQ91IpiN7qBvJdGQPda8yrRb1UdlIv5ksZ/ZyNpPlzF7OZrKc2cvZTJYzezmrZXlZ1MfFAbRZkeGKM+5uRYYrzri7FRmuOOPuVmS44oy7u8rw42oAAPg7Tb+oAYC/0VPU/z4v8CfcQwb3kME9ZHAPG7UW9X/HcfzzvMjbuYcM7iGDe8jgHjZr/j/qz8/Pj+e1Xo/H42vFOTvtesfWnK+serdd37nSjndMu4dvO751tZXvmHQPK79rl13vmHQPx8bvXGnHO17dQ9Mv6tUvdUcrMlxxxt2tyHDFGXe3IsMVZ9zdigxXnHF3VxleFvXVAbSbyXJmL2czWc7s5Wwmy5m9nM1kObOXs1qW1aKubWTMSKYje6gbyXRkD3UjmY7soW4k05E91L3K9GVRv9rAvJ5se2bp05Ntzyx9erLtmaVPT7Y9s/QpZVss6tIga7Vk3DLDnJaMW2aY05JxywxzWjJumWHOc8a/ivp5gH1qWdeesVYt69oz1qplXXvGWrWsa89Y62fWp6J2Ce9Xyry0xl6lzEtr7FXKvLTGXqXMS2vs9Z35r1/UAEAORQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABDsV9ePx+Pr5N/uVMi+tsVcp89Iae5UyL62xVynz0hp7fWf+6xe1y3ifWta1Z6xVy7r2jLVqWdeesVYt69oz1vqZ9a+iPlzGW7Rk3DLDnJaMW2aY05JxywxzWjJumWHOc8bFoj4Kg6zTk23PLH16su2ZpU9Ptj2z9OnJtmeWPqVsXxb18WIDc0YyHdlD3UimI3uoG8l0ZA91I5mO7KHuVabVoj4qG+k3k+XMXs5mspzZy9lMljN7OZvJcmYvZ7UsL4v6uDiANisyXHHG3a3IcMUZd7ciwxVn3N2KDFeccXdXGX5cDQAAf6fpFzUA8Dd6ivrf5wX+hHvI4B4yuIcM7mGj1qL+7ziOf54XeTv3kME9ZHAPGdzDZs3/R/35+fnxvNbr8Xh8rThnp13v2JrzlVXvtus7V9rxjmn38G3Ht6628h2T7mHld+2y6x2T7uHY+J0r7XjHq3to+kW9+qXuaEWGK864uxUZrjjj7lZkuOKMu1uR4Yoz7u4qw8uivjqAdjNZzuzlbCbLmb2czWQ5s5ezmSxn9nJWy7Ja1LWNjBnJdGQPdSOZjuyhbiTTkT3UjWQ6soe6V5m+LOpXG5jXk23PLH16su2ZpU9Ptj2z9OnJtmeWPqVsi0VdGmStloxbZpjTknHLDHNaMm6ZYU5Lxi0zzHnO+FdRPw+wTy3r2jPWqmVde8Zataxrz1irlnXtGWv9zPpU1C7h/UqZl9bYq5R5aY29SpmX1tirlHlpjb2+M//1ixoAyKGoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgp6J+PB5fP/9mv1LmpTX2KmVeWmOvUualNfYqZV5aY6/vzH/9onYZ71PLuvaMtWpZ156xVi3r2jPWqmVde8ZaP7P+VdSHy3iLloxbZpjTknHLDHNaMm6ZYU5Lxi0zzHnOuFjUR2GQdXqy7ZmlT0+2PbP06cm2Z5Y+Pdn2zNKnlO3Loj5ebGDOSKYje6gbyXRkD3UjmY7soW4k05E91L3KtFrUR2Uj/WaynNnL2UyWM3s5m8lyZi9nM1nO7OWsluVlUR8XB9BmRYYrzri7FRmuOOPuVmS44oy7W5HhijPu7irDj6sBAODvNP2iBgD+Rk9R//u8wJ9wDxncQwb3kME9bNRa1P8dx/HP8yJv5x4yuIcM7iGDe9is+f+oPz8/P57Xej0ej68V5+y06x1bc76y6t12fedKO94x7R6+7fjW1Va+Y9I9rPyuXXa9Y9I9HBu/c6Ud73h1D02/qFe/1B2tyHDFGXe3IsMVZ9zdigxXnHF3KzJcccbdXWV4WdRXB9BuJsuZvZzNZDmzl7OZLGf2cjaT5cxezmpZVou6tpExI5mO7KFuJNORPdSNZDqyh7qRTEf2UPcq05dF/WoD83qy7ZmlT0+2PbP06cm2Z5Y+Pdn2zNKnlG2xqEuDrNWSccsMc1oybplhTkvGLTPMacm4ZYY5zxn/KurnAfapZV17xlq1rGvPWKuWde0Za9Wyrj1jrZ9Zn4raJbxfKfPSGnuVMi+tsVcp89Iae5UyL62x13fmv35RAwA5FDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEOxU1I/H4+vn3+xXyry0xl6lzEtr7FXKvLTGXqXMS2vs9Z35r1/ULuN9alnXnrFWLevaM9aqZV17xlq1rGvPWOtn1r+K+nAZb9GSccsMc1oybplhTkvGLTPMacm4ZYY5zxkXi/ooDLJOT7Y9s/TpybZnlj492fbM0qcn255Z+pSyfVnUx4sNzBnJdGQPdSOZjuyhbiTTkT3UjWQ6soe6V5lWi/qobKTfTJYzezmbyXJmL2czWc7s5Wwmy5m9nNWyvCzq4+IA2qzIcMUZd7ciwxVn3N2KDFeccXcrMlxxxt1dZfhxNQAA/J2mX9QAwN/oKep/nxf4E+4hg3vI4B4yuIeNWov6v+M4/nle5O3cQwb3kME9ZHAPmzX/H/Xn5+fH81qvx+PxteKcnXa9Y2vOV1a9267vXGnHO6bdw7cd37rayndMuoeV37XLrndMuodj43eutOMdr+6h6Rf16pe6oxUZrjjj7lZkuOKMu1uR4Yoz7m5FhivOuLurDC+L+uoA2s1kObOXs5ksZ/ZyNpPlzF7OZrKc2ctZLctqUdc2MmYk05E91I1kOrKHupFMR/ZQN5LpyB7qXmX6sqhfbWBeT7Y9s/TpybZnlj492fbM0qcn255Z+pSyLRZ1aZC1WjJumWFOS8YtM8xpybhlhjktGbfMMOc5419F/TzAPrWsa89Yq5Z17Rlr1bKuPWOtWta1Z6z1M+tTUbuE9ytlXlpjr1LmpTX2KmVeWmOvUualNfb6zvzXL2oAIIeiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCnYr68Xh8/fyb/UqZl9bYq5R5aY29SpmX1tirlHlpjb2+M//1i9plvE8t69oz1qplXXvGWrWsa89Yq5Z17Rlr/cz6V1EfLuMtWjJumWFOS8YtM8xpybhlhjktGbfMMOc542JRH4VB1unJtmeWPj3Z9szSpyfbnln69GTbM0ufUrYvi/p4sYE5I5mO7KFuJNORPdSNZDqyh7qRTEf2UPcq02pRH5WN9JvJcmYvZzNZzuzlbCbLmb2czWQ5s5ezWpaXRX1cHECbFRmuOOPuVmS44oy7W5HhijPubkWGK864u6sMP64GAIC/0/SLGgD4Gz1F/e/zAn/CPWRwDxncQwb3sFFrUf93HMc/z4u8nXvI4B4yuIcM7mGz5v+j/vz8/Hhe6/V4PL5WnLPTrndszfnKqnfb9Z0r7XjHtHv4tuNbV1v5jkn3sPK7dtn1jkn3cGz8zpV2vOPVPTT9ol79Une0IsMVZ9zdigxXnHF3KzJcccbdrchwxRl3d5XhZVFfHUC7mSxn9nI2k+XMXs5mspzZy9lMljN7OatlWS3q2kbGjGQ6soe6kUxH9lA3kunIHupGMh3ZQ92rTF8W9asNzOvJtmeWPj3Z9szSpyfbnln69GTbM0ufUrbFoi4NslZLxi0zzGnJuGWGOS0Zt8wwpyXjlhnmPGf8q6ifB9inlnXtGWvVsq49Y61a1rVnrFXLuvaMtX5mfSpql/B+pcxLa+xVyry0xl6lzEtr7FXKvLTGXt+Z//pFDQDkUNQAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQDBFDQDBFDUABFPUABBMUQNAMEUNAMEUNQAEU9QAEExRA0AwRQ0AwRQ1AART1AAQTFEDQLBTUT8ej6+ff7NfKfPSGnuVMi+tsVcp89Iae5UyL62x13fmv35Ru4z3qWVde8Zataxrz1irlnXtGWvVsq49Y62fWf8q6sNlvEVLxi0zzGnJuGWGOS0Zt8wwpyXjlhnmPGdcLOqjMMg6Pdn2zNKnJ9ueWfr0ZNszS5+ebHtm6VPK9mVRHy82MGck05E91I1kOrKHupFMR/ZQN5LpyB7qXmVaLeqjspF+M1nO7OVsJsuZvZzNZDmzl7OZLGf2clbL8rKoj4sDaLMiwxVn3N2KDFeccXcrMlxxxt2tyHDFGXd3leHH1QAA8HeaflEDAH+jp6j/fV7gT7iHDO4hg3vI4B42ai3q/47j+Od5kbdzDxncQwb3kME9bNb8f9Sfn58fz2u9Ho/H14pzdtr1jq05X1n1bru+c6Ud75h2D992fOtqK98x6R5Wftcuu94x6R6Ojd+50o53vLqHpl/Uq1/qjlZkuOKMu1uR4Yoz7m5FhivOuLsVGa444+6uMrws6qsDaDeT5cxezmaynNnL2UyWM3s5m8lyZi9ntSyrRV3byJiRTEf2UDeS6cge6kYyHdlD3UimI3uoe5Xpy6J+tYF5Pdn2zNKnJ9ueWfr0ZNszS5+ebHtm6VPKtljUpUHWasm4ZYY5LRm3zDCnJeOWGea0ZNwyw5znjH8V9fMA+9Syrj1jrVrWtWesVcu69oy1alnXnrHWz6xPRe0S3q+UeWmNvUqZl9bYq5R5aY29SpmX1tjrO/Nfv6gBgByKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIpqgBIJiiBoBgihoAgilqAAimqAEgmKIGgGCKGgCCKWoACKaoASCYogaAYIoaAIIpagAIdirqx+Px9fNv9itlXlpjr1LmpTX2KmVeWmOvUualNfb6zvzXL2qX8T61rGvPWKuWde0Za9Wyrj1jrVrWtWes9TPrX0V9uIy3aMm4ZYY5LRm3zDCnJeOWGea0ZNwyw5znjItFfRQGWacn255Z+vRk2zNLn55se2bp05Ntzyx9Stm+LOrjxQbmjGQ6soe6kUxH9lA3kunIHupGMh3ZQ92rTKtFfVQ20m8my5m9nM1kObOXs5ksZ/ZyNpPlzF7OalleFvVxcQBtVmS44oy7W5HhijPubkWGK864uxUZrjjj7q4y/LgaAAD+TtMvagDgbyhqAAj2f/APkt2QRm3XAAAAAElFTkSuQmCC';

    const TEMPLATE_CACHE = new Map();
    const PLACEHOLDER_REGEX = /\{\{(\d+)\}\}/g;
    function toTemplateStrings(parts) {
        const strings = [...parts];
        Object.defineProperty(strings, 'raw', {
            value: [...parts],
            writable: false,
            enumerable: false,
            configurable: false,
        });
        return strings;
    }
    function compileTemplate(template) {
        const parts = [];
        const valueIndexes = [];
        let lastIndex = 0;
        PLACEHOLDER_REGEX.lastIndex = 0;
        let match;
        while ((match = PLACEHOLDER_REGEX.exec(template)) !== null) {
            parts.push(template.slice(lastIndex, match.index));
            valueIndexes.push(Number(match[1]));
            lastIndex = match.index + match[0].length;
        }
        parts.push(template.slice(lastIndex));
        return {
            strings: toTemplateStrings(parts),
            valueIndexes,
        };
    }
    function htmlFromTpl(template, ...values) {
        let compiled = TEMPLATE_CACHE.get(template);
        if (!compiled) {
            compiled = compileTemplate(template);
            TEMPLATE_CACHE.set(template, compiled);
        }
        const orderedValues = compiled.valueIndexes.map((index) => values[index]);
        return x(compiled.strings, ...orderedValues);
    }

    var cardStyles = "ha-card {\r\n  height: 100%;\r\n  width: 100%;\r\n  position: relative;\r\n}\r\n\r\n.card-content {\r\n  padding: 16px;\r\n  overflow: auto;\r\n  position: relative;\r\n}\r\n\r\n.top-controls {\r\n  position: sticky;\r\n  top: 0;\r\n  z-index: 10;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  gap: 10px;\r\n  flex-wrap: wrap;\r\n  background: var(--card-background-color, var(--ha-card-background, #fff));\r\n  padding-bottom: 8px;\r\n  margin-bottom: 6px;\r\n}\r\n\r\n.history-controls {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  flex-wrap: wrap;\r\n  min-width: 240px;\r\n  flex: 1;\r\n}\r\n\r\n.history-label {\r\n  font-size: 12px;\r\n  color: var(--secondary-text-color, #666);\r\n  font-weight: 500;\r\n}\r\n\r\n.history-date-input {\r\n  min-width: 130px;\r\n  padding: 4px 8px;\r\n  border-radius: 8px;\r\n  border: 1px solid var(--divider-color, #d0d0d0);\r\n  background: var(--card-background-color, var(--ha-card-background, #fff));\r\n  color: var(--primary-text-color, #222);\r\n  font-size: 12px;\r\n}\r\n\r\n.history-day-btn {\r\n  width: 28px;\r\n  height: 28px;\r\n  border: 1px solid var(--divider-color, #d0d0d0);\r\n  border-radius: 50%;\r\n  background: var(--card-background-color, var(--ha-card-background, #fff));\r\n  color: var(--primary-text-color, #222);\r\n  font-size: 18px;\r\n  line-height: 1;\r\n  padding: 0;\r\n  cursor: pointer;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex: 0 0 auto;\r\n}\r\n\r\n.history-day-btn:hover {\r\n  border-color: var(--primary-color, #03a9f4);\r\n  color: var(--primary-color, #03a9f4);\r\n}\r\n\r\n.history-time-slider {\r\n  width: min(280px, 48vw);\r\n  min-width: 140px;\r\n  accent-color: var(--primary-color, #03a9f4);\r\n  cursor: pointer;\r\n}\r\n\r\n.history-time-value {\r\n  min-width: 42px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  color: var(--primary-text-color, #333);\r\n  text-align: right;\r\n}\r\n\r\n.history-now-btn {\r\n  border: 1px solid var(--divider-color, #d0d0d0);\r\n  border-radius: 12px;\r\n  background: var(--card-background-color, var(--ha-card-background, #fff));\r\n  color: var(--primary-text-color, #222);\r\n  font-size: 11px;\r\n  font-weight: 600;\r\n  line-height: 1;\r\n  padding: 6px 10px;\r\n  cursor: pointer;\r\n}\r\n\r\n.history-now-btn:hover {\r\n  border-color: var(--primary-color, #03a9f4);\r\n  color: var(--primary-color, #03a9f4);\r\n}\r\n\r\n.history-meta {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  font-size: 12px;\r\n  margin-bottom: 8px;\r\n  color: var(--secondary-text-color, #666);\r\n}\r\n\r\n.history-status {\n  font-weight: 600;\n  color: var(--primary-color, #03a9f4);\n}\n\n.history-energy-sync {\n  display: inline-flex;\n  align-items: center;\n  padding: 2px 8px;\n  border-radius: 999px;\n  border: 1px solid rgba(3, 169, 244, 0.45);\n  background: rgba(3, 169, 244, 0.1);\n  color: var(--primary-color, #03a9f4);\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.2;\n}\n\r\n.history-error {\r\n  margin-bottom: 8px;\r\n  font-size: 12px;\r\n  color: #d32f2f;\r\n}\r\n\r\n.canvas-wrapper {\r\n  position: relative;\r\n  margin: 0 auto;\r\n  overflow: hidden;\r\n}\r\n\r\n.canvas-wrapper.interactive {\r\n  touch-action: none;\r\n  cursor: grab;\r\n}\r\n\r\n.canvas-wrapper.interactive:active {\r\n  cursor: grabbing;\r\n}\r\n\r\n.solar-grid-container {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  background: transparent;\r\n  border: 1px solid var(--divider-color);\r\n  cursor: default;\r\n  user-select: none;\r\n  transform-origin: center center;\r\n}\r\n\r\n.background-image {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  object-fit: none;\r\n  object-position: top left;\r\n  z-index: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n.view-toggle {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  background: var(--card-background-color, var(--ha-card-background, #fff));\r\n  border: 1px solid var(--divider-color, #e0e0e0);\r\n  border-radius: 20px;\r\n  padding: 4px 10px;\r\n  cursor: pointer;\r\n  user-select: none;\r\n  white-space: nowrap;\r\n}\r\n\r\n.view-toggle:hover {\r\n  border-color: var(--primary-color, #03a9f4);\r\n}\r\n\r\n.toggle-label {\r\n  font-size: 11px;\r\n  font-weight: 400;\r\n  color: var(--secondary-text-color, #888);\r\n  transition: color 0.2s, font-weight 0.2s;\r\n}\r\n\r\n.toggle-label.active {\r\n  font-weight: 700;\r\n  color: var(--primary-text-color, #333);\r\n}\r\n\r\n.toggle-track {\r\n  position: relative;\r\n  width: 32px;\r\n  height: 16px;\r\n  border-radius: 8px;\r\n  background: var(--disabled-color, #bdbdbd);\r\n  transition: background 0.25s;\r\n}\r\n\r\n.toggle-track.on {\r\n  background: var(--primary-color, #03a9f4);\r\n}\r\n\r\n.toggle-thumb {\r\n  position: absolute;\r\n  top: 2px;\r\n  left: 2px;\r\n  width: 12px;\r\n  height: 12px;\r\n  border-radius: 50%;\r\n  background: white;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\r\n  transition: left 0.25s;\r\n}\r\n\r\n.toggle-track.on .toggle-thumb {\r\n  left: 18px;\r\n}\r\n\r\n.solar-panel {\r\n  position: absolute;\r\n  cursor: pointer;\r\n  transition: box-shadow 0.2s;\r\n  border-radius: 0;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\r\n  pointer-events: auto;\r\n  transform-origin: center center;\r\n}\r\n\r\n.solar-panel:hover {\r\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.panel-background {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 0;\r\n  transition: background-color 0.3s ease;\r\n}\r\n\r\n.panel-image {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: contain;\r\n  object-position: center;\r\n  z-index: 1;\r\n  opacity: 0.9;\r\n}\r\n\r\n.panel-overlay {\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 2;\r\n}\r\n\r\n.panel-value {\n  background: rgba(0, 0, 0, 0.6);\n  color: white;\n  padding: 4px 6px;\n  border-radius: 3px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n  white-space: nowrap;\n}\n\n.entity-value {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  gap: 3px;\n  line-height: 1.1;\n}\n\n.value {\n  font-weight: bold;\n}\n\n.value.primary {\n  font-size: var(--font-size-primary, 14px);\n}\n\n.value.secondary {\n  font-size: var(--font-size-secondary, 12px);\n  font-weight: normal;\n}\n\n.unit {\n  font-size: var(--font-size-unit, 10px);\n  font-weight: normal;\n  opacity: 0.8;\n}\n\n.panel-name {\n  font-size: 10px;\n  opacity: 0.9;\n  font-weight: normal;\n  letter-spacing: 0.5px;\n  margin-bottom: 0;\n  width: 100%;\n  text-align: center;\n  line-height: 1;\n}\n\r\n.error {\r\n  color: #ff6b6b;\r\n}\r\n";

    var cardRenderTpl = "<ha-card>\r\n  <div class=\"card-content\">\r\n    {{0}}\r\n    {{1}}\r\n    {{2}}\r\n  </div>\r\n</ha-card>\r\n";

    var cardTopControlsTpl = "<div class=\"top-controls\">\r\n  <div class=\"history-controls\">\r\n    <button type=\"button\" class=\"history-day-btn\" @click={{0}} aria-label=\"Previous day\" title=\"Previous day\">&#8249;</button>\r\n    <button type=\"button\" class=\"history-day-btn\" @click={{1}} aria-label=\"Next day\" title=\"Next day\">&#8250;</button>\r\n    <label for=\"history-date\" class=\"history-label\">Date</label>\r\n    <input id=\"history-date\" class=\"history-date-input\" type=\"date\" .value={{2}} @change={{3}} />\r\n    <label for=\"history-time\" class=\"history-label\">Time</label>\r\n    <input id=\"history-time\" class=\"history-time-slider\" type=\"range\" min=\"0\" max=\"1439\" step=\"1\" .value={{4}} @input={{5}} />\r\n    <span class=\"history-time-value\">{{6}}</span>\r\n    <button type=\"button\" class=\"history-now-btn\" @click={{7}}>Now</button>\r\n  </div>\r\n  {{8}}\r\n</div>\r\n";

    var cardEnergyToggleTpl = "<div class=\"view-toggle\" @click={{0}} title=\"Toggle between power and energy view\">\r\n  <span class={{1}}>W</span>\r\n  <div class={{2}}>\r\n    <div class=\"toggle-thumb\"></div>\r\n  </div>\r\n  <span class={{3}}>kWh</span>\r\n</div>\r\n";

    var cardHistoryMetaTpl = "<div class=\"history-meta\">\n  <span>Snapshot: {{0}}</span>\n  {{1}}\n  {{2}}\n</div>\n{{3}}\n";

    var cardHistoryStatusTpl = "<span class=\"history-status\">Loading...</span>\r\n";

    var cardHistoryErrorTpl = "<div class=\"history-error\">{{0}}</div>\r\n";

    var cardCanvasTpl = "<div class={{0}} style=\"width: {{1}}px; height: {{2}}px; --font-size-primary: {{19}}px; --font-size-secondary: {{20}}px; --font-size-unit: {{21}}px;\" @wheel={{3}} @pointerdown={{4}} @pointermove={{5}} @pointerup={{6}} @pointercancel={{7}} @dblclick={{8}}>\n  <div class=\"solar-grid-container\" style=\"width: {{9}}px; height: {{10}}px; margin-left: -{{11}}px; margin-top: -{{12}}px; transform: translate({{13}}px, {{14}}px) scale({{15}}){{16}};\">\r\n    {{17}}\r\n    {{18}}\r\n  </div>\r\n</div>\r\n";

    var cardBackgroundImageTpl = "<img src={{0}} alt=\"\" class=\"background-image\" style=\"opacity: {{1}};\" />\r\n";

    var cardPanelTpl = "<div class=\"solar-panel\" style={{0}} @click={{1}} @mousedown={{2}}>\r\n  <div class=\"panel-background\" style=\"background-color: {{3}}\"></div>\r\n  <img src={{4}} alt=\"Solar Panel\" class=\"panel-image\" />\r\n  <div class=\"panel-overlay\">\n    <div class=\"panel-value\" style={{5}}>\n      {{6}}\n      {{7}}\n    </div>\n  </div>\n</div>\n";

    var cardPanelValueTpl = "<div class=\"entity-value {{2}}\">\n  <span class=\"value {{2}}\">{{0}}</span>\n  <span class=\"unit\">{{1}}</span>\n</div>\n";

    var cardPanelErrorTpl = "<span class=\"error\">N/A</span>\r\n";

    // default values used throughout the card
    const DEFAULT_GRID_SIZE = 10;
    const DEFAULT_PANEL_WIDTH = 80; // px, 1:1.8 aspect ratio
    const DEFAULT_PANEL_HEIGHT = 144; // px, 1:1.8 aspect ratio
    const DEFAULT_CONTAINER_WIDTH = 1200; // px workspace
    const DEFAULT_CONTAINER_HEIGHT = 1200; // px workspace
    // Helper function to convert HSL to RGB
    function hslToRgb(h, s, l) {
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;
        if (h >= 0 && h < 60) {
            r = c;
            g = x;
            b = 0;
        }
        else if (h >= 60 && h < 120) {
            r = x;
            g = c;
            b = 0;
        }
        else if (h >= 120 && h < 180) {
            r = 0;
            g = c;
            b = x;
        }
        else if (h >= 180 && h < 240) {
            r = 0;
            g = x;
            b = c;
        }
        else if (h >= 240 && h < 300) {
            r = x;
            g = 0;
            b = c;
        }
        else if (h >= 300 && h < 360) {
            r = c;
            g = 0;
            b = x;
        }
        const rr = Math.round((r + m) * 255)
            .toString(16)
            .padStart(2, '0');
        const gg = Math.round((g + m) * 255)
            .toString(16)
            .padStart(2, '0');
        const bb = Math.round((b + m) * 255)
            .toString(16)
            .padStart(2, '0');
        return `#${rr}${gg}${bb}`;
    }
    class SolarPanelGridCard extends s {
        constructor() {
            super(...arguments);
            this._showEnergy = false;
            this._scale = 1;
            this._selectedDate = '';
            this._selectedMinute = 0;
            this._historyLoading = false;
            this._historyError = '';
            this._viewZoom = 1;
            this._viewPanX = 0;
            this._viewPanY = 0;
            this._resizeObserver = undefined;
            this._historyStates = new Map();
            this._historyRequestToken = 0;
            this._energyCollection = null;
            this._unsubEnergy = null;
            this._energyStats = {};
            this._energyDays = 1;
            this._activePointers = new Map();
            this._isViewportPanning = false;
            this._panStartPoint = { x: 0, y: 0 };
            this._panStartOffset = { x: 0, y: 0 };
            this._pinchLastDistance = 0;
            this._pinchLastMidpoint = null;
            this._suppressPanelClick = false;
            this.panels = new Map();
            this.draggedPanel = null;
            this.dragOffset = { x: 0, y: 0 };
            this.panelImage = PANEL_IMAGE_DATA_URI;
            this.containerWidth = DEFAULT_CONTAINER_WIDTH;
            this.containerHeight = DEFAULT_CONTAINER_HEIGHT;
            this.gridSize = DEFAULT_GRID_SIZE;
            this.panelWidth = DEFAULT_PANEL_WIDTH;
            this.panelHeight = DEFAULT_PANEL_HEIGHT;
            this._onDateChanged = (event) => {
                const value = event.target.value;
                if (!value)
                    return;
                this._selectedDate = value;
                this._scheduleHistoryFetch(0);
            };
            this._goToPreviousDay = () => {
                this._shiftSelectedDate(-1);
            };
            this._goToNextDay = () => {
                this._shiftSelectedDate(1);
            };
            this._onTimeSliderChanged = (event) => {
                const minutes = Number(event.target.value);
                this._selectedMinute = Number.isFinite(minutes) ? Math.max(0, Math.min(1439, minutes)) : 0;
                this._scheduleHistoryFetch(120);
            };
            this._jumpToNow = () => {
                const now = new Date();
                this._selectedDate = this._toDateInputValue(now);
                this._selectedMinute = now.getHours() * 60 + now.getMinutes();
                this._scheduleHistoryFetch(0);
            };
            this._resetViewportTransform = () => {
                this._viewZoom = 1;
                this._viewPanX = 0;
                this._viewPanY = 0;
            };
            this._onViewportWheel = (event) => {
                if (this.isEditorPreview) {
                    return;
                }
                event.preventDefault();
                const zoomFactor = Math.exp(-event.deltaY * 0.0015);
                const point = this._getPointInViewport(event);
                this._applyZoomAt(this._viewZoom * zoomFactor, point.x, point.y);
            };
            this._onViewportPointerDown = (event) => {
                if (this.isEditorPreview) {
                    return;
                }
                if (event.pointerType === 'mouse' && event.button !== 0) {
                    return;
                }
                const target = event.target;
                if (target?.closest('.solar-panel')) {
                    return;
                }
                const point = this._getPointInViewport(event);
                this._activePointers.set(event.pointerId, point);
                const wrapper = this.shadowRoot?.querySelector('.canvas-wrapper');
                if (wrapper && wrapper.setPointerCapture) {
                    try {
                        wrapper.setPointerCapture(event.pointerId);
                    }
                    catch {
                        // Ignore browsers that fail capture for this pointer.
                    }
                }
                if (this._activePointers.size === 1) {
                    this._isViewportPanning = true;
                    this._panStartPoint = point;
                    this._panStartOffset = { x: this._viewPanX, y: this._viewPanY };
                }
                if (this._activePointers.size === 2) {
                    this._isViewportPanning = false;
                    this._pinchLastDistance = this._getPointerDistance();
                    this._pinchLastMidpoint = this._getPointerMidpoint();
                    this._suppressPanelClick = true;
                }
            };
            this._onViewportPointerMove = (event) => {
                if (this.isEditorPreview) {
                    return;
                }
                if (!this._activePointers.has(event.pointerId)) {
                    return;
                }
                const point = this._getPointInViewport(event);
                this._activePointers.set(event.pointerId, point);
                if (this._activePointers.size >= 2) {
                    event.preventDefault();
                    const distance = this._getPointerDistance();
                    const midpoint = this._getPointerMidpoint();
                    if (distance > 0 && this._pinchLastDistance > 0 && midpoint) {
                        const zoomFactor = distance / this._pinchLastDistance;
                        this._applyZoomAt(this._viewZoom * zoomFactor, midpoint.x, midpoint.y);
                        if (this._pinchLastMidpoint) {
                            const dx = midpoint.x - this._pinchLastMidpoint.x;
                            const dy = midpoint.y - this._pinchLastMidpoint.y;
                            this._applyPan(this._viewPanX + dx, this._viewPanY + dy);
                        }
                    }
                    this._pinchLastDistance = distance;
                    this._pinchLastMidpoint = midpoint;
                    this._suppressPanelClick = true;
                    return;
                }
                if (this._isViewportPanning && this._activePointers.size === 1) {
                    event.preventDefault();
                    const dx = point.x - this._panStartPoint.x;
                    const dy = point.y - this._panStartPoint.y;
                    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                        this._suppressPanelClick = true;
                    }
                    this._applyPan(this._panStartOffset.x + dx, this._panStartOffset.y + dy);
                }
            };
            this._onViewportPointerUp = (event) => {
                if (this.isEditorPreview) {
                    return;
                }
                this._activePointers.delete(event.pointerId);
                if (this._activePointers.size < 2) {
                    this._pinchLastDistance = 0;
                    this._pinchLastMidpoint = null;
                }
                if (this._activePointers.size === 1) {
                    const remainingPoint = Array.from(this._activePointers.values())[0];
                    this._isViewportPanning = true;
                    this._panStartPoint = remainingPoint;
                    this._panStartOffset = { x: this._viewPanX, y: this._viewPanY };
                    return;
                }
                this._isViewportPanning = false;
            };
            this.onMouseMove = (e) => {
                e.preventDefault();
                if (!this.draggedPanel)
                    return;
                const panel = this.panels.get(this.draggedPanel);
                if (!panel)
                    return;
                const container = this.shadowRoot?.querySelector('.solar-grid-container');
                if (!container)
                    return;
                const rect = container.getBoundingClientRect();
                const scale = this._scale || 1;
                let x = (e.clientX - rect.left - this.dragOffset.x) / scale;
                let y = (e.clientY - rect.top - this.dragOffset.y) / scale;
                // Clamp to container bounds
                x = Math.max(0, Math.min(x, this.containerWidth - this.panelWidth));
                y = Math.max(0, Math.min(y, this.containerHeight - this.panelHeight));
                // Snap to grid
                x = this.snapToGrid(x);
                y = this.snapToGrid(y);
                panel.config.x;
                panel.config.y;
                // Update panel position by creating a new config object
                panel.config = { ...panel.config, x, y };
                this.requestUpdate();
            };
            this.onMouseUp = () => {
                this.draggedPanel = null;
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('mouseup', this.onMouseUp);
                // Update config with current panel positions
                const updatedPanels = Array.from(this.panels.values()).map((p) => p.config);
                const updatedConfig = {
                    ...this.config,
                    panels: updatedPanels,
                };
                this.config = updatedConfig;
                // Build positions map
                const positions = {};
                this.panels.forEach((panel, entityId) => {
                    positions[entityId] = {
                        x: panel.config.x,
                        y: panel.config.y,
                    };
                });
                // Dispatch a custom event to notify the editor of position changes
                window.dispatchEvent(new CustomEvent('solar-panel-positions-changed', {
                    detail: { positions },
                }));
                // Dispatch config-changed event for Home Assistant to persist
                const event = new CustomEvent('config-changed', {
                    detail: { config: updatedConfig },
                    bubbles: true,
                    composed: true,
                });
                this.dispatchEvent(event);
            };
            this._toggleView = () => {
                this._showEnergy = !this._showEnergy;
                this._saveViewState(this._showEnergy);
            };
        }
        static get properties() {
            return {
                hass: { type: Object },
                config: { type: Object },
                _showEnergy: { state: true },
                _scale: { state: true },
                _selectedDate: { state: true },
                _selectedMinute: { state: true },
                _historyLoading: { state: true },
                _historyError: { state: true },
                _viewZoom: { state: true },
                _viewPanX: { state: true },
                _viewPanY: { state: true },
            };
        }
        // Determine whether this card is being rendered inside the editor's
        // preview pane (i.e. the configuration dialog).  The preview wrapper
        // may provide either a `preview` attribute or the `element-preview`
        // CSS class on one of the ancestors, which can be inside a shadow root.
        get isEditorPreview() {
            let node = this;
            while (node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const el = node;
                    if (el.hasAttribute('preview') || el.classList.contains('element-preview')) {
                        return true;
                    }
                }
                if (node instanceof ShadowRoot) {
                    node = node.host;
                }
                else {
                    node = node.parentNode;
                }
            }
            return false;
        }
        // Calculate background color based on production
        getProductionColor(value, max) {
            if (!max || max === 0)
                return '#000000'; // black for 0%
            const percentage = Math.min(Math.max(value / max, 0), 1);
            // Hue range: 240 (dark blue) to 180 (light blue)
            // As percentage increases, we go from dark blue (high saturation, low lightness)
            // to light blue (medium saturation, high lightness)
            const hue = 240 - percentage * 60; // 240 to 180
            const saturation = 0.6 + percentage * 0.4; // 60% to 100%
            const lightness = 0.2 + percentage * 0.5; // 20% to 70%
            return hslToRgb(hue, saturation, lightness);
        }
        static getConfigElement() {
            return document.createElement('solar-panel-grid-card-editor');
        }
        static getConfigForm() {
            // Providing both for compatibility, but getConfigElement takes precedence
            return null;
        }
        static getStubConfig() {
            return {
                type: 'custom:solar-panel-grid-card',
                grid_size: DEFAULT_GRID_SIZE,
                panel_width: DEFAULT_PANEL_WIDTH,
                panel_height: DEFAULT_PANEL_HEIGHT,
                panels: [
                    {
                        entity: 'sensor.solar_panel_1',
                        name: 'Pnl1',
                        x: 0,
                        y: 0,
                        max_daily_production: 5.5,
                        max_production: 400,
                    },
                ],
            };
        }
        setConfig(config) {
            // Initialize with defaults if panels aren't configured
            if (!config.panels || !Array.isArray(config.panels)) {
                config.panels = [];
            }
            this.config = config;
            this.gridSize = config.grid_size || DEFAULT_GRID_SIZE;
            this.panelWidth = config.panel_width || DEFAULT_PANEL_WIDTH;
            this.panelHeight = config.panel_height || DEFAULT_PANEL_HEIGHT;
            this._showEnergy = this._loadViewState();
            this._initializeTimeSelection();
            this.panels.clear();
            config.panels.forEach((panelConfig) => {
                this.panels.set(panelConfig.entity, {
                    config: panelConfig,
                    entity: undefined,
                });
            });
        }
        _loadViewState() {
            if (this.config?.persist_view_state === false) {
                return false;
            }
            try {
                return localStorage.getItem(SolarPanelGridCard.VIEW_STATE_STORAGE_KEY) === 'true';
            }
            catch {
                return false;
            }
        }
        _saveViewState(value) {
            if (this.config?.persist_view_state === false) {
                return;
            }
            try {
                localStorage.setItem(SolarPanelGridCard.VIEW_STATE_STORAGE_KEY, String(value));
            }
            catch {
                // Ignore localStorage errors (e.g. private mode / restricted browser context)
            }
        }
        _clearViewState() {
            try {
                localStorage.removeItem(SolarPanelGridCard.VIEW_STATE_STORAGE_KEY);
            }
            catch {
                // Ignore localStorage errors (e.g. private mode / restricted browser context)
            }
        }
        _trySubscribeEnergy() {
            if (!this.hass?.connection) {
                return;
            }
            const conn = this.hass.connection;
            const isCollection = (obj) => obj && typeof obj.subscribe === 'function';
            let collection = null;
            const panelKey = `_energy_${this.hass.panelUrl}`;
            if (isCollection(conn[panelKey])) {
                collection = conn[panelKey];
            }
            else if (isCollection(conn._energy)) {
                collection = conn._energy;
            }
            else {
                for (const key of Object.keys(conn)) {
                    if (key.startsWith('_energy') && isCollection(conn[key])) {
                        collection = conn[key];
                        break;
                    }
                }
            }
            if (collection && collection !== this._energyCollection) {
                if (this._unsubEnergy) {
                    this._unsubEnergy();
                }
                this._energyCollection = collection;
                this._unsubEnergy = collection.subscribe((data) => {
                    void this._fetchStatistics(data);
                });
            }
        }
        async _fetchStatistics(energyData) {
            if (!energyData?.start || !this.hass?.callWS) {
                return;
            }
            const start = energyData.start;
            const end = energyData.end || new Date();
            let days = 1;
            if (start && end) {
                const diffTime = Math.abs(end.valueOf() - start.valueOf());
                days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
            }
            this._energyDays = days;
            const today = new Date();
            const startIsToday = start.getDate() === today.getDate()
                && start.getMonth() === today.getMonth()
                && start.getFullYear() === today.getFullYear();
            if (startIsToday && days <= 1) {
                this._energyStats = {};
                this.requestUpdate();
                return;
            }
            const statisticIds = Array.from(this.panels.values())
                .map((p) => p.config.entity_energy)
                .filter((id) => !!id);
            if (statisticIds.length === 0) {
                return;
            }
            try {
                const stats = await this.hass.callWS({
                    type: 'recorder/statistics_during_period',
                    start_time: start.toISOString(),
                    end_time: end.toISOString(),
                    statistic_ids: statisticIds,
                    period: 'hour',
                    types: ['change'],
                });
                const newStats = {};
                for (const id of statisticIds) {
                    const rows = stats?.[id];
                    if (rows && Array.isArray(rows)) {
                        newStats[id] = rows.reduce((sum, val) => sum + (val.change || 0), 0);
                    }
                }
                this._energyStats = newStats;
                this.requestUpdate();
            }
            catch (err) {
                console.warn('[SolarPanelGridCard] Failed to fetch recorder statistics', err);
            }
        }
        update(changedProperties) {
            super.update(changedProperties);
            if (changedProperties.has('config')) {
                const previousConfig = changedProperties.get('config');
                const persistChanged = previousConfig?.persist_view_state !== this.config?.persist_view_state;
                if (persistChanged) {
                    if (this.config?.persist_view_state === false) {
                        this._showEnergy = false;
                        this._clearViewState();
                    }
                    else {
                        this._showEnergy = this._loadViewState();
                    }
                }
                // rebuild panels map whenever config changes
                this.panels.clear();
                if (this.config?.panels) {
                    this.config.panels.forEach((panelConfig) => {
                        this.panels.set(panelConfig.entity, {
                            config: panelConfig,
                            entity: this.hass?.states[panelConfig.entity],
                            entityEnergy: panelConfig.entity_energy ? this.hass?.states[panelConfig.entity_energy] : undefined,
                        });
                    });
                }
                this._trySubscribeEnergy();
            }
            if (changedProperties.has('hass') && this.hass) {
                if (!this._energyCollection) {
                    this._trySubscribeEnergy();
                }
                // Update just the entity references when hass updates
                this.panels.forEach((panel, entity) => {
                    panel.entity = this.hass.states[entity];
                    if (panel.config.entity_energy) {
                        panel.entityEnergy = this.hass.states[panel.config.entity_energy];
                    }
                });
                // Keep selection on current minute by default while card remains in live view.
                if (this._isTodaySelected()) {
                    const now = new Date();
                    const nowMinutes = now.getHours() * 60 + now.getMinutes();
                    if (Math.abs(this._selectedMinute - nowMinutes) <= 1) {
                        this._selectedMinute = nowMinutes;
                    }
                }
            }
            if (changedProperties.has('_scale') || changedProperties.has('config')) {
                this._applyPan(this._viewPanX, this._viewPanY);
            }
            // Do not auto-fetch history on frequent hass/config updates.
            // History requests should only happen from explicit user timeline actions
            // (date change, time slider change, or "Now" button).
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            if (this._unsubEnergy) {
                this._unsubEnergy();
                this._unsubEnergy = null;
            }
            this._energyCollection = null;
            if (this._resizeObserver) {
                this._resizeObserver.disconnect();
            }
            if (this._historyDebounceTimer !== undefined) {
                window.clearTimeout(this._historyDebounceTimer);
                this._historyDebounceTimer = undefined;
            }
        }
        _initializeTimeSelection() {
            if (this._selectedDate) {
                return;
            }
            const now = new Date();
            this._selectedDate = this._toDateInputValue(now);
            this._selectedMinute = now.getHours() * 60 + now.getMinutes();
        }
        _toDateInputValue(date) {
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        }
        _minutesToLabel(totalMinutes) {
            const minutes = Math.max(0, Math.min(1439, totalMinutes));
            const h = String(Math.floor(minutes / 60)).padStart(2, '0');
            const m = String(minutes % 60).padStart(2, '0');
            return `${h}:${m}`;
        }
        _isTodaySelected() {
            if (!this._selectedDate)
                return false;
            return this._selectedDate === this._toDateInputValue(new Date());
        }
        _isLiveSnapshotSelected() {
            if (!this._isTodaySelected()) {
                return false;
            }
            const now = new Date();
            const nowMinutes = now.getHours() * 60 + now.getMinutes();
            return Math.abs(this._selectedMinute - nowMinutes) <= 1;
        }
        _isEnergyDateSelectionActive() {
            return this._isLiveSnapshotSelected() && !!this._energyCollection;
        }
        _getSelectedDateTime() {
            const [y, m, d] = this._selectedDate.split('-').map((n) => Number(n));
            const local = new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0);
            local.setMinutes(Math.max(0, Math.min(1439, this._selectedMinute)));
            return local;
        }
        _getHistoryEntityIds() {
            const allIds = new Set();
            this.panels.forEach((panel) => {
                allIds.add(panel.config.entity);
                if (panel.config.entity_energy) {
                    allIds.add(panel.config.entity_energy);
                }
            });
            return Array.from(allIds).filter((entityId) => !!entityId && !entityId.endsWith('.'));
        }
        _scheduleHistoryFetch(delayMs = 150) {
            if (!this.hass || !this.config) {
                return;
            }
            if (this._historyDebounceTimer !== undefined) {
                window.clearTimeout(this._historyDebounceTimer);
            }
            this._historyDebounceTimer = window.setTimeout(() => {
                this._historyDebounceTimer = undefined;
                void this._fetchHistoricalSnapshot();
            }, delayMs);
        }
        async _fetchHistoricalSnapshot() {
            if (!this.hass?.callApi || !this._selectedDate) {
                this._historyStates = new Map();
                this._historyError = '';
                this.requestUpdate();
                return;
            }
            const entityIds = this._getHistoryEntityIds();
            if (entityIds.length === 0) {
                this._historyStates = new Map();
                this._historyError = '';
                this.requestUpdate();
                return;
            }
            const requestToken = ++this._historyRequestToken;
            this._historyLoading = true;
            this._historyError = '';
            try {
                const endTime = this._getSelectedDateTime();
                const startTime = new Date(endTime);
                startTime.setHours(0, 0, 0, 0);
                const path = `history/period/${encodeURIComponent(startTime.toISOString())}`
                    + `?filter_entity_id=${encodeURIComponent(entityIds.join(','))}`
                    + `&end_time=${encodeURIComponent(endTime.toISOString())}`;
                const historyResult = await this.hass.callApi('GET', path);
                if (requestToken !== this._historyRequestToken) {
                    return;
                }
                const states = new Map();
                if (Array.isArray(historyResult)) {
                    historyResult.forEach((entityHistory) => {
                        if (!Array.isArray(entityHistory) || entityHistory.length === 0) {
                            return;
                        }
                        const latest = entityHistory[entityHistory.length - 1];
                        const entityId = latest?.entity_id;
                        if (!entityId) {
                            return;
                        }
                        const liveEntity = this.hass.states[entityId];
                        states.set(entityId, {
                            entity_id: entityId,
                            state: String(latest?.state ?? liveEntity?.state ?? '0'),
                            attributes: {
                                ...(liveEntity?.attributes || {}),
                                ...(latest?.attributes || {}),
                            },
                        });
                    });
                }
                this._historyStates = states;
                this.requestUpdate();
            }
            catch (err) {
                if (requestToken !== this._historyRequestToken) {
                    return;
                }
                this._historyStates = new Map();
                this._historyError = 'Unable to load historical data for the selected time.';
                console.error('[SolarPanelGridCard] History fetch failed:', err);
                this.requestUpdate();
            }
            finally {
                if (requestToken === this._historyRequestToken) {
                    this._historyLoading = false;
                }
            }
        }
        _getDisplayEntity(entityId) {
            if (!entityId) {
                return undefined;
            }
            return this._historyStates.get(entityId) || this.hass?.states?.[entityId];
        }
        _shiftSelectedDate(days) {
            if (!this._selectedDate) {
                this._initializeTimeSelection();
            }
            const baseDate = this._getSelectedDateTime();
            baseDate.setDate(baseDate.getDate() + days);
            this._selectedDate = this._toDateInputValue(baseDate);
            this._scheduleHistoryFetch(0);
        }
        getProductionValue(entity) {
            if (!entity)
                return 0;
            if (this._isLiveSnapshotSelected() && this._energyStats[entity.entity_id] !== undefined) {
                return this._energyStats[entity.entity_id];
            }
            const value = parseFloat(entity.state);
            return isNaN(value) ? 0 : value;
        }
        getDecimalsForEntity(entity) {
            const unit = entity?.attributes?.unit_of_measurement || '';
            const raw = (unit === 'kWh' || unit === 'Wh')
                ? this.config.energy_decimals
                : this.config.power_decimals;
            const defaultValue = (unit === 'kWh' || unit === 'Wh') ? 2 : 0;
            const parsed = Number(raw);
            if (!Number.isFinite(parsed)) {
                return defaultValue;
            }
            return Math.max(0, Math.min(6, Math.round(parsed)));
        }
        getMaxValue(panelConfig, unit) {
            if (unit === 'kWh' || unit === 'Wh') {
                const maxDaily = panelConfig.max_daily_production || 5.5;
                const periodMax = this._isLiveSnapshotSelected() ? maxDaily * (this._energyDays || 1) : maxDaily;
                // If unit is Wh, convert max_daily_production from kWh to Wh
                return unit === 'Wh' ? periodMax * 1000 : periodMax;
            }
            return panelConfig.max_production || 400;
        }
        snapToGrid(value) {
            if (this.gridSize <= 0)
                return value;
            return Math.round(value / this.gridSize) * this.gridSize;
        }
        _clamp(value, min, max) {
            return Math.min(max, Math.max(min, value));
        }
        _clampZoom(value) {
            return this._clamp(value, 1, 5);
        }
        _getViewportMetrics() {
            const size = this.getContainerSize();
            const canvasRotation = this.config.canvas_rotation || 0;
            const rotatedSize = this.getRotatedBounds(size.width, size.height, canvasRotation);
            const scale = this._scale || 1;
            return {
                width: Math.max(1, Math.round(rotatedSize.width * scale)),
                height: Math.max(1, Math.round(rotatedSize.height * scale)),
            };
        }
        _applyPan(panX, panY) {
            const zoom = this._clampZoom(this._viewZoom);
            const metrics = this._getViewportMetrics();
            const maxPanX = Math.max(0, (metrics.width * zoom - metrics.width) / 2);
            const maxPanY = Math.max(0, (metrics.height * zoom - metrics.height) / 2);
            const clampedX = this._clamp(panX, -maxPanX, maxPanX);
            const clampedY = this._clamp(panY, -maxPanY, maxPanY);
            if (Math.abs(this._viewPanX - clampedX) > 0.01 || Math.abs(this._viewPanY - clampedY) > 0.01) {
                this._viewPanX = clampedX;
                this._viewPanY = clampedY;
            }
        }
        _applyZoomAt(targetZoom, focusX, focusY) {
            const nextZoom = this._clampZoom(targetZoom);
            const currentZoom = this._clampZoom(this._viewZoom);
            const metrics = this._getViewportMetrics();
            const centerX = metrics.width / 2;
            const centerY = metrics.height / 2;
            const worldX = (focusX - centerX - this._viewPanX) / currentZoom;
            const worldY = (focusY - centerY - this._viewPanY) / currentZoom;
            this._viewZoom = nextZoom;
            const nextPanX = focusX - centerX - worldX * nextZoom;
            const nextPanY = focusY - centerY - worldY * nextZoom;
            this._applyPan(nextPanX, nextPanY);
        }
        _getPointInViewport(event) {
            const target = this.shadowRoot?.querySelector('.canvas-wrapper');
            if (!target) {
                return { x: 0, y: 0 };
            }
            const rect = target.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
        }
        _getPointerDistance() {
            const points = Array.from(this._activePointers.values());
            if (points.length < 2) {
                return 0;
            }
            const dx = points[1].x - points[0].x;
            const dy = points[1].y - points[0].y;
            return Math.hypot(dx, dy);
        }
        _getPointerMidpoint() {
            const points = Array.from(this._activePointers.values());
            if (points.length < 2) {
                return null;
            }
            return {
                x: (points[0].x + points[1].x) / 2,
                y: (points[0].y + points[1].y) / 2,
            };
        }
        onPanelMouseDown(e, entityId) {
            // only allow dragging inside the editor preview
            if (!this.isEditorPreview) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            this.draggedPanel = entityId;
            const panel = this.panels.get(entityId);
            if (!panel)
                return;
            const container = this.shadowRoot?.querySelector('.solar-grid-container');
            if (!container)
                return;
            const containerRect = container.getBoundingClientRect();
            // Calculate offset from mouse position to panel's top-left corner
            const scale = this._scale || 1;
            this.dragOffset = {
                x: e.clientX - (containerRect.left + panel.config.x * scale),
                y: e.clientY - (containerRect.top + panel.config.y * scale),
            };
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        }
        onPanelClick(e, entityId) {
            e.preventDefault();
            e.stopPropagation();
            if (this._suppressPanelClick) {
                this._suppressPanelClick = false;
                return;
            }
            // ignore event if panel is being dragged
            if (this.draggedPanel === entityId) {
                return;
            }
            // In energy view, open the energy entity's info dialog if available
            const panel = this.panels.get(entityId);
            const clickEntityId = (this._showEnergy && panel?.config.entity_energy)
                ? panel.config.entity_energy
                : entityId;
            const event = new CustomEvent('hass-more-info', {
                bubbles: true,
                composed: true,
                detail: { entityId: clickEntityId },
            });
            this.dispatchEvent(event);
        }
        /**
         * Get current panel positions
         * Returns a map of entity_id -> {x, y} coordinates
         */
        getCurrentPanelPositions() {
            const positions = {};
            this.panels.forEach((panel, entityId) => {
                positions[entityId] = {
                    x: panel.config.x,
                    y: panel.config.y,
                };
            });
            return positions;
        }
        connectedCallback() {
            super.connectedCallback();
            // Inject CSS into document to override dashboard width constraints
            this.injectCSSOverrides();
            // Use ResizeObserver to actively enforce the width override
            this.enforceFullWidth();
            // panels map will be populated in update() when config changes
        }
        firstUpdated() {
            this._resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const availableWidth = entry.contentRect.width;
                    const size = this.getContainerSize();
                    const canvasRotation = this.config.canvas_rotation || 0;
                    const rotatedSize = this.getRotatedBounds(size.width, size.height, canvasRotation);
                    let newScale = 1;
                    // Only scale down if it exceeds available width
                    if (availableWidth > 0 && availableWidth < rotatedSize.width) {
                        newScale = availableWidth / rotatedSize.width;
                    }
                    if (Math.abs(this._scale - newScale) > 0.001) {
                        this._scale = newScale;
                    }
                }
            });
            const content = this.shadowRoot?.querySelector('.card-content');
            if (content) {
                this._resizeObserver.observe(content);
            }
        }
        enforceFullWidth() {
            // Use setInterval to actively enforce width on parent elements
            const enforcer = setInterval(() => {
                try {
                    let parent = this.parentElement;
                    let foundHuiCard = false;
                    while (parent) {
                        if (parent.tagName === 'HUI-CARD') {
                            const width = parent.offsetWidth;
                            const viewportWidth = window.innerWidth;
                            // If the card is narrower than viewport, force it wider
                            if (width < viewportWidth * 0.9) {
                                parent.style.cssText = 'max-width: none !important; width: 100% !important; box-sizing: border-box !important;';
                                // width enforcement applied
                                foundHuiCard = true;
                            }
                            break;
                        }
                        parent = parent.parentElement;
                    }
                    // If we found and fixed constraints, we can stop the interval
                    if (foundHuiCard) {
                        setTimeout(() => clearInterval(enforcer), 500);
                    }
                }
                catch (e) {
                    console.error('[SolarPanelGridCard] Error enforcing width:', e);
                }
            }, 100);
            // Stop trying after 10 seconds
            setTimeout(() => clearInterval(enforcer), 10000);
        }
        injectCSSOverrides() {
            // Check if we've already injected the styles
            if (document.getElementById('solar-panel-grid-card-overrides')) {
                return;
            }
            const style = document.createElement('style');
            style.id = 'solar-panel-grid-card-overrides';
            style.textContent = `
      /* Override the dashboard's media query constraint */
      @media (min-width: 1000px) {
        .content hui-card {
          max-width: none !important;
          width: 100% !important;
        }
      }
      
      /* Target parent containers */
      hui-card[preview] {
        max-width: none !important;
        width: 100% !important;
      }
      
      .element-preview {
        max-width: none !important;
        width: 100% !important;
      }
      
      .content {
        max-width: none !important;
        width: 100% !important;
      }
      
      /* Target the card element directly */
      solar-panel-grid-card {
        max-width: none !important;
        width: 100% !important;
        display: block !important;
      }
      
      /* Override ha-card constraints */
      solar-panel-grid-card ha-card {
        width: 100% !important;
        max-width: none !important;
      }
    `;
            document.head.appendChild(style);
            // Also try to directly modify the nearest hui-card element
            try {
                let parent = this.parentElement;
                while (parent) {
                    if (parent.tagName === 'HUI-CARD') {
                        parent.style.cssText = 'max-width: none !important; width: 100% !important;';
                        // modified hui-card parent styles
                        break;
                    }
                    parent = parent.parentElement;
                }
                // Also try to modify .content if found
                const contentEl = document.querySelector('.content');
                if (contentEl) {
                    // TypeScript doesn’t know this is an HTMLElement
                    contentEl.style.cssText = 'max-width: none !important; width: 100% !important;';
                    // modified .content styles
                }
            }
            catch (e) {
                console.error('[SolarPanelGridCard] Error modifying parent styles:', e);
            }
            // CSS overrides injected
        }
        getPanelDisplayName(entityId, panelConfig) {
            // prefer user-specified name, fallback to last 4 chars of the entity id
            return panelConfig.name ? panelConfig.name : entityId.slice(-4);
        }
        getRotatedBounds(w, h, angleDeg) {
            if (!angleDeg)
                return { width: w, height: h };
            const rad = Math.abs(angleDeg) * Math.PI / 180;
            return {
                width: Math.ceil(w * Math.cos(rad) + h * Math.sin(rad)),
                height: Math.ceil(w * Math.sin(rad) + h * Math.cos(rad)),
            };
        }
        _hasEnergyEntities() {
            return Array.from(this.panels.values()).some((p) => !!p.config.entity_energy);
        }
        /**
         * Compute the container size based on panel positions.
         * In editor preview mode, use a large workspace so panels can be placed freely.
         * In dashboard mode, fit tightly around the panels (with padding).
         */
        getContainerSize() {
            const PADDING = 20; // px padding around content
            // If explicit canvas dimensions are configured, always use them
            if (this.config.canvas_width && this.config.canvas_height) {
                return { width: this.config.canvas_width, height: this.config.canvas_height };
            }
            if (this.isEditorPreview) {
                // In editor, use a large workspace for layout building
                return { width: this.containerWidth, height: this.containerHeight };
            }
            // Calculate bounding box of all panels
            let maxX = 0;
            let maxY = 0;
            this.panels.forEach((panel) => {
                const right = panel.config.x + this.panelWidth;
                const bottom = panel.config.y + this.panelHeight;
                if (right > maxX)
                    maxX = right;
                if (bottom > maxY)
                    maxY = bottom;
            });
            // If no panels, use a minimal size
            if (maxX === 0 && maxY === 0) {
                return { width: 200, height: 200 };
            }
            return {
                width: maxX + PADDING,
                height: maxY + PADDING,
            };
        }
        _renderTopControls(hasEnergy) {
            const energyToggleMarkup = hasEnergy
                ? htmlFromTpl(cardEnergyToggleTpl, this._toggleView, `toggle-label ${!this._showEnergy ? 'active' : ''}`, `toggle-track ${this._showEnergy ? 'on' : ''}`, `toggle-label ${this._showEnergy ? 'active' : ''}`)
                : '';
            return htmlFromTpl(cardTopControlsTpl, this._goToPreviousDay, this._goToNextDay, this._selectedDate, this._onDateChanged, String(this._selectedMinute), this._onTimeSliderChanged, this._minutesToLabel(this._selectedMinute), this._jumpToNow, energyToggleMarkup);
        }
        _renderHistoryMeta(selectedDateTimeLabel) {
            const statusMarkup = this._historyLoading ? htmlFromTpl(cardHistoryStatusTpl) : '';
            const errorMarkup = this._historyError ? htmlFromTpl(cardHistoryErrorTpl, this._historyError) : '';
            const energySyncMarkup = this._isEnergyDateSelectionActive()
                ? htmlFromTpl('<span class="history-energy-sync">Synced with Energy date filter</span>')
                : '';
            return htmlFromTpl(cardHistoryMetaTpl, selectedDateTimeLabel, statusMarkup, energySyncMarkup, errorMarkup);
        }
        _renderPanel(entityId, panel, canvasRotation) {
            const rotation = panel.config.rotation || 0;
            const totalRotation = rotation + canvasRotation;
            const activeEntityId = (this._showEnergy && panel.config.entity_energy)
                ? panel.config.entity_energy
                : entityId;
            const secondaryEntityId = (this._showEnergy && panel.config.entity_energy)
                ? entityId
                : panel.config.entity_energy;
            const activeEntity = this._getDisplayEntity(activeEntityId);
            const secondaryEntity = secondaryEntityId ? this._getDisplayEntity(secondaryEntityId) : undefined;
            const showSecondary = this.config.show_secondary === true;
            const panelStyle = `left: ${panel.config.x}px; top: ${panel.config.y}px; width: ${this.panelWidth}px; height: ${this.panelHeight}px;${rotation ? ` transform: rotate(${rotation}deg);` : ''}`;
            const panelValueStyle = totalRotation ? `transform: rotate(${-totalRotation}deg)` : '';
            const backgroundColor = this.getProductionColor(this.getProductionValue(activeEntity), this.getMaxValue(panel.config, activeEntity?.attributes.unit_of_measurement || 'W'));
            const primaryPanelValueMarkup = activeEntity
                ? htmlFromTpl(cardPanelValueTpl, this.getProductionValue(activeEntity).toLocaleString(this.hass?.locale?.language || undefined, {
                    minimumFractionDigits: this.getDecimalsForEntity(activeEntity),
                    maximumFractionDigits: this.getDecimalsForEntity(activeEntity),
                }), activeEntity.attributes.unit_of_measurement || '', 'primary')
                : htmlFromTpl(cardPanelErrorTpl);
            const secondaryPanelValueMarkup = showSecondary && secondaryEntity
                ? htmlFromTpl(cardPanelValueTpl, this.getProductionValue(secondaryEntity).toLocaleString(this.hass?.locale?.language || undefined, {
                    minimumFractionDigits: this.getDecimalsForEntity(secondaryEntity),
                    maximumFractionDigits: this.getDecimalsForEntity(secondaryEntity),
                }), secondaryEntity.attributes.unit_of_measurement || '', 'secondary')
                : '';
            const panelDisplayName = this.config.show_name === false ? '' : this.getPanelDisplayName(entityId, panel.config);
            const panelNameMarkup = panelDisplayName ? htmlFromTpl('<div class="panel-name">{{0}}</div>', panelDisplayName) : '';
            return htmlFromTpl(cardPanelTpl, panelStyle, (e) => this.onPanelClick(e, entityId), (e) => this.onPanelMouseDown(e, entityId), backgroundColor, this.panelImage, panelValueStyle, panelNameMarkup, [primaryPanelValueMarkup, secondaryPanelValueMarkup]);
        }
        _renderCanvas(size, canvasRotation, bgImage, bgOpacity, wrapperWidth, wrapperHeight, liveInteractionEnabled, panX, panY, combinedScale) {
            const wrapperClass = `canvas-wrapper ${liveInteractionEnabled ? 'interactive' : ''}`;
            const rotationStyle = canvasRotation ? ` rotate(${canvasRotation}deg)` : '';
            const backgroundMarkup = bgImage ? htmlFromTpl(cardBackgroundImageTpl, bgImage, bgOpacity) : '';
            const panelMarkup = Array.from(this.panels.entries()).map(([entityId, panel]) => this._renderPanel(entityId, panel, canvasRotation));
            return htmlFromTpl(cardCanvasTpl, wrapperClass, wrapperWidth, wrapperHeight, this._onViewportWheel, this._onViewportPointerDown, this._onViewportPointerMove, this._onViewportPointerUp, this._onViewportPointerUp, this._resetViewportTransform, size.width, size.height, size.width / 2, size.height / 2, panX, panY, combinedScale, rotationStyle, backgroundMarkup, panelMarkup, this.config.font_size_primary ?? 14, this.config.font_size_secondary ?? 12, this.config.font_size_unit ?? 10);
        }
        render() {
            const size = this.getContainerSize();
            const canvasRotation = this.config.canvas_rotation || 0;
            const rotatedSize = this.getRotatedBounds(size.width, size.height, canvasRotation);
            const bgImage = this.config.background_image || '';
            const bgOpacity = this.config.background_opacity ?? 0.4;
            const hasEnergy = this._hasEnergyEntities();
            const baseScale = this._scale || 1;
            const wrapperWidth = Math.round(rotatedSize.width * baseScale);
            const wrapperHeight = Math.round(rotatedSize.height * baseScale);
            const liveInteractionEnabled = !this.isEditorPreview;
            const viewZoom = liveInteractionEnabled ? this._viewZoom : 1;
            const panX = liveInteractionEnabled ? this._viewPanX : 0;
            const panY = liveInteractionEnabled ? this._viewPanY : 0;
            const combinedScale = baseScale * viewZoom;
            const selectedDateTime = this._getSelectedDateTime();
            const selectedDateTimeLabel = `${selectedDateTime.toLocaleDateString()} ${this._minutesToLabel(this._selectedMinute)}`;
            return htmlFromTpl(cardRenderTpl, this._renderTopControls(hasEnergy), this._renderHistoryMeta(selectedDateTimeLabel), this._renderCanvas(size, canvasRotation, bgImage, bgOpacity, wrapperWidth, wrapperHeight, liveInteractionEnabled, panX, panY, combinedScale));
        }
    }
    SolarPanelGridCard.VIEW_STATE_STORAGE_KEY = 'solar-panel-card-show-energy';
    SolarPanelGridCard.CARD_STYLES = i$1 `${r$2(cardStyles)}`;
    SolarPanelGridCard.styles = SolarPanelGridCard.CARD_STYLES;
    // Register the custom element
    customElements.define('solar-panel-grid-card', SolarPanelGridCard);

    var editorStyles = ":host {\r\n  display: block;\r\n}\r\n\r\n.card-config {\r\n  padding: 16px;\r\n}\r\n\r\nh2 {\r\n  margin: 16px 0 8px 0;\r\n  font-size: 16px;\r\n  font-weight: 500;\r\n}\r\n\r\n.panels-info {\r\n  background: var(--secondary-background-color);\r\n  padding: 12px;\r\n  border-radius: 4px;\r\n  margin-top: 8px;\r\n}\r\n\r\n.panels-info p {\r\n  margin: 8px 0;\r\n  font-size: 14px;\r\n}\r\n\r\n.panels-config {\r\n  background: var(--secondary-background-color);\r\n  padding: 12px;\r\n  border-radius: 4px;\r\n  margin-top: 8px;\r\n}\r\n\r\n.panels-config p {\r\n  margin: 8px 0;\r\n  font-size: 13px;\r\n}\r\n\r\n.panels-form {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n  margin-top: 12px;\r\n}\r\n\r\n.panel-config-item {\r\n  background: var(--primary-background-color);\r\n  border: 1px solid var(--divider-color);\r\n  border-radius: 4px;\r\n  overflow: hidden;\r\n}\r\n\r\n.panel-header {\r\n  padding: 12px;\r\n  cursor: pointer;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  border-left: 3px solid var(--primary-color);\r\n  user-select: none;\r\n  transition: background-color 0.2s;\r\n}\r\n\r\n.panel-header:hover {\r\n  background-color: var(--secondary-background-color);\r\n}\r\n\r\n.panel-header-content {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex: 1;\r\n}\r\n\r\n.panel-toggle-icon {\r\n  font-size: 14px;\r\n  width: 20px;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--primary-color);\r\n}\r\n\r\n.panel-entity-name {\r\n  font-weight: 500;\r\n  color: var(--primary-text-color);\r\n}\r\n\r\n.panel-content {\r\n  padding: 12px;\r\n  border-top: 1px solid var(--divider-color);\r\n  background-color: var(--secondary-background-color);\r\n}\r\n\r\n.config-row {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  margin: 8px 0;\r\n}\r\n\r\n.config-row label {\r\n  min-width: 150px;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n}\r\n\r\n.config-row ha-entity-picker {\r\n  flex: 1;\r\n}\r\n\r\n.config-row ha-textfield {\r\n  flex: 1;\r\n  max-width: 150px;\r\n}\r\n\r\n.slider-row {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  flex: 1;\r\n}\r\n\r\n.rotation-slider {\r\n  flex: 1;\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  height: 6px;\r\n  border-radius: 3px;\r\n  background: var(--disabled-color, #bdbdbd);\r\n  outline: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.rotation-slider::-webkit-slider-thumb {\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  width: 16px;\r\n  height: 16px;\r\n  border-radius: 50%;\r\n  background: var(--primary-color, #03a9f4);\r\n  cursor: pointer;\r\n}\r\n\r\n.rotation-slider::-moz-range-thumb {\r\n  width: 16px;\r\n  height: 16px;\r\n  border-radius: 50%;\r\n  background: var(--primary-color, #03a9f4);\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.slider-value {\r\n  min-width: 40px;\r\n  text-align: right;\r\n  font-size: 12px;\r\n  color: var(--primary-text-color);\r\n}\r\n\r\n.entity-select {\r\n  flex: 1;\r\n  padding: 8px 12px;\r\n  border: 1px solid var(--divider-color);\r\n  border-radius: 4px;\r\n  background-color: var(--primary-background-color);\r\n  color: var(--primary-text-color);\r\n  font-size: 14px;\r\n  font-family: inherit;\r\n  cursor: pointer;\r\n}\r\n\r\n.entity-select:focus {\r\n  outline: none;\r\n  border-color: var(--primary-color);\r\n  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);\r\n}\r\n\r\n.entity-select option {\r\n  background-color: var(--secondary-background-color);\r\n  color: var(--primary-text-color);\r\n}\r\n\r\n.delete-btn {\r\n  margin-top: 8px;\r\n}\r\n\r\nha-button {\r\n  display: block;\r\n  margin: 12px 0;\r\n}\r\n\r\n.yaml-note {\r\n  margin-top: 12px;\r\n  font-size: 12px;\r\n  font-style: italic;\r\n  color: var(--secondary-text-color);\r\n}\r\n\r\n.panels-list {\r\n  margin-top: 12px;\r\n  padding: 8px 0;\r\n}\r\n\r\n.panels-list > p {\r\n  margin: 8px 0;\r\n  font-size: 13px;\r\n}\r\n\r\n.panel-item {\r\n  padding: 8px 8px;\r\n  margin: 4px 0;\r\n  font-size: 12px;\r\n  background: var(--primary-background-color);\r\n  border-left: 2px solid var(--primary-color);\r\n  border-radius: 2px;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.position {\r\n  color: var(--secondary-text-color);\r\n  font-size: 11px;\r\n  margin-left: 8px;\r\n}\r\n\r\n.no-panels {\r\n  font-style: italic;\r\n  color: var(--secondary-text-color);\r\n}\r\n";

    var editorLoadingTpl = "<p>Loading...</p>\r\n";

    var editorRenderTpl = "<div class=\"card-config\">\r\n  <h2>Grid Settings</h2>\r\n  <ha-form\r\n    .hass={{0}}\r\n    .data={{1}}\r\n    .schema={{2}}\r\n    .computeLabel={{3}}\r\n    @value-changed={{4}}\r\n  ></ha-form>\r\n\r\n  <h2>Panel Entities</h2>\r\n  <div class=\"panels-config\">\r\n    <p>Configure sensor entities for each panel:</p>\r\n    {{5}}\r\n  </div>\r\n\r\n  <h2>Add Panel</h2>\r\n  <div class=\"panels-config\">\r\n    <ha-button @click={{6}}>Add Panel</ha-button>\r\n  </div>\r\n\r\n  <h2>Panel Positions</h2>\r\n  <div class=\"panels-info\">\r\n    <p>Drag panels in the card preview - positions update automatically!</p>\r\n    <div class=\"panels-list\">\r\n      {{7}}\r\n    </div>\r\n    <p class=\"yaml-note\">Positions sync automatically as you drag in the preview!</p>\r\n  </div>\r\n</div>\r\n";

    var editorPanelsFormTpl = "<div class=\"panels-form\">\r\n  {{0}}\r\n</div>\r\n";

    var editorNoPanelsTpl = "<p class=\"no-panels\">No panels configured. Edit the YAML to add panels.</p>\r\n";

    var editorPanelItemTpl = "<div class={{0}}>\r\n  <div class=\"panel-header\" @click={{1}}>\r\n    <div class=\"panel-header-content\">\r\n      <span class=\"panel-toggle-icon\">{{2}}</span>\r\n      <span class=\"panel-entity-name\">{{3}}</span>\r\n    </div>\r\n  </div>\r\n  {{4}}\r\n</div>\r\n";

    var editorPanelContentTpl = "<div class=\"panel-content\">\r\n  <div class=\"config-row\">\r\n    <label>Name:</label>\r\n    <ha-textfield\r\n      .value={{0}}\r\n      data-config-value=\"name\"\r\n      data-index={{1}}\r\n      @input={{2}}\r\n    ></ha-textfield>\r\n  </div>\r\n  <div class=\"config-row\">\r\n    <label for={{3}}>Power Entity:</label>\r\n    <select\r\n      id={{3}}\r\n      .value={{4}}\r\n      data-config-value=\"entity\"\r\n      data-index={{1}}\r\n      @change={{5}}\r\n      class=\"entity-select\"\r\n    >\r\n      <option value=\"\">Select a power sensor...</option>\r\n      {{6}}\r\n    </select>\r\n  </div>\r\n  <div class=\"config-row\">\r\n    <label for={{7}}>Energy Entity:</label>\r\n    <select\r\n      id={{7}}\r\n      .value={{8}}\r\n      data-config-value=\"entity_energy\"\r\n      data-index={{1}}\r\n      @change={{5}}\r\n      class=\"entity-select\"\r\n    >\r\n      <option value=\"\">Select an energy sensor...</option>\r\n      {{9}}\r\n    </select>\r\n  </div>\r\n  <div class=\"config-row\">\r\n    <label>Rotation (°):</label>\r\n    <div class=\"slider-row\">\r\n      <input\r\n        type=\"range\"\r\n        min=\"-180\"\r\n        max=\"180\"\r\n        step=\"5\"\r\n        .value={{10}}\r\n        data-config-value=\"rotation\"\r\n        data-index={{1}}\r\n        @input={{2}}\r\n        class=\"rotation-slider\"\r\n      />\r\n      <span class=\"slider-value\">{{11}}°</span>\r\n    </div>\r\n  </div>\r\n  <div class=\"config-row\">\r\n    <label>Max Production (W):</label>\r\n    <ha-textfield\r\n      type=\"number\"\r\n      .value={{12}}\r\n      data-config-value=\"max_production\"\r\n      data-index={{1}}\r\n      @input={{2}}\r\n    ></ha-textfield>\r\n  </div>\r\n  <div class=\"config-row\">\r\n    <label>Max Daily Production (kWh):</label>\r\n    <ha-textfield\r\n      type=\"number\"\r\n      .value={{13}}\r\n      data-config-value=\"max_daily_production\"\r\n      data-index={{1}}\r\n      @input={{2}}\r\n    ></ha-textfield>\r\n  </div>\r\n  <div class=\"config-row\">\r\n    <ha-button @click={{14}} class=\"delete-btn\">\r\n      Delete Panel\r\n    </ha-button>\r\n  </div>\r\n</div>\r\n";

    var editorEntityOptionTpl = "<option value={{0}} ?selected={{1}}>{{2}}</option>\r\n";

    var editorPositionsSummaryTpl = "<p><strong>Current panels ({{0}}):</strong></p>\r\n{{1}}\r\n";

    var editorPositionItemTpl = "<div class=\"panel-item\">\r\n  <span>{{0}}</span>\r\n  <span class=\"position\">{{1}}</span>\r\n</div>\r\n";

    var editorPositionsEmptyTpl = "<p class=\"no-panels\">No panels configured</p>\r\n";

    /**
     * Custom editor component for Solar Panel Grid Card
     * Provides schema-driven UI for configuration and handles position updates from card preview
     */
    class SolarPanelGridCardEditor extends s {
        constructor() {
            super(...arguments);
            this._expandedPanels = new Set();
            this._onPositionsChanged = (e) => {
                // Auto-sync when the card dispatches position change event (preview)
                const positions = e.detail?.positions;
                if (positions) {
                    this._syncPositionsFromData(positions);
                }
            };
            this._computeLabel = (schema) => {
                const labels = {
                    grid_size: 'Grid Size (px)',
                    panel_width: 'Panel Width (px)',
                    panel_height: 'Panel Height (px)',
                    canvas_width: 'Canvas Width (px)',
                    canvas_height: 'Canvas Height (px)',
                    canvas_rotation: 'Canvas Rotation (°)',
                    persist_view_state: 'Remember W / kWh Toggle State',
                    show_secondary: 'Show Secondary Value (W + kWh)',
                    show_name: 'Show Panel Name Badge',
                    font_size_primary: 'Primary Value Font Size (px)',
                    font_size_secondary: 'Secondary Value Font Size (px)',
                    font_size_unit: 'Unit Font Size (px)',
                    power_decimals: 'Power Decimals (W)',
                    energy_decimals: 'Energy Decimals (kWh/Wh)',
                };
                return labels[schema.name] || schema.name;
            };
            this._onGridConfigChanged = (e) => {
                const newConfig = { ...this.config, ...e.detail.value };
                this.config = newConfig;
                // grid config changed
                // Fire config-changed event that Home Assistant listens for
                this.dispatchEvent(new CustomEvent('config-changed', {
                    detail: { config: newConfig },
                    bubbles: true,
                    composed: true,
                }));
            };
            this._onPanelConfigChanged = (e) => {
                const newConfig = { ...this.config, ...e.detail.value };
                this.config = newConfig;
                // panel config changed
                // Fire config-changed event that Home Assistant listens for
                this.dispatchEvent(new CustomEvent('config-changed', {
                    detail: { config: newConfig },
                    bubbles: true,
                    composed: true,
                }));
            };
            this._syncPositionsFromData = (positionsData) => {
                try {
                    // Update config with new positions
                    const updatedPanels = this.config.panels?.map((panel) => {
                        const newPos = positionsData[panel.entity];
                        return {
                            ...panel,
                            x: newPos?.x ?? panel.x,
                            y: newPos?.y ?? panel.y,
                        };
                    }) || [];
                    const newConfig = { ...this.config, panels: updatedPanels };
                    this.config = newConfig;
                    // Fire config-changed event to persist to dashboard
                    this.dispatchEvent(new CustomEvent('config-changed', {
                        detail: { config: newConfig },
                        bubbles: true,
                        composed: true,
                    }));
                }
                catch (err) {
                    console.error('[SolarPanelGridCardEditor] Error syncing positions:', err);
                }
            };
            this._removePanel = (index) => {
                if (!this.config.panels)
                    return;
                const updatedPanels = this.config.panels.filter((_, i) => i !== index);
                const newConfig = { ...this.config, panels: updatedPanels };
                this.config = newConfig;
                this.dispatchEvent(new CustomEvent('config-changed', {
                    detail: { config: newConfig },
                    bubbles: true,
                    composed: true,
                }));
                // panel removed
            };
            this._onPanelEntityChanged = (e) => {
                const panelIndex = parseInt(e.target.getAttribute('data-index') || '0', 10);
                const configValue = e.target.getAttribute('data-config-value') || 'entity';
                const newEntity = e.target.value;
                if (!this.config.panels || panelIndex === undefined)
                    return;
                const updatedPanels = this.config.panels.map((panel, idx) => {
                    if (idx === panelIndex) {
                        return { ...panel, [configValue]: newEntity };
                    }
                    return panel;
                });
                const newConfig = { ...this.config, panels: updatedPanels };
                this.config = newConfig;
                this.dispatchEvent(new CustomEvent('config-changed', {
                    detail: { config: newConfig },
                    bubbles: true,
                    composed: true,
                }));
                // panel entity changed at index
            };
            this._onPanelPropertyChanged = (e) => {
                const panelIndex = parseInt(e.target.getAttribute('data-index') || '0', 10);
                const configValue = e.target.getAttribute('data-config-value');
                const raw = e.target.value;
                let newValue;
                if (configValue === 'name') {
                    newValue = raw;
                }
                else {
                    newValue = raw ? parseFloat(raw) : raw;
                }
                if (!this.config.panels || panelIndex === undefined || !configValue)
                    return;
                const updatedPanels = this.config.panels.map((panel, idx) => {
                    if (idx === panelIndex) {
                        return { ...panel, [configValue]: newValue };
                    }
                    return panel;
                });
                const newConfig = { ...this.config, panels: updatedPanels };
                this.config = newConfig;
                this.dispatchEvent(new CustomEvent('config-changed', {
                    detail: { config: newConfig },
                    bubbles: true,
                    composed: true,
                }));
                // panel property changed
            };
            this._togglePanelExpanded = (index) => {
                if (this._expandedPanels.has(index)) {
                    this._expandedPanels.delete(index);
                }
                else {
                    this._expandedPanels.add(index);
                }
                this.requestUpdate();
            };
            this._getPowerSensorEntities = () => {
                if (!this.hass)
                    return [];
                return Object.keys(this.hass.states)
                    .filter((entityId) => {
                    if (!entityId.startsWith('sensor.'))
                        return false;
                    const entity = this.hass.states[entityId];
                    const deviceClass = entity?.attributes?.device_class;
                    return deviceClass === 'power';
                })
                    .sort();
            };
            this._getEnergySensorEntities = () => {
                if (!this.hass)
                    return [];
                return Object.keys(this.hass.states)
                    .filter((entityId) => {
                    if (!entityId.startsWith('sensor.'))
                        return false;
                    const entity = this.hass.states[entityId];
                    const deviceClass = entity?.attributes?.device_class;
                    return deviceClass === 'energy';
                })
                    .sort();
            };
            this._addPanel = () => {
                const newPanel = {
                    entity: 'sensor.',
                    entity_energy: '',
                    name: '',
                    x: 0,
                    y: 0,
                    rotation: 0,
                    max_production: 400,
                    max_daily_production: 5.5,
                };
                const updatedPanels = [...(this.config.panels || []), newPanel];
                const newConfig = { ...this.config, panels: updatedPanels };
                this.config = newConfig;
                this.dispatchEvent(new CustomEvent('config-changed', {
                    detail: { config: newConfig },
                    bubbles: true,
                    composed: true,
                }));
                // panel added (debug removed)
            };
        }
        static get properties() {
            return {
                hass: { type: Object },
                config: { type: Object },
            };
        }
        setConfig(config) {
            this.config = config || {
                type: 'custom:solar-panel-grid-card',
                panels: [],
                grid_size: 10,
                panel_width: 80,
                panel_height: 144,
                persist_view_state: true,
                show_secondary: false,
                show_name: true,
                font_size_primary: 14,
                font_size_secondary: 12,
                font_size_unit: 10,
                power_decimals: 0,
                energy_decimals: 2,
            };
        }
        connectedCallback() {
            super.connectedCallback();
            // Listen for position update events from the card (preview only)
            window.addEventListener('solar-panel-positions-changed', this._onPositionsChanged);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            window.removeEventListener('solar-panel-positions-changed', this._onPositionsChanged);
        }
        render() {
            if (!this.hass || !this.config) {
                return htmlFromTpl(editorLoadingTpl);
            }
            return htmlFromTpl(editorRenderTpl, this.hass, this.config, this._getGridSchema(), this._computeLabel, this._onGridConfigChanged, this._renderPanelEntitiesSection(), this._addPanel, this._renderPositionsSummary());
        }
        _renderPanelEntitiesSection() {
            if (!this.config.panels || this.config.panels.length === 0) {
                return htmlFromTpl(editorNoPanelsTpl);
            }
            const panelItems = this.config.panels.map((panel, idx) => this._renderPanelConfigItem(panel, idx));
            return htmlFromTpl(editorPanelsFormTpl, panelItems);
        }
        _renderPanelConfigItem(panel, idx) {
            const isExpanded = this._expandedPanels.has(idx);
            const expandedContent = isExpanded ? this._renderPanelConfigContent(panel, idx) : '';
            return htmlFromTpl(editorPanelItemTpl, `panel-config-item ${isExpanded ? 'expanded' : ''}`.trim(), () => this._togglePanelExpanded(idx), isExpanded ? '▼' : '▶', panel.name || panel.entity || 'Unnamed Panel', expandedContent);
        }
        _renderPanelConfigContent(panel, idx) {
            const powerOptions = this._getPowerSensorEntities().map((entityId) => htmlFromTpl(editorEntityOptionTpl, entityId, entityId === panel.entity, entityId));
            const energyOptions = this._getEnergySensorEntities().map((entityId) => htmlFromTpl(editorEntityOptionTpl, entityId, entityId === panel.entity_energy, entityId));
            return htmlFromTpl(editorPanelContentTpl, panel.name || '', String(idx), this._onPanelPropertyChanged, `entity-${idx}`, panel.entity || '', this._onPanelEntityChanged, powerOptions, `entity-energy-${idx}`, panel.entity_energy || '', energyOptions, String(panel.rotation || 0), panel.rotation || 0, panel.max_production || 400, panel.max_daily_production || 5.5, () => this._removePanel(idx));
        }
        _renderPositionsSummary() {
            if (!this.config.panels || this.config.panels.length === 0) {
                return htmlFromTpl(editorPositionsEmptyTpl);
            }
            const positions = this.config.panels.map((panel) => {
                const positionText = ` @ (${panel.x}, ${panel.y})${panel.rotation ? ` ↻${panel.rotation}°` : ''}`;
                return htmlFromTpl(editorPositionItemTpl, panel.name || panel.entity, positionText);
            });
            return htmlFromTpl(editorPositionsSummaryTpl, this.config.panels.length, positions);
        }
        _getGridSchema() {
            return [
                {
                    name: 'grid_size',
                    required: false,
                    selector: {
                        number: {
                            min: 1,
                            max: 50,
                            step: 1,
                            unit_of_measurement: 'px',
                        },
                    },
                },
                {
                    name: 'panel_width',
                    required: false,
                    selector: {
                        number: {
                            min: 50,
                            max: 300,
                            step: 1,
                            unit_of_measurement: 'px',
                        },
                    },
                },
                {
                    name: 'panel_height',
                    required: false,
                    selector: {
                        number: {
                            min: 50,
                            max: 300,
                            step: 1,
                            unit_of_measurement: 'px',
                        },
                    },
                },
                {
                    name: 'canvas_width',
                    required: false,
                    selector: {
                        number: {
                            min: 100,
                            max: 4000,
                            step: 10,
                            unit_of_measurement: 'px',
                        },
                    },
                },
                {
                    name: 'canvas_height',
                    required: false,
                    selector: {
                        number: {
                            min: 100,
                            max: 4000,
                            step: 10,
                            unit_of_measurement: 'px',
                        },
                    },
                },
                {
                    name: 'canvas_rotation',
                    required: false,
                    selector: {
                        number: {
                            min: -180,
                            max: 180,
                            step: 1,
                            unit_of_measurement: '°',
                        },
                    },
                },
                {
                    name: 'persist_view_state',
                    required: false,
                    selector: {
                        boolean: {},
                    },
                },
                {
                    name: 'show_secondary',
                    required: false,
                    selector: {
                        boolean: {},
                    },
                },
                {
                    name: 'show_name',
                    required: false,
                    selector: {
                        boolean: {},
                    },
                },
                {
                    name: 'font_size_primary',
                    required: false,
                    selector: {
                        number: {
                            min: 8,
                            max: 48,
                            step: 1,
                            unit_of_measurement: 'px',
                        },
                    },
                },
                {
                    name: 'font_size_secondary',
                    required: false,
                    selector: {
                        number: {
                            min: 8,
                            max: 48,
                            step: 1,
                            unit_of_measurement: 'px',
                        },
                    },
                },
                {
                    name: 'font_size_unit',
                    required: false,
                    selector: {
                        number: {
                            min: 8,
                            max: 32,
                            step: 1,
                            unit_of_measurement: 'px',
                        },
                    },
                },
                {
                    name: 'power_decimals',
                    required: false,
                    selector: {
                        number: {
                            min: 0,
                            max: 6,
                            step: 1,
                        },
                    },
                },
                {
                    name: 'energy_decimals',
                    required: false,
                    selector: {
                        number: {
                            min: 0,
                            max: 6,
                            step: 1,
                        },
                    },
                },
            ];
        }
        _getPanelSchema() {
            return [];
        }
    }
    SolarPanelGridCardEditor.styles = i$1 `${r$2(editorStyles)}`;
    // Register the custom element
    customElements.define('solar-panel-grid-card-editor', SolarPanelGridCardEditor);

    // Main entry point for the Solar Panel Grid Card
    // Register with Home Assistant's card picker
    window.customCards = window.customCards || [];
    window.customCards.push({
        type: 'solar-panel-grid-card',
        name: 'Solar Panel Grid',
        description: 'Visualize individual solar panel production on a draggable grid layout.',
        preview: true,
        documentationURL: 'https://github.com/mutilator/homeassistant-solar-panel-preview',
    });

    exports.SolarPanelGridCard = SolarPanelGridCard;
    exports.SolarPanelGridCardEditor = SolarPanelGridCardEditor;

    return exports;

})({});
//# sourceMappingURL=homeassistant-solar-panel-preview.js.map
