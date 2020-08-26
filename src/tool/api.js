import axios from 'axios'
import qs from 'qs'

let url = 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/recipe/menulist';
let fetch = axios.create({
    baseURL:url
})

fetch.interceptors.request.use(config=>{
    //console.log(config);
    return config;
},error=>{
    return Promise.reject(error);
})

fetch.interceptors.response.use(res=>{
    //console.log(res)
    return res;
},error=>{
    return Promise.reject(error);
})

const request = {
    fetchGet:(url,config)=>{
        return new Promise((resolve,reject)=>{
            fetch.get(url,config).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    fetchPost:(url,config)=>{
        return new Promise((resolve,reject)=>{
            if(config) config = qs.stringify(config)
            fetch.post(url,config).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}

export default request;