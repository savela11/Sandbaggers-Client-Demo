(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d4ce875"],{"4fb6":function(t,e,n){},aa3c:function(t,e,n){"use strict";var s=n("0613"),o=function(){function t(){}return t.ToggleNavMenu=function(t){var e=document.querySelector(".navMenu"),n=document.querySelector(".closeNavMenu");e&&(t?(s["a"].dispatch("navigationStore/_setNavMenuShowingStatus",t).then(),e.classList.remove("hide"),e.classList.add("show"),null===n||void 0===n||n.classList.add("show"),document.body.style.position="fixed",document.body.style.overflowY="hidden",document.body.style.margin="0"):(e.classList.remove("show"),e.classList.add("hide"),null===n||void 0===n||n.classList.remove("show"),document.body.style.position="static",document.body.style.overflowY="auto",setTimeout((function(){s["a"].dispatch("navigationStore/_setNavMenuShowingStatus",t).then()}),500)))},t.ToggleNavBar=function(t){var e=document.querySelector(".showNavBarBtn"),n=document.querySelector(".navBar__container");t?(e&&(e.classList.remove("show"),e.classList.add("hide")),n&&(n.classList.remove("hide"),n.classList.add("show"))):(e&&(e.classList.remove("hide"),e.classList.add("show")),n&&(n.classList.remove("show"),n.classList.add("hide"))),setTimeout((function(){s["a"].dispatch("navigationStore/_setNavBarShowingStatus",t).then()}),500)},t.ToggleBackBtn=function(t){s["a"].dispatch("navigationStore/_setBackBtnShowingStatus",t).then()},t}();e["a"]=o},d50c:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navMenu"},[t.userRoles.includes("Admin")?n("div",{staticClass:"adminButtons"},[n("button",{staticClass:"btn btn--xs text text--sm btn--borderBottom btn--border-darkBlue",class:{active:"Main"===t.currentLinkView},on:{click:function(e){return t.toggleLinksView("Main")}}},[t._v("Main ")]),n("button",{staticClass:"btn btn--xs text text--sm btn--borderBottom btn--border-darkBlue",class:{active:"Admin"===t.currentLinkView},on:{click:function(e){return t.toggleLinksView("Admin")}}},[t._v("Admin ")])]):t._e(),n("nav",[n("transition",{attrs:{name:"slide-fade"}},[n("ul",{directives:[{name:"show",rawName:"v-show",value:"Main"===t.currentLinkView,expression:"currentLinkView === 'Main'"}]},t._l(t.UserLinks,(function(e){return n("li",{key:e.name,on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.closeNavMenu(e)}}},[n("router-link",{attrs:{to:e.link}},[n("div",{staticClass:"svgContainer",domProps:{innerHTML:t._s(e.icon)}}),n("span",{staticClass:"text text--xs"},[t._v(t._s(e.name))])])],1)})),0)]),n("transition",{attrs:{name:"slide-fade"}},[n("ul",{directives:[{name:"show",rawName:"v-show",value:"Admin"===t.currentLinkView,expression:"currentLinkView === 'Admin'"}]},t._l(t.AdminLinks,(function(e){return n("li",{key:e.name,on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.closeNavMenu(e)}}},[n("router-link",{attrs:{to:e.link}},[n("div",{staticClass:"svgContainer",domProps:{innerHTML:t._s(e.icon)}}),n("span",{staticClass:"text text--xs"},[t._v(t._s(e.name))])])],1)})),0)])],1),n("div",{staticClass:"extra"},[n("div",[n("button",{staticClass:"btn btn--xs btn--border-red btn--borderBottom text text--xs",attrs:{id:"logoutBTN"},on:{click:t.logout}},[t._v("Logout")])]),n("div",{staticClass:"closeNavMenu"},[n("button",{staticClass:"btn btn--xs btn--borderBottom btn--border-darkBlue text text--xs",on:{click:t.closeNavMenu}},[t._v("Close")])])])])},o=[],i=n("9ab4"),a=n("1b40"),r=n("53ec"),c=n("aa3c"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.currentLinkView="Main",e}return Object(i["c"])(e,t),Object.defineProperty(e.prototype,"UserLinks",{get:function(){return this.$store.getters["navigationStore/UserLinks"]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"AdminLinks",{get:function(){return this.$store.getters["navigationStore/AdminLinks"]},enumerable:!1,configurable:!0}),e.prototype.toggleLinksView=function(t){this.currentLinkView=t},e.prototype.closeNavMenu=function(){c["a"].ToggleNavMenu(!1)},e.prototype.logout=function(){r["a"].clickedButton("logoutBTN"),c["a"].ToggleNavMenu(!1),this.$store.dispatch("authStore/Logout")},Object(i["b"])([Object(a["c"])()],e.prototype,"userRoles",void 0),e=Object(i["b"])([Object(a["a"])({name:"NavMenu"})],e),e}(a["d"]),l=u,d=l,v=(n("fcdb"),n("2877")),b=Object(v["a"])(d,s,o,!1,null,"4a5b63b8",null);e["default"]=b.exports},fcdb:function(t,e,n){"use strict";n("4fb6")}}]);
//# sourceMappingURL=chunk-0d4ce875.e0955172.js.map