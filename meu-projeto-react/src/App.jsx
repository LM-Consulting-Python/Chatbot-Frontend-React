import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage"; // Import HomePage instead of App
import ChatPage from "./ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* Adicione outras rotas aqui conforme necessário */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
