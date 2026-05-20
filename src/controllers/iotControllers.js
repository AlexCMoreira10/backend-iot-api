import { salvarDadosIot } from '../services/iotService.js';

export const salvarDados = async (req, res) => {
    try {
        const { temperatura, umidade, anguloServo, mensagemLCD } = req.body;

        // Validação dos dados que chegam do Frontend
        if (temperatura === undefined || umidade === undefined || anguloServo === undefined || mensagemLCD === undefined) {
            return res.status(400).json({ error: 'Dados incompletos. Verifique se todos os campos foram preenchidos.' });
        }

        // Criando o objeto
        const dados = { 
            temperatura, 
            umidade, 
            anguloServo, 
            mensagemLCD, 
            timestamp: new Date() 
        };

        // CORREÇÃO: Chamando a função correta do Service para evitar o loop infinito
        const resultado = await salvarDadosIot(dados); 
        
        return res.status(201).json(resultado);
    } catch (error) {
        console.error('Erro ao salvar dados no controller:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar dados' });
    }
};