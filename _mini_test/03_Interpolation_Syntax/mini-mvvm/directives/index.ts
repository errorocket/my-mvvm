import ViewModel from "../mvvm-core";
import { isInsertSyntax, getDeepVal} from "../utils";

export default {
    text(node: HTMLElement, vm:ViewModel, text: string) {
        let propName = '';
        const callBack = () => {
            node.textContent = text.replace(isInsertSyntax, (match, ...args) => {
                let key = args[0] as string;
                key = key.trim();
                propName = key;
                return getDeepVal(vm, key) as string;
            })
        }
        callBack();
        propName = propName.split('.').slice(-1)[0];
        vm.dep.add(propName, callBack);
    }
}