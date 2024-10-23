import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { TransactionController } from "../controllers/transactionController";
import { AuthService } from "../services/authService";
import { TransactionService } from "../services/transactionService";
import { UserRepository } from "../infrastructure/repositories/userRepository";
import { TransactionRepository } from "../infrastructure/repositories/transactionRepository";
import { authMiddleware } from "../middlewares/authMiddleware";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Inicializar dependencias
const userRepository = new UserRepository();
const transactionRepository = new TransactionRepository();
const authService = new AuthService(userRepository);
const transactionService = new TransactionService(transactionRepository);

// Inicializar controllers
const authController = new AuthController(authService);
const transactionController = new TransactionController(transactionService);

// Auth routes
router.post(
  "/auth/session",
  authMiddleware(authService),
  authController.handleSession
);

// Transaction routes
router.post(
  "/transactions",
  authMiddleware(authService),
  transactionController.create
);

router.get(
  "/transactions/:accountId",
  authMiddleware(authService),
  transactionController.getByAccount
);

export default router;
