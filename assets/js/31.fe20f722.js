(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{156:function(e,t,n){e.exports=n(164)},164:function(e,t,n){var s=n(3),i=s.JSON||(s.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}},200:function(e,t,n){},263:function(e,t,n){"use strict";var s=n(200);n.n(s).a},309:function(e,t,n){"use strict";n.r(t);var s=n(156),i=n.n(s),u=n(2),a={name:"g-collapse",props:{single:{type:Boolean,default:!1},selected:{type:Array}},data:function(){return{eventBus:new u.a}},provide:function(){return{eventBus:this.eventBus}},mounted:function(){var e=this;this.eventBus.$emit("update:selected",this.selected),this.eventBus.$on("update:addSelected",function(t){var n=JSON.parse(i()(e.selected));e.single?n=[t]:n.push(t),e.eventBus.$emit("update:selected",n),e.$emit("update:selected",n)}),this.eventBus.$on("update:removeSelected",function(t){var n=JSON.parse(i()(e.selected)),s=n.indexOf(t);n.splice(s,1),e.eventBus.$emit("update:selected",n),e.$emit("update:selected",n)})}},c=(n(263),n(0)),l=Object(c.a)(a,function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"collapse"},[this._t("default")],2)},[],!1,null,"42ad8564",null);l.options.__file="collapse.vue";t.default=l.exports}}]);