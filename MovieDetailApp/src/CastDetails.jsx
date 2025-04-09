import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import "./CastDetail.css"

const API_KEY = "a79058790909931553ea092218e6a690";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const CastDetails = () => {
  const { id } = useParams();
  const [castDetails, setCastDetails] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/person/${id}`, {
          params: { api_key: API_KEY, append_to_response: "movie_credits" },
        });

        setCastDetails(response.data);
        setRelatedMovies(response.data.movie_credits?.cast || []);
      } catch (error) {
        console.error("Error fetching cast details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCastDetails();
  }, [id]);

  if (loading) return <div className="cast-details">Loading...</div>;

  return (
    <div className="cast-details">
      {castDetails && (
        <>
          <h1>{castDetails.name}</h1>
          <img
            src={
              castDetails.profile_path
                ? `${IMAGE_URL}${castDetails.profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={castDetails.name}
          />
          <p>{castDetails.biography || "No biography available."}</p>

          <div className="related-movies">
            <h2>Related Movies</h2>
            <div className="related-movies-container">
              {relatedMovies.slice(0, 10).map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <div className="related-movie-card">
                    <img
                      src={
                        movie.poster_path
                          ? `${IMAGE_URL}${movie.poster_path}`
                          : "https://via.placeholder.com/200x300?text=No+Image"
                      }
                      alt={movie.title}
                    />
                    <p>{movie.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CastDetails;
