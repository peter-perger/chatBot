@keyframes dotPulse {
  0%, 44% {
    transform: translateY(0);
  } 

  28% {
    opacity: 0.4;
    transform: translateY(-4px);
  } 

  44% {
    opacity: 0.2;
  } 
}

* {
  margin: 0;
  padding: 0;

  box-sizing: border-box;

  font-family: 'Roboto';
}

body {
  min-height: 100vh;
  background: linear-gradient(45deg, #9d9191, #468a82);
  
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-popup {
  width: 420px;
  
  background-color: white;
  box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1), 0 32px 64px -48px rgba(0, 0, 0, 0.5);
  
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}
/*HEADER*/
.chat-header {
  padding: 15px 22px;
  
  background: linear-gradient(45deg, #468a82, #9d9191);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-info .robot-logo {
  height: 50px;
  padding: 6px;
  
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 28px 0 rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.5);
  
  flex-shrink: 0;
}

.header-info .logo-text {
  color: rgb(16, 21, 22);
}

.chat-header .header-arrow {
  height: 30px;
  width: 30px;
  
  background: #b5bdbc;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  
  border: none;
  border-radius: 50%;
  
  font-size: 1.9rem;
  
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: ease-in-out, 0.5s;
}

.chat-header .header-arrow:hover {
  background: #daeaea;
}

/*BODY*/
.chat-body {
  padding: 25px 20px;
  margin-bottom: 82px;
  height: 460px;

  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: thin;
  scrollbar-color: rgb(79, 79, 79) transparent;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chat-body .bot-message .robot-head {
  height: 50px;
  padding: 6px;
  margin-bottom: 5px;

  background: linear-gradient(rgb(152, 161, 152), rgb(145, 205, 201));
  box-shadow: 0 0 28px 0 rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.5);
  
  border-radius: 50%;
  
  flex-shrink: 0;
}

.chat-body .bot-message {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.chat-body .bot-message .message-text {
  border-radius: 13px 13px 13px 3px;
}

.chat-body .user-message {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chat-body .user-message .message-text {
  border-radius: 13px 13px 3px 13px;
}

.chat-body .user-message .attachment {
  width: 60%;
  margin-top: 8px;
  border-radius: 10px 10px 3px 10px;
}

.chat-body .message .message-text {
  max-width: 75%;
  padding: 12px 11px;
  
  background-color: rgb(110, 109, 109);
  color: rgb(255, 255, 255);
}

.chat-body .bot-message .thinking-indicator {
  display: flex;
  gap: 4px;
  padding-block: 5px;
}

.chat-body .bot-message .thinking-indicator .dot{
  height: 7px;
  width: 7px;
  
  border-radius: 50%;
  opacity: 0.9;
  background-color: rgb(255, 255, 255);
  
  animation: dotPulse 1.8s ease-in-out infinite;
}

.chat-body .bot-message .thinking-indicator .dot:nth-child(1) {
  animation-delay: 0.2s;
}

.chat-body .bot-message .thinking-indicator .dot:nth-child(2) {
  animation-delay: 0.5s;
}

.chat-body .bot-message .thinking-indicator .dot:nth-child(3) {
  animation-delay: 0.6s;
}

/*FOOTER*/
.chat-footer{
  width: 100%;
  padding: 15px 22px 20px;
  
  background: #fff;

  position: absolute;
  bottom: 0;
}

.chat-footer .chat-form {
  background: #fff;
  
  border-radius: 32px;
  outline: 1px solid #CCCCE5;
  
  display: flex;
  align-items: center;
}

.chat-footer .chat-form:focus-within {
  outline: 2px solid rgb(131, 131, 131);
}

.chat-form .message-input {
  height: 47px;
  width: 100%;
  padding: 14px 0px 13px 20px;
  font-size: 0.95rem;
  
  border: none;
  border-radius: inherit;
  
  outline: none;
  resize: none;
}

.chat-form .chat-controls {
  padding-right: 6px;
  height: 47px;
  
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 6px;
}

.chat-form .chat-controls button {
  padding: 3px;
  
  border: none;
  border-radius: 50%;
  
  background: white;
  
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: 0.4s ease;
}

.chat-form .chat-controls button:hover {
  background: rgb(120, 177, 150);
}

.chat-form .chat-controls #send-message {
  display: none;
  background-color: rgb(120, 177, 150);
}

.chat-form .message-input:valid~.chat-controls #send-message {
  display: block;
}

.chat-form .chat-controls #send-message:hover {
  background-color: rgb(64, 197, 137);
}

.chat-form .control-image {
  height: 25px;
}

