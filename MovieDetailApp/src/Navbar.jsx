import React, { useState, useEffect } from "react";
import "./styles.css";

const Navbar = () => {
  const storedTheme = localStorage.getItem("theme");
  const [darkMode, setDarkMode] = useState(storedTheme ? storedTheme === "dark" : true); // default to dark if not set

  useEffect(() => {
    // Clear both mode classes
    document.body.classList.remove("dark-mode", "light-mode");

    // Apply selected theme
    document.body.classList.add(darkMode ? "dark-mode" : "light-mode");

    // Save to localStorage
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="navbar">
      <h1>🎬 Movie Details Hub</h1>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode((prev) => !prev)}
        aria-label="Toggle theme"
      >
        {darkMode ? "🌞 Light" : "🌙 Dark"}
      </button>
    </nav>
  );
};

export default Navbar;
