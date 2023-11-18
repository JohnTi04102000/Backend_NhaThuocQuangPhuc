import express from "express";
import orderController from "../controller/orderController";
let router = express.Router();


const initOrderRoute = (app) => {
  router.get("/orders", orderController.getAllOrders);
  router.get("/order-accept", orderController.getAllOrderAccept);
  router.get("/order-notAccept", orderController.getAllOrderNotAccept);
  router.get("/order-complete", orderController.getAllOrderComplete);
  router.get("/getUser/:id", orderController.getUserById);
  router.patch("/order-accept", orderController.updateOrderAccept);
  router.patch("/order-complete", orderController.updateOrderComplete);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initOrderRoute;
