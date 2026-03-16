export enum Equipe {
  VERMELHO = 'VERMELHO',
  AZUL = 'AZUL',
}

export interface Sessao {
  rm: string;
  nome: string;
  equipe: Equipe;
}

export interface Lutador {
  id: string;
  nome: string;
  anime: string;
  imagemUrl: string;
}
