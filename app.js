require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.get('/', (req, res) => {
  res.send('E Commerce API');
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    const port = process.env.PORT || 5000;
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log('Error while starting the server 💥', error);
  }
};

startServer();
