(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{14:function(e,t,n){e.exports=n(36)},36:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(13),r=n.n(o),u=n(2),l=n(3),i=n.n(l),d="/api/persons",m=function(){return i.a.get(d).then((function(e){return e.data}))},s=function(e){return i.a.post(d,e).then((function(e){return e.data}))},f=function(e){return i.a.delete("".concat(d,"/").concat(e)).then((function(e){return e}))},p=function(e,t){return console.log("updatedContactObject",e),console.log("id",t),i.a.put("".concat(d,"/").concat(t),e).then((function(e){return e.data}))},b=function(e){var t=e.newSearch,n=e.typeNameForFiltering;return c.a.createElement("div",null,"filter contacts by name:",c.a.createElement("input",{value:t,onChange:n,placeholder:"add contact name to filter..."}))},h=function(e){var t=e.addNewContact,n=e.newName,a=e.typeContactName,o=e.newNumber,r=e.typeContactNumber;return c.a.createElement("form",{onSubmit:t},c.a.createElement("div",null,"name:",c.a.createElement("input",{value:n,onChange:a,placeholder:"add new contact..."})),c.a.createElement("div",null,"number:",c.a.createElement("input",{value:o,onChange:r,placeholder:"add contact's number..."})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"add")))},g=function(e){var t=e.persons,n=e.newSearch,a=e.deleteContact,o=n.length>0?t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})):t;return c.a.createElement("ul",null,o.map((function(e,t){return c.a.createElement("li",{key:e.name+t},c.a.createElement("span",null,e.name,": ",e.number),c.a.createElement("button",{onClick:function(){return a(e)}},"delete"))})))},v=function(e){var t=e.newFeedback,n={display:"inline-block",padding:"1rem",fontWeight:700,border:"1px solid",borderColor:t.success?"green":"red",backgroundColor:t.success?"lightgreen":"orange"};return t?c.a.createElement("div",{style:n},t.message):null},E=function(){Object(a.useEffect)((function(){m().then((function(e){o(e)}))}),[]);var e=Object(a.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],r=Object(a.useState)(""),l=Object(u.a)(r,2),i=l[0],d=l[1],E=Object(a.useState)(""),w=Object(u.a)(E,2),C=w[0],y=w[1],N=Object(a.useState)(""),j=Object(u.a)(N,2),O=j[0],k=j[1],S=Object(a.useState)(""),F=Object(u.a)(S,2),U=F[0],A=F[1],I=function(){d(""),y("")};return c.a.createElement("div",null,c.a.createElement("h2",null,"Phonebook"),c.a.createElement(b,{newSearch:O,typeNameForFiltering:function(e){k(e.target.value)}}),c.a.createElement(v,{newFeedback:U}),c.a.createElement("h2",null,"Add new contact"),c.a.createElement(h,{newName:i,typeContactName:function(e){d(e.target.value)},newNumber:C,typeContactNumber:function(e){y(e.target.value)},addNewContact:function(e){if(e.preventDefault(),i&&C){var t={name:i,number:C};if(c=i,n.every((function(e){return e.name!==c})))s(t).then((function(e){console.log("added contact:",e),o(n.concat(e)),A({message:"Added ".concat(i.toUpperCase(),"!"),success:!0}),I(),setTimeout((function(){A(!1)}),3e3)}));else if(window.confirm("".concat(i," is already added to phonebook. Replace the old number with a new one?"))){var a=n.find((function(e){return e.name===i})).id;console.log("contactId:",a),p(t,a).then((function(e){console.log("updatedContact:",e),o(n.map((function(t){return t.id!==e.id?t:e}))),A({message:"Updated ".concat(e.name.toUpperCase(),"'s number!"),success:!0}),I(),setTimeout((function(){A(!1)}),3e3)})).catch((function(e){A({message:"Information of ".concat(t.name.toUpperCase()," has already been removed from the server!"),success:!1}),setTimeout((function(){A(!1)}),3e3)}))}}else alert("Add both name and number!");var c}}),c.a.createElement("h2",null,"Numbers"),c.a.createElement(g,{persons:n,newSearch:O,deleteContact:function(e){window.confirm("Delete ".concat(e.name,"?"))&&f(e.id).then((function(t){console.log("deleted contact:",t),o(n.filter((function(t){return t.id!==e.id})))}))}}))};r.a.render(c.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.28b17646.chunk.js.map