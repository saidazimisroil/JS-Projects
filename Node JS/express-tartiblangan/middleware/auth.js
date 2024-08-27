function auth(req, res, next) {
    console.log('Autentifikatsiya ...');
    next();
}

module.exports = auth;