(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{449:function(e,t,n){e.exports=n(736)},735:function(e,t,n){},736:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(27),l=n(62),c=n(47),i=n(31),s=n(397),u=n(64),m=n(33),p={count:0,isIncrementing:!1,isDecrementing:!1},d=n(125),h=n.n(d),E=function(){return function(e){return e({type:"posts/UPDATE_POSTS_REQUESTED"}),h.a.get("http://localhost:5000/api/hello-world").then(function(t){e({type:"posts/UPDATE_MSG",payload:t.data})})}},g={posts:[],isFetchingPosts:!1,msg:""},f={currentUser:{}},b=function(){return function(e){e({type:"posts/GET_PATIENTS_REQUESTED"}),h.a.get("http://localhost:5000/patient").then(function(t){console.log("get patients res: ",t),e({type:"posts/GET_PATIENTS",payload:t.data})}).catch(function(t){console.log(t),e({type:"posts/GET_POSTS_ERR"})})}},y={patientsList:[],isFetchingPatient:!1},O=Object(i.c)({counter:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p;switch((arguments.length>1?arguments[1]:void 0).type){case"counter/INCREMENT_REQUESTED":return Object(m.a)({},e,{isIncrementing:!0});case"counter/INCREMENT":return Object(m.a)({},e,{count:e.count+1,isIncrementing:!e.isIncrementing});case"counter/DECREMENT_REQUESTED":return Object(m.a)({},e,{isDecrementing:!0});case"counter/DECREMENT":return Object(m.a)({},e,{count:e.count-1,isDecrementing:!e.isDecrementing});default:return e}},posts:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"posts/UPDATE_POSTS":return Object(m.a)({},e,{posts:t.payload,isLoading:!1});case"posts/UPDATE_POSTS_REQUESTED":return Object(m.a)({},e,{isLoading:!0});case"posts/UPDATE_POSTS_ERR":return Object(m.a)({},e,{isLoading:!1});case"posts/UPDATE_MSG":return Object(m.a)({},e,{msg:t.payload.msg});default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_USER":return Object(m.a)({},e,{currentUser:t.payload});case"LOGOUT_USER":case"INVALID_USER":return Object(m.a)({},e,{currentUser:{}});default:return e}},patients:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"posts/GET_PATIENTS":return Object(m.a)({},e,{patientsList:t.payload,isLoading:!1});case"posts/GET_PATIENTS_REQUESTED":return Object(m.a)({},e,{isLoading:!0});case"posts/GET_POSTS_ERR":return Object(m.a)({},e,{isLoading:!1});default:return e}}}),S=u.a(),v=[s.a,Object(c.routerMiddleware)(S)],j=i.d.apply(void 0,[i.a.apply(void 0,v)].concat([])),P=Object(i.e)(Object(c.connectRouter)(S)(O),{},j),T=n(104),C=n(105),N=n(108),D=n(106),w=n(109),R=n(115),I=n(90),U=n(780),k=n(751),x=n(423),M=n(782),_=function(){return function(e){e({type:"counter/INCREMENT_REQUESTED"}),e({type:"counter/INCREMENT"})}},A=function(){return function(e){return e({type:"counter/INCREMENT_REQUESTED"}),setTimeout(function(){e({type:"counter/INCREMENT"})},3e3)}},L=function(){return function(e){e({type:"counter/DECREMENT_REQUESTED"}),e({type:"counter/DECREMENT"})}},F=function(){return function(e){return e({type:"counter/DECREMENT_REQUESTED"}),setTimeout(function(){e({type:"counter/DECREMENT"})},3e3)}},H=Object(l.connect)(function(e){var t=e.counter,n=e.posts;return{count:t.count,isIncrementing:t.isIncrementing,isDecrementing:t.isDecrementing,posts:n.posts,msg:n.msg}},function(e){return Object(i.b)({increment:_,incrementAsync:A,decrement:L,decrementAsync:F,changePage:function(){return Object(c.push)("/about-us")},getPosts:E},e)})(function(e){return o.a.createElement("div",{className:"content-box"},o.a.createElement("h1",null,"Home"),o.a.createElement(U.a,{trigger:o.a.createElement(k.a,null,"Show Modal")},o.a.createElement(U.a.Header,null,"Select a Photo"),o.a.createElement(U.a.Content,{image:!0},o.a.createElement(x.a,{wrapped:!0,size:"medium",src:"/images/avatar/large/rachel.png"}),o.a.createElement(U.a.Description,null,o.a.createElement(M.a,null,"Default Profile Image"),o.a.createElement("p",null,"We've found the following gravatar image associated with your e-mail address."),o.a.createElement("p",null,"Is it okay to use this photo?")))),o.a.createElement(k.a,{content:"Primary",primary:!0}),o.a.createElement(k.a,{content:"Secondary",secondary:!0}),o.a.createElement("div",{class:"ui divider"}),o.a.createElement(M.a,{as:"h1"},"First Header"),o.a.createElement(M.a,{as:"h2"},"Second Header"),o.a.createElement(M.a,{as:"h3"},"Third Header"),o.a.createElement(M.a,{as:"h4"},"Fourth Header"),o.a.createElement(M.a,{as:"h5"},"Fifth Header"),o.a.createElement(M.a,{as:"h6"},"Sixth Header"),o.a.createElement("p",null,"Count: ",e.count),o.a.createElement("p",null,"Message from server: ",e.msg),o.a.createElement("p",null,o.a.createElement("button",{onClick:e.increment},"Increment"),o.a.createElement("button",{onClick:e.incrementAsync,disabled:e.isIncrementing},"Increment Async")),o.a.createElement("p",null,o.a.createElement("button",{onClick:e.decrement},"Decrement"),o.a.createElement("button",{onClick:e.decrementAsync,disabled:e.isDecrementing},"Decrement Async")),o.a.createElement("p",null,o.a.createElement("button",{onClick:function(){return e.changePage()}},"Go to about page via redux")),o.a.createElement("p",null,o.a.createElement("button",{onClick:function(){return e.getPosts()}},"Click me to get posts from server.")),o.a.createElement("p",null,o.a.createElement("ul",null,e.posts.map(function(e,t){return o.a.createElement("li",{key:t},e.title)}))))}),G=n(235),Q=n(103),J=n(410),V=n.n(J),q=function(e){return function(t){return fetch("http://localhost:5000/user/register",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(n){n.message?console.log(n):t(z(e)).then(function(){t(Object(c.push)("/patients"))})})}},z=function(e){return function(t){return fetch("http://localhost:5000/user/auth",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){e.message?console.log(e.message):(localStorage.setItem("token",e.token),t(B()).then(function(){t(Object(c.push)("/patients"))}))})}},B=function(){return function(e){var t=localStorage.token;return h.a.get("http://localhost:5000/user/current",{headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Bearer ".concat(t)}}).then(function(t){t.msg?(console.log(t),localStorage.removeItem("token"),e(Object(c.push)("/login"))):(console.log(t),e(K(t.data)))}).catch(function(t){return e(Object(c.push)("/login")),{message:"Not authorized"}})}},W=function(){return function(e){localStorage.removeItem("token"),e(Y()),e(Object(c.push)("/login"))}},Y=function(){return{type:"LOGOUT_USER"}},K=function(e){return{type:"LOGIN_USER",payload:e}},X=n(776),Z=n(781),$=n(777),ee=n(778),te=n(779),ne=[{key:"m",text:"Male",value:"M"},{key:"f",text:"Female",value:"F"},{key:"o",text:"Other",value:"I"}],ae=[{key:"y",text:"Yes",value:!0},{key:"n",text:"No",value:!1}],oe=function(e){function t(){var e,n;Object(T.a)(this,t);for(var a=arguments.length,r=new Array(a),l=0;l<a;l++)r[l]=arguments[l];return(n=Object(N.a)(this,(e=Object(D.a)(t)).call.apply(e,[this].concat(r)))).state={columns:[{title:"Patient ID",field:"patientId",defaultSort:"asc"},{title:"Patient Name",field:"patientName",render:function(e){return o.a.createElement("div",null,o.a.createElement("p",null,e.patientName),o.a.createElement("a",{onClick:function(){return n.openModal({rowData:e})}},"View Info"))}},{title:"Readings",render:function(e){return o.a.createElement("a",{onClick:function(){return console.log("clicked ".concat(e))}},"View Readings")}},{title:"Follow Up Status",field:"followUp",render:function(e){return e.isPregnant?o.a.createElement("button",null,"Follow Up"):o.a.createElement("p",null,"Not needed")}}],data:[],selectedPatient:{patientId:"",patientName:"Test",patientSex:"F",medicalHistory:"",drugHistory:"",villageNumber:""},displayModal:!1},n.componentDidMount=function(){console.log("componentDidMount"),n.props.getCurrentUser().then(function(e){void 0===e&&n.props.getPatients()})},n.handleSelectChange=function(e,t){console.log(t),n.setState({selectedPatient:Object(m.a)({},n.state.selectedPatient,Object(Q.a)({},t.name,t.value))})},n.openModal=function(e){console.log(e),console.log("open modal"),n.setState({displayModal:!0,selectedPatient:e.rowData})},n.closeModal=function(){console.log("close modal"),n.setState({displayModal:!1})},n.handleSubmit=function(e){e.preventDefault();var t=n.state.selectedPatient;delete t.readings,delete t.tableData,delete t.patientId;var a=JSON.stringify({patient:t});console.log(a)},n}return Object(w.a)(t,e),Object(C.a)(t,[{key:"render",value:function(){var e=this;return this.props.user.isLoggedIn?o.a.createElement("div",null,o.a.createElement("h1",null,"Patients List"),o.a.createElement("p",null," only logged in users are allowed to see this "),o.a.createElement(V.a,{title:"Patients Table",columns:this.state.columns,data:this.props.data,editable:{onRowAdd:function(t){return new Promise(function(n){setTimeout(function(){n();var a=Object(G.a)(e.state.data);a.push(t),e.setState(Object(m.a)({},e.state,{data:a}))},600)})},onRowUpdate:function(t,n){return new Promise(function(a){setTimeout(function(){a();var o=Object(G.a)(e.state.data);o[o.indexOf(n)]=t,e.setState(Object(m.a)({},e.state,{data:o}))},600)})},onRowDelete:function(t){return new Promise(function(n){setTimeout(function(){n();var a=Object(G.a)(e.state.data);a.splice(a.indexOf(t),1),e.setState(Object(m.a)({},e.state,{data:a}))},600)})}}}),o.a.createElement(U.a,{closeIcon:!0,onClose:this.closeModal,open:this.state.displayModal},o.a.createElement(U.a.Header,null,"Patient Information"),o.a.createElement(U.a.Content,{scrolling:!0},o.a.createElement(U.a.Description,null,o.a.createElement(M.a,null,"Patient ID #",this.state.selectedPatient.patientId),o.a.createElement(X.a,null),o.a.createElement(Z.a,{onSubmit:this.handleSubmit},o.a.createElement(Z.a.Group,{widths:"equal"},o.a.createElement(Z.a.Field,{name:"patientName",value:this.state.selectedPatient.patientName,control:$.a,label:"Name",placeholder:"Patient Name",onChange:this.handleSelectChange}),o.a.createElement(Z.a.Field,{name:"patientAge",value:this.state.selectedPatient.patientAge,control:$.a,label:"Age",placeholder:"Patient age",onChange:this.handleSelectChange}),o.a.createElement(Z.a.Field,{name:"patientSex",control:ee.a,value:this.state.selectedPatient.patientSex,label:"Gender",options:ne,placeholder:"Gender",onChange:this.handleSelectChange})),o.a.createElement(Z.a.Group,{widths:"equal"},o.a.createElement(Z.a.Field,{name:"villageNumber",value:this.state.selectedPatient.villageNumber,control:$.a,label:"Village Number",placeholder:"Village Number",onChange:this.handleSelectChange}),o.a.createElement(Z.a.Field,{name:"isPregnant",value:this.state.selectedPatient.isPregnant,control:ee.a,label:"Pregant",options:ae,onChange:this.handleSelectChange})),o.a.createElement(Z.a.Field,{name:"drugHistory",value:this.state.selectedPatient.drugHistory||"",control:te.a,label:"Drug History",placeholder:"Patient's drug history...",onChange:this.handleSelectChange}),o.a.createElement(Z.a.Field,{name:"medicalHistory",value:this.state.selectedPatient.medicalHistory||"",control:te.a,label:"Medical History",placeholder:"Patient's medical history...",onChange:this.handleSelectChange}),o.a.createElement(Z.a.Field,{control:k.a},"Submit")))))):o.a.createElement("div",null)}}]),t}(a.Component),re=Object(l.connect)(function(e){var t=e.patients,n=e.user;return{patients:t,data:t.patientsList,user:n.currentUser}},function(e){return Object(i.b)({getPatients:b,getCurrentUser:B,getPosts:E},e)})(oe),le=function(e){function t(){var e,n;Object(T.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(N.a)(this,(e=Object(D.a)(t)).call.apply(e,[this].concat(o)))).state={email:"",password:""},n.handleChange=function(e){n.setState(Object(Q.a)({},e.target.name,e.target.value))},n.handleSubmit=function(e){e.preventDefault(),console.log("submitted!"),n.props.userPostFetch(n.state)},n}return Object(w.a)(t,e),Object(C.a)(t,[{key:"render",value:function(){return o.a.createElement("form",{onSubmit:this.handleSubmit,className:"content-box"},o.a.createElement("h1",null,"Sign Up"),o.a.createElement("label",null,"Email"),o.a.createElement("input",{name:"email",type:"email",value:this.state.email,onChange:this.handleChange}),o.a.createElement("br",null),o.a.createElement("label",null,"Password"),o.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleChange}),o.a.createElement("br",null),o.a.createElement("div",{className:"flexbox"},o.a.createElement("input",{className:"contant-submit white",type:"submit"}),o.a.createElement(R.a,{className:"link",style:{textDecoration:"none"},to:"/login"}," Login ")))}}]),t}(a.Component),ce=Object(l.connect)(null,function(e){return Object(i.b)({userPostFetch:q},e)})(le),ie=function(e){function t(){var e,n;Object(T.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(N.a)(this,(e=Object(D.a)(t)).call.apply(e,[this].concat(o)))).state={email:"",password:""},n.handleChange=function(e){n.setState(Object(Q.a)({},e.target.name,e.target.value))},n.handleSubmit=function(e){e.preventDefault(),n.props.userLoginFetch(n.state)},n}return Object(w.a)(t,e),Object(C.a)(t,[{key:"render",value:function(){return o.a.createElement("form",{onSubmit:this.handleSubmit,className:"content-box"},o.a.createElement("h1",null,"Login"),o.a.createElement("label",null,"Email"),o.a.createElement("input",{name:"email",type:"email",value:this.state.email,onChange:this.handleChange}),o.a.createElement("br",null),o.a.createElement("label",null,"Password"),o.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:this.handleChange}),o.a.createElement("br",null),o.a.createElement("div",{className:"flexbox"},o.a.createElement("input",{className:"contant-submit white",type:"submit"}),o.a.createElement(R.a,{className:"link",style:{textDecoration:"none"},to:"/signup"}," Sign up ")))}}]),t}(a.Component),se=Object(l.connect)(function(e){return{email:e.user.currentUser.email}},function(e){return Object(i.b)({userLoginFetch:z},e)})(ie),ue=function(e){function t(){return Object(T.a)(this,t),Object(N.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(w.a)(t,e),Object(C.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("header",{className:"flexbox"},o.a.createElement(R.a,{className:"link white",style:{textDecoration:"none"},to:"/"}," Home "),o.a.createElement(R.a,{className:"link white",style:{textDecoration:"none"},to:"/patients"}," Patients "),this.props.user.isLoggedIn?o.a.createElement("button",{className:"logout white",onClick:function(){return e.props.logoutUser()}},"Logout"):o.a.createElement(R.a,{className:"link white",style:{textDecoration:"none"},to:"/login"}," Login ")),o.a.createElement("main",null,o.a.createElement(I.Route,{exact:!0,path:"/",component:H}),o.a.createElement(I.Route,{exact:!0,path:"/patients",component:re}),o.a.createElement(I.Route,{exact:!0,path:"/signup",component:ce}),o.a.createElement(I.Route,{exact:!0,path:"/login",component:se})))}}]),t}(a.Component),me=Object(l.connect)(function(e){return{user:e.user.currentUser}},function(e){return Object(i.b)({logoutUser:W},e)})(ue),pe=(n(734),n(735),document.querySelector("#root"));Object(r.render)(o.a.createElement(l.Provider,{store:P},o.a.createElement(c.ConnectedRouter,{history:S},o.a.createElement("div",null,o.a.createElement(me,null)))),pe)}},[[449,1,2]]]);
//# sourceMappingURL=main.18a4a7e8.chunk.js.map