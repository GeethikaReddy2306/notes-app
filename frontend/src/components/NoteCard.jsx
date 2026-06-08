import { Link } from 'react-router-dom';
import './NoteCard.css';

export default function NoteCard({ note, onDelete }) {
  const excerpt = note.content
    ? note.content.length > 120
      ? `${note.content.slice(0, 120)}...`
      : note.content
    : '';

  const noteId = note._id || note.id || '';

  return (
    <article className="note-card">
      <Link to={`/note/${noteId}`} className="note-card__link">
        <div className="note-card__content">
          <h2 className="note-card__title">{note.title}</h2>
          <p className="note-card__preview">{excerpt}</p>
        </div>
      </Link>

      <div className="note-card__actions">
        <Link to={`/note/${noteId}`} className="note-card__button note-card__button--view">
          View
        </Link>
        <button
          type="button"
          className="note-card__button note-card__button--delete"
          onClick={() => onDelete(noteId)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
