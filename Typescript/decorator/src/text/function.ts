// 方法装饰器

// 普通方法 target对应的是类的prototype
// 静态方法 target对应的是类的构造函数
function getNameDecortor4(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(target, key);
    // descriptor.writable = false
}

class Fun {
    name: string

    constructor(name: string) {
        this.name = name
    }

    @getNameDecortor4
    getName() {
        return this.name
    }
}

// const fun = new Fun('dell')
// console.log(fun.getName());
// test.getName = () => {
//  return '123'
// }
