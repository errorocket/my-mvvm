 import { test, expect } from 'vitest';

 import ViewModel from '../mvvm-core';

test('测试: v-model 和 插值语法', () => {
    document.body.innerHTML = `
        <div id="root">
            <h3 id='poemContent'>{{ content.poem }}</h3>
            <input type="text" placeholder="Please type the poem ..." v-model="content.poem" />
        </div>
    `
    const vm = new ViewModel({
        el:'#root',
        data(){
            return {
                content:{
                    poem:'偶尔想念'
                }
            }
        }
    })

    expect(document.getElementById('poemContent').innerText === '偶尔想念').toBe(true);

    vm.$data.content.poem = '经常偶尔';

    expect(document.getElementById('poemContent').innerText === '经常偶尔').toBe(true);

})

test('测试: v-bind 和 插值语法', () => {
    document.body.innerHTML = `
        <div id="root">
            <h3 id='poemContent'>{{ poem }}</h3>
            <input id='input' type="text" placeholder="Please type the title ..." v-bind="poem" />
        </div>
    `
    const vm = new ViewModel({
        el:'#root',
        data(){
            return {
                poem:'偶尔想念'
            }
        }
    })
    expect(document.getElementById('poemContent').innerText === '偶尔想念').toBe(true);
    expect(document.getElementById('input').value === '偶尔想念').toBe(true);
    vm.$data.poem = '经常偶尔';
    expect(document.getElementById('poemContent').innerText === '经常偶尔').toBe(true);
    expect(document.getElementById('input').value === '偶尔想念').toBe(true);
})

test('测试: 深度数据劫持 和 消息订阅与发布', () => {
    const vm = new ViewModel({
        el:'#root',
        data(){
            return {
                a:{
                    b:{
                        c:{
                            d:1
                        }
                    }
                }
            }
        }
    })

    //一旦d值被修改，由于对data数据进行了深度数据劫持，可以检测到d值修改，同时通知消息回调函数执行

    
    let result = '';
    //消息回调函数
    const callBack = () => {
        result = 'd被修改了';
    }
    //对d进行依赖收集
    vm.dep.add('d', callBack);
    //修改d值
    vm.$data.a.b.c.d = 2;
    expect(result === 'd被修改了').toBe(true);
    
})