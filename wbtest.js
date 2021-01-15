/**
 * @description JS难点
 * @author king
 */

 const { getType } = require('./wbUtils')

// lodash库

//  let a = {
//      name: 'Julia',
//      age: 20
//  }

//  function change (o) {
//      o.age = 24;
//      console.log('1111',o);
     
//      o = {
//          name: 'Kath',
//          age: 30
//      }
//      console.log('2222',o);
//      console.log('33333',a);
     
     
//      return o
//  }

//  let b = change(a)
//  console.log(b);
//  console.log(a);
 
//  console.log(typeof null);
 
// let str = '123'
// console.log(typeof str);

// console.log(getType([]));

// console.log('123' == 123);
// console.log('' == 0);
// console.log([] == 0);
// console.log([] == '');
// console.log([] == ![]);

// 浅拷贝:
// 创建一个对象,接收要复制或引用的对象值.如果对象属性是基本的数据类型,复制的就是基本类型的值给新对象
// 如果属性是引用数据类型,复制的就是内存中的地址,如果其中一个对象改变了这个内存中的地址,肯定会影响到另一个对象
// Object.assign(target, source) 可用于浅拷贝


// let target = {}
// let source = { a: { b: 2 }}
// Object.assign(target, source)
// console.log(target);
// source.a.b = 10
// console.log(source);
// console.log(target);

// let obj = { a: 1, b: { c: 1 }}
// let obj2 = {...obj}
// obj.a = 2
// console.log(obj);
// console.log(obj2);


// let arr = [1, 2, 3]
// let newArr = arr.concat()
// newArr[1] = 99
// console.log(arr);
// console.log(newArr);

// let arr = [ {a: 1}, {b: 2}, {c: 3}]
// let newArr = arr.concat()
// newArr[1].b = 99
// console.log(arr);
// console.log(newArr);

let arr = [1, 2, { val: 4 }]
let newArr = arr.slice()
console.log(arr);
console.log(newArr);








