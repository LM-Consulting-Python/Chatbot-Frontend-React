import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
import logoIcon from "./assets/imeddata-logo.svg"; // Substitua pelo caminho real do seu logo
import SendIcon from "./SendIcon"; // Importando o componente do ícone de envio

function ChatPage() {
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      content: "Oi! Precisa de ajuda?",
      subtext:
        "Estou aqui para te ajudar no que precisar – desde responder suas perguntas até oferecer as melhores recomendações. Vamos começar? 😊",
    },
  ]);
  const chatContentRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    // Adicionar mensagem do usuário
    const newMessage = {
      id: Date.now(),
      sender: "user",
      content: message,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    setCharCount(0);

    // Simulação de resposta do assistente (pode ser substituído por uma chamada de API real)
    setTimeout(() => {
      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: "Entendi sua mensagem",
        subtext:
          "Estou processando sua solicitação e retornarei em breve com mais informações.",
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    }, 1000);
  };

  // Rolar para o final quando novas mensagens são adicionadas
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

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
                  <SendIcon />
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
