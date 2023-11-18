import pool from "../configs/connectDB";

let getAllOrders = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM donhang");
  return res.status(200).json(rows);
};

let getAllOrderAccept = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM donhang where trangThai = 'Đã duyệt'"
  );
  return res.status(200).json(rows);
};

let getAllOrderNotAccept = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM donhang where trangThai = 'Đang chờ duyệt'"
  );
  return res.status(200).json(rows);
};

let getAllOrderComplete = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM donhang where trangThai = 'Đã giao'"
  );
  return res.status(200).json(rows);
};

let getUserById = async (req, res) => {
  try {
    let id_User = req.params.id;
    if (id_User) {
      const [rows, fields] = await pool.execute(
        "SELECT * FROM khachhang where id = ?",
        [id_User]
      );
      return res.status(200).json(rows);
    }
  } catch (err) {
    console.error(err);
  }
};

let updateOrderAccept = async (req, res) => {
  try{
    console.log(req.body);
    let { id_User, id_Order } = req.body;
    const [rows, fields] = await pool.execute(
      "UPDATE donhang SET trangThai = 'Đã duyệt' where idKH = ? AND id = ?",
      [id_User, id_Order]
    );
    return res.status(200).json({message: 'Update successful'});
  }
  catch(err) {
    console.error(err);
    return res.status(400).json({message: 'Update failed'});
  }
};

let updateOrderComplete = async (req, res) => {
  try{
    console.log(req.body);
    let { id_User, id_Order } = req.body;
    const [rows, fields] = await pool.execute(
      "UPDATE donhang SET trangThai = 'Đã giao' where idKH = ? AND id = ?",
      [id_User, id_Order]
    );
    return res.status(200).json({message: 'Update successful'});
  }
  catch(err) {
    console.error(err);
    return res.status(400).json({message: 'Update failed'});
  }
};

// let getCategoryById = async (req, res) => {
//   let id_Category = req.params.id;
//   const [rows, fields] = await pool.execute(
//     "SELECT * FROM danhmuc where id = ?",
//     [id_Category]
//   );
//   return res.status(200).json(rows);
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
// let updateCategoryById = async (req, res) => {
//   try {
//     let id_Category = req.params.id;
//     let danhmuc = req.body.name;
//     const [category] = await pool.execute(
//       "UPDATE danhmuc SET name = ? where id = ?",
//       [danhmuc, id_Category]
//     );
//     if (category) {
//       return res.status(200).json({ message: "Update category success!" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = {
  getAllOrders,
  getAllOrderAccept,
  getAllOrderNotAccept,
  getAllOrderComplete,
  getUserById,
  updateOrderAccept,
  updateOrderComplete
  //   getCategoryById,
  //   updateCategoryById,
};
