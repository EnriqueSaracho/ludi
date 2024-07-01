import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { apiUrl } from "../components/constants";

// Page: Home.
export const Home = () => {
  // State Object: keeps track of all games in database.
  const [games, setGames] = useState([]);
  // const [imageId, setImageId] = useState("");

  // sortGames();

  // On Render Function: fetches all games' data from database.
  useEffect(() => {
    fetchInfo();
  }, []);

  // Function for retrieving info from IGDB database
  const fetchInfo = async () => {
    const fetchGames = async () => {
      try {
        const response = await axios.post(`${apiUrl}/igdb/games`, {
          query: "fields name, cover; limit 15; where cover != null;",
        });

        let coverIds = response.data;
        return coverIds;
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCovers = async (coverIds) => {
      for (let obj of coverIds) {
        try {
          const response = await axios.post(`${apiUrl}/igdb/covers`, {
            query: `fields image_id; where id = ${obj.cover};`,
          });

          obj.image_id = response.data[0].image_id;
        } catch (err) {
          console.log(err);
        }
      }

      return coverIds;
    };

    const coverIds = await fetchGames();
    if (coverIds) {
      const response = await fetchCovers(coverIds);
      setGames(response);
      console.log(games);
    }
  };

  return (
    <div className="home">
      <div className="page-bar">
        <Link to="/add-game" className="page-bar-btn">
          <BsPlusCircleFill style={{ marginRight: "8px" }} /> Add a game
        </Link>
        {/* <button className="page-bar-btn" onClick={fetchInfo}>
          Refresh
        </button> */}
      </div>

      {/* <img
        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`}
        alt="ac2 cover"
      /> */}

      {/* TODO: Make li elements hold a Link element to a page dedicated to each game */}
      <ul className="title-list">
        {games.map((game) => (
          <li key={game._id} className="thumbnail">
            <Link to={`/game/${game._id}`} className="thumbnail-link">
              {game[0].image_id ? (
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game[0].image_id}.jpg`}
                  alt={game[0].name}
                  className="thumbnail-img"
                />
              ) : (
                <p>Loading image...</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      {/* <ul className="title-list">
        {games
          .filter((game) => {
            if (searchTerm === "") {
              return game;
            } else if (
              game.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return game;
            } else {
              return null;
            }
          })
          .map((game) => (
            <li key={game._id} className="thumbnail">
              <Link to={`/game/${game._id}`} className="thumbnail-link">
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="thumbnail-img"
                />
              </Link>
            </li>
          ))}
      </ul> */}
    </div>
  );
};
