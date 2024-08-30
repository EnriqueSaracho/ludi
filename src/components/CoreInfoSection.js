import { findCategoryOfTitle } from "./functions";
import { useState } from "react";
import { RatingScore } from "./RatingScore";
import { Button } from "./Button";
import { EditRatingPopUp } from "./EditRatingPopUp";
import { EditStatePopUp } from "./EditStatePopUp";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import {
  MdOutlineBookmarkAdd,
  MdOutlineBookmarkAdded,
  MdPlaylistAdd,
  MdPlaylistAddCheck,
} from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";

export const CoreInfoSection = ({ coreInfo }) => {
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [isEditingState, setIsEditingState] = useState(false);

  const handleEditStateClick = () => {
    setIsEditingState((prevState) => !prevState);
  };

  const handleEditRatingClick = () => {
    setIsEditingRating((prevState) => !prevState);
  };

  return (
    <div className="max-w-[396px] mx-auto shadow-2xl flex flex-col lg:flex-row lg:max-w-none lg:space-x-4 lg:shadow-none lg:w-fit">
      <div className="max-w-[396px] max-h-[561px] lg:min-w-[396px] lg:shadow-2xl">
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${coreInfo.cover.image_id}.jpg`}
          alt={`${coreInfo.name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-2 bg-black lg:shadow-2xl lg:max-w-2xl">
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

        <div className="lg:flex lg:justify-stretch">
          <div>
            <div className="flex items-center mx-3 my-4">
              <ul className="space-y-1">
                <RatingScore rating={coreInfo.igdb_rating} label={"IGDB"} />
                <RatingScore
                  rating={coreInfo.aggregated_rating}
                  criticsCount={coreInfo.aggregated_rating_count}
                  label={"critic ratings"}
                />
                {/* TODO: Temporary test Ludi rating. This only shows if the game has been rated at least once on the app */}
                <RatingScore rating={96} label={"Ludi"} />
                {/* TODO: Temporary test personal rating. This only shows if the current account has rated the game */}
                <RatingScore
                  rating={90}
                  label={"Personal"}
                  onClick={handleEditRatingClick}
                />
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
          </div>

          {/* TODO: This buttons are still not functional. If any of these buttons are clicked without being logged in to an account it should send the user to the log-in or register page/process */}
          <div className="flex flex-col items-center mx-auto space-y-2 my-4 w-52 lg:ml-8">
            {/* TODO: This button only shows if the player has not rated the game */}
            <Button label={"Rate"} Icon={FaRegStar} />
            {/* TODO: This button shows if the game has not been added to the to-play queue */}
            {/* <Button label={"Add to Queue"} Icon={MdPlaylistAdd} /> */}
            {/* TODO: This button shows if the game has been added to the to-play queue */}
            <Button
              label={"Added to Queue"}
              Icon={MdPlaylistAddCheck}
              isActive
            />
            {/* TODO: This button shows if the game has not been saved */}
            {/* <Button label={"Save"} Icon={MdOutlineBookmarkAdd} /> */}
            {/* TODO: This button shows if the game has been saved */}
            <Button label={"Saved"} Icon={MdOutlineBookmarkAdded} isActive />
          </div>
        </div>
      </div>
      {isEditingRating && <EditRatingPopUp onClick={handleEditRatingClick} />}
      {isEditingState && <EditStatePopUp onClick={handleEditStateClick} />}
    </div>
  );
};
