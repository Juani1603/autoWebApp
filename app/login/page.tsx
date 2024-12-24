"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Credenciales de usuario
  const validCredentials = {
    username: process.env.NEXT_PUBLIC_USERNAME,
    password: process.env.NEXT_PUBLIC_PASSWORD,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === validCredentials.username && password === validCredentials.password) {
      router.push("/dashboard"); // Redirige a la sección de publicaciones
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4 text-center">Acceso Empleados</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
