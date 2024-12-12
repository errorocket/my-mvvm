import { createElement, render, renderDomToPage } from "./core/virtualDom";

import { domDiff } from "./core/domDiff";

import { doPatch } from "./core/doPatch";

//旧的虚拟dom
const vDomOld = createElement('ul',{class: 'list', style: 'width: 300px; height: 300px; background-color: orange'}, [
    createElement('li',{class: 'item', 'data-index': 0},[
        createElement('p',{class: 'text'},['第1个列表项'])
    ]),
    createElement('li' , {class: 'item', 'data-index': 1},[
        createElement('p', {class: 'text'}, [
            createElement('span', {class: 'title'},[])
        ])
    ]),
    createElement ('li', {class: 'item', 'data-index': 2}, ['第3个列表项'])
]);

//新的虚拟dom
const vDomNew = createElement('ul',{class: 'list-wrap', style: 'width: 300px; height: 300px; background-color: orange'}, [
    createElement('li',{class: 'item', 'data-index': 0},[
        createElement('p',{class: 'title'},['特殊列表项'])
    ]),
    createElement('li' , {class: 'item', 'data-index': 1},[
        createElement('p', {class: 'text'}, [])
    ]),
    createElement ('div', {class: 'item', 'data-index': 2}, ['第3个列表项'])
]);

//将旧的虚拟节点转换成真实节点
const rDom = render(vDomOld);

//将真实dom对象渲染到页面上进行呈现:rootEl为目标容器对象的id
renderDomToPage('app', rDom);

// console.log('旧dom: ', vDomOld, '新dom: ', vDomNew);

//对比新旧虚拟dom对象，生成补丁包
const pathches = domDiff(vDomOld, vDomNew);
// console.log('新旧dom补丁: ', pathches);

// 对旧的真实dom打补丁
doPatch(rDom, pathches);