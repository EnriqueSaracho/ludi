import { SpinnerLg } from "./spinners";
import { AboutList } from "./AboutList";
import { InvolvedCompaniesList } from "./InvolvedCompaniesList";
import { MainGame } from "./MainGame";

export const AboutSection = ({ isDisplayed, info, navigate }) => {
  if (!info.platforms[0].name && isDisplayed) return <SpinnerLg />;

  return (
    <div
      className={`${
        isDisplayed ? "block" : "hidden"
      } flex flex-col justify-center items-center`}
    >
      <div className="relative flex flex-col items-center bg-black shadow-2xl px-4 py-2">
        <div className="mb-2 w-full">
          <h4 className="px-2 text-xl font-bold text-gray-100">
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
          <AboutList list={info.genres} listTitle={"Genres"} />
          <AboutList list={info.themes} listTitle={"Themes"} />
          <AboutList list={info.game_modes} listTitle={"Game Modes"} />
          <AboutList
            list={info.player_perspectives}
            listTitle={"Player Perspectives"}
          />
          <AboutList list={info.collections} listTitle={"Series"} />
          <AboutList list={info.franchises} listTitle={"Franchises"} />
          <AboutList list={info.game_engines} listTitle={"Game Engines"} />
          <AboutList list={info.platforms} listTitle={"Platforms"} />

          <MainGame
            element={info.parent_game}
            title={"Main Game"}
            navigate={navigate}
          />
          <MainGame
            element={info.version_parent}
            title={"Original Version"}
            navigate={navigate}
          />
        </div>
      </div>
    </div>
  );
};
