(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-event-SandbaggerEvent-vue"],{"25f0":function(e,t,n){"use strict";var r=n("6eeb"),i=n("825a"),s=n("d039"),u=n("ad6d"),a="toString",c=RegExp.prototype,o=c[a],d=s((function(){return"/a/b"!=o.call({source:"a",flags:"b"})})),f=o.name!=a;(d||f)&&r(RegExp.prototype,a,(function(){var e=i(this),t=String(e.source),n=e.flags,r=String(void 0===n&&e instanceof RegExp&&!("flags"in c)?u.call(e):n);return"/"+t+"/"+r}),{unsafe:!0})},"5ab0":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sandbaggerEvent"},[e.loading?n("Loading",{attrs:{value:"large"}}):e._e()],1)},i=[],s=(n("7db0"),n("b0c0"),n("d3b7"),n("25f0"),n("9ab4")),u=n("60a3"),a=n("fe9c"),c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.loading=!1,t.Event={},t.currentUser={},t}return Object(s["c"])(t,e),t.prototype.mounted=function(){return Object(s["a"])(this,void 0,Promise,(function(){return Object(s["d"])(this,(function(e){switch(e.label){case 0:return[4,this.getEventById()];case 1:return e.sent(),[2]}}))}))},Object.defineProperty(t.prototype,"isCurrentUserAlreadyRegistered",{get:function(){var e=this;if(this.Event&&this.Event.registeredUsers){var t=this.Event.registeredUsers.find((function(t){return t.id===e.currentUser.id}));return!!t}return!1},enumerable:!0,configurable:!0}),t.prototype.registerForEvent=function(){return Object(s["a"])(this,void 0,Promise,(function(){var e,t,n;return Object(s["d"])(this,(function(r){switch(r.label){case 0:this.loading=!0,r.label=1;case 1:return r.trys.push([1,3,,4]),[4,a["a"].RegisterUserForEvent(this.currentUser)];case 2:return e=r.sent(),200===e.status&&(t={fullName:this.currentUser.fullName,id:this.currentUser.id,username:this.currentUser.username,image:this.$store.state.authStore.currentUser.profile.image},this.Event.registeredUsers.push(t)),this.loading=!1,[3,4];case 3:return n=r.sent(),this.loading=!1,console.log(n),[3,4];case 4:return[2]}}))}))},t.prototype.getEventById=function(){return Object(s["a"])(this,void 0,Promise,(function(){var e,t;return Object(s["d"])(this,(function(n){switch(n.label){case 0:this.loading=!0,n.label=1;case 1:return n.trys.push([1,4,,5]),[4,a["a"].getEventById(this.$route.params.eventId)];case 2:return e=n.sent(),this.Event=e.data,this.currentUser={eventId:this.Event.eventId.toString(),id:this.$store.state.authStore.currentUser.id,username:this.$store.state.authStore.currentUser.username,fullName:this.$store.state.authStore.currentUser.fullName},[4,this.$store.dispatch("uiStore/_setHeader",{current:"main",isShowing:!0,title:e.data.name})];case 3:return n.sent(),this.loading=!1,[3,5];case 4:return t=n.sent(),this.loading=!1,console.log(t),[3,5];case 5:return[2]}}))}))},t=Object(s["b"])([Object(u["a"])({name:"SandbaggerEvent",components:{Loading:function(){return n.e("chunk-7f1bdce6").then(n.bind(null,"866a"))}}})],t),t}(u["d"]),o=c,d=o,f=n("2877"),l=Object(f["a"])(d,r,i,!1,null,"0ee6a444",null);t["default"]=l.exports},"65f0":function(e,t,n){var r=n("861d"),i=n("e8b5"),s=n("b622"),u=s("species");e.exports=function(e,t){var n;return i(e)&&(n=e.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?r(n)&&(n=n[u],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},"7db0":function(e,t,n){"use strict";var r=n("23e7"),i=n("b727").find,s=n("44d2"),u=n("ae40"),a="find",c=!0,o=u(a);a in[]&&Array(1)[a]((function(){c=!1})),r({target:"Array",proto:!0,forced:c||!o},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),s(a)},ad6d:function(e,t,n){"use strict";var r=n("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},b727:function(e,t,n){var r=n("0366"),i=n("44ad"),s=n("7b0b"),u=n("50c4"),a=n("65f0"),c=[].push,o=function(e){var t=1==e,n=2==e,o=3==e,d=4==e,f=6==e,l=5==e||f;return function(h,v,b,g){for(var p,m,E=s(h),j=i(E),O=r(v,b,3),y=u(j.length),U=0,w=g||a,P=t?w(h,y):n?w(h,0):void 0;y>U;U++)if((l||U in j)&&(p=j[U],m=O(p,U,E),e))if(t)P[U]=m;else if(m)switch(e){case 3:return!0;case 5:return p;case 6:return U;case 2:c.call(P,p)}else if(d)return!1;return f?-1:o||d?d:P}};e.exports={forEach:o(0),map:o(1),filter:o(2),some:o(3),every:o(4),find:o(5),findIndex:o(6)}},e8b5:function(e,t,n){var r=n("c6b6");e.exports=Array.isArray||function(e){return"Array"==r(e)}},fe9c:function(e,t,n){"use strict";n("d3b7");var r=n("9ab4"),i=n("86bc"),s="/events",u=function(){function e(){}return e.eventList=function(){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(e){switch(e.label){case 0:return[4,i["a"].get(s+"/EventList")];case 1:return[2,e.sent()]}}))}))},e.publishedEvents=function(){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(e){switch(e.label){case 0:return[4,i["a"].get(s+"/PublishedEvents")];case 1:return[2,e.sent()]}}))}))},e.createEvent=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].post(s+"/CreateEvent",e)];case 1:return[2,t.sent()]}}))}))},e.getEventById=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].get(s+"/GetEventById/"+e)];case 1:return[2,t.sent()]}}))}))},e.UpdateEvent=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].put(s+"/UpdateEvent",e)];case 1:return[2,t.sent()]}}))}))},e.RegisterUserForEvent=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].post(s+"/RegisterUserForEvent",e)];case 1:return[2,t.sent()]}}))}))},e.CreateEventTeam=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].post(s+"/CreateTeamForEvent",e)];case 1:return[2,t.sent()]}}))}))},e.EventTeams=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){return[2,i["a"].get(s+"/EventTeams/"+e)]}))}))},e.UpdateTeam=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){return[2,i["a"].put(s+"/UpdateTeam/",e)]}))}))},e.deleteEvent=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){return console.log("[eventId: "+e+"]"),[2,i["a"].delete(s+"/DeleteEvent/"+e)]}))}))},e}();t["a"]=u}}]);
//# sourceMappingURL=view-event-SandbaggerEvent-vue.1377a96c.js.map