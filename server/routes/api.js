import 'babel-polyfill';
import express from 'express';
import { balance, getAddConnections, getEndorsements } from '../utils/ethereum';
import {
  addConnectionsResponse,
  endorsementsResponse,
} from '../service/response';
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
  res.send(endorsementsResponse(await getEndorsements(
    req.params.target_address,
    req.query.from_block ? parseInt(req.query.from_block) : undefined)));
});

/* GET all endorsements for address. */
router.get('/connections/:target_address?', async (req, res) => {
  const results = await getAddConnections(
    req.params.target_address,
    req.query.from_block ? parseInt(req.query.from_block) : undefined
  );
  res.send(addConnectionsResponse(results));
});

export default router;
