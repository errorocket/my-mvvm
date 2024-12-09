//引入mvvm框架的核心，即:ViewModel类

import ViewModel from "./mvvm-core";

const vm = new ViewModel({
    el:'#root',
    data(){
        return {
            content:{
                poem:''
            },
            title:'my mvvm'
        }
    }
});
window.vm = vm;