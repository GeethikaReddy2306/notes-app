import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNotes() {
      try {
        const res = await axios.get('http://localhost:5000/api/notes/');


        // Get the array from result
        setNotes(res.data.result);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getNotes();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Navbar />

      {notes.length === 0 ? (
        <h2>No Notes Found</h2>
      ) : (
        notes.map((note) => (
          <div key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}