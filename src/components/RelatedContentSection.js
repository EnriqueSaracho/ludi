import { RelatedContent } from "./TempRelatedContent";
import { SpinnerLg, SpinnerMd } from "./spinners";

export const RelatedContentSection = ({ isDisplayed, info }) => {
  // if (!info && isDisplayed) return <SpinnerLg />;

  return (
    <div
      // className={isDisplayed ? "block" : "hidden"}
      className="bg-black"
    >
      {info.bundles && info.bundles.length > 0 && info.bundles[0].image_id && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Bundles</h4>
          <RelatedContent titles={info.bundles} />
        </div>
      )}
      {info.dlcs && info.dlcs.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">DLCs</h4>
          <RelatedContent titles={info.dlcs} />
        </div>
      )}
      {info.editions && info.editions.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
            Editions
          </h4>
          <RelatedContent titles={info.editions} />
        </div>
      )}
      {info.episodes && info.episodes.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
            Episodes
          </h4>
          <RelatedContent titles={info.episodes} />
        </div>
      )}
      {info.expanded_games && info.expanded_games.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
            Expanded Games
          </h4>
          <RelatedContent titles={info.expanded_games} />
        </div>
      )}
      {info.expansions && info.expansions.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
            Expansions
          </h4>
          <RelatedContent titles={info.expansions} />
        </div>
      )}
      {info.forks && info.forks.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Forks</h4>
          <RelatedContent titles={info.forks} />
        </div>
      )}
      {info.mods && info.mods.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Mods</h4>
          <RelatedContent titles={info.mods} />
        </div>
      )}
      {info.packs && info.packs.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Packs</h4>
          <RelatedContent titles={info.packs} />
        </div>
      )}
      {info.ports && info.ports.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Ports</h4>
          <RelatedContent titles={info.ports} />
        </div>
      )}
      {info.remakes && info.remakes.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Remakes</h4>
          <RelatedContent titles={info.remakes} />
        </div>
      )}
      {info.remasters && info.remasters.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
            Remasters
          </h4>
          <RelatedContent titles={info.remasters} />
        </div>
      )}
      {info.seasons && info.seasons.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Seasons</h4>
          <RelatedContent titles={info.seasons} />
        </div>
      )}
      {info.standalone_expansions && info.standalone_expansions.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">
            Standalone Expansions
          </h4>
          <RelatedContent titles={info.standalone_expansions} />
        </div>
      )}
      {info.updates && info.updates.length > 0 && (
        <div className="pt-11 flex flex-col items-center">
          <h4 className="px-2 text-xl font-bold text-gray-100 pb-4">Updates</h4>
          <RelatedContent titles={info.updates} />
        </div>
      )}
    </div>
  );
};
