import React from 'react';
import Link from 'umi/link';
import {appUser} from "../utils/appStorage";
import {request} from "../utils/request";
import {checkResult, isNotNull} from "../utils/helper";
import {SNED_UNREAD} from "../config";
class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LeftMenu';
    this.state = {
      actionKey:"",
      load_count:0,
        knp:0
    }
  }

    componentWillMount(){
        this.load();
    }

    load=()=>{
        request(SNED_UNREAD).then(result=>{
            if(checkResult(result)){
                this.setState({
                    load_count:result.total,
                    knp:result.kpn
                });
            }
        });
    }


  render(){
    const {location,afterClick,cartCount}=this.props;
    const {load_count,knp}=this.state;
    return [
      <div data-flex="dir:top" id="leftMenuPanel">
        <div data-flex="dir:top" className="menuPabel">
            <div data-flex="dir:left cross:center main:center" className="userContent">
                <img src={appUser.headpic} />
                <div data-flex="dir:top" style={{paddingLeft:"30px"}}>
                    <span>{appUser.nickname}</span>
                    <font style={{color:"rgb(183, 183, 183)"}}>{knp} KNP</font>
                </div>

            </div>
        </div>
        <div className={"left_menu_panel"}>
            <Link key={"/"}  onClick={afterClick} data-flex="main:left cross:center dir:left" to={"/"}>Share</Link>
            <Link key={"/learn"} onClick={afterClick} data-flex="main:left cross:center dir:left" to={"/learn"}>Learn</Link>
            <Link key={"/profile"} onClick={afterClick} data-flex="main:left cross:center dir:left" to={"/profile"}>Profile</Link>
            <Link key={"/msg"} onClick={afterClick} data-flex="main:left cross:center dir:left" to={"/msg"}>Messages
                {load_count>0 && <span className={"hongdian"}></span>}
            </Link>
            {/*<Link key={"/info"} onClick={afterClick} data-flex="main:left cross:center dir:left" to={"/info"}>User information</Link>*/}
        </div>
      </div>,
        <div id="maskPanel" onClick={afterClick} className="maskPanel">
        </div>
    ]
  }
};
export default LeftMenu;