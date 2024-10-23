import express from "express";
import cors from "cors";
import * as admin from "firebase-admin";
import routes from "./routes";
import { initModels } from "./infrastructure/database/models";
import { sequelize } from "./infrastructure/database/config";
import { Sequelize } from "sequelize";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initializeFirebase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDatabase();
  }

  private initializeFirebase() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use("/api", routes);
  }

  private async initializeDatabase() {
    try {
      initModels(sequelize);

      await sequelize.authenticate();
      console.log("Conexión establecida correctamente.");

      await sequelize.sync({ force: true });
      console.log("Base de datos sincronizada.");
    } catch (error) {
      console.error("Error al inicializar la base de datos:", error);
      throw error;
    }
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
