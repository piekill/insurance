const Sequelize = require('sequelize');
const config = require('./config');
const moment = require('moment');

moment.locale('zh-cn');

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
  /* eslint no-param-reassign:["error", { "ignorePropertyModificationsFor": ["elem"] }] */
  overview(req, res) {
    return sequelize.query('select grade, class, count(*) as total, sum(register) as registered, ' +
      'max(unix_timestamp(update_time)) as update_time ' +
      'from roster group by grade, class order by grade, class',
    { type: sequelize.QueryTypes.SELECT })
      .then((d) => {
        d.forEach((elem) => {
          const t = moment.unix(elem.update_time);
          elem.update_time = t.format('ll LTS');
        });
        res.send({
          result_code: 'success',
          data: d,
        });
      });
  },
  export_file(req, res) {
    return rosterModel.findAll({
      where: { register: 1 },
      attributes: { exclude: ['id', 'creation_time', 'update_time', 'register'] },
      order: [['grade', 'ASC'], ['class', 'ASC']],
      raw: true,
    }).then((d) => {
      res.send({
        result_code: 'success',
        data: d,
      });
    });
  },
};
