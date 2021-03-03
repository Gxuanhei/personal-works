// 静态属性 setter/getter

// getter用法
class Person555 {
    constructor(private _name: string) {

    }

    get name() {
        return this._name
    }

    set name(name: string) {
        const realName = name.split(' ')[0]
        this._name = realName
    }
}

const per = new Person555('della')
per.name //  这样可以执行调用私有属性
per.name = 'dell lee gg '
console.log(per.name);

// 单例模式

class demo22 {
    private static instance: demo22

    private constructor(name: string) {
    }

    static getInstance(name:string) {
        if (!this.instance) {
            return new demo22(name)
        }
        return this.instance
    }
}

const demo123 = demo22.getInstance('qwe')
const demo124 = demo22.getInstance('ee')
