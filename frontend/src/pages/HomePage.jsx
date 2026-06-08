import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import toast from 'react-hot-toast';
import './HomePage.css';

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadNotes() {
    try {
      const res = await api.get('/notes');
      setNotes(res.data?.result || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Unable to load notes. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleDelete(noteId) {
    if (!noteId) {
      toast.error('Unable to delete note. Missing note ID.');
      return;
    }

    const confirmed = window.confirm('Delete this note? This action cannot be undone.');
    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(`/notes/${noteId}`);
      if (response.status !== 200) {
        throw new Error('Delete request failed');
      }

      toast.success('Note deleted successfully.');
      await loadNotes();
    } catch (err) {
      console.error(err);
      toast.error('Unable to delete note. Please try again.');
    }
  }

  return (
    <div>
      <Navbar />

      <main className="home-page">
        

        {loading ? (
          <div className="home-page__status">Loading notes…</div>
        ) : error ? (
          <div className="home-page__status error">{error}</div>
        ) : notes.length === 0 ? (
          <div className="home-page__status">
            No notes yet. Click create to add your first note.
          </div>
        ) : (
          <div className="note-grid">
            {notes.map((note) => (
              <NoteCard key={note._id || note.id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
