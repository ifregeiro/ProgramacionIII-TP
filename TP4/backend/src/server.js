const express = require("express");
const morgan = require("morgan");
const rutaPersonas = require("./routes/personas.route.js");
const cors = require('cors');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.rutas();

    this.app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173/',
  credentials: true
}));
  }
  

  rutas() {
    this.app.use("/personas", rutaPersonas);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port 8000");
    });
  }
}

module.exports = Server;
