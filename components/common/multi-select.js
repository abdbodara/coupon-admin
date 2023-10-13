import { useEffect } from "react";
import Select from "react-select";

export default function MultiSelect({
  setSelected,
  dropdownOption,
  handleChange,
}) {
  useEffect(() => {
    setSelected([dropdownOption[1], dropdownOption[2]]);
  }, [dropdownOption]);
  return (
    <div className="container mx-auto mt-5 flex justify-center">
      <Select
        defaultValue={[dropdownOption[1], dropdownOption[2]]}
        isMulti
        name="colors"
        onChange={handleChange}
        options={dropdownOption}
        className="lg:w-1/2 w-full"
        classNamePrefix="Search Store"
      />
    </div>
  );
}
