import { FaStar, FaEdit } from "react-icons/fa";

export const RatingScore = ({ rating, criticsCount, label, onClick }) => {
  if (!rating) return null;

  return (
    <li className="flex items-center">
      <FaStar className="size-4 text-primary-light" />
      <p className="ms-2 text-sm font-bold text-gray-200">
        {rating.toFixed(0)}
      </p>
      <span className="w-1 h-1 mx-1.5 bg-gray-400 rounded-full"></span>
      <p className="text-sm font-medium text-gray-200">
        {criticsCount ? criticsCount : null} {label}
      </p>
      {onClick ? (
        <button
          className="ml-2 cursor-pointer focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black transition ease-out"
          onClick={onClick}
        >
          <FaEdit />
        </button>
      ) : null}
    </li>
  );
};
