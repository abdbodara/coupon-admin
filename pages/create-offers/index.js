import { useCreateOffersMutation } from "@/redux/api/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  logo: "",
  image: "",
  desc: "",
  title: "",
  RetailerName: "",
  conditions: "",
  categoriesId: "",
};

const CreateOffers = () => {
  const categories = useSelector((state) => state.cat.categories);
  const marchants = useSelector((state) => state.cat.marchants);

  const [update] = useCreateOffersMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
  });

  const [selectedCat, setSelectedCat] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const onSubmit = (data) => {
    update(data)
      .unwrap()
      .then((res) => {
        router.push("/offers");
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
    setSelectedCat("");
    setImgUrl("");
    setLogoUrl("");
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="2xl:max-w-[100%] w-full mx-auto px-5">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 categories-form-main">
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Logo</label>
              <label
                htmlFor="dropzone-logo-file"
                className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {logoUrl || getValues("logo") ? (
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
                  {getValues("logo") && !logoUrl ? (
                    <img
                      style={{ marginTop: "10px", width: "50px" }}
                      src={`http://localhost:3000/uploads/${getValues("logo")}`}
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
                  {...register("logo", {
                    required: getValues("logo") ? false : true,
                    onChange: (e) => {
                      setLogoUrl(e.target.value);
                    },
                  })}
                />
              </label>
              {errors.logo?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Logo is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Image</label>
              <label
                htmlFor="dropzone-Img-file"
                className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {imgUrl || getValues("image") ? (
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">{imgUrl?.slice(12)}</span>
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
                  {getValues("image") && !imgUrl ? (
                    <img
                      style={{ marginTop: "10px", width: "50px" }}
                      src={`http://localhost:3000/uploads/${getValues(
                        "image"
                      )}`}
                      alt="uploaded file"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <input
                  id="dropzone-Img-file"
                  type="file"
                  className="w-full hidden"
                  accept="image/*"
                  {...register("image", {
                    required: getValues("image") ? false : true,
                    onChange: (e) => {
                      setImgUrl(e.target.value);
                    },
                  })}
                />
              </label>
              {errors.image?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Image is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Title</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md max-h-[42px] cursor-pointer"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Title is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Description</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Description"
                {...register("desc", { required: true })}
              />
              {errors.desc?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Description is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Category</label>
              <select
                name="select-category"
                id="select-category"
                placeholder="Categories ID"
                className="py-2 px-4 border border-gray-300 bg-white rounded-md min-h-[42px] cursor-pointer"
                {...register("categoriesId", {
                  required: true,
                  onChange: (e) => {
                    setSelectedCat(e.target.value);
                  },
                })}
              >
                <option value="" selected>
                  Select an Option
                </option>
                {categories &&
                  categories?.data?.map((val) => {
                    return (
                      <option key={val?._id} value={val?._id}>
                        {val?.categoriesName}
                      </option>
                    );
                  })}
              </select>
              {errors.categoriesId?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Category is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Retailer Name</label>
              <select
                name="select-category"
                id="select-category"
                disabled={selectedCat.length > 0 ? false : true}
                className={`py-2 px-4 border border-gray-300 bg-white rounded-md min-h-[42px] ${
                  selectedCat.length > 0
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }`}
                {...register("RetailerName", { required: true })}
              >
                <option value="" selected>
                  Select an Option
                </option>
                {marchants &&
                  marchants?.data
                    ?.filter((mar) => {
                      return mar.categoriesId === selectedCat;
                    })
                    ?.map((val) => {
                      return (
                        <option key={val?._id} value={val?.RetailerName}>
                          {val?.RetailerName}
                        </option>
                      );
                    })}
              </select>
              {errors.RetailerName?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Retailer Name is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Conditions</label>
              <textarea
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Conditions"
                {...register("conditions", { required: true })}
              />
              {errors.conditions?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Conditions is required
                </p>
              )}
            </div>
          </div>
          <div className="my-7 flex justify-center">
            <button
              type="submit"
              className="text-white bg-green-500 hover:bg-green-700 uppercase rounded-md px-5 py-2 text-base font-semibold"
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOffers;
