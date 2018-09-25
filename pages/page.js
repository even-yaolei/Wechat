import React,{PureComponent} from 'react';
import {appUser,setUser} from '../utils/appStorage';
import {checkResult, isNotNull} from '../utils/helper';
import {request} from "../utils/request";
import {SEARCH_INFO} from "../config";
import LoadingView from "../component/LoadingView";
import Chat from "../component/Chat";
import Link from 'umi/link';
import UserView from "../component/UserView";

export default class page extends PureComponent{
    constructor(props){
        super(props);
        const {location}=props;
        let tag=location.query.t;
        let keyword=location.query.k;
        if(tag!="share" && tag!="learn"){
            tag="share"
        }
        if(tag=="share"){
            document.title=window.title+" - "+"KINDNESS EXCHANGE";
        }else{
            document.title=window.title+" - "+"KINDNESS EXCHANGE";
        }
        let desc=keyword;
        if(keyword=="all"){
            desc="Anything";
        }
        this.state={
            tag,
            keyword,
            ids:"0",
            list:[],
            loading:false,
            load_count:0,
            msg:"",
            visible:false,
            send_item:{},
            desc,
            visible_user:false,
            view_user_id:0
        };
    }
    componentWillMount(){
        this.load();
    }
    load=()=>{
        const {tag,keyword,ids,list}=this.state;
        this.setState({
            loading:true,
            msg:"Loading"
        });
        request(SEARCH_INFO,{tag,keyword,ids}).then(result=>{
            if(checkResult(result)){
                if(ids==0){
                    this.setState({
                        loading:false,
                        ...result.data,
                        load_count:result.data.list.length,
                        msg:result.data.list.length==0?"No data was found":""
                    });
                }else{
                    this.setState({
                        loading:false,
                        list:list.concat(result.data.list),
                        ids:result.data.ids,
                        load_count:result.data.list.length,
                        msg:""
                    });
                }
            }
        });
    }
    sendMsg=(item)=>{
        this.setState({
            visible:true,
            send_item:item
        });
    }

    onCancel=()=>{
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
    loadData=()=>{
        const {list,load_count}=this.state;
        let content=[];
        list.map((item,key)=>{
            let comments=[];
            if(item.comments && item.comments.length>0){
                item.comments.map((val,index)=>{
                    comments.push(<li key={index} className="layim-chat-li layim-chat-mine">
                        <div onClick={()=>{
                            this.showUserInfo(val.oid);
                        }} className="layim-chat-user">
                            <img src={val.comments_headpic} />
                            <cite>{val.comments_nickname}</cite>
                        </div>
                        <div className="layim-chat-text">
                            {val.content}
                        </div>
                    </li>);
                })
            }
            content.push(
                <div key={key} className="share_item">
                    <div data-flex="dir:top corss:center main:center" className="info_header">
                        <div className="user_info_nickname"><span data-flex="corss:center main:center">{(key+1)}. LivAwayer: {item.nickname}</span><font></font></div>
                        <div onClick={()=>{
                            this.showUserInfo(item.oid);
                        }}  data-flex="corss:center main:center" ><img src={item.headpic} /></div>

                        <div data-flex="corss:center main:left" className="info_desc">
                            <p>{item.desc}</p>
                        </div>
                        <h3 data-flex="corss:center main:left">Want to Share：</h3>
                        <div style={{color:"#000"}}>{item.share}</div>
                        <h3 data-flex="corss:center main:left">Want to Learn：</h3>
                        <div style={{color:"#000"}}>{item.learn}</div>
                    </div>
                    {item.comments && item.comments.length>0 &&<div data-flex="cross:center main:center" className="info_view_line">
                        <span>KINDNESS Review({item.comments?item.comments.length:0})</span>
                    </div>}
                    <ul style={{"padding": "16px"}}>
                        {comments}
                    </ul>
                    <div  className="btn_send_up"><a onClick={()=>this.sendMsg({to_uid:item.oid,nickname:item.nickname,headpic:item.headpic})} href="javascript:void(0)">Send message to request meet up</a></div>
                </div>
            );
        });
        return content;
    }

    render(){
        const {list,loading,load_count,ids,msg,send_item,visible,tag,desc,view_user_id,visible_user}=this.state;

        return(
            <div className="layui-m-layerchild ">
                <div className="mod_center" style={{position: "fixed",left:"0px",bottom:"0px",left:"0px",top:"0px",right:"0px",display:"table"}}>
                    <div className="mod_header" data-flex="dir:left cross:center main:justify">
                        <Link className="left_link" to="/"><i className="iconfont icon-goback"></i><span>Back</span></Link>
                        <div className="mid_title">{tag=="share"?`LivAwayers who share ${desc}`:`LivAwayers who'd like to learn ${desc}`}</div>
                    </div>
                    <div className="message_content message_content_message" >
                        {(ids=="0") ?<LoadingView requestData={this.load} loading={loading} msg={msg} /> :<div className="message_panel layim-chat-main">
                            <div className="list_share_panel">
                                {this.loadData()}
                            </div>
                            {load_count==5 && <div style={{"padding": "16px"}}>
                                <button onClick={this.load} className="send_btn more_btn">
                                    MORE
                                    <i className="iconfont icon-more_light"></i>
                                </button>
                            </div>}
                        </div>}

                    </div>
                </div>
                {visible &&<Chat  group={tag=="share"?1:0} onCancel={this.onCancel} visible={visible} item={send_item}></Chat>}
                {visible_user && <UserView cancelReview={()=>{this.setState({visible_user:false})}} uid={view_user_id} />}
            </div>
        );
    }
}