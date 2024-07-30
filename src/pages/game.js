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

        // Fetching franchises names
        await fetchFranchisesNames(gameData);

        // Fetching dlcs
        await fetchDlcs(gameData);

        // Fetching expansions
        await fetchExpansions(gameData);

        // Fetching standalone expansions
        await fetchStandaloneExpansions(gameData);

        // Fetching bundles
        await fetchBundles(gameData);

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

  const fetchFranchisesNames = async (gameData) => {
    if (gameData.franchises && gameData.franchises.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/franchises`, {
        query: gameData.franchises,
      });
      response.data.forEach((franchiseRecord) => {
        const franchise = gameData.franchises.find(
          (record) => record.id === franchiseRecord.id
        );
        if (franchise) {
          franchise.name = franchiseRecord.name;
        }
      });
    }
  };

  const fetchDlcs = async (gameData) => {
    if (gameData.dlcs && gameData.dlcs.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/games_by_id`, {
        query: gameData.dlcs,
      });
      response.data.forEach((dlcRecord) => {
        const dlc = gameData.dlcs.find((record) => record.id === dlcRecord.id);
        if (dlc) {
          dlc.name = dlcRecord.name;
          dlc.cover = { id: dlcRecord.cover };
        }
      });

      await fetchCoverImageIds(gameData.dlcs);
    }
  };

  const fetchExpansions = async (gameData) => {
    if (gameData.expansions && gameData.expansions.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/games_by_id`, {
        query: gameData.expansions,
      });
      response.data.forEach((expansionRecord) => {
        const expansion = gameData.expansions.find(
          (record) => record.id === expansionRecord.id
        );
        if (expansion) {
          expansion.name = expansionRecord.name;
          expansion.cover = { id: expansionRecord.cover };
        }
      });

      await fetchCoverImageIds(gameData.expansions);
    }
  };

  const fetchStandaloneExpansions = async (gameData) => {
    if (
      gameData.standalone_expansions &&
      gameData.standalone_expansions.length > 0
    ) {
      const response = await axios.post(`${apiUrl}/igdb/games_by_id`, {
        query: gameData.standalone_expansions,
      });
      response.data.forEach((standaloneExpansionRecord) => {
        const standaloneExpansion = gameData.standalone_expansions.find(
          (record) => record.id === standaloneExpansionRecord.id
        );
        if (standaloneExpansion) {
          standaloneExpansion.name = standaloneExpansionRecord.name;
          standaloneExpansion.cover = { id: standaloneExpansionRecord.cover };
        }
      });

      await fetchCoverImageIds(gameData.standalone_expansions);
    }
  };

  const fetchBundles = async (gameData) => {
    if (gameData.bundles && gameData.bundles.length > 0) {
      const response = await axios.post(`${apiUrl}/igdb/games_by_id`, {
        query: gameData.bundles,
      });
      response.data.forEach((bundleRecord) => {
        const bundle = gameData.bundles.find(
          (record) => record.id === bundleRecord.id
        );
        if (bundle) {
          bundle.name = bundleRecord.name;
          bundle.cover = { id: bundleRecord.cover };
        }
      });

      await fetchCoverImageIds(gameData.bundles);
    }
  };

  const fetchCoverImageIds = async (records) => {
    const response = await axios.post(`${apiUrl}/igdb/covers`, {
      query: records,
    });

    response.data.forEach((coverRecord) => {
      const dlc = records.find((record) => record.cover.id === coverRecord.id);
      if (dlc) {
        dlc.cover.image_id = coverRecord.image_id;
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
