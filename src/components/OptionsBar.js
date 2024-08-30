import { useEffect, useState } from "react";

export const OptionsBar = ({
  aboutState,
  mediaState,
  relatedContentState,
  setAboutState,
  setMediaState,
  setRelatedContentState,
  fetchAboutInfo,
  fetchMediaInfo,
  fetchRelatedContentInfo,
}) => {
  const [isActive, setIsActive] = useState(0);

  const handleClickAbout = () => {
    setIsActive(1);
    if (!aboutState.isLoaded) {
      fetchAboutInfo();
    }
    setAboutState({ isLoaded: true, isDisplayed: true });
    setMediaState((prevState) => ({ ...prevState, isDisplayed: false }));
    setRelatedContentState((prevState) => ({
      ...prevState,
      isDisplayed: false,
    }));
  };

  const handleClickedMedia = () => {
    setIsActive(2);
    if (!mediaState.isLoaded) {
      fetchMediaInfo();
    }
    setAboutState((prevState) => ({ ...prevState, isDisplayed: false }));
    setMediaState({ isLoaded: true, isDisplayed: true });
    setRelatedContentState((prevState) => ({
      ...prevState,
      isDisplayed: false,
    }));
  };

  const handleClickedRelatedContent = () => {
    setIsActive(3);
    if (!relatedContentState.isLoaded) {
      fetchRelatedContentInfo();
    }
    setAboutState((prevState) => ({ ...prevState, isDisplayed: false }));
    setMediaState((prevState) => ({ ...prevState, isDisplayed: false }));
    setRelatedContentState({ isLoaded: true, isDisplayed: true });
  };

  const translateValue = () => {
    switch (isActive) {
      case 1:
        return "translateX(0%)";
      case 2:
        return "translateX(102.5%)";
      case 3:
        return "translateX(205%)";
      default:
        return "scale(0,0)";
    }
  };

  return (
    <div className="bg-secondary-light relative py-4">
      <div className="h-12 w-fit mx-auto grid grid-cols-3 gap-1 items-center relative px-1">
        <OptionsBarButton label="About" onClick={handleClickAbout} />
        <OptionsBarButton label="Media" onClick={handleClickedMedia} />
        <OptionsBarButton
          label="Add-ons"
          onClick={handleClickedRelatedContent}
        />
      </div>
      <div className="bg-black h-12 w-fit mx-auto absolute inset-4 grid grid-cols-3 gap-1 px-1 items-center justify-center">
        <div
          className={`bg-primary w-20 h-10 mx-auto transition duration-150 ease-out sm:w-28 md:w-36 lg:w-44`}
          style={{ transform: translateValue() }}
        ></div>
      </div>
    </div>
  );
};

const OptionsBarButton = ({ label, onClick }) => {
  return (
    <button
      className="w-20 h-10 text-lg mx-auto z-20 sm:w-28 md:w-36 lg:w-44 select-none focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-black hover:bg-secondary transition ease-out"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
