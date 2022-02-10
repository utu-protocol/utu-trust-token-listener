import ExpressRouter from "express-promise-router";
const router = ExpressRouter();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default router;
