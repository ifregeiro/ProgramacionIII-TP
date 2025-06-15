const express = require("express");
const morgan = require("morgan");
const rutaPersonas = require("./routes/personas.route.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.rutas();
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
