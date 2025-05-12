const chatBody = document.querySelector('.js-chat-body');
const messageInput = document.querySelector('.js-message-input');
const sendMessageButton = document.querySelector('.js-send-message');

//API setup
const API_key = "AIzaSyBk9GOPHZ6boo_fF6-vhUj4gop4stESTDQ"; 
const API_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_key}`;

const userData =  {
  message: null
}

async function generateBotResponse (incomingMessageElement) {
  const messageElement = incomingMessageElement.querySelector('.message-text')

  //API request options
  const requestOptions = {
    method: "POST",
    header: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      contents: [{
        parts: [{text: userData.message}]
      }]
    })
  }
  
  try {
    //Fetch bot response from API
    const response = await fetch(API_url, requestOptions);
    const data = await response.json();
    
    if (!response.ok)  {
      throw new Error(data.error.message)
    }

    //Extract and sisplay bot's response
    const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    messageElement.innerText = apiResponseText;
   
  }
  catch (error) {
    console.log(error);
  }
  finally {
    incomingMessageElement.classList.remove('thinking');
    chatBody.scrollTo({top: chatBody.scrollHeight, behavior: "smooth"});
  }
}

function createMessageElement(messageContent, ...classes) {
  const div = document.createElement("div");
  div.classList.add('message', ...classes);
  div.innerHTML = messageContent;

  return div;
}

function handleOutgoingMessage (e) {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = '';

  const messageContent = `<div class="message-text"></div>`
    
  const messageElement = createMessageElement(messageContent, 'user-message');
  messageElement.querySelector('.message-text').textContent = userData.message;

  chatBody.appendChild(messageElement);

  //Simulate bot thinking
  setTimeout (() => {
    const botMessageContent = `
      <img class="robot-head" src="images/robot-head.svg">
      <div class="message-text">
        <div class="thinking-indicator">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>`;
    
    const incomingMessageElement = createMessageElement(botMessageContent, 'bot-message', 'thinking');
    
    chatBody.appendChild(incomingMessageElement);
    
    generateBotResponse(incomingMessageElement);

  }, 500)
}

messageInput.addEventListener('keydown', (e) => {
  const userMessage = e.target.value.trim();

  if(e.key === 'Enter' && userMessage) {
    handleOutgoingMessage(e);
  }
})

sendMessageButton.addEventListener('click', (e) => handleOutgoingMessage(e));