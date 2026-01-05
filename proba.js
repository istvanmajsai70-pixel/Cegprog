// owner.js
const OWNER = {
  email: "istvanmajsai70@gmail.com",
  phone: "+36 30 626 0688",
  IBAN: "LT81 3250 0757 5026 3901"
};
module.exports = OWNER;
// license_server/generate_license.js
const express = require('express');
const app = express();
app.use(express.json());

const LICENSES = {};

app.post("/generate_license", (req,res)=>{
  const { email } = req.body;
  const license = "LIC-"+Date.now();
  LICENSES[license] = email;
  res.json({ license, email });
});

app.listen(8081, ()=>console.log("Fizetés + licenc szerver fut"));
// ai_sales_assistant/backend/server.js
const express = require('express');
const app = express();
app.use(express.json());
const { OWNER } = require('../../owner');

const LICENSES = {};

app.post("/check_license", (req,res)=>{
  const { license } = req.body;
  if(LICENSES[license]) return res.json({ status: "valid" });
  res.status(403).json({ status: "invalid" });
});

app.get("/", (req,res)=>{
  res.send("AI Sales Assistant DEMO verzió");
});

app.listen(3001, ()=>console.log("Sales Assistant server fut"));
// ai_sales_assistant/frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [licenseKey, setLicenseKey] = useState("");
  const [proActive, setProActive] = useState(false);

  const unlockPro = async () => {
    try {
      const res = await axios.post("http://localhost:8081/check_license", { license: licenseKey });
      if(res.data.status === "valid") setProActive(true);
      else alert("Érvénytelen licenc!");
    } catch(e){
      alert("Hiba a licenc szerverrel!");
    }
  };

  return (
    <div>
      <h1>{proActive ? "PRO AI Sales Assistant" : "DEMO AI Sales Assistant"}</h1>
      {!proActive && <>
        <input placeholder="Licenc kulcs" onChange={e=>setLicenseKey(e.target.value)} />
        <button onClick={unlockPro}>PRO Aktiválás</button>
      </>}
    </div>
  );
}










