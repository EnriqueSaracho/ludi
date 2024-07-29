import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../components/constants";

// Page: Home.
export const Home = () => {
  // State Object: keeps track of all games in database.
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  // Function for retrieving info from IGDB database
  const fetchInfo = async (search = "") => {
    try {
      // Fetching initial data for all search results
      const gameRecords = await fetchInitialData(search);

      if (gameRecords && gameRecords.length > 0) {
        // Fetching cover image_ids for all results
        await fetchCoverImageIds(gameRecords);

        console.log(gameRecords); // Console log array of results
        setGames(gameRecords);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInitialData = async (search) => {
    const response = await axios.post(`${apiUrl}/igdb/games`, {
      query: search,
    });

    return response.data.map((record) => ({
      id: record.id,
      name: record.name,
      cover: {
        id: record.cover,
      },
    }));
  };

  const fetchCoverImageIds = async (gameRecords) => {
    const coversResponse = await axios.post(`${apiUrl}/igdb/covers`, {
      query: gameRecords,
    });

    coversResponse.data.forEach((coverRecord) => {
      const game = gameRecords.find(
        (gameRecord) => gameRecord.cover.id === coverRecord.id
      );
      if (game) {
        game.cover.image_id = coverRecord.image_id;
      }
    });
  };

  // Search functions
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };
  const handleSearch = (event) => {
    fetchInfo(event);
  };

  return (
    <div className="home">
      <div className="page-bar"></div>

      <div className="home-title">
        <h1>Ludi</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search games..."
        />
        <button type="submit">Search</button>
      </form>

      <ul className="title-list">
        {games.map((game) => (
          <li key={game.id} className="thumbnail">
            <Link to={`/game/${game.id}`} className="thumbnail-link">
              {game.cover.image_id ? (
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                  alt={game.name}
                  className="thumbnail-img"
                />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
