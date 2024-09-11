const express = require("express");
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const authRoutes = require("./routes/authRoutes");
const crudTransactionRoutes = require("./routes/crudTransactionRoutes");
const crudSavingsRoutes = require("./routes/crudSavingRoutes");
const curdCategoryRoutes = require("./routes/crudCategoryRoutes")
const reportRoutes = require("./routes/reportRoutes")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 5000;


const url_local='mongodb://127.0.0.1:27017/finance';
mongoose
  .connect(url_local)
  .then((msg) => {
    console.log("DB Connected to rest of the world");
  })
  .catch((err) => {
    console.log(err);
    console.log("DB Connection Failed");
  });
app.use(crudTransactionRoutes);
app.use(authRoutes);
app.use(curdCategoryRoutes);
app.use(crudSavingsRoutes);
app.use(reportRoutes)
// 
app.listen(PORT,()=>
{
    console.log("Server running on Port 5000");
})