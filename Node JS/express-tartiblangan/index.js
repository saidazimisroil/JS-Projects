const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const auth = require('./middleware/auth');
const books = require('./routes/books');
const home = require('./routes/home');

// ************** Routers *********************
// books ni router sifatida ishlatish
app.use('/api/books', books); // bundan so'ng books modulidagi barcha url ni / ga almashtirish kk
// home modulini router qilish
// *********** View engines-PUG ***************
app.set('view engine','pug'); 
app.use('/', home);
// Custom middleware
app.use(auth);

app.use(express.json()); // middlewere =< req body ni json qlib beradi
app.use(express.urlencoded({ extended: true })); // key1=value1&key2=value2 = some authentifications -> built-in mw
app.use(express.static('public')); // 'public' papkasidagi barcha fayllarga dostup beriladi => localhost:5001/file -> built-in mw 

app.use(helmet()); // bu validatsiya un

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny')); // bu http so `rovlarni log qilish un
    console.log('Logger ishlaydi...');
}

//****** Dasturning sozlamalarini config-faylda saqlash ********/
console.log(config.get('name'));
console.log(config.get('mailserver.host'));
console.log(config.get('mailserver.password'));

//********** port 
const port = process.env.PORT || 5000;

// ********* listener port *************************
app.listen(port, () => {
    console.log(`${port}-portni eshitishni boshladim...`);
})