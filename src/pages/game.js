import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { apiUrl } from "../components/constants";
import axios from "axios";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import {
  convertDate,
  fetchNames,
  fetchNameAndDate,
  fetchNamesAndVideoIds,
  fetchCategoryAndUrl,
  fetchImageIds,
} from "../src/functions";

export const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  // Function: fetches game's data from IGDB database.
  const fetchGame = async () => {
    try {
      // Fetching game's initial data
      const gameData = await fetchInitialGameData(id);

      if (gameData) {
        // Fetching cover.image_id
        await fetchCoverImageId(gameData);

        // Converting the release date (first_release_date.epoch) into readable format (first_release_date.date)
        convertDate(gameData.first_release_date);

        // Fetching parent_game.name
        // await fetchNameAndDate(gameData.parent_game);

        // Fetching parent_game.name
        // await fetchNameAndDate(gameData.version_parent);

        // Fetching collections.name (series)
        // await fetchNames(gameData.collections, "collections");

        // Fetching franchises.name
        // await fetchNames(gameData.franchises, "franchises");

        // Fetching external_games.category and .url and finding .name (game's info on other services)
        // await fetchCategoryAndUrl(gameData.external_games, "external_games");

        // Fetching websites.category and .url and finding .name
        // await fetchCategoryAndUrl(gameData.websites, "websites");

        // Fetching game_engines.name
        // await fetchNames(gameData.game_engines, "game_engines");

        // Fetching game_modes.name
        // await fetchNames(gameData.game_modes, "game_modes");

        // Fetching themes.name
        // await fetchNames(gameData.themes, "themes");

        // TODO: Some of the info from IGDB is wrong in this field
        // Fetching multiplayer_modes.* (types of modes as boolean values)
        // await fetchMultiplayerModes(gameData.multiplayer_modes);

        // Fetching genres.name
        // await fetchNames(gameData.genres, "genres");

        // Fetching involved_companies.company, .developer, .porting, .publisher, and .supporting
        // await fetchInvolvedCompanyInfo(gameData.involved_companies);

        // Fetching platforms '.name' and '.abbreviation'
        // await fetchNamesAndAbbreviations(gameData.platforms, "platforms");

        // Fetching player_perspectives' '.name'
        // await fetchNames(gameData.player_perspectives, "player_perspectives");

        // TODO: Pass these functions outside of useEffect -> fetchInfo
        // Fetching screenshots.image_id
        // await fetchImageIds(gameData.screenshots, "screenshots");

        // Fetching artworks.image_id
        // await fetchImageIds(gameData.artworks, "artworks");

        // Fetching game_videos.name, and .video_id
        // Note: Youtube's base URL: "https://www.youtube.com/watch?v="
        // await fetchNamesAndVideoIds(gameData.videos, "game_videos");

        // Fetching dlcs.name, .first_release_date, and .cover -> .cover.image_id
        // await fetchNamesDatesAndCovers(gameData.dlcs);

        // Fetching expansions.name, .first_release_date, and .cover -> .cover.image_id
        // await fetchNamesDatesAndCovers(gameData.expansions);

        // Fetching standalone_expansions.name, .first_release_date, and .cover -> .cover.image_id
        // await fetchNamesDatesAndCovers(gameData.standalone_expansions);

        // Fetching bundles.name, .first_release_date, and .cover -> .cover.image_id
        // await fetchNamesDatesAndCovers(gameData.bundles);

        // Fetching ports.name, .first_release_date, and .cover -> .cover.image_id
        // await fetchNamesDatesAndCovers(gameData.ports);

        // Fetching forks.name, first_release_date, and .cover -> .cover.image_id
        // await fetchNamesDatesAndCovers(gameData.forks);

        // Fetching remakes.name, first_release_date, and .cover -> .cover.image_id
        // await fetchNamesDatesAndCovers(gameData.remakes);

        // Fetching remasters.name, first_release_date, and .cover -> .cover.image_id
        // await fetchNamesDatesAndCovers(gameData.remasters);

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
        genres,
        involved_companies,
        multiplayer_modes,
        parent_game,
        platforms,
        player_perspectives,
        ports,
        forks,
        remakes,
        remasters,
        themes,
        version_parent,
        videos,
        websites,
        ...rest
      } = response.data[0];
      return {
        ...rest,
        cover: cover ? { id: cover } : null,
        parent_game: parent_game ? { id: parent_game } : null,
        version_parent: version_parent ? { id: version_parent } : null,
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
        genres: genres ? genres.map((id) => ({ id })) : [],
        involved_companies: involved_companies
          ? involved_companies.map((id) => ({ id }))
          : [],
        multiplayer_modes: multiplayer_modes
          ? multiplayer_modes.map((id) => ({ id }))
          : [],
        platforms: platforms ? platforms.map((id) => ({ id })) : [],
        player_perspectives: player_perspectives
          ? player_perspectives.map((id) => ({ id }))
          : [],
        ports: ports ? ports.map((id) => ({ id })) : [],
        forks: forks ? forks.map((id) => ({ id })) : [],
        remakes: remakes ? remakes.map((id) => ({ id })) : [],
        remasters: remasters ? remasters.map((id) => ({ id })) : [],
        themes: themes ? themes.map((id) => ({ id })) : [],
        videos: videos ? videos.map((id) => ({ id })) : [],
        websites: websites ? websites.map((id) => ({ id })) : [],
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

  /**
   * Takes array of objects with 'id' and fetches 'name' and 'cover' for each element
   * Then calls 'fetchCoverImageIds()' to fetch 'image_id' for each 'cover'
   * @param {*} list
   */
  const fetchNamesDatesAndCovers = async (list) => {
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
          listRecord.first_release_date = {
            epoch: responseRecord.first_release_date,
          };
          convertDate(listRecord.first_release_date);
        }
      });
      if (list[0].cover.id) {
        await fetchCoverImageIds(list);
      }
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

  /**
   * Takes array of involved companies' 'id' and fetches 'company' (id), 'developer', 'porting', 'publisher', and 'supporting'
   * @param {*} list
   */
  const fetchInvolvedCompanyInfo = async (list) => {
    if (list && list.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/involved_companies`, {
        query: list,
      });
      response.data.forEach((responseRecord) => {
        const listRecord = list.find(
          (record) => record.id === responseRecord.id
        );
        if (listRecord) {
          listRecord.company = responseRecord.company;
          listRecord.developer = responseRecord.developer;
          listRecord.porting = responseRecord.porting;
          listRecord.publisher = responseRecord.publisher;
          listRecord.supporting = responseRecord.supporting;
        }
      });
      if (list[0].company) {
        await fetchCompaniesNames(list);
      }
    }
  };
  /**
   * Takes an array of companies with '.company' attribute and fetches '.name'
   * @param {*} list
   */
  const fetchCompaniesNames = async (list) => {
    if (list && list.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/companies`, {
        query: list,
      });
      console.log("log", response.data);
      response.data.forEach((responseRecord) => {
        const listRecord = list.find(
          (record) => record.company === responseRecord.id
        );
        if (listRecord) {
          listRecord.name = responseRecord.name;
        }
      });
    }
  };

  /**
   * Finds the category of game
   */
  const findCategoryOfTitle = () => {
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

  /**
   * Takes array of multiplayer modes 'id' and fetches modes info
   * @param {*} list
   */
  const fetchMultiplayerModes = async (list) => {
    if (list && list.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/multiplayer_modes`, {
        query: list,
      });
      response.data.forEach((responseMode) => {
        const listMode = list.find((mode) => mode.id === responseMode.id);
        if (listMode) {
          Object.keys(responseMode).forEach((key) => {
            listMode[key] = responseMode[key];
          });
        }
      });
    }
  };

  /**
   * Takes an array of objects and uses '.id' attribute to fetch '.name' and 'abbreviation'
   * @param {*} list
   * @param {*} listName
   */
  const fetchNamesAndAbbreviations = async (list, listName) => {
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
          listRecord.abbreviation = responseRecord.abbreviation;
        }
      });
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
          Home
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

            {findCategoryOfTitle()}

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
              {game.collections
                .filter((collection) => collection.name)
                .map((collection, index) => (
                  <li key={index}>{collection.name}</li>
                ))}
            </ul>
          </div>
        )}

        {game.franchises && game.franchises.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Franchises</h3>
            <ul className="attribute-list">
              {game.franchises
                .filter((franchise) => franchise.name)
                .map((franchise, index) => (
                  <li key={index}>{franchise.name}</li>
                ))}
            </ul>
          </div>
        )}

        {game.game_engines && game.game_engines.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Game Engines</h3>
            <ul className="attribute-list">
              {game.game_engines
                .filter((engine) => engine.name)
                .map((engine, index) => (
                  <li key={index}>{engine.name}</li>
                ))}
            </ul>
          </div>
        )}

        {game.game_modes && game.game_modes.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Game Modes</h3>
            <ul className="attribute-list">
              {game.game_modes
                .filter((mode) => mode.name)
                .map((mode, index) => (
                  <li key={index}>{mode.name}</li>
                ))}
            </ul>
          </div>
        )}

        {/* TODO: Some info from IGDB is wrong in this field */}
        {game.multiplayer_modes && game.multiplayer_modes.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Multiplayer</h3>
            <ul className="attribute-list">
              {game.multiplayer_modes[0].campaigncoop ? (
                <li>Campaign Co-op</li>
              ) : null}
              {game.multiplayer_modes[0].dropin ? (
                <li>Drop-In/Drop-Out</li>
              ) : null}
              {game.multiplayer_modes[0].lancoop ? <li>LAN Co-op</li> : null}
              {game.multiplayer_modes[0].offlinecoopmax > 0 ? (
                <li>
                  Offline Co-op ({game.multiplayer_modes[0].offlinecoopmax}{" "}
                  players)
                </li>
              ) : null}
              {game.multiplayer_modes[0].onlinecoopmax > 0 ? (
                <li>
                  Online Co-op ({game.multiplayer_modes[0].onlinecoopmax}{" "}
                  players)
                </li>
              ) : null}
              {game.multiplayer_modes[0].offlinemax > 0 ? (
                <li>
                  Offline ({game.multiplayer_modes[0].offlinemax} players)
                </li>
              ) : null}
              {game.multiplayer_modes[0].onlinemax > 0 ? (
                <li>Online ({game.multiplayer_modes[0].onlinemax} players)</li>
              ) : null}
            </ul>
          </div>
        )}

        {game.genres && game.genres.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Genres</h3>
            <ul className="attribute-list">
              {game.genres
                .filter((genre) => genre.name)
                .map((genre, index) => (
                  <li key={index}>{genre.name}</li>
                ))}
            </ul>
          </div>
        )}

        {game.external_games && game.external_games.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Links</h3>
            <ul className="">
              {game.external_games
                .filter((service) => {
                  return service.url != null && service.name !== "Unknown";
                })
                .map((service, index) => (
                  <li key={index}>
                    <a href={service.url} target="_blank" rel="noreferrer">
                      {service.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {game.screenshots && game.screenshots.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">Screenshots</h3>
            <ul className="attribute-list">
              {game.screenshots
                .filter((screenshot) => screenshot.image_id)
                .map((screenshot, index) => (
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
              {game.artworks
                .filter((artwork) => artwork.image_id)
                .map((artwork, index) => (
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

        {game.dlcs && game.dlcs.length > 0 && game.dlcs[0].cover && (
          <div className="title-section">
            <h3 className="title-section-title">DLCs</h3>
            <ul className="title-list">
              {game.dlcs
                .filter((dlc) => dlc.cover.image_id)
                .map((dlc) => (
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

        {game.expansions &&
          game.expansions.length > 0 &&
          game.expansions[0].cover && (
            <div className="title-section">
              <h3 className="title-section-title">Expansions</h3>
              <ul className="title-list">
                {game.expansions
                  .filter((expansion) => expansion.cover.image_id)
                  .map((expansion) => (
                    <li key={expansion.id} className="thumbnail">
                      <Link
                        to={`/game/${expansion.id}`}
                        className="thumbnail-link"
                      >
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
          game.standalone_expansions.length > 0 &&
          game.standalone_expansions[0].cover && (
            <div className="title-section">
              <h3 className="title-section-title">Standalone Expansions</h3>
              <ul className="title-list">
                {game.standalone_expansions
                  .filter(
                    (standaloneExpansion) => standaloneExpansion.cover.image_id
                  )
                  .map((standaloneExpansion) => (
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

        {game.bundles && game.bundles.length > 0 && game.bundles[0].cover && (
          <div className="title-section">
            <h3 className="title-section-title">Bundles</h3>
            <ul className="title-list">
              {game.bundles
                .filter((bundle) => bundle.cover.image_id)
                .map((bundle) => (
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
