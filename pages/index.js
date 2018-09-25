import React,{PureComponent} from 'react';
import LeftMenu from "../component/LeftMenu";
export default class page extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            isMenu:false
        }
    }
    componentWillMount(){
        document.title=window.title+" - "+"KINDNESS Exchange";
    }
    showMenu=()=>{
        const {isMenu}=this.state;
        if(isMenu){
            document.getElementById("root").removeAttribute("style");
            document.getElementById("root").removeAttribute("class");
        }else{
            document.getElementById("root").style.overflow="hidden";
            document.getElementById("root").setAttribute("class","pageShowContent");
        }
        this.setState({
            isMenu:isMenu==false
        });
    }
    render(){
        const {isMenu}=this.state;
        const goPage=(_tag)=>{
            this.props.history.push("page?t=share&k="+_tag);
        }
        return (<div className="mod_center" style={{height: "100%"}}>
            <div className="mod_header" data-flex="dir:left cross:center main:justify">
                <a onClick={this.showMenu} className="left_link"><i className="iconfont icon-caidan"></i></a>
                <div className="mid_title">Share</div>
            </div>
            <div className="mod_content" style={{height: "100%"}} data-flex="main:center cross:center">
                <div style={{width: "100%"}}>
                    <p className="mod_tips">I'd like to meet people to...</p>
                    <a onClick={()=>goPage("English")} className="mod_menu" >Share English</a>
                    <a onClick={()=>goPage("Chinese")} className="mod_menu" >Share Chinese</a>
                    <a onClick={()=>goPage("Chinese Cuisine")} className="mod_menu" >Share Cooking(Chinese Cuisine)</a>
                    <a onClick={()=>goPage("Foreign Cuisine")} className="mod_menu" >Share Cooking(Foreign Cuisine)</a>
                    <a onClick={()=>goPage("Museum")} className="mod_menu"  >Go to Museum</a>
                    <a onClick={()=>goPage("all")} className="mod_menu"  >Share Anything</a>
                </div>
            </div>
            <LeftMenu cartCount={1} location={this.props.location} afterClick={this.showMenu} />
        </div>);
    }
}