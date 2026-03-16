import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { ALUNOS_PERMITIDOS } from './dados/alunosPermitidos';
import { Equipe, Lutador } from './types';
import { SessaoManager, authMiddleware, AuthenticatedRequest } from './middleware/auth';
import lutadoresJson from '../data/lutadores.json';

export const app = express();

app.use(cors());
app.use(express.json());

// ─── POST /api/login (pronto da Aula 03) ───────────────────────────────────
app.post('/api/login', (req, res) => {
  const { nomeUsuario, rm } = req.body;

  if (!nomeUsuario || !rm) {
    return res.status(400).json({ error: 'nomeUsuario e rm sao obrigatorios' });
  }

  const tokenExistente = SessaoManager.buscarPorRm(rm);
  if (tokenExistente) {
    SessaoManager.remover(tokenExistente);
  }

  const alunoPermitido = ALUNOS_PERMITIDOS.find(a => a.rm === rm);
  if (!alunoPermitido) {
    return res.status(401).json({ error: 'RM nao encontrado na lista de alunos' });
  }

  const equipe = SessaoManager.atribuirEquipe();
  const token = randomUUID();

  SessaoManager.criar(token, {
    rm,
    nome: nomeUsuario.trim(),
    equipe,
  });

  res.json({
    token,
    aluno: {
      nome: nomeUsuario.trim(),
      rm,
      equipe,
    },
  });
});

// ─── TODO: GET /api/personagens ─────────────────────────────────────────────
// Crie uma rota GET que retorna a lista de personagens.
// O JSON já está importado como `lutadoresJson` (veja o import no topo).
//
// Dica: res.json() envia um array ou objeto como resposta JSON.
//
// TODO: descomente e complete a rota abaixo
// app.get('/api/personagens', (_req, res) => {
//   // Retorne lutadoresJson como resposta
// });

// ─── Rotas protegidas (prontas da Aula 03) ─────────────────────────────────
app.get('/api/alunos', authMiddleware, (_req, res) => {
  const alunos = SessaoManager.listarTodos();
  res.json({ alunos, total: alunos.length });
});

app.get('/api/me', authMiddleware, (req: AuthenticatedRequest, res) => {
  res.json({ aluno: req.usuario });
});

app.post('/api/logout', authMiddleware, (req: AuthenticatedRequest, res) => {
  if (req.usuario) {
    SessaoManager.remover(req.usuario.rm);
  }
  res.json({ message: 'Logout realizado com sucesso' });
});

// ─── GET /health ────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
