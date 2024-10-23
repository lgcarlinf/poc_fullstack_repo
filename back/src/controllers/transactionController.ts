import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  create = async (req: Request, res: Response) => {
    try {
      const transaction = await this.transactionService.createTransaction(
        req.body
      );
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: "Error creando transacción" });
    }
  };

  getByAccount = async (req: Request, res: Response) => {
    try {
      const transactions = await this.transactionService.getAccountTransactions(
        parseInt(req.params.accountId)
      );
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo transacciones" });
    }
  };
}
