import express from "express";
import homeController from "../controller/productController";
let router = express.Router();
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });


const initProductRoute = (app) => {
  // router.get("/", homeController.getHomePage);
  router.get("/products", homeController.getProducts);
  router.get("/product/:id", homeController.getProductById);
  router.get("/category/:id", homeController.getProductByIDCategory);
  router.patch("/update-product/:id", homeController.updateProductByID)
  // router.get("/detail-user/:id", homeController.getDetail);
  // router.get("/edit-user/:id", homeController.getDetail_edit);
  // router.post("/update-user", homeController.updateUser); 
  // router.post("/create-user", homeController.createUser);
  // router.post("/delete-user", homeController.deleteUser);


  // router.get("/upload", homeController.uploadFile);

  // router.post('/system/user-manage/users/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile);

  // router.post('/upload-multiple-pic', upload.array('multiple_pic', 3), homeController.handleUploadMultiple);
  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initProductRoute;
