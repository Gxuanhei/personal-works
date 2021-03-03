// 接口
interface Person {
    // readonly stNumber:string 只能读不能写
    name: string;
    age?: number;

    [propName: string]: any; // 允许传递其他参数  只要时字符串类型，可以是任意值

    say(): string; //规定传一个say方法 并且返回值必须是一个string
}

// 接口teacher 继承了person的所有属性方法
interface Teacher extends Person {
    teach(): string
}

// 接口定义了一个函数的声明 这个函数叫sayHi 同时它接受一个字符串类型的声明 并返回一个字符串
interface SayHi {
    (word: string): string
}


// 别名
type  Person12 = {
    name: string
}
type  Person23 = string
/*
接口只能以对象的形式存在
规范为能用接口表示的类型尽量使用接口

规定了接口时
interface Person {
    name: string,
    age?: number
}

在以字面量的形式去传递参数时 会对参数进行强校验
getPerson({
    name: 'qwe',
    age: 123
})

而用变量的形式不会
const person = {
    name: 'dell',
    sex: 'male'
}
getPerson2(person)
 */
const person = {
    name: 'dell',
    age: 123,
    sex: 'female',
    say() {
        return 'qwe';
    }
}
const person2 = {
    name: 'dell',
    age: 123,
    say() {
        return 'qwe';
    },
    teach(){
        return 'qwe';
    }
}

const getPerson = (person: Person): void => {
    console.log(person)
}

const getPerson2 = (person: Teacher): void => {
        console.log(person)
}

const setPersonName = (person: Person, name: string,): void => {
    person.PersonName = name
}


const say: SayHi = (word: string) => {
    return '' + word
}
const teach = () => {
    return 'qwe'
}

getPerson(person)
getPerson2(person2)
setPersonName(person2, '123')

// 一个类去应用一个接口
// 那这个类就必须包含接口里面所有的方法及其属性
class User2 implements Person {
    name = 'qwe'
    say() {
        return 'hello'
    }
}

