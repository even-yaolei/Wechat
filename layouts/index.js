import React,{PureComponent} from 'react';
import {appUser} from '../utils/appStorage';
import {isNotNull} from '../utils/helper';
// import {request} from '../utils/request';
import './app.less';
import 'flex.css/dist/data-flex.css';
import LoadingView from "../component/LoadingView";
class index extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            is_login:1
        };
    }
    componentWillMount(){
        //未登录  判断 且不是微信回调页面
        if(this.props.location.pathname!="/weixin"){
            if(!isNotNull(appUser.uid)){
                let state=this.props.location.pathname+this.props.location.search;
                const respinse_type="code";
                const scope="snsapi_userinfo";
                const url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+window.wx_appid+"&redirect_uri="+window.redirect+"&response_type="+respinse_type+"&scope="+scope+"&state="+state;
                window.location.href=url;
            }else{
                this.setState({
                    is_login:0
                });
            }
        }else{
            this.setState({
                is_login:0
            });
        }
    }

    render(){
        if(this.props.location.pathname=="/weixin"){
            return this.props.children;
        }else{
            const {is_login}=this.state;
            if(is_login==0){
                return (<div>{this.props.children}</div>)
            }else{
                return <div >
                    <LoadingView requestData={()=>{}} loading={true} msg={"授权处理中..."} />
                </div>
            }
        }
    }

}
export default index;