(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-idea-EditIdea-vue"],{"5b19":function(t,e,r){},"86bc":function(t,e,r){"use strict";r("d3b7");var n=r("9ab4"),a=r("bc3a"),s=r.n(a),i=r("88b4"),o=r.n(i),u=r("0613"),c="https://sandbaggerapi.azurewebsites.net/api",d=new o.a({isCompression:!1}),l=s.a.create({baseURL:c});l.interceptors.request.use((function(t){t.withCredentials=!0,s.a.defaults.headers.common["Authorization"]="",delete s.a.defaults.headers.common["Authorization"];var e=JSON.parse(d.get("User"));if(null!=e.authStore.currentUser){var r=e.authStore.currentUser.token;r&&(t.headers.common.Authorization="Bearer "+r)}return t}),(function(t){return console.log("error",t),Promise.reject(t)})),l.interceptors.response.use((function(t){return t}),(function(t){return Object(n["a"])(void 0,void 0,void 0,(function(){return Object(n["d"])(this,(function(e){switch(e.label){case 0:return t&&t.response?401!==t.response.status&&"Unauthorized"!==t.response.statusText&&500!==t.response.status?[3,2]:[4,u["a"].dispatch("authStore/Logout")]:[3,2];case 1:e.sent(),e.label=2;case 2:return t&&t.message?"Network Error"!==t.message?[3,4]:[4,u["a"].dispatch("authStore/Logout")]:[3,4];case 3:e.sent(),console.log("Error!",t.message),e.label=4;case 4:return[2,Promise.reject(t.response)]}}))}))})),e["a"]=l},"8d2e":function(t,e,r){"use strict";r("d3b7");var n=r("9ab4"),a=r("86bc"),s="/ideas",i=function(){function t(){}return t.AllIdeas=function(){return Object(n["a"])(this,void 0,Promise,(function(){return Object(n["d"])(this,(function(t){switch(t.label){case 0:return[4,a["a"].get(s+"/AllIdeas")];case 1:return[2,t.sent()]}}))}))},t.AddIdea=function(t){return Object(n["a"])(this,void 0,Promise,(function(){return Object(n["d"])(this,(function(e){switch(e.label){case 0:return[4,a["a"].post(s+"/AddIdea",t)];case 1:return[2,e.sent()]}}))}))},t.UpdateIdea=function(t){return Object(n["a"])(this,void 0,Promise,(function(){return Object(n["d"])(this,(function(e){switch(e.label){case 0:return[4,a["a"].put(s+"/UpdateIdea",t)];case 1:return[2,e.sent()]}}))}))},t.Idea=function(t){return Object(n["a"])(this,void 0,Promise,(function(){return Object(n["d"])(this,(function(e){switch(e.label){case 0:return[4,a["a"].post(s+"/Idea",t)];case 1:return[2,e.sent()]}}))}))},t}();e["a"]=i},b0f5:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.loading?r("Loading"):r("div",[r("button",{staticClass:"btn btn--border-darkGreen btn--xs btn--borderBottom text text--sm",on:{click:function(e){return t.$router.go(-1)}}},[t._v("Back")]),r("div",{staticClass:"formContainer"},[r("p",{staticClass:"updatedOn"},[r("strong",[t._v("Last Updated:")]),t._v(" "+t._s(t.formatDate(t.Idea.updatedOn)))]),r("form",{staticClass:"form",on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.UpdateIdea(e)}}},[r("InputField",{attrs:{isActive:""!==t.Idea.title},scopedSlots:t._u([{key:"field",fn:function(){return[r("label",{attrs:{for:"title"}},[t._v("Title")]),r("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.Idea.title,expression:"Idea.title",modifiers:{trim:!0}}],attrs:{type:"text",id:"title"},domProps:{value:t.Idea.title},on:{input:function(e){e.target.composing||t.$set(t.Idea,"title",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]},proxy:!0}])}),r("InputField",{attrs:{isActive:""!==t.Idea.description},scopedSlots:t._u([{key:"field",fn:function(){return[r("label",{attrs:{for:"description"}},[t._v("Description")]),r("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:t.Idea.description,expression:"Idea.description",modifiers:{trim:!0}}],attrs:{type:"text",id:"description"},domProps:{value:t.Idea.description},on:{input:function(e){e.target.composing||t.$set(t.Idea,"description",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]},proxy:!0}])}),r("input",{staticClass:"btn btn--sm text text--sm btn--border-darkGreen",attrs:{type:"submit",value:"Update"}})],1)])])],1)},a=[],s=(r("d3b7"),r("9ab4")),i=r("1b40"),o=r("8d2e"),u=r("53ec"),c=r("2b89"),d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!0,e.Idea={},e}return Object(s["c"])(e,t),e.prototype.mounted=function(){this.GetIdea()},e.prototype.formatDate=function(t){return c["a"].formatDate(t)},e.prototype.GetIdea=function(){return Object(s["a"])(this,void 0,Promise,(function(){var t,e,r,n=this;return Object(s["d"])(this,(function(a){switch(a.label){case 0:t={ideaId:parseInt(this.$route.params.id),userId:this.$store.state.authStore.currentUser.id},a.label=1;case 1:return a.trys.push([1,3,,4]),[4,o["a"].Idea(t)];case 2:return e=a.sent(),200===e.status&&(this.Idea=e.data,setTimeout((function(){n.loading=!1}),Math.floor(3e3*Math.random()))),[3,4];case 3:return r=a.sent(),this.$router.go(-1),console.log(r),[3,4];case 4:return[2]}}))}))},e.prototype.UpdateIdea=function(){return Object(s["a"])(this,void 0,Promise,(function(){var t,e,r=this;return Object(s["d"])(this,(function(n){switch(n.label){case 0:this.loading=!0,n.label=1;case 1:return n.trys.push([1,3,,4]),[4,o["a"].UpdateIdea(this.Idea)];case 2:return t=n.sent(),200===t.status&&setTimeout((function(){u["a"].SnackBar({title:"Success",message:"Your Idea has been updated!",isSnackBarShowing:!0,classInfo:"primary"}),r.$router.push("/ideas")}),Math.floor(3e3*Math.random())),[3,4];case 3:return e=n.sent(),console.log(e),[3,4];case 4:return[2]}}))}))},e=Object(s["b"])([Object(i["a"])({name:"EditIdea",components:{Loading:function(){return r.e("chunk-3be14acd").then(r.bind(null,"866a"))},InputField:function(){return r.e("chunk-340e8728").then(r.bind(null,"0e47"))}}})],e),e}(i["d"]),l=d,p=l,f=(r("b738"),r("2877")),b=Object(f["a"])(p,n,a,!1,null,"6ec7991e",null);e["default"]=b.exports},b738:function(t,e,r){"use strict";r("5b19")}}]);
//# sourceMappingURL=view-idea-EditIdea-vue.ff2f8f6c.js.map