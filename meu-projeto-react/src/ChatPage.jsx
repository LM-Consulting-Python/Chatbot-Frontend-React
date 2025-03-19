import React, { useState } from "react";
import "./ChatPage.css";
import logoIcon from "./assets/imeddata-logo.svg"; // Substitua pelo caminho real do seu logo

function ChatPage() {
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Adicione aqui a lógica para enviar a mensagem
    console.log("Mensagem enviada:", message);
    setMessage("");
    setCharCount(0);
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <div className="logo-small">
            <img src={logoIcon} alt="Logo" />
          </div>
          <h1>Assistente Virtual</h1>
        </div>

        <div className="chat-content">
          <div className="welcome-message">
            <div className="avatar-container">
              <img src={logoIcon} alt="Avatar" className="avatar" />
            </div>
            <div className="message-content">
              <h2>Oi! Precisa de ajuda?</h2>
              <p>
                Estou aqui para te ajudar no que precisar – desde responder suas
                perguntas até oferecer as melhores recomendações. Vamos começar?
                😊
              </p>
            </div>
          </div>
        </div>

        <div className="chat-input-container">
          <form onSubmit={handleSendMessage}>
            <div className="input-wrapper">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Pergunte o que quiser..."
                className="chat-input"
              />
              <div className="input-actions">
                <span className="char-count">{charCount}/1000</span>
                <button
                  type="submit"
                  className="send-button"
                  disabled={message.trim() === ""}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="send-icon"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
