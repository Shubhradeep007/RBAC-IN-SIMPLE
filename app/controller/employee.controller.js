const Employee = require("../model/employee.model");
const jwt = require('jsonwebtoken');

class EmployeeController {
    async registerEmployee(req, res) {
        try {
            const data = { empName: req.body.empName, empEmail: req.body.empEmail, empPassword: req.body.empPassword, empDepartment: req.body.empDepartment, empRole: req.body.empRole  || 'employee' }
            if (!data.empName || !data.empEmail || !data.empPassword || !data.empDepartment || !data.empRole) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required'
                })
            }

            const createEmployee = await Employee.create(data)

            if (createEmployee) {
                return res.status(201).json({
                    status: true,
                    message: 'Employee registered successfully',
                    data: createEmployee
                })
            }

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error creating employee",
                error: error.message
            });
        }
    }

    async loginEmployee(req, res) {
        try {
            const { empEmail, empPassword } = req.body;

            if (!empEmail || !empPassword) {
                return res.status(400).json({
                    status: false,
                    message: 'Email and password are required'
                })
            }

            const employee = await Employee.findOne({ empEmail: empEmail });

            if (!employee) {
                return res.status(404).json({
                    status: false,
                    message: 'Employee not found'
                })
            }

            if (empPassword !== employee.empPassword) {
                return res.status(401).json({
                    status: false,
                    message: 'Invalid password'
                })
            }

            const token = jwt.sign({ id: employee._id, empRole: employee.empRole, empName: employee.empName, empEmail: employee.empEmail, empDepartment: employee.empDepartment }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            return res.status(200).json({
                status: true,
                message: 'Employee logged in successfully',
                data: {
                    id: employee._id,
                    empName: employee.empName,
                    empEmail: employee.empEmail,
                    empDepartment: employee.empDepartment,
                    empRole: employee.empRole
                },
                token: token
            })

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Error logging in employee",
                error: error.message
            });
        }
    }

    async updateEmployee(req, res) {
        try {
            const id = req.params.id;
            if (req.user.empRole !== 'admin' && req.user.id !== 'manager') {
                return res.status(403).json({
                    status: false,
                    message: 'Unauthorized to update employee'
                });
            }

            const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
            if (updatedEmployee) {
                return res.status(200).json({
                    status: true,
                    message: 'Employee updated successfully',
                    data: updatedEmployee
                });
            }

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Error updating employee",
                error: error.message
            });
        }
    }

    async deleteEmployee(req, res) {
        try {
            const id = req.params.id;
            if (req.user.empRole !== 'admin') {
                return res.status(403).json({
                    status: false,
                    message: 'Unauthorized to delete employee'
                });
            }

            const deletedEmployee = await Employee.findByIdAndDelete(id);
            if (deletedEmployee) {
                return res.status(200).json({
                    status: true,
                    message: 'Employee deleted successfully',
                    data: deletedEmployee
                });
            }

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Error deleting employee",
                error: error.message
            });
        }
    }
}


module.exports = new EmployeeController();
