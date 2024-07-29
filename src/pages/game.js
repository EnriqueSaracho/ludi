import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { apiUrl } from "../components/constants";
import axios from "axios";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  // Function: fetches game's data from IGDB database.
  const fetchGame = async () => {
    try {
      // Fetching game's initial data
      const gameData = await fetchInitialGameData(id);

      if (gameData) {
        // Fetching cover image_id
        await fetchCoverImageId(gameData);

        // Converting the release date into readable format
        convertReleaseDate(gameData);

        // Fetching image_ids for artworks
        await fetchArtworksImageIds(gameData);

        // Fetching series names
        await fetchSeriesNames(gameData);

        console.log(gameData); // Console log game data object
        setGame(gameData);
      } else {
        console.warn("Game data not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInitialGameData = async (id) => {
    const response = await axios.post(`${apiUrl}/igdb/game`, {
      query: id,
    });

    if (response.data && response.data.length > 0) {
      const { cover, first_release_date, artworks, collections, ...rest } =
        response.data[0];
      return {
        ...rest,
        cover: cover ? { id: cover } : null,
        first_release_date: first_release_date
          ? { epoch: first_release_date }
          : null,
        artworks: artworks ? artworks.map((id) => ({ id })) : [],
        collections: collections ? collections.map((id) => ({ id })) : [],
      };
    }
    return null;
  };

  const fetchCoverImageId = async (gameData) => {
    if (gameData.cover) {
      try {
        const response = await axios.post(`${apiUrl}/igdb/cover`, {
          query: gameData.cover.id,
        });

        if (response.data && response.data.length > 0) {
          gameData.cover.image_id = response.data[0].image_id;
        } else {
          console.warn("No cover image_id found for game");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const convertReleaseDate = (gameData) => {
    if (gameData.first_release_date) {
      const timestamp = gameData.first_release_date.epoch;
      const date = new Date(timestamp * 1000);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      const formattedDay = String(day).padStart(2, "0");
      const formattedMonth = String(month).padStart(2, "0");
      const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
      gameData.first_release_date.date = formattedDate;
    }
  };

  const fetchArtworksImageIds = async (gameData) => {
    if (gameData.artworks && gameData.artworks.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/artworks`, {
        query: gameData.artworks,
      });
      response.data.forEach((artworkRecord) => {
        const artwork = gameData.artworks.find(
          (art) => art.id === artworkRecord.id
        );
        if (artwork) {
          artwork.image_id = artworkRecord.image_id;
        }
      });
    }
  };

  const fetchSeriesNames = async (gameData) => {
    if (gameData.collections && gameData.collections.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/collections`, {
        query: gameData.collections,
      });
      response.data.forEach((collectionRecord) => {
        const collection = gameData.collections.find(
          (record) => record.id === collectionRecord.id
        );
        if (collection) {
          collection.name = collectionRecord.name;
        }
      });
    }
  };

  const findCategory = () => {
    switch (game.category) {
      case 0:
        return "Main Game";
      case 1:
        return "DLC";
      case 2:
        return "Expansion";
      case 3:
        return "Bundle";
      case 4:
        return "Standalone Expansion";
      case 5:
        return "Mod";
      case 6:
        return "Episode";
      case 7:
        return "Season";
      case 8:
        return "Remake";
      case 9:
        return "Remaster";
      case 10:
        return "Expanded Game";
      case 11:
        return "Port";
      case 12:
        return "Fork";
      case 13:
        return "Pack";
      case 14:
        return "Update";
      default:
        return null;
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
          <BsFillArrowLeftCircleFill style={{ marginRight: "8px" }} /> Return
        </Link>
      </div>

      <div className="title">
        <div className="title-header">
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
            alt={game.name}
            className="title-img"
          />
          <div className="title-header-info">
            <h2 className="title-title">{game.name}</h2>

            {findCategory()}

            {game.rating ? (
              <p>IGDB rating: {Math.round(game.rating) / 10}</p>
            ) : null}

            {game.aggregated_rating && game.aggregated_rating_count ? (
              <p>
                {game.aggregated_rating_count} critic ratings:{" "}
                {Math.round(game.aggregated_rating) / 10}
              </p>
            ) : null}

            <p>
              {game.first_release_date ? game.first_release_date.date : null}
            </p>
          </div>
          <div className="title-btn-container"></div>
        </div>

        {game.collections && game.collections.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Series:</h3>
            <ul className="attribute-list">
              {game.collections.map((collection, index) => (
                <li key={index}>{collection.name}</li>
              ))}
            </ul>
          </div>
        )}

        {game.artworks && game.artworks.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Artwork:</h3>
            <ul className="attribute-list">
              {game.artworks.map((artwork, index) => (
                <li key={index}>
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${artwork.image_id}.jpg`}
                    alt={`Artwork ${index + 1}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

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
