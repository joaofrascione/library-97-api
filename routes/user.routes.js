const router = require('express'). Router();

const User = require('../models/User.model');

// Create
router.post('/', async(req, res, next) =>{
  const { username }  = req.body;
  try {
    await User.create({ username });
    res.status(201).json(`Usuario ${username} criado com sucesso!` );
  } catch (error) {
    next(error);
  }
})


// List user
router.get('/', async (req, res, next) => {
    try {
       const usersFromDB = await User.find(); 
       res.status(200).json(usersFromDB);
    } catch (error) {
        next(error);
    }
})

// Adcionar livro ao usuario
router.post('/:userId/add-book/:bookId', async(req, res, next) =>{
    const { userId, bookId } = req.params;
    try {
        const usersFromDB = await User.findByIdAndUpdate(userId, { $push: { books: bookId } }, { new: true });
        res.status(200).json(usersFromDB);
    } catch (error) {
        next(error);
    }
})


// Listar usuario com as informações dos livros
router.get('/:userId', async(req, res, next) => {
    const { userId } = req.params;
  try {
    const usersFromDB = await User.findById(userId).populate('books');
    res.status(200).json(usersFromDB);
  } catch (error) {
    
  }  
})

//teste
router.get('/test', (req, res) => {
    res.json('rotas de user conectadas!');
})

module.exports = router;