// promise
// 解决并发问题 同步多个异步方法的执行结果
// 链式调用问题   先获取name，通过name在获取age 解决回调地狱

// Promise是一个类
// 1.每次new 一个promise都需要传递一个执行器，执行器立即执行
// new Promise(()=>{
//     console.log('init')
// })
// console.log('2') // init 2

//2.执行器中有两个参数resolve,reject
//3.默认Promise有三个状态 pendding => resolve 表示成功了 reject就是拒绝
//4.一旦成功了，就不能变成失败，一旦失败，不能再成功了
let Promise = require('./promise')

let p = new Promise((resolve,reject)=>{
    resolve('成功')
})
p.then(data=>{
    console.log('success',data) //失败的回调
},err =>{
    console.log('error',err) //失败的回调
})



