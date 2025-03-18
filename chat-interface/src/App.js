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
            Estou aqui para te ajudar no que precisar - desde responder suas
            perguntas até oferecer as melhores recomendações. Vamos começar? 😊
          </div>
        </div>

        {/* Mensagem do usuário */}
        <div className="message user">
          <div className="message-content">
            Me mostre o histórico médico da paciente
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
