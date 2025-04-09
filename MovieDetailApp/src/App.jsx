import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import MovieDetails from "./MovieDetails";
import TrailerPage from "./TrailerPage";
import CastDetails from "./CastDetails";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/trailer/:id" element={<TrailerPage />} />
          <Route path="/cast/:id" element={<CastDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
