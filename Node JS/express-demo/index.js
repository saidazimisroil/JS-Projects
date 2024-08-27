const express = require("express");
const Joi = require("joi"); // Validator CLASS
const app = express();
const auth = require("./autentificator");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");

app.use(express.json()); // middlewere =< req body ni json qlib beradi
app.use(express.urlencoded({ extended: true })); // key1=value1&key2=value2 = some authentifications -> built-in mw
app.use(express.static("public")); // 'public' papkasidagi barcha fayllarga dostup beriladi => localhost:5001/file -> built-in mw

app.use(helmet()); // bu validatsiya un

if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny")); // bu http so `rovlarni log qilish un
    console.log("Logger ishlaydi...");
}
// *********** View engines-PUG ***************
// View engine`lar client`ga thml holda javob qaytarish un kk
app.set("view engine", "pug");
app.get("/", (req, res) => {
    // views folder>> index.pug
    res.render("index", { title: "express app", greeting: "Assalomu aleykum" });
});

// ************** Custom middleware *****************
/*
app.use(function(req,res, next){
    console.log('Log yozish...');
    next();
}) */
// middleware function lar bowqa modullarda bo`lishi kk
// app.use(auth)

//********** Dasturning ishlash muhiti ********
// 1) Development | 2) Testing | 3) Staging | 4) Production
// console.log(process.env.NODE_ENV); // os tomonidan berilishi kk
// console.log(app.get('env')); // os tomonidan berilmagan bolsa default= development

//****** Dasturning sozlamalarini config-faylda saqlash ********/
console.log(config.get("name"));
console.log(config.get("mailserver.host"));
//  Dasturimizdagi kalit va parollarni ochiq holda cofig faylda saqlamasdan
// ularni env var holatda saqlab
// config da ularga bo`lgan mapping saqlanadi
console.log(config.get("mailserver.password"));

const books = [
    { id: 1, name: "Shum bola" },
    { id: 2, name: "O`tkan kunlar" },
    { id: 3, name: "Sariq devni minib" },
];
// ******************* CRUD *****************
// *** Get *** Post *** Put *** Delete ***
// ***********GET************
// http get
// app.get('/', (req, res) => {  // '/' -> route url | callback -> route handler
//     res.send('Kutubxonamizga xush kelibsiz');
// })

// get all
app.get("/api/books", (req, res) => {
    res.send(books);
});

// get by id - url variables
app.get("/api/books/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));

    if (!book)
        return res.status(404).send("Berilgan ID bo`yicha kitob topilmadi");

    res.send(book);
});
// get with parametres
// app.get('/api/articles/:year/:month', (req, res) => {
//     // res.send(req.params); // route params
//     res.send(req.query); // query string
// })

// ***********POST************
app.post("/api/books", (req, res) => {
    // validation with joi
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = {
        id: books.length + 1,
        name: req.body.name,
    };
    books.push(book);
    res.status(201).send(book);
});
// Bad validation
/*
    if(!req.body.name) {
        res.status(400).send('Name is required');
        return;
    }
    if(req.body.name.length < 3) {
        res.status(400).send('Name should be required at least 3 characters');
        return;
    }
    */

// ***********PUT************

app.put("/api/books/:id", (req, res) => {
    // 1. id orqali izlash
    const book = books.find((b) => b.id === parseInt(req.params.id));
    // 2. if: topilmasa => 404 status
    if (!book) return res.status(404).send("Berilgan ID bo`yicha kitob yo`q");
    // 3. else: validatsiya qilish
    let { error } = validateBook(req.body); // object destructoring
    // 4. if: validatsiya`dan o`tmasa => 400
    if (error) return res.status(400).send(error.details[0].message);
    // 5. else: kitobni yangilash
    book.name = req.body.name;
    // 6.       yangi kitobni qaytarish
    res.send(book);
});

// *********** DELETE ************
app.delete("/api/books/:id", (req, res) => {
    // 1. id orqali izlash
    const book = books.find((b) => b.id === parseInt(req.params.id));
    // 2. if: topilmasa => 404 status
    if (!book) return res.status(404).send("Berilgan ID bo`yicha kitob yo`q");

    // 3. kitobni o'chirish
    let bookIndex = books.indexOf(book);
    books.splice(bookIndex, 1);

    // 4. kitobni qaytarish
    res.send(book);
});

// Validatsiya funksiyasi | DRY
function validateBook(book) {
    let bookSchema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return bookSchema.validate(book);
}

//********** port
const port = process.env.PORT || 5000;

// ********* listener port *************************
app.listen(port, () => {
    console.log(`${port}-portni eshitishni boshladim...`);
});
/*
*   npm i -g nodemon -> avto monitoring 
    nodemon index.js -> wu holda app run qilinadi
* port
    port ni hardcode qilmasdan environment variable qilib olish kk
    setx port 5001 -> uni terminal da set qilinadi  // vscode o'cirib yoqiladi
* route
    route params dan required bo'lgan asosiy param lar olinadi
    query string bn ixtiyoriy bo'lgan param lar olinadi /sdsd/dsda?sortBy=name
*/
