const express = require("express");
const router = express.Router();

const {localFileUpload,ImageUplaod,videoUpload} = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload",localFileUpload );
router.post("/ImageUpload",ImageUplaod);
router.post("/videoUpload",videoUpload)

module.exports = router;