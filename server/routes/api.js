import 'babel-polyfill';
import express from 'express';
import {
  balance,
  blockNumber,
  eventQuery,
  getTransfers
} from '../utils/ethereum';
var router = express.Router();

/* GET home. */
router.get('/', async (req, res) => {
  res.send('UTU Coin Endorses Listener');
});

/* GET all endorsements for address. */
router.get('/endorsements/:address', async (req, res) => {
  if (!req.params.address) return;
  res.send(await getTransfers(req.params.address));
});

/* GET current block number. */
router.get('/block', async (req, res) => {
  res.send(await blockNumber());
});

/* GET get contract event query. */
router.get('/contract', async (req, res) => {
  res.send(await eventQuery());
});

export default router;
