// src/app/models/user-data.model.ts

export interface UserData {
    Id: string;
    Correo_E: string;
    Nombre: string;
    Apellidos?: string; // Opcional si no siempre está presente
    Rol: string;
    Telefono: string;
  }
  