/**
 * 完成虚拟节点的创建
 */

import { Element } from "./Element";
import type { VirtualDom } from "../types";

//创建虚拟节点
function createElement(type: string, props: object, children: Array<Element | string>) {
    return new Element(type, props, children);
}

//为目标节点新增属性
function setAttrs(node: HTMLElement, prop: string, value: string) {
    switch(prop){
        case 'value':
            if(node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA'){
                //为input框和textarea设置属性值
                (node as HTMLInputElement | HTMLTextAreaElement).value = value;
            }else{
                node.setAttribute(prop, value);
            }
            break;
        case 'style':
            //设置样式
            node.style.cssText = value;
            break;
        default:
            //将其他类型的属性设置到节点上
            node.setAttribute(prop, value);
            break;
    }
}

//将虚拟节点对象转换成真实节点对象
function render(vDom: VirtualDom): HTMLElement | Text {

    //解构vDom属性并创建真实的节点对象
    const {type, props, children} = vDom,
          el = document.createElement(type);

    //为新创建的真实节点对象新增属性
    for(let prop in props) {
        setAttrs(el, prop, props[prop]);
    }

    //为Element类型的虚拟节点的子节点进行转换处理
    children.map((c) => {

        //如果子节点为Element类型，进行递归转换处理
        const node = c instanceof Element
            ?
            render(c)
            :
            document.createTextNode(c); //否则创建文本节点并返回

        //将子节点添加到el节点中
        el.appendChild(node);
    });

    //将转换出的真实节点对象返回
    return el;
}

//将真实dom对象渲染到页面进行呈现
function renderDomToPage(rootEl: string, rDom: HTMLElement | Text){
    (document.getElementById(rootEl) as HTMLDivElement).appendChild(rDom);
}

export { createElement, render, renderDomToPage, setAttrs};

