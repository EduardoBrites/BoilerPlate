export enum Equipe {
  VERMELHO = 'VERMELHO',
  AZUL = 'AZUL',
}

export enum Tela {
  LOGIN = 'LOGIN',
  PERSONAGENS = 'PERSONAGENS',
}

export interface Lutador {
  id: string;
  nome: string;
  anime: string;
  imagemUrl: string;
}
