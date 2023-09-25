const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const locationButton = document.getElementById('locationButton');
const chatBox = document.getElementById('chatBox');

const serverUrl = 'wss://echo-ws-service.herokuapp.com';
const webSocket = new WebSocket(serverUrl);

// Обработчик открытия соединения
webSocket.onopen = function(event) {
  console.log('Соединение установлено');
};

// Обработчик приема сообщения от сервера
webSocket.onmessage = function(event) {
  const message = event.data;
  addToChat(message);
};

// Обработчик закрытия соединения
webSocket.onclose = function(event) {
  console.log('Соединение закрыто');
};

// Функция добавления сообщения в чат
function addToChat(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
}

// Обработчик клика на кнопку отправки сообщения
sendButton.addEventListener('click', function() {
  const message = messageInput.value;
  webSocket.send(message);
  addToChat(message);
  messageInput.value = '';
});

// Обработчик клика на кнопку геолокации
locationButton.addEventListener('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const locationUrl = https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=14;
    webSocket.send ('locationUrl') ;
    addToChat('Моя геолокация: ${locationUrl}');
  });
});





