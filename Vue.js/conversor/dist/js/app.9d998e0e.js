(function(e){function t(t){for(var o,a,r=t[0],c=t[1],l=t[2],d=0,m=[];d<r.length;d++)a=r[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&m.push(i[a][0]),i[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);u&&u(t);while(m.length)m.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],o=!0,r=1;r<n.length;r++){var c=n[r];0!==i[c]&&(o=!1)}o&&(s.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},i={app:0},s=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],c=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("h1",[e._v("Conversor de Moedas")]),n("Coin",{attrs:{coinsXML:e.coinsXML}})],1)},s=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"elements"},[n("h4",[e._v(" 1 "+e._s(e.nameBy)+" equivale a ")]),n("h3",[e._v(" "+e._s(e.priceHighBy)+" "+e._s(e.nameTo)+" ")]),n("div",{staticClass:"divConvert"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.numberBy,expression:"numberBy"}],attrs:{type:"text",maxlength:"13"},domProps:{value:e.numberBy},on:{keyup:function(t){return e.numberByFunction(t)},input:function(t){t.target.composing||(e.numberBy=t.target.value)}}}),n("select",{attrs:{name:"select",id:"selectBy"},on:{change:function(t){return e.updateCoinBy()}}},e._l(e.coinsXML,(function(t){return n("option",{key:t.sigla,attrs:{id:t.sigla},domProps:{value:t.nome}},[e._v(" "+e._s(t.nome)+" ")])})),0)]),n("div",{staticClass:"divConvert"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.numberTo,expression:"numberTo"}],attrs:{type:"text",maxlength:"14"},domProps:{value:e.numberTo},on:{keyup:function(t){return e.numberToFunction(t)},input:function(t){t.target.composing||(e.numberTo=t.target.value)}}}),n("select",{attrs:{name:"select",id:"selectTo"},on:{change:function(t){return e.updateCoinTo()}}},e._l(e.coinsXML,(function(t){return n("option",{key:t.sigla,attrs:{id:t.sigla},domProps:{value:t.nome}},[e._v(" "+e._s(t.nome)+" ")])})),0)]),n("button",{on:{click:function(t){return e.inverseCoins()}}},[n("span",[e._v("Inverter Moedas ")]),n("i",{staticClass:"fas fa-sync-alt"})])])},r=[],c=(n("99af"),n("b680"),n("ac1f"),n("466d"),n("5319"),n("1276"),n("fb6a"),n("bc3a")),l=n.n(c),u={data:function(){return{numberBy:1,siglaBy:"BRL",nameBy:"Real Brasileiro",priceHighBy:0,numberTo:1,nameTo:"Dólar Americano",siglaTo:"USD",priceHighTo:0}},props:{coinsXML:Array},methods:{updateCoinBy:function(){var e=this,t=document.getElementById("selectBy");this.nameBy=t.options[t.selectedIndex].value,this.siglaBy=t.options[t.selectedIndex].id;var n=document.getElementById("selectTo");if(t.options[t.selectedIndex].id==n.options[n.selectedIndex].id)alert("Ocorreu um erro, opções inválidas");else{for(var o=0;o<n.options.length;o++)n.options[o].style.display="block";t.options[n.selectedIndex].style.display="none",n.options[t.selectedIndex].style.display="none"}l.a.get("https://economia.awesomeapi.com.br/json/".concat(this.siglaBy,"-").concat(this.siglaTo)).then((function(t){l.a.get("https://economia.awesomeapi.com.br/json/".concat(e.siglaTo,"-").concat(e.siglaBy)).then((function(n){e.priceHighBy=(1*t.data[0].high).toFixed(2),e.numberTo=(e.priceHighBy*e.numberBy).toFixed(2),e.priceHighTo=(1*n.data[0].high).toFixed(2)}))})).catch((function(){alert("As moedas selecionadas não possuem conversão até o exato momento (".concat(e.siglaBy," - ").concat(e.siglaTo,"), a página será carregada")),document.location.reload(!0)}))},updateCoinTo:function(){var e=this,t=document.getElementById("selectTo");this.nameTo=t.options[t.selectedIndex].value,this.siglaTo=t.options[t.selectedIndex].id;var n=document.getElementById("selectBy");if(n.options[n.selectedIndex].id==t.options[t.selectedIndex].id)alert("Ocorreu um erro, opções inválidas");else{for(var o=0;o<n.options.length;o++)n.options[o].style.display="block";n.options[t.selectedIndex].style.display="none",t.options[n.selectedIndex].style.display="none"}l.a.get("https://economia.awesomeapi.com.br/json/".concat(this.siglaBy,"-").concat(this.siglaTo)).then((function(t){l.a.get("https://economia.awesomeapi.com.br/json/".concat(e.siglaTo,"-").concat(e.siglaBy)).then((function(n){e.priceHighBy=(1*t.data[0].high).toFixed(2),e.numberTo=(e.priceHighBy*e.numberBy).toFixed(2),e.priceHighTo=(1*n.data[0].high).toFixed(2)}))})).catch((function(){alert("As moedas selecionadas não possuem conversão até o exato momento (".concat(e.siglaTo," - ").concat(e.siglaBy,"), a página será carregada")),document.location.reload(!0)}))},numberByFunction:function(e){if(e.key.match(/\d+/g))this.numberTo=(this.priceHighBy*this.numberBy).toFixed(2),"NaN"==this.numberTo&&console.log("valores inválidos");else if("Backspace"==e.key||"Delete"==e.key)0==this.numberBy.length?this.numberBy=1:this.numberTo=(this.priceHighBy*this.numberBy).toFixed(2);else if(","==e.key||"."==e.key){if(this.numberBy=this.numberBy.replace(",","."),this.numberBy.split(".").length-1>1){var t=this.numberBy.lastIndexOf(".");this.numberBy=this.numberBy.slice(0,t)}}else this.numberBy=this.numberBy.replace(/[^0-9.]/g,"")},numberToFunction:function(e){if(e.key.match(/\d+/g))this.numberBy=(this.priceHighTo*this.numberTo).toFixed(2);else if("Backspace"==e.key||"Delete"==e.key)this.numberTo.length<=0?this.numberTo=0:this.numberBy=(this.priceHighTo*this.numberTo).toFixed(2);else if(","==e.key||"."==e.key){if(this.numberTo=this.numberTo.replace(",","."),this.numberTo.split(".").length-1>1){var t=this.numberTo.lastIndexOf(".");this.numberTo=this.numberTo.slice(0,t)}}else this.numberTo=this.numberTo.replace(/[^0-9.]/g,"")},inverseCoins:function(){var e=this.numberBy,t=this.siglaBy,n=this.nameBy,o=this.priceHighBy;this.nameBy=this.nameTo,this.siglaBy=this.siglaTo,this.priceHighBy=this.priceHighTo,this.numberBy=this.numberTo,this.nameTo=n,this.siglaTo=t,this.priceHighTo=o,this.numberTo=e;for(var i=document.getElementById("selectBy").options,s=0;s<i.length;s++)i[s].id==this.siglaBy?i[s].setAttribute("selected","selected"):i[s].removeAttribute("selected");for(var a=document.getElementById("selectTo").options,r=0;r<a.length;r++)a[r].id==this.siglaTo?a[r].setAttribute("selected","selected"):a[r].removeAttribute("selected")}},created:function(){var e=this;l.a.get("https://economia.awesomeapi.com.br/json/".concat(this.siglaBy,"-").concat(this.siglaTo)).then((function(t){l.a.get("https://economia.awesomeapi.com.br/json/".concat(e.siglaTo,"-").concat(e.siglaBy)).then((function(n){document.getElementById("selectTo").options.USD.setAttribute("selected","selected"),e.priceHighBy=(1*t.data[0].high).toFixed(2),e.numberBy=1..toFixed(0),e.numberTo=(e.priceHighBy*e.numberBy).toFixed(2),e.priceHighTo=(1*n.data[0].high).toFixed(2);var o=document.getElementById("selectBy"),i=document.getElementById("selectTo");o.options[o.selectedIndex].id==i.options[i.selectedIndex].id?alert("Ocorreu um erro, opções inválidas"):(o.options[i.selectedIndex].style.display="none",i.options[o.selectedIndex].style.display="none")}))}))}},d=u,m=(n("5d05"),n("2877")),p=Object(m["a"])(d,a,r,!1,null,"4e1b8fd6",null),h=p.exports,y={name:"App",data:function(){return{palavra:"",coinsXML:[{sigla:"BRL",nome:"Real Brasileiro"},{sigla:"USD",nome:"Dólar Americano"},{sigla:"EUR",nome:"Euro"},{sigla:"AUD",nome:"Dólar Australiano"},{sigla:"CAD",nome:"Dólar Canadense"},{sigla:"CHF",nome:"Franco Suíço"},{sigla:"JPY",nome:"Iene Japonês"},{sigla:"GBP",nome:"Libra Esterlina"}]}},components:{Coin:h},created:function(){var e=this;l.a.get("https://economia.awesomeapi.com.br/xml/available/uniq").then((function(t){e.palavra=t.data})).catch((function(e){console.log(e)}))}},g=y,f=(n("034f"),Object(m["a"])(g,i,s,!1,null,null,null)),b=f.exports,B=n("ecee"),v=n("c074"),T=n("ad3d");n("15f5"),n("7051");B["c"].add(v["a"]),o["a"].config.productionTip=!1,o["a"].component("font-awesome-icon",T["a"]),new o["a"]({render:function(e){return e(b)}}).$mount("#app")},"5d05":function(e,t,n){"use strict";n("f2b6")},"85ec":function(e,t,n){},f2b6:function(e,t,n){}});
//# sourceMappingURL=app.9d998e0e.js.map