import React, { PureComponent } from 'react';
import { Popup, Content } from 'bee-mobile';
import { checkResult, isNotNull } from "../utils/helper";
import { SEARCH_USER } from "../config";
import { request } from "../utils/request";
import LoadingView from "./LoadingView";
import To from './To';
export default class Trans extends PureComponent {
    constructor(props) {
        super(props);
        this.timer = "";
        this.state = {
            loading: false,
            msg: "Input keyword index",
            item: undefined,
            actions: ""
        };
    }

    load = (keyword) => {
        request(SEARCH_USER, { keyword }).then(result => {
            if (checkResult(result)) {
                this.setState({
                    loading: result.data && result.data.length > 0,
                    item: result.data,
                    msg: result.msg
                });
            }
        });
    }
    onTrans = (item) => {
        this.setState({
            "actions": "to",
            "to_uid": item.id
        })
    }

    getList = (item) => {
        let content = [];
        item.map((val, index) => {
            content.push(<div key={index} onClick={() => {
                this.onTrans(val);
            }} className="search_item" data-flex="dir:left corss:center main:left"><img src={val.head_pic} /><span data-flex="main:center cross:center">{val.nickname}</span></div>);
        })
        return content;
    }

    onCancel = () => {
        this.setState({
            actions: ""
        });
    }

    onChange = (e) => {
        let value = e.target.value.replace(/(^\s*)|(\s*$)/g, "");
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
        if (value.length > 0) {
            this.timer = window.setTimeout(() => {
                this.load(value);
                this.setState({
                    loading: true,
                    msg: "loading..."
                });
            }, 300);
        } else {
            this.timer = window.setTimeout(() => {
                this.setState({
                    loading: false,
                    msg: "Input keyword index",
                    item: undefined
                });
            }, 300);
        }
    }
    render() {
        const { item, loading, msg, to_uid, actions } = this.state;
        return (
            <Content style={{ zIndex: 99 }}>
                <Popup direction={"right"} visible={true} style={{ height: "100%", width: "100%" }}>
                    {!item || item.length <= 0 ? <LoadingView style={{ top: "50px" }} loading={loading} msg={msg} /> : null}
                    <div className="mod_center" style={{ height: "100%", background: "#eee" }}>
                        <div data-flex="dir:left box:last">
                            <input placeholder="wechat name" onChange={this.onChange} className="input_content" />
                            <a style={{ paddingLeft: "5px", paddingRight: "5px" }} onClick={this.props.onCancel} data-flex="cross:center main:center">取消</a>
                        </div>
                        {item && item.length > 0 && <div className="list_search_content">
                            {this.getList(item)}
                        </div>}
                    </div>
                    {actions === "to" && <To to_uid={to_uid} onCancel={this.onCancel} />}
                </Popup>
            </Content>
        )
    }
}

