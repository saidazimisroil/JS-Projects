// parent class
class Vehicle{
    constructor(year){
        this._year = year;
    }
    start(){
        console.log('Vehicle started ...');
    }

    get year(){
        return this._year;
    }

    set year(value){
        this._year = value;
    }
}


// chilcd class
class Car extends Vehicle{
    constructor(brand, year){
        super(year); // parent's ctor is called
        // this._year = year; -> bu ish parent class da amalga oshiriladi
        this._brand = brand;
    }

    start(){ // method overriding
        super.start(); // parent class dagi start() ni chaqirish
        console.log('car is started...');
    }

    static play(){
        console.log('static play() is called...');
    }
}

let car1 = new Car('BMW', 2022); // new object

car1.start(); // its method is called
console.log(car1); 

Car.play(); // static play() is called...

car1._year = 2023 // -> setter`siz iwlaw mumkin
console.log(car1._year);

car1.year = 2020 // setter bilan ishlash
console.log(car1.year); // getter bilan ishlash