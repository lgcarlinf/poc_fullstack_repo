import { ITransactionRepository } from "../infrastructure/repositories/transactionRepository";
import { Transaction } from "../types/entities";

export class TransactionService {
  constructor(private transactionRepository: ITransactionRepository) {}

  async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
    return this.transactionRepository.create({
      ...data,
      fecha: new Date(),
    });
  }

  async getAccountTransactions(accountId: number): Promise<Transaction[]> {
    return this.transactionRepository.findByAccount(accountId);
  }
}
