/*
访问类型和构造器
private protected public 访问类型

默认隐藏了public访问类型
class hhqwe {
    name: string | undefined
}

public 允许我在类的内外被调用
private 允许在类内被使用
protected 允许在类内及继承的子类中使用
 */


class hhqwe {
    public name: string | undefined
    protected age: number | undefined
    private sex: number | undefined

    public sayhl() {
        console.log(this.name);
        console.log('hi')
    }
}

class hwe extends hhqwe {
    public sayBye() {
        console.log(this.age)
    }
}

const pew = new hhqwe()
pew.name = 'dell'
console.log(pew.name)

// constructor

class PersonLess {
    private name: string | undefined;

    constructor(name: string) {
        this.name = name
    }
}

const personLess = new PersonLess('dell')
/*
//传统写法
class PersonLess {
    private name: string | undefined;

    constructor(name: string) {
        this.name = name
    }
}
上面的代码等同与

// 简化写法
class PersonLess {
    constructor(public name: string) {
        this.name = name
    }
}

 */

class Person44 {
    constructor(public name: string) {

    }
}
class Teacher44 extends Person44{
    constructor(age: number) {
        super('dell');
    }
}

const tea = new Teacher44(2)
