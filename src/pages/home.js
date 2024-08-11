import { useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchInitialSearchData,
  fetchCoverImageIds,
} from "../components/functions";
import { IoIosSearch } from "react-icons/io";

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
      <div className="py-8 flex justify-center">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex items-center border border-gray-300 focus-within:ring-2 focus-within:ring-primary">
            <IoIosSearch className="text-gray-500 bg-white h-10 w-10 p-2" />
            <input
              className="focus:outline-none text-black h-10 w-64"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Search
          </button>
        </form>
      </div>

      <ul className="title-list">
        {games.map((game) => (
          <li key={game.id} className="thumbnail">
            <Link to={`/game/${game.id}`} className="thumbnail-link">
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
