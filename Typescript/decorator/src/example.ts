const userInfo: any = undefined

// 工厂模式，
function catchError(msg:string){
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const fn = descriptor.value
        descriptor.value = function () {
            try {
                fn()
            } catch (e) {
                console.log(msg);
            }
        }
    }
}

class Example {
    @catchError('user.name不存在')
    getName() {
        return userInfo.name
    }

    @catchError('user.age不存在')
    getAge() {
        return userInfo.age

    }
}

const te = new Example()
te.getName()


/*
// 普通写法
function catchError(target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = function () {
        try {
            fn()
        } catch (e) {
            console.log('userInfo不存在');
        }
    }
}

class Example {
    @catchError
    getName() {
        return userInfo.name
    }

    @catchError
    getAge() {
        return userInfo.age

    }
}

const te = new Example()
te.getName()
*/
