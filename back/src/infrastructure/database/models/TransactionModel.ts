import { Model, DataTypes, Sequelize } from "sequelize";
import { Transaction } from "../../../types/entities";

export class TransactionModel extends Model<Transaction> {}

export const initTransactionModel = (sequelize: Sequelize) => {
  TransactionModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idCuenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_cuenta", // Nombre en la base de datos
        references: {
          model: "cuentas",
          key: "id",
        },
      },
      tipoTransaccion: {
        type: DataTypes.ENUM("INGRESO", "EGRESO"),
        allowNull: false,
        field: "tipo_transaccion", // Nombre en la base de datos
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      // Eliminar estos campos, se manejan automáticamente con timestamps: true
      // createdAt: "",
      // updatedAt: "",
    },
    {
      sequelize,
      tableName: "transacciones", // Usar tableName en lugar de modelName
      timestamps: true,
      underscored: true, // Esto convertirá camelCase a snake_case
    }
  );
};
