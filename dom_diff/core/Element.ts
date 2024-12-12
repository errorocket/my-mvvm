//将元素节点的信息封装到虚拟节点中

class Element {
    type: string;
    props: object;
    children: Array<Element | string>

    constructor(type: string, props: object, children: Array<Element | string>){
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

export { Element } ;