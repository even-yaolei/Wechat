import React, { PureComponent } from 'react';
import { setUser } from '../utils/appStorage';
import { checkResult, isNotNull } from "../utils/helper";
import { USER_LOGIN } from "../config";
import { requestGet } from "../utils/request";
import { Button } from 'bee-mobile';

export default class Weixin extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            msg: "登录中...",
            is_login: false
        }
    }
    componentWillMount() {
        if (this.props.location.query.code) {
            requestGet(USER_LOGIN, { code: this.props.location.query.code, is_test: this.props.location.query.is_test }).then(result => {
                if (checkResult(result)) {
                    setUser(result.data);
                    if (!isNotNull(result.data.share) || !isNotNull(result.data.learn) || !isNotNull(result.data.desc)) {
                        window.location.href = "/info";
                    } else {
                        if (isNotNull(result.data.state)) {
                            window.location.href = result.data.state
                        } else {
                            window.location.href = "/";
                        }
                    }
                } else {
                    this.setState({
                        msg: result.msg,
                        is_login: true
                    });
                }
            });
        }
    }
    reload = () => {
        alert();
        window.location.href = "/";
    }
    render() {
        const { msg, is_login } = this.state;
        return (
            <div data-flex="dir:top cross:center main:center" style={{ height: "100%", position: "fixed", left: "0px", right: "0px", bottom: "0px", top: "0px" }} >
                <p style={{ fontSize: "20px", textAlign: "center", marginTop: "-80px", marginBottom: "32px" }}>{msg}</p>
                {is_login == true && <Button onClick={this.reload}>Reload</Button>}
            </div>
        )
    }
}

