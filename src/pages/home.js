import { useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchInitialSearchData,
  fetchCoverImageIds,
} from "../components/functions";

// Page: Home.
export const Home = () => {
  // State Object: keeps track of all games in database.
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  // Function for retrieving info from IGDB database
  const fetchInfo = async (search = "") => {
    try {
      // Fetching initial data for all search results
      const gameRecords = await fetchInitialSearchData(search);

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

  // Search functions
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };
  const handleSearch = (event) => {
    fetchInfo(event);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search games..."
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Search
        </button>
      </form>

      <ul className="title-list">
        {games.map((game) => (
          <li key={game.id} className="thumbnail">
            <Link to={`/game/${game.id}`} className="thumbnail-link">
              {/* {game.cover.image_id ? (
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                  alt={game.name}
                  className="thumbnail-img"
                />
                ) : null} */}
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                alt={game.name}
                className="thumbnail-img"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
