import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Login from './screens/Login';
// TODO: descomente o import abaixo quando a tela Personagens estiver pronta
import Personagens from './screens/Personagens';
import { Equipe, Tela } from './types';
import { removerToken } from './services/storage';

export default function App() {
  const [telaAtual, setTelaAtual] = useState<Tela>(Tela.LOGIN);
  const [nomeJogador, setNomeJogador] = useState('');
  const [equipeJogador, setEquipeJogador] = useState<Equipe>(Equipe.VERMELHO);

  const handleLogin = (nome: string, equipe: Equipe): void => {
    setNomeJogador(nome);
    setEquipeJogador(equipe);
    setTelaAtual(Tela.PERSONAGENS);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await removerToken();
    } catch {
      // ignora erro no logout
    } finally {
      setNomeJogador('');
      setEquipeJogador(Equipe.VERMELHO);
      setTelaAtual(Tela.LOGIN);
    }
  };

  const corEquipe = equipeJogador === Equipe.VERMELHO ? '#ef4444' : '#3b82f6';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {telaAtual === Tela.LOGIN && (
          <Login onLogin={handleLogin} />
        )}
        {telaAtual === Tela.PERSONAGENS && (
          // TODO: Substitua este placeholder pela tela Personagens
          <Personagens
            nomeJogador={nomeJogador}
            equipe={equipeJogador}
            onLogout={handleLogout}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  placeholderTitulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  placeholderEquipe: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  placeholderTexto: {
    color: '#6b7280',
    fontSize: 16,
    marginTop: 24,
  },
  botaoSair: {
    backgroundColor: '#4b5563',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 32,
  },
  botaoSairTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
