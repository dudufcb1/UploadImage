require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
// use v2 api
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})
// database
const connectDB = require('./db/connect');

//product router
const productRouter = require('./routes/productRoutes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//json parser
app.use(express.json());
app.use(fileUpload({ useTempFiles: true}));
app.use(express.static('./public'));


app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

// en la siguiente linea estamos diciendo que cuando se haga una peticion a la ruta /api/v1/products, se use el router que hemos creado en productRoutes.js 
app.use('/api/v1/products', productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
