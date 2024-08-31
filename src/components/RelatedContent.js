import { Link } from "react-router-dom";

export const RelatedContent = ({ titles }) => {
  return (
    <div>
      <ul className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-3 pb-3">
        {titles.map((title) => (
          <li key={title.id} className="w-full flex">
            <Link to={`/game/${title.id}`} className="flex flex-col w-full h-full">
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${title.cover.image_id}.jpg`}
                alt={title.name}
                className="w-full h-full object-cover"
              />
              <div className="w-full bg-black bg-opacity-60 text-gray-200 text-sm p-2">
                <p className="truncate">{title.name}</p>
                <p className="text-xs">
                  {title.first_release_date.epoch
                    ? new Date(
                        title.first_release_date.epoch * 1000
                      ).getUTCFullYear()
                    : null}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
