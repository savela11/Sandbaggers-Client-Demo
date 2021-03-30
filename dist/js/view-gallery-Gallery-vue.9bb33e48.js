(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-gallery-Gallery-vue"],{1779:function(e,t,a){},"5ed0":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"gallery"},[e.loading?a("Loading"):a("div",[e.galleries.length>0?a("div",{staticClass:"list"},e._l(e.galleries,(function(t){return a("div",{key:t.eventId,staticClass:"event"},[a("div",{staticClass:"container"},[a("div",{staticClass:"top"},[a("h2",{staticClass:"text text--title text--bold color--primary"},[e._v(e._s(t.name))])]),a("div",{staticClass:"bottom"},[a("div",{staticClass:"imgContainer",class:{noImage:""===t.mainImg}},[a("img",{staticClass:"z1",attrs:{src:e.setDefaultGalleryImage(t.mainImg),alt:"Main Gallery Image"}}),a("div",{staticClass:"numOfImages z2"},[a("p",{staticClass:"text text--bold text--md text--center color--white"},[e._v("Images: "+e._s(t.numOfImages))])])]),a("div",{staticClass:"info"},[a("router-link",{staticClass:"text text--decoration-none text--center text--bold text--md color--white bg--secondary",attrs:{to:"/gallery/"+t.eventId}},[e._v("View Images ")])],1)])])])})),0):a("div",[a("p",[e._v("No Gallery Created")])])])],1)},r=[],n=(a("d3b7"),a("9ab4")),i=a("1b40"),o=a("a499"),c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.loading=!0,t.galleries=[],t}return Object(n["c"])(t,e),t.prototype.mounted=function(){this.getGalleries()},t.prototype.getGalleries=function(){return Object(n["a"])(this,void 0,Promise,(function(){var e,t,a=this;return Object(n["d"])(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,o["a"].Galleries()];case 1:return e=s.sent(),200===e.status&&(this.galleries=e.data,setTimeout((function(){a.loading=!1}),Math.floor(3e3*Math.random()))),[3,3];case 2:return t=s.sent(),console.log(t),this.loading=!1,[3,3];case 3:return[2]}}))}))},t.prototype.setDefaultGalleryImage=function(e){return null==e||""===e?"https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80":e},t=Object(n["b"])([Object(i["a"])({name:"Gallery",components:{Loading:function(){return a.e("chunk-3be14acd").then(a.bind(null,"866a"))}}})],t),t}(i["d"]),l=c,u=l,d=(a("b65a"),a("2877")),f=Object(d["a"])(u,s,r,!1,null,"5fc86bf4",null);t["default"]=f.exports},"86bc":function(e,t,a){"use strict";a("d3b7");var s=a("9ab4"),r=a("bc3a"),n=a.n(r),i=a("88b4"),o=a.n(i),c=a("0613"),l="https://sandbaggerapi.azurewebsites.net/api",u=new o.a({isCompression:!1}),d=n.a.create({baseURL:l});d.interceptors.request.use((function(e){e.withCredentials=!0,n.a.defaults.headers.common["Authorization"]="",delete n.a.defaults.headers.common["Authorization"];var t=JSON.parse(u.get("User"));if(null!=t.authStore.currentUser){var a=t.authStore.currentUser.token;a&&(e.headers.common.Authorization="Bearer "+a)}return e}),(function(e){return console.log("error",e),Promise.reject(e)})),d.interceptors.response.use((function(e){return e}),(function(e){return Object(s["a"])(void 0,void 0,void 0,(function(){return Object(s["d"])(this,(function(t){switch(t.label){case 0:return e&&e.response?401!==e.response.status&&"Unauthorized"!==e.response.statusText&&500!==e.response.status?[3,2]:[4,c["a"].dispatch("authStore/Logout")]:[3,2];case 1:t.sent(),t.label=2;case 2:return e&&e.message?"Network Error"!==e.message?[3,4]:[4,c["a"].dispatch("authStore/Logout")]:[3,4];case 3:t.sent(),console.log("Error!",e.message),t.label=4;case 4:return[2,Promise.reject(e.response)]}}))}))})),t["a"]=d},a499:function(e,t,a){"use strict";a("d3b7");var s=a("9ab4"),r=a("86bc"),n="/Gallery",i=function(){function e(){}return e.Galleries=function(){return Object(s["a"])(this,void 0,Promise,(function(){return Object(s["d"])(this,(function(e){switch(e.label){case 0:return[4,r["a"].get(n+"/Galleries")];case 1:return[2,e.sent()]}}))}))},e.Gallery=function(e){return Object(s["a"])(this,void 0,Promise,(function(){return Object(s["d"])(this,(function(t){switch(t.label){case 0:return[4,r["a"].get(n+"/Gallery/"+e)];case 1:return[2,t.sent()]}}))}))},e.UploadImage=function(e){return Object(s["a"])(this,void 0,Promise,(function(){return Object(s["d"])(this,(function(t){switch(t.label){case 0:return[4,r["a"].post(n+"/UploadImageToGallery",e)];case 1:return[2,t.sent()]}}))}))},e.AddImageToGallery=function(e){return Object(s["a"])(this,void 0,Promise,(function(){return Object(s["d"])(this,(function(t){switch(t.label){case 0:return[4,r["a"].post(n+"/AddImageToGallery",e)];case 1:return[2,t.sent()]}}))}))},e}();t["a"]=i},b65a:function(e,t,a){"use strict";a("1779")}}]);
//# sourceMappingURL=view-gallery-Gallery-vue.9bb33e48.js.map