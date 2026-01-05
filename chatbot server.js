import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

const DEMO_KEY = "DEMO-CHATBOT";
const activeLicenses = new Set();

// Chatbot válasz DEMO/PRO
app.post("/api/chat", (req, res) => {
  const { licenseKey, message } = req.body;
  if (licenseKey === DEMO_KEY) {
    return res.json({ reply: `DEMO: Rövid válasz a "${message}" kérdésre.` });
  }
  if (activeLicenses.has(licenseKey)) {
    return res.json({ reply: `PRO: AI válasz a "${message}" kérdésre (teljes funkcionalitás).` });
  }
  return res.status(403).json({ error: "Érvénytelen licenc" });
});

app.listen(8081, () => console.log("Chatbot szerver fut: http://localhost:8081"));