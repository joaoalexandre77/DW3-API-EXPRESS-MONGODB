// Controller de games
// O controller tratará as requisições do cliente
// Importando o service
import gameService from '../services/gameService.js';

//importando o objectID do mongoDB
import { ObjectId } from 'mongodb';

// Função que irá tratar a requisição para LISTAR os jogos
const getAllGames = async (req, res) => {
    try {
        const games = await gameService.getAll()
        res.status(200).json({ games: games })
        // Cod. 200 - OK - Requisição feita com sucesso
    } catch (error) {
        console.log(error)
        // Tratando a resposta que api irá enviar em caso de erro
        res.status(500).json({ error: 'Ocorreu um erro ao listar os jogos. Erro interno do servidor.' })
    }
}
//Função que irá tratar a requisição para CADASTRAR os jogos
const createGame = async (req, res) => {
    try {
        //Coletando dados enviados (formulário da requisição, etc) e gravando nas variaveis
        const {title, year, price, descriptions} = req.body;
        //Enviando dados para o Service cadastrar
        await gameService.Create(title, year, price, descriptions);
        res.status(201).json({ message: "Jogo cadastrado com sucesso!"});
        //cod. 201 (CREATED)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Erro interno do servidor."});
    }
}

const deleteGame = async (req, res) => {
    try {
        //Fazendo a validação do objectID
        const id = req.params.id;
        if(ObjectId.isValid(id)){
            await gameService.Delete(id);
            res.sendStatus(204);
        } else {
            res.status(400).json({error: "Requisição mal formada, ID Inválido"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Erro interno do servidor"});
    }
}

const updateGame = async (req, res) => {
    try {
        const id = req.params.id;
        if(ObjectId.isValid(id)) {
            const {title, year, price, descriptions} = req.body;
            await gameService.update(id, title, year, price, descriptions);
            res.status(200).json({Message: "Registro alterado"});
        } else {
            res.status(400).json({error: "Requisição mal formada, ID Inválido"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erro interno do servidor"});
    }
}

const getOneGame = async (req, res) => {
    try {
        const id = req.params.id;
        if(ObjectId.isValid(id)) {
            const game = await gameService.getOne(id);
            if(!game) {
                res.status(404).json({error: "jogo não encontrado"});
            } else {
                res.status(200).json({game});
            }
        } else {
            res.status(400).json({error: "O ID informado é inválido"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Erro interno do servidor."});
    }    
}
// Exportando as funções
export default { getAllGames, createGame, deleteGame, updateGame, getOneGame }