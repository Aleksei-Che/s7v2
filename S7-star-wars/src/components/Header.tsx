import img from "../assets/img/image.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Accordion from "./Accordion";
import Navbar from "./Navbar";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out!");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-gray-900 text-gray-200">
      <div className="py-4 px-6 flex relative">
        {/* Соцсети */}
        <div className="hidden md:flex space-x-4 absolute left-2 top-2">
          <a
            href="https://www.facebook.com/starwars.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a
            href="https://www.instagram.com/starwars/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a
            href="https://twitter.com/starwars"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a
            href="https://www.youtube.com/@StarWars"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </a>
        </div>

        <div className="mx-auto">
          <Link to="/">
            <img src={img} alt="Star Wars Logo" className="h-12 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex absolute right-2 top-2 space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-400 hover:text-white"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-sm text-gray-400 hover:text-white"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-400">
                Welcome, {user?.email ?? "User"}
              </span>
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

      <div className="md:hidden">
        <Accordion
          user={user ? { email: user.email } : null}
          handleLogout={handleLogout}
        />
      </div>
      <div className="hidden md:block">
        <Navbar />
      </div>
    </header>
  );
  
};

export default Header;
