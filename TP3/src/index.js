const Server = require('./server.js');
const {connectDB} = require('./models/sqlite/config/db.js');

require('./models/sqlite/entities/paciente.entity.js');
require('./models/sqlite/entities/turno.entity.js');

connectDB()
const server = new Server("ejs");

server.listen();