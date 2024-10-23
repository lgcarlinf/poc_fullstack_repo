import * as admin from "firebase-admin";
import { IUserRepository } from "../infrastructure/repositories/userRepository";
import { User } from "../types/entities";

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(token);
  }

  async handleAuthUser(decodedToken: admin.auth.DecodedIdToken): Promise<User> {
    let user = await this.userRepository.findById(decodedToken.uid);

    if (!user) {
      // Crear nuevo usuario con cuenta
      user = await this.userRepository.create({
        id: decodedToken.uid,
        nombre: decodedToken.name || "",
        email: decodedToken.email || "",
        photoUrl: decodedToken.picture,
        emailVerificado: decodedToken.email_verified || false,
      });
    }

    return user;
  }
}
