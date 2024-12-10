import ViewModel from "../mvvm-core";

export default function reactive(vm:ViewModel, target: object) {
    return new Proxy(target, {
        get(target, key){
            const val = Reflect.get(target, key);
            return val && typeof val === 'object' ? reactive(vm, val) : val;
        },
        set(target, key, newVal){
            const isSuccess = Reflect.set(target, key, newVal);
            vm.dep.notify(key as string);
            return isSuccess;
        }
    });
}