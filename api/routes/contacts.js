var express = require("express");
var router = express.Router();
var contactsController = require("../controllers/contactsController");
var authController = require("../controllers/authController");

router.get(
  "/",
  authController.verifyJwtToken,
  contactsController.getAllContacts
);
router.get(
  "/:id",
  authController.verifyJwtToken,
  contactsController.getContactById
);
router.post(
  "/",
  authController.verifyJwtToken,
  contactsController.createContact
);
router.delete(
  "/:id",
  authController.verifyJwtToken,
  contactsController.deleteContact
);
router.put(
  "/:id",
  authController.verifyJwtToken,
  contactsController.updateContact
);

module.exports = router;
