import Stock from "../models/stockModel";
import axios, { AxiosResponse, all } from 'axios';
import { clients } from '../Utils/eventsHandler';

const COINS = ['BTC', 'ETH', 'BNB', 'DOGE', 'LTC'];

const apiUrl = 'https://api.livecoinwatch.com/coins/single';

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': '05ed6b01-0c05-40c8-8909-ae81fd38ebb7'
};

export default async function fetchStockData()  {

    try {

      // collect datat from api
  
      const promises = COINS.map(coin =>
        axios.post(apiUrl, {
          "currency": "USD",
          "code": coin,
          "meta": true
        }, { headers })
      )
  
      const responses = await Promise.all(promises);
  
      // insert data to db
  
      const stockPromise = responses.map(async (response, index) => await Stock.updateOne(
        { 'code': COINS[index] },
        {
          $set:
          {
            'name': response.data.name,
            'symbol': response.data.symbol,
            'rank': response.data.rank,
            'allTimeHighUSD': response.data.allTimeHighUSD,
            'rate': response.data.rate,
            'volume': response.data.volume,
            'cap': response.data.cap,
            'liquidity': response.data.liquidity,
            'delta': response.data.delta
          }
        },
        { upsert: true }
      ));
  
      const stocks = await Promise.all(stockPromise);
  
      const allStocks = responses.map((response) => new Stock(response.data));

  
      // Send data to  all the clients
      clients.forEach((client: any) => client.response.write(`data: ${JSON.stringify(allStocks)}\n\n`))
  

    }
    catch (error) {
      console.log(error);
    }
  }