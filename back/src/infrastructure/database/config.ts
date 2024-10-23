import { Sequelize } from "sequelize";
import { Options } from "sequelize/types";

// Configuración de entorno
const env = process.env.NODE_ENV || "development";
const isProd = env === "production";
console.log(
  "%c process.env.DB_NAME :",
  "background-color:#048A81",
  process.env.DB_NAME
);
// Configuración básica de la base de datos
const dbConfig: Options = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "banking_db",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  dialect: "postgres",

  // Configuración de pool de conexiones
  pool: {
    max: isProd ? 20 : 5, // Máximo número de conexiones en el pool
    min: 0, // Mínimo número de conexiones en el pool
    acquire: 30000, // Tiempo máximo en ms para obtener una conexión
    idle: 10000, // Tiempo máximo en ms que una conexión puede estar inactiva
  },

  // Opciones de logging
  logging: isProd ? false : console.log, // Deshabilitar logs en producción

  // Opciones generales
  define: {
    timestamps: true, // Añadir createdAt y updatedAt automáticamente
    underscored: true, // Usar snake_case en lugar de camelCase para nombres de columnas
    freezeTableName: true, // No pluralizar nombres de tablas
    charset: "utf8",
    collate: "utf8_general_ci",
  },

  // Opciones de dialecto específicas para PostgreSQL
  dialectOptions: {
    ssl: isProd
      ? {
          require: true,
          rejectUnauthorized: false, // Necesario para algunas plataformas cloud
        }
      : false,
    dateStrings: true,
    typeCast: true,
  },
};

// Clase de configuración de base de datos
class Database {
  private static instance: Sequelize;

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(dbConfig);
    }
    return Database.instance;
  }

  // Método para probar la conexión
  public static async testConnection(): Promise<void> {
    try {
      const sequelize = Database.getInstance();
      await sequelize.authenticate();
      console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
      throw error;
    }
  }

  // Método para sincronizar modelos
  public static async sync(force: boolean = false): Promise<void> {
    try {
      const sequelize = Database.getInstance();
      await sequelize.sync({ force });
      console.log("Modelos sincronizados correctamente.");
    } catch (error) {
      console.error("Error al sincronizar modelos:", error);
      throw error;
    }
  }

  // Método para cerrar la conexión
  public static async closeConnection(): Promise<void> {
    try {
      if (Database.instance) {
        await Database.instance.close();
        console.log("Conexión a la base de datos cerrada correctamente.");
      }
    } catch (error) {
      console.error("Error al cerrar la conexión:", error);
      throw error;
    }
  }
}

// Exportar la instancia de Sequelize
export const sequelize = Database.getInstance();

// Exportar la clase Database para uso de sus métodos estáticos
export default Database;
