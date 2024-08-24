import { findCategoryOfTitle } from "./functions";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";

const starPath =
  "M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z";

const DisplayEditRating = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.name === "hs-ratings-readonly") {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const next = e.target.previousElementSibling?.previousElementSibling;
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
    <div className="w-full h-screen fixed top-0 left-0 bg-white bg-opacity-20 z-40 backdrop-blur-sm flex justify-center items-center">
      <div className="w-80 bg-black px-4 py-2">
        <h3 className="font-bold text-lg mb-4">Personal Rating</h3>

        <div className="flex flex-row-reverse justify-center items-center mb-6">
          <input
            id="hs-ratings-readonly-10"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="10"
          />
          <label
            htmlfor="hs-ratings-readonly-10"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
          <input
            id="hs-ratings-readonly-9"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="9"
          />
          <label
            htmlfor="hs-ratings-readonly-9"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
          <input
            id="hs-ratings-readonly-8"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="8"
          />
          <label
            htmlFor="hs-ratings-readonly-8"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
          <input
            id="hs-ratings-readonly-7"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="7"
          />
          <label
            htmlFor="hs-ratings-readonly-7"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
          <input
            id="hs-ratings-readonly-6"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="6"
          />
          <label
            htmlfor="hs-ratings-readonly-6"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
          <input
            id="hs-ratings-readonly-5"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="5"
          />
          <label
            htmlfor="hs-ratings-readonly-5"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
          <input
            id="hs-ratings-readonly-4"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="4"
          />
          <label
            htmlfor="hs-ratings-readonly-4"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
          <input
            id="hs-ratings-readonly-3"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="3"
          />
          <label
            htmlfor="hs-ratings-readonly-3"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
          <input
            id="hs-ratings-readonly-2"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="2"
          />
          <label
            htmlfor="hs-ratings-readonly-2"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
          <input
            id="hs-ratings-readonly-1"
            type="radio"
            className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary ring-offset-1 ring-offset-black"
            name="hs-ratings-readonly"
            value="1"
          />
          <label
            htmlfor="hs-ratings-readonly-1"
            className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
          >
            <svg
              className="shrink-0 size-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d={starPath} />
            </svg>
          </label>
        </div>

        <div className="flex items-center justify-center space-x-2 mb-4">
          <button className="bg-secondary-light w-24 h-10 hover:bg-secondary transition ease-out focus:outline-none focus:ring-2 ring-primary ring-offset-2 ring-offset-black">
            Cancel
          </button>
          <button className="bg-primary w-24 h-10 hover:bg-primary-dark transition ease-out focus:outline-none focus:ring-2 ring-primary ring-offset-2 ring-offset-black">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const CoreInfoSection = ({ coreInfo }) => {
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
        <div className="flex items-center ml-3 my-4">
          <ul className="space-y-1">
            {coreInfo.igdb_rating ? (
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-primary-light me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d={starPath} />
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-200">
                  {coreInfo.igdb_rating.toFixed(2)}
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
                <p className="text-sm font-medium text-gray-200">IGDB</p>
              </li>
            ) : null}
            {coreInfo.aggregated_rating && coreInfo.aggregated_rating_count ? (
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 text-primary-light me-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d={starPath} />
                </svg>
                <p className="ms-2 text-sm font-bold text-gray-200">
                  {coreInfo.aggregated_rating.toFixed(2)}
                </p>
                <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
                <p className="text-sm font-medium text-gray-200">
                  {coreInfo.aggregated_rating_count} critic ratings
                </p>
              </li>
            ) : null}
            {/* Temporary test Ludi rating */}
            <li className="flex items-center">
              <svg
                className="w-4 h-4 text-primary-light me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d={starPath} />
              </svg>
              <p className="ms-2 text-sm font-bold text-gray-200">95.80</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
              <p className="text-sm font-medium text-gray-200">Ludi</p>
            </li>
            {/* Temporary test personal rating */}
            <li className="flex items-center">
              <svg
                className="w-4 h-4 text-primary-light me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d={starPath} />
              </svg>
              <p className="ms-2 text-sm font-bold text-gray-200">92.73</p>
              <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
              <p className="text-sm font-medium text-gray-200">Personal </p>
              <FaEdit className="ml-auto cursor-pointer" />
            </li>
          </ul>
        </div>
      </div>
      <DisplayEditRating />
    </div>
  );
};
