import React from "react";

const Message = ({ text, isBot, timestamp }) => (
  <div className={`message ${isBot ? "bot" : "user"}`}>
    <div className="message-content">
      <div className="message-text">{text}</div>
      <div className="message-time">{timestamp}</div>
    </div>
  </div>
);

export default Message;
