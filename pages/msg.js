import React,{PureComponent} from 'react';
import {appUser,setUser} from '../utils/appStorage';
import {checkResult, isNotNull} from '../utils/helper';
import {request} from "../utils/request";
import {SNED_UNREAD} from "../config";
import LoadingView from "../component/LoadingView";
import Chat from "../component/Chat";
import Link from 'umi/link';
export default class msg extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            list:[],
            loading:false,
            load_count:0,
            msg:"",
            visible:false,
            send_item:{}
        };
        this.timer="";
    }
    componentWillMount(){
        document.title=window.title+" - "+" Messages";
        this.load();
        this.autoLoad(true,2);
    }
    componentWillUnmount(){
        if(isNotNull(this.timer) && this.timer){
            window.clearInterval(this.timer);
        }
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
                    this.load();
                }else{
                    _second1--;
                }
            },1000)
        }
    }
    load=()=>{
        const {list}=this.state;
        this.setState({
            loading:true,
            msg:"Loading"
        });
        request(SNED_UNREAD).then(result=>{
            if(checkResult(result)){
                if(result.data.length==0){
                    if(isNotNull(this.timer) && this.timer){
                        window.clearInterval(this.timer);
                    }
                }
                this.setState({
                    list:result.data,
                    loading:false,
                    msg:result.data.length==0?"No unread messages for the time being":"",
                    load_count:result.data.length
                });
            }
        });
    }
    onCancel=()=>{
        this.setState({
            visible:false
        });
    }
    see=(item)=>{
        this.setState({
            visible:true,
            send_item:{
                to_uid:item.from_uid,nickname:item.from_nickname,headpic:item.from_headpic
            }
        });
    }
    loadData=()=>{
        const {list}=this.state;
        let content=[];
        list.map((item,key)=>{
            content.push(
                <li key={key} onClick={()=>{
                    this.see(item);
                }} layim-event="chat" data-type="history" data-index="friend100001" className="layim-friend100001 "><div><img src={item.from_headpic} /></div><span>{item.from_nickname}</span><p>{item.msg}</p>{item.count>0&&<span className="layim-msg-status layui-show">{item.count}</span>}</li>
            );
        });
        return content;
    }
    render(){
        const {list,loading,msg,send_item,load_count,visible}=this.state;
        let icon=<i style={{fontSize:"50px"}} className="iconfont icon-wuxiaoxi"></i>;
        return(
            <div className="layui-m-layerchild ">
                <div className="mod_center" style={{position: "fixed",left:"0px",bottom:"0px",left:"0px",top:"0px",right:"0px",display:"table"}}>
                    <div className="mod_header" data-flex="dir:left cross:center main:justify">
                        <Link className="left_link" to="/"><i className="iconfont icon-goback"></i><span>Back</span></Link>
                        <div className="mid_title"></div>
                    </div>
                    <div className="message_content message_content_message" >
                        <div className="message_panel layim-tab-content layui-show">
                            {(list.length==0 && load_count==0) ?<LoadingView icon={icon} requestData={()=>{
                                this.load();
                                this.autoLoad(true,2);
                            }} loading={loading} msg={msg} /> :<ul className="layui-layim-list layui-show layim-list-history">
                                {this.loadData()}
                            </ul>}
                        </div>
                    </div>
                </div>
                {visible &&<Chat group={0} onCancel={this.onCancel} visible={visible} item={send_item}></Chat>}
            </div>
        );
    }
}