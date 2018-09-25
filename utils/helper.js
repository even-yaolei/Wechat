import {setLogout} from '../utils/appStorage';
export function isNotNull(value){
  return value !==undefined && value !== "" && value !== null;
}

export function checkResult(data){
    //未登录 或者已过期
    if(data.code==301){
        setLogout();
        window.location.href="/";
    }
    return data.code == 200;
}
//渲染html
export function renderHTML(htmlStr,className){
    return <div className={isNotNull(className)?className:"render_html_panel"} dangerouslySetInnerHTML={{__html: htmlStr}} />

}