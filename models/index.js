const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  dialectOptions: dbConfig.ssl ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {},

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import all models here
db.user = require("./user.js")(sequelize, Sequelize);
db.yuvakPostions = require("./yuvakPositions.js")(sequelize, Sequelize);
db.session = require("./session.js")(sequelize, Sequelize);
db.question = require("./question.js")(sequelize, Sequelize);
db.option = require("./option.js")(sequelize, Sequelize);
db.answer = require("./answer.js")(sequelize, Sequelize);

// Associate models if associations are defined
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
