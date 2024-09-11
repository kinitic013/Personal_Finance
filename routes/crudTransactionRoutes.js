const {Router} = require('express');
const crudController = require('../controllers/crudTransactionControllers.js');
const router = Router(); 


router.post('/transaction/create',crudController.create_transaction);
router.post('/transaction/update',crudController.update_transaction);
router.post('/transaction/delete',crudController.delete_transaction);
router.get('/transaction/get_all',crudController.get_all);

module.exports = router ; 
