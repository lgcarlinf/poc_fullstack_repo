import { Model, DataTypes, Sequelize, ModelStatic } from "sequelize";
import { Account } from "../../../types/entities";

export class AccountModel extends Model<Account> {}

export const initAccountModel = (sequelize: Sequelize) => {
  AccountModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "cuentas",
      timestamps: true, // Sequelize manejará createdAt y updatedAt automáticamente
    }
  );
};

export const defineAccountRelations = (
  UserModel: ModelStatic<Model>,
  TransactionModel: ModelStatic<Model>
) => {
  AccountModel.hasOne(UserModel, { foreignKey: "idCuenta" });
  AccountModel.hasMany(TransactionModel, { foreignKey: "idCuenta" });
};
