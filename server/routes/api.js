import 'babel-polyfill';
import express from 'express';
import {
  balance,
  blockNumber,
  eventQuery,
  getEndorsements,
  getEndorsementsActive
} from '../utils/ethereum';
var router = express.Router();

/* GET home. */
router.get('/', async (req, res) => {
  res.send('UTU Coin Endorses Listener');
});

/* GET all endorsements for address. */
router.get('/endorsements/:address?', async (req, res) => {
  res.send(await getEndorsements(req.params.address));
});

router.get('/endorsements/active/:address', async (req, res) => {
  if (!req.params.address) return;
  res.send(await getEndorsementsActive(req.params.address));
})

/* GET current block number. */
router.get('/block', async (req, res) => {
  res.send(await blockNumber());
});

/* GET get contract event query. */
router.get('/contract', async (req, res) => {
  res.send(await eventQuery());
});

export default router;
