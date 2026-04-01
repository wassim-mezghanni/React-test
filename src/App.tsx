import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.tsx';
import Chat from './pages/Chat/index.tsx';
import Login from './pages/Login/index.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
