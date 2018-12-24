import React, { PureComponent } from 'react';
import { appUser } from '../utils/appStorage';
import { checkResult, isNotNull } from "../utils/helper";
import { USER_TRANSFER, USER_PAY } from "../config";
import { request } from "../utils/request";
import { Popup, Content, ActionSheet } from 'bee-mobile';
import md5 from 'md5';
import ToSuccess from './ToSuccess';
export default class To extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            actions: "",
            item: {
                self_amount: 0
            },
            to: {
                user_id: props.to_uid
            }
        };
    }
    componentWillMount() {
        request(USER_TRANSFER, { "id": this.props.to_uid }).then(result => {
            if (checkResult(result)) {
                this.setState({
                    item: result.data
                });
            }
        });
    }
    changeNote = (e) => {
        this.setState({
            to: {
                ...this.state.to,
                note: e.target.value
            }

        });
    }
    changeAmount = (e) => {
        let value = e.target.value;

        //先把非数字的都替换掉，除了数字和.

        value = value.replace(/[^\d.]/g, "");

        //保证只有出现一个.而没有多个.

        value = value.replace(/\.{2,}/g, ".");

        //必须保证第一个为数字而不是.

        value = value.replace(/^\./g, "");

        //保证.只出现一次，而不能出现两次以上

        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");

        //只能输入两个小数

        value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3');


        this.setState({
            to: {
                ...this.state.to,
                amount: value
            }
        });
    }

    changePassword = (e) => {
        this.setState({
            to: {
                ...this.state.to,
                password: e.target.value
            }
        });
    }
    changeRepassword = (e) => {
        this.setState({
            to: {
                ...this.state.to,
                repassword: e.target.value
            }
        });
    }

    HandleTransfer = () => {
        const { to, item } = this.state;
        if (item.is_set_pd == 0) {
            if (to.repassword) {
                if (to.repassword != to.password) {
                    alert("Two inconsistent password input");
                    return;
                }
                if (to.password && to.password.toString().length < 6) {
                    alert("Confirmation password must not be less than 6 bits");
                    return;
                }
            } else {
                alert("Please enter a confirmation password.");
                return;
            }
        } else {
            if (to.password && to.password.length < 6) {
                alert("Capital password should not be less than 6 digits");
                return;
            } else if (!to.password) {
                alert("Please enter the fund password here.");
                return;
            }
        }
        if (to.amount > 0 && to.amount > item.self_amount) {
            alert("Total KNP You Have: " + item.self_amount + " KNP");
            return;
        }


        request(USER_PAY, { amount: to.amount, note: to.note, password: md5(to.password), user_id: to.user_id, "password_re": md5(to.repassword) }).then(result => {
            if (checkResult(result)) {
                this.setState({
                    actions: "success"
                });
            } else {
                alert(result.msg);
            }
        });
    }

    render() {
        const { item, actions, to } = this.state;
        return (
            <Content style={{ zIndex: 99 }}>
                <Popup direction={"right"} visible={true} style={{ height: "100%", width: "100%", }}>
                    <div className="mod_center" style={{ position: "fixed", left: "0px", bottom: "0px", left: "0px", top: "0px", right: "0px", background: "#eee", }}>
                        <a style={{ zIndex: 99999, position: "fixed", top: "8px", left: "8px" }} className="left_link" onClick={this.props.onCancel}><i className="iconfont icon-goback"></i><span>Back</span></a>
                        <div className="message_content message_content_message" >
                            <div style={{ top: "16px" }} className="message_panel layim-chat-main">
                                <div data-flex="dir:top corss:center main:center" className="info_header">
                                    <h1 data-flex="cross:center main:center">Transfer To</h1>
                                    <div style={{ marginBottom: "32px" }} data-flex="dir:left corss:center main:center">
                                        <div style={{ paddingRight: "16px" }} data-flex="corss:center main:center" ><img style={{ height: "48px", "width": "48px" }} src={item.head_pic} /></div>
                                        <span style={{ margin: "0px", lineHeight: "48px", fontSize: "16" }} data-flex="corss:center main:center">{item.nickname}</span>
                                    </div>
                                    <input style={{ marginBottom: "16px" }} className="input_content" onChange={this.changeAmount} value={to.amount} placeholder={`数量：${item.self_amount.toLocaleString()}`} />
                                    <input style={{ marginBottom: "16px" }} type="password" onChange={this.changePassword} value={to.password} className="input_content" placeholder="资金密码" />
                                    {item.is_set_pd === 0 && <input type="password" onChange={this.changeRepassword} value={to.repassword} style={{ marginBottom: "16px" }} className="input_content" placeholder="再次输入资金密码" />}
                                    <input style={{ marginBottom: "16px" }} onChange={this.changeNote} value={to.note} className="input_content" placeholder="Node:Thanks for your kindness!" />
                                    <button onClick={this.HandleTransfer} style={{ cursor: "pointer", "color": "#666", background: "#fff", border: "1px solid #666" }} className="send_btn transfer_btn ">确认 Transfer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {actions === "success" && <ToSuccess item={{ nickname: item.nickname, head_pic: item.head_pic, amount: to.amount }} />}
                </Popup>
            </Content>
        )
    }
}

