import { Request, Response, NextFunction } from 'express';
import { Equipe, Sessao } from '../types';

export interface AuthenticatedRequest extends Request {
  usuario?: Sessao;
}

export class SessaoManager {
  private static sessoes = new Map<string, Sessao>();

  static criar(token: string, dados: Sessao): void {
    this.sessoes.set(token, dados);
  }

  static buscar(token: string): Sessao | undefined {
    return this.sessoes.get(token);
  }

  static remover(token: string): boolean {
    return this.sessoes.delete(token);
  }

  static listarTodos(): Sessao[] {
    return [...this.sessoes.values()];
  }

  static contarPorEquipe(): { vermelho: number; azul: number } {
    const todas = this.listarTodos();
    return {
      vermelho: todas.filter(s => s.equipe === Equipe.VERMELHO).length,
      azul: todas.filter(s => s.equipe === Equipe.AZUL).length,
    };
  }

  static atribuirEquipe(): Equipe {
    const { vermelho, azul } = this.contarPorEquipe();
    return vermelho <= azul ? Equipe.VERMELHO : Equipe.AZUL;
  }

  static buscarPorRm(rm: string): string | undefined {
    for (const [token, sessao] of this.sessoes) {
      if (sessao.rm === rm) {
        return token;
      }
    }
    return undefined;
  }
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token nao fornecido. Faca login primeiro.' });
    return;
  }

  const token = authHeader.slice(7);
  const usuario = SessaoManager.buscar(token);

  if (!usuario) {
    res.status(401).json({ error: 'Token invalido ou expirado.' });
    return;
  }

  req.usuario = usuario;
  next();
}
