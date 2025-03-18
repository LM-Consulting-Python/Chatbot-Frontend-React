import React, { useState, useEffect, useRef } from "react";
import Message from "./components/Message";
import ChatInput from "./components/ChatInput";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Estou aqui para te ajudar no que precisar. Vamos começar? 😊",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const chatEndRef = useRef(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const responses = {
      "histórico médico": "Claro! Vou buscar o histórico médico da paciente...",
      default: "Entendi sua solicitação. Estou processando as informações...",
    };

    return (
      Object.entries(responses).find(([key]) =>
        userMessage.toLowerCase().includes(key)
      )?.[1] || responses.default
    );
  };

  const handleSend = (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(text),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="app">
      <div className="chat-container">
        <header className="header">
          <h1>Assistente Virtual</h1>
          <p>Oli Precisa de ajuda?</p>
        </header>

        <div className="chat-window">
          {messages.map((message) => (
            <Message
              key={message.id}
              text={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          <div ref={chatEndRef} />
        </div>

        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default App;
