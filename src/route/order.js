import express from "express";
import orderController from "../controller/orderController";
let router = express.Router();


const initOrderRoute = (app) => {
  router.get("/orders", orderController.getAllOrders);
  router.get("/order-accept", orderController.getAllOrderAccept);
  router.get("/order-notAccept", orderController.getAllOrderNotAccept);
  router.get("/order-complete", orderController.getAllOrderComplete);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initOrderRoute;
