export const Input = ({
  valueLabel,
  onChange,
  onBlur,
  checked,
  value,
  name,
  type,
}) => {
  return (
    <>
      {type === "checkbox" ? (
        <div className="flex items-center">
          <input
            id="link-checkbox"
            name={name}
            type={type}
            onChange={onChange}
            checked={checked}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="link-checkbox"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {valueLabel}
          </label>
        </div>
      ) : (
        <div className="relative">
          <input
            className={
              "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            }
            placeholder=" "
            type={type || "text"}
            id={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            checked={checked}
          />
          <label
            htmlFor={name}
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 pointer-events-none"
          >
            {valueLabel}
          </label>
        </div>
      )}
    </>
  );
};
