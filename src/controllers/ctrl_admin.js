//  I N S T A L A Ç A O   D A S   P A R A D A S   Q U E   V A M O S   U S A R  //
const mdlAdmin = require("../models/mdl_admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "SECRET7";
const MAXAGE = Math.floor(Date.now() / 1000) + (60*60);

//  F U N C O E S   P A R A   V E R   A S   P A G I N A S  //

exports.index = (request, response) => {
  response.render("index.ejs", {user: request.user});
}

exports.signup = (request, response) => {
  response.render("signup.ejs");
}

exports.login = (request, response) => {
  response.render("login.ejs");
}


//  F U N C A O   P A R A   C R I A R   N O V A   C O N T A   D E   U S U A R I O  //

exports.newAccount = (request, response) => {
  
  const { firstname, lastname, birthday, city, email, phone, username, password, picture } = request.body;

  // primeiro checamos se o nome do usuario ja esta sendo utilizado:
  mdlAdmin.getByUsername(username,(error, result) => {

    if (error) {
      response.send(error.message);
    }
    
    else  if (result.length > 0) {
      response.send("A user with this username already exists!");
    } 
    
    else {
      // se o username esta disponivel criamos a nova conta:
      // mas antes vamos "bcryptar" a senha
  
      const saltRounds = 10;
  
      bcrypt.hash(password, saltRounds, (error, hash) => {
       
        if (error) {
          response.send(error.message);
        }

        const newUser = {
        firstname, 
        lastname, 
        birthday, 
        city, 
        email, 
        phone, 
        username, 
        picture,
        password: hash
        }
   
       mdlAdmin.createUser(newUser, (error, result) => {
    
        if (error) {
          response.send(error.message);
        }
          response.redirect("/login");
        });
      });
    }
  });
}


//  F U N C A O   P A R A   L O G A R   N O   S I T E //

exports.authenticate = (request, response) => {

  const { username, password } = request.body;
  
    // primeiro checamos se o usuario existe:
    mdlAdmin.getByUsername(username,(error, result) => {
  
      if (error) {
        response.send(error.message);
      }
      
      else if (result.length == 0) {
        response.send("This user doesn't exists!");
      } 
      
      else {
        // se o username existe, checamos se a senha enviada é correta:
        // informaçao enviada para o modelo:
        console.log(request.body);
        // resposta recebida pelo modelo:
        console.log(result);
        console.log(result[0].Password);
        
        const hash = result[0].Password;        
        bcrypt.compare(password, hash, (error, correct) => {
          if (error) {
            response.send(error.message);
          } else if (!correct) {
            response.send("Invalide password!");
          } else {
            // caso todos os dados estejam corretos, autenticamos e abrimos uma seçao para o usuario:
            // agora utilizamos o JWT (Jason Web Token) para dar segurança à parada
            // o JWT sera guardado em um cookie (ver documentaçao).
            // a data de expiraçao é necessaria se o usuario para de navegar no site
            // se a navegaçao é continua, a chave JWT é gerada automaticamente antes de expirar
              const user = {
              name: result[0].FirstName,
              username: result[0].Username,
              exp: MAXAGE
            }
            jwt.sign(user, SECRET, (error, token)=> {
              if (error) {
                response.send(error.message);
              } else {
                request.user = user;
                response.cookie('authcookie', token, { maxAge: 60*60});
                response.redirect('/');
              }
            });
          }
        });      
    }
  });
}