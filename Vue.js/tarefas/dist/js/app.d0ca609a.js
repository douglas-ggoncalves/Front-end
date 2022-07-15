(function(){"use strict";var e={709:function(e,t,s){var n=s(144),i=function(){var e=this,t=e._self._c;return t("v-app",[t("v-container",[t("v-row",{staticClass:"d-flex justify-center py-5"},[t("v-col",{staticClass:"pl-0",attrs:{cols:10,md:7}},[t("h3",[e._v("Lista de Tarefas")]),t("v-alert",{directives:[{name:"show",rawName:"v-show",value:e.error,expression:"error"}],attrs:{type:"error"}},[e._v("O campo logo abaixo não pode ser vazio.")]),t("v-text-field",{attrs:{label:"Descrição da Tarefa"},on:{keydown:function(t){e.error=!1},keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.addTask()}},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}}),t("v-btn",{attrs:{depressed:"",color:"info"},on:{click:function(t){return e.addTask(t)}}},[e._v("Adicionar")])],1),e._l(e.tasks,(function(s){return t("v-col",{key:s.id,staticClass:"itens",attrs:{cols:10,md:7}},[t("Tasks",{attrs:{task:s},on:{deleteThisTask:function(t){return e.destroyTask(t)},updateThisTask:function(t){return e.updateTask()},cancelUp:function(t){return e.cancelUpdate()}}})],1)}))],2)],1)],1)},r=[],o=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main",attrs:{id:"main"}},[e.editOn?t("span",{class:{checked:e.task.checked}},[e._v(e._s(e.task.descricao))]):t("v-text-field",{on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.edit()}},model:{value:e.task.descricao,callback:function(t){e.$set(e.task,"descricao",t)},expression:"task.descricao"}}),t("v-tooltip",{directives:[{name:"show",rawName:"v-show",value:e.editOn,expression:"editOn"}],attrs:{color:"warning",bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:n}){return[t("v-icon",e._g(e._b({directives:[{name:"show",rawName:"v-show",value:e.editOn,expression:"editOn"}],staticStyle:{cursor:"pointer"},attrs:{color:"warning",dark:""},on:{click:function(t){return e.edit()}}},"v-icon",n,!1),s),[e._v(" mdi-pencil ")])]}}])},[t("span",[e._v("Editar")])]),t("v-tooltip",{directives:[{name:"show",rawName:"v-show",value:e.editOn,expression:"editOn"}],attrs:{color:"red",bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:n}){return[t("v-icon",e._g(e._b({directives:[{name:"show",rawName:"v-show",value:e.editOn,expression:"editOn"}],staticStyle:{cursor:"pointer"},attrs:{color:"error",dark:""},on:{click:function(t){return e.destroy()}}},"v-icon",n,!1),s),[e._v(" mdi-delete ")])]}}])},[t("span",[e._v("Excluir")])]),t("v-btn",{directives:[{name:"show",rawName:"v-show",value:0==e.editOn,expression:"editOn == false"}],attrs:{depressed:"",color:"info"},on:{click:function(t){return e.edit()}}},[e._v("Salvar")]),t("v-btn",{directives:[{name:"show",rawName:"v-show",value:0==e.editOn,expression:"editOn == false"}],staticClass:"ml-1",attrs:{depressed:"",color:"red",dark:""},on:{click:function(t){return e.cancel()}}},[e._v("Cancelar")]),t("v-tooltip",{directives:[{name:"show",rawName:"v-show",value:e.editOn,expression:"editOn"}],attrs:{color:"success",bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:n}){return[t("v-icon",e._g(e._b({directives:[{name:"show",rawName:"v-show",value:e.editOn,expression:"editOn"}],staticStyle:{cursor:"pointer"},attrs:{color:"success",dark:""},on:{click:function(t){return e.check()}}},"v-icon",n,!1),s),[e._v(" mdi-check ")])]}}])},[t("span",[e._v("Concluir")])])],1)},a=[],c={data(){return{editOn:!0}},props:{task:Object},methods:{edit:function(){this.editOn?this.editOn=!1:(this.editOn=!0,this.$emit("updateThisTask"))},destroy:function(){this.$emit("deleteThisTask",{idTask:this.task.id})},check:function(){this.task.checked?(this.task.checked=!1,this.$emit("updateThisTask")):(this.task.checked=!0,this.$emit("updateThisTask"))},cancel:function(){this.$emit("cancelUp"),this.editOn=!0}}},d=c,u=s(1001),l=s(3453),f=s.n(l),v=s(9458),k=s(5926),h=s(3975),p=s(1350),m=(0,u.Z)(d,o,a,!1,null,"15d4ef31",null),w=m.exports;f()(m,{VBtn:v.Z,VIcon:k.Z,VTextField:h.Z,VTooltip:p.Z});var O={name:"App",data(){return{message:"",error:!1,tasks:[]}},components:{Tasks:w},methods:{addTask:function(){""!=this.message.trim()?window&&(null!=this.tasks?this.tasks.length>0?this.tasks.push({id:Date.now(),descricao:this.message,checked:!1}):this.tasks[0]={id:Date.now(),descricao:this.message,checked:!1}:this.tasks=[{id:Date.now(),descricao:this.message,checked:!1}],localStorage.setItem("tasks",JSON.stringify(this.tasks)),this.message=""):(this.error=!0,this.message="")},destroyTask(e){if(window){var t=e.idTask,s=this.tasks.filter((e=>e.id!=t));this.tasks=s,localStorage.setItem("tasks",JSON.stringify(this.tasks))}},updateTask(){window&&localStorage.setItem("tasks",JSON.stringify(this.tasks))},cancelUpdate(){window&&(this.tasks=JSON.parse(localStorage.getItem("tasks")))}},created(){window&&(this.tasks=JSON.parse(localStorage.getItem("tasks")))}},y=O,g=s(6901),b=s(7400),T=s(8851),_=s(9945),x=s(5805),S=(0,u.Z)(y,i,r,!1,null,"390e28be",null),Z=S.exports;f()(S,{VAlert:g.Z,VApp:b.Z,VBtn:v.Z,VCol:T.Z,VContainer:_.Z,VRow:x.Z,VTextField:h.Z});s(682);var N=s(7674);n.ZP.use(N.Z);var C=new N.Z({});n.ZP.config.productionTip=!1,new n.ZP({vuetify:C,render:e=>e(Z)}).$mount("#app")}},t={};function s(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}s.m=e,function(){var e=[];s.O=function(t,n,i,r){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],i=e[u][1],r=e[u][2];for(var a=!0,c=0;c<n.length;c++)(!1&r||o>=r)&&Object.keys(s.O).every((function(e){return s.O[e](n[c])}))?n.splice(c--,1):(a=!1,r<o&&(o=r));if(a){e.splice(u--,1);var d=i();void 0!==d&&(t=d)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,i,r]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,r,o=n[0],a=n[1],c=n[2],d=0;if(o.some((function(t){return 0!==e[t]}))){for(i in a)s.o(a,i)&&(s.m[i]=a[i]);if(c)var u=c(s)}for(t&&t(n);d<o.length;d++)r=o[d],s.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return s.O(u)},n=self["webpackChunktarefas"]=self["webpackChunktarefas"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(709)}));n=s.O(n)})();
//# sourceMappingURL=app.d0ca609a.js.map