const { Router } = require('express');
const userController = require('../controllers/users.controller');

const router = Router();

router.get('/', userController.findUsers);
router.post('/signup', userController.createUser);

router.post('/login', userController.findUserByAccount);

router.get('/:id/history', userController.findUserHistory);

module.exports = router;
