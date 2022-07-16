var express = require("express");
var router = express.Router();

const { generatePDF } = require("../controller/generatePDF");

router.post("/", generatePDF);

module.exports = router;