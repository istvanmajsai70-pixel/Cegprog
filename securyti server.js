import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

const DEMO_KEY = "DEMO-SECURITY";
const activeLicenses = new Set();

function encryptDemo(data) {
  return data.split("").reverse().join(""); // egyszerű demo titkosítás
}

function encryptPro(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

app.post("/api/encrypt", (req, res) => {
  const { licenseKey, data } = req.body;
  if (licenseKey === DEMO_KEY) {
    return res.json({ encrypted: encryptDemo(data) });
  }
  if (activeLicenses.has(licenseKey)) {
    return res.json({ encrypted: encryptPro(data) });
  }
  return res.status(403).json({ error: "Érvénytelen licenc" });
});

app.listen(8085, () => console.log("Security szerver fut: http://localhost:8085"));