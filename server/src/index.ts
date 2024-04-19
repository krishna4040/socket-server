import { Socket, Server } from "socket.io";
import express, { Request, Response } from 'express'
import { createServer } from 'http'
import {config} from 'dotenv'

config()
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        credentials: true
    }
});

io.on('connection', (socket: Socket) => {
    console.log('a user connected with socket id', socket.id);

    socket.on('send-message', (data) => {
        io.emit('recieve-message', data)
    })
});

app.use(express.json());

httpServer.listen(process.env.PORT, () => console.log(`app listening successfully on ${process.env.PORT}`));
app.get('/', (req: Request, res: Response) => res.send('<h1>Home page for api</h1>'))