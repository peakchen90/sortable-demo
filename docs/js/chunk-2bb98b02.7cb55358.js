(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2bb98b02"],{"159b":function(e,t,n){var r=n("da84"),a=n("fdbc"),i=n("17c2"),o=n("9112");for(var s in a){var c=r[s],l=c&&c.prototype;if(l&&l.forEach!==i)try{o(l,"forEach",i)}catch(u){l.forEach=i}}},"17c2":function(e,t,n){"use strict";var r=n("b727").forEach,a=n("b301");e.exports=a("forEach")?function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}:[].forEach},"2e36":function(e,t,n){e.exports=n.p+"img/25.c8daf8fb.jpg"},"36d0":function(e,t,n){e.exports=n.p+"img/30.1fa77de2.jpg"},4160:function(e,t,n){"use strict";var r=n("23e7"),a=n("17c2");r({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},4698:function(e,t,n){"use strict";var r=n("f998"),a=n.n(r);a.a},"4e6b":function(e,t,n){e.exports=n.p+"img/17.d2280c39.jpg"},"4f4b":function(e,t,n){e.exports=n.p+"img/28.ccfbfc88.jpg"},"51e9":function(e,t,n){e.exports=n.p+"img/24.406bc00e.jpg"},"58c1":function(e,t,n){e.exports=n.p+"img/16.de51d3d9.jpg"},"5cb9":function(e,t,n){e.exports=n.p+"img/27.ca6ec70e.jpg"},"5ee2":function(e,t,n){e.exports=n.p+"img/29.d23a3ba2.jpg"},"67ce":function(e,t,n){e.exports=n.p+"img/22.7727d411.jpg"},9086:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"demo1"},[n("div",{staticClass:"left-group"},[n("draggable",{attrs:{"custom-class":"left-content",onStart:e.onStart,beforeDragInto:e.beforeDragInto,onDragInto:e.onDragInto,group:"def"},model:{value:e.left,callback:function(t){e.left=t},expression:"left"}},[n("h2",{attrs:{slot:"header"},slot:"header"},[e._v("LEFT")]),n("draggable-item",{scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{key:t.name,staticClass:"dir-item"},[e._v(" "+e._s(t.name)+" "),t.children.length>0?n("span",{staticClass:"dir-num"},[e._v("("+e._s(t.children.length)+")")]):e._e()])]}}])})],1),n("div",{staticClass:"draggable-data"},[n("h3",[e._v("Data:")]),n("pre",[e._v(e._s(e._f("stringify")(e.left)))])])],1),n("div",{staticClass:"right-group"},[n("draggable",{attrs:{onDragInto:e.onDragInto,beforeDragInto:e.beforeDragInto,"custom-class":"right-content",group:"def"},model:{value:e.right,callback:function(t){e.right=t},expression:"right"}},[n("h2",{attrs:{slot:"header"},slot:"header"},[e._v("RIGHT")]),n("draggable-item",{scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{key:t.name,staticClass:"img-item"},[n("span",{staticClass:"img-name"},[e._v(e._s(t.name))]),n("img",{attrs:{src:t.url,alt:t.name}})])]}}])})],1),n("div",{staticClass:"draggable-data"},[n("h3",[e._v("Data:")]),n("pre",[e._v(e._s(e._f("stringify")(e.right)))])])],1)])},a=[],i=(n("4160"),n("d81d"),n("26e9"),n("a434"),n("b0c0"),n("159b"),n("284c")),o={components:{},data:function(){return{left:[{isDir:!0,name:"目录1",children:[]},{isDir:!0,name:"目录2",children:[]},{isDir:!0,name:"目录3",children:[]},{isDir:!0,name:"目录4",children:[]},{isDir:!0,name:"目录5",children:[]}],right:[{name:"图片16",url:n("58c1")},{name:"图片17",url:n("4e6b")},{name:"图片18",url:n("f992")},{name:"图片19",url:n("bdd1")},{name:"图片20",url:n("a823")},{name:"图片21",url:n("d878")},{name:"图片22",url:n("67ce")},{name:"图片23",url:n("d423")},{name:"图片24",url:n("51e9")},{name:"图片25",url:n("2e36")},{name:"图片26",url:n("d1e4")},{name:"图片27",url:n("5cb9")},{name:"图片28",url:n("4f4b")},{name:"图片29",url:n("5ee2")},{name:"图片30",url:n("36d0")}]}},methods:{onStart:function(){},onEnd:function(){},onDragInto:function(e){var t,n=this,r=e.data,a=r.dragged,o=r.related,s=r.selected,c=r.selectedItems,l=r.selectedIndexes;!a.isDir&&o.isDir&&((t=o.children).push.apply(t,Object(i["a"])(s)),c.forEach((function(e){return e.parentNode.removeChild(e)})),Object(i["a"])(l).reverse().forEach((function(e){return n.right.splice(e,1)})));return!1},beforeDragInto:function(e){var t=e.data,n=t.dragged,r=t.related;return!n.isDir&&r.isDir}},mounted:function(){},beforeDestroy:function(){},filters:{stringify:function(e){var t=e.map((function(e){return e.children?{name:e.name,children:e.children.map((function(e){return e.name}))}:e.name}));return JSON.stringify(t,null,2)}}},s=o,c=(n("4698"),n("2877")),l=Object(c["a"])(s,r,a,!1,null,null,null);t["default"]=l.exports},a823:function(e,t,n){e.exports=n.p+"img/20.c76fd771.jpg"},bdd1:function(e,t,n){e.exports=n.p+"img/19.8ccc88ea.jpg"},d1e4:function(e,t,n){e.exports=n.p+"img/26.219c32d7.jpg"},d423:function(e,t,n){e.exports=n.p+"img/23.4721a1b4.jpg"},d878:function(e,t,n){e.exports=n.p+"img/21.28f93a09.jpg"},f992:function(e,t,n){e.exports=n.p+"img/18.e949505f.jpg"},f998:function(e,t,n){},fdbc:function(e,t){e.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-2bb98b02.7cb55358.js.map