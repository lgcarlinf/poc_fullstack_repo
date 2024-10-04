import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'Hello, this is your JSON response on Express' });
});

app.listen(port, () => {
    console.log(`App escuchando en http://localhost:${port}`);
});
