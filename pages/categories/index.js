import { useCreateCategoryMutation } from "@/redux/api/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { FiEdit } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineDelete } from "react-icons/md";
import { serializeObjectToQueryString } from "@/utils/common";
import { useRouter } from "next/router";

const initialState = {
  categoriesImage: "",
  categoriesName: "",
};

const Category = () => {
  const [update] = useCreateCategoryMutation();

  const router = useRouter();

  const categories = useSelector((state) => state.cat.categories);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [parsedData, setParsedData] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const onSubmit = (data) => {
    const method = parsedData?._id ? "PUT" : "POST";
    const ID = parsedData?._id;
    update(data)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
    reset();
  };

  useEffect(() => {
    const serializedData = router.query.data;
    if (serializedData) {
      try {
        const parsedData = JSON.parse(serializedData);
        console.log("Parsed Data:", parsedData);
        reset(parsedData);
        setParsedData(parsedData);
      } catch (error) {
        console.log("Error parsing data:", error);
      }
    }
  }, [router.query.data]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="2xl:max-w-[100%] w-full mx-auto px-5">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-10 categories-form-main">
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Category Image</label>
              <label
                htmlFor="dropzone-logo-file"
                className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {logoUrl || getValues("categoriesImage") ? (
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        {logoUrl?.slice(12)}
                      </span>
                    </p>
                  ) : (
                    <>
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG or JPG
                      </p>
                    </>
                  )}
                  {getValues("categoriesImage") && !logoUrl ? (
                    <img
                      style={{ marginTop: "10px", width: "50px" }}
                      src={`http://localhost:3000/uploads/${getValues(
                        "categoriesImage"
                      )}`}
                      alt="uploaded file"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <input
                  id="dropzone-logo-file"
                  type="file"
                  className="w-full hidden"
                  accept="image/*"
                  {...register("categoriesImage", {
                    required: getValues("categoriesImage") ? false : true,
                    onChange: (e) => {
                      setLogoUrl(e.target.value);
                    },
                  })}
                />
              </label>
              {errors.categoriesImage?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Category Image is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Category Name</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md min-h-[48px]"
                placeholder="Category Name"
                {...register("categoriesName", { required: true })}
              />
              {errors.categoriesName?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Category Name is required
                </p>
              )}
            </div>
            <div className="my-7 flex justify-center items-center">
              <button
                type="submit"
                className="text-white bg-green-500 hover:bg-green-700 uppercase rounded-md px-5 py-2 text-base font-semibold"
              >
                submit
              </button>
              <button
              onClick={() =>  reset(initialState)}
                className="text-white bg-red-600 hover:bg-red-800 uppercase rounded-md px-5 py-2 ml-2 text-base font-semibold"
              >
                reset
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="p-4">
        <div className="flex items-center flex-wrap gap-1 mt-3">
          <div className="max-w-[340px] w-full relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-gray-500 py-2 text-sm px-3 w-full pr-6 focus:outline-none"
              placeholder="category name"
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
                <th>Category Image</th>
                <th>Category Name</th>
                <th>Coupon Code</th>
                <th>Offer Count</th>
                <th className="w-[100px]"></th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories?.data
                  ?.filter((item) => {
                    const regex = new RegExp(searchText, "i");
                    return regex.test(item.categoriesName);
                  })
                  ?.map((val, i) => {
                    return (
                      <tr key={val?._id}>
                        <td className="text-center">{i + 1}</td>
                        <td className="text-center">
                          <img
                            src={`http://localhost:3000/uploads/${val.categoriesImage}`}
                            className="w-[80px] mx-auto"
                          />
                        </td>
                        <td className="text-center">{val.categoriesName}</td>
                        <td className="text-center">{val.couponCount}</td>
                        <td className="text-center">{val.offerCount}</td>
                        <td>
                          <div className="grid grid-cols-2 gap-1">
                            <button
                              onClick={() =>
                                router.push(
                                  "/categories" +
                                    "?" +
                                    serializeObjectToQueryString(
                                      categories?.data?.[i]
                                    )
                                )
                              }
                              className="bg-[#19b897] hover:bg-[#237c6a] text-white p-1 flex justify-center items-center rounded-[4px] w-full"
                            >
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
    </div>
  );
};

export default Category;
