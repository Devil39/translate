(this.webpackJsonponefourthlabstask=this.webpackJsonponefourthlabstask||[]).push([[0],{10:function(t,e,a){t.exports=a(21)},15:function(t,e,a){},16:function(t,e,a){},20:function(t,e,a){},21:function(t,e,a){"use strict";a.r(e);var n=a(0),l=a.n(n),s=a(9),o=a.n(s),i=(a(15),a(2)),r=a(3),c=a(5),u=a(4),g=a(6),d=(a(16),a(1)),h=a.n(d),m=(l.a.Component,a(7)),b=a.n(m),p=(a(20),function(t){function e(){var t;return Object(i.a)(this,e),(t=Object(c.a)(this,Object(u.a)(e).call(this))).replaceAt=function(t,e,a){return t.substr(0,e)+a+t.substr(e+a.length)},t.langChange=function(e){console.log(e.target.value),h.a.save("translateWebsite",JSON.stringify({lang:e.target.value})),t.setState({lang:e.target.value}),document.getElementById("textarea").focus()},t.fetchCall=function(e,a){return a&&t.setState({disabled:!0}),new Promise((function(n,l){fetch("".concat("http://146.148.85.67/processWordJSON","?inString=").concat(e,"&lang=").concat(h.a.load("translateWebsite").lang),{method:"get"}).then((function(e){return 200===e.status&&(t.setState({loading:!1}),document.getElementById("textarea").focus()),e})).then((function(t){return t.json()})).then((function(e){console.log(e),t.setState({translation:e.itrans}),t.setState({translation_list:e.twords[0].options}),a&&t.setState({disabled:!1}),n()})).catch((function(e){console.log(e),t.setState({disabled:!1}),l()}))}))},t.translate=function(e){var a,n,l,s;return b.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:if("english"!==t.state.lang){o.next=2;break}return o.abrupt("return");case 2:if(1!==e.key.length||!(e.key>="a"&&e.key<="z"||e.key>="A"&&e.key<="Z")){o.next=8;break}t.setState({text:t.state.text+e.key}),console.log("(1)Sending Request for: "+t.state.text+e.key),t.fetchCall(t.state.text+e.key),o.next=38;break;case 8:if(" "!==e.key&&","!==e.key&&"."!==e.key&&"!"!==e.key&&"?"!==e.key){o.next=29;break}return a=e.key,console.log("Setting the word"),t.setState({text:"",disabled:!0}),n=document.getElementById("textarea").value,l=document.getElementById("textarea").value,n=t.replaceAt(n,n.length-1," "),console.log(n),console.log("(2)Sending Request for: "+n.split(e.key)[n.split(e.key).length-1]),o.next=19,b.a.awrap(t.fetchCall(n.split(" ")[n.split(" ").length-2],!0));case 19:return o.next=21,b.a.awrap(console.log(t.state.translation));case 21:s=n.split(" ")[n.split(" ").length-2].length+1,console.log(n.length-s),console.log(n.length-2),console.log(n.substr(0,n.length-s)+t.state.translation+" "),console.log(a),document.getElementById("textarea").value=" "!==a?n.substr(0,n.length-s)+t.state.translation+a+" ":n.substr(0,n.length-s)+t.state.translation+" ",o.next=38;break;case 29:if("Backspace"!==e.key){o.next=38;break}if(l=document.getElementById("textarea").value,console.log(l[l.length])," "!==l[l.length-1]&&","!==l[l.length-1]&&"."!==l[l.length-1]&&"?"!==l[l.length-1]&&"!"!==l[l.length-1]){o.next=34;break}return o.abrupt("return");case 34:t.setState({text:document.getElementById("textarea").value}),l=l.substr(0,l.length).split(" ").splice(-1),console.log("(3)Sending Request for: "+l),t.fetchCall(l);case 38:case"end":return o.stop()}}))},t.translateWordChange=function(e){t.setState({translation:e.target.value});var a=document.getElementById("textarea").value.split(" ");a[a.length-1]=e.target.value,t.setState({text:a.join(" ")}),console.log(a.join(" ")),document.getElementById("textarea").value=a.join(" ")+" ",document.getElementById("textarea").focus()},t.changeText=function(e){if(e.target.value=document.getElementById("textarea").value,t.setState({text:e.target.value}),8===e.keyCode)return console.log("Backspace"),void console.log(e.key);if(t.state.disabled){var a=e.target.value.split(" ").slice(-1)[0];a.slice(-1);if(""!==a)t.setState({loading:!0,disabled:!1}),console.log("Sending Request!"),fetch("http://146.148.85.67/processWordJSON?inString=".concat(a,"&lang=").concat(h.a.load("translateWebsite").lang),{method:"get"}).then((function(e){return 200===e.status&&(t.setState({loading:!1,disabled:!0}),document.getElementById("textarea").focus()),e})).then((function(t){return t.json()})).then((function(e){console.log(e),t.setState({translation:e.itrans}),t.setState({translation_list:e.twords[0].options}),document.getElementById("textarea").value=t.state.text})).catch((function(t){console.log(t)}));else{var n=e.target.value.split(" ");n[n.length-2]=t.state.translation,t.setState({text:n.join(" ")}),document.getElementById("textarea").value=n.join(" ")}}},t.state={text:"",translation:"",loading:!1,translation_list:"",disabled:!1,lang:"hindi"},t}return Object(g.a)(e,t),Object(r.a)(e,[{key:"componentWillMount",value:function(){h.a.save("translateWebsite",JSON.stringify({lang:"hindi"}))}},{key:"render",value:function(){var t=this;return l.a.createElement("div",{className:"main-container"},l.a.createElement("div",null,l.a.createElement("div",{className:"currentLangContainer"},"Current Language: ",this.state.lang.toUpperCase()),l.a.createElement("div",{className:"langOption-container"},l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"hindi"},"Hindi"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"tamil"},"Tamil"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"telugu"},"Telugu"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"bengali"},"Bengali"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"gujarati"},"Gujarati"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"marathi"},"Marathi"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"kannada"},"Kannada"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"malayalam"},"Malayalam"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"punjabi"},"Punjabi"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"nepali"},"Nepali"),l.a.createElement("button",{type:"button",className:"btn-lang",onClick:this.langChange,value:"english"},"English")),l.a.createElement("div",{className:"textbox-container"},l.a.createElement("textarea",{className:"textbox",id:"textarea",disabled:this.state.disabled,rows:"10",cols:"60",onKeyUp:function(e){t.translate(e)},autoFocus:!0})),l.a.createElement("div",{className:"translation-container"},l.a.createElement("div",null,this.state.loading?l.a.createElement("div",null,l.a.createElement("p",null,l.a.createElement("button",{type:"button",className:"btn-translation"},"Loading..."))):l.a.createElement("div",{className:"btn-wrapper"},l.a.createElement("p",null,this.state.translations),""!==this.state.translation_list?this.state.translation_list.map((function(e){return l.a.createElement("button",{type:"button",id:e,className:"btn-translation",value:e,onClick:t.translateWordChange},e)})):l.a.createElement("div",null))))))}}]),e}(l.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[10,1,2]]]);
//# sourceMappingURL=main.645454ed.chunk.js.map