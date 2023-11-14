import pool from "../configs/connectDB";

let name_file;

let createProduct = async(req, res) => {
  console.log('check boy: ', req.body.img);
  let {img, id, iddm, CachDongGoi, TenSanPham, CongDung, DangBaoChe, HanDung, ThuongHieu, NhaSanXuat, NoiSanXuat, KeToa, ThanhPhanChinh} = req.body;

  if (!img || !id || !iddm || !CachDongGoi || !TenSanPham || !CongDung || !DangBaoChe || !HanDung || !ThuongHieu || !NhaSanXuat || !NoiSanXuat || !KeToa || !ThanhPhanChinh) {
    return res.status(404).json({
      message: "failed",
    });
  }
  else{
    await pool.execute("INSERT INTO sanpham values (?, ?, ?, ?, ?, ?)", [
      id,
      name_User,
      birth_datetime,
      role_User,
      sex,
      name_file
    ]);
  }
}

let handleUploadImage = async(req, res) => {
  console.log('file up: ',req.file);
  name_file = req.file.filename;
  console.log('name_file: ',name_file);
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("Please select an image to upload");
  }
}

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

let getProductBySearch = async (req, res, next) => {
    let value = req.params.value;
    console.log(value);
    const [rows, fields] = await pool.execute("SELECT * FROM sanpham where TenSanPham LIKE ? ", [`%${value}%`]);
    return res.status(200).json(rows);
}

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
    if (rows) {
      console.log(rows);
      return res.status(200).json({ message: "Update product successful!" });
    }
  } catch (err) {
    console.log(err);
  }
};

let deleteProduct = async (req, res) => {
  try {
    let idProduct = req.body.id;
    let result = await pool.execute("DELETE FROM sanpham WHERE id = ?", [idProduct]);
    console.log("check: ", idProduct);
    if(result)
    {
      return res.status(200).json({ message: "Product deleted successfully!" });
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
  deleteProduct,
  createProduct,
  handleUploadImage,
  getProductBySearch
};
