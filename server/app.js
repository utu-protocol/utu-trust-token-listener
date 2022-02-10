import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import apiRouter from "./routes/api";
import indexRouter from "./routes/index";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log("error-handling", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

console.log("Service started ...");

export default app;
