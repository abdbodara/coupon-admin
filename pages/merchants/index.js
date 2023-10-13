import React, { useState } from "react";
import { useRouter } from "next/router";

// Icons
import { FiEdit } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";

// Redux
import { useSelector } from "react-redux";

import { serializeObjectToQueryString } from "@/utils/common";
import { useDeleteMerchantMutation } from "@/redux/api/auth";
import { toast } from "react-toastify";
import Modal from "@/components/common/modal";

const Home = () => {
  const marchants = useSelector((state) => state.cat.marchants);

  const router = useRouter();

  const [update] = useDeleteMerchantMutation();

  // Search states
  const [searchText, setSearchText] = useState("");

  // Delete Popup
  const [open, setOpen] = useState({ status: false, id: "" });

  const deleteMerchant = (id) => {
    update(id)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <div className="p-4">
      <Modal
        open={open}
        setOpen={setOpen}
        data={{
          title: "Are you sure you want to delete this marchant?",
          subtitle:
            "Deleting this marchant will remove it from database and it would not be recoverable.",
          deleteLabel: "Delete",
          cancelLabel: "Cancel",
          onSubmit: () => {
            deleteMerchant(open.id);
            setOpen({ status: false, id: "" });
          },
          onClose: () => {
            setOpen({ status: false, id: "" });
          },
        }}
      />
      <div className="flex items-center flex-wrap gap-1 mt-3">
        <div className="max-w-[340px] w-full relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-500 py-2 text-sm px-3 w-full pr-6 focus:outline-none"
            placeholder="title, description, affilate name, meta name"
          />
          <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="table-user-main w-full mt-5 overflow-x-auto">
        <table className="md:w-[2000px] w-[1500px] obverflow-x-auto border border-[#efefef]">
          <thead className="">
            <tr>
              <th>
                Index
                <div className="h-[20px]"></div>
              </th>
              <th>Retailer Rank</th>
              <th>Title</th>
              <th>Description</th>
              <th>Retailer Logo</th>
              <th>Retailer Image</th>
              <th>Retailer Name</th>
              <th>Retailer Url</th>
              <th>Retailer Publish</th>
              <th>Meta Title</th>
              <th>Meta Description</th>
              <th>Affilate Name</th>
              <th>Affilate Url</th>
              <th className="w-[100px]"></th>
            </tr>
          </thead>
          <tbody>
            {marchants &&
              marchants?.data
                ?.filter((item) => {
                  const regex = new RegExp(searchText, "i");
                  return (
                    regex.test(item.Title) ||
                    regex.test(item.Desc) ||
                    regex.test(item.RetailerName) ||
                    regex.test(item.Affilate?.[0]["name"]) ||
                    regex.test(item.Metatitle) ||
                    regex.test(item.Metadesc)
                  );
                })
                ?.map((val, i) => (
                  <tr key={val?._id}>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{val.RetailerRank}</td>
                    <td className="text-center">{val.Title}</td>
                    <td className="text-center">{val.Desc}</td>
                    <td className="text-center">
                      <img
                        src={`http://localhost:3000/uploads/${val.RetailerLogo}`}
                        className="w-[80px] mx-auto"
                      />
                    </td>
                    <td className="text-center">
                      <img
                        src={`http://localhost:3000/uploads/${val.RetailerImage}`}
                        className="w-[80px] mx-auto"
                      />
                    </td>
                    <td className="text-center">{val.RetailerName}</td>
                    <td className="text-center blue">
                      <a href={val.RetailerUrl} target="_blank">
                        {val.RetailerUrl}
                      </a>
                    </td>
                    <td
                      className={`text-center ${
                        val.RetailerPublish === "publish"
                          ? "!text-green-400"
                          : "!text-red-500"
                      }`}
                    >
                      {val.RetailerPublish}
                    </td>
                    <td className="text-center">{val.Metatitle}</td>
                    <td className="text-center">{val.Metadesc}</td>
                    <td className="text-center">{val.Affilate?.[0]["name"]}</td>
                    <td className="text-center blue">
                      <a href={val.Affilate?.[0]["url"]} target="_blank">
                        {val.Affilate?.[0]["url"]}
                      </a>
                    </td>
                    <td>
                      <div className="grid grid-cols-2 gap-1">
                        <button
                          onClick={() =>
                            router.push(
                              "/create-merchant" +
                                "?" +
                                serializeObjectToQueryString(
                                  marchants?.data?.[i]
                                )
                            )
                          }
                          className="bg-[#19b897] hover:bg-[#237c6a] text-white p-1 flex justify-center items-center rounded-[4px] w-full"
                        >
                          <FiEdit className="text-[14px]" />
                        </button>
                        <button
                          onClick={() => {
                            setOpen({ status: true, id: val?._id });
                          }}
                          className="bg-red-400 hover:bg-red-700 text-white p-1 flex justify-center items-center rounded-[4px] w-full"
                        >
                          <MdOutlineDelete className="text-[16px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
