const {Router} = require('express');
const crudController = require('../controllers/crudSavingControllers.js');
const router = Router(); 


router.post('/saving/create',crudController.create_saving);
router.post('/saving/update',crudController.update_saving);
router.post('/saving/delete',crudController.delete_saving);
router.post('/saving/status',crudController.status);
router.get('/saving/get_all',crudController.get_all);

module.exports = router ; 
