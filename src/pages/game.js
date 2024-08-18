import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
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
} from "../components/functions";
import { FaXbox, FaPlaystation, FaSteamSquare, FaSteam } from "react-icons/fa";

export const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        await fetchCategoryAndUrl(
          gameData.links.external_games,
          "external_games"
        ); // Fetching 'category' and 'url' for 'external_games' and finding 'name' (game's info on other services)
        await fetchCategoryAndUrl(gameData.links.websites, "websites"); // Fetching 'category' and 'url' for 'websites' and finding 'name'

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

  const displayAboutInvolvedCompanies = (list, listName) => {
    if (!list || list.length === 0 || !list[0].name) return null;

    let listTitle;
    switch (listName) {
      case "developer":
        listTitle = "Main Developers";
        break;
      case "supporting":
        listTitle = "Supporting Developers";
        break;
      case "porting":
        listTitle = "Porting Developers";
        break;
      case "publisher":
        listTitle = "Publishers";
        break;
      default:
        listTitle = "Involved Companies";
        break;
    }
    return (
      <div className="flex flex-col items-start px-3 py-4">
        <p className="text-sm text-gray-200">{listTitle}</p>
        <ul>
          {list
            .filter((company) => company[listName])
            .map((company, index) => (
              <li key={index} className="font-medium text-gray-200">
                {company.name}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  const displayAboutElementList = (list, listTitle) => {
    if (!list || list.length === 0 || !list[0].name) return null;

    const listItems = list.map((element, index) => (
      <li key={index} className="font-medium text-gray-200">
        {element.name}
      </li>
    ));

    return (
      <div className="flex flex-col items-start px-3 py-4">
        <p className="text-sm text-gray-200">{listTitle}</p>
        <ul>{listItems}</ul>
      </div>
    );
  };

  const displayMainGameOrVersion = (element, title) => {
    if (!element) return null;

    const date = element.first_release_date?.date.split("/")[2];

    const handleClick = (event) => {
      event.preventDefault();
      navigate(`/game/${element.id}`);
      window.location.reload();
    };

    return (
      <div className="flex flex-col items-start px-3 py-4">
        <p className="text-sm text-gray-200">{title}</p>
        <a
          href={`/game/${element.id}`}
          className="font-medium text-gray-200 underline hover:text-primary-light focus:text-primary-light active:text-primary-dark"
          onClick={handleClick}
        >
          {element.name} ({date})
        </a>
      </div>
    );
  };

  // On Render Function: fetches game's data from database.
  useEffect(() => {
    fetchGame();
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <div className="page-bar">
        <Link to="/" className="page-bar-btn">
          <BsFillArrowLeftCircleFill style={{ marginRight: "8px" }} /> Return
          Home
        </Link>
      </div> */}

      {/* Core info section */}
      <div className="m-auto px-4 py-4 max-w-md">
        <div className="bg-black shadow-2xl">
          <div>
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.core_info.cover.image_id}.jpg`}
              alt={`${game.core_info.name}`}
            />
          </div>
          <div className="px-4 py-2 mt-2 bg-black">
            <h2 className="font-bold text-2xl text-gray-100">
              {game.core_info.name}
            </h2>

            <div className="flex items-center">
              {game.core_info.first_release_date &&
              game.core_info.first_release_date.date ? (
                <h3>{game.core_info.first_release_date.date}</h3>
              ) : null}
              {game.core_info.first_release_date &&
                game.core_info.first_release_date.date &&
                typeof game.core_info.category !== "undefined" && (
                  <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
                )}
              {game.core_info.category != null && (
                <h3>{findCategoryOfTitle(game.core_info.category)}</h3>
              )}
            </div>

            <p className="sm:text-sm text-xs text-gray-200 px-2 mr-1 my-3">
              {game.core_info.summary}
            </p>
            <div className="flex items-center ml-3 my-4">
              <ul className="space-y-1">
                {game.core_info.igdb_rating ? (
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-primary-light me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className="ms-2 text-sm font-bold text-gray-200">
                      {game.core_info.igdb_rating.toFixed(2)}
                    </p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
                    <p className="text-sm font-medium text-gray-200">IGDB</p>
                  </li>
                ) : null}
                {game.core_info.aggregated_rating &&
                game.core_info.aggregated_rating_count ? (
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-primary-light me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className="ms-2 text-sm font-bold text-gray-200">
                      {game.core_info.aggregated_rating.toFixed(2)}
                    </p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
                    <p className="text-sm font-medium text-gray-200">
                      {game.core_info.aggregated_rating_count} critic ratings
                    </p>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="px-4 py-4">
        <div className="flex flex-col justify-center items-center">
          <div className="relative flex flex-col items-center max-w-3xl mx-auto bg-black shadow-2xl p-3">
            <div className="mt-2 mb-6 w-full">
              <h4 className="px-2 text-xl font-bold text-gray-100">
                General Information
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 w-full">
              {displayAboutInvolvedCompanies(
                game.about.involved_companies,
                "developer"
              )}
              {displayAboutInvolvedCompanies(
                game.about.involved_companies,
                "supporting"
              )}
              {displayAboutInvolvedCompanies(
                game.about.involved_companies,
                "porting"
              )}
              {displayAboutInvolvedCompanies(
                game.about.involved_companies,
                "publisher"
              )}
              {displayAboutElementList(game.about.genres, "Genres")}
              {displayAboutElementList(game.about.themes, "Themes")}
              {displayAboutElementList(game.about.game_modes, "Game Modes")}
              {displayAboutElementList(
                game.about.player_perspectives,
                "Player Perspectives"
              )}
              {displayAboutElementList(game.about.collections, "Series")}
              {displayAboutElementList(game.about.franchises, "Franchises")}
              {displayAboutElementList(game.about.franchises, "Franchises")}
              {displayAboutElementList(game.about.game_engines, "Game Engines")}
              {displayAboutElementList(game.about.platforms, "Platforms")}
              {displayMainGameOrVersion(game.about.parent_game, "Main Game")}
              {displayMainGameOrVersion(
                game.about.version_parent,
                "Original Version"
              )}
            </div>
            <div className="flex flex-col items-start px-4 py-4">
              <p className="font-medium text-gray-200">Story</p>
              <p className="text-sm text-gray-200">{game.about.storyline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex flex-col justify-center items-center">
          <div className="relative flex flex-col items-center max-w-3xl mx-auto bg-black shadow-2xl p-3">
            <div className="mt-2 mb-6 w-full">
              <h4 className="px-2 text-xl font-bold text-gray-100">Links</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 w-full">
              {/* <a
                href={game.links.external_games[6].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXbox /> {game.links.external_games[6].name}
              </a>
              <a
                href={game.links.external_games[18].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPlaystation />
                {game.links.external_games[18].name}
              </a>
              <a
                href={game.links.websites[6].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSteam />
                {game.links.websites[6].name}
              </a> */}
            </div>
            <div className="flex flex-col items-start px-4 py-4">
              <p className="font-medium text-gray-200">Story</p>
              <p className="text-sm text-gray-200">{game.about.storyline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="">
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
