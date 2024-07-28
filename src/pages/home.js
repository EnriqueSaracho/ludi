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
    let query = `fields name, cover; limit 500; search "${search}"; where cover != null;`;

    try {
      const response = await axios.post(`${apiUrl}/igdb/games`, {
        query: query,
      });

      let gameRecords = response.data;

      if (gameRecords && gameRecords.length > 0) {
        const query = `fields image_id, id; limit 500; where id = (${gameRecords
          .map((record) => record.cover)
          .join(",")});`;
        const coversResponse = await axios.post(`${apiUrl}/igdb/covers`, {
          query,
        });
        coversResponse.data.forEach((coverRecord) => {
          const game = gameRecords.find(
            (gameRecord) => gameRecord.cover === coverRecord.id
          );
          if (game) {
            game.cover_image_id = coverRecord.image_id;
          }
        });

        console.log(gameRecords);
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
              {game.image_id ? (
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.image_id}.jpg`}
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
