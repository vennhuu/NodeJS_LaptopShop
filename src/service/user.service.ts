import getConnection from "config/db";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string,
) => {
  // insert into database
  const connection = await getConnection();
  try {
    const sql =
      "INSERT INTO `users`(`fullName` , `email` , `address`) VALUES (?,?,?)";
    const values = [fullName, email, address];

    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getAllUsers = async () => {
  const connection = await getConnection();
  try {
    const [results, fields] = await connection.query("SELECT * FROM `users`");
    return results;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const handleDeleteUser = async (id: string) => {
  const connection = await getConnection();
  try {
    const sql = "DELETE FROM `users` WHERE `id` = ?";
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const handleViewUser = async (id: string) => {
  const connection = await getConnection();
  try {
    const sql = "SELECT * FROM `users` WHERE `id` = ?";
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);
    return result[0];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const updateUserById = async (
  id: string,
  fullName: string,
  email: string,
  address,
) => {
  const connection = await getConnection();
  try {
    const sql =
      "UPDATE `users` set `fullName` = ? , `email` = ? , `address` = ? WHERE `id` = ?";
    const values = [fullName, email, address, id];

    const [result, fields] = await connection.execute(sql, values);
    return result[0];
  } catch (err) {
    console.log(err);
    return [];
  }
};
export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  handleViewUser,
  updateUserById,
};
