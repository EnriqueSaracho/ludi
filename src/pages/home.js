import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { apiUrl } from "../components/constants";

// Page: Home.
export const Home = () => {
  // State Object: keeps track of all games in database.
  const [games, setGames] = useState([]);

  // // State Object: cookies.
  // const [cookies, setCookies] = useCookies(["sortTerm"]);

  // // useNavigate object
  // const navigate = useNavigate();

  // // State Objects: keeps track of the navbar terms.
  // const [searchTerm, setSearchTerm] = useState("");
  // const initialSortTerm = cookies.sortTerm || "rating";
  // const [sortTerm, setSortTerm] = useState(initialSortTerm);

  // // Functions: sorts games.
  // const handleSortTermChange = (event) => {
  //   const newSortTerm = event.target.value;
  //   setSortTerm(newSortTerm);
  //   setCookies("sortTerm", newSortTerm, { path: "/" });
  // };
  // const sortGames = () => {
  //   const sortedGames = games;
  //   if (sortTerm === "rating") {
  //     return sortedGames.sort((prevGame, nextGame) => {
  //       const prevRating = prevGame.rating ?? -Infinity;
  //       const nextRating = nextGame.rating ?? -Infinity;
  //       return nextRating - prevRating;
  //     });
  //   } else if (sortTerm === "name") {
  //     return sortedGames.sort((prevGame, nextGame) => {
  //       return prevGame.name.localeCompare(nextGame.name);
  //     });
  //   } else if (sortTerm === "releaseDate") {
  //     return sortedGames.sort((prevGame, nextGame) => {
  //       return new Date(nextGame.releaseDate) - new Date(prevGame.releaseDate);
  //     });
  //   }
  //   return games;
  // };

  // sortGames();

  // On Render Function: fetches all games' data from database.
  useEffect(() => {
    // Function: fetches all games' data from database
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/games`
        );
        setGames(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    // Can't have an "on render" async function, so we call the async function inside the "on render" one.
    fetchGame();
  }, []);

  // TODO: Finish function for retrieving infro from IGDB database
  const refreshList = () => {
    const refreshList = async () => {
      try {
        const response = await axios.post(`${apiUrl}/games/igdb/games`, {
          query: "fields *; where id = 127;",
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    refreshList();
  };

  return (
    <div className="home">
      <div className="page-bar">
        <Link to="/add-game" className="page-bar-btn">
          <BsPlusCircleFill style={{ marginRight: "8px" }} /> Add a game
        </Link>
        <button className="page-bar-btn" onClick={refreshList}>
          Refresh list
        </button>
      </div>

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
