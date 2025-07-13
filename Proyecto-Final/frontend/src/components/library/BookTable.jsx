import React, { useEffect, useState } from 'react';
import '../../App.css';
import { EditableRow, ReadOnlyRow } from './BookRow';
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook
} from '../../services/bookService';

function BookTable() {
  const [books, setBooks] = useState([]);

  // Traer libros del backend al iniciar
  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBooks();
        const librosConEstado = data.map(book => ({ ...book, editando: false }));
        setBooks(librosConEstado);
      } catch (err) {
        console.error("Error al cargar libros:", err);
      }
    }

    fetchBooks();
  }, []);

  const handleAdd = () => {
    const newBook = {
      id: Date.now(), // Temporal, lo reemplaza el backend
      titulo: '',
      autor: '',
      editorial: '',
      tipo: 'libro',
      generos: [],
      estado: 'por leer',
      calificacion: 0,
      resena: '',
      editando: true
    };
    setBooks([newBook, ...books]);
  };

  const handleSave = async (book) => {
    try {
      if (typeof book.id === 'number') {
        // Es nuevo, crear en backend
        const created = await createBook(book);
        setBooks(prev =>
          prev.map(b => b.id === book.id ? { ...created, editando: false } : b)
        );
      } else {
        // Editar libro existente
        await updateBook(book.id, book);
        setBooks(prev =>
          prev.map(b => b.id === book.id ? { ...book, editando: false } : b)
        );
      }
    } catch (err) {
      console.error("Error al guardar libro:", err);
    }
  };

  const handleEdit = (id) => {
    setBooks(prev =>
      prev.map(b => b.id === id ? { ...b, editando: true } : b)
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error("Error al eliminar libro:", err);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Editorial</th>
            <th>Tipo</th>
            <th>Géneros</th>
            <th>Estado</th>
            <th>⭐ Valoración ⭐</th>
            <th>📝 Reseña 📝</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book =>
            book.editando
              ? <EditableRow
                  key={book.id}
                  book={book}
                  setBooks={setBooks}
                  books={books}
                  onSave={handleSave}
                />
              : <ReadOnlyRow
                  key={book.id}
                  book={book}
                  setBooks={setBooks}
                  onEdit={() => handleEdit(book.id)}
                  onDelete={() => handleDelete(book.id)}
                />
          )}
        </tbody>
      </table>
      <button className="add-btn" onClick={handleAdd}>+</button>
    </>
  );
}

export default BookTable;
