const { Book, User } = require("../models");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { userId: req.user.id },
      include: [{
        model: User,
        as: "user",
        attributes: ["mail"]
      }],
      order: [["fecha_creacion", "DESC"]]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      },
      include: [{
        model: User,
        as: "user",
        attributes: ["mail"]
      }]
    });
    
    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { titulo, autor, editorial, tipo, genero, estado, calificacion, resena } = req.body;
    
    const book = await Book.create({
      titulo,
      autor,
      editorial,
      tipo,
      genero,
      estado,
      calificacion,
      resena,
      userId: req.user.id
    });
    
    const bookWithUser = await Book.findByPk(book.id, {
      include: [{
        model: User,
        as: "user",
        attributes: ["mail"]
      }]
    });
    
    res.status(201).json(bookWithUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { titulo, autor, editorial, tipo, genero, estado, calificacion, resena } = req.body;
    
    const book = await Book.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });
    
    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    
    await book.update({
      titulo,
      autor,
      editorial,
      tipo,
      genero,
      estado,
      calificacion,
      resena
    });
    
    const updatedBook = await Book.findByPk(book.id, {
      include: [{
        model: User,
        as: "user",
        attributes: ["mail"]
      }]
    });
    
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    });
    
    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    
    await book.destroy();
    res.json({ message: "Libro eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};