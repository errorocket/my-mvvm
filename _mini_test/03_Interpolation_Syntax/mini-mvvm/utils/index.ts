import ViewModel from "../mvvm-core";

function getDeepVal(vm: ViewModel, path: string) {
    let res = vm.$data;
    const keys = path.split('.');
    while(keys.length) {
        res = res[keys.shift() as string];
    }
    return res;
}

function setDeepVal(vm: ViewModel, path: string, newVal:any) {
    const keys = path.split('.');
    let res = vm.$data;
    while(keys.length) {
        let key = keys.shift() as string;
        if (keys.length) {
            res = res[key];
        } else {
            res[key] = newVal;
        }
    }
}

function isNodeElement(node: ChildNode) {
    return node.nodeType === 1;
}

const isInsertSyntax = /\{\{(.+?)\}\}/;

export  {
    getDeepVal,
    setDeepVal,
    isNodeElement,
    isInsertSyntax
}