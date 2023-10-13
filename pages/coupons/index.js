import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { FiEdit } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";

import { formatDate, serializeObjectToQueryString } from "@/utils/common";
import Modal from "@/components/common/modal";

import { useDeleteCouponMutation } from "@/redux/api/auth";
import { toast } from "react-toastify";

const Coupons = () => {
  const coupons = useSelector((state) => state.cat.coupons);
  const categories = useSelector((state) => state.cat.categories);

  const router = useRouter();

  const [update] = useDeleteCouponMutation();

  // Search states
  const [searchText, setSearchText] = useState("");

  // Delete Popup
  const [open, setOpen] = useState({ status: false, id: "" });

  const deleteCoupon = (id) => {
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
          title: "Are you sure you want to delete this coupon?",
          subtitle:
            "Deleting this coupon will remove it from database and it would not be recoverable.",
          deleteLabel: "Delete",
          cancelLabel: "Cancel",
          onSubmit: () => {
            deleteCoupon(open.id);
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
            placeholder="title, description, reatiler, coupon, category"
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
              <th>Status</th>
              <th>Title</th>
              <th>Description</th>
              <th>CouponCode</th>
              <th>Category</th>
              <th>RetailerName</th>
              <th>ExpiryDate</th>
              <th>Conditions</th>
              <th className="w-[100px]"></th>
            </tr>
          </thead>
          <tbody>
            {coupons &&
              coupons?.data
                ?.filter((item) => {
                  const regex = new RegExp(searchText, "i");
                  const category = categories?.data?.find(
                    (cat) => cat?._id === item?.categoriesId
                  );
                  return (
                    regex.test(item.Title) ||
                    regex.test(item.Description) ||
                    regex.test(item.RetailerName) ||
                    regex.test(item.CouponCode) ||
                    regex.test(category?.categoriesName)
                  );
                })
                ?.map((val, i) => {
                  const category = categories?.data?.find(
                    (cat) => cat?._id === val?.categoriesId
                  );
                  return (
                    <tr key={val?._id}>
                      <td className="text-center">{i + 1}</td>
                      <td
                        className={`text-center ${
                          val.status === "Active"
                            ? "!text-green-400"
                            : "!text-red-500"
                        }`}
                      >
                        {val.status}
                      </td>
                      <td className="text-center">{val.Title}</td>
                      <td className="text-center">{val.Description}</td>
                      <td className="text-center">{val.CouponCode}</td>
                      <td className="text-center">
                        {category?.categoriesName}
                      </td>
                      <td className="text-center">{val.RetailerName}</td>
                      <td className="text-center">
                        {formatDate(val.ExpiryDate)}
                      </td>
                      <td className="text-center">{val.Conditions}</td>
                      <td>
                        <div className="grid grid-cols-2 gap-1">
                          <button
                            onClick={() =>
                              router.push(
                                "/create-coupon" +
                                  "?" +
                                  serializeObjectToQueryString(
                                    coupons?.data?.[i]
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

export default Coupons;
