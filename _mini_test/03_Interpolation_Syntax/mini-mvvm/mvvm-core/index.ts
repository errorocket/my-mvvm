import reactive from "../reactive";
import Dep from "../dep";
import Compiler from "../compiler";

export default class ViewModel {
    $el: HTMLDivElement;
    $data: Object;
    dep: Dep;
    compiler: Compiler

    constructor({
        el,
        data
    }) {
        this.$el = document.querySelector(el);
        this.dep = new Dep();
        this.$data = reactive(this, data());
        this.compiler = new Compiler(this);
    }
}