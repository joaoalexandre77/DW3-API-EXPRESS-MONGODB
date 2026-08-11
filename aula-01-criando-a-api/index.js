import e from "express";

const app = e();

app.use(e.json());

app.get("/", (req, res) => {
    const games = [
        {
            titulo: "FIFA 2019",
            ano: 2019,
            plataforma: "Xbox",
            preco: 198.99
        },
        {
            titulo: "The Sims",
            ano: 2016,
            plataforma: "PC",
            preco: 149.00
        },
        {
            titulo: "CS GO",
            ano: 2012,
            plataforma: "PC",
            preco: 89.00
        }
    ]
    res.json(games)
})

app.get("/filmes", (req, res) => {
    const filme = 
    [
        {
            titulo: "Velozes e furiosos",
            duracao: "3 horas"
        }
    ]
    res.json(filme)
})

const port = 8080;

app.listen(port, (error) => {
    if (error) console.log(`Ocorreu um erro ao iniciar a API! ${error}`);
    console.log(`API iniciado com sucesso na porta ${port}`);
})