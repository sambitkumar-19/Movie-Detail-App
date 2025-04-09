import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import MovieCard from "./MovieCard";
import "./styles.css";
import "./Home.css";

const API_KEY = "a79058790909931553ea092218e6a690";
const BASE_URL = "https://api.themoviedb.org/3";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovies = async (page = 1, query = "") => {
        setLoading(true);
        setError(null);

        try {
            const url = query
                ? `${BASE_URL}/search/movie`
                : `${BASE_URL}/movie/popular`;

            const { data } = await axios.get(url, {
                params: { api_key: API_KEY, query, page },
            });

            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (err) {
            setError("Failed to fetch movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => {
            setCurrentPage(1); // Reset page on new search
            fetchMovies(1, query);
        }, 500),
        []
    );

    useEffect(() => {
        debouncedSearch(search);
    }, [search]);

    useEffect(() => {
        fetchMovies(currentPage, search);
    }, [currentPage]);

    return (
        <div className="home">
            <input
                type="text"
                placeholder="Search Movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-box"
            />

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="movie-container">
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    !loading && <p>No movies found.</p>
                )}
            </div>

            <div className="pagination">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1 || loading}>
                    Prev
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || loading}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;
