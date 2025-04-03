import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Mantenha os estilos existentes
import imedDataLogo from "./assets/imeddata-logo.svg";
import qrCodeImage from "./assets/qrcode.png";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o objeto window.particlesJS existe
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: false,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    }
  }, []);

  const navigateToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="app-container">
      <div className="background-image"></div>
      <div id="particles-js"></div>
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
