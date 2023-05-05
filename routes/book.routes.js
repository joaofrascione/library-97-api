const router = require('express').Router();


// modelo

const Book = require('../models/Book.model');

// rotas

//CRUD - > create
router.post('/', async (req, res) => {
    const { title, description, author, rating } = req.body;
    try{
        if(!title) {
           const error = new Error(); 
           error.message = 'Titulo é obrigatorio';
           error.code = 400;
           throw error
        
        }
        // await Book.create(req.body);
        const newBookFromDB = await Book.create({ title, description, author, rating });
        res.status(200).json(newBookFromDB);

    } catch (error){
        res.status(error.code || 500).json({ error });
    }
})

//CRUD - > read
router.get('/', async (req, res) => {
    try {
        const booksFromDB = await Book.find();
        res.status(200).json(booksFromDB);
    } catch (error) {
        res.status(500).json({description: 'Erro ao listar livros', error });
    }
})

router.get('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
        const bookFromDB = await Book.findById(bookId);
        res.status(200).json(bookFromDB)
    } catch (error) {
        next();
    }
})


// exportando rotas
module.exports = router;


 