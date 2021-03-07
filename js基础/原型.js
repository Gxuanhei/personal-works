// prototype就是new 构造出来的对象的共同祖先
// 所有被构造出来的对象都能基础该原型上的属性和方法

// 如果自己this上存在的属性，就不会从原型prototype上去找

// 属性一般写在this上挂载,方法挂载到prototype上

//实例对象的原型__proto__指向的是该对象所在的构造函数的原型对象
// 原型链的终点在Object.prototype