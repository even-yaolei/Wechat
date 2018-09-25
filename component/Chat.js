import React,{PureComponent} from 'react';
import {Icon,Button} from 'bee-mobile';
import {Popup,Content } from 'bee-mobile';
import {checkResult, isNotNull,renderHTML} from "../utils/helper";
import {SEND_MSG,SEND_LIST,JIANMIAN} from "../config";
import {request} from "../utils/request";
import {appUser} from "../utils/appStorage";
import Review from "./Review";
import UserView from "./UserView";
export default class Chat extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            content:"",
            list:[],
            last_id:"",
            not_id:"",
            request_count:0,
            first_date:"",
            first_id:"",
            is_meet:0,
            meet:{},
            visible:false,
            visible_user:false,view_user_id:0
        };
        this.dom="";
        this.dom2="";
        this.timer="";
        this.msg_panel="";
        this.timer2="";
    }
    sendMsg=(e)=>{
       e.preventDefault();
       if(this.timer2){
           window.clearTimeout(this.timer2)
       }
        this.timer2=window.setTimeout(()=>{
            const {content}=this.state;
            let value=content.replace(/(^\s*)|(\s*$)/g, "");
            if(value){
                const {item}=this.props;
                this.send(value,item.to_uid);
            }
        },200)
       return false;
    }
    componentWillMount(){
        this.load(undefined,undefined,undefined);
        setTimeout(()=>{
            this.autoLoad(true,1);
        },1000)
    }
    componentWillUnmount(){
        if(isNotNull(this.timer) && this.timer){
            window.clearInterval(this.timer);
        }
    }
    load=(last_date,is_history,last_id)=>{
        const {not_id,list,first_id}=this.state;
        const {item}=this.props;
        request(SEND_LIST,{to_id:item.to_uid,last_date,is_history,last_id,not_id}).then(result=>{
            if(checkResult(result)){
                //不是加历史记录
                if(is_history==1){
                    this.setState({
                        is_history:result.data.is_history,
                        first_id:result.data.first_id,
                        first_date:result.data.first_date,
                        list:result.data.list.concat(list),
                        request_count:result.data.count,
                        meet:result.data.meet
                    });
                //是加载历史记录
                }else{
                    if(!isNotNull(first_id)){
                        this.setState({
                            is_history:result.data.is_history,
                            first_id:result.data.first_id,
                            first_date:result.data.first_date,
                            last_date:result.data.last_date,
                            last_id:result.data.last_id,
                            list:list.concat(result.data.list),
                            request_count:result.data.count,
                            meet:result.data.meet
                        });
                    }else{
                        this.setState({
                            is_history:result.data.is_history,
                            last_date:result.data.last_date,
                            last_id:result.data.last_id,
                            list:list.concat(result.data.list),
                            meet:result.data.meet
                        });
                    }
                    //如果是有聊天记录 则 滚动到底部
                    if(result.data.list && result.data.list.length>0){
                        this.dom2.style.display="none";
                        this.scrollDom();
                    }
                }
            }
        });
    }
    scrollDom=()=>{
        setTimeout(()=>{
            if(this.dom){
                this.dom.scrollTop = this.dom.scrollHeight;
            }
        })
    }



    //group:1表示分享 0表示学习
    send=(content,to_uid,msg_type=0)=>{
        const {list,last_date}=this.state;
        const {group}=this.props;


        request(SEND_MSG,{content,to_uid,msg_type,group}).then(result=>{
            if(checkResult(result)){
                this.setState({
                  //  last_date:result.date,
                    content:"",
                    is_meet:msg_type==1?1:0
                });
                 this.dom2.children[1].innerHTML=content;
                 this.dom2.removeAttribute("style");
                this.scrollDom();
            }
        });
    }
    keyDownSearch=(e)=> {
        // 兼容FF和IE和Opera
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            this.sendMsg();
            return false;
        }
        return true;
    }
    componentDidMount(){
        this.msg_panel.focus();
        this.dom.scrollTop =100000;
    }
    changeContent=(e)=>{
        this.setState({
            content:e.target.value
        });
    }

    showMsg=()=>{
        const {list}=this.state;
        let content=[];
        if(list && list.length>0){
            list.map((item,key)=>{
                //时间
                    if(item.msg_type==10){
                        content.push(<li key={key} className="layim-chat-system"><span>{item.msg}</span></li>)
                        //普通消息
                    }else if(item.msg_type==0){
                        if(item.is_self==1){
                            content.push(<li key={key} className="layim-chat-li"><div className="layim-chat-user"><img src={item.from_headpic} /><cite>{item.from_nickname}</cite></div><div className="layim-chat-text">{item.msg}</div></li>)
                        }else{
                            content.push(<li key={key} className="layim-chat-li layim-chat-mine"><div className="layim-chat-user"><img onClick={()=>this.showUserInfo(item.from_uid)} src={item.from_headpic} /><cite>{item.from_nickname}</cite></div><div className="layim-chat-text">{item.msg}</div></li>)
                        }
                    }else if(item.msg_type==1){
                        content.push(<li key={key} className="layim-chat-system">
                            <div data-felx="dir:top cross:center main:center">
                                <font style={{
                                    fontSize:"16px",
                                    borderRadius: "3px",
                                    background: "#afafaf",
                                    color: "#fff",
                                    padding: "1px",
                                    marginBottom: "5px"
                                }}>System</font>
                                <div style={{marginTop:"10px"}} data-flex="cross:center main:center"><span style={{backgroundColor: "#afafaf","lineHeight":"20px"}}>{renderHTML(item.msg)}</span></div>
                            </div>
                        </li>)
                    }
            });
        }
        return content;
    }
    showHistory=()=>{
        const {first_date,first_id}=this.state;
        this.load(first_date,1,first_id);
    }

    getRef=(ref)=>{
        this.dom=ref;
    }
    getRef2=(ref)=>{
        this.dom2=ref;
    }

    autoLoad=(is_auto,_second)=>{
        if(isNotNull(this.timer) && this.timer){
            window.clearInterval(this.timer);
        }
        if(is_auto==true){
            let _second1=_second;
            this.timer=window.setInterval(()=>{
                if(_second1==0){
                    _second1=_second;
                    this.load(this.state.last_date,0,this.state.last_id)
                }else{
                    _second1--;
                }
            },1000)
        }
    }
    RequestMeet=()=>{
        //1系统消息 请求见面
        this.send("You have requested a meet up. Please wait for reply.",this.props.item.to_uid,1);
    }
    agreeMeet=()=>{
        //回复见面
        const {list,last_date}=this.state;
        request(JIANMIAN,{meet_id:this.state.meet.oid,to_id:this.props.item.to_uid}).then(result=>{
            if(checkResult(result)){

            }
        });

    }


    RequestReview=()=>{
        const {visible}=this.state;
        this.setState({
            visible:true
        });
    }

    cancelReview=()=>{
        const {visible}=this.state;
        this.setState({
            visible:false
        });
    }

    showUserInfo=(user_id)=>{
        this.setState({
            visible_user:true,
            view_user_id:user_id
        });
    }

    getInputRef=(ref)=>{
        this.msg_panel=ref;
    }

    clickInput=(e)=>{

    }

    render(){
        const {item,onCancel}=this.props;
        const {content,request_count,is_meet,meet,visible,visible_user,view_user_id}=this.state;
        let value=content.replace(/(^\s*)|(\s*$)/g, "");
        return <Content>
            <Popup visible={true}>
                <div className="layui-m-layerchild ">
                    <div className="mod_center" style={{position: "fixed",left:"0px",bottom:"0px",left:"0px",top:"0px",right:"0px",display:"table"}}>
                        <div className="mod_header" data-flex="dir:left cross:center main:justify">
                            <a className="left_link" onClick={onCancel} href="javascript:void(0)"><i className="iconfont icon-goback"></i><span>Back</span></a>
                            <div className="mid_title">{item.nickname}</div>
                        </div>
                        {is_meet==0 && (Object.keys(meet).length==0) && <div className="send_top_tips" style={{
                            zIndex:"999",
                            position: "relative",
                            background: "#fff"
                        }}>
                            You can request a meet up with him/her <a onClick={this.RequestMeet} href="javascript:void(0)">Request</a>
                        </div>}
                        { (is_meet==1 && (Object.keys(meet).length==0 || meet.status==0) && meet.is_self==1) || (meet.is_self==1 && meet.status==0) &&
                            <div className="send_top_tips" style={{
                                zIndex:"999",
                                position: "relative",
                                background: "#fff"
                            }}>
                                You have requested a meet up. Please wait for reply.
                            </div>
                        }

                        {Object.keys(meet).length>0 && meet.status==1 && meet.is_comment==0 &&
                            <div className="send_top_tips" style={{
                                zIndex:"999",
                                position: "relative",
                                background: "#fff"
                            }}>
                                How do you think of her/him after meet? <a onClick={this.RequestReview} href="javascript:void(0)">Review</a>
                            </div>
                        }
                        {Object.keys(meet).length>0 && meet.status==1 && meet.is_comment==1 && meet.last_comment_uid!=appUser.uid &&
                        <div className="send_top_tips" style={{
                            zIndex:"999",
                            position: "relative",
                            background: "#fff"
                        }}>
                            How do you think of her/him after meet? <a onClick={this.RequestReview} href="javascript:void(0)">Review</a>
                        </div>
                        }
                        {Object.keys(meet).length>0 && meet.status==0 && meet.is_comment==0 && meet.is_self==0 &&
                        <div className="send_top_tips" style={{
                            zIndex:"999",
                            position: "relative",
                            background: "#fff"
                        }}>
                            <span style={{color:"#2196f3"}}>{meet.nickname}</span> has requested a meet up. <a onClick={this.agreeMeet} href="javascript:void(0)">AGREE</a>
                        </div>
                        }
                        <div className="message_content" style={{background:"#eee"}} >
                            <div ref={this.getRef} className="message_panel layim-chat-main">
                                <ul style={{marginTop:"20px"}}>
                                    {request_count==5 && <li className="layim-chat-system"><span onClick={this.showHistory} style={{background:"#47a8f5"}}>Click to load more</span></li>}
                                    {this.showMsg()}
                                    <li style={{display:"none"}} ref={this.getRef2} className="layim-chat-li">
                                        <div className="layim-chat-user">
                                            <img src={appUser.headpic} /><cite>{appUser.nickname}</cite></div>
                                        <div className="layim-chat-text"></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div data-flex="dir:left box:last cross:center" className="footer_send_content footer_send_content1">
                            <form data-flex="dir:left box:last cross:center" style={{width:"100%"}} onSubmit={(e)=>{
                                return this.sendMsg(e);
                            }}>
                            <input for-scroll="122112" ref={this.getInputRef} value={content} onChange={this.changeContent} type="text" />
                            {value.length>0?<button type={"submit"} className="btn btn_send">Send</button>:
                                <button type={"submit"} disabled={true} className="btn">Send</button>
                            }
                            </form>
                        </div>
                    </div>
                </div>

                {visible &&<Review meet_id={meet.oid} cancelReview={this.cancelReview} style={{zIndex:99}} item={this.props.item} visible={visible} />}
                {visible_user && <UserView cancelReview={()=>{this.setState({visible_user:false})}} uid={view_user_id} />}
            </Popup>
        </Content>
    }
}