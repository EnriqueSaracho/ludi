import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { BsPlusCircleFill } from "react-icons/bs";
import { apiUrl } from "../components/constants";

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
    let limit = 15;
    let offset = Math.floor(Math.random() * 200000 + 1);
    let query = search
      ? `fields name, cover; limit ${limit}; search "${search}"; where cover != null;`
      : `fields name, cover; limit ${limit}; offset ${offset}; where cover != null;`;

    try {
      const response1 = await axios.post(`${apiUrl}/igdb/games`, {
        query: query,
      });

      let info = response1.data;
      if (info && info.length > 0) {
        const coverPromises = info.map((game) =>
          axios.post(`${apiUrl}/igdb/covers`, {
            query: `fields image_id; where id = ${game.cover};`,
          })
        );
        const coverResponses = await Promise.all(coverPromises);

        coverResponses.forEach((response, index) => {
          if (response.data && response.data.length > 0) {
            info[index].image_id = response.data[0].image_id;
          } else {
            console.warn(
              `No cover image_id found for game ${info[index].name}`
            );
          }
        });

        setGames(info);
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
        <div className="page-bar-btn">
          <label>Search </label>
          <input type="text" onChange={handleSearch} value={search} />
        </div>
      </div>

      <ul className="title-list">
        {games.map((game, index) => (
          <li key={index} className="thumbnail">
            <Link to={"/"} className="thumbnail-link">
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
