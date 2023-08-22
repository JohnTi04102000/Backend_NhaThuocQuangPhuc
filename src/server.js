import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import cors from 'cors'

require("dotenv").config();

const app = express();

//Config local
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
const port = process.env.PORT;

//Config body-parse to send data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Config view engine
configViewEngine(app);

//init web route
initWebRoute(app);


//Config local
app.listen(port, () => {
  console.log("listening on port: " + port);
});
