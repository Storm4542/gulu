(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{316:function(e,t,a){"use strict";a.r(t);var i=a(289),s=a(11),n={name:"uploader-demos",components:{GUploader:i.default,GButton:s.default},data:function(){return{fileList:[]}},methods:{addFile:function(e){this.fileList.push(e)},parseResponse:function(e){var t=JSON.parse(e);return"https://image-server-gulu.herokuapp.com/upload/".concat(t.key)}}},o=a(0),l=Object(o.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{margin:"20px"}},[a("div",[e._v("title")]),e._v(" "),a("g-uploader",{attrs:{action:"https://image-server-gulu.herokuapp.com/upload",name:"file",method:"POST",parseResponse:e.parseResponse,"file-list":e.fileList},on:{addFile:e.addFile,"update:fileList":function(t){e.fileList=t}}})],1)},[],!1,null,null,null);l.options.__file="uploader-demos.vue";t.default=l.exports}}]);