export const AboutList = ({ list, listTitle }) => {
  if (!list || list.length === 0 || !list[0].name) return null;

  const listItems = list.map((element, index) => (
    <li key={index} className="font-medium text-gray-200">
      {element.name}
    </li>
  ));

  return (
    <div className="flex flex-col items-start px-3 py-4">
      <p className="text-sm text-gray-200">{listTitle}</p>
      <ul>{listItems}</ul>
    </div>
  );
};
