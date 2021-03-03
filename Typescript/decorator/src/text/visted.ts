// 访问器的装饰器
function visitedDecorator(target: any, key: string, descriptor: PropertyDescriptor) {

}

class Visted {
    private _name: string
    constructor(name: string) {
        this._name = name
    }

    get name() {
        return this._name
    }

    @visitedDecorator
    set name(name:string) {
        this._name = name
    }
}

const tes = new Visted('dell')

tes.name = '123123123'
console.log(tes.name);
