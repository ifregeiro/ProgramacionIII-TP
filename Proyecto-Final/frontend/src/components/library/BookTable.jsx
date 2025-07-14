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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Traer libros del backend al iniciar
  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        setError(null);
        const data = await getBooks();
        if (Array.isArray(data)) {
          const librosConEstado = data.map(book => ({
            ...book,
            generos: book.genero ? book.genero.split(',').map(g => g.trim()) : [],
            editando: false,
            isNew: false // Los libros existentes no son nuevos
          }));
          setBooks(librosConEstado);
        } else {
          console.error("La respuesta del servidor no es un array:", data);
          setBooks([]);
          setError("Error: La respuesta del servidor no es válida");
        }
      } catch (err) {
        console.error("Error al cargar libros:", err);
        setBooks([]);
        setError("Error al cargar los libros. Verifique su conexión e intente de nuevo.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleAdd = () => {
    const newBook = {
      id: `temp_${Date.now()}`,
      titulo: '',
      autor: '',
      editorial: '',
      tipo: 'libro',
      generos: [],
      estado: 'por leer',
      calificacion: 0,
      resena: '',
      editando: true,
      isNew: true
    };
    setBooks([newBook, ...books]);
  };

  const handleSave = async (book) => {
    try {
      const bookData = {
        ...book,
        genero: Array.isArray(book.generos) ? book.generos.join(', ') : (book.generos || '')
      };
      delete bookData.generos;
      delete bookData.editando;
      delete bookData.isNew;

      if (book.isNew) {
        // Es nuevo, crear en backend
        const created = await createBook(bookData);
        setBooks(prev =>
          prev.map(b => b.id === book.id ? { 
            ...created, 
            generos: created.genero ? created.genero.split(',').map(g => g.trim()) : [],
            editando: false,
            isNew: false
          } : b)
        );
      } else {
        // Editar libro existente
        const updated = await updateBook(book.id, bookData);
        setBooks(prev =>
          prev.map(b => b.id === book.id ? { 
            ...updated, 
            generos: updated.genero ? updated.genero.split(',').map(g => g.trim()) : [],
            editando: false,
            isNew: false
          } : b)
        );
      }
    } catch (err) {
      console.error("Error al guardar libro:", err);
      setError("Error al guardar el libro. Intente nuevamente.");
    }
  };

  const handleEdit = (id) => {
    setBooks(prev =>
      prev.map(b => b.id === id ? { ...b, editando: true } : b)
    );
  };

  const handleCancel = (id) => {
    setBooks(prev => {
      const book = prev.find(b => b.id === id);
      if (book && book.isNew) {
        return prev.filter(b => b.id !== id);
      } else {
        return prev.map(b => b.id === id ? { ...b, editando: false } : b);
      }
    });
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
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Cargando libros...</p>
        </div>
      )}
      
      {error && (
        <div style={{ 
          backgroundColor: '#fee', 
          border: '1px solid #fcc', 
          color: '#a00', 
          padding: '1rem', 
          margin: '1rem 0', 
          borderRadius: '4px' 
        }}>
          {error}
        </div>
      )}

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
          {books.length === 0 && !loading ? (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                No hay libros disponibles. ¡Agrega tu primer libro!
              </td>
            </tr>
          ) : (
            books.map(book =>
              book.editando
                ? <EditableRow
                    key={book.id}
                    book={book}
                    setBooks={setBooks}
                    books={books}
                    onSave={handleSave}
                    onCancel={() => handleCancel(book.id)}
                  />
                : <ReadOnlyRow
                    key={book.id}
                    book={book}
                    setBooks={setBooks}
                    onEdit={() => handleEdit(book.id)}
                    onDelete={() => handleDelete(book.id)}
                  />
            )
          )}
        </tbody>
      </table>
      <button className="add-btn" onClick={handleAdd}>+</button>
    </>
  );
}

export default BookTable;
