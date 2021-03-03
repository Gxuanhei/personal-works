let p = new Promise((resolve,reject)=>{
    resolve('成功')
})
p.then(data=>{
    console.log('success',data) //失败的回调
},err =>{
    console.log('error',err) //失败的回调
})
