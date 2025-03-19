import React from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import "./App.css"; // Mantenha os estilos existentes
import imedDataLogo from "./assets/imeddata-logo.svg";
import qrCodeImage from "./assets/qrcode.png";

function HomePage() {
  const navigate = useNavigate();

  const navigateToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="app-container">
      <div className="background-waves"></div>
      <div className="content-container">
        <div className="left-panel">
          <div className="logo-container">
            <img src={imedDataLogo} alt="iMedDat@ Logo" className="logo" />
            <span className="logo-text">iMedDat@</span>
            <div className="logo-subtitle">Segurança Digital</div>
          </div>

          <div className="access-section">
            <h1>Acessar Assistente Virtual</h1>
            <p>Use o app no navegador e compartilhe as suas informações</p>

            <div className="qr-container">
              <div className="qr-frame">
                <img src={qrCodeImage} alt="QR Code" className="qr-code" />
              </div>
            </div>

            <p className="scan-instructions">
              Escanei esse código com o seu celular
              <br />e acesse o assistente virtual do paciente
            </p>

            <button className="chat-button" onClick={navigateToChat}>
              Acessar Chat Agora
            </button>
          </div>
        </div>

        <div className="right-panel">
          <div className="instructions-container">
            <h2>Como conectar um dispositivo ao imedData</h2>

            <ol className="connection-steps">
              <li>
                <span className="step-number">1 -</span> Abra o{" "}
                <strong>imedData</strong> no seu celular.
              </li>
              <li>
                <span className="step-number">2 -</span> Toque em{" "}
                <strong>Mais opções</strong>.
              </li>
              <li>
                <span className="step-number">3 -</span> Selecione{" "}
                <strong>Dispositivos conectados</strong> e depois toque em{" "}
                <strong>Conectar dispositivo</strong>.
              </li>
              <li>
                <span className="step-number">4 -</span> Aponte a câmera do seu
                celular para a tela para escanear o <strong>QR Code</strong>.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
