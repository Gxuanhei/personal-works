// 泛型 泛指得类型 generic 基础泛型

// function join(first:string|number,second:string|number) {
//     return `${first}${second}`
// }
//
// join(1,1)

function join<ABC>(first: ABC, second: ABC) {
    return `${first}${second}`
}

function map<ABC>(param: ABC[]) {
    return param
}

function map2<T, D>(first: T, second: D) {
    return `${first}${second}`
}

function map3<T, D>(first: T, second: D): T {
    return first
}

map2<number, string>(1, '1')

join<string>('1', '1')
join<number>(1, 1)

map(['1'])

// 类中的泛型
// class DataManager {
//     constructor(private data: string[]) {
//
//     }
//
//     getItem(index: number) {
//         return this.data[index];
//     }
// }
//
// const data = new DataManager(['1']);
// data.getItem(0)

interface Item {
    name: string;
}

class DataManager<T extends Item> {
    constructor(private data: T[]) {

    }

    getItem(index: number): string {
        return this.data[index].name;
    }
}

const data = new DataManager([{
    name: 'dell'
}])

data.getItem(0)


class DataManager2<T extends number | string> {
    constructor(private data: T[]) {
    }

    getItem(index: number): T {
        return this.data[index]
    }
}

interface Test {
    name: string
}

const data = new DataManager2<number>([])

// 泛型在函数中的用法 作为具体的类型注解
const func: <T>() => string = <T>() => {
    return '123'
}
