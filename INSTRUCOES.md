# Aula 04 — Configuração do Projeto

## 1. Instalar dependências

Na pasta raiz deste projeto, rode:

```bash
npm run init
```

Isso instala automaticamente as dependências do `backend/` e do `mobile/`.

---

## 2. Configurar o IP do servidor

Abra `mobile/config.ts` e substitua o IP pelo IP do seu computador na rede Wi-Fi:

```typescript
export const SERVER_CONFIG = {
  url: 'http://SEU_IP_AQUI:3000',  // ← troque pelo seu IP
};
```

**Como descobrir seu IP:**
- **macOS/Linux:** `ifconfig | grep "inet "` no terminal
- **Windows:** `ipconfig` no cmd, procure "Endereço IPv4"

> O celular e o computador precisam estar na **mesma rede Wi-Fi**.

---

## 3. Rodar o projeto

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Mobile:**
```bash
cd mobile
npm run lan
```

> `npm run lan` é o mesmo que `npx expo start --lan --clear`. O modo LAN garante que o celular conecte pelo IP da rede local — necessário para funcionar na rede da sala de aula.

Escaneie o QR Code com o **Expo Go** no celular.

---

## O que você vai construir

O catálogo horizontal de personagens:

1. **Backend:** Rota `GET /api/personagens` que retorna os 20 personagens de `data/lutadores.json`
2. **Mobile:** Função `getPersonagens()` em `services/api.ts`
3. **Mobile:** Tela `Personagens.tsx` com `FlatList` horizontal, imagens e seleção por toque
4. **Mobile:** Conectar LOGIN → PERSONAGENS em `App.tsx`

## Dados de teste

Use um dos RMs do arquivo `backend/dados/alunosPermitidos.ts` para fazer login.
