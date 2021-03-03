// 类的装饰
function testDec() {
    return function <T extends new (...arg: any[]) => {}>(constructor: T) {
        return class extends constructor {
            name = 'lee'

            getName() {
                return this.name
            }
        }
    }
}
const Test2 = testDec()(class {
    name: string
    constructor(name: string) {
        this.name = name
    }
})

const test1 = new Test2('dell')
console.log(test1.getName());

// class Te {
//     name: string
//
//     constructor(name: string) {
//         this.name = name
//     }
// }
//
// const ter = new Te('dell')
// console.log(ter.getName())
