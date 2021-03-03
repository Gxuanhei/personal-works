// 类的装饰器
// 装饰器本身是一个函数
// 装饰器通过@符号使用
// 类的装饰器可以有多个
function testDecorator(constructor: any) {
    constructor.prototype.getName = () => {
        console.log('dell');
    }
    // console.log('decorator');
}

function testDecorator1(flag:boolean) {
    if(flag) {
        return function (constructor: any) {
            console.log('decorator1');
        }
    } else {
        return function (constructor: any){}
    }
}


@testDecorator
@testDecorator1(true)
class Test {

}

const test = new Test()

