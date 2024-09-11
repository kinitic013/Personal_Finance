const {Router} = require('express');
const reportController = require('../controllers/reportControllers.js');
const router = Router(); 

router.post("/report_all",reportController.get_report)
router.post("/report_custom",reportController.get_report_custom_dates)

module.exports = router;