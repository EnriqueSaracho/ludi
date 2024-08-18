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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full mx-auto
        max-w-fit"
        >
          <div className="flex items-center focus-within:ring-2 focus-within:ring-primary-light w-full sm:w-auto">
            <IoIosSearch className="text-gray-500 bg-white h-10 w-10 p-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
              className="focus:outline-none text-gray-700 h-10 w-64"
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark active:bg-primary-dark text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-75 w-full"
          >
            Search
          </button>
        </form>
      </div>

      <ul className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-3 pb-3">
        {games.map((game) => (
          <li key={game.id} className="w-full flex">
            <Link
              to={`/game/${game.id}`}
              className="block w-full flex flex-col h-full"
            >
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                alt={game.name}
                className="w-full h-full object-cover"
              />
              <div className="w-full bg-black bg-opacity-60 text-white text-sm p-2">
                <p className="truncate">{game.name}</p>
                <p className="text-xs">
                  {game.first_release_date.epoch
                    ? new Date(
                        game.first_release_date.epoch * 1000
                      ).getUTCFullYear()
                    : null}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
