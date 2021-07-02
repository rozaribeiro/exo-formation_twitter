//  C R I A C A O   D O   R O T E A D O R   etc.:

    const express = require("express");
    const router = express.Router();
    const ctrlAdmin = require("../controllers/ctrl_admin"); 
    const isAuth = require("../middlewares/isAuth")
      

//  C R I A C A O   D A S  R O T A S ( V E R B O  +  U R L ) :

    // 1. usuario requisiciona (GET) a home page
    router.get("/", isAuth, ctrlAdmin.index);
    // 2. usuario requisiciona (GET) a pagina signup    
    router.get("/signup", ctrlAdmin.signup);
    // 3. o formulario em signup.ejs envia (POST) informaçoes
    // caminho dos dados: ejs >> controller >> model >> base de dados >> model >> controller 
    router.post("/signup", ctrlAdmin.newAccount);
    // 4. usuario requisiciona (GET) ou é reencaminhado à pagina de login
    router.get("/login", ctrlAdmin.login);
    // 5. o formulario em login.ejs envia (POST) informaçoes de login
    router.post("/login", ctrlAdmin.authenticate);

// C R I A  U M  M O D U L O  C H A M A D O  E M  O U T R O S  A R Q U I V O S

    module.exports = router;