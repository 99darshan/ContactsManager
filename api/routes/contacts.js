var express = require('express');
var router = express.Router();
var contactsController = require('../controllers/contactsController');

router.get('/',contactsController.getAllContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.createContact);
router.delete('/:id', contactsController.deleteContact);
router.put('/:id', contactsController.updateContact);

module.exports = router;