"use client"; // Ova linija čini komponentu klijentskom

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Proveri da li koristiš ispravnu putanju

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Inicijalizuj router

    const handleRegister = async (event) => {
        event.preventDefault();
        
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Ako je registracija uspešna, preusmerite na dashboard
            router.push('/dashboard'); // Preusmeravanje na dashboard
        } else {
            // Obrada grešaka
            const error = await response.json();
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 to-black">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Registruj se</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-white mb-1" htmlFor="username">Korisničko ime</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white mb-1" htmlFor="password">Lozinka</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-500 transition duration-200"
                    >
                        Registruj se
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-400">
                    Već imaš nalog? <a href="/login" className="text-purple-400 hover:underline">Prijavi se</a>
                </p>
            </div>
        </div>
    );
}
