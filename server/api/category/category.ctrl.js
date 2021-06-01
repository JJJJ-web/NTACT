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

exports.create = async (ctx) => {
  const category = ctx.request.body;

  try {
    await categoryModel.create({
      name_kor: category.name_kor,
      name_eng: category.name_eng,
    });
    ctx.status = 201;
  } catch (e) {
    ctx.throw(500, e);
  }
};