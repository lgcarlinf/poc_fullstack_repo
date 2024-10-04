import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'Hello, this is your JSON response on Express' });
});

app.listen(port, () => {
    console.log(`App escuchando en http://localhost:${port}`);
});
