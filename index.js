import express from 'express';
import initSales from './sales';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initSales(app);

app.listen(PORT, () => {
  console.log('App listening on port: ' + PORT);
});
