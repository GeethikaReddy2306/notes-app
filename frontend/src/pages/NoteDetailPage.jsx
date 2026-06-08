import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../lib/api';
import toast from 'react-hot-toast';
import './NoteDetailPage.css';

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function loadNote() {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
        setTitle(response.data.title || '');
        setContent(response.data.content || '');
        setError('');
      } catch (err) {
        console.error(err);
        setError('Unable to load this note. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadNote();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm('Delete this note? This action cannot be undone.');
    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully.');
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      toast.error('Unable to delete note. Please try again.');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }

    try {
      setLoading(true);
      const response = await api.put(`/notes/${id}`, {
        title: title.trim(),
        content: content.trim(),
      });

      setNote(response.data?.data || response.data);
      setIsEditing(false);
      toast.success('Note updated successfully.');
    } catch (err) {
      console.error(err);
      setError('Unable to update note. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className="form-page">
          <div className="form-loading">Loading note details…</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <main className="form-page">
          <div className="form-error">{error}</div>
        </main>
      </div>
    );
  }

  if (!note) {
    return (
      <div>
        <Navbar />
        <main className="form-page">
          <div className="form-error">Note not found.</div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="form-page">
        <section className="form-page__card">
          <div className="note-detail-header">
            <div>
              <h1 className="form-page__title">Note details</h1>
              <p className="form-page__subtitle">View the full note content or edit it inline.</p>
            </div>

            <div className="note-detail-actions">
              <button className="form-button form-button--secondary" type="button" onClick={() => navigate('/')}>Back</button>
              <button
                className="form-button"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="form-button form-button--delete"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  className="form-input"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Note title"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  className="form-textarea"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Write your note here..."
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <div className="form-actions">
                <button className="form-button" type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Update note'}
                </button>
                <button
                  className="form-button form-button--secondary"
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setTitle(note.title || '');
                    setContent(note.content || '');
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="note-detail-view">
              <h2 className="note-detail-title">{note.title}</h2>
              <p className="note-detail-content">{note.content}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
