import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { apiUrl } from "../components/constants";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { BiMessageSquareEdit } from "react-icons/bi";
import { BiMessageSquareX } from "react-icons/bi";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { FiPauseCircle } from "react-icons/fi";
import { BiCheckCircle } from "react-icons/bi";
import { HiOutlineBan } from "react-icons/hi";
import { FaGamepad } from "react-icons/fa";

export const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  // Function: fetches game's data from IGDB database.
  const fetchGame = async () => {
    try {
      const response = await axios.post(`${apiUrl}/igdb/games`, {
        query: `fields name, cover, rating, release_dates; where id = ${id};`,
      });
      console.log(response.data)

      if (response.data && response.data.length > 0) {
        const gameData = response.data[0];

        // Fetching cover
        if (gameData.cover) {
          try {
            const response = await axios.post(`${apiUrl}/igdb/covers`, {
              query: `fields image_id; where id = ${gameData.cover};`,
            });

            if (response.data && response.data.length > 0) {
              gameData.image_id = response.data[0].image_id;
            } else {
              console.warn("No cover image_id found for game");
            }
          } catch (err) {
            console.error(err);
          }
        }

        // Fetching release dates
        if (gameData.release_dates) {
          try {
            const response = await axios.post(`${apiUrl}/igdb/release_dates`, {
              query: `fields *; where id = ${gameData.release_dates[14]};`,
            });

            if (response.data && response.data.length > 0) {
              gameData.release_date = response.data[0].release_dates;
            } else {
              console.warn("No cover image_id found for game");
            }
          } catch (err) {
            console.error(err);
          }
        }

        // console.log(gameData);
        setGame(gameData);
      } else {
        console.warn("Game data not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // On Render Function: fetches game's data from database.
  useEffect(() => {
    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-page">
      <div className="page-bar">
        <Link to="/" className="page-bar-btn">
          <BsFillArrowLeftCircleFill style={{ marginRight: "8px" }} /> Go back
        </Link>
      </div>

      <div className="title">
        <div className="title-header">
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.image_id}.jpg`}
            alt={game.name}
            className="title-img"
          />
          <div className="title-header-info">
            <h2 className="title-title">{game.name}</h2>
            {game.rating ? (
              <StarRatingComponent
                name="rating"
                editing={false}
                starCount={5}
                renderStarIcon={() => (
                  <span>
                    <IoIosStar />
                  </span>
                )}
                renderStarIconHalf={() => (
                  <span>
                    <IoIosStarHalf style={{ color: "#fff" }} />
                  </span>
                )}
                value={game.rating / 10 / 2}
                starColor="#fff"
                emptyStarColor="#ffffff00"
                className="star-rating"
              />
            ) : null}
            {/* <p>
              {game.status}
              {game.status === "Not played" ? (
                <RiCheckboxBlankCircleLine className="status-icon" />
              ) : null}
              {game.status === "In progress" ? (
                <HiOutlineDotsCircleHorizontal className="status-icon" />
              ) : null}
              {game.status === "Paused" ? (
                <FiPauseCircle className="status-icon" />
              ) : null}
              {game.status === "Completed" ? (
                <BiCheckCircle className="status-icon" />
              ) : null}
              {game.status === "Abandoned" ? (
                <HiOutlineBan className="status-icon" />
              ) : null}
            </p> */}
            {/* <p>By {game.developer}</p> */}
            {/* <p>{new Date(game.releaseDate).getFullYear()}</p> */}
          </div>
          <div className="title-btn-container">
            {/* <Link to={`/edit-game/${game._id}`} className="title-btn">
              <BiMessageSquareEdit />
            </Link> */}
            {/* <button onClick={() => deleteGame(game._id)} className="title-btn">
              <BiMessageSquareX />
            </button> */}
          </div>
        </div>

        {/* <div className="title-section">
          <h3 className="title-section-title">Genres:</h3>
          <ul className="attribute-list">
            {game.genres.sort().map((genre) => (
              <li>{genre}</li>
            ))}
          </ul>
        </div> */}

        {/* <div className="title-section">
          <h3 className="title-section-title">Platforms:</h3>
          <ul className="attribute-list">
            {game.platforms
              .sort((platform1, platform2) => {
                const priority1 = platformPriority[platform1];
                const priority2 = platformPriority[platform2];
                return priority1 - priority2;
              })
              .reverse()
              .map((platform) => (
                <li>{platform}</li>
              ))}
          </ul>
        </div> */}

        {/* <div className="title-section">
          <h3 className="title-section-title">Modes:</h3>
          <ul className="attribute-list">
            {game.modes
              .sort()
              .reverse()
              .map((mode) => (
                <li>{mode}</li>
              ))}
          </ul>
        </div> */}

        {/* <div className="title-section title-section-info">
          {game.releaseDate && (
            <p>
              <b>Release date:</b>{" "}
              {new Date(game.releaseDate).toLocaleDateString("en-GB")}
            </p>
          )}
          {game.franchise && (
            <p>
              <b>Series:</b> {game.franchise}
            </p>
          )}
          {game.developer && (
            <p>
              <b>Developer(s):</b> {game.developer}
            </p>
          )}
          {game.publisher && (
            <p>
              <b>Publisher(s):</b> {game.publisher}
            </p>
          )}
          {game.director && (
            <p>
              <b>Director(s):</b> {game.director}
            </p>
          )}
          {game.producer && (
            <p>
              <b>Producer(s):</b> {game.producer}
            </p>
          )}
          {game.designer && (
            <p>
              <b>Designer(s):</b> {game.designer}
            </p>
          )}
          {game.programmer && (
            <p>
              <b>Programmer(s):</b> {game.programmer}
            </p>
          )}
          {game.artist && (
            <p>
              <b>Artist(s):</b> {game.artist}
            </p>
          )}
          {game.writer && (
            <p>
              <b>Writer:</b> {game.writer}
            </p>
          )}
          {game.composer && (
            <p>
              <b>Composer:</b> {game.composer}
            </p>
          )}
          {game.engine && (
            <p>
              <b>Engine:</b> {game.engine}
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};
