import ViewModel from "./mvvm-core";

const vm = new ViewModel({
    el: '#app',
    data() {
        return {
            title: 'hello Vue3',
            person: {
                age: 20
            }
        }
    }
});

Object.defineProperty(window, 'vm', {
    get() {
        return vm;
    },
    set(vm) {
        vm = vm;
    }
});