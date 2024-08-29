import { ImageCarousel, VideoCarousel } from "./carousels";
import { SpinnerLg } from "./spinners";

export const MediaSection = ({ isDisplayed, info }) => {
  if (!info && isDisplayed) return <SpinnerLg />;

  return (
    <div className={isDisplayed ? "block" : "hidden"}>
      <div className="w-[60%] m-auto pt-11">
        <ImageCarousel slides={info.artworks} />
      </div>
      <div className="w-[60%] m-auto pt-11">
        <ImageCarousel slides={info.screenshots} />
      </div>
      <div className="w-[60%] m-auto pt-11">
        <VideoCarousel slides={info.videos} />
      </div>
    </div>
  );
};
