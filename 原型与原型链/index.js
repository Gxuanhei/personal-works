/**
 * 对应名称
 * -prototype: 原型
 * -_proto_: 原型链（连接点）
 * 
 * 从属关系：
 * prototype => 函数的一个属性：对象{}
 * 
 * _proto_ => 对象Object的一个属性：对象{}
 * 
 * 对象的_proto_保存着该对象的构造函数的prototype
 * 
 * 
 */

function Test() {}

console.log(Test.prototype);

const test = new Test();

console.log(test._proto_);
console.log(test._proto_ === Test.prototype);


// Test.prototype => { _proto_ };

console.log(Test.prototype._proto_ === Object.prototype);
console.log(Object.prototype)
console.log(Object.prototype._proto_); // null   => _proto_ 的顶层就是Object.prototype/null


// 上面是从属关系，下面深入认识原型链、原型和原型继承
// 每次获取对象的属性时都会现在对象的属性开始读取，没有则开始读取原型链的prototype没有则访问prototype._proto_的prototypr以此类推

/**
 * 
 * 
 test{
  a: 1,
    _proto_: Test.prototype = {
      b: 2,
      _proto_: Object.prototype = {
        c: 3,
        _proto_: null
      }
  }
}
 * 
 */


/**
 *  Function和Object:函数 对象
 */
console.log(Test._proto_ === Function.prototype);


console.log(Function._proto_);
console.log(Function.prototype);
console.log(Function._proto_ === Function._proto_);

console.log(typeof Object);
console.log(Object._proto_ === Function.prototype);
console.log(Object._proto_ === Function._proto_);

// 这个方法用来判断该属性是否存在当前对象的prototype种，但不寻找原型链内的
console.log(test.hasOwnProperty("a"));

// 这个方法用于判断是否在链上，包括对象内
console.log("a" in test);

// test.constructor => 是属于对象本身的，并不属于Test，而且能够更改
console.log(test.constructor === Test);

function Test1() {
    this.a = 1;
}

test.constructor = Test1;