import userService from "../services/userService.js";

const createUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        await userService.create(email, password);
        res.status(201).json({message: 'Usuario cadastrado com sucesso'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Erro interno do servidor.'});
    }
};

export default {createUser};