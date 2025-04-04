import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
import logoIcon from "./assets/imeddata-logo.svg"; // Ensure this path is correct
import SendIcon from "./SendIcon"; // Ensure this component exists and path is correct

// --- Icon Components (Keep as they are functional) ---
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
  const [filteredImages, setFilteredImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const imagesPerPage = 20; // Configurable number of images per page

  // --- Helper function to add assistant messages to the chat ---
  const addAssistantMessage = (content, subtext = "") => {
    // Ensure conversation starts when the assistant speaks
    if (!isConversationStarted) {
      setIsConversationStarted(true);
    }
    // Use a functional update to ensure we have the latest state
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now() + Math.random(), // Add random number for potentially faster updates
        sender: "assistant",
        content: content,
        subtext: subtext,
      },
    ]);
  };

  // --- API Endpoint Base URL (Optional but good practice) ---
  const API_BASE_URL = "https://api.imeddata-4.com.br";

  // Handle user input change in the chat input field
  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
  };

  // Handle sending a message from the user input
  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (message.trim() === "") return; // Don't send empty messages

    const newMessage = {
      id: Date.now(),
      sender: "user",
      content: message,
    };

    // Add user message to the chat
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage(""); // Clear input field
    setCharCount(0);
    setIsConversationStarted(true); // Mark conversation as started

    // --- IMPORTANT: Placeholder for AI Interaction ---
    // This simulates a response. Replace this with your actual API call
    // to an AI service, passing `newMessage.content`.
    // The response from that AI service should then be added using `addAssistantMessage`.
    setTimeout(() => {
      addAssistantMessage(
        "Resposta simulada:", // Replace with actual AI response
        `Recebi sua mensagem: "${newMessage.content}". A integração real com a IA ainda será implementada.`
      );
    }, 500);
    // --- End Placeholder ---
  };

  // Load user name and associated exam types
  const loadUser = async () => {
    if (!userId) {
      addAssistantMessage(
        "Por favor, insira um ID de usuário no filtro ao lado."
      );
      return;
    }

    setIsLoading(true);
    setUserInfoVisible(false); // Hide previous info
    // Clear dependent data
    setUserName("");
    setExamTypes([]);
    setExamDates([]);
    setSelectedExamType("");
    setSelectedDate("");
    setDocuments([]);
    setDataTypes([]);
    setSelectedDataType("");
    setFilteredImages([]);
    setIsImageViewerVisible(false);

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
        setUserInfoVisible(true);
        addAssistantMessage(
          `Usuário '${userData.userName}' carregado com sucesso.`
        );
        // Now fetch exam types for this user
        await loadExamTypes(userId); // Pass userId explicitly
      } else {
        addAssistantMessage("Usuário encontrado, mas sem nome associado.");
        // Optionally still load exam types if needed even without a name
        await loadExamTypes(userId);
      }
    } catch (error) {
      console.error("Erro detalhado ao carregar usuário:", error);
      addAssistantMessage(
        "Erro ao carregar informações do usuário.",
        error.message || "Verifique a conexão ou o ID informado."
      );
      // Clear potentially invalid ID and related info
      setUserId("");
      setUserName("");
      setUserInfoVisible(false);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  // Load available exam types for the current user
  const loadExamTypes = async (currentUserId) => {
    // This function is now primarily called by loadUser,
    // so the loading indicator is handled there.
    // We add messages specific to the exam type loading process.
    try {
      const examTypesResponse = await fetch(
        `${API_BASE_URL}/get-exam-types?userId=${currentUserId}`
      );
      if (!examTypesResponse.ok) {
        throw new Error(
          `Erro ${examTypesResponse.status} ao buscar tipos de exames.`
        );
      }
      const examTypesData = await examTypesResponse.json();

      setExamTypes(examTypesData || []); // Ensure it's an array

      if (examTypesData && examTypesData.length > 0) {
        addAssistantMessage(
          "Tipos de exame disponíveis carregados.",
          "Selecione um tipo no filtro."
        );
      } else {
        addAssistantMessage(
          "Nenhum tipo de exame encontrado para este usuário."
        );
      }
    } catch (error) {
      console.error("Erro ao carregar tipos de exames:", error);
      addAssistantMessage("Erro ao carregar tipos de exames.", error.message);
      setExamTypes([]); // Clear types on error
    }
    // Reset downstream selections
    setExamDates([]);
    setSelectedExamType("");
    setSelectedDate("");
    setFilteredImages([]);
    setIsImageViewerVisible(false);
  };

  // Load exam dates based on the selected exam type
  const loadExamDates = async () => {
    // This is triggered by useEffect when selectedExamType changes,
    // ensure userId and selectedExamType are present.
    if (!selectedExamType || !userId) {
      // Clear existing dates if selection is invalid
      setExamDates([]);
      setSelectedDate("");
      return;
    }

    setIsLoading(true); // Indicate loading for this specific action
    addAssistantMessage(`Buscando datas para o exame: ${selectedExamType}`);
    setExamDates([]); // Clear previous dates
    setSelectedDate(""); // Reset date selection
    setFilteredImages([]); // Reset images
    setIsImageViewerVisible(false); // Hide viewer

    try {
      const response = await fetch(
        `${API_BASE_URL}/get-exam-dates?userId=${userId}&exam_type=${selectedExamType}`
      );
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar datas de exames.`);
      }
      const examDatesData = await response.json();
      // Ensure data is an array and get distinct dates
      const distinctDates = [
        ...new Set(Array.isArray(examDatesData) ? examDatesData : []),
      ];
      setExamDates(distinctDates);

      if (distinctDates.length > 0) {
        addAssistantMessage(
          `Datas disponíveis para '${selectedExamType}' carregadas.`,
          "Selecione uma data no filtro."
        );
      } else {
        addAssistantMessage(
          `Nenhuma data encontrada para o tipo de exame '${selectedExamType}'.`
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

  // Handle activating the Documents feature (e.g., via card click)
  const handleDocumentsFeature = async () => {
    if (!userId) {
      addAssistantMessage(
        "Para acessar documentos, carregue um usuário primeiro.",
        "Informe o ID no filtro e clique em 'Carregar'."
      );
      return;
    }

    setIsLoading(true);
    // Clear other potentially active views/data
    setIsImageViewerVisible(false);
    setFilteredImages([]);
    setDocuments([]); // Clear previous documents before fetching
    setDataTypes([]);
    setSelectedDataType("");

    addAssistantMessage(
      "Buscando documentos...",
      `Usuário: ${userName || userId}`
    );

    try {
      const url = `${API_BASE_URL}/documents/${encodeURIComponent(userId)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar documentos.`);
      }
      const data = await response.json();

      // Check the structure of the response (adjust based on your actual API)
      if (
        data.success === false ||
        !data.documents ||
        data.documents.length === 0
      ) {
        addAssistantMessage(
          "Nenhum documento encontrado",
          `Não há documentos para ${userName || userId}.`
        );
        setDocuments([]);
        setDataTypes([]);
      } else {
        const fetchedDocs = data.documents;
        setDocuments(fetchedDocs);

        // Extract unique data types for the filter dropdown
        const types = [
          ...new Set(fetchedDocs.map((doc) => doc.data_type).filter(Boolean)),
        ];
        setDataTypes(types);

        addAssistantMessage(
          `Encontrei ${fetchedDocs.length} documento(s).`,
          types.length > 0
            ? "Documentos exibidos abaixo. Use o filtro para refinar por tipo."
            : "Documentos exibidos abaixo."
        );
      }
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
      addAssistantMessage("Erro ao buscar documentos.", error.message);
      setDocuments([]);
      setDataTypes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle activating the Images feature (e.g., via card click)
  const handleImagesFeature = () => {
    if (!userId) {
      addAssistantMessage(
        "Para acessar imagens, carregue um usuário primeiro.",
        "Informe o ID no filtro e clique em 'Carregar'."
      );
      return;
    }

    if (examTypes.length === 0) {
      addAssistantMessage(
        "Tipos de exame não carregados.",
        "Verifique se o usuário possui exames disponíveis."
      );
      // Optionally trigger loadUser again or just inform
      return;
    }

    // Clear document view if switching to images
    setDocuments([]);
    setDataTypes([]);
    setSelectedDataType("");

    setIsImageViewerVisible(true); // Show the section for image filters/display
    addAssistantMessage(
      "Visualizador de imagens ativado.",
      "Selecione tipo e data do exame nos filtros e clique em 'Buscar Imagens'."
    );
  };

  // Handle activating the AI feature card (placeholder/welcome)
  const handleAIFeature = () => {
    setIsConversationStarted(true); // Ensure chat view is active
    addAssistantMessage(
      "Olá! Sou sua assistente virtual.",
      "Use os filtros e botões para buscar dados ou digite sua pergunta."
    );
    // Hide specific viewers if AI is chosen explicitly
    setIsImageViewerVisible(false);
    setDocuments([]);
    setDataTypes([]);
    setSelectedDataType("");
  };

  // Fetch and filter images based on selected type and date
  const filterAndLoadImages = async () => {
    if (!selectedExamType || !selectedDate) {
      addAssistantMessage(
        "Seleção incompleta.",
        "Escolha o tipo de exame e a data."
      );
      return;
    }
    if (!userId) {
      addAssistantMessage(
        "ID do usuário não definido.",
        "Carregue um usuário primeiro."
      );
      return;
    }

    setIsLoading(true);
    setFilteredImages([]); // Clear previous images
    setCurrentPage(0); // Reset pagination
    setIsImageViewerVisible(true); // Ensure viewer stays visible

    addAssistantMessage(
      "Buscando imagens...",
      `Tipo: ${selectedExamType}, Data: ${selectedDate}`
    );

    try {
      const url = `${API_BASE_URL}/get-filtered-images?userId=${userId}&exam_type=${encodeURIComponent(
        selectedExamType
      )}&date=${selectedDate}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao buscar imagens.`);
      }
      const imagesData = await response.json();

      if (!imagesData || imagesData.length === 0) {
        addAssistantMessage(
          "Nenhuma imagem encontrada.",
          `Não há imagens para ${selectedExamType} em ${selectedDate}.`
        );
        setFilteredImages([]);
      } else {
        setFilteredImages(imagesData); // Assuming imagesData is the array
        addAssistantMessage(
          `${imagesData.length} imagem(ns) encontrada(s).`,
          "Imagens exibidas abaixo. Clique para ampliar."
        );
      }
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
      addAssistantMessage("Erro ao buscar imagens.", error.message);
      setFilteredImages([]); // Clear images on error
    } finally {
      setIsLoading(false);
    }
  };

  // --- Dummy function for PDF conversion button ---
  const convertToHL7FHIR = (pdfBase64) => {
    addAssistantMessage(
      "Funcionalidade Indisponível",
      "A conversão de PDF para HL7 FHIR ainda não foi implementada."
    );
    // console.log("Placeholder: Convert PDF to HL7 FHIR. Base64 length:", pdfBase64.length);
    // Future implementation: Make API call here
  };

  // --- Pagination Handlers ---
  const nextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredImages.length / imagesPerPage) - 1)
    );
  };
  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  // --- Modal Handlers ---
  const openModal = (imageBase64) => {
    setModalImage(imageBase64);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalImage(""); // Clear image data from state
  };

  // --- Effects ---

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContentRef.current) {
      // Delay slightly to allow DOM update before scrolling
      const timer = setTimeout(() => {
        if (chatContentRef.current) {
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        }
      }, 100);
      return () => clearTimeout(timer); // Cleanup timer on unmount or change
    }
  }, [messages]); // Dependency: Run when messages array changes

  // Load exam dates automatically when the selected exam type changes (and user is loaded)
  useEffect(() => {
    if (selectedExamType && userId) {
      loadExamDates();
    }
    // No explicit 'else' needed to clear dates, handled within loadExamDates check
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExamType, userId]); // Dependencies: Run when type or user changes

  // --- Derived State ---
  // Filter documents based on selected data type (client-side filtering)
  const displayedDocuments = selectedDataType
    ? documents.filter((doc) => doc.data_type === selectedDataType)
    : documents;

  // Calculate images to display for the current page
  const displayedImages = filteredImages.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  // --- JSX Return ---
  return (
    <div className="chat-page">
      {/* --- Filters Sidebar --- */}
      <div className="filtros-sidebar">
        <h2 className="filtros-title">Filtros</h2>

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
              aria-live="polite" // Announce changes for screen readers
            >
              {isLoading && !userName ? "Carregando..." : "Carregar"}
            </button>
          </div>
        </div>

        {/* User Info Display */}
        {userInfoVisible && userName && (
          <div className="user-info-section">
            <p className="user-info-name">Usuário: {userName}</p>
          </div>
        )}

        {/* Document Type Filter (Only shows if documents are loaded) */}
        {documents.length > 0 && dataTypes.length > 0 && (
          <div className="filter-section">
            <label htmlFor="docTypeFilter" className="filtros-label">
              Filtrar Documento
            </label>
            <select
              id="docTypeFilter"
              className="filtros-select"
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
            >
              <option value="">Todos os Tipos</option>
              {dataTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Exam Type Filter (Only shows if types are loaded) */}
        {examTypes.length > 0 && (
          <div className="filter-section">
            <label htmlFor="examTypeFilter" className="filtros-label">
              Tipo de Exame
            </label>
            <select
              id="examTypeFilter"
              className="filtros-select"
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Selecione o Tipo</option>
              {examTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Exam Date Filter (Only shows if dates are loaded) */}
        {examDates.length > 0 && (
          <div className="filter-section">
            <label htmlFor="examDateFilter" className="filtros-label">
              Data do Exame
            </label>
            <select
              id="examDateFilter"
              className="filtros-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              disabled={!selectedExamType || isLoading}
            >
              <option value="">Selecione a Data</option>
              {examDates.map((date) => (
                <option key={date} value={date}>
                  {date} {/* TODO: Consider formatting date */}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Button to trigger image search (Shows only if type and date selected) */}
        {selectedExamType && selectedDate && (
          <button
            className="filter-action-button"
            onClick={filterAndLoadImages}
            disabled={isLoading}
            aria-live="polite"
          >
            {isLoading && filteredImages.length === 0
              ? "Buscando..."
              : "Buscar Imagens"}
          </button>
        )}
      </div>
      {/* --- End Filtros Sidebar --- */}

      {/* --- Chat Area --- */}
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
                src="https://via.placeholder.com/36/ff6b35/ffffff?text=BG" // Placeholder Avatar
                alt="Avatar do usuário"
                className="user-avatar"
              />
              <span>Bruna Gonçalves</span> {/* TODO: Make dynamic? */}
            </div>
          </div>
        </div>
        {/* End Chat Header */}

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
                  Carregue um usuário pelo ID ou clique nas opções.
                </p>
              </div>
              {/* Feature Cards */}
              <div className="feature-cards">
                <div
                  className="feature-card"
                  onClick={handleDocumentsFeature}
                  role="button"
                  tabIndex={0}
                >
                  <div className="feature-icon docs">
                    <DocumentIcon />
                  </div>
                  <h3 className="feature-title">Documentos</h3>
                  <p className="feature-description">Buscar documentos</p>
                </div>
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
                <div
                  className="feature-card"
                  onClick={handleImagesFeature}
                  role="button"
                  tabIndex={0}
                >
                  <div className="feature-icon images">
                    <ImageIcon />
                  </div>
                  <h3 className="feature-title">Imagens</h3>
                  <p className="feature-description">Ver imagens de exames</p>
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

              {/* Render Documents (If available and not viewing images) */}
              {displayedDocuments.length > 0 && !isImageViewerVisible && (
                <div className="documents-container assistant-message">
                  <div className="avatar-container">
                    <img
                      src={logoIcon}
                      alt="Assistente Avatar"
                      className="avatar"
                    />
                  </div>
                  <div className="message-content">
                    {/* <p className="message-main-text">Documentos:</p> */}
                    <div className="documents-grid">
                      {displayedDocuments.map((doc, index) => (
                        <div
                          key={doc.document_hash || index}
                          className="document-card"
                        >
                          <p className="document-info">
                            Tipo: {doc.data_type || "N/A"}
                          </p>
                          {doc.pdf_content ? (
                            <>
                              {/* Consider showing a PDF icon/link instead of iframe for performance */}
                              <iframe
                                src={`data:application/pdf;base64,${doc.pdf_content}`}
                                className="document-preview"
                                title={`Preview Doc ${index + 1}`}
                                loading="lazy"
                                aria-label={`Preview do documento ${index + 1}`}
                              />
                              <button
                                className="convert-button"
                                onClick={() =>
                                  convertToHL7FHIR(doc.pdf_content)
                                }
                                title="Converter para HL7 FHIR (Não implementado)"
                              >
                                Converter
                              </button>
                            </>
                          ) : (
                            <p>Preview indisponível.</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Render Image Viewer (If active and images available) */}
              {isImageViewerVisible && displayedImages.length > 0 && (
                <div className="image-viewer-container assistant-message">
                  <div className="avatar-container">
                    <img
                      src={logoIcon}
                      alt="Assistente Avatar"
                      className="avatar"
                    />
                  </div>
                  <div className="message-content">
                    {/* <p className="message-main-text">Imagens:</p> */}
                    <div className="image-viewer">
                      <div className="carousel">
                        {displayedImages.map((imageInfo, index) => (
                          <img
                            key={imageInfo.image_hash || index} // Use a unique key if available
                            src={`data:image/jpeg;base64,${imageInfo.image}`} // Assume JPEG, adjust if needed
                            alt={`Imagem ${
                              index + 1 + currentPage * imagesPerPage
                            } de ${selectedExamType} em ${selectedDate}`}
                            className="carousel-image"
                            onClick={() => openModal(imageInfo.image)}
                            loading="lazy"
                          />
                        ))}
                      </div>
                      {/* Pagination Controls */}
                      {filteredImages.length > imagesPerPage && (
                        <div className="pagination-controls">
                          <button
                            onClick={previousPage}
                            disabled={currentPage === 0}
                          >
                            Anterior
                          </button>
                          <span>
                            Página {currentPage + 1} /{" "}
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
        {/* End Chat Content Area */}

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
        {/* End Chat Input Area */}
      </div>
      {/* --- End Chat Area --- */}

      {/* --- Image Modal --- */}
      {modalVisible && (
        // Use role="dialog" and aria-modal="true" for accessibility
        <div
          className="modal"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 id="modalTitle" className="visually-hidden">
              Imagem Ampliada
            </h2>{" "}
            {/* Hidden title for screen readers */}
            <button
              className="close-button"
              onClick={closeModal}
              aria-label="Fechar modal"
            >
              ×
            </button>
            <img
              src={`data:image/jpeg;base64,${modalImage}`} // Assume JPEG
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
