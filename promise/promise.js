// promise 原理
const PENDING = 'PENDING';
const FUFILLED ='FUFILLED';
const REJECTED ='REJECTED';
class Promise {
    constructor(executor) {
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING
        let resolve = (value)=>{
            if (this.status ===PENDING){
                this.value =value;
                this.status =FUFILLED
            }
        }
        let reject = (reason)=>{
            if(this.status === PENDING){
                this.reason =reason
                this.status =REJECTED
            }
        }
        // 创建Promise executor会立即执行
        try{
            executor(resolve,reject);
        }catch (e) {
            reject(e)
        }
    }
    then(onFulfilled,onRejected){
        if(this.status ===FUFILLED){
            onFulfilled(this.value)
        }
        if(this.status ===REJECTED){
            onRejected(this.reason)
        }
    }
}
// 导出当前类 commonjs定义方式
module.exports = Promise
