const models = require('../models');

module.exports = () => {
  const options = {
    force: process.env.NODE_ENV === 'test',
    // 나중에 로그 안보이게 수정 예정
    // logging: false,
  };
  return models.sequelize.sync(options);
};