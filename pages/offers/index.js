import React, { useState } from "react";

import { FiEdit } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const Offers = () => {
  const offers = useSelector((state) => state.cat.offers);
  const categories = useSelector((state) => state.cat.categories);
  const marchants = useSelector((state) => state.cat.marchants);

    // Search states
    const [searchText, setSearchText] = useState("");

  return (
    <div className="p-4">
      <div className="flex items-center flex-wrap gap-1 mt-3">
        <div className="max-w-[340px] w-full relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-500 py-2 text-sm px-3 w-full pr-6 focus:outline-none"
            placeholder="title, description, merchant, category"
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
              <th>Logo</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Conditions</th>
              <th>Merchant</th>
              <th>Category</th>
              <th className="w-[100px]"></th>
            </tr>
          </thead>
          <tbody>
            {offers &&
              offers?.data
                ?.filter((item) => {
                  const regex = new RegExp(searchText, "i");
                  const category = categories?.data?.find(
                    (cat) => cat?._id === item?.categoriesId
                  );
                  const merchant = marchants?.data?.find(
                    (marchant) => marchant?._id === item?.MerchantId
                  );
                  return (
                    regex.test(item.title) ||
                    regex.test(item.desc) ||
                    regex.test(item.RetailerName) ||
                    regex.test(category?.categoriesName) ||
                    regex.test(merchant?.RetailerName)
                  );
                })
                ?.map((val, i) => {
                  const category = categories?.data?.find(
                    (cat) => cat?._id === val?.categoriesId
                  );
                  const merchant = marchants?.data?.find(
                    (marchant) => marchant?._id === val?.MerchantId
                  );
                  return (
                    <tr key={val?._id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">
                        <img
                          src={`http://localhost:3000/uploads/${val.logo}`}
                          className="w-[80px] mx-auto"
                        />
                      </td>
                      <td className="text-center">
                        <img
                          src={`http://localhost:3000/uploads/${val.image}`}
                          className="w-[80px] mx-auto"
                        />
                      </td>
                      <td className="text-center">{val.title}</td>
                      <td className="text-center">{val.desc}</td>
                      <td className="text-center">{val.conditions}</td>
                      <td className="text-center">{merchant?.RetailerName}</td>
                      <td className="text-center">
                        {category?.categoriesName}
                      </td>
                      <td>
                        <div className="grid grid-cols-2 gap-1">
                          <button className="bg-[#19b897] hover:bg-[#237c6a] text-white p-1 flex justify-center items-center rounded-[4px] w-full">
                            <FiEdit className="text-[14px]" />
                          </button>
                          <button className="bg-red-400 hover:bg-red-700 text-white p-1 flex justify-center items-center rounded-[4px] w-full">
                            <MdOutlineDelete className="text-[16px]" />
                          </button>
                        </div>
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

export default Offers;
