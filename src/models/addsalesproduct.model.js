const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (saleInfo) => {
  const columns = Object.keys(snakeize(saleInfo))
  .map((key) => `${key}`)
  .join(', ');

  const placeholders = Object.keys(saleInfo)
  .map((_key) => ('?'))
  .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales_products (${columns}) VALUES (${placeholders})`,
    [...Object.values(saleInfo)],
  );

  return insertId;
};

module.exports = {
  insert,
};