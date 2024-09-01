import { ImageCarousel, VideoCarousel } from "./carousels";
import { SpinnerLg } from "./spinners";

export const MediaSection = ({ info }) => {
  // if (!info.artworks[0].) return <SpinnerLg />;

  return (
    <div className="bg-black shadow-2xl p-4 flex flex-col">
      <div className="mb-4 w-full">
        <h4 className="px-2 text-xl font-bold text-gray-100 text-center md:text-start">
          Media
        </h4>
      </div>
      <ImageCarousel slides={info.artworks} title={"Artworks"} />
      <ImageCarousel slides={info.screenshots} title={"Screenshots"} />
      <VideoCarousel slides={info.videos} title={"Videos"} />
    </div>
  );
};
