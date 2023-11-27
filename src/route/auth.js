import express from "express";
let router = express.Router();
import APIAuth from "../controller/authController";

const initAPIAuth = (app) => {
  router.post("/login", APIAuth.Login);

  //Tiền tố phía trước router
  return app.use("/api/v1", router);
};

export default initAPIAuth;
