// Serviços de Games
// Aqui será inserido os métodos para Ler, cadastrar, Alterar e Excluir games

// Importando o Model
import Game from "../models/Games.js"

class gameService {
    // Serviço para ler os jogos
    async getAll() {
        // Tentativa da promessa (sucesso)
        try {
            //  o método .find() do mongoose busca registros
            const games = await Game.find()
            return games
            // Caso ocorra um erro será executado o catch
        } catch (error) {
            console.log(error)
        }
    }

    async Create(title, year, platform, price) {
        try {
            const newGame = new Game({
            title,
            year,
            platform,
            price
            })
        await newGame.save();
        } catch (error) {
            console.log(error);
        }
    }

    async Delete(id) {
        try {
            await Game.findByIdAndDelete(id)
            //O mpetodo findByIdAndDelete() do mongoose busca um registro pela ID e deleta
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, title, year, platform, price) {
        try {
            await Game.findByIdAndUpdate(id, {
                title,
                year,
                platform,
                price
            })
        } catch (error) {
            console.log(error);
        }
    }
}


// Exportando a classe
export default new gameService()

