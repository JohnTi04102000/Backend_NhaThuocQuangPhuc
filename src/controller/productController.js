import pool from "../configs/connectDB";
import multer from "multer";

// let getHomePage = async (req, res) => {
//   const [rows, fields] = await pool.execute("SELECT * FROM users");
//   return res.render("index.ejs", { dataUser: rows });
// };

// let getDetail = async (req, res) => {
//   let idUser = req.params.id;
//   console.log(idUser);
//   const [user, fields] = await pool.execute(
//     "SELECT * FROM users where id = ?",
//     [idUser]
//   );
//   return res.send(JSON.stringify(user));
// };

// let getDetail_edit = async (req, res) => {
//   let idUser = req.params.id;
//   const [user] = await pool.execute("SELECT * FROM users where id = ?", [
//     idUser,
//   ]);
//   return res.render("edit_user.ejs", { data: user[0] });
// };

// let updateUser = async (req, res) => {
//   let idUser = req.body.idUser;
//   let { id, name, birth, role, sex } = req.body;
//   console.log(id, name, birth, role);
//   const birth_datetime = new Date(birth);
//   const [user] = await pool.execute(
//     "UPDATE users SET id = ?, name_User = ?, birth = ?, role_User = ?, sex = ? where id = ?",
//     [id, name, birth_datetime, role, sex, idUser]
//   );

//   return res.redirect("/");
// };

// let createUser = async (req, res) => {
//   let { id, name, birth, role, sex } = req.body;
//   await pool.execute("INSERT INTO users values (?, ?, ?, ?, ?)", [
//     id,
//     name,
//     birth,
//     role,
//     sex,
//   ]);
//   console.log("check: ", req.body);
//   return res.redirect("/");
// };

// let deleteUser = async (req, res) => {
//   let idUser = req.body.userId;
//   await pool.execute("DELETE FROM users WHERE id = ?", [idUser]);
//   console.log("check: ", idUser);
//   return res.redirect("/");
// };

// let uploadFile = async (req, res) => {
//   return res.render("uploadFile.ejs");
// };

// let handleUploadFile = async (req, res) => {
//   console.log(req.file);
//   if (req.fileValidationError) {
//     return res.send(req.fileValidationError);
//   } else if (!req.file) {
//     return res.send("Please select an image to upload");
//   }

//   // Display uploaded image for user validation
//   // res.send(
//   //   `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/system/user-manage/users">Upload another image</a>`
//   // );
//   // });
// };

// let handleUploadMultiple = async (req, res) => {
//   if (req.fileValidationError) {
//     return res.send(req.fileValidationError);
//   } else if (!req.files) {
//     return res.send("Please select an image to upload");
//   }
//   let result = "You have uploaded this image:";
//   const lengthArray = req.files.length;
//   for (let index = 0; index < lengthArray; index++) {
//     result += `<hr/><img src="/image/${req.files[index].filename}" width="500"><hr />`;
//   }

//   result += `<a href="/upload">Upload another image</a>`;
//   res.send(result);
// };

let getProducts = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM sanpham");
  return res.status(200).json(rows);
};

let getProductById = async (req, res) => {
  let idProduct = req.params.id;
  const [rows, fields] = await pool.execute(
    "SELECT * FROM sanpham where id = ?",
    [idProduct]
  );
  return res.status(200).json(rows);
};

let getProductByIDCategory = async (req, res, next) => {
  let id_Category = req.params.id;
  const [rows, fields] = await pool.execute(
    "SELECT * FROM sanpham where iddm = ?",
    [id_Category]
  );
  return res.status(200).json({ data: rows });
};

let updateProductByID = async (req, res) => {
  try {
    let {
      id,
      iddm,
      TenSanPham,
      CachDongGoi,
      CongDung,
      DangBaoChe,
      HanDung,
      KeToa,
      NhaSanXuat,
      NoiSanXuat,
      ThanhPhanChinh,
      ThuongHieu,
      img,
      price,
    } = req.body.data;
    console.log(req.body);
    console.log(id);

    const [rows, fields] = await pool.execute(
      "UPDATE sanpham SET CachDongGoi = ?,  CongDung = ?, DangBaoChe = ?, HanDung = ?, KeToa = ?, NhaSanXuat = ?, NoiSanXuat = ?, TenSanPham = ?, ThanhPhanChinh = ?, ThuongHieu = ?, iddm = ?, img = ?, price = ? where id = ?",
      [
        CachDongGoi,
        CongDung,
        DangBaoChe,
        HanDung,
        KeToa,
        NhaSanXuat,
        NoiSanXuat,
        TenSanPham,
        ThanhPhanChinh,
        ThuongHieu,
        iddm,
        img,
        price,
        id,
      ]
    );
    if(rows)
    {
      console.log(rows);
      return res.status(200).json({message: 'Update product successful!'});
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  // getHomePage,
  // getDetail,
  // getDetail_edit,
  // updateUser,
  // createUser,
  // deleteUser,
  // uploadFile,
  // handleUploadFile,
  // handleUploadMultiple,
  getProducts,
  getProductById,
  getProductByIDCategory,
  updateProductByID,
};
