import express from "express";
import categoryController from "../controller/categoryController";
let router = express.Router();


const initCategoryRoute = (app) => {
  router.get("/categories", categoryController.getCategories);
  router.get("/get-category/:id", categoryController.getCategoryById);
  router.patch("/update-category/:id", categoryController.updateCategoryById);


  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initCategoryRoute;
