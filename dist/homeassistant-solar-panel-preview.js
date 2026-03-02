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
          this.panels = new Map();
          this.draggedPanel = null;
          this.dragOffset = { x: 0, y: 0 };
          this.panelImage = '/local/solar-panel-frame.png?v=1';
          this.scrollPosition = { x: 0, y: 0 };
          this.containerWidth = 1200;
          this.containerHeight = 1200;
          this.gridSize = 10;
          this.panelWidth = 80; // 1:1.8 aspect ratio
          this.panelHeight = 144; // 1:1.8 aspect ratio
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
              let x = e.clientX - rect.left - this.dragOffset.x;
              let y = e.clientY - rect.top - this.dragOffset.y;
              // Clamp to container bounds
              x = Math.max(0, Math.min(x, this.containerWidth - this.panelWidth));
              y = Math.max(0, Math.min(y, this.containerHeight - this.panelHeight));
              // Snap to grid
              x = this.snapToGrid(x);
              y = this.snapToGrid(y);
              const oldX = panel.config.x;
              const oldY = panel.config.y;
              // Update panel position by creating a new config object
              panel.config = { ...panel.config, x, y };
              if (oldX !== x || oldY !== y) {
                  console.log('[SolarPanelGridCard] Panel moved:', this.draggedPanel, { x, y });
              }
              this.requestUpdate();
              // Restore scroll position after update
              this.updateComplete.then(() => {
                  const container = this.shadowRoot?.querySelector('.solar-grid-container');
                  if (container) {
                      container.scrollLeft = this.scrollPosition.x;
                      container.scrollTop = this.scrollPosition.y;
                  }
              });
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
              console.log('[SolarPanelGridCard] onMouseUp - Dispatching config-changed event', {
                  updatedConfig,
                  panelCount: updatedPanels.length,
              });
              // Dispatch config-changed event for Home Assistant to persist
              const event = new CustomEvent('config-changed', {
                  detail: { config: updatedConfig },
                  bubbles: true,
                  composed: true,
              });
              const dispatched = this.dispatchEvent(event);
              console.log('[SolarPanelGridCard] config-changed event dispatched, allowed:', dispatched);
          };
      }
      static get properties() {
          return {
              hass: { type: Object },
              config: { type: Object },
          };
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
              grid_size: 10,
              panel_width: 80,
              panel_height: 144,
              panels: [
                  {
                      entity: 'sensor.solar_panel_1',
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
          this.gridSize = config.grid_size || 10;
          this.panelWidth = config.panel_width || 80;
          this.panelHeight = config.panel_height || 144;
          this.panels.clear();
          config.panels.forEach((panelConfig) => {
              this.panels.set(panelConfig.entity, {
                  config: panelConfig,
                  entity: undefined,
              });
          });
      }
      update(changedProperties) {
          super.update(changedProperties);
          if (changedProperties.has('hass') && this.hass) {
              // Update entity data
              this.panels.forEach((panel, entity) => {
                  panel.entity = this.hass.states[entity];
              });
          }
      }
      getProductionValue(entity) {
          if (!entity)
              return 0;
          const value = parseFloat(entity.state);
          return isNaN(value) ? 0 : value;
      }
      getMaxValue(panelConfig, unit) {
          if (unit === 'kWh' || unit === 'Wh') {
              const maxDaily = panelConfig.max_daily_production || 5.5;
              // If unit is Wh, convert max_daily_production from kWh to Wh
              return unit === 'Wh' ? maxDaily * 1000 : maxDaily;
          }
          return panelConfig.max_production || 400;
      }
      snapToGrid(value) {
          if (this.gridSize <= 0)
              return value;
          return Math.round(value / this.gridSize) * this.gridSize;
      }
      onPanelMouseDown(e, entityId) {
          e.preventDefault();
          e.stopPropagation();
          this.draggedPanel = entityId;
          const panel = this.panels.get(entityId);
          if (!panel)
              return;
          const container = this.shadowRoot?.querySelector('.solar-grid-container');
          if (!container)
              return;
          // Save scroll position before dragging
          this.scrollPosition = {
              x: container.scrollLeft,
              y: container.scrollTop,
          };
          const containerRect = container.getBoundingClientRect();
          // Calculate offset from mouse position to panel's top-left corner
          this.dragOffset = {
              x: e.clientX - (containerRect.left + panel.config.x),
              y: e.clientY - (containerRect.top + panel.config.y),
          };
          console.log('[SolarPanelGridCard] Starting drag for panel:', entityId, {
              x: panel.config.x,
              y: panel.config.y,
              dragOffset: this.dragOffset,
          });
          document.addEventListener('mousemove', this.onMouseMove);
          document.addEventListener('mouseup', this.onMouseUp);
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
          console.log('[SolarPanelGridCard] getCurrentPanelPositions called, returning:', positions);
          return positions;
      }
      connectedCallback() {
          super.connectedCallback();
          // Inject CSS into document to override dashboard width constraints
          this.injectCSSOverrides();
          // Use ResizeObserver to actively enforce the width override
          this.enforceFullWidth();
          // Initialize panels from config
          if (this.config?.panels) {
              this.panels.clear();
              this.config.panels.forEach((panelConfig) => {
                  this.panels.set(panelConfig.entity, {
                      config: panelConfig,
                      entity: this.hass?.states[panelConfig.entity],
                  });
              });
              this.requestUpdate();
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
                              console.log('[SolarPanelGridCard] Enforced hui-card width:', width, '→', viewportWidth);
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
                      console.log('[SolarPanelGridCard] Directly modified hui-card parent styles');
                      break;
                  }
                  parent = parent.parentElement;
              }
              // Also try to modify .content if found
              const contentEl = document.querySelector('.content');
              if (contentEl) {
                  contentEl.style.cssText = 'max-width: none !important; width: 100% !important;';
                  console.log('[SolarPanelGridCard] Modified .content styles');
              }
          }
          catch (e) {
              console.error('[SolarPanelGridCard] Error modifying parent styles:', e);
          }
          console.log('[SolarPanelGridCard] CSS overrides injected');
      }
      render() {
          return x `
      <ha-card>
        <div class="card-content">
          <div class="solar-grid-container">
            ${Array.from(this.panels.entries()).map(([entityId, panel]) => x `
                <div
                  class="solar-panel"
                  style="left: ${panel.config.x}px; top: ${panel.config.y}px; width: ${this.panelWidth}px; height: ${this.panelHeight}px;"
                  @mousedown="${(e) => this.onPanelMouseDown(e, entityId)}"
                >
                  <div
                    class="panel-background"
                    style="background-color: ${this.getProductionColor(this.getProductionValue(panel.entity), this.getMaxValue(panel.config, panel.entity?.attributes.unit_of_measurement || 'W'))}"
                  ></div>
                  <img src="${this.panelImage}" alt="Solar Panel" class="panel-image" />
                  <div class="panel-overlay">
                    <div class="panel-value">
                      ${panel.entity
            ? x `
                            <span class="value">${this.getProductionValue(panel.entity).toFixed(1)}</span>
                            <span class="unit">${panel.entity.attributes.unit_of_measurement || ''}</span>
                          `
            : x `<span class="error">N/A</span>`}
                    </div>
                    <div class="entity-id-suffix">${entityId.slice(-4)}</div>
                  </div>
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `;
      }
  }
  SolarPanelGridCard.styles = i$1 `
    ha-card {
      height: 100%;
      width: 100%;
    }

    .card-content {
      padding: 16px;
      overflow: auto;
      height: 900px;
    }

    .solar-grid-container {
      position: relative;
      width: 1400px;
      height: 1400px;
      background: transparent;
      border: 1px solid var(--divider-color);
      cursor: grab;
      user-select: none;
    }

    .solar-grid-container:active {
      cursor: grabbing;
    }

    .solar-panel {
      position: absolute;
      cursor: grab;
      transition: box-shadow 0.2s;
      border-radius: 0;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      pointer-events: auto;
    }

    .solar-panel:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .panel-background {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;
      transition: background-color 0.3s ease;
    }

    .panel-image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      z-index: 1;
      opacity: 0.9;
    }

    .panel-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }

    .panel-value {
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .value {
      font-size: 14px;
    }

    .unit {
      font-size: 10px;
      opacity: 0.8;
    }

    .entity-id-suffix {
      position: absolute;
      bottom: 4px;
      right: 4px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      font-size: 9px;
      padding: 2px 6px;
      border-radius: 3px;
    }

    .error {
      color: #ff6b6b;
    }
  `;
  // Register the custom element
  customElements.define('solar-panel-grid-card', SolarPanelGridCard);

  /**
   * Custom editor component for Solar Panel Grid Card
   * Provides schema-driven UI for configuration and handles position updates from card preview
   */
  class SolarPanelGridCardEditor extends s {
      constructor() {
          super(...arguments);
          this._expandedPanels = new Set();
          this._onPositionsChanged = (e) => {
              // Auto-sync when the card dispatches position change event
              const positions = e.detail?.positions;
              if (positions) {
                  console.log('[SolarPanelGridCardEditor] Detected position update from card, auto-syncing...', positions);
                  this._syncPositionsFromData(positions);
              }
          };
          this._computeLabel = (schema) => {
              const labels = {
                  grid_size: 'Grid Size (px)',
                  panel_width: 'Panel Width (px)',
                  panel_height: 'Panel Height (px)',
              };
              return labels[schema.name] || schema.name;
          };
          this._onGridConfigChanged = (e) => {
              const newConfig = { ...this.config, ...e.detail.value };
              this.config = newConfig;
              console.log('[SolarPanelGridCardEditor] Grid config changed:', newConfig);
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
              console.log('[SolarPanelGridCardEditor] Panel config changed:', newConfig);
              // Fire config-changed event that Home Assistant listens for
              this.dispatchEvent(new CustomEvent('config-changed', {
                  detail: { config: newConfig },
                  bubbles: true,
                  composed: true,
              }));
          };
          this._syncPositionsFromData = (positionsData) => {
              try {
                  console.log('[SolarPanelGridCardEditor] Syncing positions from data:', positionsData);
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
                  console.log('[SolarPanelGridCardEditor] Positions synced and saved:', newConfig);
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
              console.log('[SolarPanelGridCardEditor] Panel removed:', newConfig);
          };
          this._onPanelEntityChanged = (e) => {
              const panelIndex = parseInt(e.target.getAttribute('data-index') || '0', 10);
              const newEntity = e.target.value;
              if (!this.config.panels || panelIndex === undefined)
                  return;
              const updatedPanels = this.config.panels.map((panel, idx) => {
                  if (idx === panelIndex) {
                      return { ...panel, entity: newEntity };
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
              console.log('[SolarPanelGridCardEditor] Panel entity changed at index', panelIndex, 'to', newEntity);
          };
          this._onPanelPropertyChanged = (e) => {
              const panelIndex = parseInt(e.target.getAttribute('data-index') || '0', 10);
              const configValue = e.target.getAttribute('data-config-value');
              const newValue = e.target.value ? parseFloat(e.target.value) : e.target.value;
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
              console.log('[SolarPanelGridCardEditor] Panel property changed:', configValue, '=', newValue);
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
                  // Only include sensor entities
                  if (!entityId.startsWith('sensor.'))
                      return false;
                  const entity = this.hass.states[entityId];
                  // Check if device_class is 'power' or 'energy'
                  const deviceClass = entity?.attributes?.device_class;
                  return deviceClass === 'power' || deviceClass === 'energy';
              })
                  .sort();
          };
          this._addPanel = () => {
              const newPanel = {
                  entity: 'sensor.',
                  x: 0,
                  y: 0,
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
              console.log('[SolarPanelGridCardEditor] Panel added, total:', updatedPanels.length);
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
          };
      }
      connectedCallback() {
          super.connectedCallback();
          // Listen for position update events from the card
          window.addEventListener('solar-panel-positions-changed', this._onPositionsChanged);
          console.log('[SolarPanelGridCardEditor] Listening for position updates from card');
      }
      disconnectedCallback() {
          super.disconnectedCallback();
          window.removeEventListener('solar-panel-positions-changed', this._onPositionsChanged);
          console.log('[SolarPanelGridCardEditor] Stopped listening for position updates');
      }
      render() {
          if (!this.hass || !this.config) {
              return x `<p>Loading...</p>`;
          }
          return x `
      <div class="card-config">
        <h2>Grid Settings</h2>
        <ha-form
          .hass="${this.hass}"
          .data="${this.config}"
          .schema="${this._getGridSchema()}"
          .computeLabel="${this._computeLabel}"
          @value-changed="${this._onGridConfigChanged}"
        ></ha-form>
        
        <h2>Panel Entities</h2>
        <div class="panels-config">
          <p>Configure sensor entities for each panel:</p>
          ${this.config.panels && this.config.panels.length > 0
            ? x `
                <div class="panels-form">
                  ${this.config.panels.map((panel, idx) => {
                const isExpanded = this._expandedPanels.has(idx);
                return x `
                      <div class="panel-config-item ${isExpanded ? 'expanded' : ''}">
                        <div class="panel-header" @click="${() => this._togglePanelExpanded(idx)}">
                          <div class="panel-header-content">
                            <span class="panel-toggle-icon">${isExpanded ? '▼' : '▶'}</span>
                            <span class="panel-entity-name">${panel.entity || 'Unnamed Panel'}</span>
                          </div>
                        </div>
                        ${isExpanded ? x `
                          <div class="panel-content">
                            <div class="config-row">
                              <label for="entity-${idx}">Entity:</label>
                              <select
                                id="entity-${idx}"
                                .value="${panel.entity || ''}"
                                data-config-value="entity"
                                data-index="${idx}"
                                @change="${this._onPanelEntityChanged}"
                                class="entity-select"
                              >
                                <option value="">Select a sensor...</option>
                                ${this._getPowerSensorEntities().map((entityId) => x `<option value="${entityId}">${entityId}</option>`)}
                              </select>
                            </div>
                            <div class="config-row">
                              <label>Max Production (W):</label>
                              <ha-textfield
                                type="number"
                                .value="${panel.max_production || 400}"
                                data-config-value="max_production"
                                data-index="${idx}"
                                @input="${this._onPanelPropertyChanged}"
                              ></ha-textfield>
                            </div>
                            <div class="config-row">
                              <label>Max Daily Production (kWh):</label>
                              <ha-textfield
                                type="number"
                                .value="${panel.max_daily_production || 5.5}"
                                data-config-value="max_daily_production"
                                data-index="${idx}"
                                @input="${this._onPanelPropertyChanged}"
                              ></ha-textfield>
                            </div>
                            <div class="config-row">
                              <ha-button @click="${() => this._removePanel(idx)}" class="delete-btn">
                                Delete Panel
                              </ha-button>
                            </div>
                          </div>
                        ` : ''}
                      </div>
                    `;
            })}
                </div>
              `
            : x `<p class="no-panels">No panels configured. Edit the YAML to add panels.</p>`}
        </div>

        <h2>Add Panel</h2>
        <div class="panels-config">
          <ha-button @click="${this._addPanel}">Add Panel</ha-button>
        </div>

        <h2>Panel Positions</h2>
        <div class="panels-info">
          <p>Drag panels in the card preview - positions update automatically!</p>
          <div class="panels-list">
            <p><strong>Current panels (${this.config.panels?.length || 0}):</strong></p>
            ${this.config.panels && this.config.panels.length > 0
            ? this.config.panels.map((panel) => x `
                  <div class="panel-item">
                    <span>${panel.entity}</span>
                    <span class="position"> @ (${panel.x}, ${panel.y})</span>
                  </div>
                `)
            : x `<p class="no-panels">No panels configured</p>`}
          </div>
          <p class="yaml-note">Positions sync automatically as you drag in the preview!</p>
        </div>
      </div>
    `;
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
          ];
      }
      _getPanelSchema() {
          return [];
      }
      static get styles() {
          return i$1 `
      :host {
        display: block;
      }
      .card-config {
        padding: 16px;
      }
      h2 {
        margin: 16px 0 8px 0;
        font-size: 16px;
        font-weight: 500;
      }
      .panels-info {
        background: var(--secondary-background-color);
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
      }
      .panels-info p {
        margin: 8px 0;
        font-size: 14px;
      }
      .panels-config {
        background: var(--secondary-background-color);
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
      }
      .panels-config p {
        margin: 8px 0;
        font-size: 13px;
      }
      .panels-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 12px;
      }
      .panel-config-item {
        background: var(--primary-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        overflow: hidden;
      }
      .panel-header {
        padding: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-left: 3px solid var(--primary-color);
        user-select: none;
        transition: background-color 0.2s;
      }
      .panel-header:hover {
        background-color: var(--secondary-background-color);
      }
      .panel-header-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }
      .panel-toggle-icon {
        font-size: 14px;
        width: 20px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
      }
      .panel-entity-name {
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .panel-content {
        padding: 12px;
        border-top: 1px solid var(--divider-color);
        background-color: var(--secondary-background-color);
      }
      .config-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 8px 0;
      }
      .config-row label {
        min-width: 150px;
        font-size: 13px;
        font-weight: 500;
      }
      .config-row ha-entity-picker {
        flex: 1;
      }
      .config-row ha-textfield {
        flex: 1;
        max-width: 150px;
      }
      .entity-select {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background-color: var(--primary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        cursor: pointer;
      }
      .entity-select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
      }
      .entity-select option {
        background-color: var(--secondary-background-color);
        color: var(--primary-text-color);
      }
      .delete-btn {
        margin-top: 8px;
      }
      ha-button {
        display: block;
        margin: 12px 0;
      }
      .yaml-note {
        margin-top: 12px;
        font-size: 12px;
        font-style: italic;
        color: var(--secondary-text-color);
      }
      .panels-list {
        margin-top: 12px;
        padding: 8px 0;
      }
      .panels-list > p {
        margin: 8px 0;
        font-size: 13px;
      }
      .panel-item {
        padding: 8px 8px;
        margin: 4px 0;
        font-size: 12px;
        background: var(--primary-background-color);
        border-left: 2px solid var(--primary-color);
        border-radius: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .position {
        color: var(--secondary-text-color);
        font-size: 11px;
        margin-left: 8px;
      }
      .no-panels {
        font-style: italic;
        color: var(--secondary-text-color);
      }
    `;
      }
  }
  // Register the custom element
  customElements.define('solar-panel-grid-card-editor', SolarPanelGridCardEditor);

  exports.SolarPanelGridCard = SolarPanelGridCard;
  exports.SolarPanelGridCardEditor = SolarPanelGridCardEditor;

  return exports;

})({});
//# sourceMappingURL=homeassistant-solar-panel-preview.map
