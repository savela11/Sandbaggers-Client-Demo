(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d9bfd84"],{"464e":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"profileView"},[r("form",{staticClass:"form form--profile"},[r("div",{staticClass:"form__field"},[r("label",{attrs:{for:"fName"}},[e._v("First name")]),r("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.profileForm.firstName,expression:"profileForm.firstName",modifiers:{trim:!0}}],attrs:{type:"text",id:"fName"},domProps:{value:e.profileForm.firstName},on:{input:function(t){t.target.composing||e.$set(e.profileForm,"firstName",t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),r("div",{staticClass:"form__field"},[r("label",{attrs:{for:"lName"}},[e._v("Last name")]),r("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.profileForm.lastName,expression:"profileForm.lastName",modifiers:{trim:!0}}],attrs:{type:"text",id:"lName"},domProps:{value:e.profileForm.lastName},on:{input:function(t){t.target.composing||e.$set(e.profileForm,"lastName",t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),r("div",{staticClass:"form__field"},[r("label",{attrs:{for:"email"}},[e._v("Email")]),r("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.profileForm.email,expression:"profileForm.email",modifiers:{trim:!0}}],attrs:{type:"email",id:"email"},domProps:{value:e.profileForm.email},on:{input:function(t){t.target.composing||e.$set(e.profileForm,"email",t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),r("div",{staticClass:"btnContainer"},[r("button",{staticClass:"btn btn--xs btn--blue",attrs:{id:"updateBtn"},on:{click:function(t){return t.preventDefault(),t.stopPropagation(),e.updateCurrentUserProfile(t)}}},[e._v("Update")])])])])},o=[],a=r("9ab4"),s=r("60a3"),l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.profileForm={id:"",firstName:"",lastName:"",email:""},t}return Object(a["c"])(t,e),t.prototype.mounted=function(){this.setCurrentUser()},t.prototype.setCurrentUser=function(){this.profileForm.id=this.cUser.id,this.profileForm.firstName=this.cUser.profile.firstName,this.profileForm.lastName=this.cUser.profile.lastName,this.profileForm.email=this.cUser.email},t.prototype.updateCurrentUserProfile=function(){var e=this.cUser;return e.profile.firstName=this.profileForm.firstName,e.profile.lastName=this.profileForm.lastName,e.email=this.profileForm.email,e},Object(a["b"])([Object(s["c"])()],t.prototype,"cUser",void 0),Object(a["b"])([Object(s["b"])("updateCurrentUserProfile")],t.prototype,"updateCurrentUserProfile",null),t=Object(a["b"])([Object(s["a"])({name:"ProfileView"})],t),t}(s["d"]),m=l,n=m,f=(r("5e8f"),r("2877")),p=Object(f["a"])(n,i,o,!1,null,"5f949f84",null);t["default"]=p.exports},4747:function(e,t,r){},"5e8f":function(e,t,r){"use strict";var i=r("4747"),o=r.n(i);o.a}}]);
//# sourceMappingURL=chunk-1d9bfd84.662adae8.js.map