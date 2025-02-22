import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Housing from "./components/pages/Housing";
import Logout from "./components/pages/Logout";
import Regi from "./components/pages/Regi";
import Candidate from './components/pages/Candidate';
import Offer from './components/pages/Offer';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/housing" element={<Housing />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/regi" element={<Regi />} />
        <Route path="/candidate/:id" element={<Candidate />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
