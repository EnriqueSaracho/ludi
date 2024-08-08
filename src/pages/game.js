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
  findCategoryOfTitle,
  fetchNames,
  fetchNameAndDate,
  fetchNamesAndVideoIds,
  fetchCategoryAndUrl,
  fetchImageIds,
  fetchInvolvedCompanyInfo,
  fetchNamesAndAbbreviations,
  fetchRelatedContent,
} from "../src/functions";

export const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function: fetches game's data from IGDB database.
  const fetchGame = async () => {
    try {
      // Fetching game's initial data
      const gameData = await fetchInitialGameData(id);

      if (gameData) {
        // core_info
        await fetchCoverImageId(gameData); // Fetching 'image_id', 'height', and 'width' for 'cover'
        convertDate(gameData.core_info.first_release_date); // Converting first_release_date from 'epoch' to 'date'

        // about
        // await fetchNameAndDate(gameData.about.parent_game); // Fetching 'name' and 'first_release_date' for 'parent_game'
        // await fetchNameAndDate(gameData.about.version_parent); // Fetching 'name' and 'first_release_date' for 'version_parent'
        // await sleep(500);
        // await fetchNames(gameData.about.collections, "collections"); // Fetching 'name' for 'collections'
        // await fetchNames(gameData.about.franchises, "franchises"); // Fetching 'name' for 'franchises'
        // await sleep(500);
        // await fetchNames(gameData.about.game_engines, "game_engines"); // Fetching 'name' for 'game_engines'
        // await fetchNames(gameData.about.game_modes, "game_modes"); // Fetching 'name' for 'game_modes'
        // await sleep(500);
        // await fetchNames(gameData.about.themes, "themes"); // Fetching 'name' for 'themes'
        // await fetchNames(gameData.about.genres, "genres"); // Fetching 'name' for 'genres'
        // await sleep(500);
        // await fetchInvolvedCompanyInfo(gameData.about.involved_companies); // Fetching 'company', 'developer', 'porting', 'publisher', and 'supporting' for 'involved_companies'
        // await fetchNamesAndAbbreviations(gameData.about.platforms, "platforms"); // Fetching 'name' and 'abbreviation' for 'platforms'
        // await sleep(500);
        // await fetchNames(
        //   gameData.about.player_perspectives,
        //   "player_perspectives"
        // ); // Fetching 'name' for 'player_perspectives'

        // links
        // await fetchCategoryAndUrl(
        //   gameData.links.external_games,
        //   "external_games"
        // ); // Fetching 'category' and 'url' for 'external_games' and finding 'name' (game's info on other services)
        // await fetchCategoryAndUrl(gameData.links.websites, "websites"); // Fetching 'category' and 'url' for 'websites' and finding 'name'

        // media
        // await fetchImageIds(gameData.media.screenshots, "screenshots"); // Fetching 'image_id', 'height', and 'width' for 'screenshots'
        // await fetchImageIds(gameData.media.artworks, "artworks"); // Fetching 'image_id', 'height', and 'width' for 'artworks'
        // await fetchNamesAndVideoIds(gameData.media.videos, "game_videos"); // Fetching 'name' and 'video_id' for 'videos' // Note: Youtube's base URL: "https://www.youtube.com/watch?v="

        // related_content
        // await fetchRelatedContent(gameData); // Fetching related content

        console.log(gameData); // Console log game data object
        setGame(gameData);
      } else {
        alert("Game data not found");
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
          <BsFillArrowLeftCircleFill style={{ marginRight: "8px" }} /> Return
          Home
        </Link>
      </div>

      <div className="title">
        <div className="title-header">
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.core_info.cover.image_id}.jpg`}
            alt={game.name}
            className="title-img"
          />
          <div className="title-header-info">
            <h2 className="title-title">{game.name}</h2>

            {findCategoryOfTitle(game)}

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
