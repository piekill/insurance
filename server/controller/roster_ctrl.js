const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000,
  },
  operatorsAliases: false,
});
const rosterModel = sequelize.import('../model/roster');

module.exports = {
  query(req, res) {
    return rosterModel.findAll({
      where: {
        grade: req.query.grade,
        class: req.query.class,
      },
    }).then((d) => {
      res.send({
        result_code: 'success',
        data: d,
      });
    });
  },
  update(req, res) {
    return rosterModel.bulkCreate(req.body, {
      fields: ['id', 'register'],
      updateOnDuplicate: ['register'],
    }).then((d) => {
      res.send({
        result_code: d.length === req.body.length ? 'success' : 'fail',
      });
    });
  },
  add(req, res) {
    return rosterModel.create(req.body, {
      fields: ['name', 'gender', 'birthday', 'nid', 'guardian', 'phone', 'grade', 'class', 'register'],
    }).then((d) => {
      res.send({
        result_code: d !== null ? 'success' : 'fail',
        data: {
          id: d !== null ? d.id : null,
        },
      });
    });
  },
  change(req, res) {
    return rosterModel.update(req.body, {
      where: {
        id: req.body.id,
      },
      fields: ['name', 'gender', 'birthday', 'nid', 'guardian', 'phone', 'grade', 'class', 'register'],
    }).then((d) => {
      res.send({
        result_code: d[0] === 1 ? 'success' : 'fail',
      });
    });
  },
  classlist(req, res) {
    return rosterModel.aggregate('class', 'DISTINCT', { plain: false })
      .then((d) => {
        res.send({
          result_code: 'success',
          data: d,
        });
      });
  },
};
