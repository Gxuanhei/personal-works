// 参数装饰器
// 原型 方法名 参数所在位置
function paramDecorator(target: any, method: string, paramIndex: number): any {
    console.log(target, method, paramIndex);
}

// name放在实例上
class Params {
    getInfo(@paramDecorator name: string, age: number) {
        console.log(name, age);
    }
}

const par = new Params()
par.getInfo('el', 12)
// console.log(test.__proto__.name); // 打印原型上的name

