// src/App.js
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

  // Atualiza a referência das mensagens
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Rolagem automática
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sistema de respostas automáticas
  const generateBotResponse = (userMessage) => {
    const responses = {
      "histórico médico": "Claro! Vou buscar o histórico médico da paciente...",
      // Adicione mais respostas aqui
      default: "Entendi sua solicitação. Estou processando as informações...",
    };

    return (
      Object.entries(responses).find(([key]) =>
        userMessage.toLowerCase().includes(key)
      )?.[1] || responses.default
    );
  };

  // Lógica de envio
  const handleSend = (text) => {
    // Mensagem do usuário
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Atualiza o estado com a mensagem do usuário
    setMessages((prev) => [...prev, userMessage]);

    // Simula resposta do bot após 1 segundo
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
      <header className="header">
        <h1>Assistente Virtual</h1>
        <p>Oli Precisa de ajuda?</p>
      </header>

      <div className="chat-window" ref={chatEndRef}>
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
  );
};

export default App;
