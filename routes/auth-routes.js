const { Router } = require('express');

const authController = require('../controllers/auth-controller');

const router = Router();

router.post('/login' ,authController.login_user);
router.get('/logout', authController.logout_get);
router.post('/send_email/',authController.send_email);
router.post('/verify_code/',authController.verify_code);
router.put('/change_pass/',authController.change_pass);

module.exports = router;