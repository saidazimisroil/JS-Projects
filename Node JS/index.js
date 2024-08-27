//----------------------------------
// HTTP
/*
const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        // so`rov asosiy menyuga bo`lganini tekshirish
        res.write("Asosiy menyu..."); // responce
        res.end(); // res ni yashirish
    }
    if (req.url === "/api/books") {
        res.write(
            JSON.stringify(["Clean code", "Refactoring", "Code complete"])
        );
        res.end();
    }
});
server.listen(8000);
console.log(`${server.address().port}-portni eshitishni boshladik...`);

// low level
// const server = http.createServer();
// server.on('connection', (socket) => {
//     console.log('Yangi bo`lanish...');
// });
*/
//----------------------------------
// EventEmitter'dan samarali foydalanish
/*
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg) => { console.log('messageLogged: ', arg) } )

logger.log('message');

*/
//----------------------------------
// "events" moduli bilan tanishamiz
/*
const EventEmitter = require('events'); // Class bolgani un CamelCase iwlatilgan
const emitter = new EventEmitter(); // new instance

emitter.on('messageLogged', (arg) => {
    console.log('Listener chaqirildi', arg);
}); 
// addListener() = on() -> handler qo`wiw
// Listener Event emitt qilinishidan avval yozilgan bo`liwi kk
emitter.emit('messageLogged', {id: 1, url: 'http://...'} ); 
// emitt() 1-param dagi event ro`y bergani haqida xabar beradi
// xodisa ro`y berganda qo`wimca info berish ucun uni argument qilib beriladi
// xodisadagi argumentni ilish uchun Listener da param bolishi kk

// Topshiriq 
// Event ni emitt qilib uni handle qilish

emitter.on('logging', (arg) => {
    console.log('LOGGING: ', arg);
})

emitter.emit('logging', {message: 'Salom'} );
*/
//----------------------------------
// "fs" moduli bilan ishlaymiz

const fs = require("fs");

// fs.readFile("./index.js", "utf8", function (err, fileContent) {
//     if (err) throw err;

//     console.log(fileContent);
// });

// fs.readdir('./',function(err, files){  // ASSinxron
//     if(err) console.log(err); // path xato kiritilganda error chiqadi
//     else    console.log(files);
// })

// const files = fs.readdirSync("./"); // Sinxron
// console.log(files);

// Topshiriq
// 1 writeFile() dan foydalanish
// const greetings = "Assalomu aleykum!";
// fs.writeFile("./greeting.txt", greetings, function (err) {
//     if (err) console.log(err);
// });

// 2 rename() dan foydalanish
// bu yerda greeting.txt fayli bir papka ickariga kiritb yuborildi
// fs.rename("./greeting.txt", "./texts/greeting.txt", function (err) {
//     if (err) throw err;
// });

// 3 unlink() dan foydalanish
// fs.writeFile("./wishfile", "don't be sad", function (err) {
//     if (err) throw err;
// });
// wishDelete.txt fayli o'chirildi
fs.unlink("./wishfile", function (err) {
    if (err) throw err;
});

//----------------------------------
// "os" moduli haqida
/*
const os = require('os');
const { uptime } = require('process');

const freeMem = os.freemem();
const userInfo = os.userInfo();
const totalMem = os.totalmem();
const upTime = os.uptime();
console.log(`Umumiy xotira: ${totalMem/1024/1024}`);
console.log(`Xotiradagi bo'sh joy: ${freeMem} B -> ${freeMem/1024/1024} MB` )
console.log(`Xotiradagi band joy: ${totalMem-freeMem} B -> ${(totalMem-freeMem)/1024/1024} MB` )
console.log('Username: '+ userInfo.username);
console.log('UpTime: '+ upTime);

*/

//----------------------------------
// "path" moduli
/*
const path = require('path');

const pathObject = path.parse(__filename);
console.log(pathObject);

// basename() - normalize() - join()

console.log(path.basename('/foo/bar/baz/asdf/quux.html'))// : 'quux.html'
// path.basename('/foo/bar/baz/asdf/quux.html', '.html');// : 'quux'

console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')); // : '/foo/bar/baz/asdf'
// path.join('foo', {}, 'bar'); // Throws 'TypeError: Path must be a string. Received {}'

console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));// : '/foo/bar/baz/asdf'
// path.normalize('C:\\temp\\\\foo\\bar\\..\\'); // : 'C:\\temp\\foo\\'
// path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'); //: 'C:\\temp\\foo\\bar'

// console.log(__filename);// __filename-> full path
*/
//----------------------------------
// Import qilish
/*

const logger = require('./logger') // shu papka ichidagi logger`ni obyekt sifatida olish

logger.log('Salom'); // loggerdan foydalanish

// const log = require('./logger') // faqat 1ta func export bolsa

// logger = 4; // bu ishlamasligi un const bolishi kk

// console.log(logger); // { log: [Function: log] }

// require('../logger') // 1 ta yuqori papkadagi logggerga  ulanish
// require('./boshqaPapka/logger') // 1 ta ichkarida turgan loggerga
*/
