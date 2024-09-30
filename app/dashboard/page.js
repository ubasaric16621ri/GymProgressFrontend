// app/dashboard/page.js
"use client"; // Oznaka za klijentsku komponentu

import { useEffect } from 'react';

export default function Dashboard() {
    useEffect(() => {
        // Ovdje možete dodati logiku da se podaci učitaju na osnovu tokena
    }, []);

    const handleLogout = () => {
        // Ukloni tokene iz local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Preusmeri na login stranicu
        window.location.href = '/login';
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-800 to-black">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                BASARIQ FITNESS
            </h1>
            <button onClick={handleLogout} className="bg-red-500 text-white rounded py-2 px-4">
                Logout
            </button>
        </div>
    );
}
