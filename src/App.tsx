import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.tsx';
import Chat from './pages/Chat/index.tsx';
import Login from './pages/Login/index.tsx';
import Selection from './pages/Selection/index.tsx';
import Tables from './pages/Tables/index.tsx';
import Library from './pages/Library/index.tsx';
import Settings from './pages/Settings/index.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/library" element={<Library />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
