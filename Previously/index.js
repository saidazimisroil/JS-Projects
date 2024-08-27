//-----------------------------------
// 52-Dars. Amaliy mashg'ulot.
// 1
/*
let circle = {
    radius: 1,
    get area(){
        return Math.PI * this.radius*this.radius;
    }
}
// console.log(circle.area);
*/
// 2
/*
let personJson = '{"age": 30, "name": "Abror"}';
try{
    let person = JSON.parse(personJson);
    if(!person.name)
        throw new Error('name not found')
    
    console.log(person.name);
}
catch(e){
    console.log('Xato: ', e.message);
}
*/
//-----------------------------------
//  51-Dars. "Promise"lar haqida.
/* 
let isBookshopOpen = true;

let willIGetNewBook = new Promise(
    // state: pending, result: undefined
    function (resolve, reject){ //executor function
        setTimeout(() =>{ // assync qilish uchun
            if(isBookshopOpen){
                let book = {
                    title: 'Dor ostidagi odam',
                    aythor: 'Amina Shenlik o`g`li'
                }
                resolve(book); // state: fullfilled, result: book 
            } else {
                let reason = new Error('Bookshop is not open');
                reject(reason); // state: reject, result: reason
            }
        }, 1500)
    }
)
// consumer
willIGetNewBook
    .then(result => console.log(result))
    .catch(error => console.log(error.message))

    */

//-----------------------------------
// 50-Dars. "this" haqida batafsil.
//  1) obyekt ichida ishlatilsa this => object
/*

const game = {
    title: 'Blur',
    play(){
        console.log(this);
    }
}
// game.play();

//  2) function ichida kelsa this => window or global (degan obyekt)
// biz dasturni node bn ishga tuwurganimz un ^ ga korstadi
function playGame(){
    console.log(this); // global obyekti
}
// playGame();

// 3) Constructor ichida kelsa this => obyekt
function Game(title){
    this.title = title;
    console.log(this);
}
let praetorians = new Game('Praetorians');

// Another sample : call back ichida
const race = {
    title: 'NFS',
    cars: ['BMW', 'Lamborghini', 'Ferrari', 'Porsche'],
    showCars(){
        // first way
        // this.cars.forEach(function(car){
        //     console.log(this.title, car);
        //     // console.log(this, car); // bu yerda this => global agar tashqarida this berilmasa
        // }, this) 
        
        // second way -> yaxshi emas
        // const that = this;
        // this.cars.forEach(function(car){
        //     console.log(that.title, car)
        // });

        // third way - THE BEST 
        this.cars.forEach(car => { // chiziqli funksiya this ni togri tushunadi
            console.log(this.title, car)
        });
    }
};
race.showCars();
*/

//-----------------------------------
//  49-Dars. let va var orasidagi farq.
/*
// global var o'zg lar brauzerning window obyektiga bog'lab qoyiladi
var color = 'yashil'; // tashqi paketlar bn conflict kelib chiqishiga olib keladi
console.log(window.color);

// func ichida var bn elon qilingan o'zg ning amal qilishi {} bn emas func bn belgilanadi
function start(){
    for(var i=0; i<5; i++){
        console.log(i);
    }
    console.log(i); // let bolganida xatolik ciqar edi
}
// console.log(i); // Xatolik

start();

*/

//-----------------------------------
//  46-47-Dars. getter va setter metodlari. Xatolar bilan ishlash
/*
let person = {
    firstName: 'Alisher',
    lastName: 'Navoiy',
    get fullName(){
        return this.firstName + ' ' + this.lastName;
    },
    set fullName(value){
        if(typeof value !== 'string') // Xatolik
            throw new Error('value string emas');
            
        let fullnameArray = value.split(' ');
        if(fullnameArray.length !== 2) // Xatolik
            throw new Error('Ism Familiyasini kiriting');
            
        this.firstName = fullnameArray[0];
        this.lastName = fullnameArray[1];
    }
}
try{
    person.fullName = '';
}
catch(e){
    console.log(e);
}
console.log(person);
*/
//-----------------------------------
// 45-Dars. Funktsiiyalarning parametrlari haqida.
/*
// arguments -> obyekt korinishida oladi
// ...args -> toplam korinishida oladi
function sum(...args){ /// ... -> rest parametri > ixtiyoriy param lar
    return args.reduce((a,b) => a + b);
}

function totalPrice(discount, ...price){
    return price.reduce((a,b)=> a+b)*(1-discount);
}

console.log(totalPrice(0.1,1,2,3,4,5)) // 10% chegirmadagi mahsulotlar narxi

*/

//-----------------------------------
// 44-Dars. Funktsiyani yozish usullari.
/*
// Function Declaration 
// bu func ni uning yuqorisida ham call qilish mumkin
// buning sababi HOISTING : hamma elon qilingan func lar file ning yuqorisiga olib chiqiladi
function read(){ console.log('o`qi'); } 

// Function Expression
// bu func ni u e'lon qilinganidan keyingina call qilish mumkin
// Named 
// let write = function write(){ console.log('yoz'); }

// Anonymous Function Expression
let write = function(){ console.log('yoz'); }

let me2 = write; // endi me2 va write bitta ref ga ega
write();
me2();

*/

//-----------------------------------
// 43-Dars. Amaliy mashg'ulot.
/* 
const books = [
    { title: 'Clean code', year: 2008, rating: 8.2 },
    { title: 'JavaScript: The Good Parts', year: 2008, rating: 6.1 },
    { title: 'Design Patterns', year: 1994, rating: 9.4 },
    { title: 'The Pragmatic Programmer', year: 1999, rating: 9.2 },
    { title: 'Improving the Design of Existing Code', year: 1999, rating: 8.7 },
    { title: 'Code Complete', year: 1993, rating: 9.1 },
    { title: 'Clean Architecture', year: 2017, rating: 8.8 }
];

console.log(sortedTitles(books));
// my 
function sortedTitles(books){
    let array = [...books];
    let titles = [];

    array.sort(function(first,second){
        let ratingFirst = first.rating;
        let ratingSecond = second.rating;
        if(ratingFirst > ratingSecond)  return -1;
        if(ratingFirst < ratingSecond)  return 1;
        return 0;
    })

    for(let book of array)
        if(book.rating > 8 && book.year > 2000)
            titles.push(book.title);
    
    return titles;
}

// ANSWER
let titles = books
                .filter(b => b.year > 2000 && b.rating > 8)
                .sort((a,b) => a.rating - b.rating)
                .reverse()
                .map(b => b.title);
console.log(titles);

*/

//-----------------------------------
// 42-Dars. Amaliy mashg'ulot.
/*
console.log(getMaxNumber([]))
console.log(getMaxNumber([1,2,3,5,6,4]))

// ANSWER
function getMaxNumber(array){
    if(array.length === 0)  return;

    return array.reduce((a,b) => (a > b) ? a : b)
}
*/

//-----------------------------------
// Amaliyot : To'plamlar 41-Dars
/*
let numbers = [1, 2, 3, 4, 5, 6]

let output = move(numbers, 1, -1); // [1, 4, 2, 3, 5, 6]

console.log(output);
console.log(MOVE(numbers, 4, -5));
// console.log(numbers);

// 1 2 3 4 5 6
// index= 1
// offset= 2
//> 1 3 4 2 5 6
function move(arrayOriginal, index, offset){
    if(offset === 0)    return [...arrayOriginal];
    if(offset > 0 && arrayOriginal.length-index <= offset)
            return 'wrong offset'
    let array = [...arrayOriginal]; // originaliga tasir otkazmaslik uchun

    if(offset < 0){
        if(index < offset*(-1)) return 'wrong offset'

        let starters = array.splice(0, index+offset);
        let needToShift = array.splice(0, offset*(-1));
        let x = array.shift();

        return [...starters, x, ...needToShift, ...array];
    }

    let starters = array.splice(0, index)
    let needToShift = array.splice(1, offset) 
    
    return [...starters, ...needToShift, ...array];
}

// Answer
function MOVE(array, index, offset){
    let position = index + offset;
    if(position >= array.length || position < 0){
        console.error('Invalid offset');
        return '';
    }
    let result = [...array];
    let element = result.splice(index, 1)[0];
    result.splice(position, 0, element);
    return result;
}

*/
//-----------------------------------
// Amaliyot : To'plamlar 40-Dars
/*
let numbers = arrayFromRange(-11, -55);

console.log(includes(numbers, 5));
// 1
function arrayFromRange(min, max){
    let arr = [];
    while(min<=max){
        arr.push(min);
        min++;
    }
    return arr;
}
// 2
function includes(array, elementToFind){
    for(let num of array)
        if(num === elementToFind)   return true;
    return false;
}
*/
//-----------------------------------
// reduce() metodi haqida. 39-Dars.
/*

let nums = [3, 5, 4, 1, 2];

let sum = nums.reduce((accumulator, currentValue) =>
    accumulator + currentValue, 0);

console.log(sum);
*/

//-----------------------------------
// map() metodi va metodlarni ketma-ket chaqirish (chaining) 38-Dars.
/*
let nums = [3,-5,4,1,-2];

let filtered = nums.filter(number => number >= 0);
// map() html 
let items = filtered.map(number => '<li>' + number + '</li>');
let html = '<ul>' + items.join('') + '</ul>';

// map() object
let objects = filtered.map(number => {
    return {value: number};
});

// method chaining
let numbers  = nums
                .filter(number => number >= 0)
                .map(number => {
                        return {value: number};
                    })
                .filter(obj => obj.value > 1);

console.log(numbers);
*/

//-----------------------------------
// To'plamlarning every, some va filter metodlari haqida. 37-Dars.

// let nums = [3,-5,4,1,-2];

// // every
// let isAllPositive = nums.every(function(n){
//     return n >= 0;
// });
// console.log(isAllPositive);

// // some
// let atLeastOnePositive = nums.some(function(n){
//     return n >= 0;
// });
// console.log(atLeastOnePositive);

// // filter
// let filtered = nums.filter(number => number >= 0);
// console.log(filtered);

//-----------------------------------
// To'plamlarni tartiblash 26-dars
/*
// premetivlar
// let nums = [3,5,4,1,2];

// nums.sort(); // ASC
// console.log(nums);

// nums.reverse(); // DESC
// console.log(nums);

// OBYEKTlar
let courses = [
    {id:1, title:'Redux'},
    {id:2, title:'Node JS'},
    {id:3, title:'aSP.NET'},
];

courses.sort(function(first,second){
    let titleFirst = first.title.toLowerCase();
    let titleSecond = second.title.toLowerCase();
    if(titleFirst < titleSecond)  return -1;
    if(titleFirst > titleSecond)  return 1;
    return 0;
});

console.log(courses);
*/

//-----------------------------------
// To'plamlarni birlashtirish 35-dars
/*
let a = [1,2,3]
let b = [4,5,6]
// birlashtirish
// let c = a.concat(b);
// let c = [...a,'a b',...b];

// let joinedString = c.join('-');
// console.log(c);
// console.log(joinedString);

// forEach
a.forEach(function(item){
    console.log(item);
})
b.forEach((item, index) => console.log(index,item));

// ajratish
// let sliced = c.slice(2); // 2-indexdan boshlab oxirigacha
// let sliced = c.slice(2,4); // 2-indexdan boshlab 4-gacha
// console.log(sliced);
*/
//-----------------------------------
// Toplamlar bilan ishlash 34-dars
/*
let nums = [3, 4, 1];
nums.push(5, 6); // oxiridan qowiw
nums.unshift(1); // boshidan qowiw
nums.splice(1,0,2); // 1-dagini 
console.log(nums.indexOf(9) !== -1);
console.log(nums.lastIndexOf(1));
console.log(nums.includes(5));
console.log(nums);
// deleting
let end = nums.pop();
console.log(nums);
console.log('end: ',end);

let first = nums.shift();
console.log(nums);
console.log('first: ',first);

nums = [1,2,3];
console.log(nums);
nums.splice(1,1);
console.log(nums);

// tozalavorissh
nums = [] // 1
nums = null // 2

// find
const students = [
    {id:1, name: 'Said', age:18},
    {id:2, name: 'Begzod', age:18}
]

let student = students.find(function(student){
    return student.id === 2;
});
console.log(student);

let studentIndex = students.findIndex(student => student.id === 2);
console.log(studentIndex);
*/

//-----------------------------------
// Amaliyot
/*
// 1 - object ltteral
const laptop = {
    brand: 'ASUS',
    cpu: 'i3',
    ram: '8 GB',
    storage:{
        type: 'SSD',
        capacity: '256 GB'
    },
    price: 350,
    powerOn(){
        console.log|('ON');
    }
}
console.log(laptop);

// 2 - factory function for laptop
function createLaptop(brand, cpu, ram, storage, price){
    return {
        brand,
        cpu,
        ram,
        storage,
        price,
        powerOn(){
            console.log|('ON');
        }
    }
}
const lap = createLaptop('Lenovo','i9','16 GB', {type: 'SSD',capacity: '256 GB'}, 700);
console.log(lap);

// 3 constructor function Laptop()
function Laptop(brand, cpu, ram, storage, price){
    this.brand = brand;
    this.cpu = cpu;
    this.ram = ram;
    this.storage = storage;
    this.price = price;
    this.powerOn = function(){
        console.log|('ON');
    }
}
const laptop3 = new Laptop('HP','i5', '8 GB', {type: 'HD',capacity:'1TB'},600);
console.log(laptop3);
*/

//-----------------------------------
// Obyekt dan CLONE olish 30-dars
/*
circle = {
    radius: 1,
    draw(){
        console.log('IDraw');
    }
}
const clone = {};

// eskicha yondashuv
for(let key in circle)
    clone[key] = circle[key];
console.log('clone1:', clone);

// with Object.assign
const clone2 = Object.assign({color: 'white'}, circle);
console.log('clone2:', clone2);

// with sprat
const clone3 = { ...circle};
console.log('clone3:', clone3);
*/

//-----------------------------------
// ways to itterate object properties 29-dars
/*
circle = {
    radius: 1,
    draw(){
        console.log('IDraw');
    }
}
// 1.for in
console.log('for in');
for(let key in circle)
console.log(key,circle[key]);

// 2.for of
console.log('for of obj keys')
for(let key of Object.keys(circle)) // objs aren't itterable
console.log(key, circle[key]);  // that we need to use Object.

console.log('for of entries')
for(let entry of Object.entries(circle)) // every prop as array (key val)
    console.log(entry);
*/
//-----------------------------------
// Function IS OBJECT 27-dars
/*
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('doira');  
    }
}

Circle.call({},4); // => const circle = new Circle(4);
Circle.apply({}, [4]); // 1st arg: this, 2nd arg: array of args


const Circle2 = new Function('radius', `
this.radius = radius;
this.draw = function(){
    console.log('doira');  
}
`);
const circle = new Circle2(2);
console.log(circle);
*/

//--------------------------------
// OBJECTS 25-dars
/*
// factory function
function createCircle(radius){
    return {
        radius, // it means-> radius: radius,
        draw() {  // it means-> draw: function(){
            console.log('doira');
        }
    };
}
const circle1 = createCircle(2);
console.log(circle1);

// constructor functions
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('doira');        
    }
}
const circle2  = new Circle(5);

// constructor xossalari
console.log(circle1.constructor);
console.log(circle2.constructor);
*/

//---------------------------
// showPrimeNumbers(15);

// function showPrimeNumbers(limit){
//     for(let i=2; i<=limit; i++)
//         if(isPrimeNumber(i))    console.log(i,' ');
// }

// function isPrimeNumber(number){
//     for(let i=2; i<=number/2; i++)
//         if(number%i === 0)
//             return false;

//     return true;
// }

// 0 -50 F
// 51-60 D
// 61-70 C
// 71-80 B
// 81-100 A
// const marks = [90, 100, 90, 100]
// calculateGrade(marks);

// function calculateGrade(arr){
//     let avg = 0;
//     let k = 0;

//     for(let num of arr)
//         avg += num;

//     avg /= arr.length;

//     if (avg >= 0 && avg <= 50)
//         console.log('F');
//     else if (avg > 50 && avg <= 60)
//         console.log('D');
//     else if (avg > 60 && avg <= 70)
//         console.log('C');
//     else if (avg > 70 && avg <= 80)
//         console.log('B');
//     else if (avg > 80 && avg <= 100)
//         console.log('A');
// }

// let car = {
//     model: 'BMW',
//     country: 'Germany',
//     id: 159258,
//     owner: 'Behzod'
// }

// showProp(car);

// function showProp(obj){
//     for(let key in obj)
//     if(typeof obj[key] === 'string')
//         console.log(key , ': ', obj[key]);
// }

// SpeedChecker function

// const SPEED_LIMIT = 70;
// const KM_PER_POINT = 5;
// const MAX_POINTS = 12;

// let res = SpeedChecker(130);
// console.log('result: ', res);

// function SpeedChecker(input){
//     if(input < SPEED_LIMIT + KM_PER_POINT)  return 'OK';

//     let points = Math.floor((input - SPEED_LIMIT) / KM_PER_POINT);
//     return (points < MAX_POINTS) ? points : 'Guvohnoma olib qo`yiladi!';
// }

// let result = fizBaz(19);
// console.log(result);

// function fizBaz(input){
//     if(typeof input !== 'number')   return 'Son emas';

//     return (input%15 === 0) ? 'FizBaz' : (input%3 === 0) ? 'Fiz' : (input%5 === 0) ? 'Baz' : input;
// }

// let color1 = 'oq';
// let color2 = 'qora';

// let temp = color1;
// color1 = color2;
// color2 = temp;

// console.log(color1);
// console.log(color2);

// let a;
// let b = null;
// let c = undefined;
// let d = 4;
// let e = 'five';
// let f = a || b || c ||d || e;

// let isMember = false;
// let chegirma = isMember ? 20 : 5;
// let summa = 100;
// summa -= summa * chegirma/100;
// console.log(summa);

// let x = 5;
// let y = 3;
// console.log("5" == "5");
// console.log(x !== '5');
// console.log(x**y);
// console.log(x === 4);
// console.log(y == 3);
// console.log(y == '3');
