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

const removedSalesProduct = async (id) => {
  const request = connection.execute(
    `DELETE FROM sales_products
      WHERE sale_id = ?`,
    [id],
  );
  return request;
};

const update = async (saleId, saleInfo) => {
  const [result] = await connection.execute(
    `UPDATE sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [saleInfo.quantity, saleId, saleInfo.productId],
  );
  return result;
};

const updateInfoSale = async (sale) => {
  const [result] = await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ?',
    [sale.quantity, sale.sale_id],
  );

  return result;
};

module.exports = {
  insert,
  removedSalesProduct,
  update,
  updateInfoSale,
};
