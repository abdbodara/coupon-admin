import { useCreateMerchantMutation } from "@/redux/api/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  RetailerName: "",
  RetailerLogo: "",
  RetailerRank: "",
  RetailerUrl: "",
  Affilate: "",
  RetailerPublish: "",
  Title: "",
  Desc: "",
  Metadesc: "",
  Metatitle: "",
  RetailerImage: "",
  categoriesId: "",
};

const CreateMerchant = () => {
  const categories = useSelector((state) => state.cat.categories);

  const router = useRouter();

  const [update] = useCreateMerchantMutation();

  const [parsedData, setParsedData] = useState({});

  const [imgUrl, setImgUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

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
    update({ data, method, ID })
      .unwrap()
      .then((res) => {
        router.push("/merchants");
        toast.success(res?.message);
        reset();
      })
      .catch((err) => {
        toast.error(err?.data?.message);
        reset();
      });
    setLogoUrl("");
    setImgUrl("");
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
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-10 categories-form-main">
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Title</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Title"
                {...register("Title", { required: true })}
              />
              {errors.Title?.type === "required" && (
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
                {...register("Desc", { required: true })}
              />
              {errors.Desc?.type === "required" && (
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
                className="py-2 px-4 border border-gray-300 bg-white rounded-md min-h-[42px]"
                {...register("categoriesId", { required: true })}
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
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Retailer name"
                {...register("RetailerName", { required: true })}
              />
              {errors.RetailerName?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Retailer Name is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Retailer Logo</label>
              <label
                htmlFor="dropzone-logo-file"
                className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {logoUrl || getValues("RetailerLogo") ? (
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
                  {getValues("RetailerLogo") && !logoUrl ? (
                    <img
                      style={{ marginTop: "10px", width: "50px" }}
                      src={`http://localhost:3000/uploads/${getValues(
                        "RetailerLogo"
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
                  {...register("RetailerLogo", {
                    required: getValues("RetailerLogo") ? false : true,
                    onChange: (e) => {
                      setLogoUrl(e.target.value);
                    },
                  })}
                />
              </label>
              {errors.RetailerLogo?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Retailer Logo is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">
                Retailer Image
              </label>
              <label
                htmlFor="dropzone-Img-file"
                className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {imgUrl || getValues("RetailerImage") ? (
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
                  {getValues("RetailerImage") && !imgUrl ? (
                    <img
                      style={{ marginTop: "10px", width: "50px" }}
                      src={`http://localhost:3000/uploads/${getValues(
                        "RetailerImage"
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
                  {...register("RetailerImage", {
                    required: getValues("RetailerImage") ? false : true,
                    onChange: (e) => {
                      setImgUrl(e.target.value);
                    },
                  })}
                />
              </label>
              {errors.RetailerImage?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Retailer Image is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Retailer Rank</label>
              <input
                type="number"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Retailer rank"
                {...register("RetailerRank", { required: true })}
              />
              {errors.RetailerRank?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Retailer Rank is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Retailer URL</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Retailer url"
                {...register("RetailerUrl", { required: true })}
              />
              {errors.RetailerUrl?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Retailer Url is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">
                Retailer Publish
              </label>
              <div className="flex gap-3 items-center">
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="radio"
                    name="Publish"
                    id="Publish"
                    value="publish"
                    className="h-4 w-4"
                    {...register("RetailerPublish", { required: true })}
                  />
                  <label htmlFor="Publish">Publish</label>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="radio"
                    name="Publish"
                    id="Unpublish"
                    value="unpublish"
                    className="h-4 w-4"
                    {...register("RetailerPublish", { required: true })}
                  />
                  <label htmlFor="Unpublish">Unpublish</label>
                </div>
                {errors.RetailerPublish?.type === "required" && (
                  <p
                    className="text-red-700 text-[15px] text-start"
                    role="alert"
                  >
                    Retailer Publish is required
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Affilate Name</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Affilate name"
                {...register("Affilate[0][name]", { required: true })}
              />
              {errors.Affilate?.[0]["name"]?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Affilate name is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-Description w-full">
              <label className="text-gray-700 font-medium">Affilate URL</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Affilate url"
                {...register("Affilate[0][url]", { required: true })}
              />
              {errors.Affilate?.[0]["url"]?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Affilate url is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Metatitle</label>
              <input
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Meta Title"
                {...register("Metatitle", { required: true })}
              />
              {errors.Metatitle?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Meta title is required
                </p>
              )}
            </div>
            <div className="flex flex-col xl:gap-2 gap-1 text-base w-full">
              <label className="text-gray-700 font-medium">Metatitle</label>
              <textarea
                type="text"
                className="py-2 px-4 border border-gray-300 rounded-md"
                placeholder="Meta Description"
                {...register("Metadesc", { required: true })}
              />
              {errors.Metadesc?.type === "required" && (
                <p className="text-red-700 text-[15px] text-start" role="alert">
                  Meta Description field are required
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

export default CreateMerchant;
