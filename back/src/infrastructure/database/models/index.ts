import { Sequelize } from "sequelize";
import { initAccountModel, defineAccountRelations } from "./AccountModel";
import { initTransactionModel } from "./TransactionModel";
import { TransactionModel } from "./TransactionModel";
import { defineUserRelations, initUserModel, UserModel } from "./UserModel";

export const initModels = (sequelize: Sequelize) => {
  // Inicializar modelos
  initUserModel(sequelize);
  initAccountModel(sequelize);
  initTransactionModel(sequelize);

  // Definir relaciones
  defineUserRelations();
  defineAccountRelations(UserModel, TransactionModel);
};
