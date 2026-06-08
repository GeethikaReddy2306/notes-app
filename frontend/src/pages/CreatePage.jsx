import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../lib/api';
import toast from 'react-hot-toast';
import './CreatePage.css';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Please add both a title and note content.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/notes', { title: title.trim(), content: content.trim() });
      toast.success('Note created successfully.');
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Unable to create note. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />

      <main className="form-page">
        <section className="form-page__card">
          <h1 className="form-page__title">Create a new note</h1>
          <p className="form-page__subtitle">
            Fill in the note title and content, then save it to your notes board.
          </p>

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
                {loading ? 'Saving...' : 'Save note'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
