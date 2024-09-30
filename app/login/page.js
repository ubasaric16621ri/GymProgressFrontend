"use client"; // Ova linija čini komponentu klijentskom

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Ažurirano importovanje

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        // Logika za prijavu
        const response = await fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            router.push('/dashboard'); // Redirekcija na dashboard nakon prijave
        } else {
            console.error('Login failed');
            // Možeš dodati neku poruku o grešci ovde
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 to-black">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Prijavi se</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-white mb-1" htmlFor="username">Korisničko ime</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white mb-1" htmlFor="password">Lozinka</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition duration-200"
                    >
                        Prijavi se
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-400">
                    Nemaš nalog? <a href="/register" className="text-purple-400 hover:underline">Registruj se</a>
                </p>
            </div>
        </div>
    );
}
