import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import "./MovieCard.css"

const IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <img
          src={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
          alt={movie.original_title}
          className="movie-poster"
        />
        <p className="movie-title">{movie.original_title}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
