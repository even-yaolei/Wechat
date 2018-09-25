import axios from 'axios';
import {appUser} from "./appStorage"
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options={}) {
    return axios({
          method:"POST",
          url,
          headers:{
              'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
           },
          timeout:4000,
          params:{
            token:appUser.token
          },
          data:"data="+JSON.stringify(options)
    })
    .then(function (response) {
       return checkStatus(response).data;
    })
    .catch(function (error) {
        alert("请求时发生了异常");
        return error;
    });
}

export function requestGet(url, options={}) {

      return axios.get(url, {
            params: options,
            dataType: 'jsonp',
            timeout:4000
        })
        .then(function (response) {
            return checkStatus(response).data;
        })
        .catch(function (error) {
            alert("请求时发生了异常");
            window.reload();
            return error;
        });

}



function checkStatus(response){
    if(response.status >= 200 && response.status < 300){
        return response;
    }
    const error = new Error(response.statusText);
    error.code = response.status;
    error.msg = response.statusText;
    error.url = response.url;
    throw error;
}