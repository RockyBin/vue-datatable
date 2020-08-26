import tool from '@/tool/api.js'

const actions = {
    getGoodsList({commit},param){
        console.log('param',param);
        let url = param
        if(!param){
            url = '/lk01?Geek-James=29142664264194713334'
        }
        tool.fetchGet(url).then(res=>{
            console.log(res)
            if(res.data.success){
                commit('setGoods', res.data.data.big_recommend.list)
            }
        })
    }
}

export default actions