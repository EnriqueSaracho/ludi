import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { apiUrl } from "../components/constants";
import axios from "axios";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import {
  fetchInitialGameData,
  fetchCoverImageId,
  convertDate,
  fetchNames,
  fetchNameAndDate,
  fetchNamesAndVideoIds,
  fetchCategoryAndUrl,
  fetchImageIds,
  fetchGameVersions,
  fetchInvolvedCompanyInfo,
  fetchNamesAndAbbreviations,
  fetchRelatedContent,
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
        // Fetching 'image_id', 'height', and 'width' for 'cover'
        await fetchCoverImageId(gameData);

        // Converting the release date (first_release_date.epoch) into readable format (first_release_date.date)
        convertDate(gameData.first_release_date);

        // Fetching parent_game.name
        // await fetchNameAndDate(gameData.parent_game);

        // Fetching parent_game.name
        // await fetchNameAndDate(gameData.version_parent);

        // Fetching 'name' for 'collections'
        // await fetchNames(gameData.about.collections, "collections");

        // Fetching 'name' for 'franchises'
        // await fetchNames(gameData.about.franchises, "franchises");

        // Fetching 'category' and 'url' for 'external_games' and finding 'name' (game's info on other services)
        // await fetchCategoryAndUrl(gameData.links.external_games, "external_games");

        // Fetching 'category' and 'url' for 'websites' and finding 'name'
        // await fetchCategoryAndUrl(gameData.links.websites, "websites");

        // Fetching 'name' for 'game_engines'
        // await fetchNames(gameData.about.game_engines, "game_engines");

        // Fetching 'name' for 'game_modes'
        // await fetchNames(gameData.about.game_modes, "game_modes");

        // Fetching 'name' for 'themes'
        // await fetchNames(gameData.about.themes, "themes");

        // Fetching 'name' for 'genres'
        // await fetchNames(gameData.about.genres, "genres");

        // Fetching 'company', 'developer', 'porting', 'publisher', and 'supporting' for 'involved_companies'
        // await fetchInvolvedCompanyInfo(gameData.about.involved_companies);

        // Fetching 'name' and 'abbreviation' for 'platforms'
        // await fetchNamesAndAbbreviations(gameData.about.platforms, "platforms");

        // Fetching 'name' for 'player_perspectives'
        // await fetchNames(
        //   gameData.about.player_perspectives,
        //   "player_perspectives"
        // );

        // Fetching 'image_id', 'height', and 'width' for 'screenshots'
        // await fetchImageIds(gameData.media.screenshots, "screenshots");

        // Fetching 'image_id', 'height', and 'width' for 'artworks'
        // await fetchImageIds(gameData.media.artworks, "artworks");

        // Fetching 'name' and 'video_id' for 'videos'
        // Note: Youtube's base URL: "https://www.youtube.com/watch?v="
        // await fetchNamesAndVideoIds(gameData.media.videos, "game_videos");

        // Fetching related content
        await fetchRelatedContent(gameData);

        console.log(gameData); // Console log game data object
        setGame(gameData);
      } else {
        alert("Game data not found");
      }
    } catch (err) {
      console.error(err);
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

        {/* {game.related_content.dlcs && game.related_content.dlcs.length > 0 && (
          <div className="title-section">
            <h3 className="title-section-title">DLCs</h3>
            <ul className="title-list">
              {game.related_content.dlcs.map((dlc) => (
                <li key={dlc.id} className="thumbnail">
                  <Link to={`/game/${dlc.id}`} className="thumbnail-link">
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${dlc.cover.image_id}.jpg`}
                      alt={dlc.name}
                      className="thumbnail-img"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )} */}

        {/* {game.related_content.editions &&
          game.related_content.editions.length > 0 && (
            <div className="title-section">
              <h3 className="title-section-title">Editions</h3>
              <ul className="title-list">
                {game.related_content.editions.map((edition) => (
                  <li key={edition.id} className="thumbnail">
                    <Link to={`/game/${edition.id}`} className="thumbnail-link">
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${edition.cover.image_id}.jpg`}
                        alt={edition.name}
                        className="thumbnail-img"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )} */}

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
