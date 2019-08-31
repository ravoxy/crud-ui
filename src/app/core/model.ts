export class Perfil {
  id: number;
  nome: string;
}

export class Aparelho {
  id: number;
  descricao: string;
  codigo: string;
}

export class Usuario {
  id: number;
  nome: string;
  login: string;
  email: string;
  senha: string;
  dataCriacao: Date;
  tempoExpiracaoSenha: number;
  codigoAutorizacao: string;
  statusUsuario: string;
  codigoPessoa: number;
  perfil = new Perfil();
  aparelhol = new Aparelho();
}
