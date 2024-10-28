import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css'

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (username == '' || password == '') {
            alert("Preencha todos os campos");
            return;
        }
        const url = import.meta.env.VITE_API_URL;

        axios.post(`${url}/api/users/login`, {
            username: username,
            password: password
        }).then((response) => {
            console.log(response);
            localStorage.setItem('userData', JSON.stringify(response.data.data));
            window.location.href = '/';
            navigate('/');
        }).catch((error) => {
            const { data } = error.response;
            console.log('data: ', data);
            document.getElementById('error').innerHTML = data.message;
            console.log(error);
        })

    }

    return (
        <section className='login-page'>
            <div className="login">
                <h1>ChatParty</h1>
                <input type="text" className='input' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className='input' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
                <p id='error'></p>

                <p>Don't have an account? <a href='#' onClick={() => navigate('/register')}>Register now!</a></p>
            </div>
        </section>
    )
}