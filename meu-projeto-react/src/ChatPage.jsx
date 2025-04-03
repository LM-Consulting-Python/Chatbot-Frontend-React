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
  // Core chat state
  const [message, setMessage] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isConversationStarted, setIsConversationStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatContentRef = useRef(null);

  // User and data states
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfoVisible, setUserInfoVisible] = useState(false);

  // Document states
  const [documents, setDocuments] = useState([]);
  const [dataTypes, setDataTypes] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("");

  // Image states
  const [examTypes, setExamTypes] = useState([]);
  const [examDates, setExamDates] = useState([]);
  const [selectedExamType, setSelectedExamType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const imagesPerPage = 20;

  // Handle user input in chat
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setCharCount(e.target.value.length);
  };

  // Send message in chat
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

    // Simulate AI response
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

  // Start a feature-based conversation
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

    // Handle specific feature selection
    if (feature === "documents") {
      handleDocumentsFeature();
    } else if (feature === "images") {
      handleImagesFeature();
    }

    // Simulate AI response
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

  // Load user information
  const loadUser = async () => {
    if (!userId) {
      alert("Por favor, insira um ID de usuário.");
      return;
    }

    setIsLoading(true);
    setUserInfoVisible(false);

    try {
      const response = await fetch(
        `https://api.imeddata-4.com.br/get-user-name?userId=${userId}`
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar usuário");
      }

      const data = await response.json();

      if (data.userName) {
        setUserName(data.userName);
        setUserInfoVisible(true);
      } else {
        alert("Usuário não encontrado. Verifique o ID digitado.");
      }

      // Load exam types for this user
      await loadExamTypes();
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      alert(
        "Erro ao carregar usuário. Verifique se o servidor está ativo e acessível."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Load exam types for the user
  const loadExamTypes = async () => {
    try {
      const examTypesResponse = await fetch(
        `https://api.imeddata-4.com.br/get-exam-types?userId=${userId}`
      );

      if (!examTypesResponse.ok) {
        throw new Error("Erro ao buscar tipos de exames do usuário");
      }

      const examTypesData = await examTypesResponse.json();
      setExamTypes(examTypesData);
    } catch (error) {
      console.error("Erro ao carregar tipos de exames:", error);
      alert("Erro ao carregar tipos de exames.");
    }
  };

  // Load exam dates based on selected exam type
  const loadExamDates = async () => {
    if (!selectedExamType) return;

    try {
      const response = await fetch(
        `https://api.imeddata-4.com.br/get-exam-dates?userId=${userId}&exam_type=${selectedExamType}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar datas de exames");
      }

      const examDatesData = await response.json();
      const distinctDates = [...new Set(examDatesData)];
      setExamDates(distinctDates);
    } catch (error) {
      console.error("Erro ao buscar datas de exames:", error);
      alert(
        "Erro ao buscar datas de exames. Verifique se o servidor está ativo e acessível."
      );
    }
  };

  // Handle document feature
  const handleDocumentsFeature = async () => {
    if (!userId) {
      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: "Para acessar documentos, precisamos do seu ID de usuário",
        subtext: "Por favor, informe o ID no filtro ao lado.",
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
      return;
    }

    setIsLoading(true);

    try {
      let url = `https://api.imeddata-4.com.br/documents/${encodeURIComponent(
        userId
      )}`;

      if (selectedDataType) {
        url += `?dataType=${encodeURIComponent(selectedDataType)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erro ao buscar documentos.");
      }

      const data = await response.json();

      if (!data.success || !data.documents || data.documents.length === 0) {
        const assistantResponse = {
          id: Date.now() + 1,
          sender: "assistant",
          content: "Nenhum documento encontrado",
          subtext: "Não encontramos documentos para esse usuário.",
        };
        setMessages((prevMessages) => [...prevMessages, assistantResponse]);
        return;
      }

      // Extract data types for filtering
      const dataTypesSet = new Set();
      data.documents.forEach((doc) => {
        if (doc.data_type) {
          dataTypesSet.add(doc.data_type);
        }
      });
      setDataTypes(Array.from(dataTypesSet));

      setDocuments(data.documents);

      // Inform the user about documents
      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: `Encontrei ${data.documents.length} documentos`,
        subtext: "Você pode filtrar por tipo de dados usando o filtro ao lado.",
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: "Erro ao buscar documentos",
        subtext: error.message,
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert document to HL7 FHIR
  const convertToHL7FHIR = async (pdfContent) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api.imeddata-4.com.br/convert-pdf-to-hl7",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pdfContent }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao converter para HL7 FHIR.");
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }

      // Send the converted result to the chat
      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: "Documento convertido para HL7 FHIR",
        subtext: result,
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } catch (error) {
      console.error("Erro ao converter para HL7 FHIR:", error);
      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: "Erro ao converter documento",
        subtext: error.message,
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle images feature
  const handleImagesFeature = () => {
    if (!userId) {
      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: "Para acessar imagens, precisamos do seu ID de usuário",
        subtext: "Por favor, informe o ID no filtro ao lado.",
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
      return;
    }

    setIsImageViewerVisible(true);

    const assistantResponse = {
      id: Date.now() + 1,
      sender: "assistant",
      content: "Visualizador de imagens ativado",
      subtext: "Selecione um tipo de exame e uma data para ver as imagens.",
    };
    setMessages((prevMessages) => [...prevMessages, assistantResponse]);
  };

  // Filter and load images based on selections
  const filterAndLoadImages = async () => {
    if (!selectedExamType || !selectedDate) {
      alert("Por favor, selecione um tipo de exame e uma data.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.imeddata-4.com.br/get-filtered-images?userId=${userId}&exam_type=${encodeURIComponent(
          selectedExamType
        )}&date=${selectedDate}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar imagens");
      }

      const imagesData = await response.json();
      setFilteredImages(imagesData);
      setCurrentPage(0);

      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: `${imagesData.length} imagens encontradas`,
        subtext: "Confira as imagens abaixo.",
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      const assistantResponse = {
        id: Date.now() + 1,
        sender: "assistant",
        content: "Erro ao buscar imagens",
        subtext: error.message,
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to next page of images
  const nextPage = () => {
    if ((currentPage + 1) * imagesPerPage < filteredImages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navigate to previous page of images
  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Open image in modal
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalVisible(true);
  };

  // Close image modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Effect to scroll to bottom of chat on new messages
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  // Effect to load exam dates when exam type changes
  useEffect(() => {
    if (selectedExamType) {
      loadExamDates();
    }
  }, [selectedExamType]);

  return (
    <div className="chat-page">
      <div className="filtros-sidebar">
        <h2 className="filtros-title">Filtros</h2>

        <div className="filter-section">
          <label className="filtros-label">Código do usuário</label>
          <div className="input-with-button">
            <input
              type="text"
              className="filtros-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button
              className="filter-action-button"
              onClick={loadUser}
              disabled={!userId}
            >
              Carregar
            </button>
          </div>
        </div>

        {userInfoVisible && (
          <div className="user-info-section">
            <p className="user-info-name">{userName}</p>
          </div>
        )}

        {dataTypes.length > 0 && (
          <div className="filter-section">
            <label className="filtros-label">Tipo de Dados</label>
            <select
              className="filtros-select"
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
            >
              <option value="">Todos</option>
              {dataTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {examTypes.length > 0 && (
          <div className="filter-section">
            <label className="filtros-label">Tipo de Exame</label>
            <select
              className="filtros-select"
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
            >
              <option value="">Selecione o Tipo de Exame</option>
              {examTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {examDates.length > 0 && (
          <div className="filter-section">
            <label className="filtros-label">Data do Exame</label>
            <select
              className="filtros-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">Selecione a Data</option>
              {examDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedExamType && selectedDate && (
          <button
            className="filter-action-button"
            onClick={filterAndLoadImages}
          >
            Buscar Imagens
          </button>
        )}
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
            <>
              {messages.map((msg) => (
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
              ))}

              {isLoading && (
                <div className="loading-indicator">
                  <div className="loader"></div>
                  <p>Carregando...</p>
                </div>
              )}

              {documents.length > 0 && (
                <div className="documents-container">
                  {documents.map((doc, index) => (
                    <div key={index} className="document">
                      <h3>Documento: {doc.document_hash}</h3>
                      <p>Tipo de Dado: {doc.data_type}</p>
                      <iframe
                        src={`data:application/pdf;base64,${doc.pdf_content}`}
                        className="document-iframe"
                        title={`Document ${index}`}
                      />
                      <button
                        className="convert-button"
                        onClick={() => convertToHL7FHIR(doc.pdf_content)}
                      >
                        Converter para HL7 FHIR
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {isImageViewerVisible && filteredImages.length > 0 && (
                <div className="image-viewer">
                  <div className="carousel">
                    {filteredImages
                      .slice(
                        currentPage * imagesPerPage,
                        (currentPage + 1) * imagesPerPage
                      )
                      .map((image, index) => (
                        <img
                          key={index}
                          src={`data:image/jpeg;base64,${image.image}`}
                          alt={`Imagem de ${image.exam_type} em ${image.date}`}
                          onClick={() => openModal(image.image)}
                        />
                      ))}
                  </div>
                  <div className="pagination-controls">
                    <button onClick={previousPage} disabled={currentPage === 0}>
                      Anterior
                    </button>
                    <span>
                      Página {currentPage + 1} de{" "}
                      {Math.ceil(filteredImages.length / imagesPerPage)}
                    </span>
                    <button
                      onClick={nextPage}
                      disabled={
                        (currentPage + 1) * imagesPerPage >=
                        filteredImages.length
                      }
                    >
                      Próxima
                    </button>
                  </div>
                </div>
              )}
            </>
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

      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <img
              src={`data:image/jpeg;base64,${modalImage}`}
              alt="Imagem ampliada"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
