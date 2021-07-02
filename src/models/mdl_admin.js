const db = require("../db");

exports.getByUsername = (username, callback) => {

    db.query(`SELECT * FROM users WHERE username = "${username}";`, (error, result) => {
      
      if (error) {
        console.log("error: ", error);
        callback(error, null);
        return;
      }
        callback(null, result);
    });
}

exports.createUser = (newUser, callback) => {

    db.query(`INSERT INTO users (FirstName, LastName, Birthday, City, Email, Phone, Username, Password, Picture) VALUES ("${newUser.firstname}", "${newUser.lastname}", "${newUser.birthday}", "${newUser.city}", "${newUser.email}", "${newUser.phone}", "${newUser.username}", "${newUser.password}", "${newUser.picture}");`, (error, result) => {
      
      if (error) {
        console.log("error: ", error);
        callback(error, null);
        return;
      }
        callback(null, result);
    });
}