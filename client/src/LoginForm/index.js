import React from "react";
import axios from 'axios';
import './index.css';

const backendUrl = "http://localhost:8000";
const loginEndpoint = `${backendUrl}/authentication_token`;

function LoginForm() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginResponse = await axios.post(loginEndpoint, {
            email, password
        });

        // Add token to localstorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.data.token}`;
        localStorage.setItem('token', loginResponse.data.token)
        
        // Add user email to localstorage
        const userDatas = JSON.parse(loginResponse.config.data)
        localStorage.setItem('email', userDatas.email)

        // Redirect to home page
        window.location.pathname = "/"
    };

    return (
        <>
        <h1>Connexion à la plateforme</h1>
        <hr/>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                    <input type="text" placeholder="Identifiant" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Mot de passe</label>
                    <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="submit" value="Valider" />
            </form>
        </>
    );
}

export default LoginForm;
