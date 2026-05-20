import admin from 'firebase-admin';
import { createRequire } from 'module';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount;

// 1. VERIFICAÇÃO SE ESTÁ NA VERCEL (PRODUÇÃO)
if (process.env.NODE_ENV === 'production') {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    throw new Error('A variável FIREBASE_SERVICE_ACCOUNT_JSON não está definida na Vercel.');
  }
  // Na Vercel, vamos ler o conteúdo do JSON diretamente como texto e convertê-lo em objeto
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
} else {
  // 2. MODO LOCAL (O que você já testou e funcionou)
  const require = createRequire(import.meta.url);
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (!serviceAccountPath) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_PATH não está definido. Crie um arquivo .env com o caminho para serviceAccountKey.json'
    );
  }

  const resolvedPath = path.isAbsolute(serviceAccountPath)
    ? serviceAccountPath
    : path.resolve(process.cwd(), serviceAccountPath);

  serviceAccount = require(resolvedPath);
}

// Inicializa o Firebase com a credencial definida (seja local ou produção)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
export const db = admin.firestore();