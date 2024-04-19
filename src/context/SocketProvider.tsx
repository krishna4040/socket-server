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