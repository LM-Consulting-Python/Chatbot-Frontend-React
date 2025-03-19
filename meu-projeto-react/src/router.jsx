import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // Ajuste o caminho de acordo com sua estrutura de pastas
import ChatPage from "./ChatPage"; // Crie esta página ou ajuste o caminho conforme necessário

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Adicione outras rotas aqui conforme necessário */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
