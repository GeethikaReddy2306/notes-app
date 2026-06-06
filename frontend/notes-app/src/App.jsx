import {Routes,Route} from "react-router";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Create" element={<CreatePage/>} />
        <Route path="/Note/:id" element={<NoteDetailPage/>}/>
      </Routes>
    </div>
  )
}
