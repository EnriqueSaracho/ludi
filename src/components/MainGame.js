import { Link } from "react-router-dom";

export const MainGame = ({ element, title, navigate }) => {
  if (!element || !element.hasOwnProperty("first_release_date")) return null;

  const date = element.first_release_date?.date.split("/")[2];

  return (
    <div className="flex flex-col items-start px-3 py-4">
      <p className="text-sm text-gray-200">{title}</p>
      <Link
        to={`/game/${element.id}`}
        className="font-medium text-gray-200 underline hover:text-primary-light focus:text-primary-light active:text-primary-dark"
      >
        {element.name} ({date})
      </Link>
    </div>
  );
};
