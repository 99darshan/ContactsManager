let express = require("express");
let router = express.Router();
let authController = require("../controllers/authController");

router.post('/facebook/login', authController.facebookLogin);
router.get('/verify-jwt-token', authController.validateJwtToken);

module.exports = router;