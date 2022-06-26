const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");

const messageInput = document.getElementById("messageinput");

const messageContainer = document.querySelector(".message-box");

const audio = new Audio("ting.mp3");

const append = (message, pos) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(pos);
  messageContainer.append(messageElement);

  if (pos == "left") {
    audio.play();
  }
};

form.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

const name = prompt("Enter your name to join");

socket.emit("new-user-joined", name);
socket.on("user-joined", name => {
  append(`${name} joined the chat`, "left");
});

socket.on("recieve", data => {
  append(`${data.name}:${data.message}`, "left");
});

socket.on("leave", data => {
  append(`${data} left the chat`, "left");
});
