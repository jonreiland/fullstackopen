(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),r=n.n(c),u=n(15),o=n.n(u),s=n(6),i=n(3),l=function(e){var t=e.newSearch,n=e.setNewSearch,c=e.search;return Object(a.jsxs)("p",{children:["filter shown with"," ",Object(a.jsx)("input",{name:"search",value:t,onChange:function(e){n(e.target.value),c(e.target.value)}})]})},b=function(e){var t=e.newName,n=e.newNumber,c=e.handleInputChange,r=e.handleSubmit;return Object(a.jsxs)("form",{onSubmit:r,children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{name:"name",value:t,onChange:c}),Object(a.jsx)("br",{}),"number:"," ",Object(a.jsx)("input",{name:"number",value:n,onChange:c})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){var t=e.person,n=e.deletePerson;return Object(a.jsxs)("p",{children:[t.name," ",t.number," \xa0",Object(a.jsx)("button",{onClick:function(){return n(t.id)},children:"delete"})]},t.name)},d=function(e){var t=e.message;return null===t?null:Object(a.jsx)("div",{style:{color:"green",fontStyle:"italic",fontSize:24},className:"error",children:t})},m=n(4),h=n.n(m),f="/api/persons",O={getAll:function(){return h.a.get(f)},create:function(e){return h.a.post(f,e)},update:function(e,t){return h.a.put("".concat(f,"/").concat(e),t).then((function(e){return e.data}))},deletePerson:function(e){return h.a.delete("".concat(f,"/").concat(e))}},p=function(e){var t=e.message;return null===t?null:Object(a.jsx)("div",{style:{color:"red",fontStyle:"italic",fontSize:24},className:"error",children:t})},v=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),n=t[0],u=t[1],o=Object(c.useState)(n),m=Object(i.a)(o,2),h=m[0],f=m[1],v=Object(c.useState)(""),g=Object(i.a)(v,2),x=g[0],w=g[1],S=Object(c.useState)(""),y=Object(i.a)(S,2),N=y[0],C=y[1],k=Object(c.useState)(""),P=Object(i.a)(k,2),T=P[0],A=P[1],E=Object(c.useState)(null),I=Object(i.a)(E,2),z=I[0],J=I[1],L=Object(c.useState)(null),B=Object(i.a)(L,2),D=B[0],F=B[1];Object(c.useEffect)((function(){f(n)}),[n]),Object(c.useEffect)((function(){O.getAll().then((function(e){u(e.data)}))}),[]);var M=function(e){window.confirm("Are you sure you want to delete this person?")&&O.deletePerson(e).then(u(n.filter((function(t){return t.id!==e}))))},q=function(e){f(""===e?n:n.filter((function(t){return t.name.toLowerCase().includes(e.toLowerCase())})))};return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(p,{message:D}),Object(a.jsx)(d,{message:z}),Object(a.jsx)(l,{newSearch:x,setNewSearch:w,search:q}),Object(a.jsx)(b,{newName:N,newNumber:T,handleInputChange:function(e){"name"===e.target.name?C(e.target.value):"number"===e.target.name?A(e.target.value):(w(e.target.value),q(e.target.value))},handleSubmit:function(e){e.preventDefault();var t=n.find((function(e){return e.name===N}));if(t){if(window.confirm("".concat(t.name," is already added to the phonebook, replace the old number with a new one?"))){var a=Object(s.a)(Object(s.a)({},t),{},{number:e.target.number.value});O.update(a.id,a).then((function(e){u(n.map((function(t){return t.id!==a.id?t:e}))),J("".concat(a.name,"'s number has been updated")),setTimeout((function(){J(null)}),3e3)})).catch((function(e){console.log(e.response),F("".concat(a.name," has already been removed from the server")),setTimeout((function(){F(null)}),3e3)}))}}else O.create({name:N,number:T}).then((function(e){u(n.concat(e.data)),J("".concat(e.data.name," was successfully added to the server")),setTimeout((function(){J(null)}),3e3)})).catch((function(e){F("".concat(e.response.data.error)),setTimeout((function(){F(null)}),5e3)}))}}),Object(a.jsx)("h2",{children:"Numbers"}),h.map((function(e){return Object(a.jsx)(r.a.Fragment,{children:Object(a.jsx)(j,{person:e,deletePerson:M},e.name)},e.name)}))]})};o.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(v,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.33f2c199.chunk.js.map