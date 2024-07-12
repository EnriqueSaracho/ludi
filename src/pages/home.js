import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../components/constants";
// import { BsPlusCircleFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

// Page: Home.
export const Home = () => {
  // State Object: keeps track of all games in database.
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  // On Render Function: fetches all games' data from database.
  useEffect(() => {
    fetchInfo();
  }, []);

  // Function for retrieving info from IGDB database
  const fetchInfo = async (search = "") => {
    let limit = 500;
    let offset = Math.floor(Math.random() * 200000 + 1);
    let query = search
      ? `fields name, cover; limit ${limit}; search "${search}"; where cover != null;`
      : `fields name, cover; limit ${limit}; offset ${offset}; where cover != null;`;

    try {
      const response1 = await axios.post(`${apiUrl}/igdb/games`, {
        query: query,
        timeout: 5000,
      });

      let gameRecords = response1.data;
      if (gameRecords && gameRecords.length > 0) {
        const query = `fields image_id, id; limit 500; where id = (${gameRecords
          .map(record => record.cover)
          .join(",")});`;
        const coversResponse = await axios.post(`${apiUrl}/igdb/covers`, {
          query,
          timeout: 4000,
        });
        coversResponse.data.forEach((coverRecord) => {
          const game = gameRecords.find(
            (gameRecord) => gameRecord.cover === coverRecord.id
          );
          if (game) {
            game.image_id = coverRecord.image_id;
          }
        });

        /*const CHUNK_SIZE= 100;
        const chunkedGames = gameRecords.reduce((acc, record) => {
          let currentChunk = acc[acc.length - 1];
          if (!currentChunk || currentChunk.length === CHUNK_SIZE) {
            currentChunk = []
            acc.push(currentChunk)
          } 
          currentChunk.push(record)
          return acc;
        }, []);

        for (let i = 0; i < chunkedGames.length; i++ ){
          
        }*/
        setGames(gameRecords);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Search functions
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);
    fetchInfo(searchValue);
  };

  return (
    <div className="home">
      <div className="page-bar">
        {/* <Link to="/add-game" className="page-bar-btn">
          <BsPlusCircleFill style={{ marginRight: "8px" }} /> Add a game
        </Link> */}
        <div className="page-bar-field">
          <label htmlFor="page=bar-search" className="page-bar-field-label">
            <FaSearch />
          </label>
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            placeholder="Search"
            className="page-bar-field-input"
            id="page=bar-search"
          />
        </div>
      </div>

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