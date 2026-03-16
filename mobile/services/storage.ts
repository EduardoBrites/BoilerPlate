import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FormLogin {
  nome: string;
  rm: string;
}

const CHAVES = {
  TOKEN: 'token',
  FORM_LOGIN: 'formLogin',
} as const;

export async function salvarToken(token: string): Promise<void> {
  await AsyncStorage.setItem(CHAVES.TOKEN, token);
}

export async function obterToken(): Promise<string | null> {
  return AsyncStorage.getItem(CHAVES.TOKEN);
}

export async function removerToken(): Promise<void> {
  await AsyncStorage.removeItem(CHAVES.TOKEN);
}

export async function salvarFormLogin(form: FormLogin): Promise<void> {
  await AsyncStorage.setItem(CHAVES.FORM_LOGIN, JSON.stringify(form));
}

export async function obterFormLogin(): Promise<FormLogin | null> {
  const json = await AsyncStorage.getItem(CHAVES.FORM_LOGIN);
  return json ? (JSON.parse(json) as FormLogin) : null;
}
