//

function Card() {
    this.color = "red";
}

// new 操作符就是为了把card的内部this指向自身，
// 默认创建this，并且return this;
// new的时候return值类型的时候还是默认return this；
// 如果是return引用类型则返回对应的，不返回this
// 不使用new 其实也是可以的，自己创建一个函数变量伪装this，return就好了