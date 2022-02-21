import express from "express";
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import { createRoute } from './routes/create.js'
dotenv.config()

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json({ limit: '1mb', extended: true }));
app.use('/', createRoute);

app.all('*', (req, res) => {
    res.status(405)
    res.send({ error: 'method not allowed' }).end()
})

const start = async () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log("Listening on PORT: " + process.env.PORT);
            console.log("http://localhost:" + process.env.PORT);
        });
    } catch (error) {
        console.log(error);
    }
};
start();