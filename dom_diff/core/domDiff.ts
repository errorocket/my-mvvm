import { VirtualDom,  PatchArr, PATHCH_TYPE } from './../types/index';

//存放对比新旧虚拟dom之后所得的整个补丁包
let patches = {};
//用于记录深度遍历虚拟dom树时的虚拟节点的标号
let vNodeIndex = 0;

//对比新旧虚拟dom，返回补丁
function domDiff(vDomOld: VirtualDom, vDomNew: VirtualDom) {
    let index = 0;
    //遍历虚拟节点
    vNodeWalk(vDomOld, vDomNew, index);
    return patches;
}

//遍历虚拟节点
function vNodeWalk(oldNode, newNode, index: number) {
    //存放当前节点的补丁,每个节点有自己的补丁
    const vNodePatch: PatchArr = [];

    if(!newNode){
        //如果新的节点已经不存在
        vNodePatch.push({
            type: PATHCH_TYPE.REMOVE,
            index
        });
    }else if(typeof oldNode === 'string' && typeof newNode === 'string') {
        //如果均为字符串类型的文本节点且内容不相同
        if(oldNode !== newNode){
            vNodePatch.push({
                type: PATHCH_TYPE.TEXT,
                text: newNode
            });
        }
    }else if(oldNode.type === newNode.type) {
        //如果新旧虚拟节点的类型相同，则进一步比较属性，得到可能存在的属性补丁
        const attrPatch = attrWalk(oldNode.props, newNode.props);
        if(Object.keys(attrPatch).length > 0){
            //如果存在属性补丁，则将属性补丁添加到当前节点的补丁中
            vNodePatch.push({
                type:PATHCH_TYPE.ATTR,
                attrs: attrPatch
            });
        }
        //继续对比新旧虚拟dom的子节点
        childrenWalk(oldNode.children, newNode.children);
    }else{
        //出现了替换情况, 换成新的虚拟节点
        vNodePatch.push({
            type: PATHCH_TYPE.REPLACE,
            newNode
        });
    }
    if(vNodePatch.length > 0) {
        //如果当前节点存在补丁，将该节点的补丁包放到整个虚拟dom的补丁包中
        patches[index] = vNodePatch;
    }
}

//对比新旧虚拟节点的属性，返回可能存在的属性补丁
function attrWalk(oldProps: object, newProps: object) : object{
    //存放节点的属性补丁
    let attrPatch = {};
    for(let prop in oldProps) {
        //如果修改了旧节点的属性
        if(oldProps[prop] !== newProps[prop]){
            //更新为新的属性值
            attrPatch[prop] = newProps[prop]; // 修改或删除（null）
        }
    }
    for(let prop in newProps) {
        //如果在旧节点上新增了属性
        if(!oldProps.hasOwnProperty(prop)){
            //保存新的属性值
            attrPatch[prop] = newProps[prop]; // 新增属性
        }
    }
    return attrPatch;
}

//遍历对比新旧dom的子节点
function childrenWalk(oldChildren, newChildren) {
    //借助childIndex获取newChildren中的对应的子节点
    oldChildren.map((oldChild, childIndex) => {
        //遍历子节点， ++vNodeIndex用于更新节点的下标
        vNodeWalk(oldChild, newChildren[childIndex], ++vNodeIndex);
    });
}
export { domDiff };