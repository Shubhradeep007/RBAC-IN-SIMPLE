const exprress = require('express');
const employeeController = require('../controller/employee.controller');
const roleCheck = require('../middleware/roleChcek');
const router = exprress.Router();


router.post('/signup', employeeController.registerEmployee)
router.post('/login', employeeController.loginEmployee)
router.put('/update/:id', roleCheck, employeeController.updateEmployee)
router.delete('/delete/:id', roleCheck, employeeController.deleteEmployee)


module.exports = router;