const { idSchema, nameSchema, addSalesSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) {
 return {
    type: 'INVALID_NAME', message: { message: '"name" length must be at least 5 characters long' },
  }; 
}

  return { type: null, message: '' };
};

const validateNewSale = (sale) => {
  const { error } = addSalesSchema.validate(sale);
  if (error) {
    return {
      type: error.message.includes('greater than')
        ? 'INVALID_VALUE'
        : 'MISSING_FIELD',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateName,
  validateNewSale,
};
