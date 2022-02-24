import "babel-polyfill";
import ExpressRouter from "express-promise-router";
import {balance, getAddConnections, getEndorsements} from "../utils/ethereum";
import {
    addConnectionsResponse,
    endorsementsResponse,
} from "../service/response";
import {connectionsValidation, endorsementsValidation} from "../validations/api";

const router = ExpressRouter();

/* GET home. */
router.get("/", async (req, res) => {
    res.send("UTU Coin Endorses Listener");
});

/* GET UTT balance for address. */
router.get("/balance/:address", async (req, res) => {
    res.send(await balance(req.params.address));
});

/* GET all endorsements for address. */
router.get("/endorsements", async (req, res) => {
    endorsementsValidation.validate(req.query);

    res.send(
        endorsementsResponse(
            await getEndorsements(
                req.query.source_address,
                req.query.target_address,
                req.query.from_block ? parseInt(req.query.from_block) : undefined
            )
        )
    );
});

/* GET all endorsements for address. */
router.get("/connections", async (req, res) => {
    connectionsValidation.validate(req.query);

    const results = await getAddConnections(
        req.query.target_address,
        req.query.from_block ? parseInt(req.query.from_block) : undefined
    );
    res.send(addConnectionsResponse(results));
});

export default router;
