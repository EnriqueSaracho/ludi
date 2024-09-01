import { RelatedContentList } from "./RelatedContentList";
import { SpinnerLg } from "./spinners";

export const RelatedContentSection = ({ info }) => {
  if (info.bundles && info.bundles.length <= 1) return <SpinnerLg />;

  const keys = Object.keys(info);
  if (keys.length === 1 && keys[0] === "bundles") return null;

  return (
    <div className="bg-black shadow-2xl px-4 py-4">
      <div className="mb-2 w-full">
        <h4 className="px-2 text-xl font-bold text-gray-100 text-center md:text-start">
          Related Content
        </h4>
      </div>
      <RelatedContentList list={info.bundles} title={"Bundles"} />
      <RelatedContentList list={info.dlcs} title={"DLCs"} />
      <RelatedContentList list={info.editions} title={"Editions"} />
      <RelatedContentList list={info.episodes} title={"Episodes"} />
      <RelatedContentList list={info.expanded_games} title={"Expanded Games"} />
      <RelatedContentList list={info.expansions} title={"Expansions"} />
      <RelatedContentList list={info.forks} title={"Forks"} />
      <RelatedContentList list={info.mods} title={"Mods"} />
      <RelatedContentList list={info.packs} title={"Packs"} />
      <RelatedContentList list={info.ports} title={"Ports"} />
      <RelatedContentList list={info.remakes} title={"Remakes"} />
      <RelatedContentList list={info.remasters} title={"Remasters"} />
      <RelatedContentList list={info.seasons} title={"Seasons"} />
      <RelatedContentList
        list={info.standalone_expansions}
        title={"Standalone Expansions"}
      />
      <RelatedContentList list={info.updates} title={"Updates"} />
    </div>
  );
};
