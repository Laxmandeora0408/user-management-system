import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageUsersPage from './pages/ManageUsersPage';
import EditUserPage from '@pages/EditUserPage';
import NotFoundPage from '@pages/NotFoundPage';
import AddUserPage from './pages/AddUserPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <div className="max-w-[1280px] w-[90%] mx-auto mt-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddUserPage />} />
        <Route path="/manage/:id" element={<EditUserPage />} />
        <Route path="/manage" element={<ManageUsersPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
