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
router.get('/endorsements/:target_address?', async (req, res) => {
  res.send(await getEndorsements(req.params.target_address, req.query.from_block));
});

export default router;
