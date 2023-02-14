const connection = require('./connection');

const insert = async (saleDate) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (?)',
    [saleDate],
  );
  return insertId;
};

const listAll = async () => {
  const [request] = await connection.execute(
  `SELECT
    s_p.sale_id AS saleId, s.date AS date, s_p.product_id AS productId, s_p.quantity AS quantity
    FROM StoreManager.sales_products as s_p
    INNER JOIN StoreManager.sales AS s
    ON s_p.sale_id = s.id
    ORDER BY s_p.sale_id ASC, s_p.product_id ASC`,
  );

  return request;
};

const listById = async (id) => {
  const [request] = await connection.execute(
  `SELECT
      s.date AS date, s_p.product_id AS productId, s_p.quantity AS quantity
      FROM StoreManager.sales_products AS s_p
      INNER JOIN StoreManager.sales as s
      ON s_p.sale_id = s.id
      WHERE s.id = ?
      ORDER BY s_p.sale_id ASC, s_p.product_id ASC`,
    [id],
  );
  return request;
};

module.exports = {
  insert,
  listAll,
  listById,
};