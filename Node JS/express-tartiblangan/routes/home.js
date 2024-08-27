const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // views folder>> index.pug
    res.render('index', { title: 'express app', greeting: 'Assalomu aleykum'})
})

module.exports = router;