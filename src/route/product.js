import express from "express";
import productController from "../controller/productController";
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
  // router.get("/", productController.getHomePage);
  router.get("/products", productController.getProducts);
  router.get("/product/:id", productController.getProductById);
  router.get("/category/:id", productController.getProductByIDCategory);
  router.get("/search-product/:value", productController.getProductBySearch);
  router.post("/create-product", productController.createProduct);
  router.post("/upload-image", upload.single('image-product'), productController.handleUploadImage);
  router.patch("/update-product/:id", productController.updateProductByID)
  router.delete("/delete-product", productController.deleteProduct);
  // router.get("/detail-user/:id", productController.getDetail);
  // router.get("/edit-user/:id", productController.getDetail_edit);
  // router.post("/update-user", productController.updateUser); 
  // router.post("/create-user", productController.createUser);
  // router.post("/delete-user", productController.deleteUser);


  // router.get("/upload", productController.uploadFile);

  // router.post('/system/user-manage/users/upload-profile-pic', upload.single('profile_pic'), productController.handleUploadFile);

  // router.post('/upload-multiple-pic', upload.array('multiple_pic', 3), productController.handleUploadMultiple);
  // //Tiền tố phía trước router
  return app.use("/", router);
};

export default initProductRoute;
