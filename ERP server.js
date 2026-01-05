import express from "express";

const app = express();
app.use(express.json());

const DEMO_KEY = "DEMO-ERP";
const activeLicenses = new Set();

app.post("/api/workflow", (req, res) => {
  const { licenseKey, action } = req.body;
  if (licenseKey === DEMO_KEY) {
    return res.json({ result: "DEMO: Csak 1 modul használható" });
  }
  if (activeLicenses.has(licenseKey)) {
    return res.json({ result: `PRO: Teljes ERP funkció fut: ${action}` });
  }
  return res.status(403).json({ error: "Érvénytelen licenc" });
});

app.listen(8083, () => console.log("ERP szerver fut: http://localhost:8083"));