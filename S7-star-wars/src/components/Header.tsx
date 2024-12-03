import img from "../assets/img/image.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Navbar from "./Navbar";

const Header = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        alert("Logged out!");
    };
    return (
        <header className="bg-gray-900 text-gray-200">
            <div className="py-4 px-6 flex relative">
                <div className="absolute left-0 top-0">
                    <span className="block text-sm text-gray-400">Social Icons</span>
                </div>
                <div className="mx-auto">
                    <Link to="/"><img src={img} alt="Star Wars Logo" className="h-12 w-auto" />
                    </Link>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex mr-6">
    {!user ? (
        <>
            <Link to="/login" className="text-sm text-gray-400 hover:text-white mr-4">
                Log In
            </Link>
            <Link to="/register" className="text-sm text-gray-400 hover:text-white">
                Sign Up
            </Link>
        </>
    ) : (
        <>
            <span className="text-sm text-gray-400 mr-4">Welcome, {user.email}</span>
            <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-white"
            >
                Log Out
            </button>
        </>
    )}
</div>

            </div>
            <Navbar />
        </header>
    );
};

export default Header;
