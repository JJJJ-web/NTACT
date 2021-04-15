const models = require('../models');

module.exports = () => {
  const options = {
    force: process.env.NODE_ENV === 'test',
  };
  return models.sequelize.sync(options);
};