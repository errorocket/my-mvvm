//将元素节点的信息封装到虚拟节点中

class Element {
    constructor(type, props, children){
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

export { Element } ;