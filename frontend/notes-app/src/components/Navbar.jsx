import { StickyNotePlus } from 'lucide-react';
import {Link} from "react-router";
export default function Navbar() {
  return (
    <div>
     <h1>NexNote</h1>
    
     <Link to="/Create">  <StickyNotePlus />Create Note</Link>
    </div>
  )
}
