import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import { FormLogin, obterFormLogin, salvarFormLogin, salvarToken } from '../services/storage';
import { login } from '../services/api';
import { Equipe } from '../types';
import axios from 'axios';

interface LoginProps {
  onLogin: (nome: string, equipe: Equipe) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [form, setForm] = useState<FormLogin>({ nome: '', rm: '' });
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    obterFormLogin().then(salvo => {
      if (salvo) setForm(salvo);
    });
  }, []);

  const handleEntrar = async (): Promise<void> => {
    if (!form.nome.trim() || !form.rm.trim()) return;
    setCarregando(true);
    try {
      await salvarFormLogin(form);

      const data = await login(form.nome.trim(), form.rm.trim());
      await salvarToken(data.token);
      onLogin(data.aluno.nome, data.aluno.equipe);
    } catch (error: unknown) {
      const mensagem = axios.isAxiosError(error)
        ? error.response?.data?.error ?? error.message
        : 'Erro ao conectar ao servidor';
      Alert.alert('Erro', mensagem);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.titulo}>Arena Typescript</Text>
        <Text style={styles.subtitulo}>Loteria de Personagens</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Seu Nome</Text>
          <TextInput
            style={styles.input}
            value={form.nome}
            onChangeText={texto => setForm(f => ({ ...f, nome: texto }))}
            placeholder="Digite seu nome"
            placeholderTextColor="#9ca3af"
            autoCapitalize="words"
            editable={!carregando}
          />

          <Text style={styles.label}>RM</Text>
          <TextInput
            style={styles.input}
            value={form.rm}
            onChangeText={texto => setForm(f => ({ ...f, rm: texto }))}
            placeholder="Digite seu RM"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            editable={!carregando}
          />

          <TouchableOpacity
            style={[
              styles.botao,
              (!form.nome.trim() || !form.rm.trim() || carregando) && styles.botaoDesabilitado,
            ]}
            onPress={handleEntrar}
            disabled={!form.nome.trim() || !form.rm.trim() || carregando}
          >
            {carregando
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.botaoTexto}>Entrar na Arena</Text>
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.instrucao}>
          Use seu RM da FIAP para entrar
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  titulo: { fontSize: 48, fontWeight: 'bold', color: '#f20587', marginBottom: 8 },
  subtitulo: { fontSize: 20, color: '#f2b705', marginBottom: 32 },
  form: { width: '100%', maxWidth: 400 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#f2b705', marginBottom: 8 },
  input: {
    backgroundColor: '#1f2937',
    borderWidth: 2,
    borderColor: '#4b5563',
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    color: '#fff',
    marginBottom: 24,
  },
  botao: { backgroundColor: '#f20587', padding: 18, borderRadius: 8, alignItems: 'center' },
  botaoDesabilitado: { backgroundColor: '#6b7280' },
  botaoTexto: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  instrucao: { marginTop: 32, color: '#6b7280', fontSize: 14, textAlign: 'center' },
});
