import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount;

if (process.env.NODE_ENV === 'production') {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    throw new Error('A variável FIREBASE_SERVICE_ACCOUNT_JSON não está definida na Vercel.');
  }
  // Em produção na Vercel, lê direto da String da Variável de Ambiente
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
} else {
  // NO MODO LOCAL:
  // Em vez de usar require(), vamos ler o arquivo JSON de forma segura e nativa do ES Modules
  const { default: fs } = await import('fs');
  const { default: path } = await import('path');
  
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'src/config/serviceAccountKey.json';
  const resolvedPath = path.resolve(process.cwd(), serviceAccountPath);
  
  // Lemos o arquivo como texto e convertemos para objeto, evitando o 'require'
  const fileContent = fs.readFileSync(resolvedPath, 'utf8');
  serviceAccount = JSON.parse(fileContent);
}

// Inicializa o Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
export const db = admin.firestore();