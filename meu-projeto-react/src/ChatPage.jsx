import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
import logoIcon from "./assets/imeddata-logo.svg";
import SendIcon from "./SendIcon";

// --- Icon Components ---
const AIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff6b35">
    <path d="M21 2H3C1.9 2 1 2.9 1 4V16C1 17.1 1.9 18 3 18H7L11 22V18H21C22.1 18 23 17.1 23 16V4C23 2.9 22.1 2 21 2ZM13 11H7V9H13V11ZM17 7H7V5H17V7Z" />
  </svg>
);

function ChatPage() {
  // Core chat state
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatContentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // User state
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userLoaded, setUserLoaded] = useState(false);

  // API Endpoint Base URL
  const API_BASE_URL = "https://api.imeddata-4.com.br";

  // Handle message input change
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
  };

  // Helper function to add assistant messages to the chat
  const addAssistantMessage = (content, subtext = "") => {
    if (!isConversationStarted) {
      setIsConversationStarted(true);
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now() + Math.random(),
        sender: "assistant",
        content: content,
        subtext: subtext,
      },
    ]);
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    if (!userId && !userLoaded) {
      addAssistantMessage(
        "Por favor, informe seu ID de usuário antes de enviar mensagens."
      );
      return;
    }

    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      content: message,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setMessage("");
    setCharCount(0);
    setIsConversationStarted(true);
    setIsLoading(true);

    // Define API endpoint with userId
    const endpoint = `${API_BASE_URL}/ask2?userId=${userId}&message=${encodeURIComponent(
      message
    )}`;

    try {
      // Real API implementation
      const eventSource = new EventSource(endpoint);
      let accumulatedResponse = "";

      eventSource.onmessage = (event) => {
        if (event.data.trim() === "[DONE]") {
          eventSource.close();
          setIsLoading(false);
          return;
        }

        try {
          const parsedData = JSON.parse(event.data);
          const content = parsedData?.delta?.content;

          if (Array.isArray(content)) {
            // Acumula as partes de texto recebidas
            content.forEach((part) => {
              if (part.type === "text" && part.text.value) {
                accumulatedResponse += part.text.value;
              }
            });

            // Atualiza a última mensagem do assistente se ela já existir; caso contrário, cria uma nova
            setMessages((prevMessages) => {
              const lastMessage = prevMessages[prevMessages.length - 1];
              if (lastMessage && lastMessage.sender === "assistant") {
                // Atualiza o conteúdo da última mensagem do assistente
                return [
                  ...prevMessages.slice(0, prevMessages.length - 1),
                  { ...lastMessage, content: accumulatedResponse },
                ];
              } else {
                // Adiciona uma nova mensagem do assistente
                return [
                  ...prevMessages,
                  {
                    id: Date.now() + 1,
                    sender: "assistant",
                    content: accumulatedResponse,
                  },
                ];
              }
            });
          }
        } catch (error) {
          console.error(
            "Erro ao processar JSON:",
            error,
            "Event data:",
            event.data
          );
        }
      };

      eventSource.onerror = (error) => {
        console.error("Erro no streaming:", error);
        eventSource.close();
        addAssistantMessage(
          "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente."
        );
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Erro:", error);
      addAssistantMessage(
        "Erro ao enviar mensagem. Por favor, verifique sua conexão e tente novamente."
      );
      setIsLoading(false);
    }
  };

  // Load user by ID
  const loadUser = async () => {
    if (!userId) {
      addAssistantMessage("Por favor, insira um ID de usuário.");
      return;
    }

    setIsLoading(true);
    addAssistantMessage(
      "Carregando informações do usuário...",
      `ID: ${userId}`
    );

    try {
      // Fetch user name
      const userResponse = await fetch(
        `${API_BASE_URL}/get-user-name?userId=${userId}`
      );

      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error("Usuário não encontrado. Verifique o ID digitado.");
        }
        throw new Error(
          `Erro ${userResponse.status} ao buscar nome do usuário.`
        );
      }

      const userData = await userResponse.json();

      if (userData.userName) {
        setUserName(userData.userName);
        setUserLoaded(true);
        setIsConversationStarted(true);
        addAssistantMessage(
          `Olá, ${userData.userName}! Como posso ajudar você hoje?`
        );
      } else {
        // If user exists but has no name
        setUserLoaded(true);
        setIsConversationStarted(true);
        addAssistantMessage("Olá! Como posso ajudar você hoje?");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      addAssistantMessage(
        "Erro ao carregar informações do usuário.",
        error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle AI feature card click
  const handleAIFeature = () => {
    if (!userId) {
      setIsConversationStarted(true);
      addAssistantMessage(
        "Olá! Para começarmos, por favor digite seu ID de usuário."
      );
    } else if (!userLoaded) {
      loadUser();
    } else {
      setIsConversationStarted(true);
      addAssistantMessage(
        `Olá${userName ? ", " + userName : ""}! Como posso ajudar você hoje?`
      );
    }
  };

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContentRef.current) {
      const timer = setTimeout(() => {
        if (chatContentRef.current) {
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  return (
    <div className="chat-page">
      {/* User ID Sidebar */}
      <div className="filtros-sidebar">
        <h2 className="filtros-title">Identificação</h2>

        {/* User ID Input */}
        <div className="filter-section">
          <label htmlFor="userIdInput" className="filtros-label">
            Código do usuário
          </label>
          <div className="input-with-button">
            <input
              id="userIdInput"
              type="text"
              className="filtros-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && userId && !isLoading) loadUser();
              }}
              placeholder="Digite o ID"
              aria-label="Código do usuário"
            />
            <button
              className="filter-action-button"
              onClick={loadUser}
              disabled={!userId || isLoading}
              aria-live="polite"
            >
              {isLoading && !userName ? "Carregando..." : "Carregar"}
            </button>
          </div>
        </div>

        {/* User Info Display */}
        {userLoaded && (
          <div className="user-info-section">
            <p className="user-info-name">Usuário: {userName || userId}</p>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <div className="header-left">
            <div className="logo-small">
              <img src={logoIcon} alt="iMedidata Logo" />
            </div>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <img
                src="https://via.placeholder.com/36/ff6b35/ffffff?text=BG"
                alt="Avatar do usuário"
                className="user-avatar"
              />
              <span>{userName || (userLoaded ? userId : "Usuário")}</span>
            </div>
          </div>
        </div>

        {/* Chat Content Area (Scrollable) */}
        <div className="chat-content" ref={chatContentRef}>
          {!isConversationStarted ? (
            <>
              {/* Welcome Screen */}
              <div className="welcome-container">
                <div className="welcome-logo">
                  <img src={logoIcon} alt="iMedidata Logo" />
                </div>
                <h1 className="welcome-title">Como posso te ajudar hoje?</h1>
                <p className="welcome-text">
                  Clique para começar uma conversa.
                </p>
              </div>
              {/* Feature Cards - Only AI chat feature */}
              <div className="feature-cards">
                <div
                  className="feature-card"
                  onClick={handleAIFeature}
                  role="button"
                  tabIndex={0}
                >
                  <div className="feature-icon ai">
                    <AIIcon />
                  </div>
                  <h3 className="feature-title">Assistente AI</h3>
                  <p className="feature-description">Conversar</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Render Chat Messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${
                    msg.sender === "user" ? "user-message" : "assistant-message"
                  }`}
                >
                  {msg.sender === "assistant" && (
                    <div className="avatar-container">
                      <img
                        src={logoIcon}
                        alt="Assistente Avatar"
                        className="avatar"
                      />
                    </div>
                  )}
                  <div
                    className={`message-content ${
                      msg.sender === "user" ? "user-content" : ""
                    }`}
                  >
                    <p className="message-main-text">{msg.content}</p>
                    {msg.subtext && (
                      <p className="message-sub-text">{msg.subtext}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator (Inside Chat) */}
              {isLoading && (
                <div className="message assistant-message">
                  <div className="avatar-container">
                    <img
                      src={logoIcon}
                      alt="Assistente Avatar"
                      className="avatar"
                    />
                  </div>
                  <div className="message-content loading-indicator">
                    <div className="loader"></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="chat-input-container">
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Digite sua mensagem..."
                className="chat-input"
                maxLength={1000}
                disabled={isLoading}
                aria-label="Digite sua mensagem"
              />
              <div className="input-actions">
                <span className="char-count" aria-live="polite">
                  {charCount}/1000
                </span>
                <button
                  type="submit"
                  className="send-button"
                  disabled={message.trim() === "" || isLoading}
                  aria-label="Enviar mensagem"
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
