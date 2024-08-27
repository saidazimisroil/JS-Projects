const express = require('express');
const Joi = require('joi'); // Validator CLASS
const router = express.Router();

const books = [
    {id: 1, name: 'Shum bola'},
    {id: 2, name: 'O`tkan kunlar'},
    {id: 3, name: 'Sariq devni minib'}
]

// ******************* CRUD *****************

// ***********GET***********
router.get('/', (req, res) => {
    res.send(books);
})

router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id) );
    
    if(!book)   
        return res.status(404).send('Berilgan ID bo`yicha kitob topilmadi');
    
    res.send(book)
})

// ***********POST************
router.post('/', (req, res) => {
    // validation with joi    
    const { error } = validateBook(req.body);
    if(error)
       return res.status(400).send(error.details[0].message);
    
    const book = {
        id: books.length+1,
        name: req.body.name
    };
    books.push(book);
    res.status(201).send(book);    
})

// ***********PUT************

router.put('/:id', (req, res) => {
    // 1. id orqali izlash
    const book = books.find(b => b.id === parseInt(req.params.id));
    // 2. if: topilmasa => 404 status
    if(!book)  
        return res.status(404).send('Berilgan ID bo`yicha kitob yo`q');
    // 3. else: validatsiya qilish
    let { error } = validateBook(req.body); // object destructoring
    // 4. if: validatsiya`dan o`tmasa => 400
    if(error)
        return res.status(400).send(error.details[0].message);
    // 5. else: kitobni yangilash
    book.name = req.body.name;
    // 6.       yangi kitobni qaytarish
    res.send(book);
})

// *********** DELETE ************
router.delete('/:id', (req, res) => {
    // 1. id orqali izlash
    const book = books.find(b => b.id === parseInt(req.params.id));
    // 2. if: topilmasa => 404 status
    if(!book)  
        return res.status(404).send('Berilgan ID bo`yicha kitob yo`q');
    
    // 3. kitobni o'chirish
    let bookIndex = books.indexOf(book);
    books.splice(bookIndex, 1);

    // 4. kitobni qaytarish
    res.send(book);
})

function validateBook(book){
    let bookSchema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return bookSchema.validate(book);
}

module.exports = router;