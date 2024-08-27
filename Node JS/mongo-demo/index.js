const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost/test") // test is name of db
    .then(() => {
        console.log("DB is Connected...");
    })
    .catch((err) => {
        console.log("Something wrong. Error: ", err);
    });

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
    author: String,
    tags: {
        type: Array,
        //************Custom validator  : qowimcha tekwiruvlar un kk*/
        validate: {
            isAsync: true,
            validator: function (value, callback) {
                setTimeout(() => {
                    const result = value && value.length > 0;
                    callback(result);
                }, 5000);
            },
            message: "Kitobning kamida bitta tegi bo`lishi lozim",
        },
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 300,
    },
    category: {
        type: String,
        required: true,
        enum: ["classic", "biography", "science"],
        // match: /reg.expression/ category`ni shu reg-ex ga qancalk mos kelishi tekshiriladi
    },
});

const Book = mongoose.model("Book", bookSchema); // new class

async function createBook() {
    const book = new Book({
        name: "Node JS haqida",
        author: "Farkhod Dadajonov",
        tags: null,
        isPublished: false,
        category: "classic",
    });
    try {
        await book.validate(); // save()`siz ishlatish
        // const savedBook = await book.save(); // save() async metod bo`lgani un uni await qilish kk
        // console.log(savedBook);
    } catch (ex) {
        console.log(ex);
    }
}

async function getBooks() {
    const books = await Book.find();
    console.log(books);

    // **** chaining API *****
    // const book = await Book.find({
    //     author: 'Farkhod Dadajonov', isPublished: true
    // })
    // .limit(2) // limit
    // .sort({ name: 1}) // 1-> ASC | -1 -> DESC
    // .select({ name: 1, tags: 1 }) // 1-> need | 0-> doesn't need

    //*********filtrlardan foydalanish************
    // const book = await Book.find({price: {$gt: 10, $lt: 20 }} ) // 10< price <20
    // const book = await Book.find( {price: { $in: [15, 20, 25] }} ) // price=15||20||25
    // const book = await Book.find()
    //     .or([ {author: 'Farkhod Dadajonov'}, {isPublished: true} ]) // and([{}{}]) bor
    //     .count();

    //******** regular expressions ***************
    // ular 2 qism: /pattern/flags
    // const book = await Book
    // .find({author: /^F/}) // starts with F (case sensetive)
    // .find({author: /od$/i}) // ends with od || OD (case insensetive)
    // .find({author: /.*ham.*/i}) // contains ..ham..

    // *********** "pagination" qilish **********
    // const pageNum = 3;
    // const pageSize = 10;
    // // api/books?pageNum=3&pageSize=10 kabi holda front dan keladi
    // const book = await Book.find({ author: /^F/ })
    //     .skip((pageNum - 1) * pageSize) // avvalgi sahifadagi info ni tashlab ketish
    //     .limit(pageSize); // shu sahifadagi info

    // console.log(book);
}
// getBooks();

// ********* update ******************
async function updateBook1(id) {
    const book = await Book.findById(id);
    if (!book) return;

    book.isPublished = true;
    book.author = "Saidazim";
    // boshqa usul
    // book.set({
    //     isPublished: true,
    //     author: "Saidazim",
    // });

    const updatedBook = await book.save();
    console.log(updatedBook);
}

// 2-usul - tekshiruvsiz, biror filter orqali update qilish
async function updateBook2(id) {
    const result = await Book.updateMany(
        { _id: id },
        {
            // bu yerda mongoDB update operator`lari boladi
            $set: {
                author: "Saidazim",
                isPublished: false,
            },
        }
    );

    console.log(result);
}
// updateBook2("64c9f7d797982b4b29f0ab3a");

// ********* delete ******************
async function deleteBook(id) {
    // - 1 -
    // const result = await Book.deleteOne({ _id: id });
    // console.log(result);
    // - 2 -
    const book = await Book.findByIdAndRemove({ _id: id });
    console.log(book);
}
// deleteBook("64c9f8950c0bd175a665f064");

// ********* required qowilganda ********
// ********* custom validator qowilganda ********
createBook();
