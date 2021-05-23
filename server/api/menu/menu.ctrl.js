const { Sequelize } = require('sequelize');
const aws = require('aws-sdk');
const s3Config = require('../../config/s3-config.json');
const menuModel = require('../../models').dev_menu;
const categoryModel = require('../../models').dev_category;

menuModel.belongsTo(categoryModel, { foreignKey: 'category_id', sourceKey: 'id' });
categoryModel.hasMany(menuModel, { foreignKey: 'category_id', targetKey: 'id' });

aws.config.update({
  region: 'ap-northeast-2',
  accessKeyId: s3Config.AWSAccessKeyId,
  secretAccessKey: s3Config.AWSSecretKey,
});

const S3_BUCKET = s3Config.Bucket;

exports.list = async (ctx) => {
  let menus;
  const { category, onSale } = ctx.request.query;
  JSON.stringify(category, onSale);

  if (category === 'true') {
    try {
      menus = await menuModel.findAll({
        attributes: ['id', ['name_kor', 'menu_kor'], ['name_eng', 'menu_eng'], 'price',
          'description', 'img_url', 'sales_stat', 'delay_time', 'category_id',
          [Sequelize.col('dev_category.name_kor'), 'category_kor'],
          [Sequelize.col('dev_category.name_eng'), 'category_eng']],
        include: [{
          model: categoryModel,
          attributes: [],
          required: true,
        }],
      });
    } catch (e) {
      ctx.throw(500, e);
    }
  } else if (onSale === 'true') {
    try {
      menus = await menuModel.findAll({
        where: { sales_stat: 1 },
      });
    } catch (e) {
      ctx.throw(500, e);
    }
  } else {
    try {
      menus = await menuModel.findAll();
    } catch (e) {
      ctx.throw(500, e);
    }
  }
  ctx.body = menus;
};

exports.get = async (ctx) => {
  const { id } = ctx.params;
  let menu;
  try {
    menu = await menuModel.findByPk(id);
  } catch (e) {
    ctx.throw(500, e);
  }
  // 메뉴가 존재하지 않으면
  if (!menu) {
    ctx.status = 404;
    ctx.body = { message: 'menu not found' };
    return;
  }
  ctx.body = menu;
};

exports.saleStat = async (ctx) => {
  // id 파라미터를 받아 해당 메뉴 찾아오기 
  const { id } = ctx.params;

  let menu;
  try {
    menu = await menuModel.findByPk(id);
  } catch (e) {
    ctx.throw(500, e);
  }

  // 해당 메뉴 ST가 1일 경우 sales_stat 0으로 변경
  if(menu.sales_stat) {
    try {
      menuModel.update({ sales_stat: 0 }, { where: { id } });
    } catch (e) {
      ctx.throw(500, e);
    }
  } else {
    try {
      menuModel.update({ sales_stat: 1 }, { where: { id } });
    } catch (e) {
      ctx.throw(500, e);
    }
  } ctx.status = 200;
};

exports.delayTime = async (ctx) => {
  // id 파라미터를 받아 해당 주문 DB 찾아오기 
  const { id } = ctx.params;
  const { delaytime } = ctx.request.body.headers;
     
  try {
    menuModel.update({ delay_time: delaytime }, { where: { id } });
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.status = 200;
};

exports.status = async (ctx) => {
  // menu Object를 받아 해당 메뉴의 stat을 수정
  const { menu } = ctx.request.body.headers;
  console.log(menu);

  try {
    // DB 에서 id로 해당 메뉴를 검색
    await menuModel.findOne({ where: { id: menu.id } })
      .then((findMenu) => {
        // 프론트에서 받아온 menu stat으로 DB 수정 
        findMenu.name_kor = `${menu.menu_kor}`;
        findMenu.name_eng = `${menu.menu_eng}`;
        findMenu.price = `${menu.price}`;
        findMenu.description = `${menu.description}`;
        findMenu.category_id = `${menu.category_id}`;
        findMenu.img_url = `${menu.img_url}`;
        findMenu.save()
          .then(() => {
            ctx.status = 200;
            console.log('메뉴수정성공');
          });
      });
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 프론트와 미연동 상태
exports.delete = async (ctx) => {
  const { id } = ctx.params;
    
  try {
    await menuModel.destroy({ where: { id } });
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 프론트와 미연동 상태
exports.create = async (ctx) => {
  const newMenu = ctx.request.body;

  const s3 = new aws.S3();
  const s3Params = {
    Bucket: `${S3_BUCKET}/${newMenu.category_eng}`,
    Key: `${newMenu.fileName}.${newMenu.fileType}`,
    Expires: 500,
    ContentType: newMenu.fileType,
    ACL: 'public-read',
  };

  try {
    const signedRequest = s3.getSignedUrl('putObject', s3Params);
    const url = `https://${S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/${newMenu.category_eng}/${newMenu.fileName}.${newMenu.fileType}`;

    const category = await categoryModel.findOne({
      attributes: ['id'],
      where: { name_eng: newMenu.category_eng },
    });
    const categoryId = category.dataValues.id;

    try {
      await menuModel.create({
        name_kor: newMenu.name_kor,
        name_eng: newMenu.name_eng,
        price: newMenu.price,
        description: newMenu.description,
        img_url: url,
        sales_stat: 1,
        category_id: categoryId,
        delay_time: 0,
      });

      ctx.status = 201;
      ctx.body = {
        success: true,
        data: {
          signedRequest,
          url,
        },
      };
    } catch (e) {
      ctx.status = 422;
      ctx.body = { success: false, error: 'Could not create requested menu.' };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { success: false, error: 'Could not get signed url from S3.' };
  }
};