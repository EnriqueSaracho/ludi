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
  displayAboutInvolvedCompanies,
  displayAboutElementList,
  displayMainGameOrVersion,
} from "../components/functions";
import {
  FaXbox,
  FaPlaystation,
  FaSteam,
  FaApple,
  FaAndroid,
  FaExternalLinkAlt,
  FaScroll,
  FaWikipediaW,
} from "react-icons/fa";
import { SiGogdotcom, SiEpicgames } from "react-icons/si";
import { ImageCarousel, VideoCarousel } from "../components/carousels";
import { RelatedContent } from "../components/relatedContent";
import {
  SpinnerSm,
  SpinnerMd,
  SpinnerLg,
  SpinnerXl,
  Spinner2xl,
} from "../components/spinners";
import { CoreInfoSection } from "../components/CoreInfoSection";
import { AboutSection } from "../components/aboutSection";

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
        // await sleep(500);

        // about
        // await fetchNameAndDate(gameData.about.parent_game); // Fetching 'name' and 'first_release_date' for 'parent_game'
        // await fetchNameAndDate(gameData.about.version_parent); // Fetching 'name' and 'first_release_date' for 'version_parent'
        // await fetchInvolvedCompanyInfo(gameData.about.involved_companies); // Fetching 'company', 'developer', 'porting', 'publisher', and 'supporting' for 'involved_companies'
        // await fetchNames(gameData.about.genres, "genres"); // Fetching 'name' for 'genres'
        // await fetchNames(gameData.about.themes, "themes"); // Fetching 'name' for 'themes'
        // await fetchNames(gameData.about.game_modes, "game_modes"); // Fetching 'name' for 'game_modes'
        // await fetchNames(
        //   gameData.about.player_perspectives,
        //   "player_perspectives"
        // ); // Fetching 'name' for 'player_perspectives'
        // await fetchNames(gameData.about.collections, "collections"); // Fetching 'name' for 'collections'
        // await fetchNames(gameData.about.franchises, "franchises"); // Fetching 'name' for 'franchises'
        // await fetchNames(gameData.about.game_engines, "game_engines"); // Fetching 'name' for 'game_engines'
        // await fetchNamesAndAbbreviations(gameData.about.platforms, "platforms"); // Fetching 'name' and 'abbreviation' for 'platforms'

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
    return (
      <div className="h-screen flex items-center">
        <Spinner2xl />
      </div>
    );
  }

  return (
    <div>
      {/* Core info section */}
      <div className="px-4 py-4 z-0">
        <CoreInfoSection coreInfo={game.core_info} />
      </div>

      {/* About section */}
      <div className="px-4 py-4">
        <AboutSection aboutInfo={game.about} navigate={navigate} />
      </div>

      {/* Links */}
      <div className="px-4 py-4"></div>

      {/* Media */}
      <div className="w-[60%] m-auto pt-11">
        <ImageCarousel slides={game.media.artworks} />
      </div>
      <div className="w-[60%] m-auto pt-11">
        <ImageCarousel slides={game.media.screenshots} />
      </div>
      <div className="w-[60%] m-auto pt-11">
        <VideoCarousel slides={game.media.videos} />
      </div>

      {/* Related Content */}
      {game.related_content.bundles &&
        game.related_content.bundles.length > 0 &&
        game.related_content.bundles[0].image_id && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Bundles
            </h4>
            <RelatedContent titles={game.related_content.bundles} />
          </div>
        )}
      {game.related_content.dlcs && game.related_content.dlcs.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">DLCs</h4>
          <RelatedContent titles={game.related_content.dlcs} />
        </div>
      )}
      {game.related_content.editions &&
        game.related_content.editions.length > 0 && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Editions
            </h4>
            <RelatedContent titles={game.related_content.editions} />
          </div>
        )}
      {game.related_content.episodes &&
        game.related_content.episodes.length > 0 && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Episodes
            </h4>
            <RelatedContent titles={game.related_content.episodes} />
          </div>
        )}
      {game.related_content.expanded_games &&
        game.related_content.expanded_games.length > 0 && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Expanded Games
            </h4>
            <RelatedContent titles={game.related_content.expanded_games} />
          </div>
        )}
      {game.related_content.expansions &&
        game.related_content.expansions.length > 0 && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Expansions
            </h4>
            <RelatedContent titles={game.related_content.expansions} />
          </div>
        )}
      {game.related_content.forks && game.related_content.forks.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Forks</h4>
          <RelatedContent titles={game.related_content.forks} />
        </div>
      )}
      {game.related_content.mods && game.related_content.mods.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Mods</h4>
          <RelatedContent titles={game.related_content.mods} />
        </div>
      )}
      {game.related_content.packs && game.related_content.packs.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Packs</h4>
          <RelatedContent titles={game.related_content.packs} />
        </div>
      )}
      {game.related_content.ports && game.related_content.ports.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Ports</h4>
          <RelatedContent titles={game.related_content.ports} />
        </div>
      )}
      {game.related_content.remakes &&
        game.related_content.remakes.length > 0 && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Remakes
            </h4>
            <RelatedContent titles={game.related_content.remakes} />
          </div>
        )}
      {game.related_content.remasters &&
        game.related_content.remasters.length > 0 && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Remasters
            </h4>
            <RelatedContent titles={game.related_content.remasters} />
          </div>
        )}
      {game.related_content.seasons &&
        game.related_content.seasons.length > 0 && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Seasons
            </h4>
            <RelatedContent titles={game.related_content.seasons} />
          </div>
        )}
      {game.related_content.standalone_expansions &&
        game.related_content.standalone_expansions.length > 0 && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Standalone Expansions
            </h4>
            <RelatedContent
              titles={game.related_content.standalone_expansions}
            />
          </div>
        )}
      {game.related_content.updates &&
        game.related_content.updates.length > 0 && (
          <div className="pt-11 flex flex-col items-center">
            <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
              Updates
            </h4>
            <RelatedContent titles={game.related_content.updates} />
          </div>
        )}
    </div>
  );
};
