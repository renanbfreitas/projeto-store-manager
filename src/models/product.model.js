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

module.exports = {
  listAll,
  listById,
};
