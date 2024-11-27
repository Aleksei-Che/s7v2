import img from "../assets/img/image.png";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <header className="bg-gray-900 text-gray-200">
            <div className="py-4 px-6 flex relative">
                <div className="absolute left-0 top-0">
                    <span className="block text-sm text-gray-400">Social Icons</span>
                </div>
                <div className="mx-auto">
                    <img src={img} alt="Star Wars Logo" className="h-12 w-auto" />
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex mr-6">
                    <button className="text-sm text-gray-400 hover:text-white mr-4">Log In</button>
                    <button className="text-sm text-gray-400 hover:text-white">Sign Up</button>
                </div>
            </div>

            {/* Navbar под Header */}
            <Navbar />
        </header>
    );
};

export default Header;
