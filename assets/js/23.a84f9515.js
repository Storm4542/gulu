(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{152:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},158:function(t,e,n){t.exports=n(159)},159:function(t,e,n){n(160),t.exports=n(3).parseInt},160:function(t,e,n){var i=n(10),o=n(161);i(i.G+i.F*(parseInt!=o),{parseInt:o})},161:function(t,e,n){var i=n(5).parseInt,o=n(162).trim,s=n(152),r=/^[-+]?0[xX]/;t.exports=8!==i(s+"08")||22!==i(s+"0x16")?function(t,e){var n=o(String(t),3);return i(n,e>>>0||(r.test(n)?16:10))}:i},162:function(t,e,n){var i=n(10),o=n(23),s=n(14),r=n(152),l="["+r+"]",c=RegExp("^"+l+l+"*"),a=RegExp(l+l+"*$"),h=function(t,e,n){var o={},l=s(function(){return!!r[t]()||"​"!="​"[t]()}),c=o[t]=l?e(u):r[t];n&&(o[n]=c),i(i.P+i.F*l,"String",o)},u=h.trim=function(t,e){return t=String(o(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(a,"")),t};t.exports=h},190:function(t,e,n){},256:function(t,e,n){"use strict";var i=n(190);n.n(i).a},318:function(t,e,n){"use strict";n.r(e);var i=n(158),o=n.n(i),s={name:"g-scroll",data:function(){return{scrollBarVisible:!1,isScrolling:!1,startPosition:void 0,endPosition:void 0,scrollX:0,scrollY:0,contentY:0,parentHeight:"",childHeight:"",barHeight:"",maxHeight:void 0}},mounted:function(){this.listenToDocument(),this.parentHeight=this.$refs.parent.getBoundingClientRect().height,this.childHeight=this.$refs.child.getBoundingClientRect().height,this.calculateContentYMax(),this.updateScrollBar()},computed:{maxScrollHeight:function(){return this.parentHeight-this.barHeight}},methods:{listenToDocument:function(){var t=this;document.addEventListener("mousemove",function(e){return t.onMouseMoveScrollBar(e)}),document.addEventListener("mouseup",function(){return t.onMouseUpScrollBar()})},calculateContentYMax:function(){var t=window.getComputedStyle(this.$refs.parent),e=t.borderTopWidth,n=t.borderBottomWidth,i=t.paddingTop,s=t.paddingBottom;e=o()(e),n=o()(n),i=o()(i),s=o()(s),this.maxHeight=this.childHeight-this.parentHeight+(e+n+i+s)},onWheel:function(t){this.contentY=this.calculateContentYFromDeltaY(t.deltaY),this.updateContentY(function(){return t.preventDefault()}),this.updateScrollBar(this.parentHeight,this.childHeight)},calculateContentYFromDeltaY:function(t){var e=this.contentY;return e-=t>20?60:t<-20?-60:3*t},updateContentY:function(t){this.contentY>0?this.contentY=0:this.contentY<-this.maxHeight?this.contentY=-this.maxHeight:t&&t()},updateScrollBar:function(){this.barHeight=this.parentHeight*this.parentHeight/this.childHeight,this.$refs.bar.style.height=this.barHeight+"px",this.scrollY=-this.parentHeight*this.contentY/this.childHeight,this.$refs.bar.style.transform="translateY(".concat(this.scrollY,"px)")},onMouseEnter:function(){this.scrollBarVisible=!0},onMouseLeave:function(){this.isScrolling=!1},onMouseDownScrollBar:function(t){var e=t.screenX,n=t.screenY;this.startPosition={x:e,y:n},this.isScrolling=!0,console.log("down")},onMouseMoveScrollBar:function(t){if(this.isScrolling){this.endPosition={x:t.screenX,y:t.screenY};var e={x:this.endPosition.x-this.startPosition.x,y:this.endPosition.y-this.startPosition.y};this.calculateScrollY(e),this.contentY=-this.childHeight*this.scrollY/this.parentHeight,this.startPosition=this.endPosition,this.$refs.bar.style.transform="translate(0px , ".concat(this.scrollY,"px)"),console.log("move")}},calculateScrollY:function(t){this.scrollY=this.scrollY+t.y,this.scrollY>=this.maxScrollHeight?this.scrollY=this.maxScrollHeight:this.scrollY<0&&(this.scrollY=0)},onMouseUpScrollBar:function(){this.isScrolling=!1},onSelectScrollBar:function(t){t.preventDefault()}}},r=(n(256),n(0)),l=Object(r.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"parent",staticClass:"gulu-scroll-wrapper",on:{wheel:t.onWheel,mouseenter:t.onMouseEnter,mouseleave:t.onMouseLeave}},[n("div",{ref:"child",staticClass:"gulu-scroll",style:{transform:"translateY("+t.contentY+"px)"}},[t._t("default")],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.scrollBarVisible,expression:"scrollBarVisible"}],staticClass:"gulu-scroll-track"},[n("div",{ref:"bar",staticClass:"gulu-scroll-bar",on:{mousedown:t.onMouseDownScrollBar,selectstart:t.onSelectScrollBar}},[n("div",{staticClass:"gulu-scroll-bar-inner"})])])])},[],!1,null,"37ee99ff",null);l.options.__file="scroll.vue";e.default=l.exports}}]);