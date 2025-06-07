import express from "express";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

// accepts data in json format
app.use(express.json());

let teaData = [];
let nextId = 1;

app.get("/", (req, res) => {

    res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Tea Manager</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5dc;
                    margin: 0;
                    padding: 2rem;
                    text-align: center;
                }
                h1 {
                    color: #5b3a29;
                }
                p {
                    font-size: 1.2rem;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to Tea Manager</h1>
            <p>Manage your favorite teas using this API.</p>
            <p>Available routes:</p>
            <ul style="list-style-type: none;">
                <li>GET /teas</li>
                <li>GET /teas/:id</li>
                <li>POST /teas</li>
                <li>PUT /teas/:id</li>
                <li>DELETE /teas/:id</li>
            </ul>
        </body>
        </html>
    `);
});

// post request
// add a new tea
app.post("/teas", (req, res) => {
    const { name, price } = req.body;
    const newTea = {
        id: nextId++,
        name,
        price,
    };
    teaData.push(newTea);
    res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
    res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
    const tea = teaData.find((t) => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    res.status(200).send(tea);
});

// update a tea with id
app.put("/teas/:id", (req, res) => {
    const teaId = parseInt(req.params.id);
    const tea = teaData.find((t) => t.id === teaId);

    if (!tea) {
        return res.status(404).send("Tea not found");
    }

    const { name, price } = req.body; // get the new data
    // update the existing data
    tea.name = name;
    tea.price = price;

    res.status(200).send(tea);
});

// delete a tea with id
app.delete("/teas/:id", (req, res) => {
    const teaId = parseInt(req.params.id);
    const index = teaData.findIndex((t) => t.id === teaId);

    if (index === -1) {
        return res.status(404).send(`No tea found with id ${teaId}`);
    }
    const teaName = teaData[index].name;

    teaData.splice(index, 1);
    res.status(200).send(`${teaName} with id ${teaId} deleted!`);
});

// get request
// app.get("/", (req, res) => {
//     res.send("Hello from Adwait!!")
// })

// app.get("/ice-tea", (req, res) => {
//     res.send("What ice tea would you prefer Adwait?")
// })

// app.get("/linkedIn", (req, res) => {
//     res.send("adp-pythonDev")
// })

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
});
