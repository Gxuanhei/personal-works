function hello() {
}

const hello1 = function () {
}

const hello2 = () => {
}

function add(first: number, second: number): number {
    return first + second;
}

const total = add(1, 2)

function sayHello(): void {
    console.log('hello')
}

// function err():never {
//     while (true){
//     }
// }

function add2({
                  first, second
              }:
                  {
                      first: number, second: number
                  }) {
    return first + second

}

const total2 = add2({first: 1, second: 2})

function getNumber({
                       first
                   }:
                       {
                           first: number
                       }) {
    return first

}

const count56 = getNumber({first: 1})

// 下面三个函数写法意义一样
const func = (str: string) => {
    return parseInt(str, 10) //解析一个字符串返回一个整数 10进制
}
const func1 = (str: string): number => {
    return parseInt(str, 10) //解析一个字符串返回一个整数 10进制
}

const func2: (str: string) => number = (str) => {
    return parseInt(str, 10) //解析一个字符串返回一个整数 10进制
}

const date: Date = new Date();
const date1 = new Date();

// 其他的case
interface Person3 {
    name: 'string'
}

const rawData = '{"name":"dell"}';
const newData: Person3 = JSON.parse(rawData)

let temp: number | string = 123;
temp = '123'
