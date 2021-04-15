const categoryModel = require('../../models').dev_category;

exports.list = async (ctx) => {
  let categories;
  try {
    categories = await categoryModel.findAll({
      attributes: ['id', 'name_kor', 'name_eng'],
    });
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.body = categories;
};