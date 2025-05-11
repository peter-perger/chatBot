const chatBody = document.querySelector('.js-chat-body');
const messageInput = document.querySelector('.js-message-input');
const sendMessageButton = document.querySelector('.js-send-message');

const userData =  {
  message: null
}

function createMessageElement(messageContent, classes) {
  const div = document.createElement("div");
  div.classList.add('message', classes);
  div.innerHTML = messageContent;

  return div;
}

function handleOutgoingMessage (e) {
  e.preventDefault();
  userData.message = messageInput.value.trim();

  const messageContent = `<div class="message-text"></div>`
    
  const messageElement = createMessageElement(messageContent, 'user-message');
  messageElement.querySelector('.message-text').textContent = userData.message;

  chatBody.appendChild(messageElement);
}

messageInput.addEventListener('keydown', (e) => {
  const userMessage = e.target.value.trim();

  if(e.key === 'Enter' && userMessage) {
    handleOutgoingMessage(e);
  }
})

sendMessageButton.addEventListener('click', (e) => handleOutgoingMessage(e));