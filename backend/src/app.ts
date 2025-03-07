import express, { Request, Response, response } from 'express';
import bodyParser from 'body-parser';
import { error, log, timeStamp } from 'console';
import cron from 'node-cron';
import cors from 'cors';
import Crypto from './models/cryptoModel';
import eventsHandler from './Utils/eventsHandler';
import { clients } from './Utils/eventsHandler';
import fetchCryptoData from './Utils/fetchCryptoData';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = 3002;

cron.schedule('*/10 * * * * *', () => fetchCryptoData()); // poll every second


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript Express!');
});


app.get('/events', eventsHandler);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
