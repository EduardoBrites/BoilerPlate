import 'dotenv/config';
import { createServer } from 'http';
import { app } from './rotas';

const PORTA = parseInt(process.env.PORTA_HTTP || '3000');
const server = createServer(app);

server.listen(PORTA, () => {
  console.log(`Arena Typescript Backend rodando na porta ${PORTA}`);
  console.log(`http://localhost:${PORTA}`);
});
