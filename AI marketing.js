import express from "express";

const app = express();
app.use(express.json());

const DEMO_KEY = "DEMO-MARKETING";
const activeLicenses = new Set();

app.post("/api/campaign", (req, res) => {
  const { licenseKey, campaign } = req.body;
  if (licenseKey === DEMO_KEY) {
    return res.json({ message: "DEMO: 1 kampány generálható" });
  }
  if (activeLicenses.has(licenseKey)) {
    return res.json({ message: `PRO: Teljes kampány sorozat generálva: ${campaign}` });
  }
  return res.status(403).json({ error: "Érvénytelen licenc" });
});

app.listen(8084, () => console.log("Marketing szerver fut: http://localhost:8084"));