webpackJsonp([1],{"9CLE":function(e,t,a){function n(e,t,a){return t in e?i(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var i=a("w4lV");e.exports=n},H596:function(e,t,a){function n(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=l(a);"function"==typeof s&&(n=n.concat(s(a).filter(function(e){return i(a,e).enumerable}))),n.forEach(function(t){c(e,t,a[t])})}return e}var i=a("iXSO"),s=a("dFFU"),l=a("6l/8"),c=a("9CLE");e.exports=n},PTxu:function(e,t,a){a("mcn1");var n=a("Paa9").Object;e.exports=function(e,t){return n.getOwnPropertyDescriptor(e,t)}},dFFU:function(e,t,a){e.exports=a("iIpu")},iIpu:function(e,t,a){a("Jv3j"),e.exports=a("Paa9").Object.getOwnPropertySymbols},iXSO:function(e,t,a){e.exports=a("PTxu")},jawP:function(e,t,a){"use strict";var n=a("6l/8"),i=a.n(n),s=a("IDPl"),l=a.n(s),c=a("cYhT"),r=a.n(c),o=a("bMv6"),m=a.n(o),d=a("Y+8b"),u=a.n(d),f=a("kLfz"),p=a.n(f),h=a("mG+w"),v=a.n(h),_=a("jGwe"),g=a("fiaM"),E=a("aSYM"),y=a("nVDU"),b=a("Ue9x"),w=v.a.createElement("i",{className:"iconfont icon-goback"}),k=v.a.createElement("span",null,"Back"),N=v.a.createElement("div",{className:"mid_title"},"Write a Review"),x=v.a.createElement("a",{className:"right_link"}),S=v.a.createElement("button",{type:"submit",className:"send_btn send_ok_btn btn_send"},"DONE"),C=v.a.createElement("button",{type:"submit",disabled:!0,className:"send_btn "},"DONE"),j=function(e){function t(e){var a;return l()(this,t),a=u()(this,p()(t).call(this,e)),a.send=function(e,t,n,i){var s=a.state;s.list,s.last_date;Object(y.a)(E.a,{content:e,to_uid:t,meet_id:n,knp:i}).then(function(e){Object(g.a)(e)?window.layer.open({content:"Comment on success",btn:"I got it!",shadeClose:!1,yes:function(e){window.layer.close(e),a.props.cancelReview()}}):(alert(e.msg),e.knp&&a.setState({user_knp:e.knp}))})},a.load=function(){Object(y.a)(E.c).then(function(e){Object(g.a)(e)&&a.setState({user_knp:e.data})})},a.keyDownSearch=function(e){var t=e||window.event;return 13!=(t.keyCode||t.which||t.charCode)||(a.sendMsg(),!1)},a.changeContent=function(e){a.setState({content:e.target.value})},a.sendMsg=function(e){e.preventDefault();var t=a.state,n=t.content,i=t.knp,s=t.user_knp,l=a.props,c=l.item,r=l.meet_id,o=parseInt(i);if(o>0){if(o>s)return void(0==s?alert("No available KNP please set to 0"):alert("Total KNP You Have: "+s+" KNP"))}else if(0!=o)return void alert("KNP must be greater than or equal to 0.\n");a.send(n,c.to_uid,r,o)},a.changeKnp=function(e){a.setState({knp:e.target.value})},a.state={content:"",knp:"",user_knp:0},a}return m()(t,[{key:"componentWillMount",value:function(){this.load()}},{key:"render",value:function(){var e=this,t=(this.props.visible,this.state),a=t.content,n=t.knp,i=t.user_knp,s=a.replace(/(^\s*)|(\s*$)/g,"");return v.a.createElement(_.Content,{style:{zIndex:99}},v.a.createElement(_.Popup,{direction:"right",visible:!0},v.a.createElement("div",{className:"layui-m-layerchild "},v.a.createElement("div",{className:"mod_center",style:{position:"fixed",left:"0px",bottom:"0px",left:"0px",top:"0px",right:"0px",display:"table"}},v.a.createElement("div",{className:"mod_header","data-flex":"dir:left cross:center main:justify"},v.a.createElement("a",{className:"left_link",href:"javascript:void(0)",onClick:this.props.cancelReview},w,k),N,x),v.a.createElement("div",{className:"message_content message_content_preview"},v.a.createElement("div",{className:"message_panel"},v.a.createElement("form",{"data-flex":"dir:top cross:center",style:{width:"100%"},onSubmit:function(t){return e.sendMsg(t)}},v.a.createElement("div",{"data-flex":"dir:left",style:{width:"100%"}},v.a.createElement("label",null,"KNP ",v.a.createElement("span",{style:{color:"red"}},"*"))),v.a.createElement("input",{placeholder:"Total KNP You Have: ".concat(i," KNP"),value:n,onChange:this.changeKnp,className:"input_content",style:{width:"100%"}}),v.a.createElement("div",{"data-flex":"dir:left",style:{width:"100%"}},v.a.createElement("label",null,"Review ",v.a.createElement("span",{style:{color:"red"}},"*"))),v.a.createElement("textarea",{value:a,onChange:this.changeContent}),s.length>0?S:C)))))))}}]),r()(t,e),t}(h.PureComponent),R=a("kY3M");a.d(t,"a",function(){return q});var M=v.a.createElement("i",{className:"iconfont icon-goback"}),O=v.a.createElement("span",null,"Back"),I=v.a.createElement("div",{className:"layim-chat-text"}),P=v.a.createElement("button",{type:"submit",className:"btn btn_send"},"Send"),D=v.a.createElement("button",{type:"submit",disabled:!0,className:"btn"},"Send"),q=function(e){function t(e){var a;return l()(this,t),a=u()(this,p()(t).call(this,e)),a.sendMsg=function(e){return e.preventDefault(),a.timer2&&window.clearTimeout(a.timer2),a.timer2=window.setTimeout(function(){var e=a.state.content,t=e.replace(/(^\s*)|(\s*$)/g,"");if(t){var n=a.props.item;a.send(t,n.to_uid)}},200),!1},a.load=function(e,t,n){var i=a.state,s=i.not_id,l=i.list,c=i.first_id,r=a.props.item;Object(y.a)(E.g,{to_id:r.to_uid,last_date:e,is_history:t,last_id:n,not_id:s}).then(function(e){Object(g.a)(e)&&(1==t?a.setState({is_history:e.data.is_history,first_id:e.data.first_id,first_date:e.data.first_date,list:e.data.list.concat(l),request_count:e.data.count,meet:e.data.meet}):(Object(g.b)(c)?a.setState({is_history:e.data.is_history,last_date:e.data.last_date,last_id:e.data.last_id,list:l.concat(e.data.list),meet:e.data.meet}):a.setState({is_history:e.data.is_history,first_id:e.data.first_id,first_date:e.data.first_date,last_date:e.data.last_date,last_id:e.data.last_id,list:l.concat(e.data.list),request_count:e.data.count,meet:e.data.meet}),e.data.list&&e.data.list.length>0&&(a.dom2.style.display="none",a.scrollDom())))})},a.scrollDom=function(){setTimeout(function(){a.dom&&(a.dom.scrollTop=a.dom.scrollHeight)})},a.send=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=a.state,s=(i.list,i.last_date,a.props.group);Object(y.a)(E.h,{content:e,to_uid:t,msg_type:n,group:s}).then(function(t){Object(g.a)(t)&&(a.setState({content:"",is_meet:1==n?1:0}),a.dom2.children[1].innerHTML=e,a.dom2.removeAttribute("style"),a.scrollDom())})},a.keyDownSearch=function(e){var t=e||window.event;return 13!=(t.keyCode||t.which||t.charCode)||(a.sendMsg(),!1)},a.changeContent=function(e){a.setState({content:e.target.value})},a.showMsg=function(){var e=a.state.list,t=[];return e&&e.length>0&&e.map(function(e,n){10==e.msg_type?t.push(v.a.createElement("li",{key:n,className:"layim-chat-system"},v.a.createElement("span",null,e.msg))):0==e.msg_type?1==e.is_self?t.push(v.a.createElement("li",{key:n,className:"layim-chat-li"},v.a.createElement("div",{className:"layim-chat-user"},v.a.createElement("img",{src:e.from_headpic}),v.a.createElement("cite",null,e.from_nickname)),v.a.createElement("div",{className:"layim-chat-text"},e.msg))):t.push(v.a.createElement("li",{key:n,className:"layim-chat-li layim-chat-mine"},v.a.createElement("div",{className:"layim-chat-user"},v.a.createElement("img",{onClick:function(){return a.showUserInfo(e.from_uid)},src:e.from_headpic}),v.a.createElement("cite",null,e.from_nickname)),v.a.createElement("div",{className:"layim-chat-text"},e.msg))):1==e.msg_type&&t.push(v.a.createElement("li",{key:n,className:"layim-chat-system"},v.a.createElement("div",{"data-felx":"dir:top cross:center main:center"},v.a.createElement("font",{style:{fontSize:"16px",borderRadius:"3px",background:"#afafaf",color:"#fff",padding:"1px",marginBottom:"5px"}},"System"),v.a.createElement("div",{style:{marginTop:"10px"},"data-flex":"cross:center main:center"},v.a.createElement("span",{style:{backgroundColor:"#afafaf",lineHeight:"20px"}},Object(g.c)(e.msg))))))}),t},a.showHistory=function(){var e=a.state,t=e.first_date,n=e.first_id;a.load(t,1,n)},a.getRef=function(e){a.dom=e},a.getRef2=function(e){a.dom2=e},a.autoLoad=function(e,t){if(Object(g.b)(a.timer)&&a.timer&&window.clearInterval(a.timer),1==e){var n=t;a.timer=window.setInterval(function(){0==n?(n=t,a.load(a.state.last_date,0,a.state.last_id)):n--},1e3)}},a.RequestMeet=function(){a.send("You have requested a meet up. Please wait for reply.",a.props.item.to_uid,1)},a.agreeMeet=function(){var e=a.state;e.list,e.last_date;Object(y.a)(E.d,{meet_id:a.state.meet.oid,to_id:a.props.item.to_uid}).then(function(e){Object(g.a)(e)})},a.RequestReview=function(){a.state.visible;a.setState({visible:!0})},a.cancelReview=function(){a.state.visible;a.setState({visible:!1})},a.showUserInfo=function(e){a.setState({visible_user:!0,view_user_id:e})},a.getInputRef=function(e){a.msg_panel=e},a.clickInput=function(e){},a.state={content:"",list:[],last_id:"",not_id:"",request_count:0,first_date:"",first_id:"",is_meet:0,meet:{},visible:!1,visible_user:!1,view_user_id:0},a.dom="",a.dom2="",a.timer="",a.msg_panel="",a.timer2="",a}return m()(t,[{key:"componentWillMount",value:function(){var e=this;this.load(void 0,void 0,void 0),setTimeout(function(){e.autoLoad(!0,1)},1e3)}},{key:"componentWillUnmount",value:function(){Object(g.b)(this.timer)&&this.timer&&window.clearInterval(this.timer)}},{key:"componentDidMount",value:function(){this.msg_panel.focus(),this.dom.scrollTop=1e5}},{key:"render",value:function(){var e=this,t=this.props,a=t.item,n=t.onCancel,s=this.state,l=s.content,c=s.request_count,r=s.is_meet,o=s.meet,m=s.visible,d=s.visible_user,u=s.view_user_id,f=l.replace(/(^\s*)|(\s*$)/g,"");return v.a.createElement(_.Content,null,v.a.createElement(_.Popup,{visible:!0},v.a.createElement("div",{className:"layui-m-layerchild "},v.a.createElement("div",{className:"mod_center",style:{position:"fixed",left:"0px",bottom:"0px",left:"0px",top:"0px",right:"0px",display:"table"}},v.a.createElement("div",{className:"mod_header","data-flex":"dir:left cross:center main:justify"},v.a.createElement("a",{className:"left_link",onClick:n,href:"javascript:void(0)"},M,O),v.a.createElement("div",{className:"mid_title"},a.nickname)),0==r&&0==i()(o).length&&v.a.createElement("div",{className:"send_top_tips",style:{zIndex:"999",position:"relative",background:"#fff"}},"You can request a meet up with him/her ",v.a.createElement("a",{onClick:this.RequestMeet,href:"javascript:void(0)"},"Request")),1==r&&(0==i()(o).length||0==o.status)&&1==o.is_self||1==o.is_self&&0==o.status&&v.a.createElement("div",{className:"send_top_tips",style:{zIndex:"999",position:"relative",background:"#fff"}},"You have requested a meet up. Please wait for reply."),i()(o).length>0&&1==o.status&&0==o.is_comment&&v.a.createElement("div",{className:"send_top_tips",style:{zIndex:"999",position:"relative",background:"#fff"}},"How do you think of her/him after meet? ",v.a.createElement("a",{onClick:this.RequestReview,href:"javascript:void(0)"},"Review")),i()(o).length>0&&1==o.status&&1==o.is_comment&&o.last_comment_uid!=b.a.uid&&v.a.createElement("div",{className:"send_top_tips",style:{zIndex:"999",position:"relative",background:"#fff"}},"How do you think of her/him after meet? ",v.a.createElement("a",{onClick:this.RequestReview,href:"javascript:void(0)"},"Review")),i()(o).length>0&&0==o.status&&0==o.is_comment&&0==o.is_self&&v.a.createElement("div",{className:"send_top_tips",style:{zIndex:"999",position:"relative",background:"#fff"}},v.a.createElement("span",{style:{color:"#2196f3"}},o.nickname)," has requested a meet up. ",v.a.createElement("a",{onClick:this.agreeMeet,href:"javascript:void(0)"},"AGREE")),v.a.createElement("div",{className:"message_content",style:{background:"#eee"}},v.a.createElement("div",{ref:this.getRef,className:"message_panel layim-chat-main"},v.a.createElement("ul",{style:{marginTop:"20px"}},5==c&&v.a.createElement("li",{className:"layim-chat-system"},v.a.createElement("span",{onClick:this.showHistory,style:{background:"#47a8f5"}},"Click to load more")),this.showMsg(),v.a.createElement("li",{style:{display:"none"},ref:this.getRef2,className:"layim-chat-li"},v.a.createElement("div",{className:"layim-chat-user"},v.a.createElement("img",{src:b.a.headpic}),v.a.createElement("cite",null,b.a.nickname)),I)))),v.a.createElement("div",{"data-flex":"dir:left box:last cross:center",className:"footer_send_content footer_send_content1"},v.a.createElement("form",{"data-flex":"dir:left box:last cross:center",style:{width:"100%"},onSubmit:function(t){return e.sendMsg(t)}},v.a.createElement("input",{"for-scroll":"122112",ref:this.getInputRef,value:l,onChange:this.changeContent,type:"text"}),f.length>0?P:D)))),m&&v.a.createElement(j,{meet_id:o.oid,cancelReview:this.cancelReview,style:{zIndex:99},item:this.props.item,visible:m}),d&&v.a.createElement(R.a,{cancelReview:function(){e.setState({visible_user:!1})},uid:u})))}}]),r()(t,e),t}(h.PureComponent)},mcn1:function(e,t,a){var n=a("wniH"),i=a("TwgT").f;a("rWSb")("getOwnPropertyDescriptor",function(){return function(e,t){return i(n(e),t)}})},xJQ3:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a.d(t,"default",function(){return M});var n=a("H596"),i=a.n(n),s=a("IDPl"),l=a.n(s),c=a("cYhT"),r=a.n(c),o=a("bMv6"),m=a.n(o),d=a("Y+8b"),u=a.n(d),f=a("kLfz"),p=a.n(f),h=a("mG+w"),v=a.n(h),_=(a("Ue9x"),a("fiaM")),g=a("nVDU"),E=a("aSYM"),y=a("EkNY"),b=a("jawP"),w=a("/yVg"),k=a.n(w),N=a("kY3M"),x=v.a.createElement("font",null),S=v.a.createElement("h3",{"data-flex":"corss:center main:left"},"Want to Share\uff1a"),C=v.a.createElement("h3",{"data-flex":"corss:center main:left"},"Want to Learn\uff1a"),j=v.a.createElement(k.a,{className:"left_link",to:"/"},v.a.createElement("i",{className:"iconfont icon-goback"}),v.a.createElement("span",null,"Back")),R=v.a.createElement("i",{className:"iconfont icon-more_light"}),M=function(e){function t(e){var a;l()(this,t),a=u()(this,p()(t).call(this,e)),a.load=function(){var e=a.state,t=e.tag,n=e.keyword,s=e.ids,l=e.list;a.setState({loading:!0,msg:"Loading"}),Object(g.a)(E.f,{tag:t,keyword:n,ids:s}).then(function(e){Object(_.a)(e)&&(0==s?a.setState(i()({loading:!1},e.data,{load_count:e.data.list.length,msg:0==e.data.list.length?"No data was found":""})):a.setState({loading:!1,list:l.concat(e.data.list),ids:e.data.ids,load_count:e.data.list.length,msg:""}))})},a.sendMsg=function(e){a.setState({visible:!0,send_item:e})},a.onCancel=function(){a.setState({visible:!1})},a.showUserInfo=function(e){a.setState({visible_user:!0,view_user_id:e})},a.loadData=function(){var e=a.state,t=e.list,n=(e.load_count,[]);return t.map(function(e,t){var i=[];e.comments&&e.comments.length>0&&e.comments.map(function(e,t){i.push(v.a.createElement("li",{key:t,className:"layim-chat-li layim-chat-mine"},v.a.createElement("div",{onClick:function(){a.showUserInfo(e.oid)},className:"layim-chat-user"},v.a.createElement("img",{src:e.comments_headpic}),v.a.createElement("cite",null,e.comments_nickname)),v.a.createElement("div",{className:"layim-chat-text"},e.content)))}),n.push(v.a.createElement("div",{key:t,className:"share_item"},v.a.createElement("div",{"data-flex":"dir:top corss:center main:center",className:"info_header"},v.a.createElement("div",{className:"user_info_nickname"},v.a.createElement("span",{"data-flex":"corss:center main:center"},t+1,". LivAwayer: ",e.nickname),x),v.a.createElement("div",{onClick:function(){a.showUserInfo(e.oid)},"data-flex":"corss:center main:center"},v.a.createElement("img",{src:e.headpic})),v.a.createElement("div",{"data-flex":"corss:center main:left",className:"info_desc"},v.a.createElement("p",null,e.desc)),S,v.a.createElement("div",{style:{color:"#000"}},e.share),C,v.a.createElement("div",{style:{color:"#000"}},e.learn)),e.comments&&e.comments.length>0&&v.a.createElement("div",{"data-flex":"cross:center main:center",className:"info_view_line"},v.a.createElement("span",null,"KINDNESS Review(",e.comments?e.comments.length:0,")")),v.a.createElement("ul",{style:{padding:"16px"}},i),v.a.createElement("div",{className:"btn_send_up"},v.a.createElement("a",{onClick:function(){return a.sendMsg({to_uid:e.oid,nickname:e.nickname,headpic:e.headpic})},href:"javascript:void(0)"},"Send message to request meet up"))))}),n};var n=e.location,s=n.query.t,c=n.query.k;"share"!=s&&"learn"!=s&&(s="share"),document.title=window.title+" - KINDNESS EXCHANGE";var r=c;return"all"==c&&(r="Anything"),a.state={tag:s,keyword:c,ids:"0",list:[],loading:!1,load_count:0,msg:"",visible:!1,send_item:{},desc:r,visible_user:!1,view_user_id:0},a}return m()(t,[{key:"componentWillMount",value:function(){this.load()}},{key:"render",value:function(){var e=this,t=this.state,a=(t.list,t.loading),n=t.load_count,i=t.ids,s=t.msg,l=t.send_item,c=t.visible,r=t.tag,o=t.desc,m=t.view_user_id,d=t.visible_user;return v.a.createElement("div",{className:"layui-m-layerchild "},v.a.createElement("div",{className:"mod_center",style:{position:"fixed",left:"0px",bottom:"0px",left:"0px",top:"0px",right:"0px",display:"table"}},v.a.createElement("div",{className:"mod_header","data-flex":"dir:left cross:center main:justify"},j,v.a.createElement("div",{className:"mid_title"},"share"==r?"LivAwayers who share ".concat(o):"LivAwayers who'd like to learn ".concat(o))),v.a.createElement("div",{className:"message_content message_content_message"},"0"==i?v.a.createElement(y.a,{requestData:this.load,loading:a,msg:s}):v.a.createElement("div",{className:"message_panel layim-chat-main"},v.a.createElement("div",{className:"list_share_panel"},this.loadData()),5==n&&v.a.createElement("div",{style:{padding:"16px"}},v.a.createElement("button",{onClick:this.load,className:"send_btn more_btn"},"MORE",R))))),c&&v.a.createElement(b.a,{group:"share"==r?1:0,onCancel:this.onCancel,visible:c,item:l}),d&&v.a.createElement(N.a,{cancelReview:function(){e.setState({visible_user:!1})},uid:m}))}}]),r()(t,e),t}(h.PureComponent)}});