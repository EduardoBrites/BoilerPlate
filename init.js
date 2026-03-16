#!/usr/bin/env node
// init.js — instala dependências em todos os subprojetos
const { execSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

const subprojetos = ['backend', 'mobile'].filter((d) =>
  existsSync(path.join(__dirname, d, 'package.json')),
);

console.log('\n╔══════════════════════════════════════╗');
console.log('║  Arena IoT — Instalando dependências  ║');
console.log('╚══════════════════════════════════════╝\n');

for (const dir of subprojetos) {
  console.log(`📦 Instalando ${dir}/...`);
  execSync('npm install', {
    cwd: path.join(__dirname, dir),
    stdio: 'inherit',
  });
  console.log(`✅ ${dir} pronto\n`);
}

console.log('╔══════════════════════════════════════╗');
console.log('║  Tudo instalado!                      ║');
console.log('║  Veja INSTRUCOES.md para continuar.   ║');
console.log('╚══════════════════════════════════════╝\n');
