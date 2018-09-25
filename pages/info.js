import React,{PureComponent} from 'react';
import UserView from "../component/UserView";
import router from 'umi/router';
export default class msg extends PureComponent{
    goHome=()=>{
        router.push("/");
    }
    render(){
        return(
            <UserView cancelReview={this.goHome} uid={0} />
        );
    }
}