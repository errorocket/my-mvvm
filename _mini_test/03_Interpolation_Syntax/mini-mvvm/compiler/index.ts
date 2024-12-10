import ViewModel from "../mvvm-core";
import { isInsertSyntax, isNodeElement } from "../utils";
import directives from "../directives";


export default class Compiler {
    vm:ViewModel

    constructor(vm: ViewModel) {
        this.vm = vm;
        this.compile(vm.$el);
    }
    compile($el: HTMLDivElement) {
        const nodes = $el.childNodes;
        [...nodes].forEach(node => {
            if (isNodeElement(node)) {
                this.compileElementNode(node as HTMLElement);
                this.compile(node as HTMLDivElement)
            } else {
                this.compileTextNode(node as HTMLElement);
            }
        });
    }
    compileElementNode(node: HTMLElement) {
    }
    compileTextNode(node: HTMLElement) {
        const text = node.textContent as string;
        if (isInsertSyntax.test(text)) {
            directives['text'](node, this.vm, text)
        }
    }
}