import { useEffect, useState } from "react";
import {
  displayAboutInvolvedCompanies,
  displayAboutElementList,
  displayMainGameOrVersion,
  fetchInvolvedCompanyInfo,
  fetchNames,
  fetchNameAndDate,
  fetchNamesAndAbbreviations,
} from "./functions";
import { SpinnerLg } from "./spinners";

export const AboutSection = ({ isDisplayed, info, navigate }) => {
  const [aboutInfo, setAboutInfo] = useState(null);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchInfo = async () => {
    try {
      const aboutData = info;

      if (aboutData) {
        await sleep(1000);
        await fetchNameAndDate(aboutData.parent_game); // Fetching 'name' and 'first_release_date' for 'parent_game'
        await fetchNameAndDate(aboutData.version_parent); // Fetching 'name' and 'first_release_date' for 'version_parent'
        await sleep(1000);
        await fetchInvolvedCompanyInfo(aboutData.involved_companies); // Fetching 'company', 'developer', 'porting', 'publisher', and 'supporting' for 'involved_companies'
        await fetchNames(aboutData.genres, "genres"); // Fetching 'name' for 'genres'
        await sleep(1000);
        await fetchNames(aboutData.themes, "themes"); // Fetching 'name' for 'themes'
        await fetchNames(aboutData.game_modes, "game_modes"); // Fetching 'name' for 'game_modes'
        await sleep(1000);
        await fetchNames(aboutData.player_perspectives, "player_perspectives"); // Fetching 'name' for 'player_perspectives'
        await fetchNames(aboutData.collections, "collections"); // Fetching 'name' for 'collections'
        await sleep(1000);
        await fetchNames(aboutData.franchises, "franchises"); // Fetching 'name' for 'franchises'
        await fetchNames(aboutData.game_engines, "game_engines"); // Fetching 'name' for 'game_engines'
        await sleep(1000);
        await fetchNamesAndAbbreviations(info.platforms, "platforms"); // Fetching 'name' and 'abbreviation' for 'platforms'

        // console.log("About Section log:", info);
        setAboutInfo(aboutData);
      } else {
        alert("About Section data not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [info]);

  if (!aboutInfo && isDisplayed) return <SpinnerLg />;

  return (
    <div
      className={`${
        isDisplayed ? "block" : "hidden"
      } flex flex-col justify-center items-center`}
    >
      <div className="relative flex flex-col items-center max-w-3xl mx-auto bg-black shadow-2xl px-4 py-3">
        <div className="mb-6 w-full">
          <h4 className="px-2 text-xl font-bold text-gray-100">
            General Information
          </h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 w-full">
          {displayAboutInvolvedCompanies(info.involved_companies, "developer")}
          {displayAboutInvolvedCompanies(info.involved_companies, "supporting")}
          {displayAboutInvolvedCompanies(info.involved_companies, "porting")}
          {displayAboutInvolvedCompanies(info.involved_companies, "publisher")}
          {displayAboutElementList(info.genres, "Genres")}
          {displayAboutElementList(info.themes, "Themes")}
          {displayAboutElementList(info.game_modes, "Game Modes")}
          {displayAboutElementList(
            info.player_perspectives,
            "Player Perspectives"
          )}
          {displayAboutElementList(info.collections, "Series")}
          {displayAboutElementList(info.franchises, "Franchises")}
          {displayAboutElementList(info.game_engines, "Game Engines")}
          {displayAboutElementList(info.platforms, "Platforms")}
          {displayMainGameOrVersion(info.parent_game, "Main Game", navigate)}
          {displayMainGameOrVersion(
            info.version_parent,
            "Original Version",
            navigate
          )}
        </div>
        {info.storyline ? (
          <div className="flex flex-col items-start px-4 py-4">
            <p className="font-medium text-gray-200">Story</p>
            <p className="text-sm text-gray-200">{info.storyline}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
