interface Person {
    name: string;
    age: number;
    gender:string
}

class Teacher {
    constructor(private info:Person) {

    }
    getInfo(key:string) {
        if(key === 'name' || key ==='age' || key === 'gender'){
            return this.info[key]
        }
    }
}

const teacher = new Teacher({
    name: 'dell',
    age: 18,
    gender: 'male'
})

const test = teacher.getInfo('name')

console.log(test);
// 结合泛型和keyof的写法

interface Person2 {
    name: string;
    age: number;
    gender:string
}

/*
<T extends keyof Person2>
这句话的意思是一个遍历
T extends 'name' 等价与type T = 'name'
T extends 'age'
T extends 'gender'

那么这个过程相当于
type T = 'name'
key: 'name;
Person['name']
 */

// 类型可能是一个字符串
//  type NAME = 'name'
//  const abc:NAME = 'name'
class Teacher2 {
    constructor(private info:Person2) {

    }
        getInfo<T extends keyof Person2>(key:T):Person[T] {
            return this.info[key]

    }
}

const teacher2 = new Teacher2({
    name: 'dell',
    age: 18,
    gender: 'male'
})

const test2 = teacher2.getInfo('name')

console.log(test2);
