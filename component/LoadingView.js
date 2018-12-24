import React, { PureComponent } from 'react';
import { Icon, Button } from 'bee-mobile';
export default class LoadingView extends PureComponent {
    render() {
        const { msg, loading, requestData, icon } = this.props;
        let icons = "";
        if (loading) {
            icons = <i style={{ fontSize: "50px" }} className="iconfont icon-jiazaizhong"></i>
        } else {
            if (icon) {
                icons = icon;
            } else {
                icons = <i style={{ fontSize: "50px" }} className="iconfont icon-wushuju"></i>;
            }
        }


        return <div style={this.props.style} data-flex="dir:top cross:center main:center" className="loading_content_panel">
            <div data-flex="dir:top cross:center main:center" style={{ marginTop: "-80px" }}>
                {icons}
                <p style={{ fontSize: "20px", textAlign: "center", marginBottom: "32px" }}>{msg}</p>
                {loading == false && requestData && <Button onClick={requestData}>Reload</Button>}
            </div>
        </div>
    }
}