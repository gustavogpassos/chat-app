import { useState } from 'react'
import './styles.css'
import { api } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleRegister = async () => {
        await api.post('/api/users/', {
            username, password, name,
        }).then((response) => {
            window.alert('Registered, proceed to login!');
            window.location.href = '/';
        }).catch((error) => {
            window.alert('Error during registration');
        });
    };

    return (
        <section className='register-page'>
            <div className="register">
                <h1>Register</h1>
                <input type="text" className='input' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className='input' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className='input' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleRegister}>Register</button>
                <p id='error'></p>
                <p>Already have an account? <a href='#' onClick={() => navigate('/')}>Sign in</a></p>
            </div>
        </section>
    )
}