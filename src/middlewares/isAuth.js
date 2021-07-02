const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const SECRET = "SECRET7";

const isAuth = (request, response, next) => {
    const token = request.cookies.authcookie;

    console.log(token);
    jwt.verify(token, SECRET, (error, user) => {
        if (error) {
            response.send(error.message);
        } else {
            const { name, username, exp } = user;

            if (Date.now() / 1000 >= exp) {
                response.clearCookie("authcookie");
                response.send("Session expired. Try to reconnect you.");
            } else {
                request.user = { name, username };
                next();
            }   
        }
    });
}

module.exports = isAuth;