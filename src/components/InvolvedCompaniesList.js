import { SpinnerMd } from "./spinners";

export const InvolvedCompaniesList = ({ list, listName }) => {
  if (
    !list ||
    list.length === 0 ||
    !list[0].name ||
    !list.some((company) => company[listName] === true)
  )
    return <SpinnerMd />;

  let listTitle;
  switch (listName) {
    case "developer":
      listTitle = "Main Developers";
      break;
    case "supporting":
      listTitle = "Supporting Developers";
      break;
    case "porting":
      listTitle = "Porting Developers";
      break;
    case "publisher":
      listTitle = "Publishers";
      break;
    default:
      listTitle = "Involved Companies";
      break;
  }
  return (
    <div className="flex flex-col items-start px-2 py-3">
      <p className="text-sm">{listTitle}</p>
      <ul>
        {list
          .filter((company) => company[listName])
          .map((company, index) => (
            <li key={index} className="font-medium">
              {company.name}
            </li>
          ))}
      </ul>
    </div>
  );
};
