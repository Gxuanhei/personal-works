// 静态类型
let b: number = 123;
b = 12

interface Person {
    name: string
}

const teacher: Person = {
    name: 'dell lee',
    say(): string {
        return  'qwe'
    }
}

// 函数

/*
静态类型不但类型无法更改 其属性和方法也会随之确定
静态类型发现潜在问题
编辑器友好提示
 */

// type Point = { x: number, y: number } // 类型别名
interface Point {
    x: number,
    y: number
}

function tsDemo(data: Point) {
    return Math.sqrt(data.x ** 2 + data.y ** 2);
}

tsDemo({x: 1, y: 123})

console.log('123 asd')

// 基础类型 null undefined symbol boolean void
const count: number = 123
const teacherName: string = '123'

// 引用类型 object array
// 对象
const teacherHHH: {
    name: string,
    age: number
} = {
    name: 'dell',
    age: 18
}
// 数组
const numbers: number[] = [1, 2]

// 类
class PersonCls {
}

//函数
const dell: PersonCls = new PersonCls()

const getTotal23: () => number = () => {
    return 123
}
