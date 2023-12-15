// External exports
const express = require("express");

// Internal  exports
const {} = require("");

const router = express.Router();

// Login page
router.get("/", loginController);

module.exports = router;
