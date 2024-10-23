import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
import { AuthService } from "../services/authService";

export const authMiddleware = (authService: AuthService) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = req.headers.authorization?.split("Bearer ")[1];

      if (!token) {
        res.status(401).json({ error: "Token no proporcionado" });
        return;
      }

      const decodedToken = await authService.verifyToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }
  };
};
