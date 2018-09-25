import React,{PureComponent} from 'react';
import {appUser} from '../utils/appStorage';
import {checkResult, isNotNull} from "../utils/helper";
import {GET_INFO,SAVE_INFO} from "../config";
import {request} from "../utils/request";
import {Button,Modal,ActionSheet} from 'bee-mobile';
import Link from 'umi/link';
import UserView from "../component/UserView";
import router from 'umi/router';
export default class Weixin extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            learn:"",
            share:"",
            desc:"",
            learnOptions:[],
            shareOptions:[]
        };
    }
    componentWillMount(){
        document.title=window.title+" - Profile";

        request(GET_INFO).then(result=>{
            if(checkResult(result)){
                this.setState(result.data);
            }
        });
    }
    changeDesc=(e)=>{
        this.setState({
            desc:e.target.value
        });
    }
    save=()=>{
        let {learn,share,desc}=this.state;
        desc = desc.replace(/(^\s*)|(\s*$)/g, "");
        if(desc.length==0){
            window.layer.open({
                content: 'Please complete personal information',
                btn: 'ok',
                shadeClose: false
            });
            return;
        }
        if(share.length==0){
            window.layer.open({
                content: 'Please choose to share information',
                btn: 'ok',
                shadeClose: false
            });
            return;
        }
        if(learn.length==0){
            window.layer.open({
                content: 'Please choose to learn information',
                btn: 'ok',
                shadeClose: false
            });
            return;
        }
        request(SAVE_INFO,{learn,share,desc}).then(result=>{
            if(checkResult(result)){
                window.layer.open({
                    content: 'Save success, click on the first page of the jump',
                    btn: 'I got it!',
                    shadeClose: false,
                    yes: function(index){
                        window.layer.close(index);
                        //router.push("/");
                    }
                });
            }
        });
    }
    selectLearnItem=(e,item)=>{
        let className=e.target.getAttribute("class");
        let is_delete=className.indexOf("sheet_item_selected")!=-1;
        let {learn}=this.state;
        //删除is_delete
        if(is_delete){
            let arr=learn.split("/");// 在每个逗号(,)处进行分解。
            arr.filter(val=>val!=item).map((val,key)=>{
                if(key==0){
                    learn=val;
                }else{
                    learn+="/"+val;
                }
            });
            e.target.setAttribute("class","sheet_item");
        }else{
            if(learn){
                learn+="/"+item;
            }else{
                learn=item;
            }
            e.target.setAttribute("class","sheet_item sheet_item_selected");
        }
        this.setState({
            learn
        });
    }

    selectShareItem=(e,item)=>{
        let className=e.target.getAttribute("class");
        let is_delete=className.indexOf("sheet_item_selected")!=-1;
        let {share}=this.state;
        //删除is_delete
        if(is_delete){
            let arr=share.split("/");// 在每个逗号(,)处进行分解。
            arr.filter(val=>val!=item).map((val,key)=>{
                if(key==0){
                    share=val;
                }else{
                    share+="/"+val;
                }
            });
            e.target.setAttribute("class","sheet_item");
        }else{
            if(share){
                share+="/"+item;
            }else{
                share=item;
            }
            e.target.setAttribute("class","sheet_item sheet_item_selected");
        }
        this.setState({
            share
        });
    }


    selectLearn=()=>{
        const {learnOptions,learn}=this.state;
        let options=learnOptions.map((item,key)=><span key={key} onClick={(e)=>this.selectLearnItem(e,item.name)} className={`sheet_item ${learn.indexOf(item.name) != -1?"sheet_item_selected":""}`}>{item.name}</span>);
        ActionSheet.show({
            element:<div  className={"sheet_share_panel"}>
                {options}
            </div>,
            cancel: true,
            title: 'Message'
        })
    }

    selectShare=()=>{
        const {shareOptions,share}=this.state;
        let options=shareOptions.map((item,key)=><span key={key} onClick={(e)=>this.selectShareItem(e,item.name)} className={`sheet_item ${share.indexOf(item.name) != -1?"sheet_item_selected":""}`}>{item.name}</span>);
        ActionSheet.show({
            element:<div  className={"sheet_share_panel"}>
                {options}
            </div>,
            cancel: true,
            title: 'Message'
        })
    }

    render(){
        const {learn,share,desc}=this.state;
        return (
            <div className="layui-m-layerchild ">
                <div className="mod_center" style={{position: "fixed",left:"0px",bottom:"0px",left:"0px",top:"0px",right:"0px",display:"table"}}>
                    <div className="mod_header" data-flex="dir:left cross:center main:justify">
                        <Link className="left_link" to="/"><i className="iconfont icon-goback"></i><span>Back</span></Link>
                        <div className="mid_title">{appUser.nickname}</div>
                        <a className="right_link" onClick={this.save} href="javascript:void(0)">Done</a>
                    </div>
                    <div className="message_content message_content_message" >
                        <div className="message_panel layim-chat-main">
                            <div data-flex="dir:top corss:center main:center" className="info_header">
                                <div data-flex="corss:center main:center" ><img src={appUser.headpic} /></div>
                                <span data-flex="corss:center main:center">{appUser.nickname}</span>
                                <div data-flex="corss:center main:left" className="info_desc">
                                    <textarea placeholder={"Please complete personal information"} onChange={this.changeDesc} className="textArea_content" value={desc}></textarea>
                                </div>
                                <h3 data-flex="corss:center main:left">Want to Share<font color="red">*</font>：</h3>
                                <div>
                                    <input readOnly={true} onClick={this.selectShare} className="input_content" value={share} type="text" />
                                </div>
                                <h3 data-flex="corss:center main:left">Want to Learn<font color="red">*</font>：</h3>
                                <div><input readOnly={true}  onClick={this.selectLearn}  className="input_content" value={learn} type="text" /></div>

                            </div>
                            <UserView cancelReview={()=>{}} none_user={true} uid={0} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

