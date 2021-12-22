import 'babel-polyfill';
import express from 'express';
import { balance, getEndorsements } from '../utils/ethereum';
import { endorsementsResponse } from '../service/response';
var router = express.Router();

/* GET home. */
router.get('/', async (req, res) => {
  res.send('UTU Coin Endorses Listener');
});

/* GET UTT balance for address. */
router.get('/balance/:address', async (req, res) => {
  res.send(await balance(req.params.address));
});

/* GET all endorsements for address. */
router.get('/endorsements/:target_address?', async (req, res) => {
  res.send(endorsementsResponse(await getEndorsements(req.params.target_address, parseInt(req.query.from_block))));
});

export default router;
