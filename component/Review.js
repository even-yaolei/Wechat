import React,{PureComponent} from 'react';
import {Icon,Button} from 'bee-mobile';
import {Popup,Content} from 'bee-mobile';
import {checkResult, isNotNull} from "../utils/helper";
import {ADD_COMMENT, SNED_UNREAD,GET_KNP} from "../config";
import {request} from "../utils/request";
import {appUser} from "../utils/appStorage";
export default class Review extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            content : "",
            knp:"",
            user_knp:0
        };
    }
    send=(content,to_uid,meet_id,knp)=>{
        const {list,last_date}=this.state;
        request(ADD_COMMENT,{content,to_uid,meet_id,knp}).then(result=>{
            if(checkResult(result)){
                window.layer.open({
                    content: 'Comment on success',
                    btn: 'I got it!',
                    shadeClose: false,
                    yes: (index)=>{
                        window.layer.close(index);
                        this.props.cancelReview();
                    }
                });
            }else{
                alert(result.msg);

                if(result.knp){
                    this.setState({
                        user_knp:result.knp
                    });
                }
            }
        });
    }

    componentWillMount(){
        this.load();
    }

    load=()=>{
        request(GET_KNP).then(result=>{
            if(checkResult(result)){
                this.setState({
                    user_knp:result.data
                });
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

    changeContent=(e)=>{
        this.setState({
            content:e.target.value
        });
    }
    sendMsg=(e)=>{
        e.preventDefault();
        const {content,knp,user_knp}=this.state;
        const {item,meet_id}=this.props;
        let _knp=parseInt(knp);
        if(_knp>0){
            if(_knp>user_knp){
                if(user_knp==0){
                    alert("No available KNP please set to 0");
                }else{
                    alert("Total KNP You Have: "+user_knp+" KNP");
                }
                return;
            }
        }else{
            if(_knp!=0){
                alert("KNP must be greater than or equal to 0.\n");
                return;
            }
        }
        this.send(content,item.to_uid,meet_id,_knp);
    }
    changeKnp=(e)=>{
        this.setState({
            knp:e.target.value
        });
    }
    render(){
        const {visible}=this.props;
        const {content,knp,user_knp}=this.state;
        let value=content.replace(/(^\s*)|(\s*$)/g, "");
        return (
            <Content style={{zIndex:99}}>
                <Popup direction={"right"}  visible={true}>
                    <div className="layui-m-layerchild ">
                        <div className="mod_center" style={{position: "fixed",left:"0px",bottom:"0px",left:"0px",top:"0px",right:"0px",display:"table"}}>
                            <div className="mod_header" data-flex="dir:left cross:center main:justify">
                                <a className="left_link" href="javascript:void(0)" onClick={this.props.cancelReview}><i className="iconfont icon-goback"></i><span>Back</span></a>
                                <div className="mid_title">Write a Review</div>
                                <a className="right_link" ></a>
                            </div>
                            <div className="message_content message_content_preview" >
                                <div className="message_panel">
                                    <form data-flex="dir:top cross:center" style={{width:"100%"}} onSubmit={(e)=>{
                                        return this.sendMsg(e);
                                    }}>
                                    <div data-flex="dir:left" style={{width:"100%"}}><label>KNP <span style={{color:"red"}}>*</span></label></div>
                                    <input placeholder={`Total KNP You Have: ${user_knp} KNP`} value={knp} onChange={this.changeKnp} className="input_content"  style={{width:"100%"}} />
                                    <div data-flex="dir:left" style={{width:"100%"}}><label>Review <span style={{color:"red"}}>*</span></label></div>
                                    <textarea value={content}  onChange={this.changeContent} ></textarea>
                                    {value.length>0?<button  type={"submit"} className="send_btn send_ok_btn btn_send">DONE</button>:
                                        <button type={"submit"} disabled={true} className="send_btn ">DONE</button>
                                    }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </Content>
        )
    }
}

