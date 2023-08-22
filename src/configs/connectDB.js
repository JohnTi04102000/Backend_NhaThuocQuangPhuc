// get the client
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "NguyenHuuTri",
  password: "Y1JWL/N@]A_dDXwi",
  database: "webbanthuoc",
});

export default pool;
