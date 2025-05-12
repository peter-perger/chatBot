const chatBody = document.querySelector('.js-chat-body');
const messageInput = document.querySelector('.js-message-input');
const sendMessageButton = document.querySelector('.js-send-message');
const fileInput = document.querySelector('#file-input');
const fileUploadWrapper = document.querySelector('.file-upload-wrapper');

//API setup
const API_key = "AIzaSyBk9GOPHZ6boo_fF6-vhUj4gop4stESTDQ"; 
const API_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_key}`;

const userData =  {
  message: null,
  file: {
    data: null,
    mime_type: null
  }
}

async function generateBotResponse (incomingMessageElement) {
  const messageElement = incomingMessageElement.querySelector('.message-text')

  //API request options
  const requestOptions = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      contents: [{
        parts: [{text: userData.message}, 
        ...(userData.file.data ? [{ inline_data: userData.file}] : [])]
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
    messageElement.innerText = error.message;
    messageElement.style.color = "#ff0000";
  }
  finally {
    userData.file = {};
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
  fileUploadWrapper.classList.remove("file-uploaded");

  const messageContent = `
    <div class="message-text"></div>
      ${userData.file.data ? `
          <img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment"/>` : ""}
        `
    
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

//Handle file input change
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if(!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    fileUploadWrapper.querySelector('img').src = e.target.result;
    fileUploadWrapper.classList.add('file-uploaded');
    const base64String = e.target.result.split(",")[1];

    //Store file data in userdata
    userData.file = {
        data: base64String,
        mime_type: file.type
      }
  
    fileInput.value = "";
  }

  reader.readAsDataURL(file);
});

sendMessageButton.addEventListener('click', (e) => handleOutgoingMessage(e));

document.querySelector('#file-upload').addEventListener('click', () => {
  fileInput.click();
})