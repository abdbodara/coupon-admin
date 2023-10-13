import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDeleteBrandMutation } from "@/redux/api/auth";

// Icons
import { FiEdit } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";

// Common
import { serializeObjectToQueryString } from "@/utils/common";
import Modal from "@/components/common/modal";
import { toast } from "react-toastify";

const Brands = () => {
  const barnds = useSelector((state) => state.cat.brands);

  const router = useRouter();

  const [update] = useDeleteBrandMutation();

  // Search states
  const [searchText, setSearchText] = useState("");

  // Delete Popup
  const [open, setOpen] = useState({ status: false, id: "" });

  const deleteBrand = (id) => {
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
          title: "Are you sure you want to delete this brand?",
          subtitle:
            "Deleting this brand will remove it from database and it would not be recoverable.",
          deleteLabel: "Delete",
          cancelLabel: "Cancel",
          onSubmit: () => {
            deleteBrand(open.id);
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
            placeholder="title"
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
              <th>Title</th>
              <th>About</th>
              <th>Link</th>
              <th className="w-[100px]"></th>
            </tr>
          </thead>
          <tbody>
            {barnds &&
              barnds?.data
                ?.filter((item) => {
                  const regex = new RegExp(searchText, "i");
                  return regex.test(item.brandTitle);
                })
                ?.map((val, i) => {
                  return (
                    <tr key={val?._id}>
                      <td className="text-center">{i + 1}</td>
                      <td className="text-center">
                        <img
                          src={`http://localhost:3000/uploads/${val.brandLogo}`}
                          className="w-[80px] mx-auto"
                        />
                      </td>
                      <td className="text-center">{val.brandTitle}</td>
                      <td className="text-center">{val.about}</td>
                      <td className="text-center blue">
                        <a href={val.brandLink} target="_blank">
                          {val.brandLink}
                        </a>
                      </td>
                      <td>
                        <div className="grid grid-cols-2 gap-1">
                          <button
                            onClick={() =>
                              router.push(
                                "/create-brand" +
                                  "?" +
                                  serializeObjectToQueryString(
                                    barnds?.data?.[i]
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
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Brands;
