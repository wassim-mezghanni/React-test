import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.tsx';
import Chat from './pages/Chat/index.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
