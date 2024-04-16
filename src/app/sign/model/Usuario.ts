export class Usuario {
    constructor(
      public nombre: string,
      public apellido: string,
      public email: string,
      public password: string,
      public rol: string = 'usuario',
      public id_usuario?: number
    ) {}
  }
  