import axios from "axios";
import { SERVER_CONFIG } from "../config";
import { obterToken } from "./storage";
import { Equipe, Lutador } from "../types";

interface LoginResponse {
  token: string;
  aluno: {
    nome: string;
    rm: string;
    equipe: Equipe;
  };
}

export async function login(
  nomeUsuario: string,
  rm: string
): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    `${SERVER_CONFIG.url}/api/login`,
    { nomeUsuario, rm }
  );
  return response.data;
}

// TODO: Implemente a funcao getPersonagens
// Ela deve fazer um GET para /api/personagens e retornar Lutador[]
//
// Dica: use axios.get<Lutador[]>() para tipar a resposta
//
export async function getPersonagens(): Promise<Lutador[]> {
  const response = await axios.get<Lutador[]>(
    `${SERVER_CONFIG.url}/api/personagens`
  );
  return response.data;
}

export async function logout(): Promise<void> {
  const token = await obterToken();
  if (token) {
    await axios.post(
      `${SERVER_CONFIG.url}/api/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
}