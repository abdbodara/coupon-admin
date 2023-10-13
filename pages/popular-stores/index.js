import MultiSelect from "@/components/common/multi-select";
import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useSelector } from "react-redux";

const PopularStores = () => {
  const marchants = useSelector((state) => state.cat.marchants);

  const [dropdownOption, setDropdownOption] = useState([]);
  const [selected, setSelected] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");

  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
  };

  useEffect(() => {
    setDropdownOption(
      marchants &&
        marchants?.data?.map((val) => {
          return { value: val?._id, label: val?.RetailerName };
        })
    );
  }, [marchants?.data]);

  return (
    <div className="p-4">
      {dropdownOption?.length > 0 && (
        <MultiSelect
          handleChange={handleChange}
          setSelected={setSelected}
          dropdownOption={dropdownOption}
        />
      )}
      <div className="flex items-center flex-wrap gap-1 mt-3">
        <div className="max-w-[340px] w-full relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-500 py-2 text-sm px-3 w-full pr-6 focus:outline-none"
            placeholder="store name"
          />
          <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="table-user-main w-full mt-5 overflow-x-auto">
        <table className="md:w-[1500px] w-[1000px] obverflow-x-auto border border-[#efefef]">
          <thead className="">
            <tr>
              <th>
                Index
                <div className="h-[20px]"></div>
              </th>
              <th>Store Logo</th>
              <th>Store Name</th>
              <th>Store Link</th>
            </tr>
          </thead>
          <tbody>
            {selected &&
              selected
                ?.filter((item) => {
                  const regex = new RegExp(searchText, "i");
                  return regex.test(item.label);
                })
                .map((val, i) => {
                  const merchant = marchants?.data?.find(
                    (value) => value?._id === val?.value
                  );
                  return (
                    <tr key={val?.value}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">
                        <img
                          src={`http://localhost:3000/uploads/${merchant?.RetailerLogo}`}
                          className="w-[80px] mx-auto"
                        />
                      </td>
                      <td className="text-center">{val?.label}</td>
                      <td className="text-center blue">
                        <a href={merchant?.RetailerUrl} target="_blank">
                          {merchant?.RetailerUrl}
                        </a>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PopularStores;
