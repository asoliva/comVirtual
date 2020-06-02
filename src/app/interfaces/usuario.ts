export interface Usuario {
  nombre: string;
  apellidos: string;
  dni: string;
  password: string;
  movil: string;
  email: string;
  acceso: Acceso;
  direccion: string;
  idGenero: string;
  idAuth: string;
}

export type Acceso = '0' | '1' | '2';
export interface User {
  uid: string;
  nombre: string;
  apellidos: string;
  dni: string;
  email: string;
  movil: string;
  emailVerified: boolean;
  password: string;
  direccion: string;
  idGenero: string;
  acceso: Acceso;
}
