(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-auth-Register-vue"],{"057f":function(t,r,e){var i=e("fc6a"),o=e("241c").f,s={}.toString,n="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return o(t)}catch(r){return n.slice()}};t.exports.f=function(t){return n&&"[object Window]"==s.call(t)?a(t):o(i(t))}},"159b":function(t,r,e){var i=e("da84"),o=e("fdbc"),s=e("17c2"),n=e("9112");for(var a in o){var u=i[a],c=u&&u.prototype;if(c&&c.forEach!==s)try{n(c,"forEach",s)}catch(f){c.forEach=s}}},"17c2":function(t,r,e){"use strict";var i=e("b727").forEach,o=e("a640"),s=e("ae40"),n=o("forEach"),a=s("forEach");t.exports=n&&a?[].forEach:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,r,e){"use strict";var i=e("23e7"),o=e("17c2");i({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},"65f0":function(t,r,e){var i=e("861d"),o=e("e8b5"),s=e("b622"),n=s("species");t.exports=function(t,r){var e;return o(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!o(e.prototype)?i(e)&&(e=e[n],null===e&&(e=void 0)):e=void 0),new(void 0===e?Array:e)(0===r?0:r)}},"746f":function(t,r,e){var i=e("428f"),o=e("5135"),s=e("e538"),n=e("9bf2").f;t.exports=function(t){var r=i.Symbol||(i.Symbol={});o(r,t)||n(r,t,{value:s.f(t)})}},"935e":function(t,r,e){"use strict";e.r(r);var i=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"register"},[t.loading?t._e():e("form",{staticClass:"form form--login"},[e("div",{staticClass:"form__field"},[e("label",{attrs:{for:"username"}},[t._v("Username")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.username,expression:"registerForm.username",modifiers:{trim:!0}}],attrs:{type:"text",id:"username"},domProps:{value:t.registerForm.username},on:{input:function(r){r.target.composing||t.$set(t.registerForm,"username",r.target.value.trim())},blur:function(r){return t.$forceUpdate()}}})]),e("div",{staticClass:"form__field"},[e("label",{attrs:{for:"email"}},[t._v("Email")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.email,expression:"registerForm.email",modifiers:{trim:!0}}],attrs:{type:"email",id:"email"},domProps:{value:t.registerForm.email},on:{input:function(r){r.target.composing||t.$set(t.registerForm,"email",r.target.value.trim())},blur:function(r){return t.$forceUpdate()}}})]),e("div",{staticClass:"form__field"},[e("label",{attrs:{for:"firstName"}},[t._v("First Name")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.firstName,expression:"registerForm.firstName",modifiers:{trim:!0}}],attrs:{type:"text",id:"firstName"},domProps:{value:t.registerForm.firstName},on:{input:function(r){r.target.composing||t.$set(t.registerForm,"firstName",r.target.value.trim())},blur:function(r){return t.$forceUpdate()}}})]),e("div",{staticClass:"form__field"},[e("label",{attrs:{for:"lastName"}},[t._v("Last Name")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.lastName,expression:"registerForm.lastName",modifiers:{trim:!0}}],attrs:{type:"text",id:"lastName"},domProps:{value:t.registerForm.lastName},on:{input:function(r){r.target.composing||t.$set(t.registerForm,"lastName",r.target.value.trim())},blur:function(r){return t.$forceUpdate()}}})]),e("div",{staticClass:"form__field"},[e("label",{attrs:{for:"password"}},[t._v("Password")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.password,expression:"registerForm.password",modifiers:{trim:!0}}],attrs:{type:"password",id:"password"},domProps:{value:t.registerForm.password},on:{input:function(r){r.target.composing||t.$set(t.registerForm,"password",r.target.value.trim())},blur:function(r){return t.$forceUpdate()}}})]),e("div",{staticClass:"form__field"},[e("label",{attrs:{for:"confirmPassword"}},[t._v("Confirm Password")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.confirmPassword,expression:"registerForm.confirmPassword",modifiers:{trim:!0}}],attrs:{type:"password",id:"confirmPassword"},domProps:{value:t.registerForm.confirmPassword},on:{input:function(r){r.target.composing||t.$set(t.registerForm,"confirmPassword",r.target.value.trim())},blur:function(r){return t.$forceUpdate()}}})]),e("div",{staticClass:"form__field"},[e("label",{attrs:{for:"registrationCode"}},[t._v("Registration Code")]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.registerForm.registrationCode,expression:"registerForm.registrationCode",modifiers:{trim:!0}}],attrs:{type:"text",id:"registrationCode"},domProps:{value:t.registerForm.registrationCode},on:{input:function(r){r.target.composing||t.$set(t.registerForm,"registrationCode",r.target.value.trim())},blur:function(r){return t.$forceUpdate()}}})]),e("div",{staticClass:"btnContainer"},[e("button",{staticClass:"btn btn--blue btn--sm",on:{click:function(r){return r.preventDefault(),r.stopPropagation(),t.onSubmit(r)}}},[t._v("Register")])])]),t.loading?t._e():e("div",{staticClass:"greyLinks"},[e("p",[t._v("Already have an account? "),e("router-link",{attrs:{to:"/login"}},[t._v("Login")])],1)]),t.loading?e("Loading"):t._e()],1)},o=[],s=(e("a4d3"),e("e01a"),e("4160"),e("d3b7"),e("159b"),e("9ab4")),n=e("60a3"),a=e("7cf9"),u=function(t){function r(){var r=null!==t&&t.apply(this,arguments)||this;return r.loading=!1,r.registerForm={email:"",username:"",password:"",confirmPassword:"",firstName:"",lastName:"",registrationCode:"",loginAfterRegister:!1},r.show=!0,r.showPassword=!1,r.showConfirmPassword=!1,r}return Object(s["c"])(r,t),r.prototype.mounted=function(){},r.prototype.onSubmit=function(){return Object(s["a"])(this,void 0,Promise,(function(){var t,r,e,i,o,n=this;return Object(s["d"])(this,(function(s){switch(s.label){case 0:if(this.loading=!0,!this.validateForm())return[3,5];s.label=1;case 1:return s.trys.push([1,3,,5]),[4,a["a"].registerUser(this.registerForm)];case 2:return t=s.sent(),this.registerForm.loginAfterRegister&&200===t.status?(r={username:this.registerForm.username,password:this.registerForm.password},setTimeout((function(){n.loading=!0,n.$store.dispatch("authStore/LoginUser",{loginUser:r})}),4e3)):setTimeout((function(){n.loading=!0,n.$router.push("/login")}),3e3),[3,5];case 3:return e=s.sent(),i=[],o={title:e.data.message,message:"",isSnackBarShowing:!0,class:"error",errors:[]},e.data.data&&(e.data.data.errors.forEach((function(t){i.push(t.description)})),o.errors=i),[4,this.$store.dispatch("uiStore/_setSnackBar",o)];case 4:return s.sent(),this.loading=!1,[3,5];case 5:return[2]}}))}))},r.prototype.validateForm=function(){var t=!0,r=[],e={title:"",message:"",isSnackBarShowing:!0,class:"error",errors:[]};return""===this.registerForm.username&&(t=!1,r.push("Must provide a username")),"true"===this.registerForm.loginAfterRegister&&(this.registerForm.loginAfterRegister=!0),this.registerForm.password!==this.registerForm.confirmPassword&&(t=!1,r.push("Passwords must match")),""===this.registerForm.firstName&&(t=!1,r.push("Must provide a first name")),""===this.registerForm.password&&(t=!1,r.push("Must provide a password")),""===this.registerForm.email&&(t=!1,r.push("Must Provide an email")),""===this.registerForm.registrationCode&&(t=!1,r.push("Must provide a registration code")),!1===t&&(this.loading=!1,r.length>1?e.title="Registration Errors":e.title="Registration Error"),e.errors=r,!1===t&&this.$store.dispatch("uiStore/_setSnackBar",e),t},r.prototype.resetForm=function(){var t=this;this.registerForm.email="",this.registerForm.username="",this.registerForm.password="",this.registerForm.confirmPassword="",this.registerForm.firstName="",this.registerForm.registrationCode="",this.registerForm.loginAfterRegister=!1,this.show=!1,this.$nextTick((function(){t.show=!0}))},r=Object(s["b"])([Object(n["a"])({name:"Register",components:{Loading:function(){return e.e("chunk-75293f4f").then(e.bind(null,"866a"))}}})],r),r}(n["d"]),c=u,f=c,m=(e("df38"),e("2877")),l=Object(m["a"])(f,i,o,!1,null,"7fd3a27a",null);r["default"]=l.exports},a4d3:function(t,r,e){"use strict";var i=e("23e7"),o=e("da84"),s=e("d066"),n=e("c430"),a=e("83ab"),u=e("4930"),c=e("fdbf"),f=e("d039"),m=e("5135"),l=e("e8b5"),d=e("861d"),g=e("825a"),p=e("7b0b"),v=e("fc6a"),h=e("c04e"),b=e("5c6c"),y=e("7c73"),w=e("df75"),F=e("241c"),S=e("057f"),P=e("7418"),N=e("06cf"),C=e("9bf2"),L=e("d1e7"),_=e("9112"),O=e("6eeb"),x=e("5692"),$=e("f772"),E=e("d012"),T=e("90e3"),j=e("b622"),k=e("e538"),A=e("746f"),M=e("d44e"),R=e("69f3"),U=e("b727").forEach,D=$("hidden"),V="Symbol",G="prototype",B=j("toPrimitive"),H=R.set,J=R.getterFor(V),I=Object[G],q=o.Symbol,Q=s("JSON","stringify"),W=N.f,z=C.f,K=S.f,X=L.f,Y=x("symbols"),Z=x("op-symbols"),tt=x("string-to-symbol-registry"),rt=x("symbol-to-string-registry"),et=x("wks"),it=o.QObject,ot=!it||!it[G]||!it[G].findChild,st=a&&f((function(){return 7!=y(z({},"a",{get:function(){return z(this,"a",{value:7}).a}})).a}))?function(t,r,e){var i=W(I,r);i&&delete I[r],z(t,r,e),i&&t!==I&&z(I,r,i)}:z,nt=function(t,r){var e=Y[t]=y(q[G]);return H(e,{type:V,tag:t,description:r}),a||(e.description=r),e},at=c?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof q},ut=function(t,r,e){t===I&&ut(Z,r,e),g(t);var i=h(r,!0);return g(e),m(Y,i)?(e.enumerable?(m(t,D)&&t[D][i]&&(t[D][i]=!1),e=y(e,{enumerable:b(0,!1)})):(m(t,D)||z(t,D,b(1,{})),t[D][i]=!0),st(t,i,e)):z(t,i,e)},ct=function(t,r){g(t);var e=v(r),i=w(e).concat(gt(e));return U(i,(function(r){a&&!mt.call(e,r)||ut(t,r,e[r])})),t},ft=function(t,r){return void 0===r?y(t):ct(y(t),r)},mt=function(t){var r=h(t,!0),e=X.call(this,r);return!(this===I&&m(Y,r)&&!m(Z,r))&&(!(e||!m(this,r)||!m(Y,r)||m(this,D)&&this[D][r])||e)},lt=function(t,r){var e=v(t),i=h(r,!0);if(e!==I||!m(Y,i)||m(Z,i)){var o=W(e,i);return!o||!m(Y,i)||m(e,D)&&e[D][i]||(o.enumerable=!0),o}},dt=function(t){var r=K(v(t)),e=[];return U(r,(function(t){m(Y,t)||m(E,t)||e.push(t)})),e},gt=function(t){var r=t===I,e=K(r?Z:v(t)),i=[];return U(e,(function(t){!m(Y,t)||r&&!m(I,t)||i.push(Y[t])})),i};if(u||(q=function(){if(this instanceof q)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,r=T(t),e=function(t){this===I&&e.call(Z,t),m(this,D)&&m(this[D],r)&&(this[D][r]=!1),st(this,r,b(1,t))};return a&&ot&&st(I,r,{configurable:!0,set:e}),nt(r,t)},O(q[G],"toString",(function(){return J(this).tag})),O(q,"withoutSetter",(function(t){return nt(T(t),t)})),L.f=mt,C.f=ut,N.f=lt,F.f=S.f=dt,P.f=gt,k.f=function(t){return nt(j(t),t)},a&&(z(q[G],"description",{configurable:!0,get:function(){return J(this).description}}),n||O(I,"propertyIsEnumerable",mt,{unsafe:!0}))),i({global:!0,wrap:!0,forced:!u,sham:!u},{Symbol:q}),U(w(et),(function(t){A(t)})),i({target:V,stat:!0,forced:!u},{for:function(t){var r=String(t);if(m(tt,r))return tt[r];var e=q(r);return tt[r]=e,rt[e]=r,e},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(m(rt,t))return rt[t]},useSetter:function(){ot=!0},useSimple:function(){ot=!1}}),i({target:"Object",stat:!0,forced:!u,sham:!a},{create:ft,defineProperty:ut,defineProperties:ct,getOwnPropertyDescriptor:lt}),i({target:"Object",stat:!0,forced:!u},{getOwnPropertyNames:dt,getOwnPropertySymbols:gt}),i({target:"Object",stat:!0,forced:f((function(){P.f(1)}))},{getOwnPropertySymbols:function(t){return P.f(p(t))}}),Q){var pt=!u||f((function(){var t=q();return"[null]"!=Q([t])||"{}"!=Q({a:t})||"{}"!=Q(Object(t))}));i({target:"JSON",stat:!0,forced:pt},{stringify:function(t,r,e){var i,o=[t],s=1;while(arguments.length>s)o.push(arguments[s++]);if(i=r,(d(r)||void 0!==t)&&!at(t))return l(r)||(r=function(t,r){if("function"==typeof i&&(r=i.call(this,t,r)),!at(r))return r}),o[1]=r,Q.apply(null,o)}})}q[G][B]||_(q[G],B,q[G].valueOf),M(q,V),E[D]=!0},a640:function(t,r,e){"use strict";var i=e("d039");t.exports=function(t,r){var e=[][t];return!!e&&i((function(){e.call(null,r||function(){throw 1},1)}))}},b727:function(t,r,e){var i=e("0366"),o=e("44ad"),s=e("7b0b"),n=e("50c4"),a=e("65f0"),u=[].push,c=function(t){var r=1==t,e=2==t,c=3==t,f=4==t,m=6==t,l=5==t||m;return function(d,g,p,v){for(var h,b,y=s(d),w=o(y),F=i(g,p,3),S=n(w.length),P=0,N=v||a,C=r?N(d,S):e?N(d,0):void 0;S>P;P++)if((l||P in w)&&(h=w[P],b=F(h,P,y),t))if(r)C[P]=b;else if(b)switch(t){case 3:return!0;case 5:return h;case 6:return P;case 2:u.call(C,h)}else if(f)return!1;return m?-1:c||f?f:C}};t.exports={forEach:c(0),map:c(1),filter:c(2),some:c(3),every:c(4),find:c(5),findIndex:c(6)}},dd93:function(t,r,e){},df38:function(t,r,e){"use strict";var i=e("dd93"),o=e.n(i);o.a},e01a:function(t,r,e){"use strict";var i=e("23e7"),o=e("83ab"),s=e("da84"),n=e("5135"),a=e("861d"),u=e("9bf2").f,c=e("e893"),f=s.Symbol;if(o&&"function"==typeof f&&(!("description"in f.prototype)||void 0!==f().description)){var m={},l=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),r=this instanceof l?new f(t):void 0===t?f():f(t);return""===t&&(m[r]=!0),r};c(l,f);var d=l.prototype=f.prototype;d.constructor=l;var g=d.toString,p="Symbol(test)"==String(f("test")),v=/^Symbol\((.*)\)[^)]+$/;u(d,"description",{configurable:!0,get:function(){var t=a(this)?this.valueOf():this,r=g.call(t);if(n(m,t))return"";var e=p?r.slice(7,-1):r.replace(v,"$1");return""===e?void 0:e}}),i({global:!0,forced:!0},{Symbol:l})}},e538:function(t,r,e){var i=e("b622");r.f=i},e8b5:function(t,r,e){var i=e("c6b6");t.exports=Array.isArray||function(t){return"Array"==i(t)}},fdbc:function(t,r){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=view-auth-Register-vue.2f752405.js.map