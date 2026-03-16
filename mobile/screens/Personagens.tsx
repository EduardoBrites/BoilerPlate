import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
// TODO: descomente o import abaixo quando a funcao getPersonagens estiver pronta
// import { getPersonagens } from '../services/api';
import { Lutador, Equipe } from '../types';

// ─── Dados simulados (remover quando conectar ao backend) ───────────────────
const PERSONAGENS_SIMULADOS: Lutador[] = [
  {
    id: '1',
    nome: 'Naruto Uzumaki',
    anime: 'Naruto',
    imagemUrl: 'https://cdn.myanimelist.net/images/characters/2/284121.jpg',
  },
  {
    id: '2',
    nome: 'Son Goku',
    anime: 'Dragon Ball',
    imagemUrl: 'https://cdn.myanimelist.net/images/characters/9/46566.jpg',
  },
  {
    id: '3',
    nome: 'Sasuke Uchiha',
    anime: 'Naruto',
    imagemUrl: 'https://cdn.myanimelist.net/images/characters/9/131317.jpg',
  },
];

// ─── Props ──────────────────────────────────────────────────────────────────
interface PersonagensProps {
  nomeJogador: string;
  equipe: Equipe;
  onLogout: () => void;
}

export default function Personagens({ nomeJogador, equipe, onLogout }: PersonagensProps) {
  const [personagens, setPersonagens] = useState<Lutador[]>([]);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarPersonagens();
  }, []);

  const carregarPersonagens = async (): Promise<void> => {
    try {
      // TODO: Substitua os dados simulados pela chamada real ao backend
      // const dados = await getPersonagens();
      const dados = PERSONAGENS_SIMULADOS;

      setPersonagens(dados);
    } catch (error: unknown) {
      Alert.alert('Erro', 'Nao foi possivel carregar os personagens');
    } finally {
      setCarregando(false);
    }
  };

  const personagemSelecionado = personagens.find(p => p.id === selecionado);

  const corEquipe = equipe === Equipe.VERMELHO ? '#ef4444' : '#3b82f6';

  // TODO: Implemente a funcao renderPersonagem
  // Ela recebe { item } do tipo { item: Lutador } e retorna React.JSX.Element
  //
  // Cada carta deve ter:
  // 1. TouchableOpacity com onPress que chama setSelecionado(item.id)
  // 2. Image com source={{ uri: item.imagemUrl }}
  // 3. Text com item.nome
  // 4. Text com item.anime
  // 5. Borda destacada quando item.id === selecionado (use corEquipe)
  //
  const renderPersonagem = ({ item }: { item: Lutador }): React.JSX.Element => {
    const estaSelecionado = item.id === selecionado;

    return (
      <TouchableOpacity
        style={[
          styles.carta,
          // TODO: adicione borda colorida quando estaSelecionado for true
          // Dica: estaSelecionado && { borderColor: corEquipe, borderWidth: 3 }
        ]}
        onPress={() => setSelecionado(item.id)}
        activeOpacity={0.7}
      >
        {/* TODO: Adicione o componente Image aqui */}
        {/* Dica: <Image source={{ uri: item.imagemUrl }} style={styles.imagem} resizeMode="cover" /> */}

        <Text style={styles.nomePersonagem} numberOfLines={1}>
          {item.nome}
        </Text>
        <Text style={styles.animePersonagem} numberOfLines={1}>
          {item.anime}
        </Text>
      </TouchableOpacity>
    );
  };

  if (carregando) {
    return (
      <View style={styles.containerCarregando}>
        <ActivityIndicator size="large" color="#f20587" />
        <Text style={styles.textoCarregando}>Carregando personagens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header (pronto) */}
      <View style={styles.header}>
        <View>
          <Text style={styles.bemVindo}>Ola, {nomeJogador}!</Text>
          <Text style={[styles.equipeTexto, { color: corEquipe }]}>
            Equipe {equipe}
          </Text>
        </View>
        <TouchableOpacity style={styles.botaoSair} onPress={onLogout}>
          <Text style={styles.botaoSairTexto}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Titulo (pronto) */}
      <Text style={styles.tituloSecao}>Personagens da Arena</Text>
      <Text style={styles.subtituloSecao}>
        {personagens.length} lutadores — deslize para explorar
      </Text>

      {/* Detalhe do selecionado (pronto) */}
      {personagemSelecionado ? (
        <View style={styles.detalhe}>
          <Image
            source={{ uri: personagemSelecionado.imagemUrl }}
            style={styles.imagemDetalhe}
            resizeMode="cover"
          />
          <View style={styles.infoDetalhe}>
            <Text style={styles.nomeDetalhe}>{personagemSelecionado.nome}</Text>
            <Text style={styles.animeDetalhe}>{personagemSelecionado.anime}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.detalhe}>
          <Text style={styles.instrucaoSelecao}>
            Toque em um personagem para ver os detalhes
          </Text>
        </View>
      )}

      {/* TODO: Adicione o FlatList horizontal aqui */}
      {/* Dica:
        <FlatList
          data={personagens}
          renderItem={renderPersonagem}
          keyExtractor={(item: Lutador) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listaContainer}
          style={styles.lista}
        />
      */}
    </View>
  );
}

// ─── Estilos (pronto) ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 16,
  },
  containerCarregando: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    color: '#9ca3af',
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  bemVindo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  equipeTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  botaoSair: {
    backgroundColor: '#4b5563',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  botaoSairTexto: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tituloSecao: {
    color: '#f20587',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  subtituloSecao: {
    color: '#6b7280',
    fontSize: 14,
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 16,
  },
  lista: {
    flexGrow: 0,
  },
  listaContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  carta: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    marginHorizontal: 8,
    padding: 12,
    width: 160,
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#374151',
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#374151',
  },
  nomePersonagem: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  animePersonagem: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  detalhe: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 120,
  },
  imagemDetalhe: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#374151',
  },
  infoDetalhe: {
    flex: 1,
    marginLeft: 16,
  },
  nomeDetalhe: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  animeDetalhe: {
    color: '#9ca3af',
    fontSize: 14,
    marginTop: 4,
  },
  instrucaoSelecao: {
    color: '#6b7280',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
});
