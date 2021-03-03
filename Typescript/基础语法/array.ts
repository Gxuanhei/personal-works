// 数组
const arr: (number | string)[] = [1, '2', 3]
const undefineArr: undefined[] = [undefined]
const stringArr: string[] = ['64']

// type alias 类型别名
type User = {
    name: string,
    age: number
}

class hello12 {
    name: string | undefined ;
    age: number | undefined ;
}

const objectArr: hello12[] = [
    new hello12(),
    {
        name: 'name',
        age: 12
    }
]
// 元组 tuple
const teacherInfo: [string, string, number] = ['dell', 'male', 18]

const teacherList: [string, string, number][] = [
    ['del', 'asd', 19],
    ['qwee', '12', 19],
    ['qwe', '3423', 19]
]
