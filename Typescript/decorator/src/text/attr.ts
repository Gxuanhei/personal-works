// 属性的装饰器

// 修改的并不是实例上的name
function attrDecorator(target: any, key: string): any {
    target[key] = 'lee'
    // const descriptor: PropertyDescriptor = {
    //     writable: false
    // }
    // return descriptor
}

// name放在实例上
class Attributed {
    @attrDecorator
    name = 'dell'
}

const ar = new Attributed()
// console.log(test.__proto__.name); // 打印原型上的name

const attribu = new Attributed()
console.log(attribu.name);
