const snakeize = require('snakeize');
const connection = require('./connection');

const listAll = async () => {
  const [request] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC',
  );
  return request;
};

const listById = async (id) => {
  const [[request]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return request;
};

const insert = async (product) => {
    const columns = Object.keys(snakeize(product))
      .map((key) => `${key}`)
      .join(',');

    const placeholders = Object.keys(product)
      .map((_key) => '?')
      .join(',');

    const [{ insertId }] = await connection.execute(
      `INSERT INTO products (${columns}) VALUES (${placeholders})`,
      [...Object.values(product)],
    );

    return insertId;
};

const update = async (product) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [...Object.values(product)],
  );
  return result;
};

  const deleteProduct = async (id) => {
  const request = connection.execute(
    `DELETE FROM products
      WHERE id = ?`,
    [id],
  );
  return request;
  };

  const findByQuery = async (q) => {
  const [query] = await connection.execute(
    `SELECT * FROM products
      WHERE name LIKE ?`,
    [q],
  );
  return query;
};

module.exports = {
  listAll,
  listById,
  insert,
  update,
  deleteProduct,
  findByQuery,
};
