import { db } from '../config/firebase.js';

// Deixamos o nome da coleção em uma constante limpa
const NOME_COLECAO = 'iot';

export const salvarDadosIot = async (dados) => {
    try {
        // CORREÇÃO: Usamos o db do Firebase para buscar a coleção e aí sim chamamos o .add()
        const docRef = await db.collection(NOME_COLECAO).add(dados);
        
        return {
            id: docRef.id,
            ...dados
        };
    } catch (error) {
        console.error("Erro ao inserir no Firestore:", error);
        throw error;
    }
}