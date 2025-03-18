import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Assistente Virtual</h1>
        <p>Oi, Precisa de ajuda?</p>
      </header>

      {/* Área de mensagens */}
      <div className="chat-window">
        {/* Mensagem do assistente */}
        <div className="message bot">
          <div className="message-content">
            Estou aqui para te ajudar no que precisar. Vamos começar? 😊
          </div>
        </div>
      </div>

      {/* Área de input */}
      <div className="input-area">
        <input type="text" placeholder="Digite sua mensagem..." />
        <button>Enviar</button>
      </div>
    </div>
  );
}

export default App;
