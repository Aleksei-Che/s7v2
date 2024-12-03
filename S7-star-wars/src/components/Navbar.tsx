import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 border-t border-b border-gray-400 text-gray-300 px-6">
            <div className="flex justify-center">
                <Link to="/" className="px-4 py-2 border-l border-r">Home</Link>
                <Link to="/starships" className="px-4 py-2 border-r">Starships</Link>
            </div>
            
        </nav>
    );
};

export default Navbar;
