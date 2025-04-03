import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
import logoIcon from "./assets/imeddata-logo.svg";
import SendIcon from "./SendIcon";

// Icons for the features
const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff6b35">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" />
  </svg>
);

const AIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff6b35">
    <path d="M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H7L11 22V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM13 11H7V9H13V11ZM17 7H7V5H17V7Z" />
  </svg>
);

const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff6b35">
    <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" />
  </svg>
);

function ChatPage() {
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatContentRef = useRef(null);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      content: message,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    setCharCount(0);
    setIsConversationStarted(true);

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

  const startFeatureConversation = (feature) => {
    setIsConversationStarted(true);
    const featureMessages = {
      documents: "Quero ver os documentos disponíveis",
      ai: "Preciso de ajuda da assistente virtual",
      images: "Quero acessar as imagens",
    };

    const newMessage = {
      id: Date.now(),
      sender: "user",
      content: featureMessages[feature],
    };

    setMessages([newMessage]);

    setTimeout(() => {
      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: `Você selecionou a opção ${feature}`,
        subtext: "Como posso ajudar com isso?",
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    }, 1000);
  };

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-page">
      <div className="filtros-sidebar">
        <h2 className="filtros-title">Filtros</h2>
        <label className="filtros-label">Código do usuário</label>
        <input type="text" className="filtros-input" />
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-left">
            <div className="logo-small">
              <img src={logoIcon} alt="Logo" />
            </div>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <img
                src="https://via.placeholder.com/36"
                alt="Bruna Gonçalves"
                className="user-avatar"
              />
              <span>Bruna Gonçalves</span>
            </div>
          </div>
        </div>

        <div className="chat-content" ref={chatContentRef}>
          {!isConversationStarted ? (
            <>
              <div className="welcome-container">
                <div className="welcome-logo">
                  <img src={logoIcon} alt="Logo" />
                </div>
                <h1 className="welcome-title">Como posso te ajudar hoje?</h1>
                <p className="welcome-text">
                  Estou aqui para te ajudar no que precisar – desde responder
                  suas perguntas até oferecer as melhores recomendações. Vamos
                  começar? 😊
                </p>
              </div>
              <div className="feature-cards">
                <div
                  className="feature-card"
                  onClick={() => startFeatureConversation("documents")}
                >
                  <div className="feature-icon docs">
                    <DocumentIcon />
                  </div>
                  <h3 className="feature-title">Documentos</h3>
                  <p className="feature-description">
                    Visualizar os documentos disponíveis
                  </p>
                </div>
                <div
                  className="feature-card"
                  onClick={() => startFeatureConversation("ai")}
                >
                  <div className="feature-icon ai">
                    <AIIcon />
                  </div>
                  <h3 className="feature-title">AI</h3>
                  <p className="feature-description">
                    Converse com nossa assistente virtual e tire suas dúvidas
                  </p>
                </div>
                <div
                  className="feature-card"
                  onClick={() => startFeatureConversation("images")}
                >
                  <div className="feature-icon images">
                    <ImageIcon />
                  </div>
                  <h3 className="feature-title">Imagens</h3>
                  <p className="feature-description">
                    Acesse e confira todas as imagens
                  </p>
                </div>
              </div>
            </>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "assistant-message"
                }`}
              >
                {msg.sender === "assistant" && (
                  <div className="avatar-container">
                    <img src={logoIcon} alt="Avatar" className="avatar" />
                  </div>
                )}
                <div
                  className={`message-content ${
                    msg.sender === "user" ? "user-content" : ""
                  }`}
                >
                  <h2>{msg.content}</h2>
                  {msg.subtext && <p>{msg.subtext}</p>}
                </div>
              </div>
            ))
          )}
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
                maxLength={1000}
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
