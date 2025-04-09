import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import "./MovieDetail.css";

const API_KEY = "a79058790909931553ea092218e6a690";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY, append_to_response: "videos,credits" },
        });

        setMovie(response.data);

        // Find the first official trailer
        const trailer = response.data.videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="movie-details">Loading...</div>;

  return (
    <div className="movie-details">
      {/* Left Side - Poster & Trailer */}
      <div className="movie-details-left">
        <div
          className="movie-details-poster"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && trailerKey ? (
            <iframe
              className="movie-trailer"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
            ></iframe>
          ) : (
            <img src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
          )}
        </div>
        <div className="movie-details-content">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* Right Side - Cast */}
      <div className="movie-details-right">
        <h3>Cast</h3>
        <div className="cast-container">
          {movie.credits.cast.slice(0, 10).map((actor) => (
            <Link key={actor.id} to={`/cast/${actor.id}`} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_URL}${actor.profile_path}`
                    : "https://via.placeholder.com/100x150?text=No+Image"
                }
                alt={actor.name}
              />
              <p className="cast-name">{actor.name}</p>
              <p className="cast-character">as {actor.character}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
