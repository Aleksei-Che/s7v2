import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebaseConfig";


const ProtectedRoute = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setIsAuthenticated(!!user);
            setIsLoading(false);
        });
        return ()=> unsubscribe();
    }, []);

    if (isLoading) {
        return <p className="text-center text-gray-400">Loading...</p>
    }
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{from: location}} replace />
    )
}

export default ProtectedRoute;