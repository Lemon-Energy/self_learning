// 测试引用lodash
// let _ = require('lodash')

// const arr = ['jack', 'lemon']

// console.log(_.first(arr))

// 题目如下
const fp = require('lodash/fp')
// 数据

// horsepower 马力，dollar_value 价格， in_stock 库存
const cars = [
    {
        name: 'Ferrari FF',
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true
    },
    {
        name: 'Spyker C12 Zagato',
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    },
    {
        name: 'Jaguar XKR-S',
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: 'Audi R8',
        horsepower: 525,
        dollar_value: 114200,
        in_stock: false
    },
    {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true
    },
    {
        name: 'Pagani Huayra',
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false
    },
]

// 第一题：使用函数组合fp.flowRight() 重新实现下面的函数
let isLastInStock = function (cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取租后一条数据的in_stock属性值
    return fp.prop('in_stock', last_car)
}

// console.log(isLastInStock(cars))

// fp.flowRight()写法
const lastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log('第一题答案，最后一台车的库存',lastInStock(cars))

// 第二题：使用fp.flowRight、fp.prop、fp.first获取第一个car的name
const firstName = fp.flowRight(fp.prop('name'), fp.first)
console.log('第二题答案，第一台车的名字',firstName(cars))

// 第三题：使用帮组函数_average重构averageDollarValue，使用函数组合的方式实现
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
/**上面的函数不改 */
// let averageDollarValue = function (cars) {
//     let dollar_values = fp.map(function(car) {
//         return car.dollar_value
//     }, cars)
//     return _average(dollar_values)
// }

// 重构后
let averageDollarValue = function (cars) {
    let dollar_values = fp.map(fp.prop('dollar_value'), cars)
    return _average(dollar_values)
}

console.log('第三题答案',averageDollarValue(cars))

// 第四题：使用flowRight写一个sanitizeNames()函数，返回一个下划线链接的小写字符串，把数组中的name转换为这种形式：例如：sanitizeNames(['Hello World']) => ['hello_world]
let _underscore = fp.replace(/\W+/g, '_')
let sanitizeNames = fp.flowRight(fp.map(_underscore),fp.map(fp.toLower),fp.map(fp.prop('name')))
console.log('第四题答案', sanitizeNames(cars))

/**-----------华丽的分割线--------------- */
// 基于下面提供的代码完成4个练习
class Container{
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map (fn) {
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of(x) {
        return new Maybe(x)
    }
    isNothing() {
        return this._value === null || this._value === undefined
    }
    constructor(x) {
        this._value = x
    }
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}

// module.exports = {Maybe, Container}

// 练习1： 使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1

let maybe = Maybe.of([5,6,1])
let ex1 = (x) => {
    return fp.map(fp.add(1), x)
}
let ex1r = maybe.map(ex1)
console.log('练习1答案', ex1r)

// 练习2：实现一个函数ex2，能够使用fp.first获取列表的第一个元素
// 验证数据，第一个元素由do改为di
let xs = Container.of(['di','ray','me','fa','so','la','ti','do',])

let ex2 = (x) => {
   return fp.first(x)
}

let ex2r = xs.map(ex2)
console.log('练习2答案', ex2r)

// 练习3：实现一个函数ex3，使用safeProp 和 fp.first找到user的名字的首字母
let safeProp = fp.curry(function(x, o) {return Maybe.of(o[x])})
let user = {id: 2, name : 'Albert'}

let ex3 = (x) => {
    return fp.first(x)
}

let ex3r = safeProp('name', user).map(ex3)
console.log('练习3答案', ex3r)

// 练习4：使用Maybe重写ex4，不要有if语句
let ex4 = function(n) {
//    if (n) {
//        return parseInt(n)
//    }
    return Maybe.of(n).map((n) => {return parseInt(n)})
}

let ex4r = ex4('4')
console.log('练习4答案', ex4r)