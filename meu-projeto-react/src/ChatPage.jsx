import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
import logoIcon from "./assets/imeddata-logo.svg";
import SendIcon from "./SendIcon";

// --- Icons remain the same ---
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
// --- End Icons ---

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
  const [allImages, setAllImages] = useState([]); // This state seems unused, consider removing if not needed
  const [filteredImages, setFilteredImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const imagesPerPage = 20;

  // --- Helper function to add assistant messages ---
  const addAssistantMessage = (content, subtext = "") => {
    // Ensure conversation starts when the assistant speaks first
    if (!isConversationStarted) {
      setIsConversationStarted(true);
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        sender: "assistant",
        content: content,
        subtext: subtext,
      },
    ]);
  };

  // Handle user input in chat
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setCharCount(e.target.value.length);
  };

  // Send message in chat (User message)
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

    // --- Simple Echo Bot Example (Replace with actual AI/API call later) ---
    // Simulate assistant response after a short delay
    // You would replace this setTimeout with your actual logic
    // that might involve sending the user message to an API and getting a response
    setTimeout(() => {
      addAssistantMessage(
        "Recebi sua mensagem!",
        `Você disse: "${newMessage.content}". Em breve integrarei com a IA.`
      );
    }, 500);
    // --- End Simple Echo Bot Example ---
  };

  // Load user information
  const loadUser = async () => {
    if (!userId) {
      // Use assistant message instead of alert
      addAssistantMessage(
        "Por favor, insira um ID de usuário no filtro ao lado para carregar as informações."
      );
      return;
    }

    setIsLoading(true);
    setUserInfoVisible(false); // Hide previous info while loading
    addAssistantMessage(
      "Carregando informações do usuário...",
      `ID: ${userId}`
    );

    try {
      const response = await fetch(
        `https://api.imeddata-4.com.br/get-user-name?userId=${userId}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Usuário não encontrado. Verifique o ID digitado.");
        }
        throw new Error(`Erro ${response.status} ao carregar usuário`);
      }

      const data = await response.json();

      if (data.userName) {
        setUserName(data.userName);
        setUserInfoVisible(true);
        addAssistantMessage(`Usuário ${data.userName} carregado com sucesso.`);
        // Load exam types automatically after loading user
        await loadExamTypes(userId); // Pass userId explicitly
      } else {
        // Handle case where API returns 200 but no userName (unlikely based on previous logic but safe)
        addAssistantMessage(
          "Usuário não encontrado.",
          "Resposta da API não continha nome de usuário."
        );
        setUserId(""); // Clear potentially invalid ID
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      addAssistantMessage(
        "Erro ao carregar usuário.",
        error.message || "Verifique a conexão ou o ID informado."
      );
      setUserId(""); // Clear potentially invalid ID
      setUserInfoVisible(false); // Ensure stale info is hidden
    } finally {
      setIsLoading(false);
    }
  };

  // Load exam types for the user
  const loadExamTypes = async (currentUserId) => {
    // Accept userId as parameter
    // No need for separate loading message here as it's part of loadUser flow usually
    try {
      const examTypesResponse = await fetch(
        `https://api.imeddata-4.com.br/get-exam-types?userId=${currentUserId}` // Use passed userId
      );

      if (!examTypesResponse.ok) {
        throw new Error("Erro ao buscar tipos de exames do usuário");
      }

      const examTypesData = await examTypesResponse.json();
      setExamTypes(examTypesData);
      if (examTypesData.length > 0) {
        addAssistantMessage(
          "Tipos de exame disponíveis carregados.",
          "Selecione um tipo de exame no filtro."
        );
      } else {
        addAssistantMessage(
          "Nenhum tipo de exame encontrado para este usuário."
        );
      }
      // Reset dependent states
      setExamDates([]);
      setSelectedExamType("");
      setSelectedDate("");
      setFilteredImages([]);
      setIsImageViewerVisible(false);
    } catch (error) {
      console.error("Erro ao carregar tipos de exames:", error);
      addAssistantMessage("Erro ao carregar tipos de exames.", error.message);
      setExamTypes([]); // Clear exam types on error
    }
  };

  // Load exam dates based on selected exam type
  const loadExamDates = async () => {
    if (!selectedExamType || !userId) return; // Ensure userId is also available

    setIsLoading(true); // Add loading indicator for this specific action
    addAssistantMessage(`Buscando datas para o exame: ${selectedExamType}`);

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
      setSelectedDate(""); // Reset date selection
      setFilteredImages([]); // Reset images
      setIsImageViewerVisible(false); // Hide viewer if dates change

      if (distinctDates.length > 0) {
        addAssistantMessage(
          `Datas disponíveis para ${selectedExamType} carregadas.`,
          "Selecione uma data no filtro."
        );
      } else {
        addAssistantMessage(
          `Nenhuma data encontrada para o tipo de exame ${selectedExamType}.`
        );
      }
    } catch (error) {
      console.error("Erro ao buscar datas de exames:", error);
      addAssistantMessage("Erro ao buscar datas de exames.", error.message);
      setExamDates([]); // Clear dates on error
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  // Handle document feature (triggered by card click or potentially a command)
  const handleDocumentsFeature = async () => {
    if (!userId) {
      addAssistantMessage(
        "Para acessar documentos, precisamos do seu ID de usuário.",
        "Por favor, informe o ID no filtro ao lado e clique em 'Carregar'."
      );
      return;
    }

    setIsLoading(true);
    setIsImageViewerVisible(false); // Hide image viewer if showing docs
    setFilteredImages([]); // Clear images
    setDocuments([]); // Clear previous documents
    setDataTypes([]); // Clear previous data types
    setSelectedDataType(""); // Reset data type filter

    addAssistantMessage(
      "Buscando documentos...",
      `Usuário: ${userName || userId}`
    );

    try {
      let url = `https://api.imeddata-4.com.br/documents/${encodeURIComponent(
        userId
      )}`;

      // Note: The filter logic is slightly different now.
      // We fetch ALL documents first to get the data types, then let the user filter via the dropdown.
      // If you want to filter directly via API, the dropdown should trigger a *new* fetch.
      // Let's stick to fetching all first for simplicity based on the current UI.

      // if (selectedDataType) { // This would filter via API if uncommented
      //   url += `?dataType=${encodeURIComponent(selectedDataType)}`;
      // }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar documentos.`);
      }

      const data = await response.json();

      // Assuming API returns { success: boolean, documents: [...] }
      if (!data.success || !data.documents || data.documents.length === 0) {
        addAssistantMessage(
          "Nenhum documento encontrado",
          `Não encontramos documentos para o usuário ${userName || userId}.`
        );
        setDocuments([]);
        setDataTypes([]);
        return; // Exit early
      }

      // Extract data types for filtering dropdown
      const dataTypesSet = new Set();
      data.documents.forEach((doc) => {
        if (doc.data_type) {
          dataTypesSet.add(doc.data_type);
        }
      });
      setDataTypes(Array.from(dataTypesSet));
      setDocuments(data.documents); // Store all fetched documents

      addAssistantMessage(
        `Encontrei ${data.documents.length} documento(s).`,
        "Você pode visualizar os documentos abaixo e filtrar por tipo de dados usando o filtro ao lado."
      );
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
      addAssistantMessage("Erro ao buscar documentos.", error.message);
      setDocuments([]);
      setDataTypes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle images feature activation (triggered by card click)
  const handleImagesFeature = () => {
    if (!userId) {
      addAssistantMessage(
        "Para acessar imagens, precisamos do seu ID de usuário.",
        "Por favor, informe o ID no filtro ao lado e clique em 'Carregar'."
      );
      return;
    }

    if (!examTypes.length) {
      addAssistantMessage(
        "Não há tipos de exame carregados para este usuário.",
        "Carregue as informações do usuário primeiro."
      );
      return;
    }

    setIsImageViewerVisible(true); // Show the section for controls/images
    setDocuments([]); // Hide documents if switching to images
    setDataTypes([]); // Clear doc types
    setSelectedDataType("");

    addAssistantMessage(
      "Visualizador de imagens ativado.",
      "Selecione um tipo de exame e uma data nos filtros para buscar as imagens."
    );
  };

  // Handle AI feature card click (Example)
  const handleAIFeature = () => {
    setIsConversationStarted(true); // Make sure chat view is active
    addAssistantMessage(
      "Olá! Sou sua assistente virtual.",
      "Como posso te ajudar com informações médicas hoje? Você pode me fazer perguntas gerais ou pedir para buscar documentos e imagens usando os filtros e botões."
    );
    // Hide specific viewers if AI is chosen explicitly
    setIsImageViewerVisible(false);
    setDocuments([]);
  };

  // Filter and load images based on selections (Triggered by "Buscar Imagens" button)
  const filterAndLoadImages = async () => {
    if (!selectedExamType || !selectedDate) {
      addAssistantMessage(
        "Seleção incompleta.",
        "Por favor, selecione um tipo de exame e uma data nos filtros."
      );
      return; // Don't use alert
    }
    if (!userId) {
      addAssistantMessage(
        "ID do usuário não encontrado.",
        "Por favor, carregue as informações do usuário primeiro."
      );
      return;
    }

    setIsLoading(true);
    setFilteredImages([]); // Clear previous images
    setCurrentPage(0); // Reset pagination

    addAssistantMessage(
      "Buscando imagens...",
      `Tipo: ${selectedExamType}, Data: ${selectedDate}`
    );

    try {
      const response = await fetch(
        `https://api.imeddata-4.com.br/get-filtered-images?userId=${userId}&exam_type=${encodeURIComponent(
          selectedExamType
        )}&date=${selectedDate}`
      );

      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar imagens`);
      }

      const imagesData = await response.json();

      // Assuming imagesData is an array of objects like { image: base64string, ... }
      if (!imagesData || imagesData.length === 0) {
        addAssistantMessage(
          "Nenhuma imagem encontrada.",
          `Não há imagens para ${selectedExamType} na data ${selectedDate}.`
        );
        setFilteredImages([]);
      } else {
        setFilteredImages(imagesData);
        addAssistantMessage(
          `${imagesData.length} imagem(ns) encontrada(s).`,
          "Confira as imagens abaixo. Clique em uma imagem para ampliar."
        );
        setIsImageViewerVisible(true); // Ensure viewer is visible
      }
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      addAssistantMessage("Erro ao buscar imagens.", error.message);
      setFilteredImages([]); // Clear images on error
    } finally {
      setIsLoading(false);
    }
  };

  // --- Dummy function for convert button ---
  const convertToHL7FHIR = (pdfBase64) => {
    addAssistantMessage(
      "Função de conversão ainda não implementada.",
      "Em breve será possível converter para HL7 FHIR."
    );
    console.log("Attempting to convert PDF (base64 length):", pdfBase64.length);
    // In a real scenario, you would make another API call here
    // POST request to a conversion endpoint with the pdfBase64 data
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
    setModalImage(imageSrc); // Assuming imageSrc is the base64 string
    setModalVisible(true);
  };

  // Close image modal
  const closeModal = () => {
    setModalVisible(false);
    setModalImage(""); // Clear image data
  };

  // Effect to scroll to bottom of chat on new messages
  useEffect(() => {
    if (chatContentRef.current) {
      // Add a small delay to allow rendering before scrolling
      setTimeout(() => {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
      }, 100);
    }
  }, [messages]); // Trigger scroll on new messages

  // Effect to load exam dates when exam type changes
  useEffect(() => {
    // Only load dates if a user is loaded and an exam type is selected
    if (selectedExamType && userId) {
      loadExamDates();
    } else {
      // Clear dates if exam type is deselected or user is cleared
      setExamDates([]);
      setSelectedDate("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExamType, userId]); // Rerun when selectedExamType or userId changes

  // Effect to filter documents when selectedDataType changes
  // This filters the *already loaded* documents in the frontend
  const displayedDocuments = selectedDataType
    ? documents.filter((doc) => doc.data_type === selectedDataType)
    : documents;

  return (
    <div className="chat-page">
      {/* --- Filtros Sidebar remains largely the same --- */}
      <div className="filtros-sidebar">
        <h2 className="filtros-title">Filtros</h2>

        {/* User ID Input */}
        <div className="filter-section">
          <label className="filtros-label">Código do usuário</label>
          <div className="input-with-button">
            <input
              type="text"
              className="filtros-input"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                // Reset dependent states if ID changes manually
                setUserName("");
                setUserInfoVisible(false);
                setExamTypes([]);
                setExamDates([]);
                setSelectedExamType("");
                setSelectedDate("");
                setDocuments([]);
                setDataTypes([]);
                setSelectedDataType("");
                setFilteredImages([]);
                setIsImageViewerVisible(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") loadUser();
              }} // Allow Enter key to load
            />
            <button
              className="filter-action-button"
              onClick={loadUser}
              disabled={!userId || isLoading} // Disable while loading
            >
              {isLoading && userName === "" ? "Carregando..." : "Carregar"}
            </button>
          </div>
        </div>

        {/* User Info Display */}
        {userInfoVisible && userName && (
          <div className="user-info-section">
            <p className="user-info-name">Usuário: {userName}</p>
          </div>
        )}

        {/* Document Data Type Filter */}
        {documents.length > 0 && dataTypes.length > 0 && (
          <div className="filter-section">
            <label className="filtros-label">Filtrar Documento por Tipo</label>
            <select
              className="filtros-select"
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
            >
              <option value="">Todos os Tipos</option>
              {dataTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Exam Type Filter */}
        {examTypes.length > 0 && (
          <div className="filter-section">
            <label className="filtros-label">Tipo de Exame</label>
            <select
              className="filtros-select"
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              disabled={isLoading} // Disable while loading user/dates
            >
              <option value="">Selecione o Tipo</option>
              {examTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Exam Date Filter */}
        {examDates.length > 0 && (
          <div className="filter-section">
            <label className="filtros-label">Data do Exame</label>
            <select
              className="filtros-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={!selectedExamType || isLoading} // Disable if no type selected or loading
            >
              <option value="">Selecione a Data</option>
              {examDates.map((date, index) => (
                <option key={index} value={date}>
                  {date} {/* Format date if needed */}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Button to trigger image search */}
        {selectedExamType && selectedDate && (
          <button
            className="filter-action-button"
            onClick={filterAndLoadImages}
            disabled={isLoading} // Disable while loading images
          >
            {isLoading && filteredImages.length === 0
              ? "Buscando..."
              : "Buscar Imagens"}
          </button>
        )}
      </div>
      {/* --- End Filtros Sidebar --- */}

      <div className="chat-container">
        {/* --- Chat Header remains the same --- */}
        <div className="chat-header">
          <div className="header-left">
            <div className="logo-small">
              <img src={logoIcon} alt="Logo" />
            </div>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <img
                src="https://via.placeholder.com/36" // Placeholder, replace if needed
                alt="User Avatar"
                className="user-avatar"
              />
              <span>Bruna Gonçalves</span>{" "}
              {/* Replace with dynamic user if necessary */}
            </div>
          </div>
        </div>
        {/* --- End Chat Header --- */}

        <div className="chat-content" ref={chatContentRef}>
          {!isConversationStarted ? (
            <>
              {/* --- Welcome Screen --- */}
              <div className="welcome-container">
                <div className="welcome-logo">
                  <img src={logoIcon} alt="Logo" />
                </div>
                <h1 className="welcome-title">Como posso te ajudar hoje?</h1>
                <p className="welcome-text">
                  Use os filtros para carregar dados de um usuário ou clique nas
                  opções abaixo. 😊
                </p>
              </div>
              {/* --- Feature Cards --- */}
              <div className="feature-cards">
                <div
                  className="feature-card"
                  onClick={handleDocumentsFeature} // Use specific handler
                >
                  <div className="feature-icon docs">
                    <DocumentIcon />
                  </div>
                  <h3 className="feature-title">Documentos</h3>
                  <p className="feature-description">
                    Buscar e visualizar documentos do usuário carregado
                  </p>
                </div>
                <div
                  className="feature-card"
                  onClick={handleAIFeature} // Use specific handler
                >
                  <div className="feature-icon ai">
                    <AIIcon />
                  </div>
                  <h3 className="feature-title">Assistente AI</h3>
                  <p className="feature-description">
                    Converse com a assistente virtual para tirar dúvidas
                  </p>
                </div>
                <div
                  className="feature-card"
                  onClick={handleImagesFeature} // Use specific handler
                >
                  <div className="feature-icon images">
                    <ImageIcon />
                  </div>
                  <h3 className="feature-title">Imagens</h3>
                  <p className="feature-description">
                    Ativar visualizador de imagens de exames
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* --- Render Chat Messages --- */}
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
                    {/* Use different tags or styles if needed, but keep it simple */}
                    <p className="message-main-text">{msg.content}</p>
                    {msg.subtext && (
                      <p className="message-sub-text">{msg.subtext}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* --- Loading Indicator (Inside Chat) --- */}
              {isLoading && (
                <div className="message assistant-message">
                  <div className="avatar-container">
                    <img src={logoIcon} alt="Avatar" className="avatar" />
                  </div>
                  <div className="message-content loading-indicator">
                    <div className="loader"></div>
                    {/* Optional: Add text like "Pensando..." or "Buscando..." */}
                  </div>
                </div>
              )}

              {/* --- Render Documents (if any and not viewing images) --- */}
              {displayedDocuments.length > 0 && !isImageViewerVisible && (
                <div className="documents-container assistant-message">
                  <div className="avatar-container">
                    <img src={logoIcon} alt="Avatar" className="avatar" />
                  </div>
                  <div className="message-content">
                    <p className="message-main-text">Documentos encontrados:</p>
                    <div className="documents-grid">
                      {displayedDocuments.map((doc, index) => (
                        <div key={index} className="document-card">
                          <p className="document-info">
                            Tipo: {doc.data_type || "N/A"} <br />
                            {/* Hash: {doc.document_hash} */}
                          </p>
                          {doc.pdf_content ? (
                            <>
                              <iframe
                                // Use a placeholder or a thumbnail generator if performance is an issue
                                // Direct rendering of many PDFs can be slow.
                                // For now, keeping the iframe but maybe with restricted height initially.
                                src={`data:application/pdf;base64,${doc.pdf_content}`}
                                className="document-preview" // Style for preview size
                                title={`Preview ${doc.document_hash}`}
                                loading="lazy" // Defer loading off-screen previews
                              />
                              <button
                                className="convert-button" // Keep styling consistent
                                onClick={() =>
                                  convertToHL7FHIR(doc.pdf_content)
                                }
                                title="Converter para HL7 FHIR (Não implementado)"
                              >
                                Converter
                              </button>
                            </>
                          ) : (
                            <p>Conteúdo do PDF indisponível.</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- Render Image Viewer (if active and images available) --- */}
              {isImageViewerVisible && filteredImages.length > 0 && (
                <div className="image-viewer-container assistant-message">
                  <div className="avatar-container">
                    <img src={logoIcon} alt="Avatar" className="avatar" />
                  </div>
                  <div className="message-content">
                    <p className="message-main-text">Imagens encontradas:</p>
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
                              src={`data:image/jpeg;base64,${image.image}`} // Assuming JPEG, adjust if needed
                              alt={`Imagem ${
                                index + 1 + currentPage * imagesPerPage
                              } de ${selectedExamType || "exame"} em ${
                                selectedDate || "data"
                              }`}
                              className="carousel-image"
                              onClick={() => openModal(image.image)} // Pass base64 string
                              loading="lazy" // Defer loading off-screen images
                            />
                          ))}
                      </div>
                      {/* Pagination */}
                      {filteredImages.length > imagesPerPage && (
                        <div className="pagination-controls">
                          <button
                            onClick={previousPage}
                            disabled={currentPage === 0}
                          >
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
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* --- Chat Input Area --- */}
        <div className="chat-input-container">
          <form onSubmit={handleSendMessage}>
            <div className="input-wrapper">
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Digite sua mensagem ou use os filtros..." // Updated placeholder
                className="chat-input"
                maxLength={1000}
                disabled={isLoading} // Optionally disable input while loading
              />
              <div className="input-actions">
                <span className="char-count">{charCount}/1000</span>
                <button
                  type="submit"
                  className="send-button"
                  disabled={message.trim() === "" || isLoading} // Disable if empty or loading
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* --- End Chat Input Area --- */}
      </div>

      {/* --- Image Modal --- */}
      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          {" "}
          {/* Close on backdrop click */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {" "}
            {/* Prevent closing when clicking image */}
            <span className="close-button" onClick={closeModal}>
              ×
            </span>
            <img
              src={`data:image/jpeg;base64,${modalImage}`} // Assuming JPEG
              alt="Imagem ampliada"
              className="modal-image"
            />
          </div>
        </div>
      )}
      {/* --- End Image Modal --- */}
    </div>
  );
}

export default ChatPage;
