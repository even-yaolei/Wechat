import React,{PureComponent} from 'react';
import {Icon,Button} from 'bee-mobile';
import {Popup,Content} from 'bee-mobile';
import {checkResult, isNotNull} from "../utils/helper";
import {ADD_COMMENT, SNED_UNREAD, USER_VIEW} from "../config";
import {request} from "../utils/request";
import {appUser} from "../utils/appStorage";
import LoadingView from "./LoadingView";
export default class UserView extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            item : {

            },
            loading:false,
            msg:""
        };
    }
    componentWillMount(){
        this.load();
    }
    load=()=>{
        const {list}=this.state;
        let uid=this.props.uid;
        this.setState({
            loading:true,
            msg:"Loading"
        });
        request(USER_VIEW,{user_id:uid}).then(result=>{
            if(checkResult(result)){
                this.setState({
                    item:result.data,
                    loading:false,
                    msg:Object.keys(result.data)==0?"No data was found":""
                });
            }
        });
    }
    getcomments=(item)=>{
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
        return comments;
    }
    showUserInfo=()=>{

    }
    render(){
        const {visible,none_user}=this.props;
        const {item,loading,msg}=this.state;
        if(none_user){
            return <div className=" message_content_message">
                {item.comments && item.comments.length>0 &&<div data-flex="cross:center main:center" className="info_view_line">
                    <span>KINDNESS Review({item.comment_count})</span>
                </div>}
                <ul style={{"padding": "16px"}}>
                    {this.getcomments(item)}
                </ul>
            </div>
        }
        return (
            <Content style={{zIndex:99}}>
                <Popup direction={"right"}  visible={true}>
                    <div className="layui-m-layerchild ">
                        <div className="mod_center" style={{position: "fixed",left:"0px",bottom:"0px",left:"0px",top:"0px",right:"0px",display:"table"}}>
                            <div className="mod_header" data-flex="dir:left cross:center main:justify">
                                <a className="left_link" href="javascript:void(0)" onClick={this.props.cancelReview}><i className="iconfont icon-goback"></i><span>Back</span></a>
                                <div className="mid_title">LivAwayers</div>
                            </div>
                            <div className="message_content message_content_message" >
                                {(Object.keys(item).length==0) ?<LoadingView  requestData={()=>{
                                    this.load();
                                }} loading={loading} msg={msg} /> :<div className="message_panel layim-chat-main">
                                    <div data-flex="dir:top corss:center main:center" className="info_header">
                                        <div className="user_info_nickname"><span >LivAwayer: {item.nickname}</span><font></font></div>
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
                                        <span>KINDNESS Review({item.comments.length})</span>
                                    </div>}
                                    <ul style={{"padding": "16px"}}>
                                        {this.getcomments(item)}
                                    </ul>
                                </div>}
                            </div>
                        </div>
                    </div>
                </Popup>
            </Content>
        )
    }
}

