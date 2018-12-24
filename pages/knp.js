import React, { PureComponent } from 'react';
import { appUser } from '../utils/appStorage';
import { checkResult, isNotNull } from "../utils/helper";
import { GET_INFO, SEARCH_USER } from "../config";
import { request } from "../utils/request";
import { Button, Modal, ActionSheet } from 'bee-mobile';
import Link from 'umi/link';
import Trans from "../component/Trans";
import router from 'umi/router';

export default class knp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            actions: "",
            overplus_KNP: 0,
            total_KNP: 0,
            use_KNP: 0
        };
    }
    componentWillMount() {
        document.title = window.title + " - KNP";
        this.load();


    }

    load = () => {
        request(GET_INFO).then(result => {
            if (checkResult(result)) {
                this.setState(result.data);
            }
        });
    }
    //todo
    HandleTransfer = () => {
        this.load();
        this.setState({
            actions: "transfer"
        });
    }
    onCancel = () => {
        this.load();
        this.setState({
            actions: ""
        });
    }
    render() {
        const { overplus_KNP, actions } = this.state;
        return (
            <div className="layui-m-layerchild ">
                <div className="mod_center" style={{ position: "fixed", left: "0px", bottom: "0px", left: "0px", top: "0px", right: "0px", display: "table" }}>
                    <div className="mod_header" data-flex="dir:left cross:center main:justify">
                        <Link className="left_link" to="/"><i className="iconfont icon-goback"></i><span>Back</span></Link>
                        <div className="mid_title">KNP</div>
                        <a className="right_link" onClick={this.save} href="javascript:void(0)"></a>
                    </div>
                    <div className="message_content message_content_message" >
                        <div className="message_panel layim-chat-main">
                            <div data-flex="dir:top corss:center main:center" className="info_header">
                                <div data-flex="corss:center main:center" ><img src={appUser.headpic} /></div>
                                <span data-flex="corss:center main:center">{appUser.nickname}</span>
                                <h3>{overplus_KNP.toLocaleString()}</h3>
                                <h3 style={{ fontWeight: "bold" }}>KNP</h3>
                                {overplus_KNP && overplus_KNP > 0 ? <button onClick={this.HandleTransfer} style={{ cursor: "pointer", "color": "#666", background: "#fff", border: "1px solid #666" }} className="send_btn transfer_btn ">Transfer</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
                {actions === "transfer" && <Trans onCancel={this.onCancel} uid={appUser.uid} />}
            </div>
        )
    }
}

