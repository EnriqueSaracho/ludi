export const RatingStar = ({ id, value, name, icon: Icon }) => {
  return (
    <>
      <input
        id={id}
        type="radio"
        className="peer -ms-7 size-7 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:outline-none focus:ring-2 ring-primary-light ring-offset-1 ring-offset-black"
        name={name}
        value={value}
      />
      <label
        htmlFor={id}
        className="pointer-events-none peer-checked:text-primary-light text-neutral-600 transition ease-out duration-75"
      >
        <Icon className="shrink-0 size-7" />
      </label>
    </>
  );
};
