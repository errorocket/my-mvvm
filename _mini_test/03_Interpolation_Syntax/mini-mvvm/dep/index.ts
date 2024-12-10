export default class Dep {
    add(key: string, cb: Function) {
        if (!this[key]) {
            this[key] = [cb];
        } else {
            this[key].push(cb);
        }
    }
    notify(key: string) {
        if (this[key]) {
            this[key].forEach(cb => cb());
        }
    }
}