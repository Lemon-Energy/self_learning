// var a = []
// for (var i = 0; i < 10; i++) {
//     a[i] = function() {
//         console.log(i)
//     }
// }

// a[6]() // 10

// var tmp = 123
// if (true) {
//     console.log(tmp);
//     let tmp
// } 

// var arr = [12, 34, 32, 89, 4]
// console.log(arr.sort((a, b) => a-b)[0])

var a = 10
var obj = {
    a: 20,
    fn () {
        setTimeout(() => {
            console.log(this.a)
        })
    }
}
obj.fn() // 和GC相关