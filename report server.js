import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

const DEMO_KEY = "DEMO-REPORT";
const activeLicenses = new Set();

app.post("/api/report", (req, res) => {
  const { licenseKey, data } = req.body;
  if (licenseKey === DEMO_KEY) {
    return res.json({ report: "DEMO jelentés (korlátozott adat, 1 riport)" });
  }
  if (activeLicenses.has(licenseKey)) {
    return res.json({ report: "PRO jelentés (teljes adat, több riport, PDF export lehetőség)" });
  }
  return res.status(403).json({ error: "Érvénytelen licenc" });
});

app.listen(8082, () => console.log("Report szerver fut: http://localhost:8082"));