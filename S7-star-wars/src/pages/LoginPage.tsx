import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebaseConfig";
import { useNavigate, useLocation, Link } from "react-router-dom";


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            navigate(from);
        } catch (error: any) {
            setError(error.message)
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200">
            <h1 className="text-3xl mb-4">Login</h1>
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
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
                Login
            </button>

            <p className="text-gray-400 mt-4">
                Don't have an account?{""}
                <Link to="/register" className="text-blue-500  hover:underline"> Register here </Link>
            </p>




        </div>
    );
};

export default LoginPage;