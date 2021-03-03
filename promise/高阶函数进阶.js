//  1.高阶函数
//  一个函数的参数 是一个函数 （回调）
// 一个函数 返回一个函数（拆分函数 ）

// 函数的before
// 希望将函数的核心逻辑提取出来，在外面增加功能
// Function.prototype.before = function (beforeFn) {
//     return (...args) => {// 箭头函数除了没有arguments指向
//         beforeFn();
//         this(...args);
//     }
// }
// // AOP 面向切片编程 装饰
// const say = (...args) => { // 剩余运算符把所有的参数组成一个数组
//     console.log('说话', args)
// }
// // 重写原型上的方法 扩展
// const newSay = say.before(() => {
//     console.log("您好")
// })
// //
// const newSay1 = say.before(() => {
//     console.log("天气很好")
// })
//
// newSay(1, 2, 3);
// newSay1();
//
// //2. 事务化  事务开始的时候做某件事 结束的时候做某件事
//
// const perform = (anymethid, wrappers) => {
//     wrappers.forEach(warp => {
//         warp.initialize()
//     });
//     anymethid();
//     wrappers.forEach(warp => {
//         warp.close()
//     });
// }
//
//
// perform(() => {
//     console.log('说话')
// }, [
//     {// wrapper
//         initialize() {
//             console.log('您好')
//         },
//         close() {
//             console.log('再见')
//         }
//     }, {// wrapper2
//         initialize() {
//             console.log('您好1')
//         },
//         close() {
//             console.log('再见2')
//         }
//     },
// ])
// 3.柯里化 我们可以把一个大函数拆分成很多具体的功能
//  将一个函数拆分成多个函数
//  判断类型 Object.prototype.toString.call  (数组，字符串)
// Object.prototype.toString.call('123');
// const checkType = (content,type) =>{
//     return Object.prototype.toString.call(content)=== `[object ${type}]`
// }

// const b = checkType(123,'Number');

// console.log(b)

// const checkType = (type) => {
//     return (content) => {
//         return Object.prototype.toString.call(content) === `[object ${type}]`
//     }
// }
//
// // 闭包
// let types = ['Number', 'String', 'Boolean'];
// let utils = {}
// types.forEach(type => {
//     utils['is' + type] = checkType(type)
// })
// // let isString = checkType('String')
//
// console.log(utils.isString('123'))
// console.log(utils.isNumber('456'))
//  函数柯里化怎么实现
// const checkType = (type, content) => {
//     return Object.prototype.toString.call(content) === `[object ${type}]`
// }

// 柯里化 每个函数都返回一个函数，每个函数都传一个参数
// 通用柯里化
// const add = (a, b, c, d, e) => {
//     return a + b + c + d + e;
// }
// const curring = (fn, arr=[]) =>{
//     let len = fn.length
//     return (...args)=>{
//             arr = arr.concat(args)
//             if(arr.length < len){
//                 return curring(fn,arr)
//             }
//             return fn(...arr)
//     }
// }
// let r = curring(add)(1,2)(3,4)(5); // [1,2,3,4,5]
// console.log(r)


const curring = (fn, arr=[]) =>{
    let len = fn.length
    return (...args)=>{
            arr = arr.concat(args)
            if(arr.length < len){
                return curring(fn,arr)
            }
            return fn(...arr)
    }
}
const checkType = (type, content) => {
    return Object.prototype.toString.call(content) === `[object ${type}]`
}

let types = ['Number', 'String', 'Boolean'];
let utils = {}
types.forEach(type => {
    utils['is' + type] = curring(checkType)(type)
})
console.log(utils.isString('hello'))

// 4.  after    在什么之后

const after = (times,fn) =>{ //after 可以生成新的函数 等待函数执行次数打到我的预期时执行
    return () => {
        if(--times === 0){
            fn()
        }
    }
}

let newAfter = after(3,()=>{
    console.log('三次后调用')
})

newAfter();
newAfter();
newAfter();
// lodash after 并发的问题 发布订阅 观察者模式

// 5.  希望读取数据 node 异步 会等待同步代码完成后执行
// const fs = require('fs');
// let school= {};
// let index = 0;
// function out(){
//     if(index ===2) {
//         console.log(school)
//     }
// }
// 并发的问题，如何解决 计数器
// fs.readFile('name.text','utf8',(err,data) =>{
//     // console.log(data)
//     school['name'] = data
//     fs.readFile('age.text','utf8',(err,data) =>{
//         school['age'] = data
//         console.log(school)
//     })
// })
//
// fs.readFile('name.text','utf8',(err,data) =>{
//     school['name'] = data;
//     index++;
//     out()
// })
//
// fs.readFile('age.text','utf8',(err,data) =>{
//     school['age'] = data
//     index++
//     out()
// })

// 6.发布订阅模式

//
// const fs = require('fs');
// let school= {};
//
// e.on(()=>{
//     if(Object.keys(school).length === 2){
//         console.log(shcool)
//     }
// })
//
// fs.readFile('name.text','utf8',(err,data) =>{
//     school['name'] = data;
//     index++;
//     out()
// })
//
// fs.readFile('age.text','utf8',(err,data) =>{
//     school['age'] = data
//     index++
//     out()
// })

// 7.观察者模式
// class Subject {   // 被观察者
//     constructor() {
//         this.arr = [];
//         this.state = '我很开心'
//     }
//     attch(o){   // 原型上的方法
//         this.arr.push(o)
//     }
//     setState(newState){
//         this.state = newState
//         this.arr.forEach(o => o.updata(newState))
//     }
// }
// class Observer {   // 观察者
//     constructor(name) {
//         this.name =name
//     }
//     updata(newState){
//         console.log(this.name + '小宝宝：' + newState)
//     }
// }
// let s  =new Subject('s');
// let o1 = new Observer('o');
// let o2 = new Observer('o');
//
// s.attch(o1);
// s.attch(o2)
//
// s.setState('我不开心')
// 第二种
function Subject() {
    this.arr = [];
    this.state = 'xxx';
}
Subject.prototype.attact = function (o) {

}
Subject.prototype.setState = function (o) {

}
