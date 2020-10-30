// 将一下代码改成promise的方式

// setTimeout(function() {
//   var a = 'hello'
//   setTimeout(function() {
//     var b = 'lagou'
//     setTimeout(function() {
//       var c = 'I ❤️ U'
//       console.log(a + b + c)
//     }, 10)
//   }, 10)
// }, 10)

let a, b, c = '';
let pa = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            a = 'hello'
            resolve(a)
        }, 10)
    })
}
let pb = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          b = 'lagou'
          resolve(b)
        }, 10)
    })
} 
let pc = function() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            c = 'I ❤️ U'
            resolve(c)
          }, 10)
    })
} 

pa().then(() => {
    return pb()
}).then(() => {
    return pc()
}).then(() => {
    console.log(a + b + c)
})