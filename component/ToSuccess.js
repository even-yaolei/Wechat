import React, { PureComponent } from 'react';
import { appUser } from '../utils/appStorage';
import { checkResult, isNotNull } from "../utils/helper";
import { GET_INFO, SAVE_INFO } from "../config";
import { request } from "../utils/request";
import { Button, Modal, ActionSheet } from 'bee-mobile';
import Link from 'umi/link';
import UserView from "../component/UserView";
import router from 'umi/router';
export default class ToSuccess extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        document.title = window.title + " - success";
    }
    render() {
        const { item } = this.props;
        return (
            <div className="layui-m-layerchild ">
                <div className="mod_center" style={{ position: "fixed", left: "0px", bottom: "0px", left: "0px", top: "0px", right: "0px", background: "#eee" }}>
                    <Link style={{ zIndex: 99999, position: "fixed", top: "8px", left: "8px" }} className="left_link" to="/"><i className="iconfont icon-goback"></i><span>Home</span></Link>
                    <div style={{ top: 0 }} className="message_content message_content_message" >
                        <div style={{ height: "100%" }} data-flex="dir:top main:center corss:center">
                            <div style={{ fontSize: "32px", color: "#05A2E1" }} data-flex=" main:center corss:center">Larry Page</div>
                            <div style={{ fontSize: "16px", paddingTop: "16px", paddingBottom: "16px" }} data-flex=" main:center corss:center">transfer To</div>
                            <div style={{ fontSize: "32px", color: "#E50352", paddingBottom: "16px" }} data-flex=" main:center corss:center">{item.nickname}</div>
                            <div data-flex="dir:top main:center corss:center" style={{ paddingBottom: "16px" }}>
                                <span style={{ fontSize: "16px", color: "#000" }} data-flex="main:center corss:center">{item.amount}</span>
                                <font style={{ fontSize: "16px", color: "#000" }} data-flex="main:center corss:center">Kindness Point</font>
                            </div>
                            <div data-flex="main:center corss:center">
                                <div style={{ position: "relative", paddingTop: "32px", paddingBottom: "32px" }}>
                                    <span style={{ position: "absolute", "top": "-8px", "left": "-48px", fontSize: "48px", fontWeight: "bold" }}>“</span>
                                    Thanks for everything you to do for us!

                                    <span style={{ position: "absolute", "bottom": "-25px", "right": "-48px", fontSize: "48px", fontWeight: "bold" }}>”</span>
                                </div>
                            </div>
                            <div style={{ marginTop: "32px" }} data-flex="main:center corss:center">
                                <img style={{ width: "100px", height: "100px" }} src="timg.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

