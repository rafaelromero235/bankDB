const { Router } = require('express');
const transferController = require('../controllers/transfers.controller');
const router = Router();

router.post('/', transferController.createTransfer);

module.exports = router;
