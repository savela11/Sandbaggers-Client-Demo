(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-gallery-GalleryImages-vue"],{"177f":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"galleryImages",class:{selected:null!==t.selectedImage}},[t.isPopUpShowing?n("PopUp",{staticClass:"popUp",attrs:{showPopUp:t.showPopUp},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.togglePopUp(!1)}},scopedSlots:t._u([{key:"title",fn:function(){return[n("h4",{staticClass:"text my-1 my-md-2 text--bold text--md text--center color--primary text-vpLG--lg"},[t._v("Add Image")])]},proxy:!0},{key:"content",fn:function(){return[n("div",{staticClass:"popUpBtns"},t._l(t.popUpOptions,(function(e){return n("button",{key:e,staticClass:"btn btn--active btn--xs text text--xs color--primary text--fw-500",class:{active:t.currentPopUpView===e},on:{click:function(n){t.currentPopUpView=e}}},[t._v(" "+t._s(e)+" ")])})),0),n("div",{staticClass:"popUpViews"},[n("div",{directives:[{name:"show",rawName:"v-show",value:"Link"===t.currentPopUpView,expression:"currentPopUpView === 'Link'"}],staticClass:"view"},[n("InputField",{attrs:{className:"sm",isActive:""!==t.imageLink},scopedSlots:t._u([{key:"field",fn:function(){return[n("label",{attrs:{for:"imageLink"}},[t._v("Link")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.imageLink,expression:"imageLink",modifiers:{trim:!0}}],attrs:{type:"text",id:"imageLink"},domProps:{value:t.imageLink},on:{input:function(e){e.target.composing||(t.imageLink=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]},proxy:!0}],null,!1,923598595)}),n("button",{staticClass:"btn btn--sm btn--bg-darkBlue text text--sm",on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.addImageToGallery(e)}}},[t._v("Submit")])],1),n("div",{directives:[{name:"show",rawName:"v-show",value:"Upload"===t.currentPopUpView,expression:"currentPopUpView === 'Upload'"}],staticClass:"view"},[n("input",{attrs:{type:"file",id:"fileInput"},on:{change:function(e){return e.preventDefault(),t.uploadImage(e.target.files)}}}),t.uploadedImageLink?n("div",{staticClass:"uploadedImage"},[n("img",{attrs:{src:t.uploadedImageLink,alt:"UploadedImage"}})]):t._e(),n("button",{staticClass:"btn btn--sm btn--bg-darkBlue text text--sm",on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.addImageToGallery(e)}}},[t._v("Submit")])])])]},proxy:!0}],null,!1,3345324268)}):t._e(),t.selectedImage||t.loading?t.selectedImage&&!t.loading?n("div",{staticClass:"selectedImage"},[n("button",{staticClass:"backToGalleryBtn text color--primary z1 bg--white btn btn--xs text--noWrap"},[t._v("Back To Images")]),n("div",{staticClass:"selectedImage__img"},[n("p",{staticClass:"createdByUser text text--sm color--white text--bold z1"},[t._v(t._s(t.selectedImage.createdBy.fullName))]),n("img",{attrs:{src:t.selectedImage.image,alt:"Selected Image"}})]),n("div",{staticClass:"selectedImage__comments"})]):n("Loading"):n("div",[n("div",{staticClass:"backBtn"},[n("button",{staticClass:"btn btn--border-darkGreen btn--xs btn--borderBottom text text--xs",on:{click:function(e){return t.$router.back()}}},[t._v("Back")]),n("IconBtn",{attrs:{className:"float float--right",btnText:"Add Image"},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.togglePopUp(!t.showPopUp)}},scopedSlots:t._u([{key:"svg",fn:function(){return[n("svg",{attrs:{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[n("path",{attrs:{d:"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z",fill:"#17252A"}})])]},proxy:!0}],null,!1,2478591833)})],1),n("div",{staticClass:"top"},[n("h1",{staticClass:"text text--bold text--title color--primary"},[t._v(t._s(t.gallery.name))])]),n("div",{staticClass:"bottom"},[n("div",{staticClass:"gallery"},t._l(t.gallery.images,(function(e){return n("div",{key:e.imageId,staticClass:"gallery__image",on:{click:function(n){return n.preventDefault(),n.stopPropagation(),t.selectImage(e)}}},[n("div",{staticClass:"content"},[n("img",{attrs:{src:e.image,alt:"image"}}),n("p",{staticClass:"createdByUser text text--xs color--white text--bold z1"},[t._v(t._s(e.createdBy.fullName))])])])})),0)])])],1)},s=[],r=(n("b0c0"),n("d3b7"),n("9ab4")),o=n("1b40"),i=n("a499"),c=n("53ec"),l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading=!0,e.gallery={},e.selectedImage=null,e.isPopUpShowing=!1,e.showPopUp=!1,e.popUpOptions=["Link","Upload"],e.currentPopUpView="Link",e.imageLink="",e.uploadedImageLink=null,e}return Object(r["c"])(e,t),e.prototype.mounted=function(){this.getGallery()},e.prototype.selectImage=function(t){this.selectedImage=t},e.prototype.togglePopUp=function(t){var e=this;t?(this.isPopUpShowing=!0,document.body.style.position="fixed"):(document.body.style.position="static",setTimeout((function(){e.isPopUpShowing=!1}),1e3)),this.$nextTick((function(){e.showPopUp=t}))},e.prototype.uploadImage=function(t){return Object(r["a"])(this,void 0,Promise,(function(){var e,n,a,s;return Object(r["d"])(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),e=t[0],n=new FormData,n.append(this.gallery.name,e,e.name),[4,i["a"].UploadImage(n)];case 1:return a=r.sent(),200===a.status&&(this.uploadedImageLink=a.data),[3,3];case 2:return s=r.sent(),console.log(s),[3,3];case 3:return[2]}}))}))},e.prototype.addImageToGallery=function(){return Object(r["a"])(this,void 0,Promise,(function(){var t,e,n,a=this;return Object(r["d"])(this,(function(s){switch(s.label){case 0:t={eventId:this.gallery.eventId,createdByUserId:this.$store.state.authStore.currentUser.id,image:this.imageLink},this.uploadedImageLink&&(t.image=this.uploadedImageLink),s.label=1;case 1:return s.trys.push([1,3,,4]),[4,i["a"].AddImageToGallery(t)];case 2:return e=s.sent(),200===e.status&&(c["a"].SnackBar({title:"Success",message:"Image added to "+this.gallery.name,isSnackBarShowing:!0,classInfo:"primary"}),this.togglePopUp(!1),setTimeout((function(){a.$router.go(0)}),Math.floor(4e3*Math.random()))),[3,4];case 3:return n=s.sent(),console.log(n),[3,4];case 4:return[2]}}))}))},e.prototype.getGallery=function(){return Object(r["a"])(this,void 0,Promise,(function(){var t,e,n=this;return Object(r["d"])(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,i["a"].Gallery(this.$route.params.eventId)];case 1:return t=a.sent(),200===t.status&&(this.gallery=t.data,setTimeout((function(){n.loading=!1}),Math.floor(4e3*Math.random()))),[3,3];case 2:return e=a.sent(),this.loading=!1,console.log(e),[3,3];case 3:return[2]}}))}))},e=Object(r["b"])([Object(o["a"])({name:"GalleryImages",components:{Loading:function(){return n.e("chunk-9c9507fc").then(n.bind(null,"866a"))},InputField:function(){return n.e("chunk-596959b6").then(n.bind(null,"fc45"))},IconBtn:function(){return n.e("chunk-2d2307fc").then(n.bind(null,"ed18"))},PopUp:function(){return n.e("chunk-4cea2414").then(n.bind(null,"044d"))}}})],e),e}(o["d"]),u=l,p=u,d=(n("298a"),n("2877")),m=Object(d["a"])(p,a,s,!1,null,"7e192400",null);e["default"]=m.exports},"298a":function(t,e,n){"use strict";n("91bd")},"86bc":function(t,e,n){"use strict";n("d3b7");var a=n("9ab4"),s=n("bc3a"),r=n.n(s),o=n("88b4"),i=n.n(o),c=n("0613"),l="https://sandbaggerapi.azurewebsites.net/api",u=new i.a({isCompression:!1}),p=r.a.create({baseURL:l});p.interceptors.request.use((function(t){t.withCredentials=!0,r.a.defaults.headers.common["Authorization"]="",delete r.a.defaults.headers.common["Authorization"];var e=JSON.parse(u.get("User"));if(null!=e.authStore.currentUser){var n=e.authStore.currentUser.token;n&&(t.headers.common.Authorization="Bearer "+n)}return t}),(function(t){return console.log("error",t),Promise.reject(t)})),p.interceptors.response.use((function(t){return t}),(function(t){return Object(a["a"])(void 0,void 0,void 0,(function(){return Object(a["d"])(this,(function(e){switch(e.label){case 0:return t&&t.response?401!==t.response.status&&"Unauthorized"!==t.response.statusText&&500!==t.response.status?[3,2]:[4,c["a"].dispatch("authStore/Logout")]:[3,2];case 1:e.sent(),e.label=2;case 2:return t&&t.message?"Network Error"!==t.message?[3,4]:[4,c["a"].dispatch("authStore/Logout")]:[3,4];case 3:e.sent(),console.log("Error!",t.message),e.label=4;case 4:return[2,Promise.reject(t.response)]}}))}))})),e["a"]=p},"91bd":function(t,e,n){},a499:function(t,e,n){"use strict";n("d3b7");var a=n("9ab4"),s=n("86bc"),r="/Gallery",o=function(){function t(){}return t.Galleries=function(){return Object(a["a"])(this,void 0,Promise,(function(){return Object(a["d"])(this,(function(t){switch(t.label){case 0:return[4,s["a"].get(r+"/Galleries")];case 1:return[2,t.sent()]}}))}))},t.Gallery=function(t){return Object(a["a"])(this,void 0,Promise,(function(){return Object(a["d"])(this,(function(e){switch(e.label){case 0:return[4,s["a"].get(r+"/Gallery/"+t)];case 1:return[2,e.sent()]}}))}))},t.UploadImage=function(t){return Object(a["a"])(this,void 0,Promise,(function(){return Object(a["d"])(this,(function(e){switch(e.label){case 0:return[4,s["a"].post(r+"/UploadImageToGallery",t)];case 1:return[2,e.sent()]}}))}))},t.AddImageToGallery=function(t){return Object(a["a"])(this,void 0,Promise,(function(){return Object(a["d"])(this,(function(e){switch(e.label){case 0:return[4,s["a"].post(r+"/AddImageToGallery",t)];case 1:return[2,e.sent()]}}))}))},t}();e["a"]=o},b0c0:function(t,e,n){var a=n("83ab"),s=n("9bf2").f,r=Function.prototype,o=r.toString,i=/^\s*function ([^ (]*)/,c="name";a&&!(c in r)&&s(r,c,{configurable:!0,get:function(){try{return o.call(this).match(i)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=view-gallery-GalleryImages-vue.24bd25d2.js.map