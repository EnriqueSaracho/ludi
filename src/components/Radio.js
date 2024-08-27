import cx from "clsx";

export const Radio = ({
  defaultChecked = false,
  disabled = false,
  id,
  label,
  name,
  onChange = () => {},
  value,
}) => (
  <div className="flex gap-2 items-start">
    <div className="grid place-items-center mt-1">
      <input
        type="radio"
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="peer col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 border-primary rounded-full focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-primary-light disabled:border-gray-400"
        onChange={onChange}
        value={value}
      />
      <div
        className={cx(
          "pointer-events-none",
          "col-start-1 row-start-1",
          "w-2 h-2 rounded-full peer-checked:bg-primary",
          "peer-checked:peer-disabled:bg-gray-400"
        )}
      />
    </div>
    <label
      htmlFor={id}
      className={cx("text-start hover:cursor-pointer", {
        "text-gray-400": disabled,
      })}
    >
      {label}
    </label>
  </div>
);
