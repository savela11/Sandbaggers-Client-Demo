(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-admin-events-EventTeams-vue"],{"1dde":function(e,t,n){var r=n("d039"),i=n("b622"),a=n("2d00"),s=i("species");e.exports=function(e){return a>=51||!r((function(){var t=[],n=t.constructor={};return n[s]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"4de4":function(e,t,n){"use strict";var r=n("23e7"),i=n("b727").filter,a=n("1dde"),s=n("ae40"),o=a("filter"),c=s("filter");r({target:"Array",proto:!0,forced:!o||!c},{filter:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},"65f0":function(e,t,n){var r=n("861d"),i=n("e8b5"),a=n("b622"),s=a("species");e.exports=function(e,t){var n;return i(e)&&(n=e.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?r(n)&&(n=n[s],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===t?0:t)}},b727:function(e,t,n){var r=n("0366"),i=n("44ad"),a=n("7b0b"),s=n("50c4"),o=n("65f0"),c=[].push,u=function(e){var t=1==e,n=2==e,u=3==e,d=4==e,l=6==e,v=5==e||l;return function(f,m,h,b){for(var T,p,g=a(f),_=i(g),E=r(m,h,3),O=s(_.length),j=0,y=b||o,w=t?y(f,O):n?y(f,0):void 0;O>j;j++)if((v||j in _)&&(T=_[j],p=E(T,j,g),e))if(t)w[j]=p;else if(p)switch(e){case 3:return!0;case 5:return T;case 6:return j;case 2:c.call(w,T)}else if(d)return!1;return l?-1:u||d?d:w}};e.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},ba42:function(e,t,n){},cbd7:function(e,t,n){"use strict";var r=n("ba42"),i=n.n(r);i.a},e8b5:function(e,t,n){var r=n("c6b6");e.exports=Array.isArray||function(e){return"Array"==r(e)}},f485:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"eventTeams"},[e.loading?e._e():n("div",[n("h1",[e._v(e._s(e.event.name))]),n("div",{staticClass:"utilityBar"},[n("BtnWithText",e._b({on:{click:e.backOne}},"BtnWithText",{img:"backArrow",text:"Back"},!1)),n("BtnWithText",e._b({},"BtnWithText",{img:"addCircle",text:"Add Team"},!1))],1),n("div",{staticClass:"teams"},e._l(e.showTeams,(function(t){return n("div",{key:t.teamId,staticClass:"team",class:{selected:e.selectedTeamToEdit&&e.selectedTeamToEdit.teamId===t.teamId}},[n("div",{staticClass:"flex"},[n("div",{staticClass:"team__name"},[n("h3",[n("span",[e._v("Team")]),e._v(" "+e._s(t.name))])]),n("div",{staticClass:"team__edit"},[e.selectedTeamToEdit?n("BtnWithText",e._b({on:{click:function(n){return e.editTeam(t)}}},"BtnWithText",{img:"cancel-red",text:"Cancel"},!1)):n("BtnWithText",e._b({staticClass:"mr-2",on:{click:function(n){return e.editTeam(t)}}},"BtnWithText",{img:"editPencil",text:"Edit"},!1)),e.selectedTeamToEdit&&e.selectedTeamToEdit.teamId===t.teamId?n("BtnWithText",e._b({staticClass:"saveBtn",on:{click:e.updateTeam}},"BtnWithText",{img:"cloudSave",text:"Save"},!1)):e._e()],1)]),n("div",{staticClass:"flex"},[n("div",[n("h4",[e._v(" Captain: "),e.selectedTeamToEdit?e._e():n("span",[e._v(e._s(t.captain))])])]),e.selectedTeamToEdit?n("div",{staticClass:"selectTeamCaptainBox"},[e._m(0,!0),e._l(e.event.registeredUsers,(function(t){return n("button",{key:t.id},[e._v(e._s(t.fullName||"User"))])}))],2):e._e()]),n("div",{staticClass:"team__members"},[n("h4",[e._v(" Team Members: "),n("span",[e._v(e._s(t.teamMembers.length))])])])])})),0)]),e.loading?n("Loading"):e._e()],1)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"buttonList"},[n("button",[e._v("user")]),n("button",[e._v("user")]),n("button",[e._v("user")]),n("button",[e._v("user")]),n("button",[e._v("user")]),n("button",[e._v("user")]),n("button",[e._v("user")]),n("button",[e._v("user")])])}],a=(n("4de4"),n("caad"),n("d3b7"),n("9ab4")),s=n("60a3"),o=n("53ec"),c=n("fe9c"),u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.isAddingTeam=!1,t.loading=!1,t.eventId="",t.addTeamForm={teamName:"",eventId:""},t.selectedTeamToEdit=null,t.event={},t}return Object(a["c"])(t,e),t.prototype.mounted=function(){this.eventId=this.$route.params.eventId,this.getEvent(),o["a"].Header({title:"Teams",isShowing:!0,current:"main"})},Object.defineProperty(t.prototype,"showTeams",{get:function(){var e=this;return this.selectedTeamToEdit?this.event.teams.filter((function(t){return t.teamId===e.selectedTeamToEdit.teamId})):this.event.teams},enumerable:!0,configurable:!0}),t.prototype.teamCaptainName=function(e){return e||"No Captain Set"},t.prototype.updateTeam=function(e){return Object(a["a"])(this,void 0,Promise,(function(){var t,n;return Object(a["d"])(this,(function(r){switch(r.label){case 0:this.loading=!0,console.log(e),r.label=1;case 1:return r.trys.push([1,3,4,5]),[4,c["a"].UpdateTeam(e)];case 2:return t=r.sent(),console.log(t),[3,5];case 3:return n=r.sent(),console.log(n),[3,5];case 4:return this.loading=!1,[7];case 5:return[2]}}))}))},t.prototype.editTeam=function(e){var t;e&&e.teamId===(null===(t=this.selectedTeamToEdit)||void 0===t?void 0:t.teamId)?this.selectedTeamToEdit=null:this.selectedTeamToEdit=e},t.prototype.teamColor=function(e){var t=["red","blue","white","black","green"];return t.includes(e.toLowerCase())?e.toLowerCase():"grey"},t.prototype.toggleAddingTeam=function(e){this.isAddingTeam=e},t.prototype.addTeamToEvent=function(){return Object(a["a"])(this,void 0,Promise,(function(){var e,t;return Object(a["d"])(this,(function(n){switch(n.label){case 0:this.loading=!0,this.addTeamForm.eventId=this.eventId,n.label=1;case 1:return n.trys.push([1,3,4,5]),[4,c["a"].CreateEventTeam(this.addTeamForm)];case 2:return e=n.sent(),200===e.status&&(this.event.teams.push(e.data),this.toggleAddingTeam(!1)),console.log(e),[3,5];case 3:return t=n.sent(),console.log(t),[3,5];case 4:return this.loading=!1,[7];case 5:return[2]}}))}))},t.prototype.getEvent=function(){return Object(a["a"])(this,void 0,Promise,(function(){var e,t;return Object(a["d"])(this,(function(n){switch(n.label){case 0:this.loading=!0,n.label=1;case 1:return n.trys.push([1,3,4,6]),[4,c["a"].getEventById(this.eventId)];case 2:return e=n.sent(),200===e.status&&(this.event=e.data),[3,6];case 3:return t=n.sent(),console.log(t),[3,6];case 4:return this.loading=!1,[4,o["a"].PageLoading(!1)];case 5:return n.sent(),[7];case 6:return[2]}}))}))},t.prototype.backOne=function(){this.$router.go(-1)},t=Object(a["b"])([Object(s["a"])({name:"EventTeams",components:{Loading:function(){return n.e("chunk-7f1bdce6").then(n.bind(null,"866a"))},BtnWithText:function(){return n.e("chunk-1918644b").then(n.bind(null,"f9b5"))}}})],t),t}(s["d"]),d=u,l=d,v=(n("cbd7"),n("2877")),f=Object(v["a"])(l,r,i,!1,null,"0e1243b1",null);t["default"]=f.exports},fe9c:function(e,t,n){"use strict";n("d3b7");var r=n("9ab4"),i=n("86bc"),a="/events",s=function(){function e(){}return e.eventList=function(){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(e){switch(e.label){case 0:return[4,i["a"].get(a+"/EventList")];case 1:return[2,e.sent()]}}))}))},e.publishedEvents=function(){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(e){switch(e.label){case 0:return[4,i["a"].get(a+"/PublishedEvents")];case 1:return[2,e.sent()]}}))}))},e.createEvent=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].post(a+"/CreateEvent",e)];case 1:return[2,t.sent()]}}))}))},e.getEventById=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].get(a+"/GetEventById/"+e)];case 1:return[2,t.sent()]}}))}))},e.UpdateEvent=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].put(a+"/UpdateEvent",e)];case 1:return[2,t.sent()]}}))}))},e.RegisterUserForEvent=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].post(a+"/RegisterUserForEvent",e)];case 1:return[2,t.sent()]}}))}))},e.CreateEventTeam=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){switch(t.label){case 0:return[4,i["a"].post(a+"/CreateTeamForEvent",e)];case 1:return[2,t.sent()]}}))}))},e.EventTeams=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){return[2,i["a"].get(a+"/EventTeams/"+e)]}))}))},e.UpdateTeam=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){return[2,i["a"].put(a+"/UpdateTeam/",e)]}))}))},e.deleteEvent=function(e){return Object(r["a"])(this,void 0,Promise,(function(){return Object(r["d"])(this,(function(t){return console.log("[eventId: "+e+"]"),[2,i["a"].delete(a+"/DeleteEvent/"+e)]}))}))},e}();t["a"]=s}}]);
//# sourceMappingURL=view-admin-events-EventTeams-vue.26120e70.js.map