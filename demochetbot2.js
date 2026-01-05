// demo/widget.js
(function(){
  const chat = document.createElement("div");
  chat.innerHTML = `
    <h4>AI Chatbot DEMO</h4>
    <input id="q" placeholder="Kérdés..."/>
    <button onclick="alert('Ez csak DEMO')">Küldés</button>
  `;
  document.body.appendChild(chat);
})();