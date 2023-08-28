/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "branch",
    {
      branchId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "BranchId",
      },
      name: {
        type: DataTypes.CHAR(60),
        allowNull: true,
        field: "Name",
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "Address",
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "Phone",
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        field: "Active",
        defaultValue: 1,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: "Latitude",
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: "Longitude",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "CreatedAt",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "UpdatedAt",
      },
    },
    {
      sequelize,
      tableName: "branch",
    }
  );
};
