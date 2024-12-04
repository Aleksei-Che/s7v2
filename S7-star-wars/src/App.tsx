import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/home';
import StarshipDetailPage from './pages/StrarshipDetailPage';
import StarshipsPage from './pages/StarshipsPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'

const App = () => {
  return (
      <Router>
          <Header />
          <main className="bg-gray-900 text-gray-200 min-h-screen">
              <Routes>
                  <Route path="/" element={<Home />} /> 
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route element={<ProtectedRoute />}>
                        <Route path="/starships" element={<StarshipsPage />} /> 
                        <Route path="/starships/:id" element={<StarshipDetailPage />} /> 
                  </Route>
              </Routes>
          </main>
      </Router>
  );
};

export default App;
