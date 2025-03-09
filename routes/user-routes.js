const middleWarefunction = require("../middleware/auth-middleware");

const { Router } = require('express');

const userController = require('../controllers/user-controller');

const router = Router();

router.get('/get_all_users',middleWarefunction.testKey, userController.get_all_users);

router.post('/register' , userController.save_user);

router.delete('/delete_user/:id', userController.delete_user);

router.put('/update_user/:id', userController.update_user);



module.exports = router;