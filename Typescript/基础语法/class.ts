class Person123 {
    name = 'dell'

    getName() {
        return this.name
    }
}

class Teacher123 extends Person123 {
    getTeacherName() {
        return 'qwe'
    }

    getName() {
        return (super.getName()) + 'lee'
    }
}

const person123 = new Person123()
const teacher123 = new Teacher123()
console.log(person123.getName())
console.log(teacher123.getName())
console.log(teacher123.getTeacherName())
// 子类在继承父类的时候会继承父类所有的方法   并且可以覆盖父类的方法
/*
但是super 可以继承父类所有的方法和属性并且可以对其进行操作
eg: return (super.getName()) + 'lee'


super的用法 当我覆盖掉父类的方法，但我还想调用父类的方法时
 */
