const express = require("express");
const aiReply = require("./ai");
const checkLicense = require("./license");

const app = express();
app.use(express.json());

app.post("/chat", async (req,res) => {
  const { question, license } = req.body;

  if(!checkLicense(license)) {
    return res.status(403).json({ error: "Nincs érvényes előfizetés" });
  }

  try {
    const answer = await aiReply(question);
    res.json({ answer });
  } catch (e) {
    res.status(500).json({ error: "AI hiba" });
  }
});

app.listen(8080, () => console.log("AI Chatbot fut"));