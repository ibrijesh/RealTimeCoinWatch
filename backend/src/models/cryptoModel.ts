//db connection


const mongoose = require("mongoose");


/**  
    mongodb://localhost:27017/cryptodb -  use this url to connect with mongodb if you are running on local machine 
**/


mongoose.connect('mongodb://localhost:27017/cryptodb')
  .then(() => console.log('Successfully connected to cryptoDB'))
  .catch((err: any) => console.log('Could not connect to cryptoDB..', err));



/** Defining  Crypto  Schema  */


const cryptoSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 10
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },
  symbol: {
    type: String,
  },
  rank: {
    type: Number,
    required: true
  },
  allTimeHighUSD: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  cap: {
    type: Number,
    required: true
  },
  liquidity: {
    type: Number,
    required: true
  },
  delta: {
    type: Object,
    required: true
  }
});


const Crypto = mongoose.model("crypto", cryptoSchema);

export default Crypto;