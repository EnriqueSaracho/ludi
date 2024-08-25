import { findCategoryOfTitle } from "./functions";
import { useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import {
  MdOutlineBookmarkAdd,
  MdOutlineBookmarkAdded,
  MdPlaylistAdd,
  MdPlaylistAddCheck,
} from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";

export const CoreInfoSection = ({ coreInfo }) => {
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [isEditingState, setIsEditingState] = useState(false);

  const handleEditStateClick = () => {
    setIsEditingState((prevState) => !prevState);
  };

  const handleEditRatingClick = () => {
    setIsEditingRating((prevState) => !prevState);
  };

  const DisplayEditState = () => {
    const handleParentClick = (e) => {
      if (e.target === e.currentTarget) {
        handleEditStateClick();
      }
    };

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.target.name === "hs-ratings-readonly") {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            const next =
              e.target.previousElementSibling?.previousElementSibling;
            if (next && next.tagName === "INPUT") {
              next.focus();
              next.checked = true;
            }
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const prev = e.target.nextElementSibling?.nextElementSibling;
            if (prev && prev.tagName === "INPUT") {
              prev.focus();
              prev.checked = true;
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    return (
      <FocusTrap initialFocus="#hs-ratings-readonly-10">
        <div
          className="w-full h-screen fixed top-0 left-0 bg-white bg-opacity-20 z-10 backdrop-blur-sm flex justify-center items-center"
          onClick={handleParentClick}
        >
          <div
            className="w-80 bg-black px-4 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg mb-4">Game State</h3>

            <div className="flex flex-col justify-center items-center mb-6 space-y-2">
              <label
                htmlFor="not-played"
                className="text-lg select-none flex items-center space-x-2 w-full px-3 py-1 border border-gray-600 focus:outline-none focus-within:ring-2 ring-primary-light ring-offset-2 ring-offset-black transition ease-out"
              >
                <input
                  id="not-played"
                  type="radio"
                  className="focus:outline-none w-4 h-4 mr-2 appearence-none rounded-none border border-gray-600 checked:bg-primary-light checked:border-primary-light"
                  value="not-played"
                  name="game-state"
                />
                Not played
              </label>
              <label
                htmlFor="completed"
                className="text-lg select-none flex items-center space-x-2 w-full px-3 py-1 border border-gray-600 focus:outline-none focus-within:ring-2 ring-primary-light ring-offset-2 ring-offset-black transition ease-out"
              >
                <input
                  id="completed"
                  type="radio"
                  className="focus:outline-none w-4 h-4 mr-2"
                  value="completed"
                  name="game-state"
                />
                Completed
              </label>
              {/* <input
                id="hs-ratings-readonly-10"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="10"
              />
              <label
                htmlFor="hs-ratings-readonly-10"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label> */}
            </div>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <button
                className="bg-secondary-light w-24 h-10 hover:bg-secondary transition ease-out focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black active:bg-secondary-active select-none"
                onClick={handleEditStateClick}
              >
                Cancel
              </button>
              <button
                className="bg-primary w-24 h-10 hover:bg-primary-dark transition ease-out focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black active:bg-primary-active select-none"
                onClick={handleEditStateClick}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </FocusTrap>
    );
  };

  const DisplayEditRating = () => {
    const handleParentClick = (e) => {
      if (e.target === e.currentTarget) {
        handleEditRatingClick();
      }
    };

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.target.name === "hs-ratings-readonly") {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            const next =
              e.target.previousElementSibling?.previousElementSibling;
            if (next && next.tagName === "INPUT") {
              next.focus();
              next.checked = true;
            }
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const prev = e.target.nextElementSibling?.nextElementSibling;
            if (prev && prev.tagName === "INPUT") {
              prev.focus();
              prev.checked = true;
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);
    return (
      <FocusTrap initialFocus="#hs-ratings-readonly-10">
        <div
          className="w-full h-screen fixed top-0 left-0 bg-white bg-opacity-20 z-10 backdrop-blur-sm flex justify-center items-center"
          onClick={handleParentClick}
        >
          <div
            className="w-80 bg-black px-4 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg mb-4">Personal Rating</h3>

            <div className="flex flex-row-reverse justify-center items-center mb-6">
              <input
                id="hs-ratings-readonly-10"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="10"
              />
              <label
                htmlFor="hs-ratings-readonly-10"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
              <input
                id="hs-ratings-readonly-9"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="9"
              />
              <label
                htmlFor="hs-ratings-readonly-9"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
              <input
                id="hs-ratings-readonly-8"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="8"
              />
              <label
                htmlFor="hs-ratings-readonly-8"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
              <input
                id="hs-ratings-readonly-7"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="7"
              />
              <label
                htmlFor="hs-ratings-readonly-7"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
              <input
                id="hs-ratings-readonly-6"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="6"
              />
              <label
                htmlFor="hs-ratings-readonly-6"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
              <input
                id="hs-ratings-readonly-5"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="5"
              />
              <label
                htmlFor="hs-ratings-readonly-5"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
              <input
                id="hs-ratings-readonly-4"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="4"
              />
              <label
                htmlFor="hs-ratings-readonly-4"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
              <input
                id="hs-ratings-readonly-3"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="3"
              />
              <label
                htmlFor="hs-ratings-readonly-3"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
              <input
                id="hs-ratings-readonly-2"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="2"
              />
              <label
                htmlFor="hs-ratings-readonly-2"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
              <input
                id="hs-ratings-readonly-1"
                type="radio"
                className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
                name="hs-ratings-readonly"
                value="1"
              />
              <label
                htmlFor="hs-ratings-readonly-1"
                className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
              >
                <FaStar className="shrink-0 size-7" />
              </label>
            </div>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <button
                className="bg-secondary-light w-24 h-10 hover:bg-secondary transition ease-out focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black active:bg-secondary-active select-none"
                onClick={handleEditRatingClick}
              >
                Cancel
              </button>
              <button
                className="bg-primary w-24 h-10 hover:bg-primary-dark transition ease-out focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black active:bg-primary-active select-none"
                onClick={handleEditRatingClick}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </FocusTrap>
    );
  };

  return (
    <div className="max-w-[396px] mx-auto bg-black shadow-2xl">
      <div className="max-w-[396px] max-h-[561px]">
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${coreInfo.cover.image_id}.jpg`}
          alt={`${coreInfo.name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" px-4 py-2">
        <h2 className="font-bold text-2xl text-gray-100">{coreInfo.name}</h2>

        <div className="flex items-center text-gray-200">
          {coreInfo.first_release_date && coreInfo.first_release_date.date ? (
            <h3>{coreInfo.first_release_date.date}</h3>
          ) : null}
          {coreInfo.first_release_date &&
            coreInfo.first_release_date.date &&
            typeof coreInfo.category !== "undefined" && (
              <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
            )}
          {coreInfo.category != null && (
            <h3>{findCategoryOfTitle(coreInfo.category)}</h3>
          )}
        </div>

        <p className="sm:text-sm text-xs px-2 mr-1 my-3">{coreInfo.summary}</p>

        <div className="flex items-center mx-3 my-4">
          <ul className="space-y-1">
            {coreInfo.igdb_rating ? (
              <li className="flex items-center">
                <FaStar className="size-4 text-primary-light" />
                <p className="ms-2 text-sm font-bold text-gray-200">
                  {coreInfo.igdb_rating.toFixed(0)}
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
                <p className="text-sm font-medium text-gray-200">IGDB</p>
              </li>
            ) : null}
            {coreInfo.aggregated_rating && coreInfo.aggregated_rating_count ? (
              <li className="flex items-center">
                <FaStar className="size-4 text-primary-light" />
                <p className="ms-2 text-sm font-bold text-gray-200">
                  {coreInfo.aggregated_rating.toFixed(0)}
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
                <p className="text-sm font-medium text-gray-200">
                  {coreInfo.aggregated_rating_count} critic ratings
                </p>
              </li>
            ) : null}
            {/* TODO: Temporary test Ludi rating. This only shows if the game has been rated at least once on the app */}
            <li className="flex items-center">
              <FaStar className="size-4 text-primary-light" />
              <p className="ms-2 text-sm font-bold text-gray-200">96</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
              <p className="text-sm font-medium text-gray-200">Ludi</p>
            </li>
            {/* TODO: Temporary test personal rating. This only shows if the current account has rated the game */}
            <li className="flex items-center">
              <FaStar className="size-4 text-primary-light" />
              <p className="ms-2 text-sm font-bold text-gray-200">90</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
              <p className="text-sm font-medium text-gray-200">Personal </p>
              <button
                className="ml-auto cursor-pointer focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black transition ease-out"
                onClick={handleEditRatingClick}
              >
                <FaEdit />
              </button>
            </li>
          </ul>
        </div>

        <button
          className="mx-2 my-4 w-48 flex items-center justify-between px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black transition ease-out"
          onClick={handleEditStateClick}
        >
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-primary-light size-5" />
            <h3>Completed</h3>
          </div>
          <FaEdit />
        </button>

        {/* TODO: This buttons are still not functional. If any of these buttons are clicked without being logged in to an account it should send the user to the log-in or register page/process */}
        <div className="flex flex-col items-center mx-3 space-y-2 my-4">
          {/* TODO: This button only shows if the player has not rated the game */}
          {/* <button className="w-52 h-10 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black active:bg-primary-active transition ease-out flex justify-center items-center select-none">
            <FaRegStar className="inline-block mr-1 size-5" />
            Rate
          </button> */}
          {/* TODO: This button shows if the game has not been added to the to-play queue */}
          {/* <button className="w-52 h-10 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black active:bg-primary-active transition ease-out flex justify-center items-center select-none">
            <MdPlaylistAdd className="inline-block mr-1 size-5" />
            Add to Queue
          </button> */}
          {/* TODO: This button shows if the game has been added to the to-play queue */}
          <button className="w-52 h-10 bg-secondary-light hover:bg-secondary focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black active:bg-secondary-active transition ease-out flex justify-center items-center select-none">
            <MdPlaylistAddCheck className="inline-block mr-1 size-5" />
            Added to Queue
          </button>
          {/* TODO: This button shows if the game has not been saved */}
          {/* <button className="w-52 h-10 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black active:bg-primary-active transition ease-out flex justify-center items-center select-none">
            <MdOutlineBookmarkAdd className="inline-block mr-1 size-5" />
            Save
          </button> */}
          {/* TODO: This button shows if the game has been saved */}
          <button className="w-52 h-10 bg-secondary-light hover:bg-secondary focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black active:bg-secondary-active transition ease-out select-none">
            <MdOutlineBookmarkAdded className="inline-block mr-1 size-5" />
            Saved
          </button>
        </div>
      </div>
      {isEditingState && <DisplayEditState />}
      {isEditingRating && <DisplayEditRating />}
    </div>
  );
};
