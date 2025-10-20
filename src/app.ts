import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express(); 
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola, Express con TypeScript!');
});

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    console.log(`Documentación de Swagger en http://localhost:${PORT}/api-docs`);
});