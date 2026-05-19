// Get the client
import mysql from "mysql2/promise";

// Create the connection to database
const getConnection = async () => {
  const connection = await mysql.createConnection({
    port: 3307,
    host: "localhost",
    user: "root",
    password: "1234",
    database: "nodejspro",
  });
  return connection;
};

export default getConnection;
