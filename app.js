const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./app/config/dbconfig');
connectDB();

const employeeRouter = require('./app/routes/emp.route');
app.use(employeeRouter);

const productRouter = require('./app/routes/product.route');
app.use(productRouter);

app.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server is running on port 3000');
    }
})


