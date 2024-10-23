import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private authService: AuthService) {}

  handleSession = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.handleAuthUser(req.user);
      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: "Error procesando sesión" });
    }
  };
}
