export default function ChatList({ online, currentUser, joinChat }) {
    return (
        <div className="chat-list">
            <p>Online</p>
            <ul>
                {online ? online.map((user) => {
                    return user.userId != currentUser ? (
                        <li key={user.id}><a href="#" onClick={() => joinChat(user.userId)}>{user.username}</a></li>
                    ) : null
                }) : (<li>no users online</li>)}
            </ul>

        </div>
    )
}