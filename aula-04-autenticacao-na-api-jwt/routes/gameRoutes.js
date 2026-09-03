// Endpoints (rotas) de Games
import express from 'express';
const gameRoutes = express.Router();
// Importando o controller
import gameController from '../controllers/gameController.js';

// Endpoint (rota) para listar todos os jogos
gameRoutes.get("/games", gameController.getAllGames)

// Endpoint (rota) para cadastrar um jogo
gameRoutes.post("/games", gameController.createGame)

// Endpoint (rota) para deletar um jogo
gameRoutes.delete("/games/:id", gameController.deleteGame)

// Endpoint (rota) para alterar um jogo
gameRoutes.put("/games/:id", gameController.updateGame)

// Endpoint (rota) para listar um jogo único
gameRoutes.get("/games/:id", gameController.getOneGame)

export default gameRoutes;