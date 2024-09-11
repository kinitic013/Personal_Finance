const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
      title: 'Personal Finance Backend',
      description: 'This is the backend of a personal finance management application built using Node.js. It provides APIs to manage financial records such as income, expenses, budgeting, and transaction history.'
    },
    host: 'localhost:5000'
  };
  
  const outputFile = './swagger-output.json';
  const routes = ['./routes/authRoutes.js', './routes/crudCategoryRoutes.js','./routes/crudTransactionRoutes.js','./routes/crudSavingRoutes.js','./routes/reportRoutes.js'];

  swaggerAutogen(outputFile,routes,doc)