      const express = require('express');
      const server = express();
      const router = require('./routers');
      const ejs = require('ejs');
      const cookieParser = require('cookie-parser');
      // const sass = require('node-sass-middleware');

      server.use(express.urlencoded({ extended: false }));
      server.use(cookieParser());
      server.use(express.static("./src/assets"));
      // server.use(sass({
      //       src: "./src",
      //       dest: "./src/assets"
      // }));
      server.engine('ejs', ejs.renderFile);
      server.set('views', './src/views');

      server.use(router);

      server.listen(8080, () => {
      console.log("servidor em funcionamento!");
      });