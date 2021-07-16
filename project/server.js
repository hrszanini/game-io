//Criar servidor de API
const port = 9000;
const server = require('express')();
const http = require('http').Server(server);

//Configurar controller do cliente
require('./client/controller').configure(server);

//Configurar controller do socket
require("./game/socket-server").configure(http);

//Iniciar servidor
http.listen(port, () => {
  console.log(`Initialize server on http://0.0.0.0:${port}`)
});