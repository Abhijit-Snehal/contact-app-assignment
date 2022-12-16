import HomePage from './components/HomePage';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/edit-contact/:id" element={<EditContact />} />
            </Routes>
        </Router>
    )
}

export default App;