const {Router} = require('express');
const crudController = require('../controllers/crudCategoryControllers');
const router = Router(); 


router.post('/category/create',crudController.create_category);
router.post('/category/update',crudController.update_category);
router.post('/category/delete',crudController.delete_category);
router.get('/category/get_all',crudController.get_all);

module.exports = router ; 
