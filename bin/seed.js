// pacotes

require('dotenv/config');

const mongoose = require('mongoose');

// modelos

const Book = require('../models/Book.model');

//dados
const data = require ('./books-data.json');

// config

const DB_URI = process.env.MONGO_URI;

const connectDB = async () => {
    console.log('Aguarde conexão com o banco de dados...')
    try {
        const x = await mongoose.connect(DB_URI);
        console.log(`Conectado ao banco de dados: "${x.connections[0].name}"`);
    
    } catch (error){
        console.log('Falha ao conectar banco de dados!', error);
        process.exit();
    }
}

const createBooks = async () => {
    console.log('Inserindo informações ao banco de dados...');
    try{
        const booksFromDB = await Book.create(data);
        console.log(`Foram inseridos ${booksFromDB.length} documentos ao banco de daods!`);
    }catch(error){
        console.error('Erro ao inserir livros no banco de dados')
    }
}

const seed = async () => {
    try{
        await connectDB();
        await Book.collection.drop();
        await createBooks();
        mongoose.connection.close();
        console.log('Conexão encerrada.')
    } catch(error){
        console.error('Erro ao executar o script.', error);
    }
}

seed();
