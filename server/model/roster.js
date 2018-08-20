module.exports = function (sequelize, DataTypes) {
  return sequelize.define('roster', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(32),
    },
    gender: {
      type: DataTypes.STRING(16),
    },
    birthday: {
      type: DataTypes.STRING(32),
    },
    nid: {
      type: DataTypes.STRING(32),
    },
    guardian: {
      type: DataTypes.STRING(32),
    },
    phone: {
      type: DataTypes.STRING(64),
    },
    grade: {
      type: DataTypes.STRING(16),
    },
    class: {
      type: DataTypes.STRING(16),
    },
    register: {
      type: DataTypes.BOOLEAN,
    },
    creation_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    tableName: 'roster',
    timestamps: false,
  });
};
