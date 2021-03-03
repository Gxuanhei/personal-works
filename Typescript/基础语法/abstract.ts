class person567 {
    private _name: string

    constructor(public name3: string) {
        this._name = name3
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }
}

const person32 = new person567('dell')
person32.name = 'jjj'
console.log(person32.name);

// 方法二
/*
readonly方法 只能读不能改
 */
class person321 {
    readonly name: string

    constructor(name: string) {
        this.name = name
    }
}

//抽象类
/*
当很多类都有很多通性的方法时，就可以定义一个抽象的类

抽象类只能被继承  不能被实例化 不能以new Geom的形式去用
 */
abstract class Geom {
    width: number | undefined

    getType() {
        return 'Gemo'
    }

    abstract getArea(): number

}

class Circle extends Geom {
    getArea() {
        return 12
    }
}

class Square extends Geom {

    getArea() {
        return 12
    }
}

class Triangle extends Geom {
    getArea() {
        return 12
    }
}


//
interface perss {
    name: string
}

interface teaee extends perss {
    teachChange: number
}

interface studd extends perss {
    age: number
}

const teacher2222 = {
    name: 'dell',
    teachChange: 123
}

const student3333 = {
    name: 'lee',
    age: 18
}

const getUserInfoNow = (user: perss) => {
    console.log(user.name);
}
getUserInfoNow(teacher2222)
getUserInfoNow(student3333)
