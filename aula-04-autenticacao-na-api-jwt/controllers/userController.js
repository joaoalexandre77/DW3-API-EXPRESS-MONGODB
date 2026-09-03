// userController.js:
// Importando o Service
import userService from "../services/userService.js";
// importando o JSONWEBTOKEN    
import jwt from 'jsonwebtoken'
//riando um segredo para o token
const JWTSecret = ' apigamesscret'

// FUNÇÃO PARA CADASTRAR UM USUÁRIO
const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        await userService.Create(email, password);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        // Cod. 201: CREATED
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

// FUNÇÃO PARA LOGAR UM USUÁRIO
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email != undefined) {
            // Buscando o usuário pelo e-mail
            const user = await userService.getOne(email)
            //verificando se o usuario existe
            if (user != undefined) {
                //veriifcando se a senha está correta
                if (user.password == password) {
                    //se a senha estiver correta, gera o TOKEN
                    jwt.sign({ id: user._id, email: user.email }, JWTSecret, { expiresIn: '48h' }, (error, token) => {
                            //tratando o erro durante a geração do token
                            if (error) {
                                res.status(400).json({ error: " não foi possivel gerar o token de autentificação" })
                                //caso sucesso
                            } else {
                                res.status(200).json({ token })
                            }
                        })
                } else {
                    res.status(401).json({ error: "credenciais inavalidas. tente novamente" })
                    //cod 401 - não autorizado
                }
                // caso usuario não encontrado
            } else {
                res.status(404).json({ error: "O usuario informado não existe" })

            }
            //caso email nao preenchido

        } else {
            res.status(400).json({ error: "o email inviado é invalido" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}

export default { createUser, loginUser }