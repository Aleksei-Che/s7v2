import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

interface AccordionProps {
  user: { email: string | null } | null;
  handleLogout: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleAccordion}
        className="text-white hover:text-gray-400 focus:outline-none p-2"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
      </button>

      <div
        className={`transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col space-y-2 py-2 px-4 border-b border-gray-700">
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
                Welcome, {user.email ?? "User"}
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

        <div className="flex flex-col space-y-4 py-2 px-4 border-b border-gray-700">
          <Link to="/" className="text-sm text-gray-400 hover:text-white">
            Home
          </Link>
          <Link
            to="/starships"
            className="text-sm text-gray-400 hover:text-white"
          >
            Starships
          </Link>
        </div>

        <div className="flex justify-center space-x-4 py-2">
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
      </div>
    </div>
  );
};

export default Accordion;
