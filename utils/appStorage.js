
"use strict";
import {isNotNull} from "./helper";



/***
 * 保存在浏览器cookie里面，浏览器关闭  不会被清空
 * @param _user
 */
function setLocalUser(_user){
  for(let i in _user){
  	localStorage.setItem(i,_user[i])
  }
}
/***
 * 设置用户存储
 * @param _user 用户对象
 */
export function setUser(_user) {
  setLocalUser(_user)
}
export function getStorage(){
  return localStorage
}

export const appUser=getStorage();
/****
 * 用户登出
 * @return true or false
 */
export function setLogout(){
    if(isNotNull(appUser) && Object.keys(appUser).length>0){
        for(let i in appUser){
            localStorage[i]="";
        }
    }
}
function getConfig(){
    if(isNotNull(localStorage.config)){
        return JSON.parse(localStorage.config);
    }else{
        return {};
    }
}
export const appConfig=getConfig();
