import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { RelatedContent } from "../components/RelatedContentList";
import {
  SpinnerSm,
  SpinnerMd,
  SpinnerLg,
  SpinnerXl,
  Spinner2xl,
} from "../components/spinners";
import { CoreInfoSection } from "../components/CoreInfoSection";
import { OptionsBar } from "../components/OptionsBar";
import { AboutSection } from "../components/AboutSection";
import { MediaSection } from "../components/MediaSection";
import { RelatedContentSection } from "../components/RelatedContentSection";
import { Button } from "../components/Button";

export const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [aboutState, setAboutState] = useState({
    isLoaded: false,
    isDisplayed: false,
  });
  const [mediaState, setMediaState] = useState({
    isLoaded: false,
    isDisplayed: false,
  });
  const [relatedContentState, setRelatedContentState] = useState({
    isLoaded: false,
    isDisplayed: false,
  });
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Function: fetches game's about data
  const fetchAboutInfo = async () => {
    try {
      const gameData = game;
      // await sleep(1000);
      await fetchNameAndDate(gameData.about.parent_game); // Fetching 'name' and 'first_release_date' for 'parent_game'
      await fetchNameAndDate(gameData.about.version_parent); // Fetching 'name' and 'first_release_date' for 'version_parent'
      await fetchInvolvedCompanyInfo(gameData.about.involved_companies); // Fetching 'company', 'developer', 'porting', 'publisher', and 'supporting' for 'involved_companies'
      await fetchNames(gameData.about.genres, "genres"); // Fetching 'name' for 'genres'
      // await sleep(1000);
      await fetchNames(gameData.about.themes, "themes"); // Fetching 'name' for 'themes'
      await fetchNames(gameData.about.game_modes, "game_modes"); // Fetching 'name' for 'game_modes'
      await fetchNames(
        gameData.about.player_perspectives,
        "player_perspectives"
      ); // Fetching 'name' for 'player_perspectives'
      await fetchNames(gameData.about.collections, "collections"); // Fetching 'name' for 'collections'
      // await sleep(1000);
      await fetchNames(gameData.about.franchises, "franchises"); // Fetching 'name' for 'franchises'
      await fetchNames(gameData.about.game_engines, "game_engines"); // Fetching 'name' for 'game_engines'
      await fetchNamesAndAbbreviations(gameData.about.platforms, "platforms"); // Fetching 'name' and 'abbreviation' for 'platforms'

      // links
      await fetchCategoryAndUrl(
        gameData.links.external_games,
        "external_games"
      ); // Fetching 'category' and 'url' for 'external_games' and finding 'name' (game's info on other services)
      await fetchCategoryAndUrl(gameData.links.websites, "websites"); // Fetching 'category' and 'url' for 'websites' and finding 'name'

      setGame({
        ...game,
        about: {
          ...game.about,
          parent_game: gameData.about.parent_game,
          version_parent: gameData.about.version_parent,
          involved_companies: gameData.about.involved_companies,
          genres: gameData.about.genres,
          themes: gameData.about.themes,
          game_modes: gameData.about.game_modes,
          player_perspectives: gameData.about.player_perspectives,
          collections: gameData.about.collections,
          franchises: gameData.about.franchises,
          game_engines: gameData.about.game_engines,
          platforms: gameData.about.platforms,
        },
        links: {
          ...game.links,
          external_games: gameData.links.external_games,
          websites: gameData.links.websites,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Function: fetches game's media data
  const fetchMediaInfo = async () => {
    try {
      const gameData = game;
      await fetchImageIds(gameData.media.screenshots, "screenshots"); // Fetching 'image_id', 'height', and 'width' for 'screenshots'
      await fetchImageIds(gameData.media.artworks, "artworks"); // Fetching 'image_id', 'height', and 'width' for 'artworks'
      await fetchNamesAndVideoIds(gameData.media.videos, "game_videos"); // Fetching 'name' and 'video_id' for 'videos' // Note: Youtube's base URL: "https://www.youtube.com/watch?v="
      setGame({
        ...game,
        media: {
          ...game.media,
          screenshots: gameData.media.screenshots,
          artworks: gameData.media.artworks,
          videos: gameData.media.videos,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Function: fetches game's media data
  const fetchRelatedContentInfo = async () => {
    try {
      const gameData = game;
      await fetchRelatedContent(gameData); // Fetching related content
      setGame({
        ...game,
        related_content: {
          ...game.related_content,
          bundles: gameData.related_content.bundles,
          dlcs: gameData.related_content.dlcs,
          expansions: gameData.related_content.expansions,
          standalone_expansions: gameData.related_content.standalone_expansions,
          mods: gameData.related_content.mods,
          episodes: gameData.related_content.episodes,
          seasons: gameData.related_content.seasons,
          remakes: gameData.related_content.remakes,
          remasters: gameData.related_content.remasters,
          expanded_games: gameData.related_content.expanded_games,
          ports: gameData.related_content.ports,
          forks: gameData.related_content.forks,
          packs: gameData.related_content.packs,
          updates: gameData.related_content.updates,
          editions: gameData.related_content.editions,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Function: fetches game's data from IGDB database.
  const fetchGame = async () => {
    console.log("fetchGame running...", game);

    try {
      // Fetching game's initial data
      const gameData = await fetchInitialGameData(id);
      setGame(gameData);

      if (gameData) {
        // core_info
        await fetchCoverImageId(gameData); // Fetching 'image_id', 'height', and 'width' for 'cover'
        convertDate(gameData.core_info.first_release_date); // Converting first_release_date from 'epoch' to 'date'
        setGame(gameData);
        await sleep(500);

        // links
        // await fetchCategoryAndUrl(
        //   gameData.links.external_games,
        //   "external_games"
        // ); // Fetching 'category' and 'url' for 'external_games' and finding 'name' (game's info on other services)
        // await fetchCategoryAndUrl(gameData.links.websites, "websites"); // Fetching 'category' and 'url' for 'websites' and finding 'name'

        // media
        await fetchImageIds(gameData.media.screenshots, "screenshots"); // Fetching 'image_id', 'height', and 'width' for 'screenshots'
        await fetchImageIds(gameData.media.artworks, "artworks"); // Fetching 'image_id', 'height', and 'width' for 'artworks'
        await fetchNamesAndVideoIds(gameData.media.videos, "game_videos"); // Fetching 'name' and 'video_id' for 'videos' // Note: Youtube's base URL: "https://www.youtube.com/watch?v="
        setGame(gameData);
        await sleep(500);

        // related_content
        await fetchRelatedContent(gameData); // Fetching related content
        setGame(gameData);
        await sleep(500);

        // about
        await sleep(500);
        await fetchNameAndDate(gameData.about.parent_game); // Fetching 'name' and 'first_release_date' for 'parent_game'
        await fetchNameAndDate(gameData.about.version_parent); // Fetching 'name' and 'first_release_date' for 'version_parent'
        await fetchInvolvedCompanyInfo(gameData.about.involved_companies); // Fetching 'company', 'developer', 'porting', 'publisher', and 'supporting' for 'involved_companies'
        await fetchNames(gameData.about.genres, "genres"); // Fetching 'name' for 'genres'
        await sleep(500);
        await fetchNames(gameData.about.themes, "themes"); // Fetching 'name' for 'themes'
        await fetchNames(gameData.about.game_modes, "game_modes"); // Fetching 'name' for 'game_modes'
        await fetchNames(
          gameData.about.player_perspectives,
          "player_perspectives"
        ); // Fetching 'name' for 'player_perspectives'
        await fetchNames(gameData.about.collections, "collections"); // Fetching 'name' for 'collections'
        await sleep(500);
        await fetchNames(gameData.about.franchises, "franchises"); // Fetching 'name' for 'franchises'
        await fetchNames(gameData.about.game_engines, "game_engines"); // Fetching 'name' for 'game_engines'
        await fetchNamesAndAbbreviations(gameData.about.platforms, "platforms"); // Fetching 'name' and 'abbreviation' for 'platforms'
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
    const storedId = localStorage.getItem("currentId");

    if (storedId !== id) {
      localStorage.setItem("currentId", id);
      window.location.reload();
    } else {
      setGame(null);
      fetchGame();
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!game) {
    return (
      <div className="h-screen flex items-center">
        <Spinner2xl />
      </div>
    );
  }

  return (
    <div className="z-0">
      {/* Core info section */}
      <div className="p-4">
        <CoreInfoSection coreInfo={game.core_info} />
      </div>

      {/* TODO: Remove test button when done */}
      <Button
        onClick={() => {
          console.log(game);
        }}
        label={"Log Game"}
      ></Button>

      <div className="p-4 max-w-[1116px] mx-auto">
        <MediaSection isDisplayed={mediaState.isDisplayed} info={game.media} />
      </div>
      <div className="p-4 max-w-[1116px] mx-auto">
        <RelatedContentSection info={game.related_content} />
      </div>
      <div className="p-4 max-w-[1116px] mx-auto">
        <AboutSection info={game.about} />
      </div>
    </div>
  );
};
