import { Transaction } from "../../types/entities";
import { TransactionModel } from "../database/models/TransactionModel";

export interface ITransactionRepository {
  create(transaction: Partial<Transaction>): Promise<Transaction>;
  findByAccount(accountId: number): Promise<Transaction[]>;
}

export class TransactionRepository implements ITransactionRepository {
  async create(transaction: Partial<Transaction>): Promise<Transaction> {
    const createdTransaction = await TransactionModel.create(
      transaction as any
    );
    return createdTransaction.get({ plain: true }) as Transaction;
  }

  async findByAccount(accountId: number): Promise<Transaction[]> {
    const transactions = await TransactionModel.findAll({
      where: { idCuenta: accountId },
      order: [["fecha", "DESC"]],
    });
    return transactions.map(
      (transaction) => transaction.get({ plain: true }) as Transaction
    );
  }
}
