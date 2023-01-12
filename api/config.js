require('dotenv').config();

const PORT = process.env.PORT || 5000;
const DB_CONNECTION = process.env.DB_CONNECTION;

module.exports = { PORT, DB_CONNECTION }