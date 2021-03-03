interface Bird {
    fly: boolean,
    sing: () => {}
}

interface Dog {
    fly: boolean,
    bark: () => {}
}

// 类型断言
function trainAnial(animal: Bird | Dog) {
    // 类型保护
    if (animal.fly) {
        (animal as Bird).sing()
    } else {
        (animal as Dog).bark()
    }

}

// in 语法做类型保护
function trainAnialSecond(animal: Bird | Dog) {
    // 类型保护
    if ('sing' in animal) {
        animal.sing()
    } else {
        animal.bark()
    }
}

// typeof 做类型保护
function add(first: string | number, second: string | number) {
    if (typeof first === 'string' || typeof second === 'string') {
        return `${first}${second}`
    }
    return first + second;
}


// class NumberObj {
//     count: number
// }
//
//
// function addSecond(first: object | NumberObj, second: object | NumberObj) {
//     if(first instanceof NumberObj && second instanceof NumberObj){
//         return first.count + second.count
//     }
// }
// addSecond({count:1},{count:2})
