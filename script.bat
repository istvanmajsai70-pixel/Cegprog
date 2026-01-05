@echo off
title Enterprise AI Suite Builder
echo === Enterprise AI Suite automatikus letrehozas ===

REM FOMAPPA
mkdir enterprise_ai_suite
cd enterprise_ai_suite

REM OWNER ADATOK
echo const OWNER = { > owner.js
echo   email: "istvanmajsai70@gmail.com", >> owner.js
echo   phone: "+36306260688", >> owner.js
echo   IBAN: "LT81 3250 0757 5026 3901" >> owner.js
echo }; >> owner.js
echo module.exports = OWNER; >> owner.js

REM LICENC SZERVER
mkdir license_server
echo const express = require('express'); > license_server\license_server.js
echo const app = express(); >> license_server\license_server.js
echo app.use(express.json()); >> license_server\license_server.js
echo const LICENSES = {}; >> license_server\license_server.js
echo app.post("/generate", (req,res)=>{ >> license_server\license_server.js
echo   const lic = "LIC-" + Date.now(); >> license_server\license_server.js
echo   LICENSES[lic] = true; >> license_server\license_server.js
echo   res.json({license: lic}); >> license_server\license_server.js
echo }); >> license_server\license_server.js
echo app.post("/check",(req,res)=>{ >> license_server\license_server.js
echo   if(LICENSES[req.body.license]) res.json({status:"valid"}); >> license_server\license_server.js
echo   else res.status(403).json({status:"invalid"}); >> license_server\license_server.js
echo }); >> license_server\license_server.js
echo app.listen(8081); >> license_server\license_server.js

REM PROGRAM LISTA
for %%A in (sales marketing finance hr support security) do (
    mkdir ai_%%A
    mkdir ai_%%A\backend
    mkdir ai_%%A\frontend

    echo const express = require('express'); > ai_%%A\backend\server.js
    echo const app = express(); >> ai_%%A\backend\server.js
    echo app.get("/",(req,res)=>res.send("AI %%A DEMO verzio")); >> ai_%%A\backend\server.js
    echo app.listen(3000); >> ai_%%A\backend\server.js

    echo console.log("AI %%A Frontend DEMO"); > ai_%%A\frontend\app.js
)

cd ..

REM ZIP KESZITES
tar -a -c -f enterprise_ai_suite.zip enterprise_ai_suite

echo === KESZ ===
pause