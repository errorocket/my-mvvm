/**
 * 编译器:编译待服务的容器对象所对应的html模板文件，解析自定义标签
 */


//引入编译页面时需要使用的工具类
import CompilerUtils from "../utils/CompilerUtils";

//引入封装了所有自定义指令的对象
import customDirectives from "../directives/customDirectives";

//引入正则表达式对象:判断是否为插值语法格式
import {isInterpolationSyntax} from "../utils/RegExprUtils";

import ViewModel from "../mvvm-core";

export default class Compiler {
    vm:ViewModel

    constructor(vm:ViewModel){
        this.vm = vm;

        //初次编译
        this.compile(this.vm.$el as HTMLDivElement);
    }

    //对节点进行初步编译
    compile($el:HTMLDivElement){

        const childNodes = $el.childNodes;  //得到目标容器对象的所有子节点
        // console.log(childNodes);

        //按照 元素节点，文本节点 两大类进行模板解析
        [...childNodes].forEach(node => {
            if(CompilerUtils.isElementNode(node)){
                this.compileElement(this.vm, node); //编译元素节点
                this.compile(node);     //递归遍历该节点，处理其可能存在的子节点
            }else{
                this.compileText(this.vm, node);    //编译文本节点
            }
        })
    }

    //编译元素节点
    compileElement(vm:ViewModel, node: HTMLElement){
        const attrs = node.attributes;  //获取元素节点的所有属性
        // console.log('attrs --> ', attrs instanceof Array);
        [...attrs].forEach(attr => {
            // console.log(attr);
            //判断属性名是否为自定义指令
            if(CompilerUtils.isDirective(attr.name)){
                //如果包含自定义指令，获取自定义指令的具体类型并拿到自定义指令的值
                const [, vType] = attr.name.split('-'); //v-model -> ['v', 'model']，这里只要数组的第二个元素
                customDirectives[vType](vm, node, attr.value);  //根据具体的自定义指令类型，调用对应的处理函数
            }
        })
    }

    //编译文本节点
    compileText(vm:ViewModel, node){
        const text = node.textContent;
        if(isInterpolationSyntax.test(text)){
            //如果符合插值语法对应的正则表达式,进行插值语法的解析
            customDirectives['text'](vm, node, text);
        }
    }
}