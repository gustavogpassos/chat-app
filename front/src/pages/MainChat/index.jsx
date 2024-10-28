import io from 'socket.io-client'
import './styles.css'
import { useEffect, useRef, useState } from 'react'
import ChatList from '../../components/ChatList'
import { api } from '../../utils/api'

export default function MainChat() {
    const [chatList, setChatList] = useState([])
    const [usersList, setUsersList] = useState([])
    const [chatInfo, setChatInfo] = useState([])
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
    const [message, setMessage] = useState('')
    const [currentChat, setCurrentChat] = useState(null)

    const socket = useRef()

    useEffect(() => {
        socket.current = io('http://localhost:5000')
        socket.current.on('connect', () => {
            console.log('Connected to server')
        })
        socket.current.emit('join server', userData)
        socket.current.on('message', (data) => {
            console.log('Received message from server:', data)
            const newUsersList = usersList.filter((user) => user.userId !== data.userId)
            setUsersList(newUsersList)
            socket.emit('message', 'Hello from client')
        })

        socket.current.on('new user', (data) => {
            console.log('Received users from server:', data)
            setUsersList(data)
        })

        socket.current.on('new message', (data) => {
            console.log('Received message from server:', data)
            setCurrentChat(data)
        })

    }, [])

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        const getChats = async () => {
            const response = await api.get(`/api/chats/`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            })
            setChatList(response.data)
        }
        getChats()
    }, [userData])

    const joinChat = (receiver) => {
        socket.current.emit('join chat', { sender: userData.user._id, receiver })
        socket.current.on('chat joined', (data) => {
            console.log('Received chat info from server:', data)
            setCurrentChat(data)
            console.log('chatInfo: ', currentChat)
        })
    }

    const sendMessage = () => {
        socket.current.emit('send message', { chatId: currentChat._id, message, sender: userData.user._id })
    }

    const handleLogout = () => {
        localStorage.removeItem('userData')
        window.location.href = '/'
    }

    return (
        <div className="main-chat">
            <h1>Main Chat</h1>
            <div className='chat-header'>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className='chat-box'>
                <ChatList
                    online={usersList}
                    currentUser={userData.user._id}
                    joinChat={joinChat} />
                <div className='chat-display'>
                    {currentChat ? (
                        <>
                            <div className='messages'>
                                <ul style={{ overflowY: 'scroll', display: 'flex', flexDirection: 'column', listStyle: 'none', gap:'5px', textAlign:'start' }}>
                                    {currentChat.messages ? currentChat.messages.map((message) => {
                                        return (
                                            <li key={message.id}>
                                                {message.message}
                                            </li>
                                        )
                                    }) : null}
                                </ul>
                            </div>
                            <div className="send-box">
                                <input name='message' type='text' placeholder='Type a message' value={message} onChange={(e) => setMessage(e.target.value)} />
                                <button onClick={() => sendMessage()}>Send</button>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}