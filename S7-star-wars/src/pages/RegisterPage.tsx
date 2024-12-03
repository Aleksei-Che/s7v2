import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebaseConfig"
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registration successful!");
            navigate("/");
        } catch (error:any) {
            setError(error.message)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200">
        <h1 className="text-3xl mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-2 bg-gray-800 rounded"
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 bg-gray-800 rounded"
        />
        <button
            onClick={handleRegister}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
            Register
        </button>
    </div>
    )

};

export default RegisterPage;