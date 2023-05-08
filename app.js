// pacotes

require('dotenv/config');

const express = require('express');

// iniciar o express
const app = express();


// configurações
require ('./db');
require ('./configs')(app);

// middlewares gerais

//rotas
// const bookRoutes = require('./routes/book.routes');
app.use('/books', require('./routes/book.routes'));
app.use('/User', require('./routes/user.routes'));

// gerenciamento de erros
app.use((req, res) => {
    res.status(404).json('Não encontrado.'); // TODO: será atualizado depois!
})

//gerenciamento de erros
require('./error-handling')(app);
// app.use((req, res) => {
//     res.status(404).json('Não encontrado.'); //@TODO: seerá atualizado depois!
// })

// exportar app
module.exports = app;

