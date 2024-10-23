export interface User {
  id: string;
  nombre: string;
  email: string;
  photoUrl?: string;
  emailVerificado: boolean;
  idCuenta: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: number;
  nombre: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id?: number;
  idCuenta: number;
  tipoTransaccion: "INGRESO" | "EGRESO";
  descripcion?: string;
  monto: number;
  fecha: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
