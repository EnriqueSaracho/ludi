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

        // Fetching image_ids for screenshots
        await fetchImageIds(gameData.screenshots, "screenshots");

        // Fetching image_ids for artworks
        await fetchImageIds(gameData.artworks, "artworks");

        // Fetching series names
        await fetchNames(gameData.collections, "collections");

        // Fetching franchises names
        await fetchNames(gameData.franchises, "franchises");

        // Fetching dlcs
        await fetchNameAndCoversOfGames(gameData.dlcs);

        // Fetching expansions
        await fetchNameAndCoversOfGames(gameData.expansions);

        // Fetching standalone expansions
        await fetchNameAndCoversOfGames(gameData.standalone_expansions);

        // Fetching bundles
        await fetchNameAndCoversOfGames(gameData.bundles);

        // Fetching game's info on other services (external_games)
        // await fetchCategoryAndUrl(gameData.external_games, "external_games");

        // Fetching game engines names
        await fetchNames(gameData.game_engines, "game_engines");

        // Fetching game modes names
        await fetchNames(gameData.game_modes, "game_modes");

        console.log(gameData); // Console log game data object
        setGame(gameData);
      } else {
        alert("Game data not found");
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
      const {
        cover,
        first_release_date,
        artworks,
        collections,
        dlcs,
        expansions,
        standalone_expansions,
        bundles,
        external_games,
        franchises,
        screenshots,
        game_engines,
        game_modes,
        ...rest
      } = response.data[0];
      return {
        ...rest,
        cover: cover ? { id: cover } : null,
        first_release_date: first_release_date
          ? { epoch: first_release_date }
          : null,
        artworks: artworks ? artworks.map((id) => ({ id })) : [],
        collections: collections ? collections.map((id) => ({ id })) : [],
        dlcs: dlcs ? dlcs.map((id) => ({ id })) : [],
        expansions: expansions ? expansions.map((id) => ({ id })) : [],
        standalone_expansions: standalone_expansions
          ? standalone_expansions.map((id) => ({ id }))
          : [],
        bundles: bundles ? bundles.map((id) => ({ id })) : [],
        external_games: external_games
          ? external_games.map((id) => ({ id }))
          : [],
        franchises: franchises ? franchises.map((id) => ({ id })) : [],
        screenshots: screenshots ? screenshots.map((id) => ({ id })) : [],
        game_engines: game_engines ? game_engines.map((id) => ({ id })) : [],
        game_modes: game_modes ? game_modes.map((id) => ({ id })) : [],
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

  /**
   * Takes array of objects with 'id' and fetches 'image_id' for each element
   * @param {*} list array of objects
   * @param {*} listName name of the array
   */
  const fetchImageIds = async (list, listName) => {
    if (list && list.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/${listName}`, {
        query: list,
      });
      response.data.forEach((responseRecord) => {
        const listRecord = list.find((art) => art.id === responseRecord.id);
        if (listRecord) {
          listRecord.image_id = responseRecord.image_id;
        }
      });
    }
  };

  /**
   * Takes array of objects with 'id' and fetches 'name' for each element
   * @param {*} list
   * @param {*} listName
   */
  const fetchNames = async (list, listName) => {
    if (list && list.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/${listName}`, {
        query: list,
      });
      response.data.forEach((responseRecord) => {
        const listRecord = list.find(
          (record) => record.id === responseRecord.id
        );
        if (listRecord) {
          listRecord.name = responseRecord.name;
        }
      });
    }
  };

  /**
   * Takes array of objects with 'id' and fetches 'category' and 'url' for each element
   * @param {*} list
   * @param {*} listName
   */
  const fetchCategoryAndUrl = async (list, listName) => {
    if (list && list.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/${listName}`, {
        query: list,
      });
      response.data.forEach((responseRecord) => {
        const listRecord = list.find(
          (record) => record.id === responseRecord.id
        );
        if (listRecord) {
          listRecord.category = responseRecord.category;
          listRecord.url = responseRecord.url;
        }
      });
    }
  };

  /**
   * Takes array of objects with 'id' and fetches 'name' and 'cover' for each element
   * Then calls 'fetchCoverImageIds()' to fetch 'image_id' for each 'cover'
   * @param {*} list
   */
  const fetchNameAndCoversOfGames = async (list) => {
    if (list && list.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/games_by_id`, {
        query: list,
      });
      response.data.forEach((responseRecord) => {
        const listRecord = list.find(
          (record) => record.id === responseRecord.id
        );
        if (listRecord) {
          listRecord.name = responseRecord.name;
          listRecord.cover = { id: responseRecord.cover };
        }
      });
      await fetchCoverImageIds(list);
    }
  };
  const fetchCoverImageIds = async (records) => {
    const response = await axios.post(`${apiUrl}/igdb/covers`, {
      query: records,
    });

    response.data.forEach((coverRecord) => {
      const listRecord = records.find(
        (record) => record.cover.id === coverRecord.id
      );
      if (listRecord) {
        listRecord.cover.image_id = coverRecord.image_id;
      }
    });
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
            <h3 className="title-section-title">Series</h3>
            <ul className="attribute-list">
              {game.collections.map((collection, index) => (
                <li key={index}>{collection.name}</li>
              ))}
            </ul>
          </div>
        )}

        {game.franchises && game.franchises.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Franchises</h3>
            <ul className="attribute-list">
              {game.franchises.map((franchise, index) => (
                <li key={index}>{franchise.name}</li>
              ))}
            </ul>
          </div>
        )}

        {game.game_engines && game.game_engines.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Game Engines</h3>
            <ul className="attribute-list">
              {game.game_engines.map((engine, index) => (
                <li key={index}>{engine.name}</li>
              ))}
            </ul>
          </div>
        )}

        {game.game_modes && game.game_modes.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Game Modes</h3>
            <ul className="attribute-list">
              {game.game_modes.map((mode, index) => (
                <li key={index}>{mode.name}</li>
              ))}
            </ul>
          </div>
        )}

        {game.screenshots && game.screenshots.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Screenshots</h3>
            <ul className="attribute-list">
              {game.screenshots.map((screenshot, index) => (
                <li key={index}>
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.jpg`}
                    alt={`Screenshot ${index + 1}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {game.artworks && game.artworks.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Artwork</h3>
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

        {game.dlcs && game.dlcs.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">DLCs</h3>
            <ul className="title-list">
              {game.dlcs.map((dlc) => (
                <li key={dlc.id} className="thumbnail">
                  <Link to={`/game/${dlc.id}`} className="thumbnail-link">
                    {dlc.cover.image_id ? (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${dlc.cover.image_id}.jpg`}
                        alt={dlc.name}
                        className="thumbnail-img"
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {game.expansions && game.expansions.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Expansions</h3>
            <ul className="title-list">
              {game.expansions.map((expansion) => (
                <li key={expansion.id} className="thumbnail">
                  <Link to={`/game/${expansion.id}`} className="thumbnail-link">
                    {expansion.cover.image_id ? (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${expansion.cover.image_id}.jpg`}
                        alt={expansion.name}
                        className="thumbnail-img"
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {game.standalone_expansions &&
          game.standalone_expansions.length > 0 && (
            <div className="title-section">
              <h3 className="title-section-title">Standalone Expansions</h3>
              <ul className="title-list">
                {game.standalone_expansions.map((standaloneExpansion) => (
                  <li key={standaloneExpansion.id} className="thumbnail">
                    <Link
                      to={`/game/${standaloneExpansion.id}`}
                      className="thumbnail-link"
                    >
                      {standaloneExpansion.cover.image_id ? (
                        <img
                          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${standaloneExpansion.cover.image_id}.jpg`}
                          alt={standaloneExpansion.name}
                          className="thumbnail-img"
                        />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {game.bundles && game.bundles.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Bundles</h3>
            <ul className="title-list">
              {game.bundles.map((bundle) => (
                <li key={bundle.id} className="thumbnail">
                  <Link to={`/game/${bundle.id}`} className="thumbnail-link">
                    {bundle.cover.image_id ? (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${bundle.cover.image_id}.jpg`}
                        alt={bundle.name}
                        className="thumbnail-img"
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
