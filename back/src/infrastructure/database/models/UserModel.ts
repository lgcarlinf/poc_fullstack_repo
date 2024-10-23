import { Model, DataTypes, Sequelize } from "sequelize";
import { User } from "../../../types/entities";
import { AccountModel } from "./AccountModel";

export class UserModel extends Model<User> {}

export const initUserModel = (sequelize: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      nombre: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      photoUrl: DataTypes.STRING,
      emailVerificado: DataTypes.BOOLEAN,
      idCuenta: {
        type: DataTypes.INTEGER,
        references: {
          model: "cuentas",
          key: "id",
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "usuarios",
      timestamps: true, // Sequelize manejará createdAt y updatedAt automáticamente
    }
  );
};

export const defineUserRelations = () => {
  UserModel.belongsTo(AccountModel, { foreignKey: "idCuenta" });
};
