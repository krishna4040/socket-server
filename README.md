# 🌐 Hello World Socket Server Template

Welcome to the Hello World Socket Server Template! This repository serves as a template for quickly setting up a socket server using Vite for the front end and Express for the back end.

## 🚀 Features

1. **Typescript Setup**: The project is set up with Typescript to ensure type safety and better code organization.

2. **Environment Variables**: Environment variables are used to maintain ease of integration and configuration flexibility.

3. **Socket Provider and useSocket Hook**: Includes setup for Socket Provider and useSocket hook on the front end, allowing easy integration and usage of sockets.

4. **React Router DOM Setup**: React Router DOM is set up for performing routing while maintaining ease of use.

5. **Tailwind Setup**: Tailwind css setup for quick styling

6. **Loading**: Provides a loader component which is a very huge task

## 🛠️ Code Blocks

### Backend (Express)

```typescript
import { Socket, Server } from "socket.io";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { config } from "dotenv";

config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

io.on("connection", (socket: Socket) => {
	console.log("a user connected with socket id", socket.id);

	socket.on("send-message", (data) => {
		io.emit("recieve-message", data);
	});
});

app.use(express.json());

httpServer.listen(process.env.PORT, () =>
	console.log(`app listening successfully on ${process.env.PORT}`)
);
app.get("/", (req: Request, res: Response) =>
	res.send("<h1>Home page for api</h1>")
);
```

### Frontend

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import Loading from '../components/Loading'

export const SocketContext = createContext<Socket | null>(null)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {

    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const connection = io(import.meta.env.VITE_BASE_URL)
        setSocket(connection)

        return () => {
            connection.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {socket ? children : <Loading />}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const socket = useContext(SocketContext)
    if (!socket) throw new Error('socket not found')
    return socket
}
```

## 📝 Getting Started

1. **Clone this repository**

```
  git clone https://github.com/krishna4040/socket-server.git
```

2. **Install dependencies**

```
  npm install
  cd server && npm install
```

3. **Set up environment variables** for both BE and FE

4. **Start the server**:

-   Frontend:

    ```
      npm run dev
    ```

-   Backend:

    ```
      cd server && npm run dev
    ```

That's it! You're ready to start building with the Hello World Socket Server Template.

Happy Coding! 🎉
