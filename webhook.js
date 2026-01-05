const express = require("express");
const Stripe = require("stripe");
const generateLicense = require("./license");

const stripe = new Stripe(process.env.STRIPE_SECRET);
const router = express.Router();

router.post("/webhook", express.raw({type: 'application/json'}), (req, res) => {
  const event = req.body;

  if (event.type === "checkout.session.completed") {
    const email = event.data.object.customer_email;
    const license = generateLicense(email);

    console.log("ÚJ LICENC:", license, "EMAIL:", email);

    // IDE: adatbázis mentés + email küldés
  }

  res.json({received: true});
});

module.exports = router;