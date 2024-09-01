import { AboutElementList } from "./AboutElementList";
import { InvolvedCompaniesList } from "./InvolvedCompaniesList";
import { MainGame } from "./MainGame";

export const AboutSection = ({ info }) => {
  return (
    <div className="relative flex flex-col items-center bg-black shadow-2xl px-4 py-4">
      <div className="mb-2 w-full">
        <h4 className="px-2 text-xl font-bold text-gray-100 text-center md:text-start">
          General Information
        </h4>
      </div>
      {info.storyline ? (
        <div className="flex flex-col items-start px-4 py-4">
          <p className="font-medium text-gray-200">Story</p>
          <p className="text-sm text-gray-200">{info.storyline}</p>
        </div>
      ) : null}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 px-2 w-full">
        <InvolvedCompaniesList
          list={info.involved_companies}
          listName={"developer"}
        />
        <InvolvedCompaniesList
          list={info.involved_companies}
          listName={"supporting"}
        />
        <InvolvedCompaniesList
          list={info.involved_companies}
          listName={"porting"}
        />
        <InvolvedCompaniesList
          list={info.involved_companies}
          listName={"publisher"}
        />
        <AboutElementList list={info.genres} listTitle={"Genres"} />
        <AboutElementList list={info.themes} listTitle={"Themes"} />
        <AboutElementList list={info.game_modes} listTitle={"Game Modes"} />
        <AboutElementList
          list={info.player_perspectives}
          listTitle={"Player Perspectives"}
        />
        <AboutElementList list={info.collections} listTitle={"Series"} />
        <AboutElementList list={info.franchises} listTitle={"Franchises"} />
        <AboutElementList list={info.game_engines} listTitle={"Game Engines"} />
        <AboutElementList list={info.platforms} listTitle={"Platforms"} />
        <MainGame element={info.parent_game} title={"Main Game"} />
        <MainGame element={info.version_parent} title={"Original Version"} />
      </div>
    </div>
  );
};
