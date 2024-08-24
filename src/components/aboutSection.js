import { Game } from "../pages/game";
import {
  displayAboutInvolvedCompanies,
  displayAboutElementList,
  displayMainGameOrVersion,
} from "./functions";

export const AboutSection = ({ aboutInfo }, navigate) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative flex flex-col items-center max-w-3xl mx-auto bg-black shadow-2xl px-4 py-3">
        <div className="mb-6 w-full">
          <h4 className="px-2 text-xl font-bold text-gray-100">
            General Information
          </h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 w-full">
          {displayAboutInvolvedCompanies(
            aboutInfo.involved_companies,
            "developer"
          )}
          {displayAboutInvolvedCompanies(
            aboutInfo.involved_companies,
            "supporting"
          )}
          {displayAboutInvolvedCompanies(
            aboutInfo.involved_companies,
            "porting"
          )}
          {displayAboutInvolvedCompanies(
            aboutInfo.involved_companies,
            "publisher"
          )}
          {displayAboutElementList(aboutInfo.genres, "Genres")}
          {displayAboutElementList(aboutInfo.themes, "Themes")}
          {displayAboutElementList(aboutInfo.game_modes, "Game Modes")}
          {displayAboutElementList(
            aboutInfo.player_perspectives,
            "Player Perspectives"
          )}
          {displayAboutElementList(aboutInfo.collections, "Series")}
          {displayAboutElementList(aboutInfo.franchises, "Franchises")}
          {displayAboutElementList(aboutInfo.game_engines, "Game Engines")}
          {displayAboutElementList(aboutInfo.platforms, "Platforms")}
          {displayMainGameOrVersion(
            aboutInfo.parent_game,
            "Main Game",
            navigate
          )}
          {displayMainGameOrVersion(
            aboutInfo.version_parent,
            "Original Version",
            navigate
          )}
        </div>
        {aboutInfo.storyline ? (
          <div className="flex flex-col items-start px-4 py-4">
            <p className="font-medium text-gray-200">Story</p>
            <p className="text-sm text-gray-200">{aboutInfo.storyline}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
