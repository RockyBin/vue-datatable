const mutations = {
    setGoods(state,params){
        state.goods = params
    },
    delGoods(state,params){
        console.log(params)

        let goods = state.goods

        goods.forEach((item,index) => {
            if(item.id == params){
                goods.splice(index,1);
            }
        });

        state.goods = goods;
    }
}

export default mutations