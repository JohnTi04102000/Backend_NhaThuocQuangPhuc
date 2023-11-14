import pool from "../configs/connectDB";

let getAllOrders = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM donhang");
  return res.status(200).json(rows);
};

let getAllOrderAccept = async (req, res) =>{
  const [rows, fields] = await pool.execute("SELECT * FROM donhang where trangThai = 'Đã duyệt'" );
  return res.status(200).json(rows);
}

let getAllOrderNotAccept = async (req, res) =>{
  const [rows, fields] = await pool.execute("SELECT * FROM donhang where trangThai = 'Đang chờ duyệt'" );
  return res.status(200).json(rows);
}

let getAllOrderComplete = async (req, res) =>{
  const [rows, fields] = await pool.execute("SELECT * FROM donhang where trangThai = 'Đã giao'" );
  return res.status(200).json(rows);
}

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
    getAllOrderComplete
//   getCategoryById,
//   updateCategoryById,
};
