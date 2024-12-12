import { Element } from "../core/Element";

// 虚拟dom节点的类型
export interface VirtualDom {
    type: string,
    props: object,
    children: Array<Element | string>
}

// 新旧虚拟dom对比之后的补丁包中的每一项
export interface PatchItem {
    index?: number, // 节点编号：节点被删除
    text?: string, // 文本变更
    attrs?: object, // 节点的属性补丁
    newNode?: VirtualDom | string, // 整个节点被替换
    type: PATHCH_TYPE, // 补丁类型
}

//封装补丁类型
export enum PATHCH_TYPE {
    ATTR,
    TEXT,
    REMOVE,
    REPLACE
}

export type PatchArr = Array<PatchItem>;