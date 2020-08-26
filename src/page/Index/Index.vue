<template>
    <div class="index">
        <ul>
            <li v-for="(item,index) in gs" :key="index">{{item.name}}</li>
        </ul>

            <v-table is-horizontal-resize style="width:100%" :columns="columns" :table-data="gs" row-hover-color="#eee" row-click-color="#edf7ff" ></v-table>


        <div class="opt">
            <span @click.prevent="refresh">刷新</span>
            <span class="page">
                <span @click.prevent="prev" v-show="page > 1">上一页</span>
                <span @click.prevent="next" v-show="page <= 5">下一页</span>
            </span>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable, VPagination} from 'vue-easytable'

export default {
    components:{
        VTable, 
        VPagination
    },
    data(){
        return {
            page: 1,
            tableData: [
                
            ],
            columns:  [
                    {field:'id',title:'序号',width:60,titleAlign:'center',columnAlign:'center',
                    formatter: function (rowData,rowIndex,pagingIndex,field) {
                                return rowIndex < 3 ? '<span style="color:red;font-weight: bold;">' + (rowIndex + 1) + '</span>' : rowIndex + 1
                            },isResize:true},
                    {field: 'name', title: '名称', width: 150, titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true},
                    // {field: 'food_desc', title: '描述', width: 150, titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true},
                    // {field: 'author_name', title: '作者', width: 80, titleAlign: 'center',columnAlign:'left',isEdit:false,isResize:true},
                    {field: 'custome-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}
            ]
        }

    },
    computed:{
        ...mapState(['goods']),
        gs(){
            return this.goods
        }
    },
    inject:['reload'],
    mounted(){
        this.getData()
    },
    methods:{
        ...mapActions(['getGoodsList']),
        getData(){
            this.getGoodsList();
        },
        refresh(){
            this.reload()
        },
        // 单元格编辑回调
        cellEditDone(newValue,oldValue,rowIndex,rowData,field){

            this.tableData[rowIndex][field] = newValue;

            // 接下来处理你的业务逻辑，数据持久化等...
        },
        next(){
           this.page++; 
           let page = '0' + this.page;

           this.gdata(page);
        },
        prev(){
            if(this.page == 1){
                this.page = 1;
            }else{
                this.page--;
            }

            let page = '0' + this.page;

            this.gdata(page);
        },
        gdata(page){

            let url = '/lk'+ page +'?Geek-James=29142664264194713334' 

            this.getGoodsList(url);
        }
    }
}

// 自定义列组件
Vue.component('table-operation',{
        template:`<span>
        <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
        </span>`,
        props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
        methods:{
            ...mapMutations(['delGoods']),
            update(rowData,index){
                console.log(rowData,index)
               // 参数根据业务场景随意构造
               let params = {type:'edit',index:this.index,rowData:this.rowData};
               this.$emit('on-custom-comp',params);
            },
 
            deleteRow(rowData,index){
                //console.log(rowData,index)
                // 参数根据业务场景随意构造
                //let params = {type:'delete',index:this.index};
                //this.$emit('on-custom-comp',params);
                this.delGoods(rowData.id) 
            }
        }
    })

</script>

<style lang="less" scoped>
    .index{
        .opt{
            display:flex;
            justify-content: space-between;
        }
    }
</style>