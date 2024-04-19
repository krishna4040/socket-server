import React, { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketProvider'

interface Message {
    message: string
}

const Home = () => {
    const socket = useSocket()
    const [msg, setMsg] = useState('')

    const clickHandler = () => {
        const payload: Message = { message: 'Hello from Socket io server' }
        socket.emit('send-message', JSON.stringify(payload))
    }

    useEffect(() => {
        socket.on('recieve-message', (data) => {
            const payload = JSON.parse(data) as Message
            setMsg(payload.message)
        })

        return () => {
            socket.off('recieve-message')
        }
    }, [])

    return (
        <div>
            <button onClick={clickHandler}>Say Hello</button>
            <p>{msg}</p>
        </div>
    )
}

export default Home