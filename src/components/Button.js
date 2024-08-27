export const Button = ({ label, Icon, isActive = false, onClick }) => {
  return (
    <button
      className={`w-full h-10 flex justify-center items-center select-none transition ease-out focus:outline-none focus:ring-2 ring-primary-light ring-offset-2 ring-offset-black ${
        isActive
          ? "bg-secondary-light hover:bg-secondary active:bg-secondary-active"
          : "bg-primary hover:bg-primary-dark active:bg-primary-active"
      }`}
      onClick={onClick}
    >
      {Icon ? <Icon className="inline-block mr-1 size-5" /> : null}
      {label}
    </button>
  );
};
