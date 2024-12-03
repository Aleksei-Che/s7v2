import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200">
          <h1 className="text-4xl font-bold mb-6">Welcome to Star Wars App</h1>
          <p className="text-lg mb-6">Explore the galaxy's starships and their details.</p>
          <Link to="/starships"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    View Starships
                </Link>
        </div>
    );
};

export default Home;