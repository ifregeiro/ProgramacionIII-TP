import React, { useState } from 'react';

const initialGenres = ["fantasia", "accion", "satira", "romance", "ciencia ficcion"];
const genreClassMap = {
  "fantasia": "fantasia",
  "accion": "accion",
  "satira": "satira",
  "romance": "romance",
  "ciencia ficcion": "ciencia-ficcion"
};
const estados = ["leído", "leyendo", "por leer"];

export function EditableRow({ book, setBooks, books }) {
  const [form, setForm] = useState(book);
  const [rating, setRating] = useState(book.calificacion || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGenres = (e) => {
    const options = Array.from(e.target.selectedOptions).map(o => o.value);
    setForm({ ...form, generos: options });
  };

  const handleSave = () => {
    const updated = books.map(b => (
      b.id === book.id ? { ...form, calificacion: rating, editando: false } : b
    ));
    setBooks(updated);
  };

  return (
    <tr>
      <td><input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" /></td>
      <td><input name="autor" value={form.autor} onChange={handleChange} placeholder="Autor" /></td>
      <td><input name="editorial" value={form.editorial} onChange={handleChange} placeholder="Editorial" /></td>
      <td>
        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="libro">Libro</option>
          <option value="comic">Cómic</option>
        </select>
      </td>
      <td>
        <select multiple value={form.generos} onChange={handleGenres}>
          {initialGenres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </td>
      <td>
        <select name="estado" value={form.estado} onChange={handleChange}>
          {estados.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </td>
      <td>
        <div className="stars">
          {[1,2,3,4,5].map(i => (
            <span
              key={i}
              data-value={i}
              className={i <= rating ? "active" : ""}
              onClick={() => setRating(i)}
              style={{ cursor: 'pointer' }}
            >
              ★
            </span>
          ))}
        </div>
      </td>
      <td>
        <textarea
          name="resena"
          value={form.resena}
          onChange={handleChange}
          rows="2"
          placeholder="Reseña..."
        />
      </td>
      <td>
        <button className="save" onClick={handleSave}>Guardar</button>
      </td>
    </tr>
  );
}

export function ReadOnlyRow({ book, setBooks }) {
  const handleEdit = () => {
    setBooks(prev =>
      prev.map(b => (b.id === book.id ? { ...b, editando: true } : b))
    );
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(`¿Seguro que querés eliminar "${book.titulo}"?`);
    if (confirmDelete) {
      setBooks(prev => prev.filter(b => b.id !== book.id));
    }
  };

  return (
    <tr>
      <td><strong>{book.titulo}</strong></td>
      <td>{book.autor}</td>
      <td>{book.editorial}</td>
      <td><span className={`tag ${book.tipo}`}>{book.tipo}</span></td>
      <td>
        {book.generos.map(g => (
          <span key={g} className={`tag ${genreClassMap[g] || 'ficcion'}`}>{g}</span>
        ))}
      </td>
      <td>{book.estado}</td>
      <td>
        <span className="stars">
          {'★'.repeat(book.calificacion)}{'☆'.repeat(5 - book.calificacion)}
        </span>
      </td>
      <td><div className="reseña">{book.resena}</div></td>
      <td>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={handleDelete} style={{ marginLeft: '0.5rem', backgroundColor: '#c0392b' }}>
          🗑️
        </button>
      </td>
    </tr>
  );
}

