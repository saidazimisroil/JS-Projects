const EventEmitter = require('events');
// const emitter = new EventEmitter();

class Logger extends EventEmitter {
    log(message){
        // todo: bu yerda http post code bolishi kk
        console.log(message);
        this.emit('messageLogged', {id: 1} );
    }
}

module.exports = Logger // agar faqat bitta narsani export qilish kk bolsa

// module.exports.log = log 