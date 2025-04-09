import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import "./TrailerPage.css";

const API_KEY = "a79058790909931553ea092218e6a690";
const BASE_URL = "https://api.themoviedb.org/3";

const TrailerPage = () => {
  const { id } = useParams();
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {  // ✅ Fixed
          params: { api_key: API_KEY },
        });

        const trailerData = response.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        setTrailer(trailerData ? trailerData.key : null);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [id]);

  if (!trailer) return <div>Trailer not available</div>;

  return (
    <div className="trailer-page">
      <iframe
        className="trailer-video"
        src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
        title="Movie Trailer"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default TrailerPage;
