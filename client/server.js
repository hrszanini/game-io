//Criar servidor de API
const port = 9000;
const server = require('express')();
const http = require('http').Server(server);

//Configurar controller do cliente
require('./controller').configure(server);

//Iniciar servidor
http.listen(port, () => {
  console.log(`Initialize server on http://0.0.0.0:${port}`)
});